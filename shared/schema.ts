// YouthWell AI Database Schema - referencing blueprint:javascript_database
import { pgTable, serial, text, varchar, timestamp, integer, boolean, json, uuid as pgUuid, real } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Users table - supports both anonymous and email-based authentication
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  uuid: pgUuid("uuid").defaultRandom().notNull().unique(),
  email: varchar("email", { length: 255 }).unique(),
  password: varchar("password", { length: 255 }), // hashed password for email users
  isAnonymous: boolean("is_anonymous").default(true).notNull(),
  displayName: varchar("display_name", { length: 100 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  lastLoginAt: timestamp("last_login_at"),
  isActive: boolean("is_active").default(true).notNull(),
});

// Journal entries for mood tracking and journaling
export const journals = pgTable("journals", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  title: varchar("title", { length: 200 }),
  content: text("content").notNull(),
  mood: varchar("mood", { length: 50 }), // e.g., happy, sad, anxious, calm
  moodScore: integer("mood_score"), // 1-10 scale
  tags: json("tags").$type<string[]>(), // array of tags
  isPrivate: boolean("is_private").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Progress tracking for user goals and wellness metrics
export const progress = pgTable("progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  goalType: varchar("goal_type", { length: 100 }).notNull(), // e.g., 'daily_mood', 'exercise', 'meditation'
  goalTitle: varchar("goal_title", { length: 200 }).notNull(),
  goalDescription: text("goal_description"),
  targetValue: real("target_value"), // numeric target (e.g., 30 minutes, 5 times)
  currentValue: real("current_value").default(0).notNull(),
  unit: varchar("unit", { length: 50 }), // e.g., 'minutes', 'times', 'days'
  status: varchar("status", { length: 20 }).default('active').notNull(), // active, completed, paused
  startDate: timestamp("start_date").defaultNow().notNull(),
  targetDate: timestamp("target_date"),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Media files for audio/video uploads
export const mediaFiles = pgTable("media_files", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  filename: varchar("filename", { length: 255 }).notNull(),
  originalName: varchar("original_name", { length: 255 }).notNull(),
  mimeType: varchar("mime_type", { length: 100 }).notNull(),
  fileSize: integer("file_size").notNull(), // in bytes
  filePath: varchar("file_path", { length: 500 }).notNull(),
  fileType: varchar("file_type", { length: 20 }).notNull(), // 'audio' or 'video'
  duration: real("duration"), // duration in seconds
  isPublic: boolean("is_public").default(false).notNull(),
  relatedJournalId: integer("related_journal_id").references(() => journals.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Chat sessions for AI conversations
export const chatSessions = pgTable("chat_sessions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  sessionTitle: varchar("session_title", { length: 200 }),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Individual chat messages within sessions
export const chatMessages = pgTable("chat_messages", {
  id: serial("id").primaryKey(),
  sessionId: integer("session_id").references(() => chatSessions.id).notNull(),
  role: varchar("role", { length: 20 }).notNull(), // 'user' or 'assistant'
  content: text("content").notNull(),
  metadata: json("metadata").$type<Record<string, any>>(), // for storing AI model info, etc.
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Define relations using Drizzle ORM relations
export const usersRelations = relations(users, ({ many }) => ({
  journals: many(journals),
  progress: many(progress),
  mediaFiles: many(mediaFiles),
  chatSessions: many(chatSessions),
}));

export const journalsRelations = relations(journals, ({ one, many }) => ({
  user: one(users, {
    fields: [journals.userId],
    references: [users.id],
  }),
  mediaFiles: many(mediaFiles),
}));

export const progressRelations = relations(progress, ({ one }) => ({
  user: one(users, {
    fields: [progress.userId],
    references: [users.id],
  }),
}));

export const mediaFilesRelations = relations(mediaFiles, ({ one }) => ({
  user: one(users, {
    fields: [mediaFiles.userId],
    references: [users.id],
  }),
  journal: one(journals, {
    fields: [mediaFiles.relatedJournalId],
    references: [journals.id],
  }),
}));

export const chatSessionsRelations = relations(chatSessions, ({ one, many }) => ({
  user: one(users, {
    fields: [chatSessions.userId],
    references: [users.id],
  }),
  messages: many(chatMessages),
}));

export const chatMessagesRelations = relations(chatMessages, ({ one }) => ({
  session: one(chatSessions, {
    fields: [chatMessages.sessionId],
    references: [chatSessions.id],
  }),
}));

// Export types for TypeScript
export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type Journal = typeof journals.$inferSelect;
export type InsertJournal = typeof journals.$inferInsert;
export type Progress = typeof progress.$inferSelect;
export type InsertProgress = typeof progress.$inferInsert;
export type MediaFile = typeof mediaFiles.$inferSelect;
export type InsertMediaFile = typeof mediaFiles.$inferInsert;
export type ChatSession = typeof chatSessions.$inferSelect;
export type InsertChatSession = typeof chatSessions.$inferInsert;
export type ChatMessage = typeof chatMessages.$inferSelect;
export type InsertChatMessage = typeof chatMessages.$inferInsert;