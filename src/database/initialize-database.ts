import { type SQLiteDatabase } from 'expo-sqlite'

export async function InitializeDatabase(database: SQLiteDatabase) {
  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS counts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      count INTEGER DEFAULT 0,
      time INTEGER DEFAULT 0,
      interval INTEGER DEFAULT 0,
      startDate DATETIME DEFAULT CURRENT_TIMESTAMP,
      finishDate DATETIME,
      status TEXT DEFAULT 'paused'
    );
  `)
}