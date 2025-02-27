import axios from "./axios.customize";

const fetchAllProductsAPI = async () => {
    try {
        const response = await axios.get("/products"); // Đổi URL API thành đúng endpoint
        return response.data; // Đảm bảo trả về dữ liệu từ API
    } catch (error) {
        throw new Error(error.response?.data?.message || "Lỗi khi lấy sản phẩm");
    }
};

export { fetchAllProductsAPI };