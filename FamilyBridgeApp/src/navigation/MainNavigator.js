/**
 * Navegador principal de la aplicación
 * Maneja la lógica condicional entre onboarding y dashboard
 */

import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Colors } from '../constants/colors';
import { isOnboardingCompleted } from '../utils/storage';
import OnboardingNavigator from './OnboardingNavigator';
import DashboardScreen from '../screens/dashboard/DashboardScreen';

const Stack = createStackNavigator();

// Pantalla de carga mientras se verifica el estado del onboarding
const LoadingScreen = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color={Colors.primary} />
    <Text style={styles.loadingText}>Cargando...</Text>
  </View>
);

const MainNavigator = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isOnboardingDone, setIsOnboardingDone] = useState(false);

  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  const checkOnboardingStatus = async () => {
    try {
      const completed = await isOnboardingCompleted();
      setIsOnboardingDone(completed);
    } catch (error) {
      console.error('Error checking onboarding status:', error);
      // En caso de error, mostrar onboarding por defecto
      setIsOnboardingDone(false);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {isOnboardingDone ? (
          // Si el onboarding está completado, mostrar dashboard
          <Stack.Screen 
            name="DashboardScreen" 
            component={DashboardScreen}
            options={{
              title: 'Dashboard',
            }}
          />
        ) : (
          // Si el onboarding no está completado, mostrar onboarding
          <Stack.Screen 
            name="OnboardingNavigator" 
            component={OnboardingNavigator}
            options={{
              title: 'Onboarding',
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.backgroundLight,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: Colors.textSecondary,
  },
});

export default MainNavigator;
