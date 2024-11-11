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
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Text(
                resultMessage,
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 28,
                  fontWeight: FontWeight.bold,
                ),
                textAlign: TextAlign.center,
              ),
              SizedBox(height: 32),
              ElevatedButton(
                onPressed: onPlayAgain,
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.blueAccent,
                  minimumSize: Size(150, 50),
                  padding: EdgeInsets.symmetric(vertical: 8.0),
                ),
                child: Text(
                  "Play again",
                  style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
              SizedBox(height: 16),
              ElevatedButton(
                onPressed: onBackToSettings,
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.redAccent,
                  minimumSize: Size(150, 50),
                  padding: EdgeInsets.symmetric(vertical: 8.0),
                ),
                child: Text(
                  "Back to settings",
                  style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
