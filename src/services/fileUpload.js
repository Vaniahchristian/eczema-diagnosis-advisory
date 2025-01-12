// Mock file upload service
export const uploadFile = async (file) => {
  return new Promise((resolve, reject) => {
    // Simulate network delay
    setTimeout(() => {
      // Check file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
      if (!allowedTypes.includes(file.type)) {
        reject(new Error('Invalid file type. Only images and PDFs are allowed.'));
        return;
      }

      // Check file size (max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
      if (file.size > maxSize) {
        reject(new Error('File size too large. Maximum size is 5MB.'));
        return;
      }

      // Generate mock URL for the uploaded file
      const mockUrl = `https://example.com/uploads/${file.name}`;
      
      resolve({
        url: mockUrl,
        filename: file.name,
        type: file.type,
        size: file.size,
      });
    }, 1000);
  });
};

// Function to get file preview
export const getFilePreview = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('No file provided'));
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      resolve(e.target.result);
    };

    reader.onerror = () => {
      reject(new Error('Error reading file'));
    };

    if (file.type.startsWith('image/')) {
      reader.readAsDataURL(file);
    } else {
      // For non-image files, just resolve with null
      resolve(null);
    }
  });
};

// Function to format file size
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};
