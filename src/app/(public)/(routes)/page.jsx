"use client";

import CollectionsGrid from "@/components/home/collectionsGrid";
import CardContentComponents from "@/components/ui/CardContent";
import ProductCard from "@/components/ui/ProductCard";
import useSWR from "swr";
import { fetchAllProductsAPI } from "@/services/api.services";
import axios from "axios";

const fetcher = (url) => axios.get(url).then((res) => res.data);

const App = () => {
    const { data, error, isLoading } = useSWR("http://localhost:8000/api/products", fetcher);

    if (isLoading) return <p>Đang tải dữ liệu...</p>;
    if (error) return <p>Lỗi khi tải sản phẩm: {error.message}</p>;

    console.log(data.data);
    return (
        <div className="h-[10000px] flex flex-col gap-5">
            <CardContentComponents radius="sm" content="Make beautiful websites regardless of your design experience." />
            <CollectionsGrid />
            <div className="grid grid-cols-2 gap-6 grid-rows-2 lg:grid-cols-4  xl:grid-cols-5">
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
            </div>
        </div>
    );
};

export default App;
