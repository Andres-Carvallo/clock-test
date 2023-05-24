import { StyleSheet, Text, View, Button, Modal, Pressable, FlatList } from "react-native";
import React, { useEffect, useState, } from "react";
import { getTimeData,  getTimeZones } from "../services/index";

import TimeContainer from "../components/TimeContainter";

const ClockScreen: React.FC = () => {

  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [timeZones, setTimeZones] = useState<string[]>([]);
  const [selectedTimeZone, setSelectedTimeZone] = useState<string>("America/Santiago");
  const [isModalVisible, setIsModaVisible] = useState<boolean>(false);
  const [meridiem, setMeridiem] = useState<string>("")
  const [intervalId, setIntervalId] = useState<NodeJS.Timer>();

  useEffect(() => {
    getTimeZones()
    .then((timeZoneFetch) => {
      setTimeZones(timeZoneFetch)
    });
  }, [])
  
  useEffect(() => {
    if (intervalId) {
      clearInterval(intervalId);
    }
    getTimeData(selectedTimeZone).then((time: Date) => {
      const timeZoneStringNow = time.toLocaleTimeString('en-US', { timeZone: selectedTimeZone });
      const timeStringArray = timeZoneStringNow.split(":")
      setMeridiem(timeStringArray[2].split(" ")[1])
      setHours(+timeStringArray[0]);
      setMinutes(+timeStringArray[1]);
      setSeconds(+timeStringArray[2].split(" ")[0]);
      const intervalId = setInterval(() => {
        setSeconds((seconds) => {
          let secs;
          if (seconds < 59) {
            secs = seconds + 1;
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
      setIntervalId(intervalId);
    })
  }, [selectedTimeZone]);
  
  const formatTime = (time: number): string => {
    if (time.toString().length === 1) {
      return "0" + time;
    }
    return time.toString();
  }
  return (
    <View>
      <Text style={styles.titleText}>
        Clock-App
      </Text>
      <Text style={styles.titleText}>
        {`Current Time Zone: ${selectedTimeZone}`}
      </Text>
      <Button
        onPress={() => setIsModaVisible(true)}
        title="Choose your Zone Time"
        color="#841584"
        accessibilityLabel="Time Zone Button"
      />
      <View style={styles.clockContainer}>
        <TimeContainer time={formatTime(hours)} isSeconds={false}/>
        <TimeContainer time={formatTime(minutes)} isSeconds={false} />
        <TimeContainer time={formatTime(seconds)} isSeconds={true} />
        <Text style={styles.clockMeridiem}>{meridiem}</Text>
      </View>
      <Modal
        visible={isModalVisible}
        animationType="fade"
      >
        <View style={styles.modalContainer}>
          <FlatList
            data={timeZones}
            keyExtractor={item => item}
            renderItem={({item}) => {
              return (
                <Pressable
                  onPress={() => {
                    setSelectedTimeZone(item);
                    setIsModaVisible(false);
                  }}
                >
                  <Text>{item}</Text>
                </Pressable>
              )
            }}
          />
          <Pressable
            style={{marginTop: 20}}
            onPress={() => setIsModaVisible(false)}
          >
            <Text>Close</Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  )
}

export default ClockScreen;

const styles = StyleSheet.create({
  titleText: {
    marginBottom: 10,
    fontSize: 20,
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 20,
  },
  clockContainer: {
    display: "flex",
    flexDirection: "row",
    borderColor: "rgba(191, 191, 191, 0.8)",
    borderWidth: 2,
    borderRadius: 20,
    fontSize: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  modalContainer: {
    marginTop: 100,
    marginBottom: 100,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clockMeridiem: {
    marginRight: 10,
    fontWeight: "bold",
  }
});