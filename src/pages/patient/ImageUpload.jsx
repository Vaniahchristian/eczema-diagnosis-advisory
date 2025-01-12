import React, { useState, useRef } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Alert,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
  useTheme,
} from '@mui/material';
import {
  PhotoCamera as CameraIcon,
  CheckCircle as CheckIcon,
  Cancel as CancelIcon,
  LightMode as LightIcon,
  CenterFocusStrong as FocusIcon,
  PhotoSizeSelectActual as SizeIcon,
  ImageAspectRatio as AspectIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const guidelines = [
  {
    title: 'Good Lighting',
    icon: <LightIcon />,
    description: 'Take photos in well-lit conditions, preferably natural daylight.',
  },
  {
    title: 'Clear Focus',
    icon: <FocusIcon />,
    description: 'Ensure the affected area is in sharp focus.',
  },
  {
    title: 'Proper Size',
    icon: <SizeIcon />,
    description: 'Keep the affected area centered and filling most of the frame.',
  },
  {
    title: 'Multiple Angles',
    icon: <AspectIcon />,
    description: 'Take photos from different angles if possible.',
  },
];

const ImageUpload = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  const [activeStep, setActiveStep] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState(null);
  const [imageQualityChecks, setImageQualityChecks] = useState({
    size: false,
    format: false,
    resolution: false,
  });

  const steps = [
    {
      label: 'Review Guidelines',
      description: 'Learn how to take clear and useful photos of affected areas.',
    },
    {
      label: 'Take or Select Photo',
      description: 'Use your camera or choose an existing photo.',
    },
    {
      label: 'Review and Submit',
      description: 'Check the photo quality and submit for diagnosis.',
    },
  ];

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Reset states
      setError(null);
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      
      // Perform image quality checks
      checkImageQuality(file);
    }
  };

  const checkImageQuality = (file) => {
    // Check file size (max 10MB)
    const sizeCheck = file.size <= 10 * 1024 * 1024;
    
    // Check file format
    const allowedFormats = ['image/jpeg', 'image/png', 'image/heic'];
    const formatCheck = allowedFormats.includes(file.type);

    // Create an image object to check resolution
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      const resolutionCheck = img.width >= 1024 && img.height >= 1024;
      setImageQualityChecks({
        size: sizeCheck,
        format: formatCheck,
        resolution: resolutionCheck,
      });
    };
  };

  const handleUpload = async () => {
    try {
      setError(null);
      setUploadProgress(0);

      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 500);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 5000));
      
      clearInterval(interval);
      setUploadProgress(100);

      // Navigate to results page after successful upload
      setTimeout(() => {
        navigate('/patient/results');
      }, 1000);
    } catch (error) {
      setError('Failed to upload image. Please try again.');
      setUploadProgress(0);
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="body1" gutterBottom>
              Follow these guidelines to ensure the best possible diagnosis:
            </Typography>
            <List>
              {guidelines.map((guideline) => (
                <ListItem key={guideline.title}>
                  <ListItemIcon sx={{ color: theme.palette.primary.main }}>
                    {guideline.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={guideline.title}
                    secondary={guideline.description}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        );

      case 1:
        return (
          <Box>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              ref={fileInputRef}
              style={{ display: 'none' }}
            />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <Button
                variant="contained"
                startIcon={<CameraIcon />}
                onClick={() => fileInputRef.current?.click()}
              >
                Select Photo
              </Button>
              {previewUrl && (
                <Paper
                  elevation={2}
                  sx={{
                    p: 1,
                    mt: 2,
                    maxWidth: '100%',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={previewUrl}
                    alt="Selected"
                    style={{
                      width: '100%',
                      maxHeight: 300,
                      objectFit: 'contain',
                    }}
                  />
                </Paper>
              )}
            </Box>
          </Box>
        );

      case 2:
        return (
          <Box>
            {selectedImage && (
              <>
                <Typography variant="subtitle1" gutterBottom>
                  Image Quality Check:
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      {imageQualityChecks.size ? (
                        <CheckIcon color="success" />
                      ) : (
                        <CancelIcon color="error" />
                      )}
                    </ListItemIcon>
                    <ListItemText
                      primary="File Size"
                      secondary={imageQualityChecks.size ? 'Acceptable' : 'Too large (max 10MB)'}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      {imageQualityChecks.format ? (
                        <CheckIcon color="success" />
                      ) : (
                        <CancelIcon color="error" />
                      )}
                    </ListItemIcon>
                    <ListItemText
                      primary="File Format"
                      secondary={imageQualityChecks.format ? 'Supported' : 'Unsupported format'}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      {imageQualityChecks.resolution ? (
                        <CheckIcon color="success" />
                      ) : (
                        <CancelIcon color="error" />
                      )}
                    </ListItemIcon>
                    <ListItemText
                      primary="Resolution"
                      secondary={imageQualityChecks.resolution ? 'Good quality' : 'Low resolution'}
                    />
                  </ListItem>
                </List>
                {uploadProgress > 0 && (
                  <Box sx={{ textAlign: 'center', mt: 2 }}>
                    <CircularProgress
                      variant="determinate"
                      value={uploadProgress}
                      size={60}
                    />
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      Uploading... {uploadProgress}%
                    </Typography>
                  </Box>
                )}
                {error && (
                  <Alert severity="error" sx={{ mt: 2 }}>
                    {error}
                  </Alert>
                )}
              </>
            )}
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Upload Images
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Upload clear photos of the affected areas for accurate diagnosis
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel>
                  <Typography variant="subtitle1">{step.label}</Typography>
                </StepLabel>
                <StepContent>
                  <Typography color="text.secondary" paragraph>
                    {step.description}
                  </Typography>
                  {getStepContent(index)}
                  <Box sx={{ mt: 2 }}>
                    <Button
                      variant="contained"
                      onClick={
                        index === steps.length - 1 ? handleUpload : handleNext
                      }
                      sx={{ mr: 1 }}
                      disabled={
                        (index === 1 && !selectedImage) ||
                        (index === 2 &&
                          (!Object.values(imageQualityChecks).every(Boolean) ||
                            uploadProgress > 0))
                      }
                    >
                      {index === steps.length - 1 ? 'Submit' : 'Continue'}
                    </Button>
                    <Button
                      disabled={index === 0 || uploadProgress > 0}
                      onClick={handleBack}
                      sx={{ mr: 1 }}
                    >
                      Back
                    </Button>
                  </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ImageUpload;
