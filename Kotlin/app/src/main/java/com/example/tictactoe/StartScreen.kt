package com.example.tictactoe

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.compose.ui.Alignment

data class GameSettings(
    val mode: GameMode,
    val boardSize: Int,
    val colors: List<String>
)

enum class GameMode {
    SINGLE_MODE,
    DOUBLE_MODE
}

@Composable
fun StartScreen(onStartGame: (GameSettings) -> Unit) {

    Box(modifier = Modifier.fillMaxSize().background(Color.Black)) {
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(16.dp),
            verticalArrangement = Arrangement.Center,
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            // Tytuł
            Text(
                text = "Wybierz tryb gry",
                style = MaterialTheme.typography.headlineLarge,
                color = Color.White,
                modifier = Modifier.padding(bottom = 32.dp)
            )

            var selectedMode by remember { mutableStateOf(GameMode.SINGLE_MODE) }

            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceEvenly
            ) {

                Button(
                    onClick = { selectedMode = GameMode.SINGLE_MODE },
                    colors = ButtonDefaults.buttonColors(
                        containerColor = if (selectedMode == GameMode.SINGLE_MODE) Color.Gray else Color.LightGray
                    )
                ) {
                    Text("Single Mode")
                }

                Button(
                    onClick = { selectedMode = GameMode.DOUBLE_MODE },
                    colors = ButtonDefaults.buttonColors(
                        containerColor = if (selectedMode == GameMode.DOUBLE_MODE) Color.Gray else Color.LightGray
                    )
                ) {
                    Text("Double Mode")
                }
            }

            Text(
                text = "Grę rozpoczyna gracz X",
                style = MaterialTheme.typography.bodyLarge,
                color = Color.White,
                modifier = Modifier.padding(top = 64.dp)
            )

            Spacer(modifier = Modifier.height(64.dp))

            // Przycisk PLAY
            Button(
                onClick = {
                    onStartGame(GameSettings(selectedMode, 3, listOf("yellow", "blue")))
                },
                modifier = Modifier
                    .align(Alignment.CenterHorizontally)
                    .size(100.dp, 50.dp)
            ) {
                Text("PLAY")
            }
        }
    }
}

