from flask import Flask, request, render_template, redirect, url_for, session
import pandas as pd
from model import load_and_train_model
from ocr import extract_text_from_image  # Now uses EasyOCR

app = Flask(__name__)
app.secret_key = "supersecretkey"  # Required for session storage

#Load the model
rl_model = load_and_train_model()

@app.route('/', methods=['GET'])
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    image_file = request.files.get('label_image')

    if image_file:
        # Use EasyOCR to extract text from the image
        ocr_text = extract_text_from_image(image_file)
    else:
        ocr_text = "not available"
    
    # Automatically fill missing fields (do not include the target "Prediction")
    auto_filled_data = {
        'Food Product': "not provided",
        'Main Ingredient': "not provided",
        'Sweetener': "not provided",
        'Fat/Oil': "not provided",
        'Seasoning': "not provided",
        'Allergens': ocr_text,
        'Price ($)': 0.0,
        'Customer rating (Out of 5)': 0.0
    }

    user_allergies = request.form.get('user_allergies', '').lower().strip()
    allergy_rating = request.form.get('allergy_rating', '0')

    input_df = pd.DataFrame([auto_filled_data])

    try:
        # Get model prediction
        prediction = rl_model.predict(input_df)
    except Exception as e:
        return render_template('error.html', error=str(e))  # Handle prediction errors gracefully

    # Store input data in session for feedback
    session['last_input_data'] = input_df.to_json()

    warnings = []
    allergen_products = {}
    
    if user_allergies and ocr_text != "not available":
        for allergy in user_allergies.split(','):
            allergy = allergy.strip()
            if allergy in ocr_text.lower():
                warnings.append(f"⚠️ Warning: The allergen '{allergy}' is present in this product! (Allergy rating: {allergy_rating})")
                allergen_products[allergy] = auto_filled_data
    
    if not allergen_products:
        return render_template('error.html', error="No allergenic products detected.")

    return render_template('result.html', 
                           prediction=prediction, 
                           warnings=warnings, 
                           ocr_text=ocr_text,
                           allergen_products=allergen_products)

@app.route('/feedback', methods=['POST'])
def feedback():
    """Collect user feedback and update the model."""
    correct_label = request.form.get("correct_label")

    if 'last_input_data' in session:
        try:
            last_input_data = pd.read_json(session.pop("last_input_data"))
            rl_model.update_model(last_input_data, correct_label)
        except Exception as e:
            return render_template('error.html', error=f"Error updating model: {str(e)}")

    return redirect(url_for('home'))

if __name__ == "__main__":
    app.run(debug=True, port=5001)  # Runs on port 5000

