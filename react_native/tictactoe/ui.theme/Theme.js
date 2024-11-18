import React, { createContext, useContext } from 'react';
import { useColorScheme } from 'react-native';
import { Colors } from "./Color";

const LightColors = {
    // primary: Colors.Yellow200,
    // onPrimary: Colors.TextColor,
    // background: Colors.BackgroundColorLightMode,
    // onBackground: Colors.TextColor
    backgroundColor: Colors.BackgroundColorLightMode,
    text: Colors.TextColor,
    textColor: Colors.TextColorButton,
};

const DarkColors = {
    // primary: Colors.Yellow200,
    // onPrimary: Colors.TextColor,
    // background: Colors.BackgroundColorDarkMode,
    // onBackground: Colors.TextColor
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

// Hook do uzyskiwania dostępu do motywu
export const useTheme = () => {
    return useContext(ThemeContext);
};
