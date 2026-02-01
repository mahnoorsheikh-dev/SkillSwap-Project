import React from "react";

const API_URL = import.meta.env.VITE_API_URL;

export default function ChatSidebar({ chats, selectContact, userId }) {
  return (
    <div className="w-1/3 border-r bg-[#f8f9fa]">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold text-[#1D3557]">Chats</h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        {chats.map(chat => {
          const otherUser = chat.users.find(u => u._id !== userId);
          if (!otherUser) return null;

          return (
            <div
              key={chat._id}
              onClick={() =>
                selectContact({
                  chatId: chat._id,
                  _id: otherUser._id,
                  name: otherUser.name,
                  avatar: otherUser.avatar,
                })
              }
              className="flex items-center gap-3 p-4 hover:bg-gray-100 cursor-pointer"
            >
              <img
                src={
                  otherUser.avatar
                    ? `${API_URL}${otherUser.avatar}`
                    : "https://via.placeholder.com/40"
                }
                className="w-10 h-10 rounded-full"
              />
              <div>
                <span className="font-semibold">{otherUser.name}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
