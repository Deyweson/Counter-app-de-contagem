import { Text, TouchableOpacity, View, StyleSheet, Image, Modal } from "react-native";
import colors from "../global/colors";
import { useContext, useEffect, useState } from "react";
import ThemeContext from "../context/theme-context";
import formatTime from "../utils/format-time";
import { TCounter } from "../types/count";
import { UseDatabase } from "../database/useDatabase";
import ModalCounterInfo from "./modal-counter-info";

interface props extends Omit<TCounter, 'finishDate' | 'startDate'> {
  refresh: boolean
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>
}


export default function Counter(
  { id, name, count, time, status, interval, refresh, setRefresh }: props
) {

  const theme = useContext(ThemeContext)[0]
  const [stt, setStatus] = useState<string>(status)
  const [counts, setCount] = useState<number>(count)
  const [tm, setTime] = useState<number>(time)

  const [intervalID, setIntervalID] = useState<NodeJS.Timeout | null>()
  const [timeInterval, setTimeInterval] = useState<number>(interval)

  const [modal, setModal] = useState<boolean>(false)

  const db = UseDatabase()



  const handlePause = () => {
    setStatus('paused')
    if (intervalID) clearInterval(intervalID)
  }

  const handleStart = () => {
    setStatus('running')
  }

  const handleDecrement = () => {
    if (counts === 0) {
      return
    }
    setCount(counts - 1)
  }

  const handleIncrement = () => {
    setCount(counts + 1)
    setTimeInterval(0)
  }

  useEffect(() => {
    setRefresh(!refresh)
  }, [modal])

  useEffect(() => {

    if (stt === 'running') {
      const interval = setInterval(() => {
        setTime((tm) => tm + 1)
        setTimeInterval((timeInterval) => timeInterval + 1)
      }, 1000)
      setIntervalID(interval)
    }
    if (stt === 'paused' && intervalID) {
      clearInterval(intervalID)
    }
  }, [stt])

  useEffect(() => {
    console.log(id, counts, tm, stt, timeInterval)
    db.upCount(id, counts, tm, stt, timeInterval)
  }, [counts, tm, timeInterval, status, stt])


  const style = StyleSheet.create({
    container: {
      width: '90%',
      padding: 15,
      paddingHorizontal: 15,
      borderRadius: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: theme === 'dark' ? colors.dark : colors.light,
      elevation: 5,
      shadowColor: "#000",
      shadowOffset: { width: 2, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 5,

    },
    name: {
      fontSize: 20,
      color: theme === 'dark' ? colors.white : colors.black,
    },
    counts: {
      fontSize: 50,
      color: theme === 'dark' ? colors.white : colors.black,
    },
    time: {
      fontSize: 20,
      color: theme === 'dark' ? colors.white : colors.black,
    },
    buttonsContainer: {
      padding: 5,
    },
    image: {
      width: 20,
      height: 29,
      tintColor: theme === 'dark' ? colors.white : colors.black,
    }
  })

  return (
    <TouchableOpacity style={style.container} onLongPress={() => setModal(!modal)}>
      <TouchableOpacity onPress={() => handleIncrement()} style={{ width: '85%' }} disabled={stt === 'paused' ? true : false}  >
        <View>
          <Text style={style.name} numberOfLines={1}>{name}</Text>
          <Text style={style.counts}>{counts}</Text>
          <Text style={style.time}>Intervalo: {formatTime(timeInterval)}</Text>
          <Text style={style.time}>Total: {formatTime(tm)}</Text>
        </View>
      </TouchableOpacity>

      {stt === 'paused' ?
        <View>
          <TouchableOpacity style={style.buttonsContainer} onPress={() => handleStart()}>
            <Image style={style.image} source={require("../assets/play.png")} resizeMode="contain" />
          </TouchableOpacity>
        </View>
        :
        <View>
          <TouchableOpacity style={style.buttonsContainer} onPress={() => handlePause()}>
            <Image style={style.image} source={require("../assets/pause.png")} resizeMode="contain" />
          </TouchableOpacity>
          <TouchableOpacity style={style.buttonsContainer} onPress={() => handleDecrement()}>
            <Image style={style.image} source={require("../assets/reset.png")} resizeMode="contain" />
          </TouchableOpacity>
          <TouchableOpacity style={style.buttonsContainer}>
            <Image style={style.image} source={require("../assets/complet.png")} resizeMode="contain" />
          </TouchableOpacity>
        </View>
      }
      <ModalCounterInfo isVisible={modal} setVisible={setModal} id={id} />
    </TouchableOpacity >
  )
}


