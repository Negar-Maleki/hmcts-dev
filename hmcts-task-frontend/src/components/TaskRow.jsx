import { useState } from "react";
import Table from "./Table";
import Modal from "./Modal";
import TaskForm from "./TaskForm";
import styled from "styled-components";
import toast from "react-hot-toast";
import { API_URL } from "../config";

export const Button = styled.button`
  background: #ccc;
  border: none;
  padding: 0.4rem;
  border-radius: 8px;
  transition: all 0.2s;
  margin-top: 2rem;
  margin-left: 5px;
  &:hover {
    background-color: #8e8e8e;
  }
`;

export function TaskRow({ task, onSetTask, counter }) {
  const [open, setOpen] = useState(false);

  async function handleDelete() {
    await fetch(`${API_URL}/tasks/${task.id}`, {
      method: "DELETE",
    });
    onSetTask((prev) => prev.filter((t) => t.id !== task.id));
    toast.success("Task deleted successfully!");
  }

  return (
    <Table.Row>
      <div>{counter}</div>
      <div>{task.caseNumber}</div>
      <div>{task.title}</div>
      <div>{task.description}</div>
      <div>{task.status}</div>
      <div>{new Date(task.createdDate).toLocaleString()}</div>
      <div>
        <Button onClick={() => setOpen(true)}>Edit</Button>
        <Modal open={open} onClose={() => setOpen(false)}>
          <TaskForm
            task={task}
            type="update"
            onSetTask={onSetTask}
            onSetOpen={setOpen}
          />
        </Modal>

        <Button onClick={handleDelete} style={{ backgroundColor: "#f82f57a7" }}>
          Delete
        </Button>
      </div>
    </Table.Row>
  );
}
