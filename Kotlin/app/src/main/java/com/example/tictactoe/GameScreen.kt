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
import kotlin.random.Random

@Composable
fun GameScreen(onBack: () -> Unit, onGameEnd: (String) -> Unit, gameSettings: GameSettings) {
    var currentPlayer by remember { mutableStateOf(Player.X) }
    var board by remember {
        mutableStateOf(
            List(gameSettings.boardSize) { MutableList(gameSettings.boardSize) { Player.NONE } }
        )
    }
    var winner by remember { mutableStateOf<Player?>(null) }

    val player1Color = gameSettings.player1Color
    val player2Color = gameSettings.player2Color
    val player1Shape = gameSettings.player1Shape.symbol
    val player2Shape = gameSettings.player2Shape.symbol

    fun getPlayerSymbolAndColor(player: Player): Pair<String, Color> {
        return when (player) {
            Player.X -> player1Shape to player1Color
            Player.O -> player2Shape to player2Color
            Player.NONE -> "" to Color.Transparent
        }
    }

    fun checkWinner(): Player? {
        for (i in 0 until gameSettings.boardSize) {
            if ((board[i].all { it == Player.X }) || (board.map { it[i] }.all { it == Player.X })) return Player.X
            if ((board[i].all { it == Player.O }) || (board.map { it[i] }.all { it == Player.O })) return Player.O
        }
        if ((0 until gameSettings.boardSize).all { board[it][it] == Player.X }) return Player.X
        if ((0 until gameSettings.boardSize).all { board[it][it] == Player.O }) return Player.O
        if ((0 until gameSettings.boardSize).all { board[it][gameSettings.boardSize - it - 1] == Player.X }) return Player.X
        if ((0 until gameSettings.boardSize).all { board[it][gameSettings.boardSize - it - 1] == Player.O }) return Player.O
        return if (board.flatten().all { it != Player.NONE }) Player.NONE else null
    }

    fun makeComputerMove() {
        val emptyCells = board.flatMapIndexed { i, row -> row.mapIndexed { j, cell -> i to j }.filter { board[it.first][it.second] == Player.NONE } }
        if (emptyCells.isNotEmpty()) {
            val (i, j) = emptyCells.random()
            board = board.toMutableList().apply {
                this[i] = this[i].toMutableList().apply { this[j] = Player.O }
            }
            currentPlayer = Player.X
        }
    }

    fun onCellClick(i: Int, j: Int) {
        if (board[i][j] == Player.NONE && winner == null) {
            board = board.toMutableList().apply {
                this[i] = this[i].toMutableList().apply { this[j] = currentPlayer }
            }
            winner = checkWinner()
            if (winner == null) {
                currentPlayer = if (currentPlayer == Player.X) Player.O else Player.X
                if (gameSettings.mode == GameMode.SINGLE_MODE && currentPlayer == Player.O) {
                    makeComputerMove()
                    winner = checkWinner()
                }
            }
        }
    }

    // Wywołanie efektu po zmianie zwycięzcy
    LaunchedEffect(winner) {
        if (winner != null) {
            kotlinx.coroutines.delay(100)
            onGameEnd(
                if (winner == Player.NONE) {
                    "It's a tie!"
                } else {
                    val winnerShape = if (winner == Player.X) player1Shape else player2Shape
                    "The winner is: $winnerShape"
                }
            )
        }
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
                            val (symbol, color) = getPlayerSymbolAndColor(cellState)
                            Box(
                                modifier = Modifier
                                    .size(80.dp)
                                    .border(2.dp, Color.Yellow)
                                    .clickable { onCellClick(i, j) },
                                contentAlignment = Alignment.Center
                            ) {
                                Text(
                                    text = symbol,
                                    style = MaterialTheme.typography.displayMedium,
                                    color = color
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
            Text("Back to settings")
        }
    }
}



enum class Player(val symbol: String) {
    X("X"), O("O"), NONE("")
}
