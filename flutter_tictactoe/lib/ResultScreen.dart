import 'package:flutter/material.dart';
import 'ui/theme/typography.dart';

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
      backgroundColor: Theme.of(context).colorScheme.background,
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Text(
                resultMessage,
                style: AppTypography.headlineLarge.copyWith(color: Theme.of(context).colorScheme.onBackground),
                textAlign: TextAlign.center,
              ),
              SizedBox(height: 32),
              ElevatedButton(
                onPressed: onPlayAgain,
                style: ElevatedButton.styleFrom(
                  backgroundColor: Theme.of(context).colorScheme.primary,
                  minimumSize: Size(150, 50),
                  padding: EdgeInsets.symmetric(vertical: 8.0),
                ),
                child: Text(
                  "Play again",
                  style: AppTypography.bodyMedium.copyWith(color: Colors.black)
                ),
              ),
              SizedBox(height: 32),
              ElevatedButton(
                onPressed: onBackToSettings,
                style: ElevatedButton.styleFrom(
                  backgroundColor: Theme.of(context).colorScheme.primary,
                  minimumSize: Size(150, 50),
                  padding: EdgeInsets.symmetric(vertical: 8.0),
                ),
                child: Text(
                  "Back to settings",
                    style: AppTypography.bodyMedium.copyWith(color: Colors.black)
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
