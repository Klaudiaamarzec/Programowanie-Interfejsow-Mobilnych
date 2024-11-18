import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Surface } from 'react-native-paper';
import Colors from "../ui.theme/Color";
import Styles from "../ui.theme/Styles";

const StartScreen = ({ navigation }) => {
  const [selectedMode, setSelectedMode] = useState('SINGLE_MODE');
  const [selectedBoardSize, setSelectedBoardSize] = useState(3);
  const [player1Color, setPlayer1Color] = useState(Colors.Yellow200);
  const [player2Color, setPlayer2Color] = useState(Colors.Blue200);
  const [player1Shape, setPlayer1Shape] = useState('X');
  const [player2Shape, setPlayer2Shape] = useState('O');

  const styles = Styles();

  // Randomize player2's color and shape in Single Mode
  useEffect(() => {
    if (selectedMode === 'SINGLE_MODE') {
      const availableColors = [Colors.Yellow200, Colors.Red200, Colors.Blue200, Colors.Green200, Colors.Purple200];
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

    const containerStyle = {
        ...styles.container,
        paddingTop: selectedMode === 'SINGLE_MODE' ? 120 : 40,
    };

    const subtitleStyle = {
        ...styles.subtitle,
        marginTop: selectedMode === 'SINGLE_MODE' ? 25: 28,
    };

    const rowStyle = {
        ...styles.row,
        marginBottom: selectedMode === 'SINGLE_MODE' ? 11: 10,
    };

    const playButtonStyle = {
        ...styles.playButton,
        marginTop: selectedMode === 'SINGLE_MODE' ? 62: 45,
    };

    return (
      <View style={containerStyle}>
        <Text style={styles.title}>Select game mode and settings</Text>

        {/* Game Mode */}
        <View style={styles.row}>
          {renderButton('Single Mode', () => setSelectedMode('SINGLE_MODE'), selectedMode === 'SINGLE_MODE')}
          {renderButton('Double Mode', () => setSelectedMode('DOUBLE_MODE'), selectedMode === 'DOUBLE_MODE')}
        </View>

        {/* Board Size */}
        <Text style={subtitleStyle}>Choose Board Size</Text>
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
                {[Colors.Yellow200, Colors.Red200, Colors.Blue200, Colors.Green200, Colors.Purple200].map(color => (
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
              <Text style={styles.subtitleSingle}>Player 1 - Choose Color and Shape</Text>
              <View style={styles.row}>
                {[Colors.Yellow200, Colors.Red200, Colors.Blue200, Colors.Green200, Colors.Purple200].map(color => (
                    <TouchableOpacity key={color} onPress={() => setPlayer1Color(color)}>
                      {renderColorOption(color, () => setPlayer1Color(color), player1Color === color)}
                    </TouchableOpacity>
                ))}
              </View>

              <View style={rowStyle}>
                {['X', 'O', '■', '▲', '★'].map(shape => (
                    <TouchableOpacity key={shape} onPress={() => setPlayer1Shape(shape)}>
                      {renderShapeOption(shape, () => setPlayer1Shape(shape), player1Shape === shape)}
                    </TouchableOpacity>
                ))}
              </View>

              {/* Double Mode Player 2 Settings */}
              <Text style={styles.subtitleSingle}>Player 2 - Choose Color and Shape</Text>
              <View style={styles.row}>
                {[Colors.Yellow200, Colors.Red200, Colors.Blue200, Colors.Green200, Colors.Purple200].map(color => (
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
            style={playButtonStyle}
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

export default StartScreen;
