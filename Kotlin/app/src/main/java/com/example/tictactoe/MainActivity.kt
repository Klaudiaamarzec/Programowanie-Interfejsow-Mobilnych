package com.example.tictactoe

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.runtime.Composable
import androidx.compose.ui.tooling.preview.Preview

class MainActivity : ComponentActivity() {
    private var currentScreen: @Composable () -> Unit = { StartScreen { startGame(it) } }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent { currentScreen() }
    }

    private fun startGame(gameSettings: GameSettings) {
        currentScreen = { GameScreen(gameSettings = gameSettings, onBack = { resetGame() }) }
        setContent { currentScreen() }
    }

    private fun resetGame() {
        currentScreen = { StartScreen { startGame(it) } }
        setContent { currentScreen() }
    }

    @Preview(showBackground = true)
    @Composable
    fun PreviewStartScreen() {
        StartScreen { startGame(it) }
    }
}
