import express from "express";
import prisma from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const tasks = await prisma.tasks.findMany({
      orderBy: {
        createdDate: "desc",
      },
    });
    res.status(200).json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch tasks." });
  }
});

router.post("/", async (req, res) => {
  const { title, description, status, createdDate } = req.body;

  try {
    if (!title || title.trim() === "") {
      return res.status(400).json({ error: "Title is required." });
    }
    if (!status) {
      return res.status(400).json({ error: "Status is required." });
    }

    // Validate status against enum values
    const validStatuses = ["PENDING", "INPROGRESS", "COMPLETED", "CANCELLED"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        error: `Status must be one of: ${validStatuses.join(", ")}`,
      });
    }

    if (!createdDate || isNaN(Date.parse(createdDate))) {
      return res.status(400).json({ error: "Valid createdDate is required." });
    }

    const createdTask = await prisma.tasks.create({
      data: {
        title,
        description: description || "",
        status,
        createdDate: new Date(createdDate),
      },
    });

    res.status(201).json(createdTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create task." });
  }
});

router.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { status } = req.body;

  try {
    // Validate status if provided
    if (status) {
      const validStatuses = ["PENDING", "INPROGRESS", "COMPLETED", "CANCELLED"];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({
          error: `Status must be one of: ${validStatuses.join(", ")}`,
        });
      }
    }

    const updatedTask = await prisma.tasks.update({
      where: { id },
      data: req.body,
    });

    res.status(200).json(updatedTask);
  } catch (err) {
    console.error(err);
    if (err.code === "P2025") {
      return res.status(404).json({ error: "Task not found." });
    }
    res.status(500).json({ error: "Failed to update task." });
  }
});

router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await prisma.tasks.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    if (err.code === "P2025") {
      return res.status(404).json({ error: "Task not found." });
    }
    res.status(500).json({ error: "Failed to delete task." });
  }
});

export default router;
