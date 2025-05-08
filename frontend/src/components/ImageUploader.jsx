import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Oval } from 'react-loader-spinner';

const ImageUploader = ({ onUpload, loading }) => {
  const [previewImg, setPreviewImg] = useState(null);

  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      
      // Create preview URL for display
      const objectUrl = URL.createObjectURL(file);
      setPreviewImg(objectUrl);
      
      // Send file to parent component for upload
      onUpload(file);
      
      // Free memory when component is unmounted
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.tif', '.tiff']
    },
    multiple: false,
    disabled: loading
  });

  return (
    <div className="mb-6">
      <div
        {...getRootProps({
          className: `border-2 border-dashed rounded-lg p-6 text-center cursor-pointer 
            ${isDragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-blue-400'} 
            ${loading ? 'opacity-50 cursor-not-allowed' : ''}`,
        })}
      >
        <input {...getInputProps()} />
        
        {loading ? (
          <div className="flex flex-col items-center justify-center">
            <Oval
              height={40}
              width={40}
              color="#3B82F6"
              visible={true}
              ariaLabel="oval-loading"
              secondaryColor="#BFDBFE"
              strokeWidth={4}
              strokeWidthSecondary={4}
            />
            <p className="mt-2 text-sm text-gray-600">Processing image...</p>
          </div>
        ) : previewImg ? (
          <div className="space-y-2">
            <img 
              src={previewImg} 
              alt="Preview" 
              className="max-h-64 mx-auto object-contain"
            />
            <p className="text-sm text-gray-500">
              Drop another image or click to select
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            <svg 
              className="mx-auto h-12 w-12 text-gray-400" 
              stroke="currentColor" 
              fill="none" 
              viewBox="0 0 48 48" 
              aria-hidden="true"
            >
              <path 
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" 
                strokeWidth={2} 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
            </svg>
            <p className="text-sm text-gray-600">
              {isDragActive 
                ? "Drop the file here..." 
                : "Drag 'n' drop an MRI image, or click to select"
              }
            </p>
            <p className="text-xs text-gray-500">
              Supported formats: JPG, PNG, TIFF
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;