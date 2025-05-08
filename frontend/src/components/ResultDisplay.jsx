import { useState } from 'react';

const ResultDisplay = ({ result }) => {
  const [activeTab, setActiveTab] = useState('original');
  
  if (!result) return null;
  
  // Format probability as percentage
  const probability = (result.tumor_probability * 100).toFixed(2);
  
  // Image data with base64 prefix for display
  const images = {
    original: `data:image/png;base64,${result.original_image}`,
    mask: `data:image/png;base64,${result.mask_image}`,
    overlay: `data:image/png;base64,${result.overlay_image}`
  };
  
  return (
    <div className="mt-8 border-t pt-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Analysis Results</h2>
      
      <div className="bg-gray-50 p-4 rounded-md mb-6">
        <div className="flex items-center">
          <div className={`rounded-full w-4 h-4 mr-2 ${result.has_tumor ? 'bg-red-500' : 'bg-green-500'}`}></div>
          <h3 className="text-lg font-medium">
            {result.has_tumor ? 'Tumor Detected' : 'No Tumor Detected'}
          </h3>
        </div>
        
        {result.has_tumor && (
          <p className="mt-2 text-gray-700">
            Detection confidence: <span className="font-semibold">{probability}%</span>
          </p>
        )}
      </div>
      
      <div className="mb-4">
        <div className="flex border-b">
          <button
            className={`px-4 py-2 focus:outline-none ${
              activeTab === 'original' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'
            }`}
            onClick={() => setActiveTab('original')}
          >
            MRI Scan
          </button>
          {result.has_tumor && (
            <>
              <button
                className={`px-4 py-2 focus:outline-none ${
                  activeTab === 'mask' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'
                }`}
                onClick={() => setActiveTab('mask')}
              >
                Tumor Mask
              </button>
              <button
                className={`px-4 py-2 focus:outline-none ${
                  activeTab === 'overlay' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'
                }`}
                onClick={() => setActiveTab('overlay')}
              >
                MRI with Overlay
              </button>
            </>
          )}
        </div>
      </div>
      
      <div className="flex justify-center">
        <img
          src={images[activeTab]}
          alt={`${activeTab} view`}
          className="max-h-96 object-contain"
        />
      </div>
      
      {result.has_tumor && (
        <div className="mt-6 text-sm text-gray-600">
          <p className="font-medium">Image Views Explanation:</p>
          <ul className="mt-2 list-disc list-inside space-y-1">
            <li><span className="font-medium">MRI Scan:</span> Original brain MRI image</li>
            <li><span className="font-medium">Tumor Mask:</span> Segmented tumor region highlighted in white</li>
            <li><span className="font-medium">MRI with Overlay:</span> Tumor region overlaid on original image in red</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ResultDisplay;
