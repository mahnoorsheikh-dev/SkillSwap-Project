export default function ChatMessage({ text, sender, avatar, isOwn }) {
  const isUser = isOwn;

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3`}>
      {!isUser && (
        <img
          src={avatar}
          alt={sender?.name || "User"}
          className="w-10 h-10 rounded-full mr-2"
        />
      )}

      <div
        className={`px-4 py-2 rounded-lg max-w-xs text-sm ${
          isUser
            ? "bg-[#457B9D] text-white rounded-br-none"
            : "bg-gray-200 text-[#1D3557] rounded-bl-none"
        }`}
      >
        {text}
      </div>

      {isUser && (
        <img
          src="https://via.placeholder.com/40/457B9D"
          alt="You"
          className="w-10 h-10 rounded-full ml-2"
        />
      )}
    </div>
  );
}
