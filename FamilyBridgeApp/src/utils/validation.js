/**
 * Utilidades de validación
 * Funciones para validar formularios y datos del onboarding
 */

/**
 * Valida un nombre (mínimo 2 caracteres, solo letras y espacios)
 */
export const validateName = (name) => {
  if (!name || name.trim().length < 2) {
    return { isValid: false, message: 'El nombre debe tener al menos 2 caracteres' };
  }
  
  const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
  if (!nameRegex.test(name.trim())) {
    return { isValid: false, message: 'El nombre solo puede contener letras y espacios' };
  }
  
  return { isValid: true, message: '' };
};

/**
 * Valida un número de teléfono
 */
export const validatePhone = (phone) => {
  if (!phone || phone.trim().length === 0) {
    return { isValid: false, message: 'El teléfono es requerido' };
  }
  
  // Remover espacios y caracteres especiales para validación
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
  
  // Validar que contenga solo números y tenga longitud adecuada
  const phoneRegex = /^[+]?[\d]{7,15}$/;
  if (!phoneRegex.test(cleanPhone)) {
    return { isValid: false, message: 'Ingresa un número de teléfono válido' };
  }
  
  return { isValid: true, message: '' };
};

/**
 * Valida una edad (opcional, pero si se proporciona debe ser entre 18 y 120)
 */
export const validateAge = (age) => {
  if (!age || age === '') {
    return { isValid: true, message: '' }; // Edad es opcional
  }
  
  const ageNum = parseInt(age, 10);
  if (isNaN(ageNum) || ageNum < 18 || ageNum > 120) {
    return { isValid: false, message: 'La edad debe estar entre 18 y 120 años' };
  }
  
  return { isValid: true, message: '' };
};

/**
 * Valida un email
 */
export const validateEmail = (email) => {
  if (!email || email.trim().length === 0) {
    return { isValid: false, message: 'El email es requerido' };
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return { isValid: false, message: 'Ingresa un email válido' };
  }
  
  return { isValid: true, message: '' };
};

/**
 * Valida que se haya seleccionado una opción del quiz
 */
export const validateQuizAnswer = (answer) => {
  if (!answer || answer.trim().length === 0) {
    return { isValid: false, message: 'Por favor selecciona una opción' };
  }
  
  return { isValid: true, message: '' };
};

/**
 * Valida que se hayan agregado al menos 2 contactos de emergencia
 */
export const validateEmergencyContacts = (contacts) => {
  if (!contacts || contacts.length < 2) {
    return { isValid: false, message: 'Se requieren al menos 2 contactos de emergencia' };
  }
  
  // Validar que cada contacto tenga los campos requeridos
  for (let i = 0; i < contacts.length; i++) {
    const contact = contacts[i];
    if (!contact.nombre || contact.nombre.trim().length === 0) {
      return { isValid: false, message: `El contacto ${i + 1} debe tener un nombre` };
    }
    
    const phoneValidation = validatePhone(contact.telefono);
    if (!phoneValidation.isValid) {
      return { isValid: false, message: `El contacto ${i + 1}: ${phoneValidation.message}` };
    }
  }
  
  return { isValid: true, message: '' };
};

/**
 * Valida que se haya completado el perfil del senior
 */
export const validateSeniorProfile = (profile) => {
  if (!profile) {
    return { isValid: false, message: 'El perfil del senior es requerido' };
  }
  
  const nameValidation = validateName(profile.nombre);
  if (!nameValidation.isValid) {
    return { isValid: false, message: nameValidation.message };
  }
  
  if (profile.edad) {
    const ageValidation = validateAge(profile.edad);
    if (!ageValidation.isValid) {
      return { isValid: false, message: ageValidation.message };
    }
  }
  
  return { isValid: true, message: '' };
};

/**
 * Valida que se haya completado la vinculación del dispositivo
 */
export const validateDevicePairing = (pairingData) => {
  if (!pairingData) {
    return { isValid: false, message: 'La vinculación del dispositivo es requerida' };
  }
  
  if (pairingData.estadoConexion !== 'conectado') {
    return { isValid: false, message: 'El dispositivo debe estar conectado para continuar' };
  }
  
  return { isValid: true, message: '' };
};

/**
 * Valida que se haya completado la prueba de videollamada
 */
export const validateVideoCallTest = (testData) => {
  if (!testData) {
    return { isValid: false, message: 'La prueba de videollamada es requerida' };
  }
  
  if (!testData.realizada) {
    return { isValid: false, message: 'Debes completar la prueba de videollamada' };
  }
  
  return { isValid: true, message: '' };
};

/**
 * Valida que se hayan configurado las preferencias iniciales
 */
export const validateSettings = (settings) => {
  if (!settings) {
    return { isValid: false, message: 'Las configuraciones son requeridas' };
  }
  
  // Verificar que al menos se haya configurado el horario de check-in
  if (!settings.horarioCheckIn) {
    return { isValid: false, message: 'Debes configurar el horario de check-in diario' };
  }
  
  return { isValid: true, message: '' };
};

/**
 * Valida que el onboarding esté completo
 */
export const validateOnboardingCompletion = async (onboardingData) => {
  const validations = [
    { key: 'quizAnswers', validator: (data) => data && Object.keys(data).length > 0 },
    { key: 'seniorProfile', validator: validateSeniorProfile },
    { key: 'emergencyContacts', validator: validateEmergencyContacts },
    { key: 'devicePairing', validator: validateDevicePairing },
    { key: 'videoCallTest', validator: validateVideoCallTest },
    { key: 'settings', validator: validateSettings },
  ];
  
  const errors = [];
  
  for (const validation of validations) {
    const data = onboardingData[validation.key];
    const result = validation.validator(data);
    
    if (typeof result === 'boolean' && !result) {
      errors.push(`Falta completar: ${validation.key}`);
    } else if (typeof result === 'object' && !result.isValid) {
      errors.push(result.message);
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Genera un ID único
 */
export const generateUniqueId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

/**
 * Formatea un número de teléfono para mostrar
 */
export const formatPhoneNumber = (phone) => {
  if (!phone) return '';
  
  // Remover caracteres no numéricos
  const cleanPhone = phone.replace(/\D/g, '');
  
  // Formatear según la longitud
  if (cleanPhone.length === 10) {
    return cleanPhone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  } else if (cleanPhone.length === 11 && cleanPhone.startsWith('1')) {
    return cleanPhone.replace(/(\d{1})(\d{3})(\d{3})(\d{4})/, '+$1 ($2) $3-$4');
  }
  
  return phone; // Devolver original si no coincide con formatos conocidos
};

/**
 * Valida que una imagen sea válida (básico)
 */
export const validateImage = (imageUri) => {
  if (!imageUri) {
    return { isValid: true, message: '' }; // Imagen es opcional
  }
  
  // Validaciones básicas de URI de imagen
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
  const hasValidExtension = imageExtensions.some(ext => 
    imageUri.toLowerCase().includes(ext)
  );
  
  if (!hasValidExtension) {
    return { isValid: false, message: 'Formato de imagen no válido' };
  }
  
  return { isValid: true, message: '' };
};

export default {
  validateName,
  validatePhone,
  validateAge,
  validateEmail,
  validateQuizAnswer,
  validateEmergencyContacts,
  validateSeniorProfile,
  validateDevicePairing,
  validateVideoCallTest,
  validateSettings,
  validateOnboardingCompletion,
  generateUniqueId,
  formatPhoneNumber,
  validateImage,
};
