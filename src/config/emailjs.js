// EmailJS Configuration
// Dapatkan credentials ini dari https://www.emailjs.com/

export const EMAILJS_CONFIG = {
    SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID,
    TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
    TO_EMAIL: import.meta.env.VITE_EMAILJS_RECEIVER,
  };
  

// Template email yang disarankan:
/*
Subject: Pesan Baru dari Portfolio Website - {{subject}}

Nama: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Pesan:
{{message}}

---
Pesan ini dikirim dari portfolio website Anda.
*/ 