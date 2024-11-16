import 'package:flutter/material.dart';
import 'GameSettings.dart';
import 'ResultScreen.dart';
import 'ui/theme/colors.dart';

enum Player { X, O, NONE }

class GameScreen extends StatefulWidget {
  final GameSettings gameSettings;

  GameScreen({
    required this.gameSettings,
  });

  @override
  _GameScreenState createState() => _GameScreenState();
}

class _GameScreenState extends State<GameScreen> {
  late List<List<Player>> board;
  late Player currentPlayer;
  late String player1Shape;
  late String player2Shape;
  late Color player1Color;
  late Color player2Color;

  @override
  void initState() {
    super.initState();
    currentPlayer = Player.X;
    board = List.generate(
      widget.gameSettings.boardSize,
          (_) => List.generate(widget.gameSettings.boardSize, (_) => Player.NONE),
    );
    player1Shape = widget.gameSettings.player1Shape.symbol;
    player2Shape = widget.gameSettings.player2Shape.symbol;
    player1Color = widget.gameSettings.player1Color;
    player2Color = widget.gameSettings.player2Color;
  }

  Player? checkWinner() {
    int size = widget.gameSettings.boardSize;

    for (int i = 0; i < size; i++) {
      if (board[i].every((e) => e == Player.X)) return Player.X;
      if (board[i].every((e) => e == Player.O)) return Player.O;
    }

    for (int j = 0; j < size; j++) {
      if (board.every((row) => row[j] == Player.X)) return Player.X;
      if (board.every((row) => row[j] == Player.O)) return Player.O;
    }

    if (List.generate(size, (i) => board[i][i]).every((e) => e == Player.X)) return Player.X;
    if (List.generate(size, (i) => board[i][i]).every((e) => e == Player.O)) return Player.O;

    if (List.generate(size, (i) => board[i][size - 1 - i]).every((e) => e == Player.X)) return Player.X;
    if (List.generate(size, (i) => board[i][size - 1 - i]).every((e) => e == Player.O)) return Player.O;

    if (board.every((row) => row.every((cell) => cell != Player.NONE))) return Player.NONE;
    return null;
  }

  void makeComputerMove() {
    List<List<int>> emptyCells = [];
    for (int i = 0; i < widget.gameSettings.boardSize; i++) {
      for (int j = 0; j < widget.gameSettings.boardSize; j++) {
        if (board[i][j] == Player.NONE) emptyCells.add([i, j]);
      }
    }
    if (emptyCells.isNotEmpty) {
      final move = emptyCells..shuffle();
      setState(() {
        board[move[0][0]][move[0][1]] = Player.O;
      });
    }
  }

  void onCellClick(int i, int j) {
    if (board[i][j] == Player.NONE) {
      setState(() {
        board[i][j] = currentPlayer;
        final winner = checkWinner();
        if (winner != null) {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => ResultScreen(
                resultMessage: winner == Player.NONE
                    ? "It's a tie!"
                    : "The winner is: ${winner == Player.X ? player1Shape : player2Shape}",
                onPlayAgain: () {
                  Navigator.pop(context); // Powrót do gry
                  setState(() {
                    board = List.generate(widget.gameSettings.boardSize, (_) => List.generate(widget.gameSettings.boardSize, (_) => Player.NONE));
                    currentPlayer = Player.X;
                  });
                },
                onBackToSettings: () {
                  Navigator.pop(context); // Powrót do ekranu ustawień
                  Navigator.pop(context);
                },
              ),
            ),
          );
        } else {
          currentPlayer = currentPlayer == Player.X ? Player.O : Player.X;
          if (widget.gameSettings.mode == GameMode.SINGLE_MODE && currentPlayer == Player.O) {
            makeComputerMove();
            final winnerAfterComputerMove = checkWinner();
            if (winnerAfterComputerMove != null) {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => ResultScreen(
                    resultMessage: winnerAfterComputerMove == Player.NONE
                        ? "It's a tie!"
                        : "The winner is: ${winnerAfterComputerMove == Player.X ? player1Shape : player2Shape}",
                    onPlayAgain: () {
                      Navigator.pop(context); // Powrót do gry
                      setState(() {
                        board = List.generate(widget.gameSettings.boardSize, (_) => List.generate(widget.gameSettings.boardSize, (_) => Player.NONE));
                        currentPlayer = Player.X;
                      });
                    },
                    onBackToSettings: () {
                      Navigator.pop(context); // Powrót do ekranu ustawień
                      Navigator.pop(context);
                    },
                  ),
                ),
              );
            } else {
              currentPlayer = Player.X;
            }
          }
        }
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.backgroundColor,
      body: Padding(
        padding: const EdgeInsets.symmetric(vertical: 16.0),
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              for (int i = 0; i < widget.gameSettings.boardSize; i++)
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    for (int j = 0; j < widget.gameSettings.boardSize; j++)
                      GestureDetector(
                        onTap: () => onCellClick(i, j),
                        child: Container(
                          width: 80,
                          height: 80,
                          decoration: BoxDecoration(
                            color: AppColors.backgroundColor,
                            border: Border.all(color: AppColors.borderColor),
                          ),
                          child: Center(
                            child: Text(
                              board[i][j] == Player.X
                                  ? player1Shape
                                  : board[i][j] == Player.O
                                  ? player2Shape
                                  : '',
                              style: TextStyle(
                                fontSize: 24,
                                color: board[i][j] == Player.X
                                    ? player1Color
                                    : board[i][j] == Player.O
                                    ? player2Color
                                    : Colors.transparent,
                              ),
                            ),
                          ),
                        ),
                      ),
                  ],
                ),
            ],
          ),
        ),
      ),
    );
  }
}
