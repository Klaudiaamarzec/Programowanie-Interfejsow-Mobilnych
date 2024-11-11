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
    // Losowe ustawienia dla komputera w trybie Single Mode
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
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Text(
                "Select game mode and settings",
                style: TextStyle(color: Colors.white, fontSize: 24),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 32),

              // Tryb gry
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  ElevatedButton(
                    onPressed: () => setState(() => selectedMode = GameMode.SINGLE_MODE),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: selectedMode == GameMode.SINGLE_MODE ? Colors.grey : Colors.lightBlue,
                    ),
                    child: Text("Single Mode"),
                  ),
                  ElevatedButton(
                    onPressed: () => setState(() => selectedMode = GameMode.DOUBLE_MODE),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: selectedMode == GameMode.DOUBLE_MODE ? Colors.grey : Colors.lightBlue,
                    ),
                    child: Text("Double Mode"),
                  ),
                ],
              ),

              const SizedBox(height: 32),

              // Rozmiar planszy
              Text("Choose Board Size", style: TextStyle(color: Colors.white)),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [3, 4, 5].map((size) {
                  return ElevatedButton(
                    onPressed: () => setState(() => selectedBoardSize = size),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: selectedBoardSize == size ? Colors.grey : Colors.lightBlue,
                    ),
                    child: Text("${size}x$size"),
                  );
                }).toList(),
              ),

              const SizedBox(height: 32),

              // Kolor i kształt dla trybu Single Mode
              if (selectedMode == GameMode.SINGLE_MODE) ...[
                Text("Choose Your Color and Shape", style: TextStyle(color: Colors.white)),

                // Wybór koloru
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [Colors.yellow, Colors.red, Colors.blue, Colors.green, Colors.purple].map((color) {
                    return GestureDetector(
                      onTap: () => setState(() => player1Color = color),
                      child: Container(
                        width: 50,
                        height: 50,
                        decoration: BoxDecoration(
                          color: color,
                          border: Border.all(
                            color: player1Color == color ? Colors.white : Colors.black,
                            width: 2,
                          ),
                        ),
                      ),
                    );
                  }).toList(),
                ),

                const SizedBox(height: 16),

                // Wybór kształtu
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: PlayerShape.values.map((shape) {
                    return ElevatedButton(
                      onPressed: () => setState(() => player1Shape = shape),
                      style: ElevatedButton.styleFrom(
                        backgroundColor: player1Shape == shape ? Colors.grey : Colors.lightBlue,
                      ),
                      child: Text(shape.symbol),
                    );
                  }).toList(),
                ),
              ],

              if (selectedMode == GameMode.DOUBLE_MODE) ...[
                // Ustawienia dla gracza 1
                Text("Player 1: Choose Your Color and Shape", style: TextStyle(color: Colors.white)),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [Colors.yellow, Colors.red, Colors.blue, Colors.green, Colors.purple].map((color) {
                    return GestureDetector(
                      onTap: () => setState(() {
                        if (color != player2Color) player1Color = color;
                      }),
                      child: Container(
                        width: 50,
                        height: 50,
                        decoration: BoxDecoration(
                          color: color,
                          border: Border.all(
                            color: player1Color == color ? Colors.white : Colors.black,
                            width: 2,
                          ),
                        ),
                      ),
                    );
                  }).toList(),
                ),

                const SizedBox(height: 16),

                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: PlayerShape.values.map((shape) {
                    return ElevatedButton(
                      onPressed: () => setState(() {
                        if (shape != player2Shape) player1Shape = shape;
                      }),
                      style: ElevatedButton.styleFrom(
                        backgroundColor: player1Shape == shape ? Colors.grey : Colors.lightBlue,
                      ),
                      child: Text(shape.symbol),
                    );
                  }).toList(),
                ),

                const SizedBox(height: 32),

                Text("Player 2: Choose Your Color and Shape", style: TextStyle(color: Colors.white)),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [Colors.yellow, Colors.red, Colors.blue, Colors.green, Colors.purple].map((color) {
                    return GestureDetector(
                      onTap: () => setState(() {
                        if (color != player1Color) player2Color = color;
                      }),
                      child: Container(
                        width: 50,
                        height: 50,
                        decoration: BoxDecoration(
                          color: color,
                          border: Border.all(
                            color: player2Color == color ? Colors.white : Colors.black,
                            width: 2,
                          ),
                        ),
                      ),
                    );
                  }).toList(),
                ),

                const SizedBox(height: 16),

                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: PlayerShape.values.map((shape) {
                    return ElevatedButton(
                      onPressed: () => setState(() {
                        if (shape != player1Shape) player2Shape = shape;
                      }),
                      style: ElevatedButton.styleFrom(
                        backgroundColor: player2Shape == shape ? Colors.grey : Colors.lightBlue,
                      ),
                      child: Text(shape.symbol),
                    );
                  }).toList(),
                ),
              ],

              const SizedBox(height: 32),

              // Przycisk PLAY
              ElevatedButton(
                onPressed: startGame,
                style: ElevatedButton.styleFrom(
                  minimumSize: Size(100, 50),
                ),
                child: Text("PLAY"),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
