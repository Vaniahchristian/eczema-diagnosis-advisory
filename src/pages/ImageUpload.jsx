import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  IconButton,
  Grid,
} from '@mui/material';
import { PhotoCamera, Close } from '@mui/icons-material';

const ImageUpload = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('File size should not exceed 5MB');
        return;
      }

      if (!file.type.startsWith('image/')) {
        setError('Please select an image file');
        return;
      }

      setSelectedImage(file);
      setPreview(URL.createObjectURL(file));
      setError(null);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setPreview(null);
    setError(null);
  };

  const handleAnalyze = async () => {
    if (!selectedImage) {
      setError('Please select an image first');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Dummy analysis result
      const analysisId = 'analysis_' + Math.random().toString(36).substr(2, 9);
      
      // Navigate to results page with the analysis ID
      navigate('/diagnosis/' + analysisId);
    } catch (err) {
      setError('Failed to analyze image. Please try again.');
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Eczema Image Analysis
      </Typography>

      <Typography variant="body1" paragraph>
        Upload a clear photo of the affected area for AI-powered analysis. Make sure the image is well-lit
        and in focus for the most accurate results.
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 3,
              border: '2px dashed',
              borderColor: 'primary.main',
              textAlign: 'center',
              position: 'relative',
            }}
          >
            {!preview ? (
              <Box>
                <input
                  accept="image/*"
                  type="file"
                  id="image-upload"
                  onChange={handleImageSelect}
                  style={{ display: 'none' }}
                />
                <label htmlFor="image-upload">
                  <Button
                    variant="contained"
                    component="span"
                    startIcon={<PhotoCamera />}
                    disabled={loading}
                  >
                    Select Image
                  </Button>
                </label>
                <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
                  Supported formats: JPG, PNG (max 5MB)
                </Typography>
              </Box>
            ) : (
              <Box sx={{ position: 'relative' }}>
                <IconButton
                  sx={{ position: 'absolute', top: 0, right: 0, zIndex: 1 }}
                  onClick={handleRemoveImage}
                  color="primary"
                >
                  <Close />
                </IconButton>
                <img
                  src={preview}
                  alt="Preview"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '300px',
                    objectFit: 'contain',
                  }}
                />
              </Box>
            )}
          </Paper>

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            onClick={handleAnalyze}
            disabled={!selectedImage || loading}
            sx={{ mt: 3 }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Analyze Image'
            )}
          </Button>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Tips for Better Results
            </Typography>
            <ul style={{ paddingLeft: '20px' }}>
              <li>
                <Typography paragraph>
                  Ensure good lighting conditions - natural daylight works best
                </Typography>
              </li>
              <li>
                <Typography paragraph>
                  Keep the camera steady and in focus
                </Typography>
              </li>
              <li>
                <Typography paragraph>
                  Include only the affected area in the frame
                </Typography>
              </li>
              <li>
                <Typography paragraph>
                  Avoid using flash as it may affect color accuracy
                </Typography>
              </li>
              <li>
                <Typography>
                  Take multiple photos if the affected area is large
                </Typography>
              </li>
            </ul>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ImageUpload;
