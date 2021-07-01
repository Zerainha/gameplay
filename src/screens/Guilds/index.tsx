import React, {useEffect, useState} from "react";
import { styles } from "./styles";
import { FlatList, View } from "react-native";
import Guild, { GuildProps } from "../../components/Guild";
import ListDivider from "../../components/ListDivider";
import Load from "../../components/Load";
import api from "../../services/api";

type Props = {
  handleGuildSelect: (guild: GuildProps) => void;
};

function Guilds({ handleGuildSelect }: Props) {
  const [guilds, setGuilds] = useState<GuildProps[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchGuilds() {
    const res = await api.get('/users/@me/guilds');

    setGuilds(res.data);
    setLoading(false);
  }

  useEffect(() => {
    fetchGuilds();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <Load />
      ) : (
        <FlatList
          data={guilds}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Guild data={item} onPress={() => handleGuildSelect(item)} />
          )}
          ItemSeparatorComponent={() => <ListDivider isCentered />}
          contentContainerStyle={{ paddingBottom: 68, paddingTop: 104 }}
          ListHeaderComponent={() => <ListDivider isCentered />}
          showsVerticalScrollIndicator={false}
          style={styles.guilds}
        />
      )}
    </View>
  );
}

export default Guilds;
