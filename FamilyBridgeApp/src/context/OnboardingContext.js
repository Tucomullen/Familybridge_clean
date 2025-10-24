/**
 * Context para el estado global del onboarding
 * Maneja todo el estado del flujo de onboarding
 */

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { 
  saveOnboardingProgress, 
  getOnboardingProgress, 
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
  markOnboardingCompleted,
  isOnboardingCompleted,
} from '../utils/storage';

// Estado inicial
const initialState = {
  // Progreso del onboarding
  currentStep: 1,
  completedSteps: [],
  totalSteps: 6,
  isCompleted: false,
  
  // Respuestas del quiz
  quizAnswers: {
    relacion: '',
    preocupacion: '',
    nivelTech: '',
    ubicacion: '',
    cantidadFamiliares: '',
  },
  
  // Perfil del senior
  seniorProfile: {
    id: '',
    nombre: '',
    edad: null,
    fotoUri: null,
    relacion: '',
    fechaCreacion: null,
  },
  
  // Contactos de emergencia
  emergencyContacts: [],
  
  // Vinculación del dispositivo
  devicePairing: {
    codigoQR: '',
    codigoNumerico: '',
    estadoConexion: 'esperando',
    dispositivoSeniorId: '',
    fechaVinculacion: null,
  },
  
  // Prueba de videollamada
  videoCallTest: {
    realizada: false,
    duracion: 0,
    funcionoCorrectamente: null,
    timestamp: null,
    permisoCamaraOtorgado: false,
    permisoMicrofonoOtorgado: false,
  },
  
  // Configuraciones
  settings: {
    notificacionesPush: true,
    alertasInactividad: true,
    horarioCheckIn: '20:00',
    compartirUbicacionEmergencias: true,
  },
  
  // Estado de carga
  loading: true,
  error: null,
};

// Tipos de acciones
const ONBOARDING_ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_CURRENT_STEP: 'SET_CURRENT_STEP',
  ADD_COMPLETED_STEP: 'ADD_COMPLETED_STEP',
  SET_QUIZ_ANSWERS: 'SET_QUIZ_ANSWERS',
  SET_SENIOR_PROFILE: 'SET_SENIOR_PROFILE',
  SET_EMERGENCY_CONTACTS: 'SET_EMERGENCY_CONTACTS',
  SET_DEVICE_PAIRING: 'SET_DEVICE_PAIRING',
  SET_VIDEO_CALL_TEST: 'SET_VIDEO_CALL_TEST',
  SET_SETTINGS: 'SET_SETTINGS',
  COMPLETE_ONBOARDING: 'COMPLETE_ONBOARDING',
  RESET_ONBOARDING: 'RESET_ONBOARDING',
  LOAD_ONBOARDING_DATA: 'LOAD_ONBOARDING_DATA',
};

// Reducer
const onboardingReducer = (state, action) => {
  switch (action.type) {
    case ONBOARDING_ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };
      
    case ONBOARDING_ACTIONS.SET_ERROR:
      return { ...state, error: action.payload, loading: false };
      
    case ONBOARDING_ACTIONS.SET_CURRENT_STEP:
      return { ...state, currentStep: action.payload };
      
    case ONBOARDING_ACTIONS.ADD_COMPLETED_STEP:
      const newCompletedSteps = [...state.completedSteps];
      if (!newCompletedSteps.includes(action.payload)) {
        newCompletedSteps.push(action.payload);
      }
      return { ...state, completedSteps: newCompletedSteps };
      
    case ONBOARDING_ACTIONS.SET_QUIZ_ANSWERS:
      return { ...state, quizAnswers: { ...state.quizAnswers, ...action.payload } };
      
    case ONBOARDING_ACTIONS.SET_SENIOR_PROFILE:
      return { ...state, seniorProfile: { ...state.seniorProfile, ...action.payload } };
      
    case ONBOARDING_ACTIONS.SET_EMERGENCY_CONTACTS:
      return { ...state, emergencyContacts: action.payload };
      
    case ONBOARDING_ACTIONS.SET_DEVICE_PAIRING:
      return { ...state, devicePairing: { ...state.devicePairing, ...action.payload } };
      
    case ONBOARDING_ACTIONS.SET_VIDEO_CALL_TEST:
      return { ...state, videoCallTest: { ...state.videoCallTest, ...action.payload } };
      
    case ONBOARDING_ACTIONS.SET_SETTINGS:
      return { ...state, settings: { ...state.settings, ...action.payload } };
      
    case ONBOARDING_ACTIONS.COMPLETE_ONBOARDING:
      return { ...state, isCompleted: true, currentStep: state.totalSteps + 1 };
      
    case ONBOARDING_ACTIONS.RESET_ONBOARDING:
      return { ...initialState, loading: false };
      
    case ONBOARDING_ACTIONS.LOAD_ONBOARDING_DATA:
      return { ...state, ...action.payload, loading: false };
      
    default:
      return state;
  }
};

// Crear el context
const OnboardingContext = createContext();

// Provider del context
export const OnboardingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(onboardingReducer, initialState);

  // Cargar datos del onboarding al inicializar
  useEffect(() => {
    loadOnboardingData();
  }, []);

  // Función para cargar datos del onboarding
  const loadOnboardingData = async () => {
    try {
      dispatch({ type: ONBOARDING_ACTIONS.SET_LOADING, payload: true });
      
      const [
        progress,
        quizAnswers,
        seniorProfile,
        emergencyContacts,
        devicePairing,
        videoCallTest,
        settings,
        isCompleted,
      ] = await Promise.all([
        getOnboardingProgress(),
        getQuizAnswers(),
        getSeniorProfile(),
        getEmergencyContacts(),
        getDevicePairing(),
        getVideoCallTest(),
        getSettings(),
        isOnboardingCompleted(),
      ]);

      const loadedData = {
        isCompleted,
        currentStep: progress?.currentStep || 1,
        completedSteps: progress?.completedSteps || [],
        quizAnswers: quizAnswers || state.quizAnswers,
        seniorProfile: seniorProfile || state.seniorProfile,
        emergencyContacts: emergencyContacts || [],
        devicePairing: devicePairing || state.devicePairing,
        videoCallTest: videoCallTest || state.videoCallTest,
        settings: settings || state.settings,
      };

      dispatch({ type: ONBOARDING_ACTIONS.LOAD_ONBOARDING_DATA, payload: loadedData });
    } catch (error) {
      console.error('Error loading onboarding data:', error);
      dispatch({ type: ONBOARDING_ACTIONS.SET_ERROR, payload: error.message });
    }
  };

  // Función para actualizar el paso actual
  const updateCurrentStep = async (step) => {
    try {
      dispatch({ type: ONBOARDING_ACTIONS.SET_CURRENT_STEP, payload: step });
      await saveOnboardingProgress(step, {
        completedSteps: state.completedSteps,
        timestamp: Date.now(),
      });
    } catch (error) {
      console.error('Error updating current step:', error);
      dispatch({ type: ONBOARDING_ACTIONS.SET_ERROR, payload: error.message });
    }
  };

  // Función para marcar un paso como completado
  const completeStep = async (step) => {
    try {
      dispatch({ type: ONBOARDING_ACTIONS.ADD_COMPLETED_STEP, payload: step });
      await saveOnboardingProgress(state.currentStep, {
        completedSteps: [...state.completedSteps, step],
        timestamp: Date.now(),
      });
    } catch (error) {
      console.error('Error completing step:', error);
      dispatch({ type: ONBOARDING_ACTIONS.SET_ERROR, payload: error.message });
    }
  };

  // Función para guardar respuestas del quiz
  const saveQuizAnswersAction = async (answers) => {
    try {
      dispatch({ type: ONBOARDING_ACTIONS.SET_QUIZ_ANSWERS, payload: answers });
      await saveQuizAnswers(answers);
    } catch (error) {
      console.error('Error saving quiz answers:', error);
      dispatch({ type: ONBOARDING_ACTIONS.SET_ERROR, payload: error.message });
    }
  };

  // Función para guardar perfil del senior
  const saveSeniorProfileAction = async (profile) => {
    try {
      dispatch({ type: ONBOARDING_ACTIONS.SET_SENIOR_PROFILE, payload: profile });
      await saveSeniorProfile(profile);
    } catch (error) {
      console.error('Error saving senior profile:', error);
      dispatch({ type: ONBOARDING_ACTIONS.SET_ERROR, payload: error.message });
    }
  };

  // Función para guardar contactos de emergencia
  const saveEmergencyContactsAction = async (contacts) => {
    try {
      dispatch({ type: ONBOARDING_ACTIONS.SET_EMERGENCY_CONTACTS, payload: contacts });
      await saveEmergencyContacts(contacts);
    } catch (error) {
      console.error('Error saving emergency contacts:', error);
      dispatch({ type: ONBOARDING_ACTIONS.SET_ERROR, payload: error.message });
    }
  };

  // Función para guardar vinculación del dispositivo
  const saveDevicePairingAction = async (pairingData) => {
    try {
      dispatch({ type: ONBOARDING_ACTIONS.SET_DEVICE_PAIRING, payload: pairingData });
      await saveDevicePairing(pairingData);
    } catch (error) {
      console.error('Error saving device pairing:', error);
      dispatch({ type: ONBOARDING_ACTIONS.SET_ERROR, payload: error.message });
    }
  };

  // Función para guardar prueba de videollamada
  const saveVideoCallTestAction = async (testData) => {
    try {
      dispatch({ type: ONBOARDING_ACTIONS.SET_VIDEO_CALL_TEST, payload: testData });
      await saveVideoCallTest(testData);
    } catch (error) {
      console.error('Error saving video call test:', error);
      dispatch({ type: ONBOARDING_ACTIONS.SET_ERROR, payload: error.message });
    }
  };

  // Función para guardar configuraciones
  const saveSettingsAction = async (settings) => {
    try {
      dispatch({ type: ONBOARDING_ACTIONS.SET_SETTINGS, payload: settings });
      await saveSettings(settings);
    } catch (error) {
      console.error('Error saving settings:', error);
      dispatch({ type: ONBOARDING_ACTIONS.SET_ERROR, payload: error.message });
    }
  };

  // Función para completar el onboarding
  const completeOnboarding = async () => {
    try {
      dispatch({ type: ONBOARDING_ACTIONS.COMPLETE_ONBOARDING });
      await markOnboardingCompleted();
    } catch (error) {
      console.error('Error completing onboarding:', error);
      dispatch({ type: ONBOARDING_ACTIONS.SET_ERROR, payload: error.message });
    }
  };

  // Función para reiniciar el onboarding
  const resetOnboarding = () => {
    dispatch({ type: ONBOARDING_ACTIONS.RESET_ONBOARDING });
  };

  // Función para navegar al siguiente paso
  const goToNextStep = async () => {
    const nextStep = state.currentStep + 1;
    await updateCurrentStep(nextStep);
    await completeStep(state.currentStep);
  };

  // Función para navegar al paso anterior
  const goToPreviousStep = async () => {
    if (state.currentStep > 1) {
      const previousStep = state.currentStep - 1;
      await updateCurrentStep(previousStep);
    }
  };

  // Función para verificar si un paso está completado
  const isStepCompleted = (step) => {
    return state.completedSteps.includes(step);
  };

  // Función para verificar si se puede avanzar al siguiente paso
  const canProceedToNextStep = () => {
    return state.currentStep < state.totalSteps;
  };

  // Función para obtener el progreso como porcentaje
  const getProgressPercentage = () => {
    return Math.round((state.completedSteps.length / state.totalSteps) * 100);
  };

  const value = {
    // Estado
    ...state,
    
    // Acciones
    updateCurrentStep,
    completeStep,
    saveQuizAnswersAction,
    saveSeniorProfileAction,
    saveEmergencyContactsAction,
    saveDevicePairingAction,
    saveVideoCallTestAction,
    saveSettingsAction,
    completeOnboarding,
    resetOnboarding,
    loadOnboardingData,
    
    // Navegación
    goToNextStep,
    goToPreviousStep,
    
    // Utilidades
    isStepCompleted,
    canProceedToNextStep,
    getProgressPercentage,
  };

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
};

// Hook para usar el context
export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};

export default OnboardingContext;
