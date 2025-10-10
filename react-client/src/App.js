import React, { useState } from "react";
import api from "./api/f1api";

function App() {
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGetPrediction = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get("get-predictions");
      setPrediction(response.data);
    } catch (err) {
      setError(err.message);
      setPrediction(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "4rem" }}>
      <h1>F1 Race Predictor</h1>
      <button onClick={handleGetPrediction} disabled={loading}>
        {loading ? "Loading..." : "Get Prediction"}
      </button>

      {error && <p style={{ color: "red", marginTop: "1rem" }}>Error: {error}</p>}

      {prediction && (
        <p style={{ marginTop: "1rem" }}>
          <b>Prediction:</b> {JSON.stringify(prediction)}
        </p>
      )}
    </div>
  );
}

export default App;
