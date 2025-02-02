import { useSQLiteContext } from "expo-sqlite"
import { TCounter } from "../types/count"

export function UseDatabase() {

  const database = useSQLiteContext()

  async function create(name: string) {
    console.log(name)
    const query = await database.prepareAsync(`
      INSERT INTO counts (name) values ($name)
    `)
    try {

      await query.executeAsync({
        $name: name
      })

      return
    } catch (er) {
      throw er
    } finally {
      query.finalizeAsync()
    }
  }


  async function getCounts() {
    try {
      const query = "SELECT * FROM counts"
      const response = database.getAllAsync<TCounter>(query)
      return response
    } catch (er) {
      throw er
    }
  }

  async function upCount(
    id: number, count: number, time: number, status: string,
    interval: number
  ) {
    const query = database.prepareAsync(`
      UPDATE counts 
      SET 
      count = $count,
      time = $time,
      interval = $interval,
      status = $status
      WHERE id = $id
    `)
    try {
      (await query).executeAsync({
        $count: count,
        $time: time,
        $interval: interval,
        $status: status,
        $id: id
      })
    } catch (er) {
      console.log(er)
      throw er
    }
  }

  return { create, getCounts, upCount }
}