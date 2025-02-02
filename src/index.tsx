import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Header from './components/header';
import colors from './global/colors';

export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" backgroundColor={colors.offwhite} />
      <Header />
      <Text>Open up App.tsx to start working on your app!</Text>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.offwhite,
    alignItems: 'center',
    paddingTop: 30
  },
});
