graph TB
    subgraph Client Layer
        UI[User Interface]
        WA[Web Application]
        MA[Mobile Application]
    end

    subgraph Application Layer
        subgraph Security Component
            Auth[Authentication & Authorization]
            SEC[Security Services]
        end

        subgraph Core Components
            IC[Image Capture Component]
            DC[Diagnosis Component]
            AC[Advisory Component]
            AN[Analytics Component]
        end

        subgraph Healthcare Services
            HMS[Healthcare Management]
            APS[Appointment Scheduling]
        end
    end

    subgraph Data Layer
        subgraph Storage Solutions
            MySQL[(MySQL DB)]
            MongoDB[(MongoDB)]
            GCS[(Google Cloud Storage)]
        end

        subgraph Data Types
            PD[Patient Data]
            ID[Image Data]
            TD[Treatment Data]
            AD[Appointment Data]
        end
    end

    %% Client Layer Connections with labels
    UI -->|"User Login/Registration"| Auth
    WA -->|"Web Access Request"| Auth
    MA -->|"Mobile Access Request"| Auth

    %% Security Component Connections with labels
    Auth -->|"Validate Credentials"| SEC
    SEC -->|"Grant Access"| Core Components
    SEC -->|"Authorize Services"| Healthcare Services

    %% Core Component Connections with labels
    IC -->|"Process Images"| DC
    DC -->|"Generate Treatment Plan"| AC
    DC -->|"Generate Insights"| AN
    
    %% Diagnosis Results Flow
    DC -->|"Return Diagnosis Results"| UI
    DC -->|"Store Diagnosis History"| MongoDB
    DC -->|"Alert if Severe Case"| HMS
    
    %% Healthcare Service Connections with labels
    HMS -->|"Schedule Appointments"| APS
    HMS -->|"Manage Patient Records"| Storage Solutions

    %% Data Layer Connections with labels
    Core Components -->|"Store/Retrieve Data"| Storage Solutions
    Healthcare Services -->|"Update Records"| Storage Solutions
    
    %% Database Specific Connections with labels
    MySQL -->|"Store Patient Info"| PD
    MySQL -->|"Manage Schedules"| AD
    MongoDB -->|"Store Treatment Plans"| TD
    GCS -->|"Store Uploaded Images"| ID

    %% Styling
    classDef clientLayer fill:#e6f3ff,stroke:#333,stroke-width:2px
    classDef securityComponent fill:#ffe6e6,stroke:#333,stroke-width:2px
    classDef coreComponents fill:#e6ffe6,stroke:#333,stroke-width:2px
    classDef healthcareServices fill:#fff5e6,stroke:#333,stroke-width:2px
    classDef dataLayer fill:#f0e6ff,stroke:#333,stroke-width:2px
    
    class UI,WA,MA clientLayer
    class Auth,SEC securityComponent
    class IC,DC,AC,AN coreComponents
    class HMS,APS healthcareServices
    class MySQL,MongoDB,GCS,PD,ID,TD,AD dataLayer
