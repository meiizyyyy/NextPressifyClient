import React, { useState, useRef, useEffect } from "react";
import {
	Button,
	Input,
	ScrollShadow,
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerBody,
	DrawerFooter,
} from "@heroui/react";

const ChatBot = () => {
	const [messages, setMessages] = useState([]);
	const [input, setInput] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const scrollRef = useRef(null);

	const scrollToBottom = () => {
		if (scrollRef.current) {
			scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
		}
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	const handleSend = async () => {
		if (!input.trim() || isLoading) return;

		const userMessage = input.trim();
		setInput("");
		setIsLoading(true);

		// Thêm tin nhắn của người dùng
		setMessages((prev) => [...prev, { role: "user", content: userMessage }]);

		try {
			const response = await fetch("/api/ChatBotRecommend", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					query: userMessage,
					conversationHistory: messages,
				}),
			});

			if (!response.ok) {
				throw new Error("Network response was not ok");
			}

			const data = await response.json();

			// Thêm tin nhắn của bot
			setMessages((prev) => [
				...prev,
				{
					role: "assistant",
					content: data.message,
					products: data.products,
					questions: data.questions,
				},
			]);
		} catch (error) {
			console.error("Error:", error);
			setMessages((prev) => [
				...prev,
				{
					role: "assistant",
					content: "Xin lỗi, tôi đang gặp sự cố. Vui lòng thử lại sau.",
				},
			]);
		} finally {
			setIsLoading(false);
		}
	};

	const handleKeyPress = (e) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSend();
		}
	};

	return (
		<>
			<Button
				radius="large"
				onPress={() => setIsOpen(true)}
				className="fixed bottom-4 right-4 bg-primary text-white  shadow-lg z-50">
				<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
					<g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
						<path
							strokeDasharray={72}
							strokeDashoffset={72}
							d="M3 19.5v-15.5c0 -0.55 0.45 -1 1 -1h16c0.55 0 1 0.45 1 1v12c0 0.55 -0.45 1 -1 1h-14.5Z">
							<animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="72;0"></animate>
						</path>
						<path strokeDasharray={10} strokeDashoffset={10} d="M8 7h8">
							<animate
								fill="freeze"
								attributeName="stroke-dashoffset"
								begin="0.7s"
								dur="0.2s"
								values="10;0"></animate>
						</path>
						<path strokeDasharray={10} strokeDashoffset={10} d="M8 10h8">
							<animate
								fill="freeze"
								attributeName="stroke-dashoffset"
								begin="1s"
								dur="0.2s"
								values="10;0"></animate>
						</path>
						<path strokeDasharray={6} strokeDashoffset={6} d="M8 13h4">
							<animate
								fill="freeze"
								attributeName="stroke-dashoffset"
								begin="1.3s"
								dur="0.2s"
								values="6;0"></animate>
						</path>
					</g>
				</svg>
			</Button>

			<Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} placement="right" size="md">
				<DrawerContent>
					<DrawerHeader className="border-b flex flex-col gap-2">
						<h3 className="text-lg font-semibold">Tư vấn sản phẩm</h3>
						<p className="text-sm text-gray-500">Tôi có thể giúp gì cho bạn?</p>
					</DrawerHeader>

					<DrawerBody>
						<ScrollShadow ref={scrollRef} className="h-full p-4 space-y-4">
							{messages.map((message, index) => (
								<div
									key={index}
									className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
									<div
										className={`max-w-[80%] rounded-lg p-3 ${
											message.role === "user"
												? "bg-primary text-white"
												: "bg-gray-100 text-gray-800"
										}`}>
										<p className="whitespace-pre-wrap">{message.content}</p>

										{message.products && message.products.length > 0 && (
											<div className="mt-4 space-y-2">
												{message.products.map((product) => (
													<div key={product.id} className="bg-white rounded p-2 text-sm">
														<p className="font-medium">{product.title}</p>
														<p className="text-gray-600">
															{product.priceRangeV2.maxVariantPrice.amount}đ
														</p>
													</div>
												))}
											</div>
										)}

										{message.questions && message.questions.length > 0 && (
											<div className="mt-4 space-y-2">
												{message.questions.map((question, qIndex) => (
													<button
														key={qIndex}
														onClick={() => setInput(question)}
														className="text-sm text-primary hover:text-primary-dark text-left">
														{question}
													</button>
												))}
											</div>
										)}
									</div>
								</div>
							))}
							{isLoading && (
								<div className="flex justify-start">
									<div className="bg-gray-100 rounded-lg p-3">
										<div className="flex space-x-2">
											<div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
											<div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
											<div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
										</div>
									</div>
								</div>
							)}
						</ScrollShadow>
					</DrawerBody>

					<DrawerFooter className="border-t">
						<div className="flex space-x-2 w-full">
							<Input
								value={input}
								onChange={(e) => setInput(e.target.value)}
								onKeyDown={handleKeyPress}
								placeholder="Nhập tin nhắn..."
								className="flex-1"
							/>
							<Button isLoading={isLoading} onPress={handleSend} className="bg-primary text-white">
								Send
							</Button>
						</div>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</>
	);
};

export default ChatBot;
