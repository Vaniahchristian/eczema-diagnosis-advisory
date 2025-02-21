# Component Design Pseudocode

## 1. Image Capture Component

```python
class ImageCapture:
    def __init__(self):
        self.supported_formats = ['JPEG', 'PNG']
        self.min_resolution = (224, 224)
        self.max_size = 10 * 1024 * 1024  # 10MB
        self.quality_threshold = 0.6

    def capture_image(self, image_file):
        """
        Handle image upload and initial validation
        """
        try:
            # Validate file format
            if not self._check_format(image_file):
                raise InvalidFormatError("Unsupported image format")

            # Check file size
            if not self._check_size(image_file):
                raise FileSizeError("File too large")

            # Store image temporarily
            temp_path = self._store_temp(image_file)

            # Return image metadata
            return {
                'temp_path': temp_path,
                'format': self._get_format(image_file),
                'size': self._get_size(image_file),
                'timestamp': current_timestamp()
            }
        except Exception as e:
            log_error(e)
            raise ImageCaptureError(str(e))

    def _check_format(self, image_file):
        """Validate image format"""
        return get_extension(image_file) in self.supported_formats

    def _check_size(self, image_file):
        """Check if image size is within limits"""
        return get_file_size(image_file) <= self.max_size

class ImageProcessor:
    def preprocess_image(self, image_data):
        """
        Prepare image for ML model
        """
        try:
            # Convert to array
            img_array = self._to_array(image_data)

            # Resize image
            resized = self._resize(img_array, target_size=(224, 224))

            # Normalize pixels
            normalized = self._normalize(resized)

            # Enhance image quality
            enhanced = self._enhance(normalized)

            # Assess quality
            quality_score = self._assess_quality(enhanced)

            if quality_score < self.quality_threshold:
                raise QualityTooLowError()

            return {
                'processed_image': enhanced,
                'quality_score': quality_score,
                'metadata': self._extract_metadata(image_data)
            }
        except Exception as e:
            log_error(e)
            raise ProcessingError(str(e))
```

## 2. Diagnosis Component

```python
class DiagnosisGenerator:
    def __init__(self):
        self.model = None
        self.confidence_threshold = 0.85
        self.load_model()

    def load_model(self):
        """Load the ML model"""
        self.model = tf.keras.models.load_model('eczema_model.h5')

    def generate_diagnosis(self, processed_image):
        """
        Generate eczema diagnosis from processed image
        """
        try:
            # Make prediction
            prediction = self.model.predict(processed_image)

            # Analyze results
            diagnosis = {
                'has_eczema': self._determine_eczema(prediction),
                'severity': self._determine_severity(prediction),
                'confidence': self._calculate_confidence(prediction),
                'affected_areas': self._identify_areas(prediction),
                'differential_diagnosis': self._get_differential_diagnosis(prediction)
            }

            # Generate recommendations if eczema is detected
            if diagnosis['has_eczema']:
                diagnosis['recommendations'] = self._generate_recommendations(
                    severity=diagnosis['severity'],
                    affected_areas=diagnosis['affected_areas']
                )

            return diagnosis

        except Exception as e:
            log_error(e)
            raise DiagnosisError(str(e))

    def _determine_eczema(self, prediction):
        """Determine if image shows eczema"""
        return prediction[0] > self.confidence_threshold

    def _determine_severity(self, prediction):
        """Calculate severity level"""
        severity_scores = prediction[1]
        return {
            'level': self._map_severity_level(severity_scores),
            'score': float(max(severity_scores))
        }
```

## 3. Advisory Component

```python
class AdvisorySystem:
    def __init__(self):
        self.knowledge_base = self._load_knowledge_base()
        self.recommendation_engine = RecommendationEngine()

    def generate_advisory(self, diagnosis_result, patient_history):
        """
        Generate personalized advisory based on diagnosis
        """
        try:
            # Get basic care instructions
            basic_care = self._get_basic_care(diagnosis_result['severity'])

            # Get trigger avoidance recommendations
            triggers = self._identify_triggers(patient_history)

            # Get lifestyle adjustments
            lifestyle = self._get_lifestyle_recommendations(
                severity=diagnosis_result['severity'],
                affected_areas=diagnosis_result['affected_areas'],
                patient_history=patient_history
            )

            # Get treatment plan
            treatment = self._generate_treatment_plan(diagnosis_result)

            return {
                'basic_care': basic_care,
                'trigger_avoidance': triggers,
                'lifestyle_adjustments': lifestyle,
                'treatment_plan': treatment,
                'follow_up': self._determine_follow_up(diagnosis_result)
            }

        except Exception as e:
            log_error(e)
            raise AdvisoryError(str(e))
```

## 4. Analytics Component

```python
class AnalyticsEngine:
    def __init__(self):
        self.db_connector = DatabaseConnector()
        self.stat_calculator = StatisticsCalculator()

    def generate_analytics(self, time_period='last_month'):
        """
        Generate analytics reports
        """
        try:
            # Get raw data
            data = self.db_connector.get_analytics_data(time_period)

            # Calculate demographics
            demographics = self._analyze_demographics(data)

            # Calculate geographical distribution
            geo_distribution = self._analyze_geographical(data)

            # Calculate treatment effectiveness
            treatment_stats = self._analyze_treatments(data)

            # Generate trends
            trends = self._calculate_trends(data)

            return {
                'demographics': demographics,
                'geographical': geo_distribution,
                'treatments': treatment_stats,
                'trends': trends,
                'timestamp': current_timestamp()
            }

        except Exception as e:
            log_error(e)
            raise AnalyticsError(str(e))

    def _analyze_demographics(self, data):
        """Analyze demographic patterns"""
        return {
            'age_groups': self._group_by_age(data),
            'gender_distribution': self._group_by_gender(data),
            'severity_by_age': self._cross_analyze_severity_age(data)
        }
```

## 5. Appointment Management Component

```python
class AppointmentManager:
    def __init__(self):
        self.scheduler = Scheduler()
        self.notification_system = NotificationSystem()

    def schedule_appointment(self, patient_id, doctor_id, appointment_details):
        """
        Schedule a new appointment
        """
        try:
            # Check doctor availability
            if not self._check_availability(doctor_id, appointment_details['datetime']):
                raise TimeSlotUnavailableError()

            # Create appointment
            appointment = {
                'patient_id': patient_id,
                'doctor_id': doctor_id,
                'datetime': appointment_details['datetime'],
                'reason': appointment_details['reason'],
                'status': 'scheduled',
                'created_at': current_timestamp()
            }

            # Save to database
            appointment_id = self.scheduler.create_appointment(appointment)

            # Send notifications
            self._send_notifications(appointment)

            return {
                'appointment_id': appointment_id,
                'status': 'confirmed',
                'details': appointment
            }

        except Exception as e:
            log_error(e)
            raise AppointmentError(str(e))
```

## 6. Security Component

```python
class SecurityManager:
    def __init__(self):
        self.jwt_manager = JWTManager()
        self.encryption = AES256Encryption()
        self.access_control = RoleBasedAccessControl()

    def authenticate_user(self, credentials):
        """
        Authenticate user and generate tokens
        """
        try:
            # Validate credentials
            user = self._validate_credentials(credentials)

            # Generate tokens
            tokens = self.jwt_manager.generate_tokens(user)

            # Log authentication
            self._log_authentication(user['id'], 'success')

            return {
                'access_token': tokens['access'],
                'refresh_token': tokens['refresh'],
                'user': self._sanitize_user_data(user)
            }

        except Exception as e:
            self._log_authentication(credentials['email'], 'failed')
            raise AuthenticationError(str(e))

    def authorize_action(self, user_id, action, resource):
        """
        Check if user is authorized for action
        """
        try:
            # Get user roles
            roles = self.access_control.get_user_roles(user_id)

            # Check permissions
            if not self.access_control.check_permission(roles, action, resource):
                raise UnauthorizedError()

            # Log access attempt
            self._log_access(user_id, action, resource, 'granted')

            return True

        except Exception as e:
            self._log_access(user_id, action, resource, 'denied')
            raise AuthorizationError(str(e))
```

Each component includes:
- Core functionality implementation
- Error handling
- Logging
- Input validation
- Security checks
- Integration points with other components

The components follow the modular architecture specified in the SDD and implement all the required functionality while maintaining security, scalability, and maintainability.

Would you like me to explain any specific component in more detail?
