import React from "react";
import { Text, Image, View, Alert, ActivityIndicator } from "react-native";
import { styles } from "./styles";
import IllustrationImg from "../../assets/illustration.png";
import ButtonIcon from "../../components/ButtonIcon";
import Background from "../../components/Background";
import { useAuth } from "../../hooks/auth";
import { theme } from "../../global/styles/theme";

export default function SignIn() {
  const { loading, signIn } = useAuth();

  async function handleSignIn() {
    try {
      await signIn();
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  }

  return (
    <Background>
      <View style={styles.container}>
        <Image
          source={IllustrationImg}
          style={styles.image}
          resizeMode="stretch"
        />

        <View style={styles.content}>
          <Text style={styles.title}>
            Conecte-se {`\n`} e organize suas {`\n`} jogatinas
          </Text>

          <Text style={styles.subtitle}>
            Crie grupos para jogar seus games {`\n`}
            favoritos com seus amigos
          </Text>
          {loading ? (
            <ActivityIndicator color={theme.colors.primary} />
          ) : (
            <ButtonIcon onPress={handleSignIn} title="Entrar com discord" />
          )}
        </View>
      </View>
    </Background>
  );
}
