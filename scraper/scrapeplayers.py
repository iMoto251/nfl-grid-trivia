import requests
from bs4 import BeautifulSoup
import time
import re

baseurl = "https://www.pro-football-reference.com"

# file1 = open('links.txt', 'r')
# urls = file1.readlines()

#count = 0
#for line in urls:
    #count += 1
    # print(line.strip())
    #url = line.strip()
url = "https://www.pro-football-reference.com/players/A/"
response = requests.get(url)

soup = BeautifulSoup(response.text, "html.parser")

# Find the div with the id "div_players"
div_players = soup.find("div", {"id": "div_players"})

# Find all the player names within the div
links = div_players.find_all("a")

years = div_players.find_all("p")

#Open file and print players
file = open("playerlinks.txt","a")

count = 0
for link in links:
    href = link.get("href")

    test = str(years[count])
    active = re.findall(r"\d{4}",test)
    # print(active)

    if "players" in href and int(active[1]) > 1966:
        # print("POST MERGER")
        # print(baseurl+href)
        file.write(baseurl+href+"\n")
    else:
        # print("PRE MERGER")
        pass
    count += 1

#time.sleep(10)
