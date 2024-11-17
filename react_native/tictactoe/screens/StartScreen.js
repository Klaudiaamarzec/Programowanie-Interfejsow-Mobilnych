import React, { useState, useEffect } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { Surface } from 'react-native-paper';

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
              <Text style={styles.subtitleSingle}>Choose Color and Shape</Text>
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
        <TouchableOpacity
            style={styles.playButton}
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
        >
          <Text style={styles.playButtonText}>PLAY</Text>
        </TouchableOpacity>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 35,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 33,
    alignSelf: 'flex-start',
    paddingLeft: 20,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  subtitle: {
    fontSize: 15,
    marginBottom: 9,
    marginTop: 25,
  },
  subtitleSingle: {
    fontSize: 15,
    marginBottom: 0,
    marginTop: 25,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 11,
  },
  button: {
    paddingHorizontal: 25,
    borderRadius: 30,
    width: 133,
    height: 39,
    backgroundColor: '#ccc',
    marginHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#777',
  },
  buttonText: {
    fontSize: 14,
    color: '#fff',
  },
  sizeButton: {
    paddingVertical: 8,
    paddingHorizontal: 26,
    marginLeft: 10,
    height: 37,
    borderRadius: 30,
    backgroundColor: '#ccc',
  },
  sizeButtonText: {
    fontSize: 14,
    color: '#fff',
  },
  colorOption: {
    width: 45,
    height: 45,
    borderRadius: 0,
    margin: 8,
  },
  selectedColorOption: {
    borderWidth: 3,
    borderColor: '#000',
  },
  shapeButton: {
    paddingTop: 7,
    paddingBottom: 10,
    paddingHorizontal: 22,
    width: 55,
    backgroundColor: '#ccc',
    borderRadius: 30,
    marginTop: 3,
    marginRight: 5,
  },
  playButton: {
    backgroundColor: '#ffe83c',
    width: '100',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginTop: 62,
  },
  playButtonText: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'normal',
  },
});

export default StartScreen;
