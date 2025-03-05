import { Card, CardBody } from "@heroui/react";
import React from "react";

const CardContentComponents = ({ textSize, radius, content }) => {
    return (
        <Card radius={radius}>
            <CardBody className="backdrop-blur-sm bg-white/30 dark:bg-black/30 ">
                <p className="text-center">{content}</p>
            </CardBody>
        </Card>
    );
};

export default CardContentComponents;
