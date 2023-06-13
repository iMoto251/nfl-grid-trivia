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

def convert_teams(teams):
    convTeams = []

    for team in teams:
        convTeams.append(teamdict[team])
    return convTeams

def insert_team(playerID, cur):
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

    cur.execute(f"""
          INSERT INTO playerTeams VALUES ("{playerID}","{playedARI}","{playedATL}","{playedBAL}","{playedBUF}","{playedCAR}","{playedCHI}",
          "{playedCIN}","{playedCLE}","{playedDAL}","{playedDEN}","{playedDET}","{playedGNB}","{playedHOU}","{playedIND}","{playedJAX}",
          "{playedKAN}","{playedLVR}","{playedLAC}","{playedLAR}","{playedMIA}","{playedMIN}","{playedNWE}","{playedNOR}","{playedNYG}",
          "{playedNYJ}","{playedPHI}","{playedPIT}","{playedSFO}","{playedSEA}","{playedTAM}","{playedTEN}","{playedWAS}")
          """)
    #time.sleep(5)

def main():
    con = sqlite3.connect("players.db")
    cur = con.cursor()

    fileName = open('playerlinks.txt', "r")
    line_count = 0

    with fileName as file:
        for line in file:
            line_count += 1

    for x in range(98):
        with open('playerlinks.txt', "r") as file:
            lines = file.readlines()

        url = lines[0].strip()

        # Send an HTTP GET request to the URL
        response = requests.get(url)

        # Create a BeautifulSoup object to parse the HTML content
        soup = BeautifulSoup(response.content, 'html.parser')

        # Create player ID from url
        playerID = url.split("/")[-2] + "/" + url.split("/")[-1].split(".")[0]

        # Find the player's name
        name = soup.find("h1").text.strip()

        # Find the player's position and strip colon
        try:
            position = soup.find("strong", string="Position").next_sibling.strip()
            position = position.replace(": ","")
            position = str(position).split("-")[0].split("/")[0]
        except:
            position = "Unknown"

        try:
            team = soup.find("strong", string="Team").find_next("a").text
            team = team.split()[-1]
        except:
            team = "FA"

        # Find the player's college
        try:
            college = soup.find("strong", string='College').find_next("a").text
        except:
            college = "Unknown"

        try:
            draft_team = soup.find("strong", string='Draft').find_next().text
            draft_year = soup.find("strong", string='Draft').find_next("a").find_next("a").text.split(" NFL Draft")[0].split(" AFL Draft")[0]

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

        if position == "QB":
            pass

        if position == "RB":
            pass

        if position == "WR" or position == "TE":
            pass

        if position == "RB":
            pass


        try:
            cur.execute(f"""
                        INSERT INTO players VALUES ("{playerID}","{name}","{position}","{team}","{college}","{draft_year}","{draft_team}","{round}","{pick}")
                        """)
        except:
            print("Player already in database")

        try:
            cur.execute(f"""
                        INSERT INTO players VALUES ("{playerID}","{name}","{position}","{team}","{college}","{draft_year}","{draft_team}","{round}","{pick}")
                        """)
        except:
            print("Player already in database")

        insert_team(playerID, cur)
        con.commit()

        #print(f'INSERT INTO players VALUES ("{playerID}","{name}","{position}","{team}","{college}","{draft_year}","{draft_team}","{round}","{pick}")')
        #print(f'INSERT INTO playerTeams VALUES("{playerID}",")')
        #cur.execute(f"""
        #            INSERT INTO players VALUES ("{playerID}","{name}","{position}","{team}","{college}","{draft_year}","{draft_team}","{round}","{pick}")
        #            """)
        #con.commit()

        print(f"{x}: Added {name} to database")

        with open('playersScraped.txt', "a") as file:
            file.writelines(url+"\n")

        lines = lines[1:]
        with open('playerlinks.txt', "w") as file:
            file.writelines(lines)

        time.sleep(5)

main()