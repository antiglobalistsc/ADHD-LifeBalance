import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertPillarSchema, 
  insertProjectSchema, 
  insertTaskSchema, 
  insertTimeBlockSchema,
  insertBalanceMetricsSchema,
  insertUserSettingsSchema
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Pillars routes
  app.get("/api/pillars/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const pillars = await storage.getPillarsByUserId(userId);
      res.json(pillars);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch pillars" });
    }
  });

  app.post("/api/pillars", async (req, res) => {
    try {
      const validatedData = insertPillarSchema.parse(req.body);
      const pillar = await storage.createPillar(validatedData);
      res.json(pillar);
    } catch (error) {
      res.status(400).json({ message: "Invalid pillar data" });
    }
  });

  app.patch("/api/pillars/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      const pillar = await storage.updatePillar(id, updates);
      if (!pillar) {
        return res.status(404).json({ message: "Pillar not found" });
      }
      res.json(pillar);
    } catch (error) {
      res.status(500).json({ message: "Failed to update pillar" });
    }
  });

  // Projects routes
  app.get("/api/projects/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const projects = await storage.getProjectsByUserId(userId);
      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  app.post("/api/projects", async (req, res) => {
    try {
      const validatedData = insertProjectSchema.parse(req.body);
      const project = await storage.createProject(validatedData);
      res.json(project);
    } catch (error) {
      res.status(400).json({ message: "Invalid project data" });
    }
  });

  app.patch("/api/projects/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      const project = await storage.updateProject(id, updates);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      res.status(500).json({ message: "Failed to update project" });
    }
  });

  app.delete("/api/projects/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const success = await storage.deleteProject(id);
      if (!success) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete project" });
    }
  });

  // Tasks routes
  app.get("/api/tasks/:projectId", async (req, res) => {
    try {
      const { projectId } = req.params;
      const tasks = await storage.getTasksByProjectId(projectId);
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch tasks" });
    }
  });

  app.post("/api/tasks", async (req, res) => {
    try {
      const validatedData = insertTaskSchema.parse(req.body);
      const task = await storage.createTask(validatedData);
      res.json(task);
    } catch (error) {
      res.status(400).json({ message: "Invalid task data" });
    }
  });

  app.patch("/api/tasks/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      const task = await storage.updateTask(id, updates);
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
      res.json(task);
    } catch (error) {
      res.status(500).json({ message: "Failed to update task" });
    }
  });

  app.delete("/api/tasks/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const success = await storage.deleteTask(id);
      if (!success) {
        return res.status(404).json({ message: "Task not found" });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete task" });
    }
  });

  // Time blocks routes
  app.get("/api/timeblocks/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const { date } = req.query;
      const timeBlocks = await storage.getTimeBlocksByUserId(userId, date as string);
      res.json(timeBlocks);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch time blocks" });
    }
  });

  app.post("/api/timeblocks", async (req, res) => {
    try {
      const validatedData = insertTimeBlockSchema.parse(req.body);
      const timeBlock = await storage.createTimeBlock(validatedData);
      res.json(timeBlock);
    } catch (error) {
      res.status(400).json({ message: "Invalid time block data" });
    }
  });

  app.patch("/api/timeblocks/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      const timeBlock = await storage.updateTimeBlock(id, updates);
      if (!timeBlock) {
        return res.status(404).json({ message: "Time block not found" });
      }
      res.json(timeBlock);
    } catch (error) {
      res.status(500).json({ message: "Failed to update time block" });
    }
  });

  app.delete("/api/timeblocks/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const success = await storage.deleteTimeBlock(id);
      if (!success) {
        return res.status(404).json({ message: "Time block not found" });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete time block" });
    }
  });

  // Balance metrics routes
  app.get("/api/balance/:userId/:date", async (req, res) => {
    try {
      const { userId, date } = req.params;
      const metrics = await storage.getBalanceMetrics(userId, date);
      if (!metrics) {
        return res.status(404).json({ message: "Balance metrics not found" });
      }
      res.json(metrics);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch balance metrics" });
    }
  });

  app.post("/api/balance", async (req, res) => {
    try {
      const validatedData = insertBalanceMetricsSchema.parse(req.body);
      const metrics = await storage.createBalanceMetrics(validatedData);
      res.json(metrics);
    } catch (error) {
      res.status(400).json({ message: "Invalid balance metrics data" });
    }
  });

  app.patch("/api/balance/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      const metrics = await storage.updateBalanceMetrics(id, updates);
      if (!metrics) {
        return res.status(404).json({ message: "Balance metrics not found" });
      }
      res.json(metrics);
    } catch (error) {
      res.status(500).json({ message: "Failed to update balance metrics" });
    }
  });

  // User settings routes
  app.get("/api/settings/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const settings = await storage.getUserSettings(userId);
      if (!settings) {
        return res.status(404).json({ message: "User settings not found" });
      }
      res.json(settings);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user settings" });
    }
  });

  app.post("/api/settings", async (req, res) => {
    try {
      const validatedData = insertUserSettingsSchema.parse(req.body);
      const settings = await storage.createUserSettings(validatedData);
      res.json(settings);
    } catch (error) {
      res.status(400).json({ message: "Invalid user settings data" });
    }
  });

  app.patch("/api/settings/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      const settings = await storage.updateUserSettings(id, updates);
      if (!settings) {
        return res.status(404).json({ message: "User settings not found" });
      }
      res.json(settings);
    } catch (error) {
      res.status(500).json({ message: "Failed to update user settings" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
