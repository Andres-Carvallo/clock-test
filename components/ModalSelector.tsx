import React from "react";
import { Modal, View, FlatList, Pressable, Text, Button, StyleSheet } from "react-native";

interface Props {
  isModalVisible: boolean,
  timeZones: string[],
  setTimeZone: Function
  closeModal: Function
}


const ModalSelector: React.FC<Props> = ({isModalVisible, timeZones, setTimeZone, closeModal}) => {
  return (
    <Modal
      visible={isModalVisible}
      animationType="fade"
    >
      <View style={styles.modalContainer}>
        <FlatList
          style={{marginLeft: 10}}
          data={timeZones}
          keyExtractor={item => item}
          renderItem={({item}) => {
            return (
              <Pressable
                onPress={() => {
                  setTimeZone(item);
                }}
              >
                <Text style={styles.textList}>{item}</Text>
              </Pressable>
            )
          }}
        />
        <Button
          onPress={() => closeModal()}
          title="Close"
          color="#841584"
          accessibilityLabel="Close Modal Button"
        />
      </View>
    </Modal>
  )
}

export default ModalSelector;

const styles = StyleSheet.create({
  modalContainer: {
    marginTop: 100,
    marginBottom: 100,
    backgroundColor: '#fff',
  },
  textList: {
    marginBottom: 10,
    fontSize: 25
  },
  close: {

  }
});