import pandas as pd
import joblib
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.model_selection import train_test_split
from sklearn.impute import SimpleImputer
import os

# Function to process and train a model
def process_dataset(file_path, target_column, model_filename):
    dataset = pd.read_csv(file_path)

    # Drop rows where the target column is missing
    dataset = dataset.dropna(subset=[target_column])

    X = dataset.drop(columns=[target_column])
    y = dataset[target_column]

    # Identify numeric and categorical features
    numeric_features = X.select_dtypes(include=['int64', 'float64']).columns.tolist()
    categorical_features = X.select_dtypes(include=['object']).columns.tolist()

    # Fix: Use 'most_frequent' strategy to handle non-numeric values properly
    numeric_transformer = Pipeline(steps=[
        ('imputer', SimpleImputer(strategy='mean')),  # Mean for numerical data
        ('scaler', StandardScaler())
    ])


    categorical_transformer = Pipeline(steps=[
        ('imputer', SimpleImputer(strategy='most_frequent')),  # Handle missing categorical values
        ('onehot', OneHotEncoder(handle_unknown='ignore'))
    ])

    # Preprocessing pipeline
    preprocessor = ColumnTransformer(
        transformers=[
            ('num', numeric_transformer, numeric_features),
            ('cat', categorical_transformer, categorical_features)
        ]
    )

    # Complete pipeline with classifier
    model = Pipeline(steps=[
        ('preprocessor', preprocessor),
        ('classifier', RandomForestClassifier(random_state=42))
    ])

    # Split dataset
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Train the model
    model.fit(X_train, y_train)

    # Ensure the models folder exists
    os.makedirs("models", exist_ok=True)

    # Save model and features
    joblib.dump((model, X.columns.tolist()), f"models/{model_filename}")

# Train and save both models
process_dataset("Allergen_Status_of_Food_Products.csv", "Prediction", "allergen_model.pkl")
process_dataset("contamination_data.csv", "contamination_risk_level", "contamination_model.pkl")

print("✅ Models trained and saved successfully!")
