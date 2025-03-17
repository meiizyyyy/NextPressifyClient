"use client";

import { HeroUIProvider } from "@heroui/react";
import { useRouter, useNavigate } from "next/navigation";

export function Providers({ children }) {
	const router = useRouter();

	return <HeroUIProvider navigate={router.push}>{children}</HeroUIProvider>;
}
