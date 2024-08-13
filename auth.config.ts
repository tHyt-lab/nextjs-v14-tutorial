import type { NextAuthConfig } from "next-auth";

export const authConfig = {
	providers: [],
	pages: {
		signIn: "/login",
	},
	callbacks: {
		authorized({ auth, request: { nextUrl } }) {
			const isLoggedIn = Boolean(auth?.user);
			const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
			if (isOnDashboard) {
				return isLoggedIn;
			}
			if (isLoggedIn) {
				return Response.redirect(new URL("dashboard", nextUrl));
			}
			return true;
		},
	},
} satisfies NextAuthConfig;
