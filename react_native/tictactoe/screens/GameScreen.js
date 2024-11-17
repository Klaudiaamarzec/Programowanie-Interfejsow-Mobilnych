import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';

const GameScreen = ({ navigation, route }) => {
    const { gameSettings } = route.params;

    const [currentPlayer, setCurrentPlayer] = useState('X');
    const [board, setBoard] = useState(
        Array(gameSettings.boardSize).fill().map(() => Array(gameSettings.boardSize).fill('NONE'))
    );
    const [winner, setWinner] = useState(null);

    const player1Color = gameSettings.player1Color;
    const player2Color = gameSettings.player2Color;
    const player1Shape = gameSettings.player1Shape?.symbol || 'X';
    const player2Shape = gameSettings.player2Shape?.symbol || 'O';

    const getPlayerSymbolAndColor = (player) => {
        switch (player) {
            case 'X':
                return { symbol: player1Shape, color: player1Color };
            case 'O':
                return { symbol: player2Shape, color: player2Color };
            default:
                return { symbol: '', color: 'transparent' };
        }
    };

    useEffect(() => {
        if (!board.length) {
            setBoard(
                Array(gameSettings.boardSize).fill().map(() => Array(gameSettings.boardSize).fill('NONE'))
            );
        }
    }, []);

    const checkWinner = () => {
        for (let i = 0; i < gameSettings.boardSize; i++) {
            if (
                board[i].every(cell => cell === 'X') ||
                board.map(row => row[i]).every(cell => cell === 'X')
            ) return 'X';
            if (
                board[i].every(cell => cell === 'O') ||
                board.map(row => row[i]).every(cell => cell === 'O')
            ) return 'O';
        }
        if (board.every((_, i) => board[i][i] === 'X')) return 'X';
        if (board.every((_, i) => board[i][i] === 'O')) return 'O';
        if (board.every((_, i) => board[i][gameSettings.boardSize - i - 1] === 'X')) return 'X';
        if (board.every((_, i) => board[i][gameSettings.boardSize - i - 1] === 'O')) return 'O';
        if (board.flat().every(cell => cell !== 'NONE')) return 'NONE';
        return null;
    };

    const makeComputerMove = () => {
        const emptyCells = [];
        for (let i = 0; i < gameSettings.boardSize; i++) {
            for (let j = 0; j < gameSettings.boardSize; j++) {
                if (board[i][j] === 'NONE') emptyCells.push([i, j]);
            }
        }
        if (emptyCells.length) {
            const [i, j] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            board[i][j] = 'O';
            //setBoard([...board]);
            setCurrentPlayer('X');
        }
    };

    const onCellClick = (i, j) => {
        if (board[i][j] === 'NONE' && winner === null) {
            board[i][j] = currentPlayer;
            //setBoard([...board]);
            const currentWinner = checkWinner();
            setWinner(currentWinner);
            if (currentWinner === null) {
                setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
                if (gameSettings.mode === 'SINGLE_MODE' && currentPlayer === 'O') {
                    makeComputerMove();
                    const newWinner = checkWinner();
                    setWinner(newWinner);
                }
            }
        }
    };

    useEffect(() => {
        if (winner !== null) {
            const resultMessage = winner === 'NONE' ? "It's a tie!" : `The winner is: ${winner === 'X' ? player1Shape : player2Shape}`;
            setTimeout(() => {
                navigation.navigate('Result', { resultMessage, gameSettings: gameSettings });
            }, 100);
        }
    }, [winner]);

    return (
        <View style={styles.container}>
            <View style={styles.board}>
                {Array.from({ length: gameSettings.boardSize }).map((_, i) => (
                    <View key={i} style={styles.row}>
                        {Array.from({ length: gameSettings.boardSize }).map((_, j) => {
                            const { symbol, color } = getPlayerSymbolAndColor(board[i][j]);
                            return (
                                <TouchableOpacity
                                    key={j}
                                    style={[styles.cell]}
                                    onPress={() => onCellClick(i, j)}
                                >
                                    <Text style={[styles.cellText, { color: color }]}>
                                        {symbol}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                ))}
            </View>

            <TouchableOpacity
                style={[styles.button]}
                onPress={() => navigation.goBack()}
            >
                <Text style={styles.buttonText}>Back to settings</Text>
            </TouchableOpacity>

            {/*<Button style={[styles.button]} title="Back to settings" onPress={() => navigation.goBack()} />*/}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        marginTop: -135,
    },
    board: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    row: {
        flexDirection: 'row',
    },
    cell: {
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#ffe954',
    },
    cellText: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#ffe83c',
        width: '150',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        marginBottom: 35,
    },
    buttonText: {
        color: '#000',
        fontSize: 14,
        fontWeight: 'normal',
    },
});

export default GameScreen;