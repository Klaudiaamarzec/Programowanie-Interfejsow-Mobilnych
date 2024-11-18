import React, { createContext, useContext } from 'react';
import { useColorScheme } from 'react-native';
import { Colors } from "./Color";

const LightColors = {
    backgroundColor: Colors.BackgroundColorLightMode,
    text: Colors.TextColor,
    textColor: Colors.TextColorButton,
};

const DarkColors = {
    backgroundColor: Colors.BackgroundColorDarkMode,
    text: Colors.TextColorButton,
    textColor: Colors.TextColor,
};

const ThemeContext = createContext(LightColors);

export const ThemeProvider = ({ children }) => {
    const colorScheme = useColorScheme();
    const colors = colorScheme === 'dark' ? DarkColors : LightColors;

    return (
        <ThemeContext.Provider value={colors}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    return useContext(ThemeContext);
};
