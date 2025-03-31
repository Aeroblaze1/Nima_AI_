import React from 'react';

function ScannerPage() {
  const openFlaskModel = () => {
    window.open("http://127.0.0.1:5001/", "_blank"); // Opens Flask app in a new tab
    
  };
  const openFlaskModel2 = () => {
    window.open("http://127.0.0.1:5000/", "_blank"); // Opens Flask app in a new tab
    
  };

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto py-12 px-6">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-black mb-4">AI-Powered Allergen Scanner</h1>
        <p className="text-lg text-black max-w-3xl mx-auto">
          Food allergies can be life-threatening, and identifying allergens in packaged foods isn't always easy. 
          Our AI-powered scanner simplifies this process by leveraging advanced image processing and natural 
          language understanding to detect potential allergens in food labels in real-time.
        </p>
      </div>
      
      <div className="bg-blue-50 p-8 rounded-xl shadow-lg w-full mb-8">
        <h2 className="text-2xl font-semibold text-black mb-4">How It Works</h2>
        <ol className="space-y-4 text-lg text-black">
          <li className="flex items-start">
            <span className="bg-blue-600 text-white rounded-full w-7 h-7 flex items-center justify-center mr-3 flex-shrink-0 text-lg font-bold"></span>
            Point your camera at a food label or ingredient list.
          </li>
          <li className="flex items-start">
            <span className="bg-blue-600 text-white rounded-full w-7 h-7 flex items-center justify-center mr-3 flex-shrink-0 text-lg font-bold"></span>
            Our AI model scans, extracts, and analyzes the ingredients instantly.
          </li>
          <li className="flex items-start">
            <span className="bg-blue-600 text-white rounded-full w-7 h-7 flex items-center justify-center mr-3 flex-shrink-0 text-lg font-bold"></span>
            Receive immediate alerts for any detected allergens based on your profile.
          </li>
        </ol>
      </div>
      
      <button 
        onClick={openFlaskModel}
        className="bg-blue-700 text-white px-10 py-4 rounded-xl font-medium text-lg shadow-md hover:bg-blue-800 transition-all flex items-center justify-center"
      >
        🚀 Launch AI Scanner for allergy detection
      </button>
      <button 
        onClick={openFlaskModel2}
        className="bg-blue-700 text-white px-10 py-4 rounded-xl font-medium text-lg shadow-md hover:bg-blue-800 transition-all flex items-center justify-center"
      >
        🚀 Launch Cross Contamination Scanner
      </button>
      
      <p className="mt-5 text-md text-black max-w-md text-center">
        Note: The scanner requires access to your camera and will open in a new tab. Ensure your device permissions 
        allow camera access for optimal results.
      </p>
    </div>
  );
}

export default ScannerPage;
