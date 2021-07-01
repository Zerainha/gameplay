import React, { useState } from "react";
import { styles } from "./styles";
import Background from "../../components/Background";
import Header from "../../components/Header";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import CategorySelect from "../../components/CategorySelect";
import { RectButton } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { theme } from "../../global/styles/theme";
import SmallInput from "../../components/SmallInput";
import TextArea from "../../components/TextArea";
import Button from "../../components/Button";
import ModalView from "../../components/ModalView";
import Guilds from "../Guilds";
import { GuildProps } from "../../components/Guild";
import GuildIcon from "../../components/GuildIcon";

import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLLECTION_APPOINTMENT } from "../../configs/database";
import { useNavigation } from "@react-navigation/native";

function AppointmentCreate() {
  const navigation = useNavigation();

  const [category, setCategory] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [guild, setGuild] = useState<GuildProps>({} as GuildProps);

  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [description, setDescription] = useState("");

  function handleOpenModal() {
    setOpenModal(true);
  }

  function handleCloseModal() {
    setOpenModal(false);
  }

  function handleGuildSelect(guildSelect: GuildProps) {
    setGuild(guildSelect);
    setOpenModal(false);
  }

  function handleCategorySelect(categoryId: string) {
    setCategory(categoryId);
  }

  async function handleSave() {
    const newAppointment = {
      id: uuid.v4(),
      guild,
      category,
      date: `${day}/${month} às ${hour}:${minute}h`,
      description,
    };

    if (
      newAppointment.guild === undefined ||
      newAppointment.category === "" ||
      newAppointment.description === "" ||
      day === "" ||
      month === "" ||
      hour === "" ||
      minute === ""
    ) {
      Alert.alert('ERRO AO PREENCHER OS CAMPOS!', 'Verifique se preencheu todos os campos');
      return;
    }

    const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENT);
    const appointments = storage ? JSON.parse(storage) : [];

    await AsyncStorage.setItem(
      COLLECTION_APPOINTMENT,
      JSON.stringify([...appointments, newAppointment])
    );

    navigation.navigate("Home");
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Background>
        <ScrollView>
          <Header title="Agendar partida" />

          <Text
            style={[
              styles.label,
              { marginLeft: 24, marginTop: 36, marginBottom: 18 },
            ]}
          >
            Categoria
          </Text>

          <CategorySelect
            hasCheckBox
            categorySelected={category}
            setCategory={handleCategorySelect}
          />

          <View style={styles.form}>
            <RectButton onPress={handleOpenModal}>
              <View style={styles.select}>
                {guild.icon ? (
                  <GuildIcon guildId={guild.id} iconId={guild.icon} />
                ) : (
                  <View style={styles.image} />
                )}
                <View style={styles.selectBody}>
                  <Text style={styles.label}>
                    {guild.name ? guild.name : "Selecione um servidor"}
                  </Text>
                </View>
                <Feather
                  name="chevron-right"
                  color={theme.colors.reading}
                  size={18}
                />
              </View>
            </RectButton>

            <View style={styles.field}>
              <View>
                <Text style={[styles.label, { marginBottom: 12 }]}>
                  Dia e mês
                </Text>
                <View style={styles.column}>
                  <SmallInput onChangeText={setDay} maxLength={2} />
                  <Text style={styles.divider}>/</Text>
                  <SmallInput onChangeText={setMonth} maxLength={2} />
                </View>
              </View>
              <View>
                <Text style={[styles.label, { marginBottom: 12 }]}>
                  Hora e minuto
                </Text>
                <View style={styles.column}>
                  <SmallInput onChangeText={setHour} maxLength={2} />
                  <Text style={styles.divider}>:</Text>
                  <SmallInput onChangeText={setMinute} maxLength={2} />
                </View>
              </View>
            </View>
            <View style={[styles.field, { marginBottom: 12 }]}>
              <Text style={[styles.label, { marginBottom: 12 }]}>
                Descrição
              </Text>
              <Text style={styles.textLimit}>Max 100 caracteres</Text>
            </View>
            <TextArea
              onChangeText={setDescription}
              multiline
              maxLength={100}
              numberOfLines={5}
              autoCorrect={false}
            />
            <View style={styles.footer}>
              <Button onPress={handleSave} title="Agendar" />
            </View>
          </View>
        </ScrollView>
        <ModalView visible={openModal} closeModal={handleCloseModal}>
          <Guilds handleGuildSelect={handleGuildSelect} />
        </ModalView>
      </Background>
    </KeyboardAvoidingView>
  );
}

export default AppointmentCreate;
