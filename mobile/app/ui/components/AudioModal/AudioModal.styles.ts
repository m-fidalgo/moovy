import { StyleSheet } from "react-native";

export const audioModalStyle = StyleSheet.create({
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
