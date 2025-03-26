"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { HeroUIProvider } from "@heroui/react";
import { useRouter, useNavigate } from "next/navigation";
import { ToastProvider } from "@heroui/toast";
import { AuthProvider } from "@/contexts/AuthContext";

export function Providers({ children }) {
	const router = useRouter();

	return (
		<HeroUIProvider navigate={router.push}>
			<ToastProvider
				placement="top-right"
				toastOffset={70}
				toastProps={{
					timeout: 3000,
					classNames: {
						closeButton: "opacity-100 absolute right-3 top-1/2 -translate-y-1/2",
					},
					closeIcon: (
						<svg
							fill="none"
							height="32"
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							viewBox="0 0 24 24"
							width="32">
							<path d="M18 6 6 18" />
							<path d="m6 6 12 12" />
						</svg>
					),
				}}
				className="z-50"
			/>
			<NextThemesProvider attribute="class">
				<AuthProvider>{children}</AuthProvider>
			</NextThemesProvider>
		</HeroUIProvider>
	);
}
