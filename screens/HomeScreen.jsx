import { View, Text, StyleSheet } from "react-native";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

export default function HomeScreen() {
  const { user } = useAuth();

  return (
    <View style={styles.screen}>
      <Navbar />
      <View style={styles.content}>
        {user ? (
          <Text style={styles.title}>Bonjour {user?.prenom_visiteur} !</Text>
        ) : (
          <Text style={styles.title}>Bienvenue</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { padding: 16 },
  title: { fontSize: 20, fontWeight: "600", color: "#161B33" },
});
