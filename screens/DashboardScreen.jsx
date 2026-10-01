import { View, Text, StyleSheet } from "react-native";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

export default function DashboardScreen() {
  const { user } = useAuth();

  return (
    <View style={styles.screen}>
      <Navbar />
      <View style={styles.content}>
        <Text>Bienvenue {user}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { padding: 16 },
});


{/* Question 7 :
Je mettrais en priorité l'année-mois, l'ID visiteur,
le montant saisi et le montant validé.
Les autres informations seraient en second plan
pour garder la carte simple et lisible.
*/}
