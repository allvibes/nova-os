'use client'

import { useState } from "react";
import { Plus } from "lucide-react";

type Client = {
  id: number;
  name: string;
  email: string;
  company: string;
  status: "Active" | "Inactive";
};

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      company: "Nike",
      status: "Active",
    },
    {
      id: 2,
      name: "Sarah Smith",
      email: "sarah@example.com",
      company: "Spotify",
      status: "Inactive",
    },
  ]);

  const [newClient, setNewClient] = useState("");

  const addClient = () => {
    if (!newClient.trim()) return;

    setClients([
      ...clients,
      {
        id: Date.now(),
        name: newClient,
        email: "new@email.com",
        company: "New Company",
        status: "Active",
      },
    ]);

    setNewClient("");
  };

  const getStatusColor = (status: string) => {
    return status === "Active"
      ? "text-green-400"
      : "text-gray-400";
  };

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">
          Clients
        </h1>

        <div className="flex gap-2">
          <input
            value={newClient}
            onChange={(e) => setNewClient(e.target.value)}
            placeholder="New client name..."
            className="nova-input px-4 py-2"
          />

          <button
            onClick={addClient}
            className="nova-btn-primary px-4 py-2 rounded-xl flex items-center gap-2"
          >
            <Plus size={16} />
            Add
          </button>
        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-3 gap-6">

        {clients.map((client) => (
          <div
            key={client.id}
            className="
              nova-card
              p-5
              rounded-2xl
              nova-card-hover
              cursor-pointer
            "
          >
            {/* AVATAR */}
            <div className="
              w-10 h-10
              rounded-full
              bg-gradient-to-br from-indigo-500 to-purple-500
              flex items-center justify-center
              text-sm font-bold
              mb-3
            ">
              {client.name.charAt(0)}
            </div>

            {/* NAME */}
            <h2 className="text-sm font-semibold">
              {client.name}
            </h2>

            {/* COMPANY */}
            <p className="text-xs text-gray-400 mt-1">
              {client.company}
            </p>

            {/* EMAIL */}
            <p className="text-xs text-gray-500 mt-1">
              {client.email}
            </p>

            {/* STATUS */}
            <div className="mt-3 text-xs flex items-center justify-between">
              <span className={getStatusColor(client.status)}>
                {client.status}
              </span>

              <span className="text-gray-500">
                ID-{client.id.toString().slice(-4)}
              </span>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}