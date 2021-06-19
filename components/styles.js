import { StyleSheet } from "react-native";
import { DefaultTheme } from "../utils/constants";

export const styles = StyleSheet.create({
  buttonContainer: {
    marginHorizontal: 5,
  },
  buttonNormal: {
    borderRadius: 15,
    paddingHorizontal: 5,
  },
  deleteButtonIcon: {
    backgroundColor: DefaultTheme.delete,
  },
  deleteButton: {
    borderRadius: 30,
    borderColor: DefaultTheme.delete,
  },
  saveButtonIcon: {
    backgroundColor: DefaultTheme.offBlack,
  },
  deleteButton: {
    borderRadius: 30,
    borderColor: DefaultTheme.offBlack,
  },
  button: {
    borderRadius: 25,
    borderColor: DefaultTheme.offBlack,
  },
  buttonText: {
    color: DefaultTheme.offBlack,
  },
  buttonRow: {
    justifyContent: "flex-end",
  },
  input: {
    width: "50%",
  },
  inputContainer: {
    marginVertical: -5,
    lineHeight: 0.4,
    borderBottomWidth: 1,
  },
  inputStyle: {
    marginBottom: 0,
  },
  inputIconStyle: {
    marginVertical: -10,
  },
  inputLabelStyle: {
    paddingVertical: 0,
    marginVertical: 0,
  },
  form: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  PageNormal: {
    backgroundColor: DefaultTheme.normalMode.main,
    height: "100%",
  },
  PageDark: {
    backgroundColor: DefaultTheme.darkMode.main,
    height: "100%",
  },
  datePicker: {
    width: "100%",
  },
});
