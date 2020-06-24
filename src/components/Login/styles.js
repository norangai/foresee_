import { StyleSheet } from "react-native";
import { ScreenWidth, ScreenHeight, FontScale } from "../../../constant/Constant";

export const styles = StyleSheet.create({
    loginFieldsTextInput: {
        height: 40,
        width: '80%',
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 30,
    },
    content: {
        marginTop: ScreenHeight * 0.15,
        marginHorizontal: ScreenWidth * 0.15,
    },
    registrationNav: {
        flexDirection: "row",
        marginTop: ScreenHeight * 0.02,
        alignSelf: 'center'
    },
    registrationNavText: {
        fontSize: FontScale * 18,
        fontFamily: 'Roboto',
        color: '#24559E'
    }

});

