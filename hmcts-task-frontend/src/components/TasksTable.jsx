import Table from "./Table";
import { TaskRow } from "./TaskRow";

function TasksTable({ tasks, onSetTask }) {
  return (
    <div>
      <Table columns="1.5fr 2.5fr 2fr 2fr 2fr 2fr 2fr">
        <Table.Header>
          <div>Number</div>
          <div>Case Number</div>
          <div>Title</div>
          <div>Description</div>
          <div>Case Status</div>
          <div>Created At</div>
        </Table.Header>

        <Table.Body
          data={tasks.sort(
            (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
          )}
          render={(task, i) => (
            <TaskRow
              key={task.id}
              task={task}
              onSetTask={onSetTask}
              counter={i + 1}
            />
          )}
        />
      </Table>
    </div>
  );
}
export default TasksTable;
