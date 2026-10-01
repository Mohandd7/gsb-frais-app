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
    // Question 20 : exclure les montants non validés si le filtre est activé
    .filter(
      (frais) =>
        !filterNonNull || frais.montantvalide !== null
    )

    // Question 17 : recherche par année-mois ou ID visiteur
    .filter(
      (frais) =>
        frais.anneemois.includes(searchTerm) ||
        frais.id_visiteur.toString().includes(searchTerm)
    )

    // Question 23 : filtre sur le montant minimum
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

        {/* Question 18 : recherche */}
        <TextInput
          placeholder="Rechercher par année-mois ou ID visiteur..."
          value={searchTerm}
          onChangeText={setSearchTerm}
          style={styles.searchInput}
        />

        {/* Question 21 : filtre montant validé */}
        <View style={styles.filterRow}>
          <Switch
            value={filterNonNull}
            onValueChange={setFilterNonNull}
          />

          <Text>
            Afficher seulement les frais avec un montant validé
          </Text>
        </View>

        {/* Question 23 : montant minimum */}
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
