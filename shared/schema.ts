import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const pillars = pgTable("pillars", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  name: text("name").notNull(), // Health, Wealth, Love, Happiness
  color: text("color").notNull(), // Color code for the pillar
  weeklyScore: integer("weekly_score").default(0),
  weeklyHours: integer("weekly_hours").default(0),
});

export const projects = pgTable("projects", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  pillarId: varchar("pillar_id").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  progress: integer("progress").default(0), // 0-100
  dueDate: text("due_date"),
  status: text("status").default("active"), // active, completed, paused
  priority: text("priority").default("medium"), // high, medium, low
  estimatedHours: integer("estimated_hours").default(0),
});

export const tasks = pgTable("tasks", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  projectId: varchar("project_id").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  completed: boolean("completed").default(false),
  order: integer("order").default(0),
  estimatedMinutes: integer("estimated_minutes").default(60),
  energyLevel: text("energy_level").default("medium"), // high, medium, low
});

export const timeBlocks = pgTable("time_blocks", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  date: text("date").notNull(),
  startTime: text("start_time").notNull(),
  endTime: text("end_time").notNull(),
  taskId: varchar("task_id"),
  projectId: varchar("project_id"),
  pillarId: varchar("pillar_id"),
  title: text("title"),
  energyRequired: text("energy_required").default("medium"),
  type: text("type").default("work"), // work, break, personal
});

export const balanceMetrics = pgTable("balance_metrics", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  date: text("date").notNull(),
  healthScore: integer("health_score").default(0),
  wealthScore: integer("wealth_score").default(0),
  loveScore: integer("love_score").default(0),
  happinessScore: integer("happiness_score").default(0),
  overallBalance: integer("overall_balance").default(0),
  overwhelmLevel: text("overwhelm_level").default("green"), // green, yellow, red
});

export const userSettings = pgTable("user_settings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  energyLevel: text("energy_level").default("medium"),
  workingHours: jsonb("working_hours").default({}),
  notifications: boolean("notifications").default(true),
  overwhelmThreshold: integer("overwhelm_threshold").default(8),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertPillarSchema = createInsertSchema(pillars).omit({
  id: true,
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
});

export const insertTaskSchema = createInsertSchema(tasks).omit({
  id: true,
});

export const insertTimeBlockSchema = createInsertSchema(timeBlocks).omit({
  id: true,
});

export const insertBalanceMetricsSchema = createInsertSchema(balanceMetrics).omit({
  id: true,
});

export const insertUserSettingsSchema = createInsertSchema(userSettings).omit({
  id: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Pillar = typeof pillars.$inferSelect;
export type InsertPillar = z.infer<typeof insertPillarSchema>;

export type Project = typeof projects.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;

export type Task = typeof tasks.$inferSelect;
export type InsertTask = z.infer<typeof insertTaskSchema>;

export type TimeBlock = typeof timeBlocks.$inferSelect;
export type InsertTimeBlock = z.infer<typeof insertTimeBlockSchema>;

export type BalanceMetrics = typeof balanceMetrics.$inferSelect;
export type InsertBalanceMetrics = z.infer<typeof insertBalanceMetricsSchema>;

export type UserSettings = typeof userSettings.$inferSelect;
export type InsertUserSettings = z.infer<typeof insertUserSettingsSchema>;
