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
              src="https://images.unsplash.com/photo-1582719478250-9ef3f9e18e3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80"
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
                <svg className="h-6 w-6 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                <svg className="h-6 w-6 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                <svg className="h-6 w-6 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

      {/* Contact Information */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-8 text-center">Get in Touch</h2>
        <div className="flex flex-col md:flex-row justify-center items-center md:space-x-12 space-y-6 md:space-y-0">
          {/* Address */}
          <div className="flex items-center space-x-4">
            <svg className="h-6 w-6 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Our Office</h3>
              <p className="text-gray-600 dark:text-gray-300">1234 Eczema Street, Dermaville, SK 56789</p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center space-x-4">
            <svg className="h-6 w-6 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12v8a4 4 0 01-4 4H8a4 4 0 01-4-4v-8m16 0l-8-8-8 8" />
            </svg>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Email Us</h3>
              <p className="text-gray-600 dark:text-gray-300">support@eczemaadvisory.com</p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-center space-x-4">
            <svg className="h-6 w-6 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.12 3.36a1 1 0 01-.165.948l-2.688 2.688a16.054 16.054 0 006.63 6.63l2.688-2.688a1 1 0 01.948-.165l3.36 1.12a1 1 0 01.684.948V19a2 2 0 01-2 2h-2C7.373 21 3 16.627 3 11V5z" />
            </svg>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Call Us</h3>
              <p className="text-gray-600 dark:text-gray-300">+1 (234) 567-8901</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-50 dark:bg-gray-700 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-8 text-center">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <p className="text-gray-700 dark:text-gray-300 italic mb-4">
                "Eczema Advisory has been a game-changer for me. The accurate diagnoses and personalized treatment plans have significantly improved my skin health."
              </p>
              <div className="flex items-center">
                <img
                  src="https://randomuser.me/api/portraits/women/65.jpg"
                  alt="User 1"
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Emily R.</h4>
                  <p className="text-gray-500 dark:text-gray-400">New York, USA</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <p className="text-gray-700 dark:text-gray-300 italic mb-4">
                "The educational content provided by Eczema Advisory is comprehensive and easy to understand. It has empowered me to manage my condition effectively."
              </p>
              <div className="flex items-center">
                <img
                  src="https://randomuser.me/api/portraits/men/45.jpg"
                  alt="User 2"
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Michael S.</h4>
                  <p className="text-gray-500 dark:text-gray-400">London, UK</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <p className="text-gray-700 dark:text-gray-300 italic mb-4">
                "The support team at Eczema Advisory is incredibly responsive and helpful. They guided me through every step of my treatment journey."
              </p>
              <div className="flex items-center">
                <img
                  src="https://randomuser.me/api/portraits/women/55.jpg"
                  alt="User 3"
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Sophia L.</h4>
                  <p className="text-gray-500 dark:text-gray-400">Sydney, Australia</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-indigo-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-semibold mb-4">Join Our Community</h2>
          <p className="mb-6">
            Stay updated with the latest in eczema research, treatment options, and community support.
          </p>
          <a
            href="/signup"
            className="inline-block bg-white text-indigo-600 font-semibold px-6 py-3 rounded-md shadow hover:bg-gray-100"
          >
            Sign Up Now
          </a>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
