from data_schema import RacePredictionFeatures, PreraceFeatures, QualifyingFeatures, PastLapsFeatures, TelemetryFeatures
from datetime import datetime


example = RacePredictionFeatures(
    driverId="max_verstappen",
    teamId="red_bull_racing",
    timestamp=datetime(2025, 8, 4, 19, 23, 9),
    prerace=PreraceFeatures(
        driverChampPoints=275,
        constructorChampPoints=400,
        trackType="street",
        expectedWeather="dry"
    ),
    qualifying=QualifyingFeatures(
        gridPosition=1,
        best3LapAvg=87.342,
        deltaToPole=0.0,
        tireBestLap="SOFT"
    ),
    pastLaps=PastLapsFeatures(
        currentLap=20,
        position=1,
        avgLapTime=88.123,
        numPitStops=1,
        timeLostInPits=22.8,
        positionsGainedLost=0,
        deltaToLeader=0.0,
        gapAhead=None,
        gapBehind=3.4
    ),
    telemetry=TelemetryFeatures(
        avgSpeed=198.7,
        throttleAvg=91.5,
        brakeUsagePct=12.2,
        drsUsageFreq=3,
        gearShiftsPerLap=52
    )
)

print(example.driverId) # 'max_verstappen'
print(example.pastLaps.currentLap) # 20