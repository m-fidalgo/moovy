import { StyleSheet } from "react-native";

export const appStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 50,
  },
  modal: {
    borderRadius: 20,
    marginTop: 400,
    marginBottom: 70,
    marginHorizontal: 25,
    padding: 50,
    backgroundColor: "#12153D",
    opacity: 0.9,
  },
  recordingTimeContainer: {
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  recordingButtonsContainer: {
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
  title: {
    fontSize: 30,
    alignSelf: "flex-start",
  },
  noMoviesContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    marginTop: 100,
  },
  message: {
    marginTop: 50,
    textAlign: "center",
    fontSize: 20,
  },
});
