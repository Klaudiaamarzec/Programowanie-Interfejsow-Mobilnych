import 'package:flutter/material.dart';
import 'colors.dart';
import 'typography.dart';

class AppTheme {
  static ThemeData lightTheme = ThemeData(
    colorScheme: ColorScheme.light(
      primary: AppColors.yellow200,
      onPrimary: AppColors.backgroundColor,
      background: AppColors.backgroundColor,
      onBackground: AppColors.textColor,
    ),
    textTheme: AppTypography.textTheme,
  );

  static ThemeData darkTheme = ThemeData(
    colorScheme: ColorScheme.dark(
      primary: AppColors.yellow200,
      onPrimary: AppColors.backgroundColor,
      background: AppColors.backgroundColor,
      onBackground: AppColors.textColor,
    ),
    textTheme: AppTypography.textTheme,
  );

  static ThemeData getTheme(bool isDarkMode) {
    return isDarkMode ? darkTheme : lightTheme;
  }
}
