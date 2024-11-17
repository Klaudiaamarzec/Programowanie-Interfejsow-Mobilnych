import React, { useState, useEffect } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { Surface } from 'react-native-paper';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

const StartScreen = ({ navigation }) => {
  const [selectedMode, setSelectedMode] = useState('SINGLE_MODE');
  const [selectedBoardSize, setSelectedBoardSize] = useState(3);
  const [player1Color, setPlayer1Color] = useState('#FFEB3B'); // Yellow
  const [player2Color, setPlayer2Color] = useState('#2196F3'); // Blue
  const [player1Shape, setPlayer1Shape] = useState('X');
  const [player2Shape, setPlayer2Shape] = useState('O');

  // Randomize player2's color and shape in Single Mode
  useEffect(() => {
    if (selectedMode === 'SINGLE_MODE') {
      const availableColors = ['#FFEB3B', '#F44336', '#2196F3', '#4CAF50', '#9C27B0'];
      const availableShapes = ['X', 'O', '■', '▲', '★'];

      const randomColor = availableColors.filter(color => color !== player1Color)[Math.floor(Math.random() * availableColors.length)];
      const randomShape = availableShapes.filter(shape => shape !== player1Shape)[Math.floor(Math.random() * availableShapes.length)];

      setPlayer2Color(randomColor);
      setPlayer2Shape(randomShape);
    }
  }, [selectedMode, player1Color, player1Shape]);

  const renderButton = (label, onPress, isSelected) => (
      <TouchableOpacity onPress={onPress} style={[styles.button, isSelected && styles.selectedButton]}>
        <Text style={styles.buttonText}>{label}</Text>
      </TouchableOpacity>
  );

  const renderColorOption = (color, onPress, isSelected) => (
      <TouchableOpacity
          onPress={onPress}
          style={[
            styles.colorOption,
            { backgroundColor: color },
            isSelected && styles.selectedColorOption
          ]}
      />
  );

  const renderShapeOption = (shape, onPress, isSelected) => (
      <TouchableOpacity onPress={onPress} style={[styles.shapeButton, isSelected && styles.selectedButton]}>
        <Text style={styles.buttonText}>{shape}</Text>
      </TouchableOpacity>
  );

  return (
      <View style={styles.container}>
        <Text style={styles.title}>Select game mode and settings</Text>

        {/* Game Mode */}
        <View style={styles.row}>
          {renderButton('Single Mode', () => setSelectedMode('SINGLE_MODE'), selectedMode === 'SINGLE_MODE')}
          {renderButton('Double Mode', () => setSelectedMode('DOUBLE_MODE'), selectedMode === 'DOUBLE_MODE')}
        </View>

        {/* Board Size */}
        <Text style={styles.subtitle}>Choose Board Size</Text>
        <View style={styles.row}>
          {[3, 4, 5].map(size => (
              <TouchableOpacity key={size} onPress={() => setSelectedBoardSize(size)}>
                <Surface style={[styles.sizeButton, selectedBoardSize === size && styles.selectedButton]}>
                  <Text style={styles.sizeButtonText}>{`${size}x${size}`}</Text>
                </Surface>
              </TouchableOpacity>
          ))}
        </View>

        {/* Player 1 Settings */}
        {selectedMode === 'SINGLE_MODE' ? (
            <>
              <Text style={styles.subtitle}>Choose Color and Shape</Text>
              <Text style={styles.subtitle}>Player 1</Text>
              <View style={styles.row}>
                {['#FFEB3B', '#F44336', '#2196F3', '#4CAF50', '#9C27B0'].map(color => (
                    <TouchableOpacity key={color} onPress={() => setPlayer1Color(color)}>
                      {renderColorOption(color, () => setPlayer1Color(color), player1Color === color)}
                    </TouchableOpacity>
                ))}
              </View>

              <View style={styles.row}>
                {['X', 'O', '■', '▲', '★'].map(shape => (
                    <TouchableOpacity key={shape} onPress={() => setPlayer1Shape(shape)}>
                      {renderShapeOption(shape, () => setPlayer1Shape(shape), player1Shape === shape)}
                    </TouchableOpacity>
                ))}
              </View>
            </>
        ) : (
            <>
              {/* Double Mode Player 1 Settings */}
              <Text style={styles.subtitle}>Player 1 - Choose Color and Shape</Text>
              <View style={styles.row}>
                {['#FFEB3B', '#F44336', '#2196F3', '#4CAF50', '#9C27B0'].map(color => (
                    <TouchableOpacity key={color} onPress={() => setPlayer1Color(color)}>
                      {renderColorOption(color, () => setPlayer1Color(color), player1Color === color)}
                    </TouchableOpacity>
                ))}
              </View>

              <View style={styles.row}>
                {['X', 'O', '■', '▲', '★'].map(shape => (
                    <TouchableOpacity key={shape} onPress={() => setPlayer1Shape(shape)}>
                      {renderShapeOption(shape, () => setPlayer1Shape(shape), player1Shape === shape)}
                    </TouchableOpacity>
                ))}
              </View>

              {/* Double Mode Player 2 Settings */}
              <Text style={styles.subtitle}>Player 2 - Choose Color and Shape</Text>
              <View style={styles.row}>
                {['#FFEB3B', '#F44336', '#2196F3', '#4CAF50', '#9C27B0'].map(color => (
                    <TouchableOpacity key={color} onPress={() => setPlayer2Color(color)}>
                      {renderColorOption(color, () => setPlayer2Color(color), player2Color === color)}
                    </TouchableOpacity>
                ))}
              </View>

              <View style={styles.row}>
                {['X', 'O', '■', '▲', '★'].map(shape => (
                    <TouchableOpacity key={shape} onPress={() => setPlayer2Shape(shape)}>
                      {renderShapeOption(shape, () => setPlayer2Shape(shape), player2Shape === shape)}
                    </TouchableOpacity>
                ))}
              </View>
            </>
        )}

        {/* Play Button */}
        <Button
            title="PLAY"
            onPress={() => {
              navigation.navigate('Game', {
                gameSettings: {
                  mode: selectedMode,
                  boardSize: selectedBoardSize,
                  player1Color,
                  player2Color,
                  player1Shape,
                  player2Shape
                }
              });
            }}
        />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 16,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: '#ccc',
  },
  selectedButton: {
    backgroundColor: '#777',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
  },
  sizeButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: '#ccc',
  },
  sizeButtonText: {
    fontSize: 16,
    color: '#fff',
  },
  colorOption: {
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 8,
  },
  selectedColorOption: {
    borderWidth: 3,
    borderColor: '#000',
  },
  shapeButton: {
    padding: 16,
    backgroundColor: '#ccc',
    borderRadius: 8,
    margin: 8,
  },
});

export default StartScreen;
