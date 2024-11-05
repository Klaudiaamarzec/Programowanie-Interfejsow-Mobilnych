package com.example.tictactoe

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

@Composable
fun GameScreen(onBack: () -> Unit, gameSettings: GameSettings) {
    var currentPlayer by remember { mutableStateOf(Player.X) }
    var board by remember {
        mutableStateOf(
            List(gameSettings.boardSize) { MutableList(gameSettings.boardSize) { Player.NONE } }
        )
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color.Black),
        verticalArrangement = Arrangement.SpaceBetween,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {

        Box(
            modifier = Modifier.weight(1f),
            contentAlignment = Alignment.Center
        ) {
            Column {
                for (i in 0 until gameSettings.boardSize) {
                    Row {
                        for (j in 0 until gameSettings.boardSize) {
                            val cellState = board[i][j]
                            Box(
                                modifier = Modifier
                                    .size(80.dp)
                                    .border(2.dp, Color.Yellow)
                                    .clickable {
                                        if (cellState == Player.NONE) {
                                            val newBoard = board.toMutableList()
                                            newBoard[i] = newBoard[i].toMutableList()
                                            newBoard[i][j] = currentPlayer
                                            board = newBoard
                                            currentPlayer = if (currentPlayer == Player.X) Player.O else Player.X
                                        }
                                    },
                                contentAlignment = Alignment.Center
                            ) {
                                Text(
                                    text = cellState.symbol,
                                    style = MaterialTheme.typography.displayMedium,
                                    color = Color.Yellow
                                )
                            }
                        }
                    }
                }
            }
        }

        Button(
            onClick = onBack,
            modifier = Modifier
                .padding(32.dp)
        ) {
            Text("Powrót do ustawień")
        }
    }
}


enum class Player(val symbol: String) {
    X("X"), O("O"), NONE("")
}
