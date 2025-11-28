import { useState } from "react";
import toast from "react-hot-toast";
import { toDateTimeLocal } from "../utilities/toDateTimeLocal";
import { Button } from "./TaskRow";
import { API_URL } from "../config";

export default function TaskForm({ task, type, onSetTask, onSetOpen }) {
  const [form, setForm] = useState({
    id: "",
    caseNumber: "",
    title: "",
    description: "",
    status: "PENDING",
    createdDate: toDateTimeLocal(new Date()),
  });
  const [error, setError] = useState("");

  if (task && form.id === "") {
    setForm({
      id: task.id,
      caseNumber: task.caseNumber,
      title: task.title,
      description: task.description,
      status: task.status,
      createdDate: toDateTimeLocal(task.createdDate),
    });
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    const compatibleFormData = {
      ...form,
      createdDate: new Date(form.createdDate).toISOString(),
    };

    if (type === "create") {
      try {
        const res = await fetch(`${API_URL}/tasks`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(compatibleFormData),
        });

        const data = await res.json();

        if (!res.ok) return setError(data.error);

        onSetTask((prev) => [...prev, data]);
        onSetOpen(false);
        toast.success("Task created successfully!");
      } catch (error) {
        console.error(error);
        setError("Create error");
        toast.error("Failed to create task");
      }
    } else if (type === "update") {
      try {
        const res = await fetch(`${API_URL}/tasks/${form.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(compatibleFormData),
        });
        const data = await res.json();
        if (!res.ok) return setError(data.error);
        onSetTask((prev) => [...prev.filter((t) => t.id !== data.id), data]);
        onSetOpen(false);
        toast.success("Task updated successfully!");
      } catch {
        setError("Update error");
        toast.error("Failed to update task");
      }
    }
  };
  return (
    <div>
      <h2>{type === "create" ? "Create Task:" : "Update Task:"}</h2>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          maxWidth: "400px",
        }}
      >
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
          style={{ border: "1px solid #ccc", borderRadius: "5px" }}
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          style={{ border: "1px solid #ccc", borderRadius: "5px" }}
        />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          style={{ border: "1px solid #ccc", borderRadius: "5px" }}
        >
          <option value="PENDING">Pending</option>
          <option value="INPROGRESS">In progress</option>
          <option value="COMPLETED">Completed</option>
          <option value="CANCELLED">Cancelled</option>
        </select>

        <input
          type="datetime-local"
          name="createdDate"
          value={form.createdDate}
          onChange={handleChange}
          required
          style={{ border: "1px solid #ccc", borderRadius: "5px" }}
        />

        {
          <Button
            type="submit"
            style={{ border: "1px solid #ccc", borderRadius: "5px" }}
          >
            {type === "create" ? "Create Task" : "Update Task"}
          </Button>
        }
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
