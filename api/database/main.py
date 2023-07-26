import requests
from bs4 import BeautifulSoup
import sqlite3
import re
import time

con = sqlite3.connect("players.sqlite")
cur = con.cursor()

teamdict = {
    "Arizona Cardinals":"ARI",
    "St. Louis Cardinals":"ARI",
    "Phoenix Cardinals":"ARI",
    "Chicago Cardinals":"ARI",
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
    "Dallas Texans":"KAN",
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
    "New York Titans":"NYJ",
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

def insert_team(playerID, name):
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
        INSERT INTO playerTeams VALUES ("{playerID}","{name}","{playedARI}","{playedATL}","{playedBAL}","{playedBUF}","{playedCAR}","{playedCHI}",
        "{playedCIN}","{playedCLE}","{playedDAL}","{playedDEN}","{playedDET}","{playedGNB}","{playedHOU}","{playedIND}","{playedJAX}",
        "{playedKAN}","{playedLVR}","{playedLAC}","{playedLAR}","{playedMIA}","{playedMIN}","{playedNWE}","{playedNOR}","{playedNYG}",
        "{playedNYJ}","{playedPHI}","{playedPIT}","{playedSFO}","{playedSEA}","{playedTAM}","{playedTEN}","{playedWAS}")
        """)
    #time.sleep(5)

def main():
    fileName = open('playerlinks.txt', "r")
    line_count = 0

    with fileName as file:
        for line in file:
            line_count += 1

    #print(line_count)

    for x in range(line_count):
        with open('playerlinks.txt', "r") as file:
            lines = file.readlines()

        url = lines[0].strip()
        #url = "https://www.pro-football-reference.com/players/B/BreeDr00.htm"

        # Send an HTTP GET request to the URL
        response = requests.get(url)

        # Create a BeautifulSoup object to parse the HTML content
        soup = BeautifulSoup(response.content, 'html.parser')

        # Create player ID from url
        playerID = url.split("/")[-2] + "/" + url.split("/")[-1].split(".htm")[0]

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
            soup2 = BeautifulSoup(response.text, "html.parser").text.split("College: ")[1].strip().split("(College Stats)")[0].replace('\r',"").replace('\n','').replace('\t','').replace('\f','').replace('\v','').strip()
            colleges = re.split(r',',soup2)
            for school in colleges:
                college = school.strip()

            
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

        yearsActive = []
        yearStart = 0
        yearEnd = 0

        try:
            activeTable = soup.find("table")
            activeTable = soup.find("tbody")
            if activeTable:
                rows = activeTable.find_all("tr")
                for row in rows:
                    lastyear = row.find("th",{"data-stat":"year_id"}).text
                    lastyear = re.findall(r'\d+',lastyear)
                    if lastyear != []:
                        lastyear = int(lastyear[0])
                        yearsActive.append(lastyear)

            actLen = len(yearsActive)
            yearStart = yearsActive[0]
            yearEnd = yearsActive[actLen-1]
        except:
            pass
        
        careerPassing=0
        careerPassingTD=0
        careerRushing=0
        careerRushingTD=0
        careerReceiving=0
        careerReceivingTD=0
        careerReceptions=0
        bestPassing=0
        bestPassingTD=0
        bestRushing=0
        bestRushingTD=0
        bestReceiving=0
        bestReceivingTD=0
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
        num40PassingTD=0
        num30PassingTD=0
        num20RushingTD=0
        num15RushingTD=0
        num15ReceivingTD=0
        num12ReceivingTD=0

        if position == "QB" or position == "RB" or position == "WR" or position == "TE":
            try: #Passing Table
                table = soup.find("table", {"class":"stats_table","id":"passing"})
                table = table.find("tbody")
                careerPassing=0
                careerPassingTD=0
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
                        pass_tds = row.find("td",{"data-stat":"pass_td"})
                        pass_tds = str(pass_tds)
                        pass_tds = re.findall(r'\d+',pass_tds)
                        if pass_tds == []:
                            pass
                        else:
                            pass_tds = int(pass_tds[0])
                            if pass_tds > bestPassingTD:
                                bestPassingTD = pass_tds
                            if pass_tds >= 40:
                                num40PassingTD += 1
                            if pass_tds >= 30:
                                num30PassingTD += 1     
                            careerPassingTD += pass_tds
            except:
                #print("Passing Table Not Found")
                pass

            try: #Rushing and Receiving Table
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
                        rush_tds = row.find("td", {"data-stat": "rush_td"})
                        rush_tds = str(rush_tds)
                        rush_tds = re.findall(r'\d+',rush_tds)
                        if rush_tds == []:
                            pass
                        else:
                            rush_tds = int(rush_tds[0])
                            if rush_tds > bestRushingTD:
                                bestRushingTD = rush_tds
                            if rush_tds >= 20:
                                num20RushingTD += 1
                            if rush_tds >= 15:
                                num15RushingTD += 1    
                            careerRushingTD += rush_tds
                        rec_tds = row.find("td", {"data-stat": "rec_td"})
                        rec_tds = str(rec_tds)
                        rec_tds = re.findall(r'\d+',rec_tds)
                        if rec_tds == []:
                            pass
                        else:
                            rec_tds = int(rec_tds[0])
                            if rec_tds > bestReceivingTD:
                                bestReceivingTD = rec_tds
                            if rec_tds >= 15:
                                num15ReceivingTD += 1
                            if rec_tds >= 12:
                                num12ReceivingTD += 1    
                            careerReceivingTD += rec_tds
            except:
                #print("Rushing and Receiving Table Not Found")
                pass

            try: #Receiving and Rushing Table
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
                        rush_tds = row.find("td", {"data-stat": "rush_td"})
                        rush_tds = str(rush_tds)
                        rush_tds = re.findall(r'\d+',rush_tds)
                        if rush_tds == []:
                            pass
                        else:
                            rush_tds = int(rush_tds[0])
                            if rush_tds > bestRushingTD:
                                bestRushingTD = rush_tds
                            if rush_tds >= 20:
                                num20RushingTD += 1
                            if rush_tds >= 15:
                                num15RushingTD += 1    
                            careerRushingTD += rush_tds
                        rec_tds = row.find("td", {"data-stat": "rec_td"})
                        rec_tds = str(rec_tds)
                        rec_tds = re.findall(r'\d+',rec_tds)
                        if rec_tds == []:
                            pass
                        else:
                            rec_tds = int(rec_tds[0])
                            if rec_tds > bestReceivingTD:
                                bestReceivingTD = rec_tds
                            if rec_tds >= 15:
                                num15ReceivingTD += 1
                            if rec_tds >= 12:
                                num12ReceivingTD += 1    
                            careerReceivingTD += rec_tds
            except:
                #print("Receiving and Rushing Table Not Found")
                pass


        try:
            cur.execute(f"""
                        INSERT INTO players VALUES ("{playerID}","{name}","{position}","{actLen}","{yearStart}","{yearEnd}","{team}","{college}","{draft_year}","{draft_team}","{round}","{pick}")
                        """)
        except:
            print("Player already in Players database")

        try:
            cur.execute(f"""
                            INSERT INTO playerStats VALUES("{playerID}","{name}","{careerPassing}","{careerPassingTD}","{careerRushing}","{careerRushingTD}","{careerReceiving}","{careerReceivingTD}",
                            "{careerReceptions}","{bestPassing}","{bestPassingTD}","{bestRushing}","{bestRushingTD}","{bestReceiving}","{bestReceivingTD}","{bestReceptions}","{num5000Passing}",
                            "{num4000Passing}","{num3000Passing}","{num2000Rushing}","{num1500Rushing}","{num1250Rushing}","{num1000Rushing}","{num1750Receiving}","{num1500Receiving}",
                            "{num1250Receiving}","{num1000Receiving}","{num110Receptions}","{num100Receptions}","{num40PassingTD}","{num30PassingTD}","{num20RushingTD}","{num15RushingTD}",
                            "{num15ReceivingTD}","{num12ReceivingTD}")
                            """)
        except:
            print("Player already in Stats database")


        insert_team(playerID, name)
        con.commit()

        print(f"{x+1}: Added {name}: {position} to database")

        with open('playersScraped.txt', "a") as file:
            file.writelines(url+"\n")

        lines = lines[1:]
        with open('playerlinks.txt', "w") as file:
            file.writelines(lines)

        time.sleep(7)

main()