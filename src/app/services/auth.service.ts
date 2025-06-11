import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import { AdapterUser } from "@auth/core/adapters";

interface CustomUser {
    id: string;
    email: string;
    name: string;
}

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
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
                    console.log('Making request to:', `${process.env.NEXT_PUBLIC_API_URL}/auth/login`);
                    
                    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            email: credentials.email,
                            password: credentials.password,
                        }),
                        credentials: 'include', // This is important for cookies
                    });

                    const data = await res.json();
                    console.log('Login response:', data);

                    if (!res.ok) {
                        throw new Error(data.message || 'Authentication failed');
                    }

                    if (!data.accessToken) {
                        throw new Error('No access token received');
                    }

                    // Decode the JWT token to get user information
                    const tokenPayload = JSON.parse(atob(data.accessToken.split('.')[1]));
                    
                    return {
                        id: tokenPayload.sub,
                        email: tokenPayload.email,
                        name: tokenPayload.email.split('@')[0],
                    } as CustomUser;
                } catch (error) {
                    console.error("Auth error:", error);
                    throw error;
                }
            },
        }),
    ],
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60,
    },
    callbacks: {
        async jwt({ token, user, account }) {
            if (account && user) {
                const customUser = user as CustomUser;
                return {
                    ...token,
                    id: customUser.id,
                    email: customUser.email,
                    name: customUser.name,
                };
            }
            return token;
        },
        async session({ session, token }) {
            return {
                ...session,
                user: {
                    id: token.id as string,
                    email: token.email as string,
                    name: token.name as string,
                },
            };
        },
    },
    pages: {
        signIn: '/auth/signin',
        error: '/auth/error',
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === 'development',
    cookies: {
        sessionToken: {
            name: `__Secure-next-auth.session-token`,
            options: {
                httpOnly: true,
                sameSite: 'lax',
                path: '/',
                secure: true
            }
        }
    }
});