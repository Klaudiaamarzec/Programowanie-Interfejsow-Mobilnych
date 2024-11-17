package com.example.tictactoe

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.compose.ui.Alignment
import androidx.compose.foundation.clickable
import androidx.compose.foundation.border
import com.example.tictactoe.ui.theme.*

data class GameSettings(
    val mode: GameMode,
    val boardSize: Int = 3,
    val player1Color: Color,
    val player2Color: Color,
    val player1Shape: PlayerShape,
    val player2Shape: PlayerShape
)

enum class GameMode {
    SINGLE_MODE,
    DOUBLE_MODE
}

enum class PlayerShape(val symbol: String) {
    CROSS("X"), CIRCLE("O"), SQUARE("■"), TRIANGLE("▲"), STAR("★")
}

@Composable
fun StartScreen(onStartGame: (GameSettings) -> Unit) {

    Box(modifier = Modifier.fillMaxSize().background(MaterialTheme.colorScheme.background)) {
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(16.dp),
            verticalArrangement = Arrangement.Center,
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            // Tytuł
            Text(
                text = "Select game mode and settings",
                style = MaterialTheme.typography.headlineLarge,
                color = MaterialTheme.colorScheme.onBackground,
                modifier = Modifier.padding(bottom = 32.dp)
            )

            var selectedMode by remember { mutableStateOf(GameMode.SINGLE_MODE) }
            var selectedBoardSize by remember { mutableStateOf(3) }
            var player1Color by remember { mutableStateOf(Yellow200) }
            var player2Color by remember { mutableStateOf(Blue200) }
            var player1Shape by remember { mutableStateOf(PlayerShape.CROSS) }
            var player2Shape by remember { mutableStateOf(PlayerShape.CIRCLE) }

            // Tryb gry
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceEvenly
            ) {

                Button(
                    onClick = { selectedMode = GameMode.SINGLE_MODE },
                    colors = ButtonDefaults.buttonColors(
                        containerColor = if (selectedMode == GameMode.SINGLE_MODE) Gray else LightGray
                    )
                ) {
                    Text("Single Mode")
                }

                Button(
                    onClick = { selectedMode = GameMode.DOUBLE_MODE },
                    colors = ButtonDefaults.buttonColors(
                        containerColor = if (selectedMode == GameMode.DOUBLE_MODE) Gray else LightGray
                    )
                ) {
                    Text("Double Mode")
                }
            }

            Spacer(modifier = Modifier.height(32.dp))

            // Wybór rozmiaru planszy
            Text(text = "Choose Board Size", color = MaterialTheme.colorScheme.onBackground)
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceEvenly
            ) {
                listOf(3, 4, 5).forEach { size ->
                    Button(
                        onClick = { selectedBoardSize = size },
                        colors = ButtonDefaults.buttonColors(
                            containerColor = if (selectedBoardSize == size) Gray else LightGray
                        )
                    ) {
                        Text("${size}x$size")
                    }
                }
            }

            Spacer(modifier = Modifier.height(32.dp))

            if (selectedMode == GameMode.SINGLE_MODE) {
                // Opcje dla trybu Single Mode
                Text(text = "Choose Color and Shape", color = MaterialTheme.colorScheme.onBackground)

                // Wybór koloru dla gracza
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceEvenly
                ) {
                    listOf(Yellow200, Red200, Blue200, Green200, Purple200).forEach { color ->
                        Box(
                            modifier = Modifier
                                .size(50.dp)
                                .background(color)
                                .clickable { player1Color = color }
                                .border(2.dp, if (player1Color == color) MaterialTheme.colorScheme.onBackground else MaterialTheme.colorScheme.background)
                        )
                    }
                }

                Spacer(modifier = Modifier.height(16.dp))

                // Wybór kształtu dla gracza
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceEvenly
                ) {
                    PlayerShape.values().forEach { shape ->
                        Button(
                            onClick = { player1Shape = shape },
                            colors = ButtonDefaults.buttonColors(
                                containerColor = if (player1Shape == shape) Gray else LightGray
                            )
                        ) {
                            Text(shape.symbol)
                        }
                    }
                }

                // Ustal losowy kolor i kształt dla komputera (inne niż gracza)
                LaunchedEffect(player1Color, player1Shape) {
                    val colors = listOf(Yellow200, Red200, Blue200, Green200, Purple200) - player1Color
                    val shapes = PlayerShape.values().toList() - player1Shape
                    player2Color = colors.random()
                    player2Shape = shapes.random()
                }

            } else {
                // Opcje dla trybu Double Mode
                Text(text = "Player 1 - Choose Color and Shape", color = MaterialTheme.colorScheme.onBackground)

                // Wybór koloru i kształtu dla Player 1
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceEvenly
                ) {
                    listOf(Yellow200, Red200, Blue200, Green200, Purple200).forEach { color ->
                        Box(
                            modifier = Modifier
                                .size(50.dp)
                                .background(color)
                                .clickable {
                                    if (color != player2Color) player1Color = color
                                }
                                .border(2.dp, if (player1Color == color) MaterialTheme.colorScheme.onBackground else MaterialTheme.colorScheme.background)
                        )
                    }
                }

                Spacer(modifier = Modifier.height(16.dp))

                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceEvenly
                ) {
                    PlayerShape.values().forEach { shape ->
                        Button(
                            onClick = {
                                if (shape != player2Shape) player1Shape = shape
                            },
                            colors = ButtonDefaults.buttonColors(
                                containerColor = if (player1Shape == shape) Gray else LightGray
                            )
                        ) {
                            Text(shape.symbol)
                        }
                    }
                }

                Spacer(modifier = Modifier.height(32.dp))
                Text(text = "Player 2 - Choose Color and Shape", color = MaterialTheme.colorScheme.onBackground)

                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceEvenly
                ) {
                    listOf(Yellow200, Red200, Blue200, Green200, Purple200).forEach { color ->
                        Box(
                            modifier = Modifier
                                .size(50.dp)
                                .background(color)
                                .clickable {
                                    if (color != player1Color) player2Color = color
                                }
                                .border(2.dp, if (player2Color == color) MaterialTheme.colorScheme.onBackground else MaterialTheme.colorScheme.background)
                        )
                    }
                }

                Spacer(modifier = Modifier.height(16.dp))

                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceEvenly
                ) {
                    PlayerShape.values().forEach { shape ->
                        Button(
                            onClick = {
                                if (shape != player1Shape) player2Shape = shape
                            },
                            colors = ButtonDefaults.buttonColors(
                                containerColor = if (player2Shape == shape) Gray else LightGray
                            )
                        ) {
                            Text(shape.symbol)
                        }
                    }
                }
            }

            Spacer(modifier = Modifier.height(64.dp))

            // Przycisk PLAY
            Button(
                onClick = {
                    onStartGame(GameSettings(
                        mode = selectedMode,
                        boardSize = selectedBoardSize,
                        player1Color = player1Color,
                        player2Color = player2Color,
                        player1Shape = player1Shape,
                        player2Shape = player2Shape
                    ))
                },
                modifier = Modifier
                    .align(Alignment.CenterHorizontally)
                    .size(100.dp, 50.dp),
                colors = ButtonDefaults.buttonColors(
                    contentColor = Color.Black)
            ) {
                Text("PLAY")
            }
        }
    }
}

