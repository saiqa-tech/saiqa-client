import { PASSWORD_RULES } from './constants';

// Email validation
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password validation
export const validatePassword = (password) => {
  if (!password || password.length < PASSWORD_RULES.MIN_LENGTH) {
    return {
      valid: false,
      message: `Password must be at least ${PASSWORD_RULES.MIN_LENGTH} characters long`,
    };
  }

  if (!PASSWORD_RULES.PATTERN.test(password)) {
    return {
      valid: false,
      message: PASSWORD_RULES.MESSAGE,
    };
  }

  return { valid: true };
};

// Form validation rules for Ant Design
export const formRules = {
  email: [
    { required: true, message: 'Please enter your email' },
    { type: 'email', message: 'Please enter a valid email' },
  ],
  password: [
    { required: true, message: 'Please enter your password' },
    {
      validator: (_, value) => {
        if (!value) return Promise.resolve();
        const result = validatePassword(value);
        return result.valid ? Promise.resolve() : Promise.reject(result.message);
      },
    },
  ],
  required: [{ required: true, message: 'This field is required' }],
  name: [
    { required: true, message: 'Please enter a name' },
    { min: 2, message: 'Name must be at least 2 characters' },
  ],
};
