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
  withoutReview: {
    justifyContent: "center",
    height: 80,
  },
  withReview: {
    justifyContent: "space-around",
    height: 80,
  },
});
