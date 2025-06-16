import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { AdapterUser } from "@auth/core/adapters";
import { JWT } from "next-auth/jwt";

// Override AdapterUser type
declare module "@auth/core/adapters" {
  interface AdapterUser {
    id: string;
    email: string;
    name: string;
  }
}

// Extend the built-in session types
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
    };
    accessToken?: string;
    refreshToken?: string;
  }

  interface User {
    id: string;
    email: string;
    name: string;
    accessToken?: string;
    refreshToken?: string;
  }
}

// Extend the built-in JWT types
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    name: string;
    accessToken?: string;
    refreshToken?: string;
    tokenVersion?: number;
  }
}

interface CustomUser {
    id: string;
    email: string;
    name: string;
    accessToken: string;
    refreshToken: string;
}

async function refreshAccessToken(token: JWT) {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        if (!apiUrl) {
            throw new Error('API URL is not configured');
        }

        const response = await fetch(`${apiUrl}/auth/refresh-token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                refreshToken: token.refreshToken,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to refresh token');
        }

        return {
            ...token,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
            tokenVersion: (token.tokenVersion ?? 0) + 1,
        };
    } catch (error) {
        return {
            ...token,
            error: 'RefreshAccessTokenError',
        };
    }
}

async function logout(refreshToken: string) {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        if (!apiUrl) {
            throw new Error('API URL is not configured');
        }

        const response = await fetch(`${apiUrl}/auth/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                refreshToken,
            }),
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message || 'Failed to logout');
        }

        // Sign out from NextAuth
        await signOut();
        
        return true;
    } catch (error) {
        console.error('Error during logout:', error);
        throw error;
    }
}

export { logout };
export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
        }),
        GitHub({
            clientId: process.env.AUTH_GITHUB_ID,
            clientSecret: process.env.AUTH_GITHUB_SECRET,
        }),
        Credentials({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "text",
                    placeholder: "Enter email",
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "Enter Password",
                },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Email and password are required');
                }

                try {
                    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
                    if (!apiUrl) {
                        throw new Error('API URL is not configured');
                    }
                    
                    const res = await fetch(`${apiUrl}/auth/login`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            email: credentials.email,
                            password: credentials.password,
                        }),
                    });

                    const data = await res.json();

                    if (!res.ok) {
                        throw new Error(data.message || 'Authentication failed');
                    }

                    if (!data.accessToken) {
                        throw new Error('No access token received');
                    }

                    const tokenPayload = JSON.parse(atob(data.accessToken.split('.')[1]));
                    
                    return {
                        id: tokenPayload.sub,
                        email: tokenPayload.email,
                        name: tokenPayload.email.split('@')[0],
                        accessToken: data.accessToken,
                        refreshToken: data.refreshToken,
                    } as CustomUser;
                } catch (error) {
                    throw error;
                }
            },
        }),
    ],
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
        updateAge: 24 * 60 * 60, // 24 hours
    },
    callbacks: {
        async jwt({ token, user, account }) {
            if (user) {
                return {
                    ...token,
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    accessToken: user.accessToken,
                    refreshToken: user.refreshToken,
                    tokenVersion: 0,
                };
            }

            const tokenExp = token.accessToken ? JSON.parse(atob(token.accessToken.split('.')[1])).exp * 1000 : 0;
            
            if (Date.now() < tokenExp) {
                return token;
            }

            return refreshAccessToken(token);
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id;
                session.user.email = token.email;
                session.user.name = token.name;
                session.accessToken = token.accessToken;
                session.refreshToken = token.refreshToken;
            }
            return session;
        },
    },
    pages: {
        signIn: '/login',
        error: '/login',
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === 'development',
    cookies: {
        sessionToken: {
            name: `next-auth.session-token`,
            options: {
                httpOnly: true,
                sameSite: 'lax',
                path: '/',
                secure: process.env.NODE_ENV === 'production',
                maxAge: 30 * 24 * 60 * 60 // 30 days
            }
        },
        callbackUrl: {
            name: `next-auth.callback-url`,
            options: {
                sameSite: 'lax',
                path: '/',
                secure: process.env.NODE_ENV === 'production'
            }
        },
        csrfToken: {
            name: `next-auth.csrf-token`,
            options: {
                httpOnly: true,
                sameSite: 'lax',
                path: '/',
                secure: process.env.NODE_ENV === 'production'
            }
        }
    }
});