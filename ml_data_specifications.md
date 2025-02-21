# ML Data Specifications for Eczema Diagnosis System

## 1. Image Dataset Requirements

### Primary Datasets
- **ECZEMA-DB Dataset**
  - Source: International Skin Imaging Collaboration (ISIC)
  - Focus: Specifically curated for eczema diagnosis
  - Size: 5,000+ eczema images

- **ADDI (Atopic Dermatitis Diagnosis Images) Dataset**
  - Source: Medical institutions and dermatology clinics
  - Size: 3,000+ clinically verified eczema cases
  - Includes severity classifications

- **Supplementary Datasets**
  - DermNet NZ eczema collection
  - NHS eczema image database
  - Local hospital partnerships for data collection

### Image Specifications
- **Resolution**: Minimum 600x400 pixels
- **Format**: JPEG/PNG
- **Color Space**: RGB
- **Metadata**: Must include patient age, skin type, and affected body area

## 2. Training Data Distribution

### By Eczema Type
- Acute Eczema: 30%
- Chronic Eczema: 30%
- Mild Eczema: 20%
- Severe Eczema: 20%

### By Skin Type (Fitzpatrick Scale)
- Type I-II: 20%
- Type III-IV: 40%
- Type V-VI: 40%

### By Body Location
- Face/Neck: 25%
- Arms/Hands: 25%
- Legs/Feet: 25%
- Trunk/Back: 25%

## 3. Validation Data Requirements

### Clinical Validation Set
- **Size**: 2,000 images
- **Source**: Verified by dermatologists
- **Annotation**: Detailed severity scoring
- **Distribution**: Stratified across all categories

### Test Set
- **Size**: 1,000 images
- **Source**: Independent from training data
- **Validation**: Double-blind verification

## 4. Data Augmentation Techniques

### Image Transformations
- Rotation: ±20 degrees
- Scaling: ±15%
- Horizontal/Vertical Flip
- Brightness Variation: ±10%
- Contrast Adjustment: ±10%

### Preprocessing Steps
1. Image Normalization
2. Background Removal
3. Contrast Enhancement
4. Noise Reduction
5. Color Space Standardization

## 5. Data Labeling Requirements

### Primary Labels
- Diagnosis (Eczema/Non-Eczema)
- Severity Level (0-4 scale)
- Affected Area Percentage

### Secondary Labels
- Patient Demographics
- Treatment History
- Previous Diagnoses
- Environmental Factors

## 6. Data Quality Criteria

### Image Quality
- Clear Focus
- Proper Lighting
- Minimal Background Distraction
- Standard Distance
- Multiple Angles (when possible)

### Metadata Quality
- Complete Patient History
- Accurate Diagnosis
- Treatment Outcomes
- Follow-up Results

## 7. Ethical Considerations

### Privacy Requirements
- De-identified Patient Data
- Consent Documentation
- Age-appropriate Consent
- Data Usage Agreements

### Bias Prevention
- Diverse Ethnic Representation
- Age Group Distribution
- Gender Balance
- Geographic Diversity

## 8. Data Storage and Management

### Storage Format
- Images: Compressed JPEG/PNG
- Metadata: JSON/CSV
- Annotations: XML/JSON

### Version Control
- Dataset Versioning
- Change Documentation
- Update Logs
- Quality Assurance Reports

## 9. Performance Metrics

### Required Metrics
- Accuracy: >90%
- Sensitivity: >85%
- Specificity: >85%
- F1 Score: >0.85
- ROC-AUC: >0.90

### Validation Process
1. Cross-validation (5-fold)
2. External Validation
3. Clinical Trial Validation
4. Continuous Monitoring

## 10. Data Update Strategy

### Regular Updates
- Quarterly Data Reviews
- New Case Additions
- Error Correction
- Performance Optimization

### Quality Control
- Regular Audits
- Expert Review
- Performance Monitoring
- Feedback Integration
