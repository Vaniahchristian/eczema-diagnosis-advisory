import React, { useState, useRef } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  LinearProgress,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
} from '@mui/material';
import {
  CloudUpload as CloudUploadIcon,
  InsertDriveFile as FileIcon,
  Clear as ClearIcon,
} from '@mui/icons-material';
import { uploadFile, getFilePreview, formatFileSize } from '../services/fileUpload';

const FileUploadDialog = ({ open, onClose, onUploadComplete }) => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef(null);

  const handleFileSelect = async (event) => {
    const selectedFiles = Array.from(event.target.files);
    
    // Get previews for all files
    const filesWithPreviews = await Promise.all(
      selectedFiles.map(async (file) => ({
        file,
        preview: await getFilePreview(file),
      }))
    );
    
    setFiles(prev => [...prev, ...filesWithPreviews]);
  };

  const handleRemoveFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    setUploading(true);
    const totalFiles = files.length;
    const uploadedFiles = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const { file } = files[i];
        const uploadedFile = await uploadFile(file);
        uploadedFiles.push(uploadedFile);
        setProgress(((i + 1) / totalFiles) * 100);
      }

      onUploadComplete(uploadedFiles);
      onClose();
    } catch (error) {
      console.error('Upload failed:', error);
      // You might want to show an error message to the user here
    } finally {
      setUploading(false);
      setProgress(0);
      setFiles([]);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = async (event) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    
    const filesWithPreviews = await Promise.all(
      droppedFiles.map(async (file) => ({
        file,
        preview: await getFilePreview(file),
      }))
    );
    
    setFiles(prev => [...prev, ...filesWithPreviews]);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Upload Files</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            border: '2px dashed #ccc',
            borderRadius: 2,
            p: 3,
            textAlign: 'center',
            mb: 2,
            cursor: 'pointer',
            '&:hover': {
              borderColor: 'primary.main',
            },
          }}
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            multiple
            onChange={handleFileSelect}
          />
          <CloudUploadIcon sx={{ fontSize: 48, color: 'action.active', mb: 1 }} />
          <Typography variant="h6" gutterBottom>
            Drag and drop files here
          </Typography>
          <Typography variant="body2" color="textSecondary">
            or click to select files
          </Typography>
          <Typography variant="caption" display="block" color="textSecondary">
            Supported formats: JPEG, PNG, GIF, PDF
          </Typography>
          <Typography variant="caption" display="block" color="textSecondary">
            Maximum file size: 5MB
          </Typography>
        </Box>

        {files.length > 0 && (
          <List>
            {files.map(({ file, preview }, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  {preview ? (
                    <img
                      src={preview}
                      alt={file.name}
                      style={{ width: 40, height: 40, objectFit: 'cover' }}
                    />
                  ) : (
                    <FileIcon />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={file.name}
                  secondary={formatFileSize(file.size)}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    onClick={() => handleRemoveFile(index)}
                    disabled={uploading}
                  >
                    <ClearIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        )}

        {uploading && (
          <Box sx={{ width: '100%', mt: 2 }}>
            <LinearProgress variant="determinate" value={progress} />
            <Typography variant="caption" align="center" display="block">
              Uploading... {Math.round(progress)}%
            </Typography>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={uploading}>
          Cancel
        </Button>
        <Button
          onClick={handleUpload}
          variant="contained"
          disabled={files.length === 0 || uploading}
        >
          Upload
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FileUploadDialog;
