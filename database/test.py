import requests
from bs4 import BeautifulSoup
import sqlite3
import re
import time

def main():
    url = "https://www.pro-football-reference.com/players/W/WillJa11.htm"
        
    # Send an HTTP GET request to the URL
    response = requests.get(url)

    # Create a BeautifulSoup object to parse the HTML content
    soup = BeautifulSoup(response.content, 'html.parser')

    # Create player ID from url
    playerID = url.split("/")[-2] + "/" + url.split("/")[-1].split(".htm")[0]

    # Find the player's name
    name = soup.find("h1").text.strip()

    #Find the player's position and strip colon
    try:
        position = soup.find("strong", string="Position").next_sibling.strip()
        position = position.replace(": ","")
    except:
        position = "Unknown"

    try:
        team = soup.find("strong", string="Team").find_next("a").text
        team = team.split()[-1]
    except:
        team = "FA"

    # Find the player's college
    try:
        college = soup.find("strong", string='College')
    except:
        college = "Unknown"

    try:
        draft_team = soup.find("strong", string='Draft').find_next().text
        draft_year = soup.find("strong", string='Draft').find_next("a").find_next("a").text.split(" NFL Draft")[0].split(" AFL Draft")[0]
        #print(draft_year)

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

    print(college)

    

    # activeTable = soup.find("table")
    # #activeTable = soup.find("tbody")
    # #print(activeTable)
    # if activeTable:
    #     rows = activeTable.find_all("tr")
    #     #print(rows)
    #     for row in rows:
    #         position = row.find("td",{"data-stat":"pos"}).text
            
            

    #         #print(activeTable)

    #cur.execute(f"""
    #            INSERT INTO players VALUES ("{playerID}","{name}","{position}","{team}","{college}","{draft_year}","{draft_team}","{round}","{pick}")
    #            """)

    #print(f"UPDATE players SET position='{position}' where id='{playerID}';")

    #con.commit()

    #print(playerID + ' ' + name + ' ' + position + ' ' + team + ' ' + draft_year + ' ' + draft_team + ' ' + round + ' ' + pick)

    # print(f"""
    #       INSERT INTO playerStats VALUES("{playerID}","{careerPassing}","{careerRushing}","{careerReceiving}","{careerReceptions}","{bestPassing}","{bestRushing}",
    #       "{bestReceiving}","{bestReceptions}","{num5000Passing}","{num4000Passing}","{num3000Passing}","{num2000Rushing}","{num1500Rushing}","{num1250Rushing}","{num1000Rushing}",
    #       "{num1750Receiving}","{num1500Receiving}","{num1250Receiving}","{num1000Receiving}","{num110Receptions}","{num100Receptions}"))
    #       """)
    # print(f'INSERT INTO players VALUES ("{playerID}","{name}","{position}","{team}","{college}","{draft_year}","{draft_team}","{round}","{pick}")')
    #print(f'INSERT INTO playerTeams VALUES("{playerID}",")')
    #cur.execute(f"""
    #            INSERT INTO players VALUES ("{playerID}","{name}","{position}","{team}","{college}","{draft_year}","{draft_team}","{round}","{pick}")
    #            """)
    #con.commit()

    #print(f"{x}: Added {name} to database")

    #time.sleep(7)

main()