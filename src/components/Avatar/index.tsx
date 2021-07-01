import React from "react";
import { styles } from "./styles";
import { Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { theme } from "../../global/styles/theme";

type Props = {
  urlImage: string;
};

function Avatar({ urlImage }: Props) {
  return (
    <LinearGradient
      style={styles.container}
      colors={[theme.colors.secondary50, theme.colors.secondary70]}
    >
      <Image source={{ uri: urlImage }} style={styles.avatar} />
    </LinearGradient>
  );
}

export default Avatar;
