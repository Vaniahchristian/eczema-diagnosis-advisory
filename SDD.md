# Eczema Diagnosis and Advisory System
## Software Design Document

## 1. Introduction

### 1.1 Overview

The Eczema Diagnosis and Advisory System is a comprehensive platform designed to assist patients and doctors in diagnosing and managing eczema. The system utilizes machine learning algorithms to analyze images of skin conditions and provide accurate diagnoses and treatment recommendations.

### 1.2 Goals and Objectives

* Provide an accurate and efficient diagnosis of eczema
* Offer personalized treatment recommendations
* Facilitate communication between patients and doctors
* Ensure data security and confidentiality

## 2. System Architecture

### 2.1 Overview

The system consists of the following components:

* Frontend: React.js 18.0
* Backend: Node.js 16.x
* Databases: MySQL 8.0, MongoDB 5.0
* ML: TensorFlow 2.x
* Cloud: Google Cloud Platform
* Storage: Google Cloud Storage

### 2.2 Component Interactions

* The frontend interacts with the backend through RESTful APIs
* The backend interacts with the databases to store and retrieve data
* The ML model is integrated with the backend to analyze images and provide diagnoses
* The cloud platform provides scalability and reliability

## 3. Data Design

### 3.1 Data Description

#### 3.1.1 Data Flow and Processing

##### User Data Management

1. **Registration and Profile**
   - Users register with email and password
   - Profile creation with personal details
   - Medical history submission
   - Authentication details stored in MySQL
   - Profile data encrypted using AES-256

2. **Image Processing Workflow**
   - **Image Upload**
     - Direct upload from device
     - Capture via device camera
     - Supported formats: JPEG, PNG
     - Maximum size: 10MB

   - **Preprocessing**
     - Image resizing to 224x224 pixels
     - Normalization of pixel values
     - Quality assessment
     - Metadata extraction

   - **Analysis and Diagnostic Output**
     - ML model assessment
     - Quality validation
     - Confidence score generation
     - Automatic resubmission request if quality insufficient

   - **Post-processing**
     - Diagnosis report generation
     - Treatment recommendation compilation
     - Storage of results

3. **Data Storage Architecture**
   - **User Data Storage**
     - MySQL for structured data
     - Encrypted at rest
     - Regular backups
   
   - **Image Storage**
     - Google Cloud Storage
     - Original and processed versions
     - Metadata in MongoDB
   
   - **Diagnostic Data**
     - MongoDB for flexible schema
     - Linked to user profiles
     - Version controlled

#### 3.1.2 Database Schema Design

1. **Users Table (MySQL)**
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('patient', 'doctor', 'admin') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

2. **Patient Profiles (MySQL)**
```sql
CREATE TABLE patient_profiles (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    name VARCHAR(255) NOT NULL,
    date_of_birth DATE NOT NULL,
    contact_number VARCHAR(20),
    medical_history TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

3. **Diagnoses (MongoDB)**
```json
{
    "_id": "ObjectId",
    "patient_id": "UUID",
    "image_data": {
        "original_url": "String",
        "processed_url": "String",
        "upload_date": "ISODate",
        "metadata": {
            "size": "Number",
            "format": "String",
            "dimensions": {
                "width": "Number",
                "height": "Number"
            }
        }
    },
    "diagnosis": {
        "severity": "String",
        "confidence_score": "Float",
        "symptoms": ["String"],
        "affected_areas": ["String"]
    },
    "recommendations": {
        "treatments": ["String"],
        "lifestyle_changes": ["String"],
        "follow_up": "String"
    },
    "doctor_comments": "String",
    "created_at": "ISODate",
    "updated_at": "ISODate"
}
```

### 3.2 Data Dictionary

#### Core Entities

1. **User**
   - `id`: UUID - Primary identifier
   - `email`: String - User's email address
   - `password_hash`: String - Encrypted password
   - `role`: Enum - User type (patient/doctor/admin)
   - `created_at`: Timestamp - Account creation date
   - `updated_at`: Timestamp - Last update time

2. **PatientProfile**
   - `id`: UUID - Profile identifier
   - `user_id`: UUID - Reference to user
   - `name`: String - Patient's full name
   - `date_of_birth`: Date - Birth date
   - `contact_number`: String - Phone number
   - `medical_history`: Text - Health background

3. **Diagnosis**
   - `id`: ObjectId - Diagnosis identifier
   - `patient_id`: UUID - Reference to patient
   - `image_data`: Object - Image information
   - `diagnosis`: Object - Analysis results
   - `recommendations`: Object - Treatment plan
   - `doctor_comments`: String - Professional notes

#### Function Parameters

1. **Image Processing**
   ```python
   preprocess_image(
       image: Binary,           # Raw image data
       target_size: Tuple,      # Required dimensions
       quality_threshold: Float  # Minimum quality score
   ) -> Dict[str, Any]         # Processed image data
   ```

2. **Diagnosis Generation**
   ```python
   generate_diagnosis(
       processed_image: Array,  # Preprocessed image
       patient_data: Dict,      # Patient information
       model_version: String    # ML model identifier
   ) -> Dict[str, Any]         # Diagnosis results
   ```

## 4. Component Design

### 4.1 Core Components

#### 4.1.1 Image Processing Component
```python
class ImageProcessor:
    def preprocess_image(self, image: Binary) -> Dict:
        """
        Preprocess uploaded image for analysis
        """
        try:
            # Validate image format
            if not self._validate_format(image):
                raise InvalidFormatError
                
            # Resize image
            resized = self._resize_image(image, (224, 224))
            
            # Normalize pixels
            normalized = self._normalize_pixels(resized)
            
            # Check quality
            quality_score = self._assess_quality(normalized)
            if quality_score < self.QUALITY_THRESHOLD:
                raise QualityTooLowError
                
            return {
                'processed_image': normalized,
                'quality_score': quality_score,
                'metadata': self._extract_metadata(image)
            }
        except Exception as e:
            log_error(e)
            raise ProcessingError(str(e))
```

#### 4.1.2 Diagnosis Component
```python
class DiagnosisGenerator:
    def generate_diagnosis(self, processed_image: Array) -> Dict:
        """
        Generate eczema diagnosis from processed image
        """
        try:
            # Load ML model
            model = self._load_model()
            
            # Generate prediction
            prediction = model.predict(processed_image)
            
            # Process results
            diagnosis = {
                'severity': self._determine_severity(prediction),
                'confidence': self._calculate_confidence(prediction),
                'affected_areas': self._identify_areas(prediction),
                'recommendations': self._generate_recommendations(prediction)
            }
            
            return diagnosis
        except Exception as e:
            log_error(e)
            raise DiagnosisError(str(e))
```

## 5. Human Interface Design

### 5.1 User Interface Overview

#### 5.1.1 Patient Interface

1. **Dashboard**
   - Recent diagnoses summary
   - Upcoming appointments
   - Treatment progress tracker
   - Quick actions menu

2. **Image Upload**
   - Drag-and-drop area
   - Camera access button
   - Image preview
   - Upload progress indicator

3. **Diagnosis Results**
   - Image comparison (original vs. analyzed)
   - Severity indicator
   - Confidence score
   - Treatment recommendations
   - Appointment booking option

#### 5.1.2 Doctor Interface

1. **Patient Management**
   - Patient list
   - Search and filter options
   - Patient history viewer
   - Appointment calendar

2. **Diagnosis Review**
   - Image analysis results
   - Comment section
   - Treatment recommendation tools
   - Patient communication options

### 5.2 Screen Objects and Actions

#### 5.2.1 Image Upload Screen

**Objects:**
- Image upload area (draggable)
- Camera button
- Preview panel
- Submit button
- Quality indicators

**Actions:**
- Drag and drop image
- Take photo
- Preview uploaded image
- Submit for analysis
- Retake/reupload if quality insufficient

#### 5.2.2 Diagnosis Results Screen

**Objects:**
- Original image display
- Analyzed image display
- Severity indicator (color-coded)
- Confidence score meter
- Treatment recommendations list
- Appointment booking button

**Actions:**
- View full-size images
- Toggle between original/analyzed views
- Expand treatment details
- Schedule appointment
- Download diagnosis report
- Share results with doctor

## 6. Requirements Matrix

| Requirement ID | Component | Implementation | Status | Priority |
|---------------|-----------|----------------|--------|----------|
| FR101 | Image Upload | ImageProcessor.preprocess_image() | Complete | High |
| FR102 | Quality Check | ImageProcessor._assess_quality() | Complete | High |
| FR103 | ML Analysis | DiagnosisGenerator.generate_diagnosis() | In Progress | High |
| FR104 | Results Display | DiagnosisResultsComponent | Complete | High |
| FR201 | Doctor Search | DoctorSearchService | Complete | Medium |
| FR202 | Appointments | AppointmentManager | Complete | Medium |
| FR301 | Treatment Advice | TreatmentAdvisor | Complete | Medium |
| FR302 | Education Content | ContentManager | Complete | Low |

## 7. Appendices

### A. Technology Stack
- Frontend: React.js 18.0
- Backend: Node.js 16.x
- Databases: MySQL 8.0, MongoDB 5.0
- ML: TensorFlow 2.x
- Cloud: Google Cloud Platform
- Storage: Google Cloud Storage

### B. Security Implementation
- AES-256 encryption
- TLS 1.3 protocol
- JWT authentication
- Role-based access control
- Regular security audits

### C. Performance Benchmarks
- Image processing: < 5s
- API response: < 2s
- Concurrent users: 500+
- Uptime: 99.9%
- Storage: Unlimited
