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
  const [intervalId, setIntervalId] = useState<NodeJS.Timer>();

  useEffect(() => {
    getTimeZones()
    .then((timeZoneFetch) => {
      setTimeZones(timeZoneFetch)
    });
  }, [])
  
  useEffect(() => {
    getTimeData(selectedTimeZone).then((time: Date) => {
      console.log(time);
      setHours(time.getHours());
      setMinutes(time.getMinutes());
      setSeconds(time.getSeconds());
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
      <Text style={{marginBottom: 10}}>
        Clock-App
      </Text>
      <Button
        onPress={() => setIsModaVisible(true)}
        title="Choose your Zone Time"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
      <Text style={{marginBottom: 30, marginTop: 10}}>
        Current Time:
      </Text>
      <View style={styles.clockContainer}>
        <TimeContainer time={formatTime(hours)} isSeconds={false}/>
        <TimeContainer time={formatTime(minutes)} isSeconds={false} />
        <TimeContainer time={formatTime(seconds)} isSeconds={true} />
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
                    clearInterval(intervalId);
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
  },
  modalContainer: {
    marginTop: 100,
    marginBottom: 100,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});