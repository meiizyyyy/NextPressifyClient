"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { HeroUIProvider } from "@heroui/react";
import { useRouter, useNavigate } from "next/navigation";

export function Providers({ children }) {
	const router = useRouter();

	return (
		<HeroUIProvider navigate={router.push}>
			<NextThemesProvider attribute="class">{children}</NextThemesProvider>
		</HeroUIProvider>
	);
}
