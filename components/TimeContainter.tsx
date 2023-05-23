import React, { ReactNode } from "react";
import { Text, StyleSheet, View } from "react-native";

interface Props {
  time: string,
  isSeconds: Boolean,
}

const TimeContainer: React.FC<Props> = ({time, isSeconds}) => {
  return (
    <View style={styles.timeWrapper}>
      <Text style={styles.textContainer}>{time}</Text>
      {
        !isSeconds &&
        <Text style={{fontSize: 20, marginLeft: 40}}>:</Text>
      }
    </View>
  )
};

export default TimeContainer;

const styles = StyleSheet.create({
  timeWrapper: {
    display: "flex",
    flexDirection: "row",
    padding: 20,
    alignItems: "center",
  },
  textContainer: {
    width: 40,
    display: "flex",
    justifyContent: "center",
    fontSize: 40,
  }
});