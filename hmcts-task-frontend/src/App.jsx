import styled from "styled-components";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import TasksTable from "./components/TasksTable";
import TaskForm from "./components/TaskForm";

import Modal from "./components/Modal";
import { API_URL } from "./config";
import { Button } from "./components/TaskRow";

const StyledLink = styled.a`
  color: #fff;
  text-decoration: none;
  margin-right: 8px;
  font-family: "GDS Transport", Arial, sans-serif;
  font-size: 30px;
  font-weight: 700;

  &:hover {
    text-decoration: underline;
  }
`;

const Header = styled.header`
  background-color: black;
  height: 3rem;
  width: 100%;
  border-bottom: 10px solid #ffffff;
`;
const StyledHeaderContent = styled.div`
  position: relative;
  margin-bottom: -10px;
  padding-top: 10px;
  border-bottom: 10px solid #1d70b8;
  margin-right: auto;
  margin-left: auto;
  display: flex;
  align-items: center;
  max-width: 1020px;
`;
export default function App() {
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    fetch(`${API_URL}/tasks`)
      .then((res) => res.json())
      .then((data) => setTasks(data));

    return () => {};
  }, []);
  return (
    <>
      <Header>
        <StyledHeaderContent>
          <div>
            <img
              src="/govuk-logotype-crown.png"
              width="36"
              height="32"
              style={{ marginRight: "2px" }}
            ></img>
            <StyledLink href="https://www.gov.uk/">GOV.UK</StyledLink>
          </div>
        </StyledHeaderContent>
      </Header>
      <div style={{ width: "1020px", margin: "0 auto" }}>
        <Button onClick={() => setOpen(true)}>Create a new task</Button>
        <Modal open={open} onClose={() => setOpen(false)}>
          <TaskForm type="create" onSetTask={setTasks} onSetOpen={setOpen} />
        </Modal>
        <TasksTable tasks={tasks} onSetTask={setTasks} />
        <Toaster
          position="top-right"
          reverseOrder={false}
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: { duration: 3000 },
            error: { duration: 5000 },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "#fff9f9",
              color: "#393838",
            },
          }}
        />
      </div>
    </>
  );
}
