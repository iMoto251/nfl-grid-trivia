import requests
from bs4 import BeautifulSoup
import sqlite3
import re
import time

def main():
    #url = "https://www.pro-football-reference.com/players/B/BreeDr00.htm"
    url = "https://www.pro-football-reference.com/players/G/GrahJi00.htm"
    #url = "https://www.pro-football-reference.com/players/J/JackLa00.htm"

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

    careerPassing=0
    careerRushing=0
    careerReceiving=0
    careerReceptions=0
    bestPassing=0
    bestRushing=0
    bestReceiving=0
    bestReceptions=0
    num5000Passing=0
    num4000Passing=0
    num3000Passing=0
    num2000Rushing=0
    num1500Rushing=0
    num1250Rushing=0
    num1000Rushing=0
    num1750Receiving=0
    num1500Receiving=0
    num1250Receiving=0
    num1000Receiving=0
    num110Receptions=0
    num100Receptions=0

    if position == "QB" or position == "RB" or position == "WR" or position == "TE":
        try: #Passing Table
            careerPassing=0
            careerRushing=0
            careerReceiving=0
            careerReceptions=0
            table = soup.find("table", {"class":"stats_table","id":"passing"})
            table = table.find("tbody")
            if table:
                rows = table.find_all("tr")
                for row in rows:
                    pass_yds = row.find("td", {"data-stat": "pass_yds"})
                    pass_yds = str(pass_yds)
                    pass_yds = re.findall(r'\d+',pass_yds)
                    if pass_yds == []:
                        pass
                    else:
                        pass_yds = int(pass_yds[0])
                        if pass_yds > bestPassing:
                            bestPassing = pass_yds
                        if pass_yds >= 5000:
                            num5000Passing += 1
                        if pass_yds >= 4000:
                            num4000Passing += 1
                        if pass_yds >= 3000:
                            num3000Passing += 1     
                        careerPassing += pass_yds
                        #print(pass_yds)
            print(careerPassing)
            print(bestPassing)
            print(num5000Passing)
            print(num4000Passing)
            print(num3000Passing)
        except:
            print("Passing Table Not Found")

        try: #Rushing and Receiving Table
            careerPassing=0
            careerRushing=0
            careerReceiving=0
            careerReceptions=0
            table = soup.find("table", {"class":"stats_table","id":"rushing_and_receiving"})
            table = table.find("tbody")
            if table:
                rows = table.find_all("tr")
                for row in rows:
                    rush_yds = row.find("td", {"data-stat": "rush_yds"})
                    rush_yds = str(rush_yds)
                    rush_yds = re.findall(r'\d+',rush_yds)
                    if rush_yds == []:
                        pass
                    else:
                        rush_yds = int(rush_yds[0])
                        if rush_yds > bestRushing:
                            bestRushing = rush_yds
                        if rush_yds >= 2000:
                            num2000Rushing += 1
                        if rush_yds >= 1500:
                            num1500Rushing += 1
                        if rush_yds >= 1250:
                            num1250Rushing += 1
                        if rush_yds >= 1000:
                            num1000Rushing += 1     
                        careerRushing += rush_yds
                        #print(rush_yds)
                    rec_yds = row.find("td", {"data-stat": "rec_yds"})
                    rec_yds = str(rec_yds)
                    rec_yds = re.findall(r'\d+',rec_yds)
                    if rec_yds == []:
                        pass
                    else:
                        rec_yds = int(rec_yds[0])
                        if rec_yds > bestReceiving:
                            bestReceiving = rec_yds
                        if rec_yds >= 1750:
                            num1750Receiving += 1
                        if rec_yds >= 1500:
                            num1500Receiving += 1
                        if rec_yds >= 1250:
                            num1250Receiving += 1
                        if rec_yds >= 1000:
                            num1000Receiving += 1     
                        careerReceiving += rec_yds
                        #print(rush_yds)
                    recs = row.find("td", {"data-stat": "rec"})
                    recs = str(recs)
                    recs = re.findall(r'\d+',recs)
                    if recs == []:
                        pass
                    else:
                        recs = int(recs[0])
                        if recs > bestReceptions:
                            bestReceptions = recs
                        if recs >= 110:
                            num110Receptions += 1
                        if recs >= 100:
                            num100Receptions += 1    
                        careerReceptions += recs
                        #print(rush_yds)
            print(careerRushing)
            print(bestRushing)
            print(num2000Rushing)
            print(num1500Rushing)
            print(num1250Rushing)
            print(num1000Rushing)
            print(careerReceiving)
            print(bestReceiving)
            print(num1750Receiving)
            print(num1500Receiving)
            print(num1250Receiving)
            print(num1000Receiving)
            print(careerReceptions)
            print(bestReceptions)
            print(num110Receptions)
            print(num100Receptions)
        except:
            print("Rushing and Receiving Table Not Found")

        try: #Receiving and Rushing Table
            careerPassing=0
            careerRushing=0
            careerReceiving=0
            careerReceptions=0
            table = soup.find("table", {"class":"stats_table","id":"receiving_and_rushing"})
            table = table.find("tbody")
            if table:
                rows = table.find_all("tr")
                for row in rows:
                    rush_yds = row.find("td", {"data-stat": "rush_yds"})
                    rush_yds = str(rush_yds)
                    rush_yds = re.findall(r'\d+',rush_yds)
                    if rush_yds == []:
                        pass
                    else:
                        rush_yds = int(rush_yds[0])
                        if rush_yds > bestRushing:
                            bestRushing = rush_yds
                        if rush_yds >= 2000:
                            num2000Rushing += 1
                        if rush_yds >= 1500:
                            num1500Rushing += 1
                        if rush_yds >= 1250:
                            num1250Rushing += 1
                        if rush_yds >= 1000:
                            num1000Rushing += 1     
                        careerRushing += rush_yds
                        #print(rush_yds)
                    rec_yds = row.find("td", {"data-stat": "rec_yds"})
                    rec_yds = str(rec_yds)
                    rec_yds = re.findall(r'\d+',rec_yds)
                    if rec_yds == []:
                        pass
                    else:
                        rec_yds = int(rec_yds[0])
                        if rec_yds > bestReceiving:
                            bestReceiving = rec_yds
                        if rec_yds >= 1750:
                            num1750Receiving += 1
                        if rec_yds >= 1500:
                            num1500Receiving += 1
                        if rec_yds >= 1250:
                            num1250Receiving += 1
                        if rec_yds >= 1000:
                            num1000Receiving += 1     
                        careerReceiving += rec_yds
                        #print(rush_yds)
                    recs = row.find("td", {"data-stat": "rec"})
                    recs = str(recs)
                    recs = re.findall(r'\d+',recs)
                    if recs == []:
                        pass
                    else:
                        recs = int(recs[0])
                        if recs > bestReceptions:
                            bestReceptions = recs
                        if recs >= 110:
                            num110Receptions += 1
                        if recs >= 100:
                            num100Receptions += 1    
                        careerReceptions += recs
                        #print(rush_yds)
            print(careerRushing)
            print(bestRushing)
            print(num2000Rushing)
            print(num1500Rushing)
            print(num1250Rushing)
            print(num1000Rushing)
            print(careerReceiving)
            print(bestReceiving)
            print(num1750Receiving)
            print(num1500Receiving)
            print(num1250Receiving)
            print(num1000Receiving)
            print(careerReceptions)
            print(bestReceptions)
            print(num110Receptions)
            print(num100Receptions)
        except:
            print("Receiving and Rushing Table Not Found")

    #cur.execute(f"""
    #            INSERT INTO players VALUES ("{playerID}","{name}","{position}","{team}","{college}","{draft_year}","{draft_team}","{round}","{pick}")
    #            """)

    #con.commit()

    print(f"""
          INSERT INTO playerStats VALUES("{playerID}","{careerPassing}","{careerRushing}","{careerReceiving}","{careerReceptions}","{bestPassing}","{bestRushing}",
          "{bestReceiving}","{bestReceptions}","{num5000Passing}","{num4000Passing}","{num3000Passing}","{num2000Rushing}","{num1500Rushing}","{num1250Rushing}","{num1000Rushing}",
          "{num1750Receiving}","{num1500Receiving}","{num1250Receiving}","{num1000Receiving}","{num110Receptions}","{num100Receptions}"))
          """)
    print(f'INSERT INTO players VALUES ("{playerID}","{name}","{position}","{team}","{college}","{draft_year}","{draft_team}","{round}","{pick}")')
    #print(f'INSERT INTO playerTeams VALUES("{playerID}",")')
    #cur.execute(f"""
    #            INSERT INTO players VALUES ("{playerID}","{name}","{position}","{team}","{college}","{draft_year}","{draft_team}","{round}","{pick}")
    #            """)
    #con.commit()

    #print(f"{x}: Added {name} to database")

    #time.sleep(5)

main()