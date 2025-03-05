"use client";

import CardContentComponents from "@/components/ui/CardContent";
import { Card, CardBody } from "@heroui/react";
import { useParams } from "next/navigation";
import React from "react";

const CollectionPage = () => {
    const { collectionName } = useParams();

    return (
        <div className="mt-10">
            <Card radius="sm" shadow="none">
                <CardBody>
                    <p className="text-start text-3xl">Collection: {collectionName.toUpperCase()}</p>
                </CardBody>
            </Card>
        </div>
    );
};

export default CollectionPage;
