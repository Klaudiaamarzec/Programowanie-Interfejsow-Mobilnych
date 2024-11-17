import React from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';

const ResultScreen = ({ route, navigation }) => {
    const { resultMessage } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.resultText}>{resultMessage}</Text>

            <TouchableOpacity
                style={[styles.button]}
                onPress={() => navigation.navigate('Game', { gameSettings: route.params.gameSettings })}
            >
                <Text style={styles.buttonText}>Play Again</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.button]}
                onPress={() => navigation.navigate('Start')}
            >
                <Text style={styles.buttonText}>Back to Settings</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        padding: 16,
        marginTop: -50
    },
    resultText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#000000',
        marginBottom: 40,
    },
    button: {
        backgroundColor: '#ffe83c',
        width: '150',
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        marginBottom: 32,
    },
    buttonText: {
        color: '#000',
        fontSize: 14,
        fontWeight: 'normal',
    },
});

export default ResultScreen;
