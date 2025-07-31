import Plot from 'react-plotly.js'
import './App.css'

function App() {
  const driverPositions = [
    { driver: "VER", position: 1, team: "Red Bull Racing", prediction: 1, trend: "stable", gap: "Leader", interval: "1:23.456" },
    { driver: "PER", position: 2, team: "Red Bull Racing", prediction: 3, trend: "down", gap: "+2.341", interval: "1:23.678" },
    { driver: "HAM", position: 3, team: "Mercedes", prediction: 2, trend: "up", gap: "+3.812", interval: "1:23.567" },
    { driver: "LEC", position: 4, team: "Ferrari", prediction: 4, trend: "stable", gap: "+5.241", interval: "1:23.789" },
    { driver: "SAI", position: 5, team: "Ferrari", prediction: 5, trend: "stable", gap: "+7.142", interval: "1:23.890" }
  ]

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div className="header-title">
            <h1>F1 Race Predictor</h1>
            <div className="race-info">
              <span>Austrian Grand Prix 2025</span>
              <span>•</span>
              <span>Lap 23/58</span>
              <span>•</span>
              <span>Live</span>
            </div>
          </div>
          <div className="header-time">
            <div className="time">2025-07-31 21:27:22</div>
            <div className="timezone">UTC</div>
          </div>
        </div>
      </header>

      <main className="container">
        <div className="data-grid">
          <div className="standings-section">
            <div className="section-header">
              <h2>Live Standings</h2>
              <span className="update-time">Last update: 21:27:22 UTC</span>
            </div>
            <div className="standings-table">
              <div className="table-header">
                <span>POS</span>
                <span>DRIVER</span>
                <span>PREDICTED</span>
                <span>INTERVAL</span>
              </div>
              {driverPositions.map((driver) => (
                <div key={driver.driver} className="driver-row">
                  <span className="position">{driver.position}</span>
                  <div className="driver-info">
                    <span className="driver-code">{driver.driver}</span>
                    <span className="team-name">{driver.team}</span>
                  </div>
                  <div className="prediction">
                    <span className={`pred-position ${driver.trend}`}>P{driver.prediction}</span>
                  </div>
                  <span className="interval">{driver.interval}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="predictions-section">
            <div className="section-header">
              <h2>Race Position Predictions</h2>
              <span className="update-time">Last update: 21:27:22 UTC</span>
            </div>
            <Plot
              data={[
                {
                  x: [1, 5, 10, 15, 20, 23],
                  y: [1, 1, 1, 1, 1, 1],
                  type: 'scatter',
                  mode: 'lines',
                  name: 'VER',
                  line: { color: '#3498db', width: 3 }
                },
                {
                  x: [1, 5, 10, 15, 20, 23],
                  y: [3, 2, 2, 2, 2, 2],
                  type: 'scatter',
                  mode: 'lines',
                  name: 'HAM',
                  line: { color: '#2ecc71', width: 3 }
                }
              ]}
              layout={{
                paper_bgcolor: '#1a1a1a',
                plot_bgcolor: '#1a1a1a',
                font: { color: '#ffffff' },
                xaxis: {
                  title: 'Lap Number',
                  gridcolor: '#333333',
                  zerolinecolor: '#333333'
                },
                yaxis: {
                  title: 'Position',
                  autorange: 'reversed',
                  range: [1, 20],
                  gridcolor: '#333333',
                  zerolinecolor: '#333333'
                },
                autosize: true,
                showlegend: true,
                legend: { orientation: 'h', y: -0.2 },
                margin: { t: 30, r: 30, l: 50, b: 50 }
              }}
              style={{ width: '100%', height: '500px' }}
              useResizeHandler={true}
            />
          </div>
        </div>
      </main>
    </div>
  )
}

export default App