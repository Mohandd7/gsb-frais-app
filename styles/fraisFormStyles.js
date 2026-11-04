import { StyleSheet } from "react-native";

export const fraisFormStyles = StyleSheet.create({
  container: {
    padding: 24,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    color: "#161B33",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    color: "#161B33",
  },
  label: {
    fontSize: 14,
    color: "#333333",
    marginTop: 8,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    backgroundColor: "#FFFFFF",
  },
  smallButtonRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
    marginTop: 4,
  },
  smallbutton: {
    flex: 1,
    backgroundColor: "#666666",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#333333",
    borderRadius: 8,
    padding: 14,
    alignItems: "center",
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  error: {
    color: "red",
    marginTop: 12,
    textAlign: "center",
  },
});

export default fraisFormStyles;
