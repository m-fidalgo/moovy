import { StyleSheet } from "react-native";

export const deleteModalStyle = StyleSheet.create({
  modal: {
    borderRadius: 20,
    marginBottom: 100,
    marginHorizontal: 25,
    padding: 50,
    backgroundColor: "#12153D",
    opacity: 0.9,
  },
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
