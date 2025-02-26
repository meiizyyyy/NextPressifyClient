"use client";

import { Button } from "@heroui/react";
import React from "react";
import { useRouter } from "next/navigation";

const ButtonComponent = ({ size, variant, color, content }) => {
    const router = useRouter();

    const handleClickButton = () => {
        console.log("Clicked!!");
        router.push("https://xstore.8theme.com/elementor2/marseille04/");
    };

    return (
        <Button size={size} variant={variant} color={color || undefined} className="text-center" onPress={handleClickButton}>
            {content}
        </Button>
    );
};

export default ButtonComponent;
