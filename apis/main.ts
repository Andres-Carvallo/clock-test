import axios from "axios";

export const getWorldTime = () => {
  axios.create({ baseURL: "http://worldtimeapi.org/api/timezone/America/Santiago" })
}