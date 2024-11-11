import 'dart:ui';

enum GameMode { SINGLE_MODE, DOUBLE_MODE }
enum Player { X, O, NONE }

class GameSettings {
  final GameMode mode;
  final int boardSize;
  final Color player1Color;
  final Color player2Color;
  final PlayerShape player1Shape;
  final PlayerShape player2Shape;

  GameSettings(
      {required this.mode,
        required this.boardSize,
        required this.player1Color,
        required this.player2Color,
        required this.player1Shape,
        required this.player2Shape});
}

enum PlayerShape {
  CROSS('X'),
  CIRCLE('O'),
  SQUARE('□'),
  TRIANGLE('△'),
  STAR('★');

  final String symbol;

  const PlayerShape(this.symbol);
}
