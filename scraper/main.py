# import pandas as pd
import requests
from bs4 import BeautifulSoup
import json
import sqlite3
import re

con = sqlite3.connect("players.db")
cur = con.cursor()

# url = "https://www.pro-football-reference.com/players/J/JenkMa99.htm"
# url = "https://www.pro-football-reference.com/players/S/ShahRa00.htm"
# url = "https://www.pro-football-reference.com/players/N/NewtCa00.htm"
url = "https://www.pro-football-reference.com/players/M/McCaCh01.htm"

# Send an HTTP GET request to the URL
response = requests.get(url)

# Create a BeautifulSoup object to parse the HTML content
soup = BeautifulSoup(response.content, 'html.parser')

# Create player ID from url
playerID = url.split("/")[-2] + "/" + url.split("/")[-1].split(".")[0]

# Find the player's name
name = soup.find("h1").text.strip()

# Find the player's position and strip colon
position = soup.find("strong", string="Position").next_sibling.strip()
position = position.replace(": ","")

try:
    team = soup.find("strong", string="Team").find_next("a").text
    team = team.split()[-1]
    # print(team)
except:
    team = "FA"

# Find the player's college
college = soup.find("strong", string='College').find_next("a").text


try:
    draft_team = soup.find("strong", string='Draft').find_next().text
    #print(draft_team)

    draft_year = soup.find("a",string=draft_team).find_next().text.split(" NFL Draft")[0]

    soup1 = BeautifulSoup(response.text, 'html.parser').text.split(" of the")[0].split("in the ")[1]
    draft = re.findall(r'\d+',soup1)
    round = draft[0]
    pick = draft[1]

    draft_team = draft_team.split()[-1]
    # print(draft_team)
    # print(draft_year)
    # print(soup1)
    # print(round)
    # print(pick)
except:
    draft_year = "Undrafted"
    draft_team = "Undrafted"
    round = "Undrafted"
    pick = "Undrafted"
    pass

# Create Teams array
teams = []

# Loop through the rows and print the data
table = soup.find("table", class_="stats_table")
if table:
    rows = table.find_all("tr")
    for row in rows:
        team_cell = row.find("td", {"data-stat": "team"})
        if team_cell:
            team_name = team_cell.get_text()
            if team_name != "" and re.findall(r'[TM]+',team_name) != ['TM']:
                teams.append(team_name)
                #print(team_name)
            else:
                pass
else:
    print("Stats table not found.")
    
teams = list(set(teams))

print(teams)

# f = open("players.txt", "a")

# output = {
#   "id": playerID,
#   "name": name,
#   "position": position,
#   "college": college,
#   "teams": teams,
#   "draft":{
#       "draftTeam": draft_team,
#       "draftYear": draft_year,
#       "draftRound": round,
#       "draftPick": pick
#   }
# }

# print(output)

# with open('players.json','a') as outfile:
#     json.dump(output, outfile, indent=2)
    
print(f'INSERT INTO players VALUES ("{playerID}","{name}","{position}","{team}","{college}","{draft_year}","{draft_team}","{round}","{pick}")')
# cur.execute(f"""
#             INSERT INTO players VALUES ("{playerID}","{name}","{position}","{team}","{college}","{draft_year}","{draft_team}","{round}","{pick}")
#             """)
# con.commit()