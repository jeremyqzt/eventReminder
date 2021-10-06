import { StyleSheet } from "react-native";
import { DefaultTheme } from "../utils/constants";

export const styles = StyleSheet.create({
  flat: {
    height: 150,
  },
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
  saveButtonIcon: {
    backgroundColor: DefaultTheme.offBlack,
  },
  deleteButton: {
    borderColor: DefaultTheme.offBlack,
  },
  button: {
    borderColor: DefaultTheme.offBlack,
  },
  buttonText: {
    color: DefaultTheme.offBlack,
  },
  buttonRow: {
    marginTop: 10,
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
    fontSize: 20,
  },
  titleStyle: {
    marginBottom: 0,
    fontSize: 18,
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
  colorPickerContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    zIndex: 0,
  },
  eventOptline: {
    marginHorizontal: 15,
    display: "flex",
    flexDirection: "row",
    width: "100%",
    zIndex: 0,
    justifyContent: "space-between",
    alignItems: "center",
  },
  bulkInput: {
    width: "98%",
    paddingHorizontal: 8,
    paddingVertical: 3,
    height: 60,
    borderWidth: 1,
    borderRadius: 10,
  },
  eventOptContainer: {
    marginVertical: 3,
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  extraNotesContainer: {
    marginLeft: 15,
    marginVertical: 12,
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  contactsContainer: {
    marginLeft: 15,
    width: "100%",
    marginVertical: 12,
    display: "flex",
    flexDirection: "column",
    paddingRight: 5,
  },
  PageNormal: {
    backgroundColor: DefaultTheme.normalMode.main,
    height: "100%",
  },
  PageDark: {
    backgroundColor: DefaultTheme.darkMode.main,
    height: "100%",
  },
  eventTile: {
    borderLeftWidth: 6,
  },
  datePicker: {
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 10,
    marginTop: 3,
    alignItems: "center",
    width: "100%",
  },
  iOsPicker: {
    flex: 1,
    height: 30,
    width: "100%",
  },
  iOsPickerContainer: {
    flex: 1,
    backgroundColor: "white",
    color: "red",
  },
  dateInformation: {
    width: "100%",
    paddingLeft: 25,
    display: "flex",
    flexDirection: "column",
    marginBottom: 15,
  },
  dateInformationText: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  colorBox: {
    width: "12.5%",
    flex: 1,
    aspectRatio: 1,
  },
  colorBoxContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  colorBoxContainerText: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  colorPickerContainer: {
    paddingHorizontal: 10,
    display: "flex",
    flexDirection: "column",
    width: "100%",
    minHeight: 70,
    marginBottom: 15,
  },
  colorPicker: {
    minHeight: 65,
    display: "flex",
    flexDirection: "column",
  },
  tileHeader: {
    fontSize: 20,
    marginRight: 5,
    fontWeight: "600",
  },
});
