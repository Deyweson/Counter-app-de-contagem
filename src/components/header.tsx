import { Alert, Button, Image, Modal, StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import colors from "../global/colors";
import { useContext, useEffect, useState } from "react";
import ThemeContext from "../context/theme-context";
import { UseDatabase } from "../database/useDatabase";
import AddModalCounter from "./modal-add-counter";

interface props {
  refresh: boolean
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Header({ refresh, setRefresh }: props) {

  const [theme, setTheme] = useContext(ThemeContext)
  const [modal, setModal] = useState<boolean>(false)

  const openModal = () => {
    setModal(!modal)
  }

  useEffect(() => {
    setRefresh(!refresh)
  }, [modal])

  const style = StyleSheet.create({
    header: {
      flexDirection: 'row',
      width: '100%',
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 20,
      backgroundColor: theme === 'dark' ? colors.dark : colors.light
    },
    addButton: {
      backgroundColor: colors.green,
      paddingHorizontal: 20,
      paddingVertical: 5,
      borderRadius: 10,
    },
    title: {
      fontSize: 30,
      color: theme === 'dark' ? colors.light : colors.dark
    },
    toggleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    }
  })

  return (
    <View style={style.header}>
      <Text style={style.title}>Counter</Text>
      <View style={style.toggleContainer}>
        <Image source={require('../assets/moon.png')} style={{ width: 20, height: 20, tintColor: theme === 'dark' ? colors.white : colors.black, }} />
        <Switch value={theme === 'dark'} style={{ marginRight: 5 }} onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />
        <Image source={require('../assets/sun.png')} style={{ width: 20, height: 20, tintColor: theme === 'dark' ? colors.white : colors.black, }} />
      </View>
      <TouchableOpacity style={style.addButton} onPress={() => openModal()}>
        <Text style={{ color: colors.white }}>+</Text>
      </TouchableOpacity>
      <AddModalCounter setVisible={setModal} isVisible={modal} />
    </View>
  )
}

