import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const ResultScreen = ({ route, navigation }) => {
    const { resultMessage } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.resultText}>{resultMessage}</Text>

            <Button
                title="Play Again"
                onPress={() => navigation.navigate('Game', { gameSettings: route.params.gameSettings })}
                color="#007bff"
            />

            <Button
                title="Back to Settings"
                onPress={() => navigation.navigate('Start')}
                color="#f0ad4e"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        padding: 16,
    },
    resultText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 32,
    },
});

export default ResultScreen;
