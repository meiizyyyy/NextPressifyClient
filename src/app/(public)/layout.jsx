import Header from "@/components/Header";
import React from "react";

const PublicLayouts = ({ children }) => {
    return (
        <>
            <Header />
            <main className="container mx-auto mt-4 px-3">{children}</main>
        </>
    );
};

export default PublicLayouts;
