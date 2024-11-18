import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeProvider, useTheme } from './ui.theme/Theme';
import StartScreen from './screens/StartScreen';
import GameScreen from './screens/GameScreen';
import ResultScreen from './screens/ResultScreen';

const Stack = createNativeStackNavigator();

function AppContent() {

  return (
      <NavigationContainer>
          <Stack.Navigator
              initialRouteName="Start"
              screenOptions={{
                  headerShown: false,
              }}
          >
              <Stack.Screen name="Start" component={StartScreen} />
              <Stack.Screen name="Game" component={GameScreen} />
              <Stack.Screen name="Result" component={ResultScreen} />
          </Stack.Navigator>
      </NavigationContainer>
  );
}

export default function App() {
    return (
        <ThemeProvider>
            <AppContent />
        </ThemeProvider>
    );
}
