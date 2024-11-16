package com.example.tictactoe

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.runtime.Composable
import androidx.compose.ui.tooling.preview.Preview
import com.example.tictactoe.ui.theme.TicTacToeTheme

class MainActivity : ComponentActivity() {
    private var currentScreen: @Composable () -> Unit = { StartScreen { startGame(it) } }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            TicTacToeTheme {
                currentScreen()
            }
        }
    }

    private fun startGame(gameSettings: GameSettings) {
        currentScreen = {
            TicTacToeTheme {
                GameScreen(
                    gameSettings = gameSettings,
                    onBack = { resetGame() },
                    onGameEnd = { resultMessage -> showResult(resultMessage, gameSettings) }
                )
            }
        }
        setContent {
            TicTacToeTheme {
                currentScreen()
            }
        }
    }

    private fun showResult(resultMessage: String, gameSettings: GameSettings) {
        currentScreen = {
            TicTacToeTheme {
                ResultScreen(
                    resultMessage = resultMessage,
                    onPlayAgain = { startGame(gameSettings) },
                    onBackToSettings = { resetGame() }
                )
            }
        }
        setContent {
            TicTacToeTheme {
                currentScreen()
            }
        }
    }

    private fun resetGame() {
        currentScreen = {
            TicTacToeTheme {
                StartScreen { startGame(it) }
            }
        }
        setContent {
            TicTacToeTheme {
                currentScreen()
            }
        }
    }

    @Preview(showBackground = true)
    @Composable
    fun PreviewStartScreen() {
        TicTacToeTheme {
            StartScreen { startGame(it) }
        }
    }
}
