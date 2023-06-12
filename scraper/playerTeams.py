import requests
from bs4 import BeautifulSoup
import sqlite3
import re

teamdict = {
    "Atlanta Falcons":"ATL",
    "Carolina Panthers":"CAR",
    "San Francisco 49ers":"SFO"
}

def convert_teams(teams):
    print("Converted Teams")
    convTeams = []

    for team in teams:
        convTeams.append(teamdict(team))

    return convTeams