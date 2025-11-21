import { useState } from 'react';

export function useContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    text: '',
    message: '',
  });

  // Validation function for form submission (strict)
  const validateFormSubmit = () => {
    const { name, email, text } = formData;

    // On submit, check if empty first
    if (!name.trim()) {
      return 'Please enter your name';
    }

    // Then check length
    if (name.trim().length <= 3) {
      return 'Name must be more than 3 characters long';
    }

    if (!email.trim()) {
      return 'Please enter your email';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }

    if (!text.trim()) {
      return 'Please enter your message';
    }

    return null; // No errors
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    // Update the field value AND validate in one update
    setFormData((prev) => {
      const updated = {
        ...prev,
        [name]: value,
      };

      // Clear message if name field is empty
      if (name === 'name' && value.trim() === '') {
        return { ...updated, message: '' };
      }

      // Check name length validation
      if (
        name === 'name' &&
        value.trim().length > 0 &&
        value.trim().length <= 3
      ) {
        return {
          ...updated,
          message: 'Name must be more than 3 characters long',
        };
      }

      // Check email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (
        name === 'email' &&
        value.trim().length > 0 &&
        !emailRegex.test(value)
      ) {
        return { ...updated, message: 'Please enter a valid email address' };
      }

      // Clear message if validation passes
      return { ...updated, message: '' };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Strict validation on submit (includes "required" checks)
    const error = validateFormSubmit();

    if (error) {
      setFormData((prev) => ({
        ...prev,
        message: error,
      }));
      return; // Stop submission
    }

    // All validation passed - clear form and show success
    setFormData({
      name: '',
      email: '',
      text: '',
      message: '',
    });

    // Show success message after 1 second
    setTimeout(() => {
      setFormData((prev) => ({
        ...prev,
        message: 'Your form has been successfully submitted!',
      }));
    }, 1000);

    // Clear the message after 6 seconds (1s delay + 5s visible)
    setTimeout(() => {
      setFormData((prev) => ({
        ...prev,
        message: '',
      }));
    }, 6000);
  };

  // Determine if message is success or error
  const isSuccessMessage = formData.message.includes('successfully');

  return {
    // State
    formData,

    // Computed Values
    isSuccessMessage,

    // Handlers
    handleChange,
    handleSubmit,
  };
}
