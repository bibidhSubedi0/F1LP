from typing import Optional, List, Literal
from pydantic import BaseModel, Field
from datetime import datetime

class PreraceFeatures(BaseModel):
    driverChampPoints: Optional[int] = Field(
        None, description="Driver's championship points before this race"
    )
    constructorChampPoints: Optional[int] = Field(
        None, description="Constructor's points before this race"
    )
    trackType: Optional[Literal["street", "permanent", "hybrid"]] = Field(
        None, description="Type of circuit"
    )
    expectedWeather: Optional[Literal["rain", "dry", "mixed"]] = Field(
        None, description="Expected weather conditions"
    )

class QualifyingFeatures(BaseModel):
    gridPosition: Optional[int] = Field(
        None, description="Starting grid position"
    )
    best3LapAvg: Optional[float] = Field(
        None, description="Average of best 3 qualifying lap times (seconds)"
    )
    deltaToPole: Optional[float] = Field(
        None, description="Delta to pole position in seconds"
    )
    tireBestLap: Optional[Literal["SOFT", "MEDIUM","HARD","INTER","WET"]] = Field(
        None, description="Tire compound used for best lap"
    )

class PastLapsFeatures(BaseModel):
    currentLap: Optional[int] = Field(
        None, description="Current lap number"
    )
    position: Optional[int] = Field(
        None, description="Current race position"
    )
    avgLapTime: Optional[float] = Field(
        None, description="Average lap time over recent laps (seconds)"
    )
    numPitStops: Optional[int] = Field(
        None, description="Number of pit stops so far"
    )
    timeLostInPits: Optional[float] = Field(
        None, description="Total time lost in pits (seconds)"
    )
    positionsGainedLost: Optional[int] = Field(
        None, description="Net positions gained or lost since race start"
    )
    deltaToLeader: Optional[float] = Field(
        None, description="Time gap to race leader (seconds)"
    )
    gapAhead: Optional[float] = Field(
        None, description="Gap to car ahead (seconds)"
    )
    gapBehind: Optional[float] = Field(
        None, description="Gap to car behind (seconds)"
    )

class TelemetryFeatures(BaseModel):
    avgSpeed: Optional[float] = Field(
        None, description="Average speed over lap (km/h)"
    )
    throttleAvg: Optional[float] = Field(
        None, description="Average throttle percentage over lap"
    )
    brakeUsagePct: Optional[float] = Field(
        None, description="Brake usage as a percentage of lap"
    )
    drsUsageFreq: Optional[float] = Field(
        None, description="DRS activation count/lap"
    )
    gearShiftsPerLap: Optional[int] = Field(
        None, description="Number of gear shifts per lap"
    )
    
class RacePredictionFeatures(BaseModel):
    driverId: str = Field(..., description="Unique driver identifier")
    teamId: str = Field(..., description="Unique team identifier")
    timestamp: datetime = Field(..., description="UTC timestamp of sample")
    prerace: Optional[PreraceFeatures] = None
    qualifying: Optional[QualifyingFeatures] = None
    pastLaps: Optional[PastLapsFeatures] = None
    telemetry: Optional[TelemetryFeatures] = None

import json
if __name__ == "__main__":
    json_data = json.dumps(RacePredictionFeatures.model_json_schema(), indent=2)
    
    with open('data_schema.json', 'w') as json_file:
        json_file.write(json_data)

    print("JSON file saved successfully!")