/**
 * Pantalla de bienvenida del onboarding
 * Primera pantalla que ve el usuario
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Colors } from '../../constants/colors';
import { Strings } from '../../constants/strings';

const WelcomeScreen = ({ navigation }) => {
  const handleGetStarted = () => {
    // Navegar al quiz de segmentación
    navigation.navigate('QuizScreen');
  };

  const handleAlreadyHaveAccount = () => {
    // Simular login básico - por ahora solo navegar al dashboard
    navigation.navigate('DashboardScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.backgroundLight} />
      
      <View style={styles.content}>
        {/* Header con logo */}
        <View style={styles.header}>
          <Text style={styles.logo}>👨‍👩‍👧‍👦</Text>
          <Text style={styles.appName}>{Strings.appName}</Text>
        </View>

        {/* Contenido principal */}
        <View style={styles.mainContent}>
          <Text style={styles.title}>{Strings.onboarding.welcome.title}</Text>
          <Text style={styles.subtitle}>{Strings.onboarding.welcome.subtitle}</Text>
          <Text style={styles.description}>{Strings.onboarding.welcome.description}</Text>
        </View>

        {/* Botones de acción */}
        <View style={styles.actions}>
          <TouchableOpacity 
            style={styles.primaryButton} 
            onPress={handleGetStarted}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryButtonText}>
              {Strings.onboarding.welcome.getStarted}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.secondaryButton} 
            onPress={handleAlreadyHaveAccount}
            activeOpacity={0.8}
          >
            <Text style={styles.secondaryButtonText}>
              {Strings.onboarding.welcome.alreadyHaveAccount}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundLight,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
  },
  logo: {
    fontSize: 64,
    marginBottom: 16,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 40,
  },
  subtitle: {
    fontSize: 20,
    color: Colors.primary,
    textAlign: 'center',
    marginBottom: 24,
    fontWeight: '600',
  },
  description: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 300,
  },
  actions: {
    gap: 16,
  },
  primaryButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: Colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  primaryButtonText: {
    color: Colors.textLight,
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  secondaryButtonText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default WelcomeScreen;
