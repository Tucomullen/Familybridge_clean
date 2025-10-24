/**
 * Navegador para el flujo de onboarding
 * Stack Navigator para las pantallas del onboarding
 */

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../screens/onboarding/WelcomeScreen';

const Stack = createStackNavigator();

const OnboardingNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="WelcomeScreen"
      screenOptions={{
        headerShown: false, // Ocultar header por defecto
        gestureEnabled: true, // Habilitar gestos de navegación
        cardStyle: {
          backgroundColor: '#f6f7f8', // Color de fondo consistente
        },
      }}
    >
      <Stack.Screen 
        name="WelcomeScreen" 
        component={WelcomeScreen}
        options={{
          title: 'Bienvenida',
        }}
      />
      
      {/* Aquí se agregarán más pantallas del onboarding en las siguientes tareas */}
      {/* QuizScreen, SeniorProfileScreen, EmergencyContactsScreen, etc. */}
    </Stack.Navigator>
  );
};

export default OnboardingNavigator;
