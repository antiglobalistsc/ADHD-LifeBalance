import { 
  type User, type InsertUser,
  type Pillar, type InsertPillar,
  type Project, type InsertProject,
  type Task, type InsertTask,
  type TimeBlock, type InsertTimeBlock,
  type BalanceMetrics, type InsertBalanceMetrics,
  type UserSettings, type InsertUserSettings
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Pillar methods
  getPillarsByUserId(userId: string): Promise<Pillar[]>;
  createPillar(pillar: InsertPillar): Promise<Pillar>;
  updatePillar(id: string, updates: Partial<Pillar>): Promise<Pillar | undefined>;

  // Project methods
  getProjectsByUserId(userId: string): Promise<Project[]>;
  getProject(id: string): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: string, updates: Partial<Project>): Promise<Project | undefined>;
  deleteProject(id: string): Promise<boolean>;

  // Task methods
  getTasksByProjectId(projectId: string): Promise<Task[]>;
  getTask(id: string): Promise<Task | undefined>;
  createTask(task: InsertTask): Promise<Task>;
  updateTask(id: string, updates: Partial<Task>): Promise<Task | undefined>;
  deleteTask(id: string): Promise<boolean>;

  // Time block methods
  getTimeBlocksByUserId(userId: string, date?: string): Promise<TimeBlock[]>;
  createTimeBlock(timeBlock: InsertTimeBlock): Promise<TimeBlock>;
  updateTimeBlock(id: string, updates: Partial<TimeBlock>): Promise<TimeBlock | undefined>;
  deleteTimeBlock(id: string): Promise<boolean>;

  // Balance metrics methods
  getBalanceMetrics(userId: string, date: string): Promise<BalanceMetrics | undefined>;
  createBalanceMetrics(metrics: InsertBalanceMetrics): Promise<BalanceMetrics>;
  updateBalanceMetrics(id: string, updates: Partial<BalanceMetrics>): Promise<BalanceMetrics | undefined>;

  // User settings methods
  getUserSettings(userId: string): Promise<UserSettings | undefined>;
  createUserSettings(settings: InsertUserSettings): Promise<UserSettings>;
  updateUserSettings(id: string, updates: Partial<UserSettings>): Promise<UserSettings | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User> = new Map();
  private pillars: Map<string, Pillar> = new Map();
  private projects: Map<string, Project> = new Map();
  private tasks: Map<string, Task> = new Map();
  private timeBlocks: Map<string, TimeBlock> = new Map();
  private balanceMetrics: Map<string, BalanceMetrics> = new Map();
  private userSettings: Map<string, UserSettings> = new Map();

  constructor() {
    this.initializeDefaultData();
  }

  private initializeDefaultData() {
    // Create a default user
    const defaultUser: User = {
      id: "default-user",
      username: "demo",
      password: "demo"
    };
    this.users.set(defaultUser.id, defaultUser);

    // Create default pillars
    const pillars = [
      { id: "pillar-health", userId: "default-user", name: "Health", color: "#10B981", weeklyScore: 85, weeklyHours: 18 },
      { id: "pillar-wealth", userId: "default-user", name: "Wealth", color: "#F59E0B", weeklyScore: 65, weeklyHours: 32 },
      { id: "pillar-love", userId: "default-user", name: "Love", color: "#EC4899", weeklyScore: 78, weeklyHours: 12 },
      { id: "pillar-happiness", userId: "default-user", name: "Happiness", color: "#3B82F6", weeklyScore: 82, weeklyHours: 9 }
    ];
    pillars.forEach(pillar => this.pillars.set(pillar.id, pillar));

    // Create default projects
    const projects = [
      {
        id: "project-security",
        userId: "default-user",
        pillarId: "pillar-wealth",
        title: "Security+ Certification",
        description: "Complete CompTIA Security+ certification to advance career",
        progress: 35,
        dueDate: "2025-01-30",
        status: "active",
        priority: "high",
        estimatedHours: 120
      },
      {
        id: "project-dispatch",
        userId: "default-user",
        pillarId: "pillar-wealth",
        title: "DispatchThrive Development",
        description: "Build and launch the DispatchThrive platform",
        progress: 58,
        dueDate: "2025-02-15",
        status: "active",
        priority: "high",
        estimatedHours: 200
      }
    ];
    projects.forEach(project => this.projects.set(project.id, project));

    // Create default tasks
    const tasks = [
      { id: "task-1", projectId: "project-security", title: "Chapter 1-3: Network Security", completed: true, order: 1, estimatedMinutes: 180, energyLevel: "high" },
      { id: "task-2", projectId: "project-security", title: "Chapter 4-6: Identity Management", completed: false, order: 2, estimatedMinutes: 240, energyLevel: "high" },
      { id: "task-3", projectId: "project-security", title: "Practice Tests (3 sessions)", completed: false, order: 3, estimatedMinutes: 180, energyLevel: "medium" },
      { id: "task-4", projectId: "project-dispatch", title: "User Authentication System", completed: true, order: 1, estimatedMinutes: 480, energyLevel: "high" },
      { id: "task-5", projectId: "project-dispatch", title: "Dashboard Analytics", completed: false, order: 2, estimatedMinutes: 360, energyLevel: "high" }
    ];
    tasks.forEach(task => this.tasks.set(task.id, task));

    // Create default time blocks for today
    const today = new Date().toISOString().split('T')[0];
    const timeBlocks = [
      { id: "block-1", userId: "default-user", date: today, startTime: "09:00", endTime: "10:00", pillarId: "pillar-health", title: "Morning Workout", energyRequired: "high", type: "personal" },
      { id: "block-2", userId: "default-user", date: today, startTime: "11:00", endTime: "14:00", projectId: "project-dispatch", pillarId: "pillar-wealth", title: "Deep Work: DispatchThrive", energyRequired: "high", type: "work" },
      { id: "block-3", userId: "default-user", date: today, startTime: "14:00", endTime: "16:00", projectId: "project-security", pillarId: "pillar-wealth", title: "Security+ Study", energyRequired: "medium", type: "work" },
      { id: "block-4", userId: "default-user", date: today, startTime: "19:00", endTime: "20:00", pillarId: "pillar-love", title: "Quality Time with Partner", energyRequired: "low", type: "personal" }
    ];
    timeBlocks.forEach(block => this.timeBlocks.set(block.id, block));

    // Create default balance metrics
    const balanceMetrics: BalanceMetrics = {
      id: "metrics-today",
      userId: "default-user",
      date: today,
      healthScore: 85,
      wealthScore: 65,
      loveScore: 78,
      happinessScore: 82,
      overallBalance: 72,
      overwhelmLevel: "yellow"
    };
    this.balanceMetrics.set(balanceMetrics.id, balanceMetrics);

    // Create default user settings
    const settings: UserSettings = {
      id: "settings-default",
      userId: "default-user",
      energyLevel: "medium",
      workingHours: { start: "09:00", end: "17:00" },
      notifications: true,
      overwhelmThreshold: 8
    };
    this.userSettings.set(settings.id, settings);
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Pillar methods
  async getPillarsByUserId(userId: string): Promise<Pillar[]> {
    return Array.from(this.pillars.values()).filter(pillar => pillar.userId === userId);
  }

  async createPillar(insertPillar: InsertPillar): Promise<Pillar> {
    const id = randomUUID();
    const pillar: Pillar = { ...insertPillar, id };
    this.pillars.set(id, pillar);
    return pillar;
  }

  async updatePillar(id: string, updates: Partial<Pillar>): Promise<Pillar | undefined> {
    const pillar = this.pillars.get(id);
    if (!pillar) return undefined;
    const updated = { ...pillar, ...updates };
    this.pillars.set(id, updated);
    return updated;
  }

  // Project methods
  async getProjectsByUserId(userId: string): Promise<Project[]> {
    return Array.from(this.projects.values()).filter(project => project.userId === userId);
  }

  async getProject(id: string): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = randomUUID();
    const project: Project = { ...insertProject, id };
    this.projects.set(id, project);
    return project;
  }

  async updateProject(id: string, updates: Partial<Project>): Promise<Project | undefined> {
    const project = this.projects.get(id);
    if (!project) return undefined;
    const updated = { ...project, ...updates };
    this.projects.set(id, updated);
    return updated;
  }

  async deleteProject(id: string): Promise<boolean> {
    return this.projects.delete(id);
  }

  // Task methods
  async getTasksByProjectId(projectId: string): Promise<Task[]> {
    return Array.from(this.tasks.values())
      .filter(task => task.projectId === projectId)
      .sort((a, b) => a.order - b.order);
  }

  async getTask(id: string): Promise<Task | undefined> {
    return this.tasks.get(id);
  }

  async createTask(insertTask: InsertTask): Promise<Task> {
    const id = randomUUID();
    const task: Task = { ...insertTask, id };
    this.tasks.set(id, task);
    return task;
  }

  async updateTask(id: string, updates: Partial<Task>): Promise<Task | undefined> {
    const task = this.tasks.get(id);
    if (!task) return undefined;
    const updated = { ...task, ...updates };
    this.tasks.set(id, updated);
    return updated;
  }

  async deleteTask(id: string): Promise<boolean> {
    return this.tasks.delete(id);
  }

  // Time block methods
  async getTimeBlocksByUserId(userId: string, date?: string): Promise<TimeBlock[]> {
    return Array.from(this.timeBlocks.values())
      .filter(block => block.userId === userId && (!date || block.date === date))
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
  }

  async createTimeBlock(insertTimeBlock: InsertTimeBlock): Promise<TimeBlock> {
    const id = randomUUID();
    const timeBlock: TimeBlock = { ...insertTimeBlock, id };
    this.timeBlocks.set(id, timeBlock);
    return timeBlock;
  }

  async updateTimeBlock(id: string, updates: Partial<TimeBlock>): Promise<TimeBlock | undefined> {
    const timeBlock = this.timeBlocks.get(id);
    if (!timeBlock) return undefined;
    const updated = { ...timeBlock, ...updates };
    this.timeBlocks.set(id, updated);
    return updated;
  }

  async deleteTimeBlock(id: string): Promise<boolean> {
    return this.timeBlocks.delete(id);
  }

  // Balance metrics methods
  async getBalanceMetrics(userId: string, date: string): Promise<BalanceMetrics | undefined> {
    return Array.from(this.balanceMetrics.values())
      .find(metrics => metrics.userId === userId && metrics.date === date);
  }

  async createBalanceMetrics(insertMetrics: InsertBalanceMetrics): Promise<BalanceMetrics> {
    const id = randomUUID();
    const metrics: BalanceMetrics = { ...insertMetrics, id };
    this.balanceMetrics.set(id, metrics);
    return metrics;
  }

  async updateBalanceMetrics(id: string, updates: Partial<BalanceMetrics>): Promise<BalanceMetrics | undefined> {
    const metrics = this.balanceMetrics.get(id);
    if (!metrics) return undefined;
    const updated = { ...metrics, ...updates };
    this.balanceMetrics.set(id, updated);
    return updated;
  }

  // User settings methods
  async getUserSettings(userId: string): Promise<UserSettings | undefined> {
    return Array.from(this.userSettings.values()).find(settings => settings.userId === userId);
  }

  async createUserSettings(insertSettings: InsertUserSettings): Promise<UserSettings> {
    const id = randomUUID();
    const settings: UserSettings = { ...insertSettings, id };
    this.userSettings.set(id, settings);
    return settings;
  }

  async updateUserSettings(id: string, updates: Partial<UserSettings>): Promise<UserSettings | undefined> {
    const settings = this.userSettings.get(id);
    if (!settings) return undefined;
    const updated = { ...settings, ...updates };
    this.userSettings.set(id, updated);
    return updated;
  }
}

export const storage = new MemStorage();
