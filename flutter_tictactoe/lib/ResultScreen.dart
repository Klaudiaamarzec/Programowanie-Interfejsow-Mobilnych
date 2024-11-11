import 'package:flutter/material.dart';

class ResultScreen extends StatelessWidget {
  final String resultMessage;
  final VoidCallback onPlayAgain;
  final VoidCallback onBackToSettings;

  ResultScreen({
    required this.resultMessage,
    required this.onPlayAgain,
    required this.onBackToSettings,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              resultMessage,
              style: TextStyle(color: Colors.white, fontSize: 24),
              textAlign: TextAlign.center,
            ),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: onPlayAgain,
              child: Text("Play again"),
            ),
            SizedBox(height: 10),
            ElevatedButton(
              onPressed: onBackToSettings,
              child: Text("Back to settings"),
            ),
          ],
        ),
      ),
    );
  }
}
