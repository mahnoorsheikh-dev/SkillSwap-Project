import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "../components/FindConnectionSearchBar";
import UserCard from "../components/FindConnectionUserCard";

const API_URL = import.meta.env.VITE_API_URL;

export default function FindConnection({ reloadChats }) {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/profile?search=${search}`);
        setUsers(res.data.users || []);
      } catch (err) {
        console.error("Error fetching profiles:", err);
      }
    };

    fetchUsers();
  }, [search]);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-[#1D3557] to-[#457B9D] text-transparent bg-clip-text mb-6">
          Find Connection
        </h1>

        <SearchBar search={search} setSearch={setSearch} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.length > 0 ? (
            users.map((user) => (
              <UserCard key={user._id} user={user} reloadChats={reloadChats} />
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No connections found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
