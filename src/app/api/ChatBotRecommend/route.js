import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const systemPrompt = `Bạn là một AI trợ lý tư vấn sản phẩm. Nhiệm vụ của bạn là:
1. Phân tích nhu cầu người dùng
2. Đề xuất sản phẩm phù hợp ngay lập tức
3. Giải thích ngắn gọn lý do đề xuất

QUAN TRỌNG: Trả về JSON theo format sau:
{
  "message": "Nội dung tin nhắn trả lời",
  "searchQuery": "Từ khóa tìm kiếm sản phẩm",
  "questions": ["Câu hỏi 1", "Câu hỏi 2"]
}

Lưu ý:
- message: Trả lời ngắn gọn, tự nhiên. Câu cuối cùng có thể ghi "Bạn có thể tham khảo sản phẩm tại Website của chúng tôi."
- searchQuery: Từ khóa tìm kiếm ngắn gọn
- questions: 1-2 câu hỏi đơn giản để hiểu rõ hơn

Ví dụ khi người dùng hỏi "Tôi muốn mua laptop":
{
  "message": "Dựa vào nhu cầu của bạn, tôi đề xuất một số sản phẩm sau:",
  "searchQuery": "laptop",
  "questions": ["Bạn có ưu tiên về thương hiệu không?", "Ngân sách của bạn là bao nhiêu?"]
}`;

export async function POST(req) {
	try {
		const { query, conversationHistory } = await req.json();

		// Tạo model
		const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

		// Tạo prompt từ lịch sử chat
		const historyPrompt = conversationHistory
			.map((msg) => `${msg.role === "user" ? "Người dùng" : "Bot"}: ${msg.content}`)
			.join("\n");

		// Tạo prompt hoàn chỉnh
		const fullPrompt = `${systemPrompt}\n\nLịch sử chat:\n${historyPrompt}\n\nNgười dùng: ${query}\n\nNhớ: Trả lời phải là JSON thuần túy, không thêm markdown hay code blocks.`;

		// Gọi Gemini API
		const result = await model.generateContent(fullPrompt);
		const response = result.response.text();

		// Xử lý response để lấy JSON
		let jsonResponse = response;
		// Nếu response có chứa markdown code block, lấy nội dung bên trong
		if (response.includes("```json")) {
			jsonResponse = response.split("```json")[1].split("```")[0].trim();
		} else if (response.includes("```")) {
			jsonResponse = response.split("```")[1].split("```")[0].trim();
		}

		// Parse JSON response
		let parsedResponse;
		try {
			parsedResponse = JSON.parse(jsonResponse);
		} catch (error) {
			console.error("Error parsing JSON:", error);
			console.error("Raw Response:", response);
			return NextResponse.json(
				{
					message: "Xin lỗi, tôi đang gặp sự cố. Vui lòng thử lại sau.",
					searchQuery: "",
					questions: [],
				},
				{ status: 500 },
			);
		}

		// Tìm kiếm sản phẩm nếu có searchQuery
		let products = [];
		if (parsedResponse.searchQuery) {
			try {
				const searchResult = await axios.get(`${API_URL}/api/products/search`, {
					params: { query: parsedResponse.searchQuery },
				});
				products = searchResult.data?.products?.edges?.map((edge) => edge.node) || [];
			} catch (error) {
				console.error("Error searching products:", error);
				// Không trả về lỗi, chỉ log để debug
			}
		}

		// Trả về kết quả
		return NextResponse.json({
			message: parsedResponse.message,
			products: products,
			questions: parsedResponse.questions || [],
		});
	} catch (error) {
		console.error("Error:", error);
		return NextResponse.json(
			{
				message: "Xin lỗi, tôi đang gặp sự cố. Vui lòng thử lại sau.",
				products: [],
				questions: [],
			},
			{ status: 500 },
		);
	}
}
