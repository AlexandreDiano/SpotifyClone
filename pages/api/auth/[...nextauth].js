import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import spotifyApi, {LOGIN_URL} from "../../../lib/spotify";

const refreshAccessToken = async (token) => {
  try {
    spotifyApi.setAccessToken(token.accessToken);
    spotifyApi.setRefreshToken(token.refreshToken);

    const {body: refreshedToken} = await spotifyApi.refreshAccessToken();
    console.log("refreshed token is", refreshedToken);

    return {
      ...token,
      accessToken: refreshedToken.access_token,
      accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000,
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    return {
      ...token,
      error: "Refresh token error",
    };
  }
};

const jwt = async ({token, account, user}) => {
  if (account && user) {
    return {
      ...token,
      accessToken: account.access_token,
      refreshToken: account.refresh_token,
      username: account.providerAccountId,
      accessTokenExpires: account.expires_at * 1000,
    };
  }

  if (Date.now() < token.accessTokenExpires) {
    return token;
  }

  return await refreshAccessToken(token);
};

export const session = async ({session, token}) => {
  session.user.accessToken = token.accessToken;
  session.user.refreshToken = token.refreshToken;
  session.user.username = token.username;

  return session;
};

export default NextAuth({
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      authorization: LOGIN_URL,
    }),
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt: jwt,
    session: session,
  },
});