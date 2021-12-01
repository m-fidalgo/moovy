import { StyleSheet } from "react-native";

export const appStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 50,
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
