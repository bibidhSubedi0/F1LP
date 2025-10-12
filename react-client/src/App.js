import React, { useState, useEffect } from "react";
import api from "./api/f1api";

function App() {
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    handleGetPrediction();
  }, []);

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

  const teamColors = {
    'Ferrari': '#DC0000',
    'Red Bull Racing': '#0600EF',
    'Mercedes': '#00D2BE',
    'McLaren': '#FF8700',
    'Aston Martin': '#006F62',
    'Alpine': '#0090FF',
    'Racing Bulls': '#2B4562',
    'Haas F1 Team': '#FFFFFF',
    'Kick Sauber': '#00E701',
    'Williams': '#005AFF'
  };

  const getDriverName = (code) => {
    const names = {
      'LEC': 'C. Leclerc', 'VER': 'M. Verstappen', 'RUS': 'G. Russell',
      'PIA': 'O. Piastri', 'NOR': 'L. Norris', 'HAM': 'L. Hamilton',
      'ANT': 'A. Antonelli', 'HAD': 'I. Hadjar', 'ALO': 'F. Alonso',
      'TSU': 'Y. Tsunoda', 'COL': 'J. Doohan', 'HUL': 'N. Hulkenberg',
      'DOO': 'J. Doohan', 'LAW': 'L. Lawson', 'BOR': 'G. Bortoleto',
      'GAS': 'P. Gasly', 'BEA': 'O. Bearman', 'OCO': 'E. Ocon',
      'STR': 'L. Stroll', 'SAI': 'C. Sainz', 'ALB': 'A. Albon'
    };
    return names[code] || code;
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%)',
      padding: '1.5rem',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(20px)',
          borderRadius: '20px',
          padding: '1.5rem 2rem',
          marginBottom: '1.5rem',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)'
        }}>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: '900',
            background: 'linear-gradient(135deg, #fff 0%, #e0e0e0 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: 0,
            letterSpacing: '-0.02em'
          }}>
            🏎️ F1 Race Predictor
          </h1>
        </div>

        {/* Error Message */}
        {error && (
          <div style={{
            padding: '1rem 1.5rem',
            background: 'rgba(255, 0, 0, 0.1)',
            border: '1px solid rgba(255, 0, 0, 0.3)',
            borderRadius: '12px',
            color: '#ff6b6b',
            fontSize: '0.95rem',
            marginBottom: '1.5rem',
            animation: 'slideIn 0.5s ease-out'
          }}>
            ⚠️ Error: {error}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div style={{
            textAlign: 'center',
            padding: '3rem'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              margin: '0 auto 1.5rem',
              border: '4px solid rgba(225, 6, 0, 0.2)',
              borderTop: '4px solid #e10600',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }} />
            <p style={{
              color: '#888',
              fontSize: '1.1rem',
              fontWeight: '600'
            }}>
              Loading predictions...
            </p>
          </div>
        )}

        {/* Main Grid Layout */}
        {prediction && !loading && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: '400px 1fr',
            gap: '1.5rem',
            alignItems: 'start'
          }}>
            {/* Left Column - Predictions List */}
            <div style={{
              maxHeight: 'calc(100vh - 150px)',
              overflowY: 'auto',
              paddingRight: '0.5rem'
            }}>
              {prediction.map((pred, idx) => (
                <div
                  key={idx}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  style={{
                    marginBottom: '0.5rem',
                    background: hoveredIndex === idx 
                      ? 'rgba(255, 255, 255, 0.08)' 
                      : 'rgba(255, 255, 255, 0.03)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '12px',
                    border: `1px solid ${hoveredIndex === idx ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)'}`,
                    padding: '0.75rem 1rem',
                    transition: 'all 0.2s ease',
                    transform: hoveredIndex === idx ? 'translateX(4px)' : 'translateX(0)',
                    boxShadow: hoveredIndex === idx 
                      ? '0 8px 20px rgba(0, 0, 0, 0.6)' 
                      : '0 2px 8px rgba(0, 0, 0, 0.3)',
                    animation: `slideIn 0.4s ease-out ${idx * 0.02}s both`,
                    cursor: 'default'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                  }}>
                    {/* Position */}
                    <div style={{
                      fontSize: '1.5rem',
                      fontWeight: '900',
                      color: pred.predictedNextRacePosition <= 3 
                        ? (pred.predictedNextRacePosition === 1 ? '#FFD700' 
                          : pred.predictedNextRacePosition === 2 ? '#C0C0C0' 
                          : '#CD7F32')
                        : '#fff',
                      minWidth: '40px',
                      textAlign: 'center',
                      transition: 'all 0.2s ease',
                      transform: hoveredIndex === idx ? 'scale(1.1)' : 'scale(1)'
                    }}>
                      {pred.predictedNextRacePosition}
                    </div>

                    {/* Team Color Bar */}
                    <div style={{
                      width: '4px',
                      height: '40px',
                      background: teamColors[pred.constructor] || '#666',
                      borderRadius: '2px',
                      boxShadow: `0 0 10px ${teamColors[pred.constructor] || '#666'}40`
                    }} />

                    {/* Driver Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontSize: '1rem',
                        fontWeight: '700',
                        color: '#fff',
                        marginBottom: '0.15rem',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}>
                        {getDriverName(pred.driver)}
                      </div>
                      <div style={{
                        fontSize: '0.75rem',
                        color: '#888',
                        fontWeight: '500',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}>
                        {pred.constructor}
                      </div>
                    </div>

                    {/* Driver Code */}
                    <div style={{
                      padding: '0.25rem 0.75rem',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '8px',
                      fontSize: '0.85rem',
                      fontWeight: '700',
                      color: '#fff',
                      fontFamily: 'monospace'
                    }}>
                      {pred.driver}
                    </div>

                    {/* Medal */}
                    {pred.predictedNextRacePosition <= 3 && (
                      <div style={{
                        fontSize: '1.2rem',
                        animation: hoveredIndex === idx ? 'pulse 1s ease-in-out infinite' : 'none'
                      }}>
                        {pred.predictedNextRacePosition === 1 ? '🥇' 
                          : pred.predictedNextRacePosition === 2 ? '🥈' 
                          : '🥉'}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column - Additional Data Sections */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1.5rem'
            }}>
              {/* Track Layout */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(20px)',
                borderRadius: '16px',
                padding: '1.5rem',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
                height: '300px',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '1rem'
                }}>
                  <span style={{ fontSize: '1.5rem' }}>🏁</span>
                  <h2 style={{
                    fontSize: '1.25rem',
                    fontWeight: '700',
                    color: '#fff',
                    margin: 0
                  }}>Track Layout</h2>
                </div>
                <div style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#666',
                  fontSize: '0.9rem'
                }}>
                  Track data will appear here
                </div>
              </div>

              {/* Weather Forecast */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(20px)',
                borderRadius: '16px',
                padding: '1.5rem',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
                height: '300px',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '1rem'
                }}>
                  <span style={{ fontSize: '1.5rem' }}>🌤️</span>
                  <h2 style={{
                    fontSize: '1.25rem',
                    fontWeight: '700',
                    color: '#fff',
                    margin: 0
                  }}>Weather Forecast</h2>
                </div>
                <div style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#666',
                  fontSize: '0.9rem'
                }}>
                  Weather data will appear here
                </div>
              </div>

              {/* Strategy Prediction */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(20px)',
                borderRadius: '16px',
                padding: '1.5rem',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
                height: '300px',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '1rem'
                }}>
                  <span style={{ fontSize: '1.5rem' }}>📊</span>
                  <h2 style={{
                    fontSize: '1.25rem',
                    fontWeight: '700',
                    color: '#fff',
                    margin: 0
                  }}>Strategy Prediction</h2>
                </div>
                <div style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#666',
                  fontSize: '0.9rem'
                }}>
                  Strategy data will appear here
                </div>
              </div>

              {/* H2H Wildcard Drivers */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(20px)',
                borderRadius: '16px',
                padding: '1.5rem',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
                height: '300px',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '1rem'
                }}>
                  <span style={{ fontSize: '1.5rem' }}>⚔️</span>
                  <h2 style={{
                    fontSize: '1.25rem',
                    fontWeight: '700',
                    color: '#fff',
                    margin: 0
                  }}>Wildcard H2H</h2>
                </div>
                <div style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#666',
                  fontSize: '0.9rem'
                }}>
                  Head-to-head comparison will appear here
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;