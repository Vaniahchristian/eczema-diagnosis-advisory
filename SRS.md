# SOFTWARE REQUIREMENTS SPECIFICATION
## ECZEMA DIAGNOSIS AND ADVISORY SYSTEM
Version 1.1 approved
Prepared by BSE25-10
14th October 2024

## Team Members
| NAME | REGISTRATION NUMBER |
|------|-------------------|
| NALUGYA MERISA | 21/U/17292/PS |
| MUKISA VANIAH CHRISTIAN | 21/U/13176/EVE |
| AHEEBWOMUGISHA SASHA ANA | 21/U/12223/PS |
| ACAN BRENDA | 21/U/05295/EVE |

## Table of Contents
- [List of Figures](#list-of-figures)
- [List of Tables](#list-of-tables)
- [Revision History](#revision-history)
- [1.0 Introduction](#10-introduction)
- [2.0 Overall Description](#20-overall-description)
- [3.0 External Interface Requirements](#30-external-interface-requirements)
- [4.0 System Features](#40-system-features)
- [5.0 Other Nonfunctional Requirements](#50-other-nonfunctional-requirements)
- [6.0 Other Requirements](#60-other-requirements)
- [Appendices](#appendices)

## List of Figures
- Figure 1: Diagram showing major components and interconnections
- Figure 2: Class diagram of the system
- Figure 3: Sample of the patient dashboard

## List of Tables
- Table 1: A table showing intended users and reading suggestions
- Table 2: Use case narrative for Eczema Image Analysis and Diagnosis
- Table 3: Use case narrative for Healthcare provider Interaction and Consultation
- Table 4: Use case narrative for Eczema Advice and Treatment Recommendations

## Revision History
| Name | Date | Reason For Changes | Version |
|------|------|-------------------|----------|
| BSE25-10 | 14/10/2024 | Initial Document | 1.0 |
| BSE25-10 | 11/02/2025 | Updated user roles, technical specifications, and removed live chat feature | 1.1 |

## 1.0 Introduction
### 1.1 Purpose
This Software Requirements Specification (SRS) document specifies requirements for the Eczema Diagnosis and Advisory System which aims to assist healthcare providers and patients in diagnosing and managing eczema. This document covers the intended audience and reading suggestions, product scope, product perspective, product functions, user classes and characteristics, operating environment, design and implementation constraints, system features, non-functional requirements and other requirements.

### 1.2 Document Conventions
The document generally uses Times New Roman as the standard font, font-size 12 for the body and line spacing of 1.15. Bold is used for section titles and key terms.

### 1.3 Intended Audience and Reading Suggestions
| Intended User | Description and Reading Suggestions |
|--------------|-----------------------------------|
| Developers | The development team is responsible for implementing the system and uses this as a guide. Start with the System Architecture section for a high-level understanding of the system design, then move on to System Features, Use Cases, System Requirements, and External Interface Requirements to fully comprehend how the system functions. |
| End Users | Patients seeking advice and diagnosis for eczema, parents of children with eczema and healthcare professionals who assist patients, require clear explanations of how the system works, its benefits, and how it addresses their needs. |
| Project Supervisors | Begin with the Introduction and Overall Description for a big-picture view, followed by System Features and System Requirements to understand key milestones and deliverables. |
| Testers | Quality Assurance engineers and testers responsible for verifying the system's functionality need a detailed breakdown of system requirements and use cases. |
| Researchers | Start with the Introduction and Overall Description for a big-picture view, followed by System Features and System Requirements. |
| Documentation Writers | Writers need clear, structured information on system functions and user interactions. |

### 1.4 Product Scope
#### 1.4.1 Purpose
This system aims to ease diagnosis of eczema by leveraging user-provided data including skin images, symptoms, and medical history to provide an initial assessment and suggest treatment options.

#### 1.4.2 Goal
The system should ease eczema diagnosis, reduce treatment costs, provide treatment options, enable healthcare provider interaction, and provide recommendations about Eczema.

#### 1.4.3 Objectives
- Enable accurate eczema detection through ML-based image analysis
- Provide eczema management information and lifestyle recommendations
- Reduce diagnosis cost barriers
- Facilitate healthcare provider consultations

#### 1.4.4 Benefits
- Improved Accessibility
- Patient Education and Empowerment
- Reduced Healthcare Burden
- Research Data Collection
- Accurate Diagnosis through ML

### 1.5 References
- National Eczema Association. (2021). 'What is Eczema?'
- European Union. (2018). 'General Data Protection Regulation (GDPR)'
- Health Level Seven International (HL7) (2021). 'FHIR Overview'

## 2.0 Overall Description
### 2.1 Product Perspective
The system is a new software application leveraging machine learning for eczema diagnosis and management.

### 2.2 Product Functions
- Data capture
- Machine Learning-Based Diagnosis
- Treatment Recommendations
- Advisory Services
- Healthcare Professional Communication
- Data Privacy and Security

### 2.3 User Classes and Characteristics
#### Patients (Primary Users)
The system should provide patients with a personal dashboard where they can:
- Manage profiles (personal details, medical history)
- View past diagnoses
- Track symptoms and treatment progress
- Log improvements or worsening conditions

#### Healthcare Professionals
The system shall primarily function as a self-assessment and advisory tool, offering:
- Patient insights based on uploaded images
- Symptom descriptions
- Educational content
- Treatment guidance
- Structured reports for professional evaluation

#### System Administrators
Administrators shall:
- Manage user accounts
- Ensure system security
- Monitor data processing
- Maintain system logs
- Track user activity
- Ensure compliance

### 2.4 Operating Environment
#### Server Infrastructure
- Cloud-based server with high availability
- Minimum Requirements:
  - 4 CPU cores
  - 6GB RAM
  - 120GB SSD (RAID 10)
  - 3000GB bandwidth
- Dynamic resource scaling

#### Platforms
- Web: Chrome, Firefox, Edge
- Mobile: Android
- Desktop: Windows, MacOS

### 2.5 Design and Implementation Constraints
- Regulatory Compliance (HIPAA, GDPR)
- AES-256 encryption
- Hardware Limitations
- Third-Party Integration
- ML Framework Compatibility

### 2.6 User Documentation
- User Manual
- Online Help
- FAQ Section
- Quick Start Guide

### 2.7 Assumptions and Dependencies
#### 2.7.1 Assumptions
- Users have internet-enabled devices
- Users have stable internet connection
- Users have basic digital literacy
- Users can provide quality images

#### 2.7.2 Dependencies
- TensorFlow/PyTorch for ML
- MySQL/MongoDB for data storage
- Cloud infrastructure

## 3.0 External Interface Requirements
### 3.1 User Interfaces
#### Logical Characteristics
- Separate interfaces for patients and providers
- Healthcare UI/UX standards
- Neutral color palette
- Standardized components

#### Screen Layout
- Patient Dashboard
- Image Upload Interface
- Diagnosis Results View
- Treatment Recommendations
- Educational Content

### 3.2 Hardware Interfaces
- Mobile device cameras
- Desktop/laptop computers
- Network interfaces

### 3.3 Software Interfaces
#### AI/ML Integration
- TensorFlow/PyTorch
- Pre-trained CNNs (ResNet, EfficientNet, MobileNet)
- Cloud AI platforms (Google Cloud, AWS, Azure)

#### Database Integration
- MySQL for structured data
- MongoDB for unstructured data
- Real-time synchronization

### 3.4 Communications Interfaces
#### Protocols
- WebSockets for real-time communication
- MQTT for messaging
- HTTPS for web access
- RESTful APIs

#### Message Formatting
- Standardized chat format
- Structured diagnosis reports (PDF/JSON)
- Secure data transmission

## 4.0 System Features
### 4.1 Eczema Image Analysis and Diagnosis
#### Process Steps
1. Preprocessing
   - Image resize and normalization
   - Quality enhancement
2. Feature Extraction
   - CNN pattern detection
   - Symptom identification
3. Classification
   - Severity assessment
   - Confidence scoring
4. Results Generation
   - Structured reporting
   - Treatment recommendations

### 4.2 Healthcare Provider Interaction
- Asynchronous messaging
- Report sharing
- Appointment scheduling
- Treatment tracking

### 4.3 Treatment Recommendations
- Personalized advice
- Lifestyle adjustments
- Medication information
- Progress tracking

## 5.0 Other Nonfunctional Requirements
### 5.1 Performance Requirements
- 10-15 second diagnosis time
- 12-second notification delivery
- 500 concurrent user support

### 5.2 Safety Requirements
- Medical advice disclaimers
- Data integrity checks
- Quality validation

### 5.3 Security Requirements
- User authentication
- Data encryption
- Access control

### 5.4 Software Quality Attributes
- 98% reliability
- Intuitive interface
- Modular architecture

### 5.5 Business Rules
- Free access model
- Role-based permissions

## 6.0 Other Requirements
- Data Backup
- Scalability
- Interoperability

## Appendices
### Appendix A: Glossary
| Term | Definition |
|------|------------|
| HIPAA | Health Insurance Portability and Accountability Act |
| GDPR | General Data Protection Regulation |
| TLS | Transport Layer Security |
| JPEG/PNG | Image formats |

### Appendix B: Analysis Models
[To be completed]

### Appendix C: To Be Determined List
- TBD-1: Performance Benchmarks
- TBD-2: ML Algorithm Selection
- TBD-3: Authentication Protocols
- TBD-4: External System Integration
