import json
from jsonschema import validate, ValidationError

with open('data_schema.json', 'r') as f:
    schema = json.load(f)

data = {
    "prerace": {
        "driver_avg_position_10yrs": 8.7,
        "driver_team_switch": False,
        "driver_championship_points": 45,
        "track_type": "street",
        "expected_weather": "dry"
    },
    "qualifying": {
        "position": 3,
        "delta_to_pole": 0.235
    }
}

try:
    validate(instance=data, schema=schema)
    print("Data is valid.")
except ValidationError as e:
    print("Data is invalid:")
    print(e.message)
