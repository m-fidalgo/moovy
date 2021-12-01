import { StyleSheet } from "react-native";

export const recordModalStyle = StyleSheet.create({
  modal: {
    borderRadius: 20,
    marginTop: 400,
    marginBottom: 70,
    marginHorizontal: 25,
    padding: 50,
    backgroundColor: "#12153D",
    opacity: 0.9,
  },
  timeContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 30,
    marginTop: 30,
    justifyContent: "space-between",
    alignItems: "center",
  },
  recordingTime: {
    color: "#fff",
    fontSize: 30,
    marginLeft: 15,
  },
  playingTime: {
    color: "#fff",
    fontSize: 15,
    marginLeft: 15,
  },
  modalErrorText: {
    color: "#fff",
    fontSize: 25,
  },
});
