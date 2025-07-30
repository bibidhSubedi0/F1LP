from jsonschema import validate, ValidationError

schema = {
    "type": "object",
    "properties": {
        "prerace": {
            "type": "object",
            "properties": {
                "driver_avg_position_10yrs": {"type": "number"},
                "driver_team_switch": {"type": "boolean"},
                "driver_championship_points": {"type": "number"},
                "constructor_championship_points": {"type": "number"},
                "track_type": {"type": "string", "enum": ["street", "permanent", "hybrid"]},
                "expected_weather": {"type": "string", "enum": ["rain", "dry", "mixed"]}
            },
            "required": ["driver_championship_points", "constructor_championship_points", "track_type", "expected_weather"]
        },
        "qualifying": {
            "type": "object",
            "properties": {
                "position": {"type": "integer"},
                "delta_to_pole": {"type": "number"}
            },
            "required": ["position"]
        }
    },
    "required": ["prerace", "qualifying"]
}

with open('data_schema.json', 'w') as f:
    import json
    json.dump(schema, f, indent=4)