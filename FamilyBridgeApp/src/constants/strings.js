/**
 * Textos de la aplicación FamilyBridge
 * Centralizados para facilitar la internacionalización futura
 */

export const Strings = {
  // App general
  appName: 'FamilyBridge',
  tagline: 'Conectando generaciones, un momento simple a la vez',
  
  // Onboarding
  onboarding: {
    welcome: {
      title: 'Bienvenido a FamilyBridge',
      subtitle: 'Conecta con quien más quieres',
      description: 'Una aplicación diseñada para mantener a tu familia conectada de manera simple y segura.',
      getStarted: 'Comenzar configuración',
      alreadyHaveAccount: 'Ya tengo cuenta',
    },
    
    quiz: {
      title: 'Personalicemos tu experiencia',
      subtitle: 'Esto nos ayudará a configurar todo perfectamente para ti',
      progress: 'Paso {current} de {total}',
      next: 'Siguiente',
      back: 'Atrás',
      skip: 'Omitir',
    },
    
    questions: {
      relationship: {
        title: '¿Cuál es tu relación con la persona mayor?',
        options: [
          { id: 'hijo', label: 'Hijo/a', icon: '👨‍👩‍👧‍👦' },
          { id: 'nieto', label: 'Nieto/a', icon: '👴‍👵' },
          { id: 'cuidador', label: 'Cuidador/a', icon: '🤝' },
          { id: 'otro', label: 'Otro', icon: '👤' },
        ],
      },
      concern: {
        title: '¿Qué te preocupa más?',
        options: [
          { id: 'comunicacion', label: 'Comunicación', icon: '📞' },
          { id: 'emergencias', label: 'Emergencias', icon: '🚨' },
          { id: 'medicacion', label: 'Medicación', icon: '💊' },
          { id: 'soledad', label: 'Soledad', icon: '💙' },
        ],
      },
      techLevel: {
        title: '¿Nivel tecnológico del senior?',
        options: [
          { id: 'ninguno', label: 'Ninguno', icon: '📱' },
          { id: 'basico', label: 'Básico', icon: '📲' },
          { id: 'intermedio', label: 'Intermedio', icon: '💻' },
        ],
      },
      location: {
        title: '¿Dónde vive tu familiar?',
        options: [
          { id: 'mismo_hogar', label: 'Mismo hogar', icon: '🏠' },
          { id: 'cerca', label: 'Cerca', icon: '🏘️' },
          { id: 'lejos', label: 'Lejos', icon: '🌍' },
          { id: 'residencia', label: 'Residencia', icon: '🏥' },
        ],
      },
      familySize: {
        title: '¿Cuántos familiares participarán?',
        options: [
          { id: 'solo_yo', label: 'Solo yo', icon: '👤' },
          { id: '2_3', label: '2-3 personas', icon: '👥' },
          { id: 'familia_extendida', label: 'Familia extendida', icon: '👨‍👩‍👧‍👦' },
        ],
      },
    },
  },
  
  // Dashboard
  dashboard: {
    title: 'Panel Familiar',
    welcome: 'Hola, {name}',
    lastActivity: 'Última actividad: {time}',
  },
  
  // Senior Profile
  seniorProfile: {
    title: 'Perfil del Senior',
    name: 'Nombre completo',
    age: 'Edad (opcional)',
    photo: 'Foto de perfil',
    relationship: 'Relación contigo',
    save: 'Guardar',
    next: 'Continuar',
  },
  
  // Emergency Contacts
  emergencyContacts: {
    title: 'Contactos de Emergencia',
    subtitle: 'Agrega al menos 2 contactos de emergencia',
    addContact: 'Agregar contacto',
    name: 'Nombre',
    phone: 'Teléfono',
    relationship: 'Relación',
    priority: 'Prioridad',
    required: 'Se requieren al menos 2 contactos',
    maxReached: 'Máximo 5 contactos permitidos',
  },
  
  // Device Pairing
  devicePairing: {
    title: 'Conectar Dispositivo',
    subtitle: 'El senior debe escanear este código desde su app',
    qrCode: 'Código QR',
    numericCode: 'Código numérico',
    waiting: 'Esperando conexión...',
    connecting: 'Conectando dispositivos...',
    connected: '¡Dispositivos conectados!',
    skip: 'Omitir por ahora',
  },
  
  // Video Call Test
  videoCallTest: {
    title: 'Prueba de Videollamada',
    subtitle: 'Verificaremos que todo funcione correctamente',
    startTest: 'Iniciar videollamada de prueba',
    skip: 'Omitir prueba',
    calling: 'Llamando...',
    connected: 'Conectado',
    hangUp: 'Colgar',
    micOn: 'Micrófono encendido',
    micOff: 'Micrófono apagado',
    cameraOn: 'Cámara encendida',
    cameraOff: 'Cámara apagada',
    testComplete: '¿Funcionó correctamente?',
    yes: 'Sí',
    no: 'No',
  },
  
  // Settings
  settings: {
    title: 'Configuraciones Iniciales',
    notifications: 'Recibir notificaciones push',
    inactivityAlerts: 'Alertas de inactividad',
    checkInTime: 'Horario de check-in diario',
    locationSharing: 'Compartir ubicación en emergencias',
    finish: 'Finalizar configuración',
  },
  
  // Success
  success: {
    title: '¡Configuración Completada!',
    subtitle: 'Todo está listo para conectar con tu familia',
    startUsing: 'Comenzar a usar FamilyBridge',
    celebration: '🎉',
  },
  
  // Common
  common: {
    loading: 'Cargando...',
    error: 'Error',
    retry: 'Reintentar',
    cancel: 'Cancelar',
    confirm: 'Confirmar',
    save: 'Guardar',
    edit: 'Editar',
    delete: 'Eliminar',
    add: 'Agregar',
    remove: 'Quitar',
    done: 'Listo',
    continue: 'Continuar',
    back: 'Atrás',
    next: 'Siguiente',
    finish: 'Finalizar',
  },
};

export default Strings;
