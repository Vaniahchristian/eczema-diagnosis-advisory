graph TB
    subgraph Client Layer
        UI[User Interface]
        subgraph Dashboards
            PD[Patient Dashboard]
            DD[Doctor Dashboard]
            AD[Admin Dashboard]
        end
    end

    subgraph Core Components
        subgraph Image Processing
            IC[Image Capture]
            IP[Image Pre-processing]
            FE[Feature Extraction]
        end

        subgraph Diagnosis System
            ML[ML Model]
            DG[Diagnosis Generator]
            TR[Treatment Recommendations]
        end

        subgraph Advisory System
            LT[Lifestyle Tips]
            CT[Care Tips]
            TG[Trigger Guidelines]
        end

        subgraph Analytics Engine
            AG[Age Distribution]
            GD[Geographic Distribution]
            TM[Treatment Metrics]
            CS[Confidence Scores]
        end
    end

    subgraph Healthcare Services
        AP[Appointment Scheduling]
        DC[Doctor Consultations]
    end

    subgraph Data Management
        subgraph MySQL DB
            PDB[(Patient Data)]
            ADB[(Appointment Data)]
        end
        
        subgraph MongoDB
            KB[(Knowledge Base)]
            ML_LOG[(ML Model Logs)]
        end
        
        GCS[(Google Cloud Storage)]
    end

    subgraph Security Layer
        Auth[Authentication]
        RBAC[Role-Based Access]
        Enc[Data Encryption]
    end

    %% Connections
    UI --> Auth
    Auth --> |Verify| RBAC
    RBAC --> Core Components
    RBAC --> Healthcare Services

    IC --> IP
    IP --> FE
    FE --> ML
    ML --> DG
    DG --> TR

    DG --> KB
    TR --> KB
    
    IC --> GCS
    PD --> IC
    PD --> AP
    DD --> DC

    %% Analytics Connections
    PDB --> Analytics Engine
    KB --> Analytics Engine
    ML_LOG --> Analytics Engine

    %% Style Definitions
    classDef client fill:#e6f3ff,stroke:#333,stroke-width:2px
    classDef core fill:#f9f9f9,stroke:#333,stroke-width:2px
    classDef security fill:#ffe6e6,stroke:#333,stroke-width:2px
    classDef data fill:#e6ffe6,stroke:#333,stroke-width:2px

    class UI,PD,DD,AD client
    class IC,IP,FE,ML,DG,TR,LT,CT,TG,AG,GD,TM,CS core
    class Auth,RBAC,Enc security
    class PDB,ADB,KB,ML_LOG,GCS data

# Eczema Diagnosis and Advisory System Architecture

## Overview
This diagram represents the modular architecture of the Eczema Diagnosis and Advisory System as specified in the SDD document. The system is divided into independent, self-contained modules that handle specific functionalities through well-defined APIs.

## Key Components

### Client Layer
- User Interface with Patient, Doctor, and Admin Dashboards
- Handles user interactions and data presentation

### Core Components
1. Image Processing
   - Image Capture: Upload/capture images
   - Pre-processing: Resizing, noise reduction, contrast adjustment
   - Feature Extraction: Edge detection and segmentation

2. Diagnosis System
   - ML Model: TensorFlow-based eczema detection
   - Diagnosis Generator: Results and confidence scores
   - Treatment Recommendations: Customized treatment plans

3. Advisory System
   - Lifestyle Tips
   - Care Tips
   - Trigger Guidelines

4. Analytics Engine
   - Age Distribution Analysis
   - Geographic Distribution
   - Treatment Metrics
   - Model Confidence Scores

### Data Management
- MySQL: Structured data (patient profiles, appointments)
- MongoDB: Unstructured data (knowledge base, ML logs)
- Google Cloud Storage: Image storage

### Security Layer
- Authentication using OAuth 2.0 and JWT
- Role-Based Access Control
- Data Encryption (HIPAA/GDPR compliant)

## Integration Points
- Healthcare Services Integration
- ML Model Integration
- Cloud Storage Integration
- Database Connections
