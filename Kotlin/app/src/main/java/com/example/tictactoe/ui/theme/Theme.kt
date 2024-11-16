package com.example.tictactoe.ui.theme

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.runtime.Composable
import androidx.compose.material3.*

private val LightColors = lightColorScheme(
    primary = Yellow200,
    onPrimary = BackgroundColor,
    background = BackgroundColor,
    onBackground = TextColor
)

private val DarkColors = darkColorScheme(
    primary = Yellow200,
    onPrimary = BackgroundColor,
    background = BackgroundColor,
    onBackground = TextColor
)

@Composable
fun TicTacToeTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    content: @Composable () -> Unit
) {
    val colors = if (darkTheme) DarkColors else LightColors
    MaterialTheme(
        colorScheme = colors,
        typography = Typography,
        content = content
    )
}
