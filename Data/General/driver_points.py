import fastf1
import pandas as pd
from collections import defaultdict

# Enable cache
fastf1.Cache.enable_cache('cache')


def season_points_with_next_position(year: int = 2024, verbose: bool = False) -> pd.DataFrame:
    # Full schedule
    schedule = fastf1.get_event_schedule(year).reset_index(drop=True)
    schedule = schedule[schedule['EventFormat'] == 'conventional'].reset_index(drop=True)

    driver_points = defaultdict(float)
    constructor_points = defaultdict(float)
    driver_info = {}

    all_rows = []

    for pos, ev in schedule.iterrows():
        race_name = ev['EventName']

        if verbose:
            print(f"\n=== {race_name} ===")

        # Load results of current race first (to get participants + finishing positions)
        try:
            ses = fastf1.get_session(year, race_name, 'R')
            ses.load()
            res = ses.results.copy()
            res['Points'] = pd.to_numeric(res['Points'], errors='coerce').fillna(0.0)
        except Exception as e:
            print(f"Warning: could not load {race_name}: {e}")
            continue

        # Build rows for each driver, using standings BEFORE this race
        rows = []
        for _, row in res.iterrows():
            dn = int(row['DriverNumber'])
            abbr = row['Abbreviation']
            team = row['TeamName']

            driver_info[dn] = (abbr, team)

            rows.append({
                'DriverNumber': dn,
                'Driver': abbr,
                'Constructor': team,
                'RaceName': race_name,
                'DriverPointsSoFar': driver_points.get(dn, 0.0),
                'ConstructorPointsSoFar': constructor_points.get(team, 0.0),
                'NextRacePosition': int(row['Position']) if not pd.isna(row['Position']) else None
            })

        all_rows.extend(rows)

        # After recording, update totals with this race’s results
        for _, row in res.iterrows():
            dn = int(row['DriverNumber'])
            team = row['TeamName']
            pts = float(row['Points'])
            driver_points[dn] += pts
            constructor_points[team] += pts

    df = pd.DataFrame(all_rows).set_index('DriverNumber').sort_index()
    return df


if __name__ == "__main__":
    df = season_points_with_next_position(2024, verbose=True)
    print(df.head(40))  # show first couple of races

df.to_csv("so_far.csv",index=False)