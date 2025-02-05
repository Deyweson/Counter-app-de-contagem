import { StatusBar } from 'expo-status-bar';
import { Alert, Button, FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
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
  const [filters, setFilters] = useState<TCounter[]>([])
  const [search, setSearch] = useState<string>('')

  const db = UseDatabase()

  const handleGetCounts = async () => {
    try {
      const response = await db.getCounts()
      setCounts(response)
      setFilters(response)
    } catch (er) {
      Alert.alert("Erro")
    }
  }

  const handleSearchCounts = () => {
    const searchTerm = search.trim().toLowerCase();

    setFilters((prevFilters) => {
      if (searchTerm.length > 0) {
        return counts.filter((c) => c.name.toLowerCase().includes(searchTerm));
      }
      return counts;
    });
  };

  useEffect(() => {
    handleGetCounts()
  }, [refresh])

  useEffect(() => {
    console.log(search)
    handleSearchCounts()
  }, [search])

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

      <TextInput
        style={{
          backgroundColor: theme === 'dark' ? colors.gray : colors.offwhite,
          width: '90%',
          borderRadius: 10,
          paddingLeft: 20,
        }} placeholder='Pesquisar' inputMode='text' onChangeText={setSearch} value={search} keyboardType='visible-password' />

      <FlatList
        data={filters}
        keyExtractor={(item) => String(item.id)}
        style={{ width: "100%" }}
        contentContainerStyle={{ gap: 15, alignItems: 'center', paddingTop: 10 }}
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