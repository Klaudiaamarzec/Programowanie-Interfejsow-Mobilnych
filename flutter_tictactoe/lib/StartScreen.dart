import 'package:flutter/material.dart';
import 'ui/theme/colors.dart';
import 'ui/theme/typography.dart';
import 'GameScreen.dart';
import 'GameSettings.dart';

class StartScreen extends StatefulWidget {
  @override
  _StartScreenState createState() => _StartScreenState();
}

class _StartScreenState extends State<StartScreen> {
  GameMode selectedMode = GameMode.SINGLE_MODE;
  int selectedBoardSize = 3;
  Color player1Color = AppColors.yellow200;
  Color player2Color = AppColors.blue200;
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
      backgroundColor: Theme.of(context).colorScheme.background,
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Text(
                "Select game mode and settings",
                style: AppTypography.headlineLarge.copyWith(color: Theme.of(context).colorScheme.onBackground),
                textAlign: TextAlign.left,
              ),
              const SizedBox(height: 32),

              // Tryb gry
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  ElevatedButton(
                    onPressed: () => setState(() => selectedMode = GameMode.SINGLE_MODE),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: selectedMode == GameMode.SINGLE_MODE ? AppColors.gray : AppColors.lightGray,
                      foregroundColor: Theme.of(context).colorScheme.onPrimary,
                    ),
                    child: Text("Single Mode"),
                  ),
                  ElevatedButton(
                    onPressed: () => setState(() => selectedMode = GameMode.DOUBLE_MODE),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: selectedMode == GameMode.DOUBLE_MODE ? AppColors.gray : AppColors.lightGray,
                      foregroundColor: Theme.of(context).colorScheme.onPrimary,
                    ),
                    child: Text("Double Mode"),
                  ),
                ],
              ),

              const SizedBox(height: 32),

              // Rozmiar planszy
              Text("Choose Board Size", style: AppTypography.bodyMedium.copyWith(color: Theme.of(context).colorScheme.onBackground),),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [3, 4, 5].map((size) {
                  return ElevatedButton(
                    onPressed: () => setState(() => selectedBoardSize = size),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: selectedBoardSize == size ? AppColors.gray : AppColors.lightGray,
                      foregroundColor: Theme.of(context).colorScheme.onPrimary,
                    ),
                    child: Text("${size}x$size"),
                  );
                }).toList(),
              ),

              const SizedBox(height: 32),

              // Kolor i kształt dla trybu Single Mode
              if (selectedMode == GameMode.SINGLE_MODE) ...[
                Text("Choose Color and Shape", style: AppTypography.bodyMedium.copyWith(color: Theme.of(context).colorScheme.onBackground)),

                // Wybór koloru
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [AppColors.yellow200, AppColors.red200, AppColors.blue200, AppColors.green200, AppColors.purple200].map((color) {
                    return GestureDetector(
                      onTap: () => setState(() => player1Color = color),
                      child: Container(
                        width: 50,
                        height: 50,
                        decoration: BoxDecoration(
                          color: color,
                          border: Border.all(
                            color: player1Color == color ? Theme.of(context).colorScheme.onBackground : Theme.of(context).colorScheme.background,
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
                        backgroundColor: player1Shape == shape ? AppColors.gray : AppColors.lightGray,
                        foregroundColor: Theme.of(context).colorScheme.onPrimary,
                      ),
                      child: Text(shape.symbol),
                    );
                  }).toList(),
                ),
              ],

              if (selectedMode == GameMode.DOUBLE_MODE) ...[
                // Ustawienia dla gracza 1
                Text("Player 1 - Choose Color and Shape", style: AppTypography.bodyMedium.copyWith(color: Theme.of(context).colorScheme.onBackground)),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [AppColors.yellow200, AppColors.red200, AppColors.blue200, AppColors.green200, AppColors.purple200].map((color) {
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
                            color: player1Color == color ? Theme.of(context).colorScheme.onBackground : Theme.of(context).colorScheme.background,
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
                        backgroundColor: player1Shape == shape ? AppColors.gray : AppColors.lightGray,
                        foregroundColor: Theme.of(context).colorScheme.onPrimary,
                      ),
                      child: Text(shape.symbol),
                    );
                  }).toList(),
                ),

                const SizedBox(height: 32),

                Text("Player 2 - Choose Color and Shape", style: AppTypography.bodyMedium.copyWith(color: Theme.of(context).colorScheme.onBackground)),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [AppColors.yellow200, AppColors.red200, AppColors.blue200, AppColors.green200, AppColors.purple200].map((color) {
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
                            color: player2Color == color ? Theme.of(context).colorScheme.onBackground : Theme.of(context).colorScheme.background,
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
                        backgroundColor: player2Shape == shape ? AppColors.gray : AppColors.lightGray,
                        foregroundColor: Theme.of(context).colorScheme.onPrimary,
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
                  backgroundColor: Theme.of(context).colorScheme.primary,
                  foregroundColor: Theme.of(context).colorScheme.onPrimary,
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
