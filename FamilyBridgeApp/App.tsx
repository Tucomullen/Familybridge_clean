/**
 * FamilyBridge App
 * Aplicación para conectar familias con personas mayores
 */

import React from 'react';
import { OnboardingProvider } from './src/context/OnboardingContext';
import MainNavigator from './src/navigation/MainNavigator';

function App() {
  return (
    <OnboardingProvider>
      <MainNavigator />
    </OnboardingProvider>
  );
}

export default App;