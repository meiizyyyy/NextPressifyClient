"use client";

import { Button } from "@heroui/react";
import React from "react";
import { useRouter } from "next/navigation";

const ButtonComponent = ({ size, variant, color, content }) => {
    const router = useRouter();

    const handleClickButton = () => {
        console.log("Clicked!!");
        // router.push("https://xstore.8theme.com/elementor2/marseille04/");
    };

    return (
        <Button
            size={size}
            variant={variant}
            color={color || undefined}
            className="relative overflow-visible  hover:-translate-y-1 px-12 bg-background/30 after:content-[''] after:absolute after:rounded-full after:inset-0 after:bg-background/40 after:z-[-1] after:transition after:!duration-500 hover:after:scale-150 hover:after:opacity-0"
            onPress={handleClickButton}>
            {content}
        </Button>
    );
};

export default ButtonComponent;
