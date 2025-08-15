import { useState } from 'react';

const useContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit contact form
  const submitForm = async (e) => {
    e.preventDefault();
    
    // Reset states
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Validate form data
      if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
        throw new Error('All fields are required');
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error('Please enter a valid email address');
      }

      // Create FormData for FormSubmit.co
      const formDataToSubmit = new FormData();
      formDataToSubmit.append('name', formData.name);
      formDataToSubmit.append('email', formData.email);
      formDataToSubmit.append('message', formData.message);
      formDataToSubmit.append('_subject', `Portfolio Contact: Message from ${formData.name}`);
      formDataToSubmit.append('_captcha', 'false'); // Disable captcha for better UX
      formDataToSubmit.append('_template', 'table'); // Use table template for better formatting

      // Submit to FormSubmit.co - replace with your email
      const response = await fetch('https://formsubmit.co/phyominthein.leo@gmail.com', {
        method: 'POST',
        body: formDataToSubmit,
      });

      if (response.ok) {
        setSuccess(true);
        // Reset form
        setFormData({
          name: '',
          email: '',
          message: '',
        });
      } else {
        throw new Error('Failed to send message. Please try again.');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Reset form states
  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      message: '',
    });
    setSuccess(false);
    setError(null);
    setLoading(false);
  };

  return {
    formData,
    loading,
    success,
    error,
    handleChange,
    submitForm,
    resetForm,
  };
};

export default useContactForm;
