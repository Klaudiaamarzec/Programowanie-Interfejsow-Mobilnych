import 'package:flutter/material.dart';

import 'GameScreen.dart';
import 'GameSettings.dart';

class StartScreen extends StatefulWidget {
  @override
  _StartScreenState createState() => _StartScreenState();
}

class _StartScreenState extends State<StartScreen> {
  GameMode selectedMode = GameMode.SINGLE_MODE;
  int selectedBoardSize = 3;
  Color player1Color = Colors.yellow;
  Color player2Color = Colors.blue;
  PlayerShape player1Shape = PlayerShape.CROSS;
  PlayerShape player2Shape = PlayerShape.CIRCLE;

  void startGame() {
    // Losujemy ustawienia dla gracza komputera w trybie Single Mode
    if (selectedMode == GameMode.SINGLE_MODE) {
      player2Color = Colors.primaries.where((color) => color != player1Color).first;
      player2Shape = PlayerShape.values.where((shape) => shape != player1Shape).first;
    }

    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => GameScreen(
          gameSettings: GameSettings(
            mode: selectedMode,
            boardSize: selectedBoardSize,
            player1Color: player1Color,
            player2Color: player2Color,
            player1Shape: player1Shape,
            player2Shape: player2Shape,
          ),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text("Select game mode and settings",
                style: TextStyle(color: Colors.white, fontSize: 24)),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                ElevatedButton(
                  onPressed: () => setState(() => selectedMode = GameMode.SINGLE_MODE),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: selectedMode == GameMode.SINGLE_MODE ? Colors.grey : Colors.blue,
                  ),
                  child: Text("Single Mode"),
                ),
                ElevatedButton(
                  onPressed: () => setState(() => selectedMode = GameMode.DOUBLE_MODE),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: selectedMode == GameMode.DOUBLE_MODE ? Colors.grey : Colors.blue,
                  ),
                  child: Text("Double Mode"),
                ),
              ],
            ),
            ElevatedButton(
              onPressed: startGame,
              child: Text("PLAY"),
            ),
          ],
        ),
      ),
    );
  }
}
