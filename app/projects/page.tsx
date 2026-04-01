'use client'

import { useState } from "react";
import { Plus } from "lucide-react";

type Project = {
  id: number;
  name: string;
  client: string;
  status: "Active" | "Completed" | "Pending";
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([
    { id: 1, name: "Website Redesign", client: "Nike", status: "Active" },
    { id: 2, name: "Mobile App UI", client: "Spotify", status: "Pending" },
    { id: 3, name: "Dashboard System", client: "Stripe", status: "Completed" },
  ]);

  const [newProject, setNewProject] = useState("");

  const addProject = () => {
    if (!newProject.trim()) return;

    setProjects([
      ...projects,
      {
        id: Date.now(),
        name: newProject,
        client: "New Client",
        status: "Pending",
      },
    ]);

    setNewProject("");
  };

  const getStatusColor = (status: string) => {
    if (status === "Active") return "text-green-400";
    if (status === "Pending") return "text-yellow-400";
    return "text-gray-400";
  };

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">
          Projects
        </h1>

        <div className="flex gap-2">
          <input
            value={newProject}
            onChange={(e) => setNewProject(e.target.value)}
            placeholder="New project..."
            className="nova-input px-4 py-2"
          />

          <button
            onClick={addProject}
            className="nova-btn-primary px-4 py-2 rounded-xl flex items-center gap-2"
          >
            <Plus size={16} />
            Add
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="nova-card overflow-hidden">

        <table className="w-full text-sm">

          <thead className="text-left text-gray-400 border-b border-white/10">
            <tr>
              <th className="p-4">Project</th>
              <th className="p-4">Client</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {projects.map((project) => (
              <tr
                key={project.id}
                className="border-b border-white/5 hover:bg-white/5 transition"
              >
                <td className="p-4">{project.name}</td>
                <td className="p-4">{project.client}</td>
                <td className={`p-4 ${getStatusColor(project.status)}`}>
                  {project.status}
                </td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>
    </div>
  );
}