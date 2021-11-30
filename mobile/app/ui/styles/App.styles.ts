import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

export const appStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 50,
  },
  title: {
    fontSize: 25,
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
