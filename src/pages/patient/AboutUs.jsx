// src/pages/AboutUs.jsx
import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const AboutUs = () => {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-64 flex items-center justify-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1593642532400-2682810df593?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')" }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>
        {/* Content */}
        <div className="relative text-center text-white">
          <h1 className="text-4xl font-bold">About Eczema Advisory</h1>
          <p className="mt-2 text-lg">Your Partner in Managing Eczema</p>
        </div>
      </section>

      {/* Our Mission */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Our Mission</h2>
        <p className="text-gray-700 dark:text-gray-300 text-lg leading-7">
          At Eczema Advisory, our mission is to empower individuals with eczema by providing accurate diagnoses, personalized treatment plans, and comprehensive educational resources. We strive to improve the quality of life for those affected by eczema through innovative technology and compassionate care.
        </p>
      </section>

      {/* Our Story */}
      <section className="bg-gray-50 dark:bg-gray-700 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-8 items-center">
          {/* Image */}
          <div>
            <img
              src="/eczma.jpg"
              alt="Our Story"
              className="rounded-lg shadow-lg w-full h-80 object-cover"
            />
          </div>
          {/* Content */}
          <div>
            <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Our Story</h2>
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-7">
              Founded in 2024 by a group of passionate dermatologists and technologists, Eczema Advisory was born out of a shared vision to revolutionize eczema care. Recognizing the challenges faced by individuals in managing their condition, our team set out to create a platform that offers seamless diagnosis, effective treatments, and invaluable educational content.
            </p>
            <p className="mt-4 text-gray-700 dark:text-gray-300 text-lg leading-7">
              Leveraging cutting-edge AI technology, we aim to provide accurate and timely diagnoses, empowering users to take control of their skin health. Our commitment to continuous research and user-centric design drives us to innovate and adapt, ensuring that Eczema Advisory remains at the forefront of eczema management solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-8 text-center">Meet the Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Team Member 1 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col items-center">
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="Nalugya Mellisa"
              className="w-32 h-32 rounded-full object-cover mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Nalugya Mellisa</h3>
            <p className="text-gray-600 dark:text-gray-400">Chief Dermatologist</p>
            <div className="flex space-x-3 mt-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-blue-500">
                <FaFacebookF />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-blue-400">
                <FaTwitter />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-blue-700">
                <FaLinkedinIn />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-pink-500">
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* Team Member 2 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col items-center">
            <img
              src="https://randomuser.me/api/portraits/women/68.jpg"
              alt="Acan Ruth"
              className="w-32 h-32 rounded-full object-cover mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Acan Ruth</h3>
            <p className="text-gray-600 dark:text-gray-400">Lead Developer</p>
            <div className="flex space-x-3 mt-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-blue-500">
                <FaFacebookF />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-blue-400">
                <FaTwitter />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-blue-700">
                <FaLinkedinIn />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-pink-500">
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* Team Member 3 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col items-center">
            <img
              src="https://randomuser.me/api/portraits/women/68.jpg"
              alt="Sasha Anna"
              className="w-32 h-32 rounded-full object-cover mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Sasha Anna</h3>
            <p className="text-gray-600 dark:text-gray-400">UX/UI Designer</p>
            <div className="flex space-x-3 mt-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-blue-500">
                <FaFacebookF />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-blue-400">
                <FaTwitter />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-blue-700">
                <FaLinkedinIn />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-pink-500">
                <FaInstagram />
              </a>
            </div>

            
          </div>







          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col items-center">
            <img
              src="https://randomuser.me/api/portraits/men/68.jpg"
              alt="Mukisa Vaniah"
              className="w-32 h-32 rounded-full object-cover mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Mukisa Vaniah</h3>
            <p className="text-gray-600 dark:text-gray-400">UX/UI Designer</p>
            <div className="flex space-x-3 mt-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-blue-500">
                <FaFacebookF />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-blue-400">
                <FaTwitter />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-blue-700">
                <FaLinkedinIn />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-pink-500">
                <FaInstagram />
              </a>
            </div>

            
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="bg-gray-50 dark:bg-gray-700 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-8 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Value 1 */}
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-teal-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Compassion</h3>
                <p className="mt-2 text-gray-700 dark:text-gray-300">
                  We approach every user with empathy and understanding, recognizing the challenges they face in managing eczema.
                </p>
              </div>
            </div>

            {/* Value 2 */}
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-teal-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6M9 16h6M9 8h6m-3-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Innovation</h3>
                <p className="mt-2 text-gray-700 dark:text-gray-300">
                  We leverage the latest technologies to provide cutting-edge solutions for eczema management and education.
                </p>
              </div>
            </div>

            {/* Value 3 */}
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-teal-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6l4 2" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Integrity</h3>
                <p className="mt-2 text-gray-700 dark:text-gray-300">
                  We maintain the highest standards of honesty and ethics in all our interactions and services.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      

    

      {/* Call to Action */}
      <section className="bg-teal-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-semibold mb-4">Join Our Community</h2>
          <p className="mb-6">
            Stay updated with the latest in eczema research, treatment options, and community support.
          </p>
          <a
            href="/signup"
            className="inline-block bg-white text-teal-600 font-semibold px-6 py-3 rounded-md shadow hover:bg-gray-100"
          >
            Sign Up Now
          </a>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
