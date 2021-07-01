import React from "react";
import {styles} from "./styles";
import {Image, View} from "react-native";
import DiscordSvg from '../../assets/discord.svg';

const {CDN_IMAGE} = process.env;

type Props = {
    guildId: string;
    iconId: string | null;
}

function GuildIcon({guildId, iconId}: Props) {
    const uri = `${CDN_IMAGE}/icons/${guildId}/${iconId}.png`;

    return (
      <View style={styles.container}>
          {
              iconId ?
                  <Image source={{uri}} style={styles.image} resizeMode="cover"/> :
                  <DiscordSvg width={40} height={40}/>
          }

      </View>
    );
}

export default GuildIcon;