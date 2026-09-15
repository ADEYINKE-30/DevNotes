import { addDoc, collection, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";

export interface ContactMessageInput {
  name: string;
  email: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
}

const contactMessagesCollection = collection(db, "contactMessages");
const emailJsApiUrl = "https://api.emailjs.com/api/v1.0/email/send";

const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const getEmailJsConfig = () => {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || "";
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "";
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "";

  if (!serviceId || !templateId || !publicKey) {
    return null;
  }

  return { serviceId, templateId, publicKey };
};

const sendContactEmail = async (input: ContactMessageInput) => {
  const config = getEmailJsConfig();

  if (!config) {
    return {
      success: false,
      message:
        "Email delivery is not configured yet. Add the EmailJS environment values and try again.",
    };
  }

  const response = await fetch(emailJsApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      service_id: config.serviceId,
      template_id: config.templateId,
      user_id: config.publicKey,
      template_params: {
        from_name: input.name,
        from_email: input.email,
        reply_to: input.email,
        message: input.message,
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();

    return {
      success: false,
      message: errorText || response.statusText || "Email provider rejected the request.",
    };
  }

  return {
    success: true,
    message: "Email sent successfully.",
  };
};

export const contactService = {
  async submitMessage(input: ContactMessageInput): Promise<ContactResponse> {
    const name = input.name.trim();
    const email = input.email.trim();
    const message = input.message.trim();

    // Keep validation close to the write so the UI gets one consistent response shape.
    if (!name || !email || !message) {
      return { success: false, message: "Please fill in all fields." };
    }

    if (!isValidEmail(email)) {
      return { success: false, message: "Please enter a valid email address." };
    }

    if (message.length < 10) {
      return { success: false, message: "Your message should be at least 10 characters long." };
    }

    const messageDoc = await addDoc(contactMessagesCollection, {
      name,
      email,
      message,
      status: "queued",
      createdAt: serverTimestamp(),
    });

    const emailResult = await sendContactEmail({ name, email, message });

    if (!emailResult.success) {
      await updateDoc(messageDoc, {
        status: "email_failed",
        deliveryError: emailResult.message,
      });

      return {
        success: false,
        message: "The message was saved, but email delivery failed. Please try again.",
      };
    }

    await updateDoc(messageDoc, {
      status: "sent",
      sentAt: serverTimestamp(),
    });

    return {
      success: true,
      message: "Message sent successfully. We’ll get back to you soon.",
    };
  },
};