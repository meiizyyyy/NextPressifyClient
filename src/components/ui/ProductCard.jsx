import React from "react";
import { Card, CardHeader, CardBody, Image, CardFooter, Button } from "@heroui/react";

const ProductCard = () => {
    return (
        <Card className="py-4 h-80 lg:h-96" isFooterBlurred>
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <p className="text-tiny uppercase font-bold">Daily Mix</p>
                <small className="text-default-500">12 Tracks</small>
                <h4 className="font-bold text-large">Frontend Radio</h4>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
                <Image alt="Card background" className="object-cover rounded-xl" src="https://heroui.com/images/hero-card-complete.jpeg" width="100%" />
            </CardBody>
            <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                <p className="text-tiny text-white/80">Available soon.</p>
                <Button className="text-tiny text-white bg-black/20" color="default" radius="lg" size="sm" variant="flat">
                    Buy Now
                </Button>
            </CardFooter>
        </Card>
    );
};

export default ProductCard;
