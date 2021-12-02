import { StyleSheet } from "react-native";

export const deleteModalStyle = StyleSheet.create({
  modalTitle: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 80,
  },
  modalText: {
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 50,
  },
  buttonsContainer: {
    display: "flex",
    justifyContent: "space-between",
    height: 150,
  },
  button: {
    borderRadius: 20,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});
