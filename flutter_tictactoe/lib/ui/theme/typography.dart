import 'package:flutter/material.dart';

class AppTypography {
  static const TextStyle headlineLarge = TextStyle(
    fontFamily: 'Default',
    fontWeight: FontWeight.bold,
    fontSize: 32,
  );

  static const TextStyle displayMedium = TextStyle(
    fontFamily: 'Default',
    fontWeight: FontWeight.w600,
    fontSize: 24,
  );

  static const TextStyle bodyMedium = TextStyle(
    fontFamily: 'Default',
    fontWeight: FontWeight.normal,
    fontSize: 16,
  );

  static final TextTheme textTheme = TextTheme(
    headlineLarge: headlineLarge,
    titleMedium: displayMedium,
    bodyMedium: bodyMedium,
  );
}
