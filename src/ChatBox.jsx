import { useRef, useState } from "react";
import ArrowUp from "./assets/up-arrow.svg";

function ChatBox() {
	const [message, setMessage] = useState("");
	const [messageHistory, setMessageHistory] = useState([]);
	const [isSending, setIsSending] = useState(false);
	const chat = useRef(null);
	const inputBox = useRef(null);

	const SendData = async (event) => {
		if (isSending) return;

		if (message.trim() === "") return;

		setIsSending(true);

		event.preventDefault();

		setMessageHistory([...messageHistory, message]);
		setMessage("");

		if (chat.current) {
			chat.current.scroll({
				top: chat.current.scrollHeight,
				behavior: "smooth",
			});
		}

		console.log(message, messageHistory);

		const response = await fetch("http://localhost:5156/message", {
			method: "POST",
			headers: { "Content-Type": "application/json" },

			body: JSON.stringify({
				Message: message,
				Messages: messageHistory,
			}),
		});

		const j = await response.json();

		setMessageHistory(j);

		if (chat.current) {
			chat.current.scroll({
				top: chat.current.scrollHeight,
				behavior: "smooth",
			});
		}

		setIsSending(false);
	};

	const input = (ev) => {
		ResizeInput();

		if (ev.key === "Enter" && !ev.shiftKey) {
			ev.preventDefault();
			SendData(new Event("submit"));
		}
	};

	const ResizeInput = () => {
		console.log(inputBox.current, chat);
		inputBox.current.style.height = inputBox.current.scrollHeight + "px";
	};

	return (
		<div className="grid h-full grid-rows-[1fr_auto] gap-4 px-5 py-10 sm:px-10">
			{messageHistory.length <= 0 ? (
				<div className="flex flex-col items-center justify-center gap-2">
					<h2 className="text-center text-5xl font-bold sm:text-6xl">
						Chat to Otis
					</h2>
					<h3 className="text-center text-2xl sm:text-3xl">
						Get help with your mental health!
					</h3>
				</div>
			) : (
				<div
					className="flex flex-col gap-2 overflow-x-hidden overflow-y-auto"
					ref={chat}
				>
					{messageHistory.map((message, i) => (
						<span
							key={i}
							className={`${
								i % 2
									? "rounded-bl-none bg-neutral-600 text-white after:bg-neutral-600"
									: "self-end rounded-br-none bg-neutral-200 after:bg-neutral-200"
							} relative w-fit max-w-3/4 rounded-md px-4 py-2 wrap-anywhere after:absolute after:right-0 after:bottom-0 after:block after:translate-y-1/2 ${
								i % 2
									? "after:left-0 after:-translate-x-1/2"
									: "after:translate-x-1/2"
							} after:aspect-square after:w-4 after:rotate-45`}
						>
							{message}
						</span>
					))}

					{isSending && (
						<span
							className={`relative flex w-fit max-w-3/4 gap-2 rounded-md bg-neutral-600 px-4 py-2 after:absolute after:right-0 after:bottom-0 after:left-0 after:block after:aspect-square after:w-4 after:-translate-x-1/2 after:translate-y-1/2 after:rotate-45 after:bg-neutral-600`}
						>
							<div className="aspect-square w-3 animate-[bounce_1s_infinite_0ms] rounded-full bg-neutral-200"></div>
							<div className="aspect-square w-3 animate-[bounce_1s_infinite_50ms] rounded-full bg-neutral-200"></div>
							<div className="aspect-square w-3 animate-[bounce_1s_infinite_100ms] rounded-full bg-neutral-200"></div>
						</span>
					)}
				</div>
			)}

			<form
				onSubmit={SendData}
				className="relative left-1/2 flex h-auto max-h-36 min-h-12 -translate-x-1/2 items-end justify-between gap-4 rounded-2xl bg-neutral-800 p-2 shadow-2xl"
			>
				<textarea
					onChange={(ev) => {
						setMessage(ev.target.value);
					}}
					ref={inputBox}
					onKeyUp={input}
					value={message}
					name="chat-input"
					className="h-12 max-h-full min-h-12 w-11/12 resize-none border-none bg-transparent wrap-anywhere text-white ring-0 outline-0 placeholder:text-neutral-300"
					placeholder="Ask for help with your mental health"
				></textarea>
				<button
					type="submit"
					disabled={isSending || message.length <= 0}
					className="h-10 cursor-pointer rounded-full bg-white p-2 disabled:cursor-not-allowed disabled:bg-neutral-500"
				>
					<img
						src={ArrowUp}
						alt="Arrow Up"
						className="z-10 aspect-square h-full"
					/>
				</button>
			</form>
		</div>
	);
}

export default ChatBox;
