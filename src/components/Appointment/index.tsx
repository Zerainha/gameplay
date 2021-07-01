import React from "react";
import { styles } from "./styles";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import { Text, View } from "react-native";
import GuildIcon from "../GuildIcon";
import { categories } from "../../utils/categories";
import PlayerSvg from "../../assets/player.svg";
import CalendarSvg from "../../assets/calendar.svg";
import { theme } from "../../global/styles/theme";
import { GuildProps } from "../Guild";
import { LinearGradient } from "expo-linear-gradient";

export type AppointmentProps = {
  id: string;
  guild: GuildProps;
  category: string;
  date: string;
  description: string;
};

type Props = RectButtonProps & {
  data: AppointmentProps;
};

function Appointment({ data, ...rest }: Props) {
  const [category] = categories.filter(
    (item) => item.id === data.category
  );
  const { owner } = data.guild;

  return (
    <RectButton {...rest}>
      <View style={styles.container}>
        <LinearGradient
          style={styles.guildIconContainer}
          colors={[theme.colors.secondary50, theme.colors.secondary70]}
        >
          <GuildIcon guildId={data.guild.id} iconId={data.guild.icon} />
        </LinearGradient>

        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>{data.guild.name}</Text>
            <Text style={styles.category}>{category.title}</Text>
          </View>
          <View style={styles.footer}>
            <View style={styles.dateInfo}>
              <CalendarSvg />
              <Text style={styles.date}>{data.date}</Text>
            </View>
            <View style={styles.playersInfo}>
              <PlayerSvg
                fill={owner ? theme.colors.primary : theme.colors.on}
              />
              <Text
                style={[
                  styles.player,
                  { color: owner ? theme.colors.primary : theme.colors.on },
                ]}
              >
                {owner ? "Anfritrião" : "Visitante"}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </RectButton>
  );
}

export default Appointment;