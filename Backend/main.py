from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import numpy as np
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

scaler = joblib.load("final_scaler.pkl")
model = joblib.load("final_rf_model.pkl")

class PatientData(BaseModel):
    age: int
    gender: str
    bmi: float
    smoking: str
    genetic_risk: str
    activity: int
    alcohol_intake: int
    cancer_history: str

@app.get("/")
def read_root():
    return {"message": "Cancer Risk Predictor API is running"}

@app.post("/predict")
def predict(data: PatientData):
    try:
        input_array = np.array([[
            data.age,
            1 if data.gender == "Male" else 0,
            data.bmi,
            1 if data.smoking == "Yes" else 0,
            1 if data.genetic_risk == "Yes" else 0,
            data.activity,
            data.alcohol_intake,
            1 if data.cancer_history == "Yes" else 0
        ]])

        scaled_input = scaler.transform(input_array)
        prediction = model.predict(scaled_input)[0]
        return {"risk": "high" if prediction == 1 else "low"}
    except Exception as e:
        return {"error": str(e)}
