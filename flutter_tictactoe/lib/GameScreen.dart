import 'package:flutter/material.dart';
import 'GameSettings.dart';
import 'ResultScreen.dart';

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
        }
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Tic Tac Toe')),
      body: Column(
        children: [
          Expanded(
            child: Column(
              children: List.generate(
                widget.gameSettings.boardSize,
                    (i) => Row(
                  children: List.generate(
                    widget.gameSettings.boardSize,
                        (j) => GestureDetector(
                      onTap: () => onCellClick(i, j),
                      child: Container(
                        width: 50,
                        height: 50,
                        margin: EdgeInsets.all(4),
                        decoration: BoxDecoration(
                          border: Border.all(color: Colors.yellow),
                          color: Colors.black,
                        ),
                        child: Center(
                          child: Text(
                            board[i][j] == Player.X ? player1Shape : board[i][j] == Player.O ? player2Shape : '',
                            style: TextStyle(
                              fontSize: 24,
                              color: board[i][j] == Player.X ? player1Color : board[i][j] == Player.O ? player2Color : Colors.transparent,
                            ),
                          ),
                        ),
                      ),
                    ),
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
