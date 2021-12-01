import { StyleSheet } from "react-native";

export const movieCardStyle = StyleSheet.create({
  card: {
    marginTop: 10,
  },
  img: {
    height: 390,
  },
  content: {
    display: "flex",
    alignItems: "center",
    marginTop: 10,
  },
  title: {
    textAlign: "center",
  },
  pending: {
    backgroundColor: "#A1A1A1",
    color: "#000000",
    borderRadius: 20,
    textAlign: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  withoutReview: {
    justifyContent: "center",
    height: 80,
  },
  withReview: {
    justifyContent: "space-around",
    height: 80,
  },
});
