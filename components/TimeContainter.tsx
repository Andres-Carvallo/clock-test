import React from "react";
import { Text, StyleSheet, View } from "react-native";

interface Props {
  time: string,
  isSeconds: boolean,
}

const TimeContainer: React.FC<Props> = ({time, isSeconds}) => {
  return (
    <View style={styles.timeWrapper}>
      <Text style={styles.textContainer}>{time}</Text>
      {
        !isSeconds &&
        <Text style={styles.dots}>:</Text>
      }
    </View>
  )
};

export default TimeContainer;

const styles = StyleSheet.create({
  timeWrapper: {
    display: "flex",
    flexDirection: "row",
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: "center",
  },
  textContainer: {
    display: "flex",
    justifyContent: "center",
    width: 40,
    fontSize: 30,
  },
  dots: {
    fontSize: 20,
    marginLeft: 20,
    marginRight: 20,
  }
});