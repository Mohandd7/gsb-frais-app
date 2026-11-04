import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  Text,
  FlatList,
  TextInput,
  Switch,
  ActivityIndicator,
  StyleSheet,
  Alert,
  Platform,
} from "react-native";
import FraisCard from "../components/FraisCard";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { getFraisList, deleteFrais } from "../services/fraisService";

export default function DashboardScreen({ navigation }) {
  const { user, token } = useAuth();

  const [fraisList, setFraisList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterNonNull, setFilterNonNull] = useState(false);
  const [montantMinimum, setMontantMinimum] = useState("");
  const [error, setError] = useState("");

  const fetchFrais = async () => {
    if (!user || !user.id_visiteur) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      setFraisList(await getFraisList(user.id_visiteur, token));
      setError("");
    } catch (err) {
      console.error("Erreur lors de la récupération des frais :", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchFrais();
    }, [user, token])
  );

  function handleEdit(id) {
    navigation.navigate("FraisEdit", { id });
  }

  async function removeFrais(id) {
    try {
      await deleteFrais(id, token);
      setFraisList((prev) => prev.filter((f) => f.id_frais !== id));
    } catch (error) {
      if (Platform.OS === "web") {
        window.alert("Erreur lors de la suppression : " + error.message);
      } else {
        Alert.alert("Erreur lors de la suppression :", error.message);
      }
    }
  }

  const handleDelete = (id) => {
    const message = "Êtes-vous sûr de vouloir supprimer cette note de frais ?";
    if (Platform.OS === "web") {
      if (window.confirm(message)) {
        removeFrais(id);
      }
    } else {
      Alert.alert("Confirmation", message, [
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: () => removeFrais(id),
        },
      ]);
    }
  };

  const filteredFrais = fraisList
    .filter((frais) => !filterNonNull || frais.montantvalide !== null)
    .filter(
      (frais) =>
        frais.anneemois?.toString().includes(searchTerm) ||
        frais.id_visiteur?.toString().includes(searchTerm)
    )
    .filter(
      (frais) =>
        montantMinimum === "" ||
        (frais.montantvalide !== null &&
          frais.montantvalide >= Number(montantMinimum))
    );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Navbar />

      <View style={styles.content}>
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
          <Text>Afficher seulement les frais avec un montant validé</Text>
        </View>

        <TextInput
          placeholder="Montant validé minimum (ex: 190)..."
          value={montantMinimum}
          onChangeText={setMontantMinimum}
          keyboardType="numeric"
          style={styles.searchInput}
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <FlatList
          data={filteredFrais}
          keyExtractor={(item) => item.id_frais.toString()}
          renderItem={({ item }) => (
            <FraisCard
              frais={item}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Aucune note de frais trouvée</Text>
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    padding: 16,
    flex: 1,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginTop: 8,
    marginBottom: 8,
    backgroundColor: "#FFFFFF",
  },
  filterRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 8,
  },
  error: {
    color: "red",
    marginBottom: 12,
  },
  emptyText: {
    textAlign: "center",
    color: "#888888",
    marginTop: 24,
  },
});
