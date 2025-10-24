/**
 * Datos mock para el desarrollo del onboarding
 * Simula datos que normalmente vendrían del backend
 */

import { generateUniqueId } from './validation';

/**
 * Genera un código QR mock
 */
export const generateMockQRCode = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 16; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

/**
 * Genera un código numérico de 6 dígitos
 */
export const generateNumericCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

/**
 * Genera notificaciones mock para la simulación
 */
export const generateMockNotifications = () => [
  {
    id: generateUniqueId(),
    tipo: 'foto_recibida',
    timestamp: Date.now(),
    titulo: 'Tu papá te envió una foto',
    descripcion: 'Foto del jardín',
    imagen: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400',
    leida: false,
  },
  {
    id: generateUniqueId(),
    tipo: 'checkin_completado',
    timestamp: Date.now() + 3000,
    titulo: 'Check-in diario completado',
    descripcion: 'Juan está bien ✓',
    leida: false,
  },
  {
    id: generateUniqueId(),
    tipo: 'alerta_medicacion',
    timestamp: Date.now() + 6000,
    titulo: 'Recordatorio de medicación',
    descripcion: 'Próxima dosis en 30 minutos',
    leida: false,
  },
];

/**
 * Genera datos mock para el perfil del senior
 */
export const generateMockSeniorProfile = (quizAnswers) => {
  const nombres = ['Juan', 'María', 'Carlos', 'Ana', 'Roberto', 'Carmen'];
  const apellidos = ['García', 'López', 'Martínez', 'González', 'Rodríguez', 'Fernández'];
  
  const nombre = `${nombres[Math.floor(Math.random() * nombres.length)]} ${apellidos[Math.floor(Math.random() * apellidos.length)]}`;
  const edad = Math.floor(Math.random() * 30) + 65; // Entre 65 y 95 años
  
  return {
    id: generateUniqueId(),
    nombre,
    edad,
    fotoUri: null,
    relacion: quizAnswers?.relacion || 'familiar',
    fechaCreacion: Date.now(),
    estado: 'activo',
    ultimaActividad: Date.now() - Math.floor(Math.random() * 86400000), // Últimas 24 horas
  };
};

/**
 * Genera contactos de emergencia mock
 */
export const generateMockEmergencyContacts = () => [
  {
    id: generateUniqueId(),
    nombre: 'María García',
    telefono: '+1 (555) 123-4567',
    relacion: 'Hija',
    prioridad: 1,
    fechaCreacion: Date.now(),
  },
  {
    id: generateUniqueId(),
    nombre: 'Carlos López',
    telefono: '+1 (555) 987-6543',
    relacion: 'Hijo',
    prioridad: 2,
    fechaCreacion: Date.now(),
  },
];

/**
 * Genera datos mock para la vinculación del dispositivo
 */
export const generateMockDevicePairing = () => ({
  codigoQR: generateMockQRCode(),
  codigoNumerico: generateNumericCode(),
  estadoConexion: 'esperando',
  dispositivoSeniorId: `mock-device-senior-${generateUniqueId()}`,
  fechaVinculacion: null,
  intentos: 0,
  maxIntentos: 3,
});

/**
 * Genera datos mock para la prueba de videollamada
 */
export const generateMockVideoCallTest = () => ({
  realizada: false,
  duracion: 0,
  funcionoCorrectamente: null,
  timestamp: null,
  permisoCamaraOtorgado: false,
  permisoMicrofonoOtorgado: false,
  errores: [],
  calidadConexion: 'buena',
});

/**
 * Genera configuraciones mock basadas en las respuestas del quiz
 */
export const generateMockSettings = (quizAnswers) => {
  const baseSettings = {
    notificacionesPush: true,
    alertasInactividad: true,
    horarioCheckIn: '20:00',
    compartirUbicacionEmergencias: true,
    recordatoriosMedicacion: true,
    alertasEmergencia: true,
    modoSilencioso: false,
    idioma: 'es',
    tema: 'claro',
  };

  // Personalizar según las respuestas del quiz
  if (quizAnswers?.preocupacion === 'emergencias') {
    baseSettings.alertasEmergencia = true;
    baseSettings.compartirUbicacionEmergencias = true;
  }

  if (quizAnswers?.preocupacion === 'medicacion') {
    baseSettings.recordatoriosMedicacion = true;
  }

  if (quizAnswers?.ubicacion === 'lejos') {
    baseSettings.alertasInactividad = true;
  }

  if (quizAnswers?.nivelTech === 'ninguno') {
    baseSettings.modoSilencioso = true; // Menos notificaciones para usuarios con menos experiencia
  }

  return baseSettings;
};

/**
 * Genera datos mock para el dashboard
 */
export const generateMockDashboardData = (seniorProfile) => ({
  senior: seniorProfile,
  ultimaActividad: {
    tipo: 'checkin',
    timestamp: Date.now() - Math.floor(Math.random() * 3600000), // Última hora
    descripcion: 'Check-in diario completado',
  },
  estadisticas: {
    llamadasEstaSemana: Math.floor(Math.random() * 5) + 1,
    mensajesEstaSemana: Math.floor(Math.random() * 10) + 3,
    fotosRecibidas: Math.floor(Math.random() * 8) + 2,
    checkInsCompletados: Math.floor(Math.random() * 7) + 1,
  },
  proximosEventos: [
    {
      id: generateUniqueId(),
      tipo: 'recordatorio_medicacion',
      titulo: 'Medicación matutina',
      timestamp: Date.now() + 3600000, // En 1 hora
      descripcion: 'Tomar medicamentos de la mañana',
    },
    {
      id: generateUniqueId(),
      tipo: 'checkin_programado',
      titulo: 'Check-in diario',
      timestamp: Date.now() + 7200000, // En 2 horas
      descripcion: 'Verificación diaria de bienestar',
    },
  ],
});

/**
 * Genera datos mock para el progreso del onboarding
 */
export const generateMockOnboardingProgress = () => ({
  currentStep: 1,
  completedSteps: [],
  totalSteps: 6,
  startedAt: Date.now(),
  lastUpdated: Date.now(),
  canSkip: true,
  estimatedTimeRemaining: 15, // minutos
});

/**
 * Genera datos mock para las tareas de descubrimiento
 */
export const generateMockDiscoveryTasks = () => [
  {
    id: 'enviar-mensaje',
    titulo: 'Enviar primer mensaje al senior',
    descripcion: 'Envía un mensaje de bienvenida',
    completada: false,
    puntos: 10,
    icono: '💬',
  },
  {
    id: 'recordatorio-medicacion',
    titulo: 'Programar recordatorio de medicación',
    descripcion: 'Configura alertas para medicamentos',
    completada: false,
    puntos: 15,
    icono: '💊',
  },
  {
    id: 'zona-segura',
    titulo: 'Configurar zona segura GPS',
    descripcion: 'Define áreas seguras para el senior',
    completada: false,
    puntos: 20,
    icono: '📍',
  },
  {
    id: 'invitar-familiar',
    titulo: 'Invitar a otro familiar',
    descripcion: 'Comparte el acceso con más familiares',
    completada: false,
    puntos: 25,
    icono: '👥',
  },
  {
    id: 'personalizar-alertas',
    titulo: 'Personalizar alertas',
    descripcion: 'Ajusta las notificaciones a tu gusto',
    completada: false,
    puntos: 10,
    icono: '🔔',
  },
  {
    id: 'perfil-medico',
    titulo: 'Completar perfil médico del senior',
    descripcion: 'Agrega información médica importante',
    completada: false,
    puntos: 30,
    icono: '🏥',
  },
  {
    id: 'videollamada-real',
    titulo: 'Hacer videollamada de prueba real',
    descripcion: 'Prueba la conexión con el senior',
    completada: false,
    puntos: 40,
    icono: '📹',
  },
];

/**
 * Genera datos mock para el usuario familiar
 */
export const generateMockFamilyUser = () => ({
  id: generateUniqueId(),
  nombre: 'María García',
  email: 'maria.garcia@ejemplo.com',
  telefono: '+1 (555) 123-4567',
  fechaRegistro: Date.now(),
  rol: 'familiar_principal',
  configuracion: {
    idioma: 'es',
    tema: 'claro',
    notificaciones: true,
  },
});

/**
 * Simula una llamada de prueba
 */
export const simulateVideoCall = () => {
  return new Promise((resolve) => {
    // Simular estados de la llamada
    setTimeout(() => {
      resolve({
        estado: 'conectando',
        timestamp: Date.now(),
      });
    }, 1000);

    setTimeout(() => {
      resolve({
        estado: 'conectado',
        timestamp: Date.now(),
        duracion: 0,
      });
    }, 3000);
  });
};

/**
 * Simula la vinculación del dispositivo
 */
export const simulateDevicePairing = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        estado: 'conectando',
        timestamp: Date.now(),
      });
    }, 2000);

    setTimeout(() => {
      resolve({
        estado: 'conectado',
        timestamp: Date.now(),
        dispositivoId: `device-${generateUniqueId()}`,
      });
    }, 5000);
  });
};

export default {
  generateMockQRCode,
  generateNumericCode,
  generateMockNotifications,
  generateMockSeniorProfile,
  generateMockEmergencyContacts,
  generateMockDevicePairing,
  generateMockVideoCallTest,
  generateMockSettings,
  generateMockDashboardData,
  generateMockOnboardingProgress,
  generateMockDiscoveryTasks,
  generateMockFamilyUser,
  simulateVideoCall,
  simulateDevicePairing,
};
