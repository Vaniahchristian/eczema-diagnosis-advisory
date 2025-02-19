# Entity Relationship Diagram - Eczema Diagnosis and Advisory System

```mermaid
erDiagram
    USER {
        UUID user_id PK
        string email
        string password_hash
        string full_name
        string role
        datetime created_at
        boolean is_active
    }

    PATIENT {
        UUID patient_id PK
        UUID user_id FK
        string medical_history
        date date_of_birth
        string contact_number
        datetime last_visit
    }

    DOCTOR {
        UUID doctor_id PK
        UUID user_id FK
        string specialization
        string license_number
        string availability_hours
        boolean is_verified
    }

    IMAGE {
        UUID image_id PK
        UUID patient_id FK
        string image_url
        datetime uploaded_at
        string image_type
        float quality_score
    }

    DIAGNOSIS {
        UUID diagnosis_id PK
        UUID image_id FK
        UUID patient_id FK
        string condition_type
        float confidence_score
        text diagnosis_details
        datetime created_at
        UUID doctor_id FK
    }

    APPOINTMENT {
        UUID appointment_id PK
        UUID patient_id FK
        UUID doctor_id FK
        datetime appointment_date
        string status
        string reason
        datetime created_at
        datetime updated_at
    }

    TREATMENT {
        UUID treatment_id PK
        UUID diagnosis_id FK
        UUID doctor_id FK
        text treatment_plan
        text medications
        datetime start_date
        datetime end_date
        string status
    }

    NOTIFICATION {
        UUID notification_id PK
        UUID user_id FK
        string type
        string message
        boolean is_read
        datetime created_at
    }

    MESSAGE {
        UUID message_id PK
        UUID sender_id FK
        UUID receiver_id FK
        text content
        datetime sent_at
        boolean is_read
    }

    USER_METRICS {
        UUID metric_id PK
        datetime timestamp
        int total_users
        int active_daily
        int active_weekly
        int active_monthly
        int new_registrations
        float retention_rate
        jsonb demographic_data
    }

    DIAGNOSIS_ANALYTICS {
        UUID analytic_id PK
        UUID diagnosis_id FK
        string severity_level
        string body_area
        float confidence_score
        int diagnosis_count
        datetime created_at
        jsonb location_data
    }

    TREATMENT_ANALYTICS {
        UUID analytic_id PK
        UUID treatment_id FK
        string treatment_type
        float effectiveness_score
        float adherence_rate
        int recommendation_count
        datetime created_at
        jsonb feedback_data
    }

    APPOINTMENT_ANALYTICS {
        UUID analytic_id PK
        UUID appointment_id FK
        boolean completed
        int wait_time_minutes
        datetime scheduled_time
        datetime actual_time
        string cancellation_reason
        jsonb availability_data
    }

    SYSTEM_PERFORMANCE {
        UUID metric_id PK
        float processing_time
        float api_response_time
        float uptime_percentage
        int error_count
        string service_name
        datetime timestamp
        jsonb performance_data
    }

    GEOSPATIAL_METRICS {
        UUID metric_id PK
        string location
        int case_count
        string severity_distribution
        float prevalence_rate
        datetime timestamp
        jsonb geographic_data
    }

    USER ||--o{ PATIENT : "has"
    USER ||--o{ DOCTOR : "has"
    PATIENT ||--o{ IMAGE : "uploads"
    PATIENT ||--o{ APPOINTMENT : "books"
    DOCTOR ||--o{ APPOINTMENT : "manages"
    IMAGE ||--|| DIAGNOSIS : "generates"
    DIAGNOSIS ||--o{ TREATMENT : "requires"
    DOCTOR ||--o{ TREATMENT : "prescribes"
    USER ||--o{ NOTIFICATION : "receives"
    USER ||--o{ MESSAGE : "sends"
    PATIENT ||--o{ DIAGNOSIS : "has"
    DOCTOR ||--o{ DIAGNOSIS : "reviews"
    DIAGNOSIS ||--o{ DIAGNOSIS_ANALYTICS : "generates"
    TREATMENT ||--o{ TREATMENT_ANALYTICS : "produces"
    APPOINTMENT ||--o{ APPOINTMENT_ANALYTICS : "tracks"
    USER ||--o{ USER_METRICS : "measures"
    SYSTEM_PERFORMANCE ||--o{ SYSTEM_PERFORMANCE : "monitors"
    DIAGNOSIS_ANALYTICS ||--o{ GEOSPATIAL_METRICS : "maps"
```

## Entity Descriptions

### USER
- Central entity for authentication and basic user information
- Supports multiple roles (patient, doctor, admin)
- Tracks account status and creation time

### PATIENT
- Extends USER for patient-specific information
- Stores medical history and contact details
- Links to appointments and diagnoses

### DOCTOR
- Extends USER for healthcare provider information
- Includes verification and licensing details
- Manages appointments and treatments

### IMAGE
- Stores uploaded skin condition images
- Tracks image quality and metadata
- Links to diagnoses

### DIAGNOSIS
- Records AI and doctor-reviewed diagnoses
- Includes confidence scores and detailed analysis
- Links to treatments and follow-ups

### APPOINTMENT
- Manages patient-doctor consultations
- Tracks scheduling and status
- Includes reason and updates

### TREATMENT
- Details prescribed treatment plans
- Tracks medications and duration
- Monitors treatment progress

### NOTIFICATION
- Handles system notifications
- Supports multiple notification types
- Tracks read status

### MESSAGE
- Enables secure communication
- Supports patient-doctor messaging
- Tracks message status

### USER_METRICS
- Tracks user engagement metrics
- Stores demographic information
- Monitors retention rates
- Records user growth trends

### DIAGNOSIS_ANALYTICS
- Records diagnosis patterns
- Tracks severity distributions
- Maps affected body areas
- Stores confidence scores

### TREATMENT_ANALYTICS
- Monitors treatment effectiveness
- Tracks patient adherence
- Records recommendation patterns
- Stores feedback data

### APPOINTMENT_ANALYTICS
- Tracks appointment completion
- Monitors wait times
- Records scheduling patterns
- Analyzes provider availability

### SYSTEM_PERFORMANCE
- Measures processing times
- Monitors API performance
- Tracks system reliability
- Records error patterns

### GEOSPATIAL_METRICS
- Maps case distributions
- Tracks regional patterns
- Monitors prevalence rates
- Stores location-based insights

## Relationships

1. One USER can be either a PATIENT or DOCTOR
2. PATIENT can upload multiple IMAGEs
3. Each IMAGE generates one DIAGNOSIS
4. DOCTORs can review multiple DIAGNOSEs
5. DIAGNOSIS can have multiple TREATMENTs
6. PATIENTs and DOCTORs can schedule multiple APPOINTMENTs
7. USERs can send and receive multiple MESSAGEs
8. USERs can receive multiple NOTIFICATIONs
9. DIAGNOSIS generates DIAGNOSIS_ANALYTICS
10. TREATMENT produces TREATMENT_ANALYTICS
11. APPOINTMENT tracks APPOINTMENT_ANALYTICS
12. USER measures USER_METRICS
13. SYSTEM_PERFORMANCE monitors SYSTEM_PERFORMANCE
14. DIAGNOSIS_ANALYTICS maps GEOSPATIAL_METRICS
