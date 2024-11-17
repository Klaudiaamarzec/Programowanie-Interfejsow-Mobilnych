import 'package:flutter/material.dart';
import 'StartScreen.dart';
import 'ui/theme/theme.dart';

void main() {
  runApp(TicTacToeApp());
}

class TicTacToeApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: AppTheme.lightTheme,
      darkTheme: AppTheme.darkTheme,
      themeMode: ThemeMode.system,
      home: StartScreen(),
    );
  }
}
