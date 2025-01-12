import React from 'react';

const FAQ = () => {
  const faqItems = [
    {
      question: "How does the eczema diagnosis work?",
      answer: "Our system uses machine learning to analyze images of your skin. You upload an image, and the system provides an initial diagnosis with recommendations based on that analysis.",
    },
    {
      question: "Can I trust the diagnosis?",
      answer: "The diagnosis provided by the system is an initial assessment. We recommend consulting a healthcare provider for a confirmed diagnosis and treatment plan.",
    },
    {
      question: "How can I consult a doctor?",
      answer: "You can use the 'Consult a Doctor' feature to schedule a virtual appointment with a healthcare provider. This option is available after you receive a diagnosis.",
    },
    {
      question: "Is my data safe?",
      answer: "Yes, we follow strict data privacy standards including encryption and secure storage in compliance with HIPAA and GDPR regulations.",
    },
    {
      question: "How do I get notifications?",
      answer: "Notifications are sent for important updates, such as new diagnosis results or messages from healthcare providers. You can view all notifications in the Notifications section.",
    },
  ];

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-teal-500 mb-4">Frequently Asked Questions</h1>
      <div className="space-y-4">
        {faqItems.map((item, index) => (
          <div key={index} className="border-b pb-4">
            <h2 className="text-lg font-semibold text-gray-800">{item.question}</h2>
            <p className="text-gray-600 mt-2">{item.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
