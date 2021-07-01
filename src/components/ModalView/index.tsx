import React, { ReactNode } from "react";
import { styles } from "./styles";
import {
  Modal,
  ModalProps,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Background from "../Background";

type Props = ModalProps & {
  children: ReactNode;
  closeModal: () => void;
};

function ModalView({ children, closeModal, ...rest }: Props) {
  return (
    <Modal transparent animationType="slide" statusBarTranslucent {...rest}>
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={styles.overlay}>
          <View style={styles.container}>
            <Background>
              <View style={styles.bar} />
              {children}
            </Background>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

export default ModalView;
