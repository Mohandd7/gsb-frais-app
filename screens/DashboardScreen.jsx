import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";

import { useState, useEffect } from "react";

import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import FraisCard from "../components/FraisCard";
import fraisData from "../data/frais.json";

export default function DashboardScreen() {
  const { user } = useAuth();

  const [fraisList, setFraisList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setFraisList(fraisData);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        style={{ marginTop: 40 }}
      />
    );
  }

  return (
    <View style={styles.screen}>
      <Navbar />

      <View style={styles.content}>
        <Text>Bienvenue {user}</Text>

        <FlatList
          data={fraisList}
          keyExtractor={(item) => item.id_frais.toString()}
          renderItem={({ item }) => <FraisCard frais={item} />}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  content: {
    padding: 16,
  },
});

/*
Question 7 :
Je mettrais en priorité l'année-mois, l'ID visiteur,
le montant saisi et le montant validé.
Les autres informations seraient en second plan
pour garder la carte simple et lisible.
*/
