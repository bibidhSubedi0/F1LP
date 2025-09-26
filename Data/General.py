import fastf1
import os

os.makedirs('cache', exist_ok=True)
fastf1.Cache.enable_cache('cache')

years = [2025]
Sessions = ["R","Q","FP1","FP2","FP3","SSP","S"]

def GetAllRaces(year):
    races = fastf1.get_event_schedule(year)
    return races["OfficialEventName"]

def GetAllYears():
    return years

def GetRoundNumer(year):
    races = fastf1.get_event_schedule(year)
    return races["RoundNumber"]

def GetCountryOfRound(round, year):
    races = fastf1.get_event_schedule(year)
    return races["Country"][round]
