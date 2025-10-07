from fastapi import FastAPI
import pandas as pd

app = FastAPI()

predictions_df = pd.read_csv("final.csv")  

@app.get("/predictions")
def get_all_predictions():
    result = predictions_df.to_dict(orient="records")
    return {"predictions": result}
