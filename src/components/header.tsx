import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../global/colors";

export default function Header() {
  return (
    <View style={style.header}>
      <Text style={style.title}>Counter</Text>
      <TouchableOpacity style={style.addButton}>
        <Text style={{ color: colors.white }}>+</Text>
      </TouchableOpacity>
    </View>
  )
}

const style = StyleSheet.create({
  header: {
    flexDirection: 'row',
    width: '100%',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20
  },
  addButton: {
    backgroundColor: colors.green,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 10,
  },
  title: {
    fontSize: 30
  }
})