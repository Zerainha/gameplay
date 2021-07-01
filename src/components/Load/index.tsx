import React from 'react';
import {styles} from "./styles";
import {ActivityIndicator, View} from "react-native";
import {theme} from "../../global/styles/theme";

function Load() {
    return (
        <View style={styles.container}>
            <ActivityIndicator
            size="large"
            color={theme.colors.primary}/>
        </View>
    );
}

export default Load;
