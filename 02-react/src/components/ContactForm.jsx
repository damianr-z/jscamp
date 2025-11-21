import { useState } from 'react';
import styles from './ContactForm.module.css';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    text: '',
    message: '',
  });

  // Validation function for real-time feedback (while typing)
  const validateForm = () => {
    const { name, email, text } = formData;

    // Clear message if name field is empty (regardless of other fields)
    if (name.trim() === '') {
      return ''; // Clear message when name is empty
    }

    // Only show error if user has started typing (not empty)
    if (name.trim().length > 0 && name.trim().length <= 3) {
      return 'Name must be more than 3 characters long';
    }

    // Don't show "required" errors while typing, only format errors
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.trim().length > 0 && !emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }

    return ''; // No errors to show
  };

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

      // Validate with the NEW values immediately
      const { name: nameValue, email: emailValue, text: textValue } = updated;

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

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <label htmlFor="name">Enter your name</label>
      <input
        autoComplete="off"
        required
        name="name"
        value={formData.name}
        type="text"
        id="name"
        placeholder="enter your name"
        onChange={handleChange}
      />

      <label htmlFor="email">Enter your email</label>
      <input
        autoComplete="off"
        className={styles.input}
        required
        name="email"
        value={formData.email}
        type="email"
        id="email"
        placeholder="enter your email"
        onChange={handleChange}
      />
      <label htmlFor="text">Enter your message</label>
      <textarea
        autoComplete="off"
        className={styles.input}
        required
        name="text"
        value={formData.text}
        rows={5}
        placeholder="Write your message"
        onChange={handleChange}
      />
      <button type="submit">Send</button>
      {formData.message && (
        <p
          className={`${styles.message} ${
            isSuccessMessage ? styles.messageSuccess : styles.messageError
          }`}
        >
          {formData.message}
        </p>
      )}
    </form>
  );
}
