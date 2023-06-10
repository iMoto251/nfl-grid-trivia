import pandas as pd
import requests
from bs4 import BeautifulSoup
import json

url = "https://www.pro-football-reference.com/players/J/JenkMa99.htm"

# Send an HTTP GET request to the URL
response = requests.get(url)

# Create a BeautifulSoup object to parse the HTML content
soup = BeautifulSoup(response.content, 'html.parser')

# Create player ID from url
playerID = url.split("/")[-1].split(".")[0]

# Find the player's name
name = soup.find("h1").text.strip()

# Find the player's position and strip colon
position = soup.find("strong", string="Position").next_sibling.strip()
position = position.replace(": ","")

# Find the player's college
college = soup.find("strong", string='College').find_next("a").text

# Find the table with class "stats_table"
table = soup.find("table", class_="stats_table")

# Find the footer section of the table
footer = table.find("tfoot")

# Find the rows in the footer
rows = footer.find_all("tr")

# Print the scraped information
print("Name:", name)
print("Position:", position)
print("College:", college)

# Create Teams array
teams = []

# Loop through the rows and print the data
for row in rows:
    data = [td.text.strip() for td in row.find_all("td")]
    if data[0] == "":
        pass
    else:
        teams.append(data[0])
        print(data[0])
        
f = open("players.txt", "a")
# f.write('{"id": "'+playerID+'","name": "'+name+'","position": "'+position+'","college": "'+college+'","teams": '+teams'},\n')

output = {
  "id": playerID,
  "name": name,
  "position": position,
  "college": college,
  "teams": teams
}

out1 = ""

print(output)

with open('players.json','w') as outfile:
    json.dump(output, outfile, indent=4)

# f.write('{"id": "'+playerID+'","name": "'+name+'","position": "'+position+'","college": "'+college+'","teams": '+teams'},\n')