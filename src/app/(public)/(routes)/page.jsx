"use client";

import CollectionsGrid from "@/components/home/collectionsGrid";
import CardContentComponents from "@/components/ui/CardContent";
import ProductCard from "@/components/ui/ProductCard";
import { fetchAllProducts } from "@/services/api.services";
import axios from "axios";

const App = () => {
    const { data, error, isLoading } = fetchAllProducts();

    if (isLoading) return <p>Đang tải dữ liệu...</p>;
    if (error) return <p>Lỗi khi tải sản phẩm: {error.message}</p>;
    const products = data?.data || [];
    console.log("products list :", products);
    return (
        <div className="h-[10000px] flex flex-col gap-5">
            <CardContentComponents radius="sm" content="Make beautiful websites regardless of your design experience." />
            <CollectionsGrid />
            <CardContentComponents radius="sm" content="Our best Product" />
            <div className="grid grid-cols-2 gap-6 grid-rows-2 lg:grid-cols-4  xl:grid-cols-5">
                {products.slice(0, 5).map((product, index) => {
                    return <ProductCard key={product.id} product={product} />;
                })}
            </div>
        </div>
    );
};

export default App;
