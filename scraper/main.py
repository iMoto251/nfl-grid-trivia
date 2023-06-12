import requests
from bs4 import BeautifulSoup
import sqlite3
import re
import time

teamdict = {
    "Atlanta Falcons":"ATL",
    "Carolina Panthers":"CAR",
    "San Francisco 49ers":"SFO"
}

def convert_teams(teams):
    print("Converted Teams")
    convTeams = []

    for team in teams:
        #newTeam = teamdict(team)
        convTeams.append(teamdict[team])
    return convTeams

def main():
    con = sqlite3.connect("players.db")
    cur = con.cursor()

    fileName = open('playerlinks.txt', "r")
    line_count = 0

    with fileName as file:
        for line in file:
            line_count += 1

    for x in range(10):
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
        masterTeam = []

        with open("teamfile.txt","r") as file:
            for line in file:
                masterTeam.append(line.strip())

        for team in teams:
            masterTeam.append(team)

        masterTeam = list(set(masterTeam))
        masterTeam.sort()
        #print(masterTeam)

        with open("teamfile.txt","w") as file:
            for team in masterTeam:
                file.writelines(team+"\n")
        
        # print(teams)

        # teamFile = open("teamfile.txt","a")
        # for team in teams:
        #     teamFile.write(team+"\n")
            

        #x = convert_teams(teams)
        #print(x)

        print(f'INSERT INTO players VALUES ("{playerID}","{name}","{position}","{team}","{college}","{draft_year}","{draft_team}","{round}","{pick}")')
        print(f'INSERT INTO playerTeams VALUES("{playerID}",")')
        #cur.execute(f"""
        #            INSERT INTO players VALUES ("{playerID}","{name}","{position}","{team}","{college}","{draft_year}","{draft_team}","{round}","{pick}")
        #            """)
        #con.commit()

        with open('playersScraped.txt', "a") as file:
            file.writelines(url+"\n")

        lines = lines[1:]
        with open('playerlinks.txt', "w") as file:
            file.writelines(lines)

        time.sleep(10)

main()