import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Table from "../components/Table";

describe("Table Component", () => {
  it("should render table with header", () => {
    render(
      <Table columns="1fr 1fr 1fr">
        <Table.Header>
          <div>ID</div>
          <div>Name</div>
          <div>Status</div>
        </Table.Header>
        <Table.Body data={[]} render={() => null} />
      </Table>
    );

    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
  });

  it("should render empty message when no data", () => {
    render(
      <Table columns="1fr 1fr">
        <Table.Header>
          <div>Column 1</div>
          <div>Column 2</div>
        </Table.Header>
        <Table.Body data={[]} render={() => null} />
      </Table>
    );

    expect(screen.getByText("No data available.")).toBeInTheDocument();
  });

  it("should render data rows using render function", () => {
    const mockData = [
      { id: 1, name: "Task 1" },
      { id: 2, name: "Task 2" },
    ];

    render(
      <Table columns="1fr 1fr">
        <Table.Header>
          <div>ID</div>
          <div>Name</div>
        </Table.Header>
        <Table.Body
          data={mockData}
          render={(item) => (
            <Table.Row key={item.id}>
              <div>{item.id}</div>
              <div>{item.name}</div>
            </Table.Row>
          )}
        />
      </Table>
    );

    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();
  });
});
