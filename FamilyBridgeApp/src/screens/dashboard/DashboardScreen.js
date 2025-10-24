/**
 * Pantalla principal del dashboard
 * Se muestra después de completar el onboarding
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import { Colors } from '../../constants/colors';
import { Strings } from '../../constants/strings';

const DashboardScreen = ({ navigation }) => {
  const handleGoToOnboarding = () => {
    // Navegar de vuelta al onboarding para testing
    navigation.navigate('OnboardingNavigator');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.backgroundLight} />
      
      <ScrollView style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>{Strings.dashboard.title}</Text>
          <Text style={styles.welcome}>¡Bienvenido a FamilyBridge!</Text>
        </View>

        {/* Contenido placeholder */}
        <View style={styles.placeholder}>
          <Text style={styles.placeholderTitle}>🎉 ¡Onboarding Completado!</Text>
          <Text style={styles.placeholderText}>
            Esta es la pantalla principal del dashboard. Aquí se mostrarán:
          </Text>
          
          <View style={styles.featureList}>
            <Text style={styles.featureItem}>📞 Videollamadas con el senior</Text>
            <Text style={styles.featureItem}>💬 Mensajes y fotos</Text>
            <Text style={styles.featureItem}>📊 Monitoreo de actividad</Text>
            <Text style={styles.featureItem}>🚨 Alertas de emergencia</Text>
            <Text style={styles.featureItem}>⚙️ Configuraciones</Text>
          </View>

          <Text style={styles.note}>
            Nota: Esta es una pantalla placeholder. El dashboard completo se implementará en las siguientes tareas.
          </Text>
        </View>

        {/* Botón para testing */}
        <TouchableOpacity 
          style={styles.testButton} 
          onPress={handleGoToOnboarding}
          activeOpacity={0.8}
        >
          <Text style={styles.testButtonText}>
            🔄 Volver al Onboarding (Testing)
          </Text>
        </TouchableOpacity>
      </ScrollView>
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
  },
  header: {
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  welcome: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  placeholder: {
    flex: 1,
    paddingVertical: 40,
    alignItems: 'center',
  },
  placeholderTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 16,
    textAlign: 'center',
  },
  placeholderText: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  featureList: {
    alignSelf: 'stretch',
    marginBottom: 32,
  },
  featureItem: {
    fontSize: 16,
    color: Colors.textPrimary,
    marginBottom: 12,
    paddingLeft: 8,
  },
  note: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
    paddingHorizontal: 20,
  },
  testButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 20,
  },
  testButtonText: {
    color: Colors.textLight,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default DashboardScreen;
