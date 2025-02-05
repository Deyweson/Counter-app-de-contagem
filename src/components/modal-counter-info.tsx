import { useContext, useEffect, useState } from "react"
import { Alert, Button, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import ThemeContext from "../context/theme-context"
import colors from "../global/colors"
import { TCounter } from "../types/count"
import { UseDatabase } from "../database/useDatabase"
import { FormatDate } from "../utils/format-date"
import formatTime from "../utils/format-time"

interface props {
  isVisible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  id: number
}


export default function ModalCounterInfo({ isVisible, setVisible, id }: props) {

  const theme = useContext(ThemeContext)[0]
  const db = UseDatabase()

  const [count, setCount] = useState<TCounter>()

  const handleGetCount = async () => {
    try {
      const response = await db.GetCount(id)
      if (response !== null) {
        setCount(response)
      }
    } catch (error) {
      Alert.alert("Error:", "Erro ao buscar informações do contador")
    }
  }

  const handleDeleteCount = async () => {
    try {
      await db.DeleteCount(id)
      setVisible(!isVisible)
    } catch (error) {
      Alert.alert("Error:", "Erro ao deletar o contador.")
    }
  }

  useEffect(() => {
    handleGetCount()
  }, [isVisible])


  return (
    <Modal visible={isVisible} transparent={true} animationType="fade">
      <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.63)' }}>
        <View style={[styles.modalContainer, { backgroundColor: theme === 'dark' ? colors.dark : colors.white }]}>
          <View style={styles.modalHeader}>
            <Text style={{ color: theme === 'dark' ? colors.white : colors.dark, fontSize: 25, width: '85%' }}>{count?.name}</Text>
            <TouchableOpacity style={{ padding: 20 }} onPress={() => setVisible(!isVisible)}>
              <Image source={require('../assets/close.png')} style={{ width: 20, height: 20, padding: 10, tintColor: theme === 'dark' ? colors.white : colors.black, }} />
            </TouchableOpacity>
          </View>
          <View style={{ gap: 20 }}>
            <Text style={[styles.modalText, { color: theme === 'dark' ? colors.white : colors.dark, }]}>Contagem: {count?.count}</Text>
            <Text style={[styles.modalText, { color: theme === 'dark' ? colors.white : colors.dark, }]}>Tempo Total: {formatTime(count?.time || 0)}</Text>
            <Text style={[styles.modalText, { color: theme === 'dark' ? colors.white : colors.dark, }]}>Intervalo: {formatTime(count?.interval || 0)}</Text>
            <Text style={[styles.modalText, { color: theme === 'dark' ? colors.white : colors.dark, }]}>Data de inicio: {FormatDate(count?.startDate || '')}</Text>
            {count?.finishDate && (
              <Text style={[styles.modalText, { color: theme === 'dark' ? colors.white : colors.dark, }]}>Data de finalização: {count?.finishDate}</Text>
            )}
            <Text style={[styles.modalText, { color: theme === 'dark' ? colors.white : colors.dark, }]}>Status: {count?.status === 'paused' ? 'Pausado' : count?.status === 'running' ? 'Em andamento' : 'Completo'}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 10 }}>
            <TouchableOpacity style={[styles.modalDelete, { backgroundColor: colors.green }]}>
              <Text style={{ color: colors.white }}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalDelete} onPress={() => handleDeleteCount()}>
              <Text style={{ color: colors.white }}>Excluir</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal >
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    width: '95%',
    margin: 20,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  modalText: {
    fontSize: 20,
  },
  modalDelete: {
    backgroundColor: colors.red,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
  }
})