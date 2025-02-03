import { StatusBar } from 'expo-status-bar';
import { Alert, Button, FlatList, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import Header from './components/header';
import colors from './global/colors';
import Counter from './components/counter';
import { useContext, useEffect, useState } from 'react';
import ThemeContext from './context/theme-context';
import { TCounter } from './types/count';
import { UseDatabase } from './database/useDatabase';

export default function Index() {

  const [theme, setTheme] = useContext(ThemeContext)
  const [refresh, setRefresh] = useState<boolean>(false)
  const [counts, setCounts] = useState<TCounter[]>([])
  const db = UseDatabase()

  const handleGetCounts = async () => {
    try {
      const response = await db.getCounts()
      setCounts(response)
      console.log(response)
    } catch (er) {
      Alert.alert("Erro")
    }
  }

  useEffect(() => {
    handleGetCounts()
  }, [refresh])

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme === 'dark' ? colors.dark : colors.light,
      alignItems: 'center',
      paddingTop: 30,
      gap: 10
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
      <Header setRefresh={setRefresh} refresh={refresh} />

      <FlatList
        data={counts}
        keyExtractor={(item) => String(item.id)}
        style={{ width: "100%" }}
        contentContainerStyle={{ gap: 15, alignItems: 'center', padding: 10 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) =>
          <Counter
            key={item.id}
            id={item.id}
            name={item.name}
            count={item.count}
            status={item.status}
            time={item.time}
            interval={item.interval}
            refresh={refresh}
            setRefresh={setRefresh}
          />}
      />

    </SafeAreaView >
  );
}