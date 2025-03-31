import io
import numpy as np
import cv2
import easyocr
from PIL import Image

def extract_text_from_image(image_file):
    """
    Given a file-like object (uploaded image), extract and return text using EasyOCR.
    """
    try:
        # Initialize the EasyOCR reader for English (add more languages if needed)
        reader = easyocr.Reader(['en'], gpu=False)
        
        # Read image content from the file-like object
        file_bytes = image_file.read()
        
        # Convert the byte data to a numpy array
        np_arr = np.frombuffer(file_bytes, np.uint8)
        
        # Decode the numpy array image using OpenCV
        img = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
        
        # Use EasyOCR to detect text from the image
        results = reader.readtext(img, detail=0)
        
        if results:
            # Join the list of detected texts into a single string and strip whitespace
            return " ".join(results).strip()
        else:
            return "No text detected"
    except Exception as e:
        print(f"Error in OCR processing: {str(e)}")
        return "Error extracting text"
