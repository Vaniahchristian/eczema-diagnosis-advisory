# Eczema Diagnosis and Advisory System

A comprehensive web-based platform for eczema diagnosis, monitoring, and treatment management.

## Features

- **AI-Powered Eczema Analysis**: Upload and analyze images for eczema detection and severity assessment
- **Virtual Consultations**: Connect with healthcare providers through secure video calls and chat
- **Treatment Tracking**: Monitor symptoms, triggers, and treatment effectiveness
- **Personalized Advice**: Receive customized treatment recommendations
- **Secure Data Management**: HIPAA-compliant data storage and handling

## Technology Stack

- **Frontend**: React.js, TailwindCSS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **AI/ML**: TensorFlow.js for image analysis
- **Real-time Communication**: WebRTC, Socket.io
- **Security**: JWT authentication, data encryption

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/eczema-diagnosis-advisory.git
   cd eczema-diagnosis-advisory
   ```

2. Install dependencies:
   ```bash
   npm install
   cd backend
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the backend directory with:
   ```
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

4. Start the development servers:
   ```bash
   # Start backend server
   cd backend
   npm start

   # In a new terminal, start frontend
   cd ..
   npm start
   ```

## Usage

1. Register as a patient or healthcare provider
2. Upload eczema images for analysis
3. Track symptoms and treatment progress
4. Schedule virtual consultations
5. Receive personalized treatment recommendations

## Security and Privacy

- End-to-end encryption for all communications
- Role-based access control
- Regular security audits
- HIPAA-compliant data handling

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
