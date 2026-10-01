import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { View, Text, TextInput, Pressable, Alert } from "react-native";
import Navbar from "../components/Navbar";
import { loginStyles as styles } from "../styles/loginStyles.js";

export default function LoginScreen() {
  
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  // Fonction de connexion
  const { loginUser } = useAuth();

  
  const handleSubmit = () => {
    if (!loginUser(login, password)) {
      Alert.alert("Identifiants incorrects");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Navbar />

      <View style={styles.container}>
        <Text style={styles.title}>Connexion</Text>

        <View>
          <Text>Login :</Text>

          <TextInput
            style={styles.input}
            value={login}
            onChangeText={setLogin}
          />
        </View>

        <View>
          <Text>Mot de passe :</Text>

          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <Pressable style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Se connecter</Text>
        </Pressable>
      </View>
    </View>
  );
}
