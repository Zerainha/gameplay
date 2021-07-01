import React from "react";
import DiscordImg from "../../assets/discord.png";
import { Image, Text, View } from "react-native";
import { styles } from "./styles";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";

type Props = RectButtonProps & {
  title: string;
};

export default function ButtonIcon({ title, ...rest }: Props) {
  return (
    <RectButton style={styles.container} {...rest}>
      <View style={styles.iconWrapper}>
        <Image source={DiscordImg} style={styles.icon} />
      </View>
      <Text style={styles.title}>{title}</Text>
    </RectButton>
  );
}
