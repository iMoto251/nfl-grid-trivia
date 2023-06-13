import requests
from bs4 import BeautifulSoup
import sqlite3
import re
import time

teamdict = {
    "Arizona Cardinals":"ARI",
    "St. Louis Cardinals":"ARI",
    "Phoenix Cardinals":"ARI",
    "Atlanta Falcons":"ATL",
    "Baltimore Ravens":"BAL",
    "Buffalo Bills":"BUF",
    "Carolina Panthers":"CAR",
    "Chicago Bears":"CHI",
    "Cincinnati Bengals":"CIN",
    "Cleveland Browns":"CLE",
    "Dallas Cowboys":"DAL",
    "Denver Broncos":"DEN",
    "Detroit Lions":"DET",
    "Green Bay Packers":"GNB",
    "Houston Texans":"HOU",
    "Indianapolis Colts":"IND",
    "Baltimore Colts":"IND",
    "Jacksonville Jaguars":"JAX",
    "Kansas City Chiefs":"KAN",
    "Las Vegas Raiders":"LVR",
    "Oakland Raiders":"LVR",
    "Los Angeles Raiders":"LVR",
    "Los Angeles Chargers":"LAC",
    "San Diego Chargers":"LAC",
    "Los Angeles Rams":"LAR",
    "St. Louis Rams":"LAR",
    "Miami Dolphins":"MIA",
    "Minnesota Vikings":"MIN",
    "New England Patriots":"NWE",
    "Boston Patriots":"NWE",
    "New Orleans Saints":"NOR",
    "New York Giants":"NYG",
    "New York Jets":"NYJ",
    "Philadelphia Eagles":"PHI",
    "Pittsburgh Steelers":"PIT",
    "San Francisco 49ers":"SFO",
    "Seattle Seahawks":"SEA",
    "Tampa Bay Buccaneers":"TAM",
    "Tennessee Titans":"TEN",
    "Houston Oilers":"TEN",
    "Tennessee Oilers":"TEN",
    "Washington Commanders":"WAS",
    "Washington Redskins":"WAS",
    "Washington Football Team":"WAS"
}

snapCountLinks = [
    'https://www.pro-football-reference.com/teams/buf/2022-snap-counts.htm',
    'https://www.pro-football-reference.com/teams/mia/2022-snap-counts.htm',
    'https://www.pro-football-reference.com/teams/nwe/2022-snap-counts.htm',
    'https://www.pro-football-reference.com/teams/nyj/2022-snap-counts.htm',
    'https://www.pro-football-reference.com/teams/jax/2022-snap-counts.htm',
    'https://www.pro-football-reference.com/teams/oti/2022-snap-counts.htm',
    'https://www.pro-football-reference.com/teams/clt/2022-snap-counts.htm',
    'https://www.pro-football-reference.com/teams/htx/2022-snap-counts.htm',
    'https://www.pro-football-reference.com/teams/cin/2022-snap-counts.htm',
    'https://www.pro-football-reference.com/teams/rav/2022-snap-counts.htm',
    'https://www.pro-football-reference.com/teams/pit/2022-snap-counts.htm',
    'https://www.pro-football-reference.com/teams/cle/2022-snap-counts.htm',
    'https://www.pro-football-reference.com/teams/kan/2022-snap-counts.htm',
    'https://www.pro-football-reference.com/teams/sdg/2022-snap-counts.htm',
    'https://www.pro-football-reference.com/teams/rai/2022-snap-counts.htm',
    'https://www.pro-football-reference.com/teams/den/2022-snap-counts.htm',
    'https://www.pro-football-reference.com/teams/phi/2022-snap-counts.htm',
    'https://www.pro-football-reference.com/teams/dal/2022-snap-counts.htm',
    'https://www.pro-football-reference.com/teams/nyg/2022-snap-counts.htm',
    'https://www.pro-football-reference.com/teams/was/2022-snap-counts.htm',
    'https://www.pro-football-reference.com/teams/tam/2022-snap-counts.htm',
    'https://www.pro-football-reference.com/teams/car/2022-snap-counts.htm',
    'https://www.pro-football-reference.com/teams/nor/2022-snap-counts.htm',
    'https://www.pro-football-reference.com/teams/atl/2022-snap-counts.htm',
    'https://www.pro-football-reference.com/teams/min/2022-snap-counts.htm',
    'https://www.pro-football-reference.com/teams/det/2022-snap-counts.htm',
    'https://www.pro-football-reference.com/teams/gnb/2022-snap-counts.htm',
    'https://www.pro-football-reference.com/teams/chi/2022-snap-counts.htm',
    'https://www.pro-football-reference.com/teams/sfo/2022-snap-counts.htm',
    'https://www.pro-football-reference.com/teams/sea/2022-snap-counts.htm',
    'https://www.pro-football-reference.com/teams/ram/2022-snap-counts.htm',
    'https://www.pro-football-reference.com/teams/crd/2022-snap-counts.htm',
]

def convert_teams(teams):
    convTeams = []

    for team in teams:
        convTeams.append(teamdict[team])
    return convTeams

def insert_player(playerID):
    url = "https://www.pro-football-reference.com/players/" + playerID + ".htm"

    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    name = soup.find("h1").text.strip()
    position = soup.find("strong", string="Position").next_sibling.strip()
    position = position.replace(": ","")
    try:
        team = soup.find("strong", string="Team").find_next("a").text
        team = team.split()[-1]
    except:
        team = "FA"

    college = soup.find("strong", string='College').find_next("a").text

    try:
        draft_team = soup.find("strong", string='Draft').find_next().text
        draft_year = soup.find("a",string=draft_team).find_next().text.split(" NFL Draft")[0]

        soup1 = BeautifulSoup(response.text, 'html.parser').text.split(" of the")[0].split("in the ")[1]
        draft = re.findall(r'\d+',soup1)
        round = draft[0]
        pick = draft[1]

        draft_team = draft_team.split()[-1]
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
            #print(team_cell)
            try:
                link = team_cell.find("a")
                title = link.get("title")
                if title:
                    if title != "":
                        teams.append(title)
                    else:
                        pass
            except:
                pass
            
    else:
        print("Stats table not found.")
        
    teams = list(set(teams))
    x = convert_teams(teams)
    print(x)
    print(f'INSERT INTO players VALUES ("{playerID}","{name}","{position}","{team}","{college}","{draft_year}","{draft_team}","{round}","{pick}")')
    time.sleep(20)

def insert_team(playerID):
    url = "https://www.pro-football-reference.com/players/" + playerID + ".htm"

    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    # Create Teams array
    teams = []

    # Loop through the rows and print the data
    table = soup.find("table", class_="stats_table")
    if table:
        rows = table.find_all("tr")
        for row in rows:
            team_cell = row.find("td", {"data-stat": "team"})
            #print(team_cell)
            try:
                link = team_cell.find("a")
                title = link.get("title")
                if title:
                    if title != "":
                        teams.append(title)
                    else:
                        pass
            except:
                pass
            
    else:
        print("Stats table not found.")
        
    teams = list(set(teams))
    x = convert_teams(teams)

    playedARI="False"
    playedATL="False"
    playedBAL="False"
    playedBUF="False"
    playedCAR="False"
    playedCHI="False"
    playedCIN="False"
    playedCLE="False"
    playedDAL="False"
    playedDEN="False"
    playedDET="False"
    playedGNB="False"
    playedHOU="False"
    playedIND="False"
    playedJAX="False"
    playedKAN="False"
    playedLVR="False"
    playedLAC="False"
    playedLAR="False"
    playedMIA="False"
    playedMIN="False"
    playedNWE="False"
    playedNOR="False"
    playedNYG="False"
    playedNYJ="False"
    playedPHI="False"
    playedPIT="False"
    playedSFO="False"
    playedSEA="False"
    playedTAM="False"
    playedTEN="False"
    playedWAS="False"

    for team in x:
        match team:
            case "ARI":
                playedARI = "True"
            case "ATL":
                playedATL = "True"
            case "BAL":
                playedBAL = "True"
            case "BUF":
                playedBUF = "True"
            case "CAR":
                playedCAR = "True"
            case "CHI":
                playedCHI = "True"
            case "CIN":
                playedCIN = "True"
            case "CLE":
                playedCLE = "True"
            case "DAL":
                playedDAL = "True"
            case "DEN":
                playedDEN = "True"
            case "DET":
                playedDET = "True"
            case "GNB":
                playedGNB = "True"
            case "HOU":
                playedHOU = "True"
            case "IND":
                playedIND = "True"
            case "JAX":
                playedJAX = "True"
            case "KAN":
                playedKAN = "True"
            case "LVR":
                playedLVR = "True"
            case "LAC":
                playedLAC = "True"
            case "LAR":
                playedLAR = "True"
            case "MIA":
                playedMIA = "True"
            case "MIN":
                playedMIN = "True"
            case "NWE":
                playedNWE = "True"
            case "NOR":
                playedNOR = "True"
            case "NYG":
                playedNYG = "True"
            case "NYJ":
                playedNYJ = "True"
            case "PHI":
                playedPHI = "True"
            case "PIT":
                playedPIT = "True"
            case "SFO":
                playedSFO = "True"
            case "SEA":
                playedSEA = "True"
            case "TAM":
                playedTAM = "True"
            case "TEN":
                playedTEN = "True"
            case "WAS":
                playedWAS = "True"
            case _:
                pass
        #print(team)

    print(f"""
          DELETE FROM playerTeams where id='{playerID}'
          """)
    print(f"""
          INSERT INTO playerTeams VALUES ("{playerID}","{playedARI}","{playedATL}","{playedBAL}","{playedBUF}","{playedCAR}","{playedCHI}",
          "{playedCIN}","{playedCLE}","{playedDAL}","{playedDEN}","{playedDET}","{playedGNB}","{playedHOU}","{playedIND}","{playedJAX}",
          "{playedKAN}","{playedLVR}","{playedLAC}","{playedLAR}","{playedMIA}","{playedMIN}","{playedNWE}","{playedNOR}","{playedNYG}",
          "{playedNYJ}","{playedPHI}","{playedPIT}","{playedSFO}","{playedSEA}","{playedTAM}","{playedTEN}","{playedWAS}")
          """)
    time.sleep(5)

def main():
    con = sqlite3.connect("players.db")
    cur = con.cursor()

    for url in snapCountLinks:
        playerIDs = []

        response = requests.get(url)
        soup = BeautifulSoup(response.content,'html.parser')

        playerLinks = soup.find("table", {"id":"snap_counts"})
        if playerLinks:
            rows = playerLinks.find_all("a")
            for row in rows:
                htm = re.findall(r'htm',str(row))
                if htm:
                    link = row.get("href")
                    playerID = link.split("/")[-2] + "/" + link.split("/")[-1].split(".")[0]
                    playerIDs.append(playerID)
                    

        for playerID in playerIDs:
            id = cur.execute(f"SELECT id FROM players WHERE id='{playerID}'").fetchall()

            if id == []:
                insert_player(playerID)
                insert_team(playerID)
                #print("Miss")
                pass
            else:
                insert_team(playerID)
                #print("Hit")
                pass

        time.sleep(5)

main()