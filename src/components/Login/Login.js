import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {LoginWithEmailAndPassword} from "./LoginWithEmailAndPassword";
import {LoginWithPhone} from "./LoginWithPhone";
import {ForgetPassword} from "./ForgetPassword";
import {Icon} from "react-native-elements";

import i18n from 'i18n-js';
import {useLocalization} from "../../strings/Strings";

const LoginStack = createStackNavigator();

export const Login = (props) => {
    useLocalization();
    return (
        <LoginStack.Navigator initialRouteName="Login With Email And Password" screenOptions={headerConfig}>
            <LoginStack.Screen name="Login With Phone" component={LoginWithPhone} options={{headerShown: false}}/>
            <LoginStack.Screen name="Login With Email And Password" component={LoginWithEmailAndPassword}
                               options={{headerShown: false}}/>
            <LoginStack.Screen name="Forget Password" component={ForgetPassword}
                               options={{headerShown: true, title: i18n.t('login1')}}/>
        </LoginStack.Navigator>
    );
};

const headerConfig = {
    headerTransparent: true,
    headerTitleStyle: {
        color: "#E1EDFF",
        fontSize: 25,
        fontWeight: "bold",
    },
    headerTitleAlign: "left",
    headerBackTitleVisible: false,
    headerBackImage: () => <Icon name="md-arrow-back" type="ionicon" color="#E1EDFF" size={36}
                                 containerStyle={{marginLeft: 20}}/>,
};
