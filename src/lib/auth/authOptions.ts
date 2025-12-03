import type { NextAuthOptions, SessionStrategy } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import axios from 'axios';
import { refreshToken } from '@/zustand/action/authAction';
import { jwtDecode } from 'jwt-decode';
import { users } from '@/app/api/dummyData/user';
import jwt from 'jsonwebtoken';

export const checkIfTokenExpired = (accessToken: string): boolean => {
  try {
    const decoded: any = jwtDecode(accessToken);
    const expMs = decoded.exp * 1000;
    const nowMs = Date.now();
    const fiveMinutes = 5 * 60 * 1000;
    return nowMs >= expMs || expMs - nowMs <= fiveMinutes;
  } catch (error) {
    console.error('Error decoding token:', error);
    return true;
  }
};

const secretKey = process.env.NEXT_PUBLIC_JWT_SECRET_KEY || 'your-secret-key';
const refreshTokenSecret =
  process.env.NEXT_PUBLIC_JWT_REFRESH_SECRET_KEY || 'your-refresh-secret-key';

const generateTokens = (user: {
  id: number;
  name: string;
  email: string;
  role: string;
}) => {
  const accessToken = jwt.sign(
    { userId: user.id, email: user.email, role: user.role },
    secretKey,
    { expiresIn: '15m' }
  );

  const refreshToken = jwt.sign(
    { userId: user.id, email: user.email },
    refreshTokenSecret,
    { expiresIn: '7d' }
  );

  return { accessToken, refreshToken };
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},
      async authorize(credentials: any) {
        const { email, password } = credentials;
        if (!email || !password) throw new Error('Missing email or password');

        try {
          const baseURL =
            process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000/';
          const response = await axios.post(
            `${baseURL}api/login`,
            { email, password },
            {
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
            }
          );

          if (response?.status === 200 && response.data.success)
            return response.data;
          return null;
        } catch (error: any) {
          console.error('Error during login:', error?.response?.data || error);
          throw new Error(
            error?.response ? JSON.stringify(error.response.data) : error
          );
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  pages: {
    signIn: '/login',
    signOut: '/',
  },

  session: {
    strategy: 'jwt' as SessionStrategy,
  },

  callbacks: {
    async jwt({
      token,
      user,
      account,
    }: {
      token: any;
      user: any;
      account: any;
    }) {
      // Pertama kali login
      if (user && account) {
        if (account.provider === 'google') {
          // Cek user di dummy database
          let dbUser = users.find(
            (u) => u.email === user.email && u.provider === 'google'
          );

          if (!dbUser) {
            // Kalau belum ada, buat user baru
            dbUser = {
              id: users.length + 1,
              name: user.name!,
              email: user.email!,
              image: user.image || null,
              role: 'applicant', // default role Google
              provider: 'google',
            };
            users.push(dbUser);
          }

          const tokens = generateTokens(dbUser);

          token.user = dbUser;
          token.accessToken = tokens.accessToken;
          token.refreshToken = tokens.refreshToken;
        }

        if (account.provider === 'credentials') {
          token.user = user.user;
          token.accessToken = user.tokens?.accessToken;
          token.refreshToken = user.tokens?.refreshToken;
        }
      }

      // Refresh token jika sudah expired (hanya untuk Credentials)
      if (token.accessToken && token.user?.provider !== 'google') {
        const expired = checkIfTokenExpired(token.accessToken);
        if (expired) {
          const updated = await refreshToken(token.refreshToken);
          if (updated === 'logout') token.signOutRequired = true;
          else {
            token.accessToken = updated.accessToken;
            token.refreshToken = updated.refreshToken;
          }
        }
      }

      return token;
    },

    async session({ session, token }) {
      session.user = token.user || null;
      session.accessToken = token.accessToken || null;
      session.refreshToken = token.refreshToken || null;
      session.signOutRequired = token.signOutRequired || false;
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};
