import { Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
 
export interface ITime {
  abbreviation: string;
  client_ip:    string;
  datetime:     Date;
  day_of_week:  number;
  day_of_year:  number;
  dst:          boolean;
  dst_from:     null;
  dst_offset:   number;
  dst_until:    null;
  raw_offset:   number;
  timezone:     string;
  unixtime:     number;
  utc_datetime: Date;
  utc_offset:   string;
  week_number:  number;
}

const ClockScreen: React.FC = () => {

  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  
  useEffect(() => {
    console.log("hook");
    getTimeData()
    .then((time) => {
      setHours(23);
      setMinutes(59);
      setSeconds(55);
    })
    .finally(() => {
      const interval = setInterval(() => {
        setSeconds((seconds) => {
          let secs;
          if (seconds < 59) {
            return secs = seconds + 1;
          } else {
            setMinutes((minutes) => {
              if (seconds < 59 && minutes < 59) {
                return minutes;
              }
              if (seconds === 59 && minutes === 59 ) {
                setHours((hours) => {
                  if (hours < 23) {
                    return hours + 1;
                  }
                   return 0;
                })
                return 0;
              }
              return minutes + 1;
            })
            return 0;
          }
          return secs;
        });
      }, 1000);
    });
  }, []);
  
  const getTimeData = async () => {
    const timeFetch = await axios.get<ITime>('http://worldtimeapi.org/api/timezone/America/Santiago');
    const timeInfo = timeFetch.data;
    const date = new Date(timeInfo.unixtime * 1000);
    return date;
  }

  return (
    <View>
      <Text>
        Clock Screen
        { 
          `H:${hours}, M:${minutes}, S:${seconds}`
        }
      </Text>
    </View>
  )
}

export default ClockScreen;