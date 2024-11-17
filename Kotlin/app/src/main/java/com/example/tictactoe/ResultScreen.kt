package com.example.tictactoe

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

@Composable
fun ResultScreen(
    resultMessage: String,
    onPlayAgain: () -> Unit,
    onBackToSettings: () -> Unit
) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(MaterialTheme.colorScheme.background)
            .padding(16.dp),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text(
            text = resultMessage,
            style = MaterialTheme.typography.headlineLarge,
            color = MaterialTheme.colorScheme.onBackground,
            modifier = Modifier.padding(bottom = 32.dp)
        )

        Button(
            onClick = onPlayAgain,
            modifier = Modifier
                .padding(16.dp)
                .size(150.dp, 50.dp),
            colors = ButtonDefaults.buttonColors(
                contentColor = Color.Black)
        ) {
            Text("Play again")
        }

        Button(
            onClick = onBackToSettings,
            modifier = Modifier
                .padding(16.dp)
                .size(150.dp, 50.dp),
            colors = ButtonDefaults.buttonColors(
                contentColor = Color.Black)
        ) {
            Text("Back to settings")
        }
    }
}
