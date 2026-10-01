import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TextInput,
  Switch,
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
  const [searchTerm, setSearchTerm] = useState("");
  const [filterNonNull, setFilterNonNull] = useState(true);
  const [montantMinimum, setMontantMinimum] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setFraisList(fraisData);
      setLoading(false);
    }, 500);
  }, []);

  const filteredFrais = fraisList
    
    .filter(
      (frais) =>
        !filterNonNull || frais.montantvalide !== null
    )

    
    .filter(
      (frais) =>
        frais.anneemois.includes(searchTerm) ||
        frais.id_visiteur.toString().includes(searchTerm)
    )

    
    .filter(
      (frais) =>
        montantMinimum === "" ||
        (frais.montantvalide !== null &&
          frais.montantvalide >= Number(montantMinimum))
    );

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

        
        <TextInput
          placeholder="Rechercher par année-mois ou ID visiteur..."
          value={searchTerm}
          onChangeText={setSearchTerm}
          style={styles.searchInput}
        />

        
        <View style={styles.filterRow}>
          <Switch
            value={filterNonNull}
            onValueChange={setFilterNonNull}
          />

          <Text>
            Afficher seulement les frais avec un montant validé
          </Text>
        </View>

        
        <TextInput
          placeholder="Montant validé minimum..."
          value={montantMinimum}
          onChangeText={setMontantMinimum}
          keyboardType="numeric"
          style={styles.searchInput}
        />

        <FlatList
          data={filteredFrais}
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

  searchInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginTop: 12,
    marginBottom: 12,
  },

  filterRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 8,
  },
});

/*
Question 7 :
Je mettrais en priorité l'année-mois, l'ID visiteur,
le montant saisi et le montant validé.
Les autres informations seraient en second plan
pour garder la carte simple et lisible.
*/

