import { Alert, Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import ThemeContext from "../context/theme-context";
import { useContext, useState } from "react";
import colors from "../global/colors";
import { UseDatabase } from "../database/useDatabase";

interface props {
  isVisible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AddModalCounter({ isVisible, setVisible }: props) {

  const theme = useContext(ThemeContext)[0]
  const db = UseDatabase()
  const [name, setName] = useState<string>('')

  const handleCloseModal = () => {
    setVisible(!isVisible)
  }

  const handleAddCounter = () => {
    console.log(name)
    if (name.trim().length <= 0) {
      Alert.alert('Info:', 'Digite um nome para o contador.')
      return
    }
    try {
      db.create(name.trim())
      setVisible(!isVisible)
      setName('')
    } catch (error) {
      Alert.alert('Error', "Erro ao criar um novo contador")
    }
  }

  return (
    <Modal visible={isVisible} transparent={true} animationType="fade">

      <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.63)' }}>

        <View style={[styles.modalView, { backgroundColor: theme === 'dark' ? colors.dark : colors.white, marginTop: 50 }]} >

          <View style={styles.modalHeader}>

            <Text style={{ color: theme === 'dark' ? colors.white : colors.dark, fontSize: 25 }}>Novo Contador</Text>

            <TouchableOpacity onPress={() => handleCloseModal()} style={{ padding: 5 }}>
              <Image source={require('../assets/close.png')} style={{ width: 20, height: 20, padding: 10, tintColor: theme === 'dark' ? colors.white : colors.black, }} />
            </TouchableOpacity>

          </View>
          <TextInput
            placeholderTextColor={theme === 'dark' ? colors.white : colors.dark}
            onChangeText={setName}
            value={name}
            style={
              [styles.modalInput, {
                color: theme === 'dark' ? colors.white : colors.dark,
                borderColor: theme === 'dark' ? colors.white : colors.dark
              }]} placeholder="Nome do contador" />

          <TouchableOpacity style={styles.modalButton} onPress={() => handleAddCounter()}>
            <Text style={{ color: colors.white }}>Adicionar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}


const styles = StyleSheet.create({
  modalView: {
    width: '80%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    gap: 20
  },
  modalHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  modalInput: {
    borderWidth: .5,
    width: '100%',
    borderRadius: 10,
    padding: 15
  },
  modalButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: colors.green,
    borderRadius: 10
  }
})