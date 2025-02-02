import { useState } from 'react';
import Index from './src';
import ThemeContext from './src/context/theme-context';
import { SQLiteProvider } from 'expo-sqlite';
import { InitializeDatabase } from './src/database/initialize-database';

export default function App() {

  const theme = useState('dark')

  return (
    <SQLiteProvider databaseName='count.db' onInit={InitializeDatabase}>
      <ThemeContext.Provider value={theme}>
        <Index />
      </ThemeContext.Provider>
    </SQLiteProvider>
  );
}
