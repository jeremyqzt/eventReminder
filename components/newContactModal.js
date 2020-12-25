import React from "react";
import ImageAndPicker from './imagePicker';

import {
  TextInput,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from "react-native";

const NewContactModal = (props) => {
  const name = 'add_contact';

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={props.visible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.headerRow}>
              <Text style={styles.modalHeader}>📓Add Contact</Text>
              <TouchableHighlight
                onPress={() => {
                  props.addCallBack(name);
                }}
              > 
                <Text style={styles.textStyle}>✖️</Text>
              </TouchableHighlight>
            </View>


            <View style={styles.formRow}>
              <ImageAndPicker />
            </View>

            <View style={styles.formRow}>
              <TextInput
                style={styles.formInput}
                placeholder="First Name" />
              <TextInput
                style={styles.formInput}
                placeholder="Last Name"
              />
            </View>

            <View style={styles.btnRow}>
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#A9A9A9" }}
                onPress={() => {
                  props.addCallBack(name);
                }}
              > 
                <Text style={styles.textStyle}>Cancel</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                onPress={() => {
                  props.addCallBack(name);
                }}
              > 
              <Text style={styles.textStyle}>Save Contact</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  btnRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 22,
  },
  headerRow: {
    width: "100%",
    margin: 0,
    padding: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 10,
    marginBottom: 10,
  },
  formInput: {
    width: "45%",
    borderBottomWidth : 0.5,
  },
  formRow: {
    width: "100%",
    margin: 0,
    padding: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingLeft: 10,
    marginTop: 10,
  },
  modalView: {
    width: "90%",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    borderRadius: 20,
    padding: 10,
    margin: 10,
    elevation: 2,
    minWidth: "45%",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: "bold",
  }
});

export default NewContactModal;