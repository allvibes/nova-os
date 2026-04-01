'use client'

import { useState } from "react";
import { Plus } from "lucide-react";

type Task = {
  id: number;
  title: string;
  status: "todo" | "progress" | "done";
  priority: "low" | "medium" | "high";
};

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Design landing page", status: "todo", priority: "high" },
    { id: 2, title: "Build dashboard UI", status: "progress", priority: "medium" },
    { id: 3, title: "Client onboarding flow", status: "done", priority: "low" },
  ]);

  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (!newTask.trim()) return;

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        title: newTask,
        status: "todo",
        priority: "medium",
      },
    ]);

    setNewTask("");
  };

  const columns = [
    { title: "To Do", key: "todo" },
    { title: "In Progress", key: "progress" },
    { title: "Done", key: "done" },
  ];

  const getPriorityColor = (priority: string) => {
    if (priority === "high") return "text-red-400";
    if (priority === "medium") return "text-yellow-400";
    return "text-green-400";
  };

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">
          Task Manager
        </h1>

        <div className="flex gap-2">
          <input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add new task..."
            className="nova-input px-4 py-2"
          />

          <button
            onClick={addTask}
            className="nova-btn-primary px-4 py-2 rounded-xl flex items-center gap-2"
          >
            <Plus size={16} />
            Add
          </button>
        </div>
      </div>

      {/* BOARD */}
      <div className="grid grid-cols-3 gap-6">

        {columns.map((col) => (
          <div key={col.key} className="space-y-4">

            {/* COLUMN HEADER */}
            <div className="flex items-center justify-between">
              <h2 className="text-sm text-gray-400 uppercase tracking-wider">
                {col.title}
              </h2>
              <span className="text-xs text-gray-500">
                {tasks.filter((t) => t.status === col.key).length}
              </span>
            </div>

            {/* TASK LIST */}
            <div className="space-y-3">

              {tasks
                .filter((task) => task.status === col.key)
                .map((task) => (
                  <div
                    key={task.id}
                    className="
                      nova-card
                      p-4
                      rounded-xl
                      nova-card-hover
                      cursor-pointer
                    "
                  >
                    <p className="text-sm font-medium">
                      {task.title}
                    </p>

                    <div className="flex items-center justify-between mt-2 text-xs">
                      <span className={getPriorityColor(task.priority)}>
                        {task.priority}
                      </span>

                      <span className="text-gray-500">
                        ID-{task.id.toString().slice(-4)}
                      </span>
                    </div>
                  </div>
                ))}

            </div>
          </div>
        ))}

      </div>
    </div>
  );
}