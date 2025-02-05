import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../global/colors";
import { useContext, useEffect, useState } from "react";
import ThemeContext from "../context/theme-context";
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



  return (
    <View style={[style.header, { backgroundColor: theme === 'dark' ? colors.dark : colors.light, }]} >

      <Image source={require('../assets/icon.png')} style={{ width: 50, height: 50, tintColor: theme === 'dark' ? colors.white : colors.black, }} />

      <View style={style.toggleContainer}>
        {theme === 'dark' ? (
          <TouchableOpacity onPress={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            <Image source={require('../assets/moon.png')} style={{ width: 20, height: 20, tintColor: theme === 'dark' ? colors.white : colors.black, }} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            <Image source={require('../assets/sun.png')} style={{ width: 20, height: 20, tintColor: theme === 'dark' ? colors.white : colors.black, }} />
          </TouchableOpacity>
        )}

        <TouchableOpacity style={style.addButton} onPress={() => openModal()}>
          <Text style={{ color: colors.white }}>+</Text>
        </TouchableOpacity>
      </View>



      <AddModalCounter setVisible={setModal} isVisible={modal} />
    </View>
  )
}


const style = StyleSheet.create({
  header: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,

    marginTop: 5
  },
  addButton: {
    backgroundColor: colors.green,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 10,
    marginLeft: 20
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

