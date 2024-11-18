import { StyleSheet } from 'react-native';
import Colors from "./Color";
import { useTheme } from './Theme';

const Styles = () => {

    //const { background, text } = useTheme();
    const { backgroundColor, text, textColor } = useTheme();

    //const backgroundColor = scheme === 'dark' ? Colors.BackgroundColorDarkMode : Colors.BackgroundColorLightMode;
    //const text = scheme === 'dark' ? Colors.TextColorButton : Colors.TextColor;
    //const textColor = scheme === 'dark' ? Colors.TextColor : Colors.TextColorButton;

    return StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingTop: 120,
            backgroundColor: backgroundColor,
        },
        gameContainer: {
            flex: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: backgroundColor,
            marginTop: -135,
        },
        board: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        },
        resultContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: backgroundColor,
            padding: 16,
            marginTop: -50
        },
        title: {
            fontSize: 33,
            fontWeight: 'bold',
            alignSelf: 'flex-start',
            marginLeft: 20,
            marginBottom: 32,
            color: textColor,
        },
        subtitle: {
            fontSize: 15,
            marginBottom: 9,
            marginTop: 25,
            color: textColor,
        },
        subtitleSingle: {
            fontSize: 15,
            marginBottom: 0,
            marginTop: 25,
            color: textColor,
        },
        row: {
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginBottom: 11,
        },
        boardRow: {
            flexDirection: 'row',
        },
        button: {
            paddingHorizontal: 25,
            borderRadius: 30,
            width: 133,
            height: 39,
            backgroundColor: Colors.LightGray,
            marginHorizontal: 8,
            justifyContent: 'center',
            alignItems: 'center',
        },
        resultButton: {
            backgroundColor: Colors.BorderColor,
            width: '150',
            height: 48,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 30,
            marginBottom: 32,
        },
        selectedButton: {
            backgroundColor: Colors.Gray,
        },
        buttonText: {
            fontSize: 14,
            color: text,
        },
        resultText: {
            fontSize: 32,
            fontWeight: 'bold',
            color: textColor,
            marginBottom: 40,
        },
        sizeButton: {
            paddingVertical: 8,
            paddingHorizontal: 26,
            marginLeft: 10,
            height: 37,
            borderRadius: 30,
            backgroundColor: Colors.LightGray,
        },
        sizeButtonText: {
            fontSize: 14,
            color: text,
        },
        colorOption: {
            width: 45,
            height: 45,
            borderRadius: 0,
            margin: 8,
        },
        selectedColorOption: {
            borderWidth: 2,
            borderColor: textColor,
        },
        shapeButton: {
            paddingTop: 7,
            paddingBottom: 10,
            paddingHorizontal: 22,
            width: 55,
            backgroundColor: Colors.LightGray,
            borderRadius: 30,
            marginTop: 3,
            marginRight: 5,
        },
        playButton: {
            backgroundColor: Colors.BorderColor,
            width: 100,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 30,
            marginTop: 62,
        },
        playButtonText: {
            color: Colors.TextColorButton,
            fontSize: 14,
            fontWeight: 'normal',
        },
        backButton: {
            backgroundColor: Colors.BorderColor,
            width: '150',
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 30,
            marginBottom: 35,
        },
        cell: {
            width: 80,
            height: 80,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 2,
            borderColor: Colors.BorderColor,
        },
        cellText: {
            fontSize: 25,
            fontWeight: 'bold',
        },
    })
};

export default Styles;
