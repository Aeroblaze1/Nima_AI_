import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler, OneHotEncoder, LabelEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
import pickle
import os

MODEL_PATH = "reinforcement_model.pkl"

class RLAllergenModel:
    def __init__(self):
        self.model = None
        self.label_encoder = None
        self.preprocessor = None

    def train_initial_model(self):
        dataset = pd.read_csv('Allergen_Status_of_Food_Products.csv')
        print("Columns in dataset:", dataset.columns.tolist())

        # Ensure 'Prediction' exists and handle missing values
        dataset['Prediction'] = dataset['Prediction'].fillna("unknown")
        dataset['Allergens'] = dataset['Allergens'].fillna("none")  # Ensure no NaN values
        
        # Filter only allergenic products for training
        dataset = dataset[dataset['Allergens'].str.lower() != "none"]
        
        # Separate features (X) and target (y)
        y = dataset['Prediction']
        X = dataset.drop(columns=['Prediction'])  # Ensure 'Prediction' is not in training features

        # Define numeric and categorical feature sets
        numeric_features = ['Price ($)', 'Customer rating (Out of 5)']
        categorical_features = ['Food Product', 'Main Ingredient', 'Sweetener', 'Fat/Oil', 'Seasoning', 'Allergens']

        # Fill missing values appropriately
        X[numeric_features] = X[numeric_features].fillna(X[numeric_features].mean())
        X[categorical_features] = X[categorical_features].fillna("missing")

        # Define preprocessing pipeline
        self.preprocessor = ColumnTransformer(
            transformers=[
                ('num', Pipeline([
                    ('imputer', SimpleImputer(strategy='mean')),
                    ('scaler', StandardScaler())
                ]), numeric_features),
                ('cat', Pipeline([
                    ('imputer', SimpleImputer(strategy='constant', fill_value='missing')),
                    ('onehot', OneHotEncoder(handle_unknown='ignore'))
                ]), categorical_features)
            ]
        )

        # Process input features
        X_processed = self.preprocessor.fit_transform(X)

        # Encode target labels
        self.label_encoder = LabelEncoder()
        y_encoded = self.label_encoder.fit_transform(y)

        # Train the Random Forest classifier
        self.model = RandomForestClassifier(n_estimators=100, random_state=42)
        self.model.fit(X_processed, y_encoded)

        self.save_model()
        print("Initial Model Training Completed")

    def save_model(self):
        """ Saves the trained model, label encoder, and preprocessor. """
        with open(MODEL_PATH, "wb") as f:
            pickle.dump({
                "model": self.model,
                "label_encoder": self.label_encoder,
                "preprocessor": self.preprocessor
            }, f)

    def load_model(self):
        """ Loads the model if available, else retrains it. Ensures feature compatibility. """
        try:
            if not os.path.exists(MODEL_PATH):
                raise FileNotFoundError("Model file not found. Retraining model.")

            with open(MODEL_PATH, "rb") as f:
                data = pickle.load(f)
                self.model = data["model"]
                self.label_encoder = data["label_encoder"]
                self.preprocessor = data["preprocessor"]

            print("Model loaded successfully.")
        except (FileNotFoundError, KeyError, ValueError) as e:
            print(f"Error loading model: {e}. Training a new model...")
            self.train_initial_model()

    def predict(self, input_data):
        """ Predicts the allergen status for a given food product. """
        processed_input = self.preprocessor.transform(input_data)
        prediction_encoded = self.model.predict(processed_input)[0]
        return self.label_encoder.inverse_transform([prediction_encoded])[0]

    def filter_allergenic(self, input_data):
        """ Filters input data to only include allergenic products. """
        return input_data[input_data['Allergens'].str.lower() != "none"]

    def update_model(self, input_data, correct_label):
        """ Updates the model based on user feedback by retraining with new data. """
        processed_input = self.preprocessor.transform(input_data)
        correct_label_encoded = self.label_encoder.transform([correct_label])[0]
        
        # Append new data to the existing dataset and retrain
        X_processed = np.vstack([self.preprocessor.transform(pd.read_csv('Allergen_Status_of_Food_Products.csv').drop(columns=['Prediction'])), processed_input])
        y_encoded = np.append(self.label_encoder.transform(pd.read_csv('Allergen_Status_of_Food_Products.csv')['Prediction']), correct_label_encoded)
        
        self.model.fit(X_processed, y_encoded)
        self.save_model()
        print("Model updated with new training data.")

def load_and_train_model():
    """ Loads an existing model or trains a new one if needed. """
    rl_model = RLAllergenModel()
    rl_model.load_model()
    return rl_model
