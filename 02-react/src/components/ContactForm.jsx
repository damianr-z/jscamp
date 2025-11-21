import styles from './ContactForm.module.css';
import { useContactForm } from '../hooks/useContactForm';

export function ContactForm() {
  const { formData, isSuccessMessage, handleChange, handleSubmit } = useContactForm();

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
