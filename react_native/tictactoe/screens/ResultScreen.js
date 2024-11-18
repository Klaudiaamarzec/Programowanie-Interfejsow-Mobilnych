import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Styles from "../ui.theme/Styles";

const ResultScreen = ({ route, navigation }) => {
    const { resultMessage } = route.params;
    const styles = Styles();

    return (
        <View style={styles.resultContainer}>
            <Text style={styles.resultText}>{resultMessage}</Text>

            <TouchableOpacity
                style={[styles.resultButton]}
                onPress={() => navigation.navigate('Game', { gameSettings: route.params.gameSettings })}
            >
                <Text style={styles.playButtonText}>Play Again</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.resultButton]}
                onPress={() => navigation.navigate('Start')}
            >
                <Text style={styles.playButtonText}>Back to Settings</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ResultScreen;
