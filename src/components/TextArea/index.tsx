import React from 'react';
import {styles} from "./styles";
import {TextInput, TextInputProps} from "react-native";

function TextArea({...rest}: TextInputProps) {
    return (
        <TextInput
        style={styles.container}
        {...rest}
        />
    );
}

export default TextArea;
