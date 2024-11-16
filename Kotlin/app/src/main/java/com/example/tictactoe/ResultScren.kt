package com.example.tictactoe

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.example.tictactoe.ui.theme.*

@Composable
fun ResultScreen(
    resultMessage: String,
    onPlayAgain: () -> Unit,
    onBackToSettings: () -> Unit
) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(BackgroundColor)
            .padding(16.dp),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text(
            text = resultMessage,
            style = MaterialTheme.typography.headlineLarge,
            color = TextColor,
            modifier = Modifier.padding(bottom = 32.dp)
        )

        Button(
            onClick = onPlayAgain,
            modifier = Modifier
                .padding(16.dp)
                .size(150.dp, 50.dp)
        ) {
            Text("Play again")
        }

        Button(
            onClick = onBackToSettings,
            modifier = Modifier
                .padding(16.dp)
                .size(150.dp, 50.dp)
        ) {
            Text("Back to settings")
        }
    }
}
