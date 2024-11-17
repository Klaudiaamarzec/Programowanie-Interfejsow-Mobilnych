import 'package:flutter/material.dart';
import 'colors.dart';
import 'typography.dart';

class AppTheme {
  static ThemeData lightTheme = ThemeData(
    colorScheme: ColorScheme.light(
      primary: AppColors.yellow200,
      onPrimary: AppColors.textColorLightMode,
      background: AppColors.backgroundColorLightMode,
      onBackground: AppColors.textColorLightMode,
    ),
    textTheme: AppTypography.textTheme,
  );

  static ThemeData darkTheme = ThemeData(
    colorScheme: ColorScheme.dark(
      primary: AppColors.yellow200,
      onPrimary: AppColors.textColorLightMode,
      background: AppColors.backgroundColorDarkMode,
      onBackground: AppColors.textColorDarkMode,
    ),
    textTheme: AppTypography.textTheme,
  );

  static ThemeData getTheme(bool isDarkMode) {
    return isDarkMode ? darkTheme : lightTheme;
  }
}
