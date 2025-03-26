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
			<ToastProvider placement="top-right" />
			<NextThemesProvider attribute="class">
				<AuthProvider>{children}</AuthProvider>
			</NextThemesProvider>
		</HeroUIProvider>
	);
}
