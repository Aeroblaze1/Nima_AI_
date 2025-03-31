from flask import Flask, render_template, request
import joblib
import pandas as pd
from ocr import extract_text  # Import the OCR function

app = Flask(__name__)
app.secret_key="supersecretkey"

# Load the trained models
allergen_model, allergen_features = joblib.load("models/allergen_model.pkl")
contamination_model, contamination_features = joblib.load("models/contamination_model.pkl")

@app.route("/", methods=["GET", "POST"])
def index():
    prediction_results = None

    if request.method == "POST":
        if "image" in request.files:
            image = request.files["image"]
            ingredients = extract_text(image)

            # Create input dataframe from extracted ingredients
            input_values = {}  # Initialize the dictionary before the loop

            for feature in set(allergen_features + contamination_features):
                if feature in allergen_features:  # Numerical features
                    input_values[feature] = [0]  # Default to 0 for unknown numerical values
                else:  # Categorical features
                    input_values[feature] = ["Unknown"]  # Keep as string for encoding



            # Fill known ingredient features
            for ingredient in ingredients:
                if ingredient in input_values:
                    input_values[ingredient] = ["Yes"]  # Assume presence if found

            # Get user inputs for allergies and severity
            allergy_type = request.form.get("allergy_type", "Unknown")
            severity = request.form.get("severity", "Unknown")
            
            input_values["allergy_type"] = [allergy_type]
            input_values["severity"] = [severity]

            # Convert input dictionary to DataFrame
            input_df = pd.DataFrame(input_values)

            # Ensure input_df contains all necessary features
            for feature in allergen_features + contamination_features:
                if feature not in input_df.columns:
                    input_df[feature] = "Unknown"

            # Make predictions
            y_allergen_pred = allergen_model.predict(input_df[allergen_features])
            y_contamination_pred = contamination_model.predict(input_df[contamination_features])

            prediction_results = {
                "Allergen Status": y_allergen_pred[0],
                "Contamination Risk Level": y_contamination_pred[0]
            }

    return render_template("index.html", prediction=prediction_results)

if __name__ == "__main__":
    app.run(debug=True, port=5000) 
