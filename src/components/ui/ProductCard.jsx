import React from "react";
import { Card, CardHeader, CardBody, Image, CardFooter, Button } from "@heroui/react";
import Link from "next/link";

const ProductCard = ({ product }) => {
    const { title, vendor, maxPrice, mediaUrls, media } = product;
    const price = parseInt(maxPrice.amount);
    const formattedPrice = new Intl.NumberFormat("vi-VN").format(price);
    return (
        <Link href={"/"}>
            <Card className="pt-4 h-full " isFooterBlurred radius="sm">
                <CardBody className="overflow-visible py-2">
                    <Image alt="Card background" className="object-cover rounded-xl  hover:scale-110" src={mediaUrls[0].url} width="100%" />
                </CardBody>{" "}
                <CardHeader className="pb-5 pt-2 px-4 flex-col items-start">
                    <h4 className="font-bold text-large">{title}</h4>
                    <p className="text-tiny uppercase font-bold">Daily Mix</p>
                    <small className="text-default-500">{vendor}</small>
                </CardHeader>
                <CardFooter className="mt-20 justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                    <h4 className="text-base lg:text-lg text-red-600">
                        {formattedPrice} {maxPrice.currencyCode}
                    </h4>
                    <Button className="text-tiny text-white bg-red-500" color="default" radius="lg" size="sm" variant="flat">
                        Buy Now
                    </Button>
                </CardFooter>
            </Card>
        </Link>
    );
};

export default ProductCard;
