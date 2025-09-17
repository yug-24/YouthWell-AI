// YouthWell AI Storage Layer - adapted from blueprint:javascript_database
import { 
  users, journals, progress, mediaFiles, chatSessions, chatMessages,
  type User, type InsertUser, type Journal, type InsertJournal,
  type Progress, type InsertProgress, type MediaFile, type InsertMediaFile,
  type ChatSession, type InsertChatSession, type ChatMessage, type InsertChatMessage
} from "../shared/schema";
import { db } from "./db";
import { eq, desc, and, or } from "drizzle-orm";
import session from "express-session";
import connectPg from "connect-pg-simple";
import { pool } from "./db";

const PostgresSessionStore = connectPg(session);

export interface IStorage {
  // User management
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByUuid(uuid: string): Promise<User | undefined>;
  createUser(insertUser: InsertUser): Promise<User>;
  updateUser(id: number, updates: Partial<InsertUser>): Promise<User | undefined>;

  // Journal management
  getJournalsByUserId(userId: number, limit?: number): Promise<Journal[]>;
  getJournal(id: number, userId: number): Promise<Journal | undefined>;
  createJournal(insertJournal: InsertJournal): Promise<Journal>;
  updateJournal(id: number, userId: number, updates: Partial<InsertJournal>): Promise<Journal | undefined>;
  deleteJournal(id: number, userId: number): Promise<boolean>;

  // Progress management
  getProgressByUserId(userId: number): Promise<Progress[]>;
  getProgress(id: number, userId: number): Promise<Progress | undefined>;
  createProgress(insertProgress: InsertProgress): Promise<Progress>;
  updateProgress(id: number, userId: number, updates: Partial<InsertProgress>): Promise<Progress | undefined>;
  deleteProgress(id: number, userId: number): Promise<boolean>;

  // Media file management
  getMediaFilesByUserId(userId: number): Promise<MediaFile[]>;
  getMediaFile(id: number, userId: number): Promise<MediaFile | undefined>;
  getMediaFileByFilename(filename: string): Promise<MediaFile | undefined>;
  createMediaFile(insertMediaFile: InsertMediaFile): Promise<MediaFile>;
  deleteMediaFile(id: number, userId: number): Promise<boolean>;

  // Chat management
  getChatSessionsByUserId(userId: number): Promise<ChatSession[]>;
  getChatSession(id: number, userId: number): Promise<ChatSession | undefined>;
  createChatSession(insertChatSession: InsertChatSession): Promise<ChatSession>;
  getChatMessages(sessionId: number, userId: number): Promise<ChatMessage[]>;
  createChatMessage(insertChatMessage: InsertChatMessage): Promise<ChatMessage>;

  // Session store for authentication
  sessionStore: session.SessionStore;
}

export class DatabaseStorage implements IStorage {
  sessionStore: session.SessionStore;

  constructor() {
    this.sessionStore = new PostgresSessionStore({ 
      pool, 
      createTableIfMissing: true 
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async getUserByUuid(uuid: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.uuid, uuid));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values({
        ...insertUser,
        updatedAt: new Date(),
      })
      .returning();
    return user;
  }

  async updateUser(id: number, updates: Partial<InsertUser>): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return user || undefined;
  }

  // Journal methods
  async getJournalsByUserId(userId: number, limit = 50): Promise<Journal[]> {
    return await db
      .select()
      .from(journals)
      .where(eq(journals.userId, userId))
      .orderBy(desc(journals.createdAt))
      .limit(limit);
  }

  async getJournal(id: number, userId: number): Promise<Journal | undefined> {
    const [journal] = await db
      .select()
      .from(journals)
      .where(and(eq(journals.id, id), eq(journals.userId, userId)));
    return journal || undefined;
  }

  async createJournal(insertJournal: InsertJournal): Promise<Journal> {
    const [journal] = await db
      .insert(journals)
      .values({
        ...insertJournal,
        updatedAt: new Date(),
      })
      .returning();
    return journal;
  }

  async updateJournal(id: number, userId: number, updates: Partial<InsertJournal>): Promise<Journal | undefined> {
    const [journal] = await db
      .update(journals)
      .set({ ...updates, updatedAt: new Date() })
      .where(and(eq(journals.id, id), eq(journals.userId, userId)))
      .returning();
    return journal || undefined;
  }

  async deleteJournal(id: number, userId: number): Promise<boolean> {
    const result = await db
      .delete(journals)
      .where(and(eq(journals.id, id), eq(journals.userId, userId)));
    return result.rowCount ? result.rowCount > 0 : false;
  }

  // Progress methods
  async getProgressByUserId(userId: number): Promise<Progress[]> {
    return await db
      .select()
      .from(progress)
      .where(eq(progress.userId, userId))
      .orderBy(desc(progress.createdAt));
  }

  async getProgress(id: number, userId: number): Promise<Progress | undefined> {
    const [progressItem] = await db
      .select()
      .from(progress)
      .where(and(eq(progress.id, id), eq(progress.userId, userId)));
    return progressItem || undefined;
  }

  async createProgress(insertProgress: InsertProgress): Promise<Progress> {
    const [progressItem] = await db
      .insert(progress)
      .values({
        ...insertProgress,
        updatedAt: new Date(),
      })
      .returning();
    return progressItem;
  }

  async updateProgress(id: number, userId: number, updates: Partial<InsertProgress>): Promise<Progress | undefined> {
    const [progressItem] = await db
      .update(progress)
      .set({ ...updates, updatedAt: new Date() })
      .where(and(eq(progress.id, id), eq(progress.userId, userId)))
      .returning();
    return progressItem || undefined;
  }

  async deleteProgress(id: number, userId: number): Promise<boolean> {
    const result = await db
      .delete(progress)
      .where(and(eq(progress.id, id), eq(progress.userId, userId)));
    return result.rowCount ? result.rowCount > 0 : false;
  }

  // Media file methods
  async getMediaFilesByUserId(userId: number): Promise<MediaFile[]> {
    return await db
      .select()
      .from(mediaFiles)
      .where(eq(mediaFiles.userId, userId))
      .orderBy(desc(mediaFiles.createdAt));
  }

  async getMediaFile(id: number, userId: number): Promise<MediaFile | undefined> {
    const [mediaFile] = await db
      .select()
      .from(mediaFiles)
      .where(and(eq(mediaFiles.id, id), eq(mediaFiles.userId, userId)));
    return mediaFile || undefined;
  }

  async getMediaFileByFilename(filename: string): Promise<MediaFile | undefined> {
    const [mediaFile] = await db
      .select()
      .from(mediaFiles)
      .where(eq(mediaFiles.filename, filename));
    return mediaFile || undefined;
  }

  async createMediaFile(insertMediaFile: InsertMediaFile): Promise<MediaFile> {
    const [mediaFile] = await db
      .insert(mediaFiles)
      .values(insertMediaFile)
      .returning();
    return mediaFile;
  }

  async deleteMediaFile(id: number, userId: number): Promise<boolean> {
    const result = await db
      .delete(mediaFiles)
      .where(and(eq(mediaFiles.id, id), eq(mediaFiles.userId, userId)));
    return result.rowCount ? result.rowCount > 0 : false;
  }

  // Chat methods
  async getChatSessionsByUserId(userId: number): Promise<ChatSession[]> {
    return await db
      .select()
      .from(chatSessions)
      .where(eq(chatSessions.userId, userId))
      .orderBy(desc(chatSessions.updatedAt));
  }

  async getChatSession(id: number, userId: number): Promise<ChatSession | undefined> {
    const [session] = await db
      .select()
      .from(chatSessions)
      .where(and(eq(chatSessions.id, id), eq(chatSessions.userId, userId)));
    return session || undefined;
  }

  async createChatSession(insertChatSession: InsertChatSession): Promise<ChatSession> {
    const [session] = await db
      .insert(chatSessions)
      .values({
        ...insertChatSession,
        updatedAt: new Date(),
      })
      .returning();
    return session;
  }

  async getChatMessages(sessionId: number, userId: number): Promise<ChatMessage[]> {
    // Verify user owns the session first
    const session = await this.getChatSession(sessionId, userId);
    if (!session) return [];

    return await db
      .select()
      .from(chatMessages)
      .where(eq(chatMessages.sessionId, sessionId))
      .orderBy(chatMessages.createdAt);
  }

  async createChatMessage(insertChatMessage: InsertChatMessage): Promise<ChatMessage> {
    const [message] = await db
      .insert(chatMessages)
      .values(insertChatMessage)
      .returning();
    return message;
  }
}

export const storage = new DatabaseStorage();