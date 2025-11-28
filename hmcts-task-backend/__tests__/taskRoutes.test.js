import { describe, it, expect, afterAll } from "@jest/globals";
import request from "supertest";
import app from "../app.js";
import prisma from "../db.js";

// Integration tests using test database
describe("Task Routes - Integration Tests", () => {
  // Clean up after all tests
  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe("GET /", () => {
    // Verify that the root endpoint returns basic server information and available endpoints
    it("should return server info", async () => {
      const response = await request(app).get("/");

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty(
        "message",
        "HMCTS server is running"
      );
      expect(response.body).toHaveProperty("endpoints");
    });
  });

  describe("GET /tasks", () => {
    // Verify that tasks are returned successfully
    it("should return all tasks", async () => {
      await prisma.tasks.create({
        data: {
          title: "Test Task",
          description: "Description",
          status: "PENDING",
          createdDate: new Date(),
        },
      });

      const response = await request(app).get("/tasks");

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe("POST /tasks", () => {
    // Test successful task creation with validation
    it("should create a new task with valid data", async () => {
      const newTask = {
        title: "New Task",
        description: "Task Description",
        status: "PENDING",
        createdDate: "2025-11-28T10:00:00Z",
      };

      const response = await request(app)
        .post("/tasks")
        .send(newTask)
        .set("Content-Type", "application/json");

      expect(response.status).toBe(201);
      expect(response.body.title).toBe("New Task");
      expect(response.body.status).toBe("PENDING");
      expect(response.body).toHaveProperty("id");
      expect(response.body).toHaveProperty("caseNumber");
    });

    // Validate that required fields are enforced
    it("should return 400 when required fields are missing", async () => {
      const response = await request(app).post("/tasks").send({
        description: "Test",
      });

      expect(response.status).toBe(400);
    });
  });

  describe("PUT /tasks/:id", () => {
    // Test successful task update
    it("should update a task", async () => {
      const task = await prisma.tasks.create({
        data: {
          title: "Original Title",
          description: "Original Description",
          status: "PENDING",
          createdDate: new Date("2025-11-20T09:00:00Z"),
        },
      });

      const response = await request(app).put(`/tasks/${task.id}`).send({
        title: "Updated Title",
        status: "COMPLETED",
      });

      expect(response.status).toBe(200);
      expect(response.body.title).toBe("Updated Title");
      expect(response.body.status).toBe("COMPLETED");
    });
  });

  describe("DELETE /tasks/:id", () => {
    // Test successful task deletion
    it("should delete a task", async () => {
      const task = await prisma.tasks.create({
        data: {
          title: "Test",
          description: "Test",
          status: "PENDING",
          createdDate: new Date(),
        },
      });

      const response = await request(app).delete(`/tasks/${task.id}`);

      expect(response.status).toBe(204);
    });
  });
});
