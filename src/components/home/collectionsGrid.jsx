import React from "react";

import { Button, Card, CardBody, CardFooter, Image, CardHeader } from "@heroui/react";
const CollectionsGrid = () => {
    return (
        <>
            <Card>
                <CardBody className="backdrop-blur-sm bg-white/30 dark:bg-black/30">
                    <p className="text-center">Make beautiful websites regardless of your design experience.</p>
                </CardBody>
            </Card>
            <div className="gap-2 grid grid-cols-12 grid-rows-2">
                <Card className="col-span-12 sm:col-span-4 h-[300px] " isHoverable="true">
                    <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                        <p className="text-tiny text-white/60 uppercase font-bold">What to watch</p>
                        <h4 className="text-white font-medium text-large">Stream the Acme event</h4>
                    </CardHeader>
                    <Image removeWrapper alt="Card background" className="z-0 w-full h-full object-cover" src="https://heroui.com/images/card-example-4.jpeg" />
                    <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                        <div className="flex flex-grow gap-2 items-center">
                            <Image
                                alt="Breathing app icon"
                                className="rounded-full w-10 h-11 bg-black"
                                src="https://heroui.com/images/breathing-app-icon.jpeg"
                            />
                            <div className="flex flex-col">
                                <p className="text-tiny text-white/60">Breathing App</p>
                                <p className="text-tiny text-white/60">Get a good night&#39;s sleep.</p>
                            </div>
                        </div>
                        <Button radius="full" size="sm">
                            Get App
                        </Button>
                    </CardFooter>
                </Card>
                <Card className="col-span-12 sm:col-span-4 h-[300px]">
                    <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                        <p className="text-tiny text-white/60 uppercase font-bold">Plant a tree</p>
                        <h4 className="text-white font-medium text-large">Contribute to the planet</h4>
                    </CardHeader>
                    <Image removeWrapper alt="Card background" className="z-0 w-full h-full object-cover" src="https://heroui.com/images/card-example-3.jpeg" />
                    <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                        <div className="flex flex-grow gap-2 items-center">
                            <Image
                                alt="Breathing app icon"
                                className="rounded-full w-10 h-11 bg-black"
                                src="https://heroui.com/images/breathing-app-icon.jpeg"
                            />
                            <div className="flex flex-col">
                                <p className="text-tiny text-white/60">Breathing App</p>
                                <p className="text-tiny text-white/60">Get a good night&#39;s sleep.</p>
                            </div>
                        </div>
                        <Button radius="full" size="sm">
                            Get App
                        </Button>
                    </CardFooter>
                </Card>
                <Card className="col-span-12 sm:col-span-4 h-[300px]">
                    <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                        <p className="text-tiny text-white/60 uppercase font-bold">Supercharged</p>
                        <h4 className="text-white font-medium text-large">Creates beauty like a beast</h4>
                    </CardHeader>
                    <Image removeWrapper alt="Card background" className="z-0 w-full h-full object-cover" src="https://heroui.com/images/card-example-2.jpeg" />
                    <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                        <div className="flex flex-grow gap-2 items-center">
                            <Image
                                alt="Breathing app icon"
                                className="rounded-full w-10 h-11 bg-black"
                                src="https://heroui.com/images/breathing-app-icon.jpeg"
                            />
                            <div className="flex flex-col">
                                <p className="text-tiny text-white/60">Breathing App</p>
                                <p className="text-tiny text-white/60">Get a good night&#39;s sleep.</p>
                            </div>
                        </div>
                        <Button radius="full" size="sm">
                            Get App
                        </Button>
                    </CardFooter>
                </Card>
                <Card isFooterBlurred className="w-full h-[300px] col-span-12 sm:col-span-5">
                    <CardHeader className="absolute z-10 top-1 flex-col items-start">
                        <p className="text-tiny text-white/60 uppercase font-bold">New</p>
                        <h4 className="text-black font-medium text-2xl">Acme camera</h4>
                    </CardHeader>
                    <Image
                        removeWrapper
                        alt="Card example background"
                        className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
                        src="https://heroui.com/images/card-example-6.jpeg"
                    />
                    <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                        <div className="flex flex-grow gap-2 items-center">
                            <Image
                                alt="Breathing app icon"
                                className="rounded-full w-10 h-11 bg-black"
                                src="https://heroui.com/images/breathing-app-icon.jpeg"
                            />
                            <div className="flex flex-col">
                                <p className="text-tiny text-white/60">Breathing App</p>
                                <p className="text-tiny text-white/60">Get a good night&#39;s sleep.</p>
                            </div>
                        </div>
                        <Button radius="full" size="sm">
                            Get App
                        </Button>
                    </CardFooter>
                </Card>
                <Card isFooterBlurred className="w-full h-[300px] col-span-12 sm:col-span-7">
                    <CardHeader className="absolute z-10 top-1 flex-col items-start">
                        <p className="text-tiny text-white/60 uppercase font-bold">Your day your way</p>
                        <h4 className="text-white/90 font-medium text-xl">Your checklist for better sleep</h4>
                    </CardHeader>
                    <Image
                        removeWrapper
                        alt="Relaxing app background"
                        className="z-0 w-full h-full object-cover"
                        src="https://heroui.com/images/card-example-5.jpeg"
                    />
                    <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                        <div className="flex flex-grow gap-2 items-center">
                            <Image
                                alt="Breathing app icon"
                                className="rounded-full w-10 h-11 bg-black"
                                src="https://heroui.com/images/breathing-app-icon.jpeg"
                            />
                            <div className="flex flex-col">
                                <p className="text-tiny text-white/60">Breathing App</p>
                                <p className="text-tiny text-white/60">Get a good night&#39;s sleep.</p>
                            </div>
                        </div>
                        <Button radius="full" size="sm">
                            Get App
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </>
    );
};

export default CollectionsGrid;
