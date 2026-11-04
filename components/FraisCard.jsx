import { View, Text, StyleSheet, Pressable } from "react-native";

export default function FraisCard({ frais, onEdit, onDelete }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>
        Note [{frais.id_frais}] Visiteur n°{frais.id_visiteur} - {frais.anneemois}
      </Text>

      <Text style={styles.meta}>
        Nombre de justificatifs : {frais.nbjustificatifs}
      </Text>

      {frais.datemodification ? (
        <Text style={styles.meta}>
          Date de modification : {frais.datemodification}
        </Text>
      ) : null}

      <Text style={styles.montant}>
        Montant validé : {frais.montantvalide !== null && frais.montantvalide !== undefined
          ? `${frais.montantvalide} €`
          : "Non validé"}
      </Text>

      <Text style={styles.meta}>
        Montant saisi : — €
      </Text>

      {frais.lib_etat ? (
        <Text style={styles.meta}>
          Etat : {frais.lib_etat}
        </Text>
      ) : null}

      <View style={styles.actionRow}>
        <Pressable
          style={styles.editButton}
          onPress={() => onEdit && onEdit(frais.id_frais)}
        >
          <Text style={styles.editButtonText}>Modifier</Text>
        </Pressable>
        <Pressable
          style={styles.deleteButton}
          onPress={() => onDelete && onDelete(frais.id_frais)}
        >
          <Text style={styles.deleteButtonText}>Supprimer</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    marginBottom: 12,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#161B33",
  },
  meta: {
    fontSize: 14,
    color: "#5B6270",
    marginTop: 4,
  },
  montant: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#0E8C7C",
    marginTop: 4,
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8,
    marginTop: 12,
  },
  editButton: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 14,
    backgroundColor: "#FFFFFF",
  },
  editButtonText: {
    color: "#333333",
    fontSize: 14,
  },
  deleteButton: {
    borderWidth: 1,
    borderColor: "#E57373",
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 14,
    backgroundColor: "#FFFFFF",
  },
  deleteButtonText: {
    color: "#D32F2F",
    fontSize: 14,
  },
});
