"use client";

import { Link } from "@heroui/react";
import React from "react";

const LinkComponent = ({ path, content }) => {
    return <Link href={path}>{content}</Link>;
};

export default LinkComponent;
