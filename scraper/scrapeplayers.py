import requests
from bs4 import BeautifulSoup
import time

baseurl = "https://www.pro-football-reference.com"

file1 = open('links.txt', 'r')
urls = file1.readlines()

count = 0
for line in urls:
    count += 1
    # print(line.strip())
    url = line.strip()
    # url = "https://www.pro-football-reference.com/players/A/"
    response = requests.get(url)

    soup = BeautifulSoup(response.text, "html.parser")

    # Find the div with the id "div_players"
    div_players = soup.find("div", {"id": "div_players"})

    # Find all the player names within the div
    links = div_players.find_all("a")

    #Open file and print players
    file = open("playerlinks.txt","a")
    for link in links:
        href = link.get("href")
        if "players" in href:
            # print(baseurl+href)
            file.write(baseurl+href+"\n")
        else:
            pass
    
    time.sleep(10)
