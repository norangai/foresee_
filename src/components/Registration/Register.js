
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterOptions from './RegisterOptions/RegisterOptions';
import { Styles } from '../../../Styles/styles';
import AppColors from '../../../Styles/colors';
import { RegistrationForm } from './RegistrationForm/RegistrationForm';
import { RegisterMehtod } from './RegisterOptions/RegisterMethod';

const RegistrationStack = createStackNavigator();

export const Register = (props) => {
    return (
        <RegistrationStack.Navigator
            initialRouteName="Register Options">
            <RegistrationStack.Screen
                name='Register Method'
                component={RegisterMehtod}
                options={{ headerShown: false }}
            />
            <RegistrationStack.Screen name='Register Options'
                component={RegisterOptions}
                options={{ headerShown: false }}
            />
            <RegistrationStack.Screen
                name='Register'
                component={RegistrationForm}
                options={{ headerShown: false }}
            />
        </RegistrationStack.Navigator>
    )
}

