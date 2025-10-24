/**
 * Utilidades para AsyncStorage
 * Funciones helper para persistir datos del onboarding
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

// Claves de almacenamiento
const STORAGE_KEYS = {
  ONBOARDING_PROGRESS: 'onboarding_progress',
  QUIZ_ANSWERS: 'quiz_answers',
  SENIOR_PROFILE: 'senior_profile',
  EMERGENCY_CONTACTS: 'emergency_contacts',
  DEVICE_PAIRING: 'device_pairing',
  VIDEO_CALL_TEST: 'video_call_test',
  SETTINGS: 'settings',
  ONBOARDING_COMPLETED: 'onboarding_completed',
  USER_PREFERENCES: 'user_preferences',
};

/**
 * Guarda el progreso del onboarding
 */
export const saveOnboardingProgress = async (step, data = {}) => {
  try {
    const progress = {
      currentStep: step,
      completedSteps: data.completedSteps || [],
      timestamp: Date.now(),
      ...data,
    };
    
    await AsyncStorage.setItem(
      STORAGE_KEYS.ONBOARDING_PROGRESS,
      JSON.stringify(progress)
    );
    
    return true;
  } catch (error) {
    console.error('Error saving onboarding progress:', error);
    return false;
  }
};

/**
 * Obtiene el progreso del onboarding
 */
export const getOnboardingProgress = async () => {
  try {
    const progress = await AsyncStorage.getItem(STORAGE_KEYS.ONBOARDING_PROGRESS);
    return progress ? JSON.parse(progress) : null;
  } catch (error) {
    console.error('Error getting onboarding progress:', error);
    return null;
  }
};

/**
 * Verifica si el onboarding está completado
 */
export const isOnboardingCompleted = async () => {
  try {
    const completed = await AsyncStorage.getItem(STORAGE_KEYS.ONBOARDING_COMPLETED);
    return completed === 'true';
  } catch (error) {
    console.error('Error checking onboarding completion:', error);
    return false;
  }
};

/**
 * Marca el onboarding como completado
 */
export const markOnboardingCompleted = async () => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.ONBOARDING_COMPLETED, 'true');
    return true;
  } catch (error) {
    console.error('Error marking onboarding as completed:', error);
    return false;
  }
};

/**
 * Guarda las respuestas del quiz
 */
export const saveQuizAnswers = async (answers) => {
  try {
    await AsyncStorage.setItem(
      STORAGE_KEYS.QUIZ_ANSWERS,
      JSON.stringify(answers)
    );
    return true;
  } catch (error) {
    console.error('Error saving quiz answers:', error);
    return false;
  }
};

/**
 * Obtiene las respuestas del quiz
 */
export const getQuizAnswers = async () => {
  try {
    const answers = await AsyncStorage.getItem(STORAGE_KEYS.QUIZ_ANSWERS);
    return answers ? JSON.parse(answers) : null;
  } catch (error) {
    console.error('Error getting quiz answers:', error);
    return null;
  }
};

/**
 * Guarda el perfil del senior
 */
export const saveSeniorProfile = async (profile) => {
  try {
    await AsyncStorage.setItem(
      STORAGE_KEYS.SENIOR_PROFILE,
      JSON.stringify(profile)
    );
    return true;
  } catch (error) {
    console.error('Error saving senior profile:', error);
    return false;
  }
};

/**
 * Obtiene el perfil del senior
 */
export const getSeniorProfile = async () => {
  try {
    const profile = await AsyncStorage.getItem(STORAGE_KEYS.SENIOR_PROFILE);
    return profile ? JSON.parse(profile) : null;
  } catch (error) {
    console.error('Error getting senior profile:', error);
    return null;
  }
};

/**
 * Guarda los contactos de emergencia
 */
export const saveEmergencyContacts = async (contacts) => {
  try {
    await AsyncStorage.setItem(
      STORAGE_KEYS.EMERGENCY_CONTACTS,
      JSON.stringify(contacts)
    );
    return true;
  } catch (error) {
    console.error('Error saving emergency contacts:', error);
    return false;
  }
};

/**
 * Obtiene los contactos de emergencia
 */
export const getEmergencyContacts = async () => {
  try {
    const contacts = await AsyncStorage.getItem(STORAGE_KEYS.EMERGENCY_CONTACTS);
    return contacts ? JSON.parse(contacts) : [];
  } catch (error) {
    console.error('Error getting emergency contacts:', error);
    return [];
  }
};

/**
 * Guarda la configuración de vinculación del dispositivo
 */
export const saveDevicePairing = async (pairingData) => {
  try {
    await AsyncStorage.setItem(
      STORAGE_KEYS.DEVICE_PAIRING,
      JSON.stringify(pairingData)
    );
    return true;
  } catch (error) {
    console.error('Error saving device pairing:', error);
    return false;
  }
};

/**
 * Obtiene la configuración de vinculación del dispositivo
 */
export const getDevicePairing = async () => {
  try {
    const pairing = await AsyncStorage.getItem(STORAGE_KEYS.DEVICE_PAIRING);
    return pairing ? JSON.parse(pairing) : null;
  } catch (error) {
    console.error('Error getting device pairing:', error);
    return null;
  }
};

/**
 * Guarda los resultados de la prueba de videollamada
 */
export const saveVideoCallTest = async (testData) => {
  try {
    await AsyncStorage.setItem(
      STORAGE_KEYS.VIDEO_CALL_TEST,
      JSON.stringify(testData)
    );
    return true;
  } catch (error) {
    console.error('Error saving video call test:', error);
    return false;
  }
};

/**
 * Obtiene los resultados de la prueba de videollamada
 */
export const getVideoCallTest = async () => {
  try {
    const test = await AsyncStorage.getItem(STORAGE_KEYS.VIDEO_CALL_TEST);
    return test ? JSON.parse(test) : null;
  } catch (error) {
    console.error('Error getting video call test:', error);
    return null;
  }
};

/**
 * Guarda las configuraciones iniciales
 */
export const saveSettings = async (settings) => {
  try {
    await AsyncStorage.setItem(
      STORAGE_KEYS.SETTINGS,
      JSON.stringify(settings)
    );
    return true;
  } catch (error) {
    console.error('Error saving settings:', error);
    return false;
  }
};

/**
 * Obtiene las configuraciones iniciales
 */
export const getSettings = async () => {
  try {
    const settings = await AsyncStorage.getItem(STORAGE_KEYS.SETTINGS);
    return settings ? JSON.parse(settings) : null;
  } catch (error) {
    console.error('Error getting settings:', error);
    return null;
  }
};

/**
 * Limpia todos los datos del onboarding
 */
export const clearOnboardingData = async () => {
  try {
    const keys = Object.values(STORAGE_KEYS);
    await AsyncStorage.multiRemove(keys);
    return true;
  } catch (error) {
    console.error('Error clearing onboarding data:', error);
    return false;
  }
};

/**
 * Obtiene todos los datos del onboarding
 */
export const getAllOnboardingData = async () => {
  try {
    const [
      progress,
      quizAnswers,
      seniorProfile,
      emergencyContacts,
      devicePairing,
      videoCallTest,
      settings,
    ] = await Promise.all([
      getOnboardingProgress(),
      getQuizAnswers(),
      getSeniorProfile(),
      getEmergencyContacts(),
      getDevicePairing(),
      getVideoCallTest(),
      getSettings(),
    ]);

    return {
      progress,
      quizAnswers,
      seniorProfile,
      emergencyContacts,
      devicePairing,
      videoCallTest,
      settings,
    };
  } catch (error) {
    console.error('Error getting all onboarding data:', error);
    return null;
  }
};

export default {
  saveOnboardingProgress,
  getOnboardingProgress,
  isOnboardingCompleted,
  markOnboardingCompleted,
  saveQuizAnswers,
  getQuizAnswers,
  saveSeniorProfile,
  getSeniorProfile,
  saveEmergencyContacts,
  getEmergencyContacts,
  saveDevicePairing,
  getDevicePairing,
  saveVideoCallTest,
  getVideoCallTest,
  saveSettings,
  getSettings,
  clearOnboardingData,
  getAllOnboardingData,
};
