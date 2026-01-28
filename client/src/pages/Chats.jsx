import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ChatSidebar from "../components/ChatSidebar";
import ChatWindow from "../components/ChatWindow";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export default function Chats() {
  const location = useLocation();
  const [selectedContact, setSelectedContact] = useState(null);
  const [chats, setChats] = useState([]);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const id = localStorage.getItem("userId");
    setUserId(id);
    loadChats(id);
  }, []);

  useEffect(() => {
    if (location.state?.selectedContact) {
      setSelectedContact(location.state.selectedContact);
    }
  }, [location.state]);

  const loadChats = async (id) => {
    const res = await axios.get(`${API_URL}/api/chats/${id}`);
    setChats(res.data);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-6 font-inter">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden flex h-[85vh] border">
        <ChatSidebar chats={chats} selectContact={setSelectedContact} />
        <ChatWindow selectedContact={selectedContact} reloadChats={() => loadChats(userId)} />
      </div>
    </div>
  );
}
