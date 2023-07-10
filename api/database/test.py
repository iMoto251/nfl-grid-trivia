import requests
from bs4 import BeautifulSoup
import sqlite3
import re
import time

def main():
    fileName = open('playerlinks.txt', "r")
    line_count = 0

    with fileName as file:
        for line in file:
            line_count += 1

    for x in range(line_count):
        #url = "https://www.pro-football-reference.com/players/W/WillJa11.htm"
        #url = 'https://www.pro-football-reference.com/players/N/NewtCa00.htm'
        with open('playerlinks.txt', "r") as file:
            lines = file.readlines()

        url = lines[0].strip()

        #url = 'https://www.pro-football-reference.com/players/A/AaitIs00.htm'

            
        # Send an HTTP GET request to the URL
        response = requests.get(url)

        # Create a BeautifulSoup object to parse the HTML content
        soup = BeautifulSoup(response.content, 'html.parser')

        # Create player ID from url
        playerID = url.split("/")[-2] + "/" + url.split("/")[-1].split(".htm")[0]

        #Find name
        name = soup.find("h1").text.strip()

        updateCollege = open('updateCollege.sql','a')
        updateCollegeError = open('updateCollegeError.txt','a')
        # Find the player's college
        try:
            soup2 = BeautifulSoup(response.text, "html.parser").text.split("College: ")[1].strip().split("(College Stats)")[0].split("Weighted")[0].replace('\r',"").replace('\n','').replace('\t','').replace('\f','').replace('\v','').strip()
            colleges = re.split(r',',soup2)
            for school in colleges:
                college = school.strip()
            #print(college)

            updateCollege.write(f'UPDATE players SET college="{college}" WHERE id="{playerID}";\n')

            print(f"{name}: {college} added to SQL File")

            #print(f"UPDATE players SET college='{college}' WHERE id='{playerID}';")
            
        except:
            updateCollegeError.write(f'UPDATE players SET college="Unknown" WHERE id="{playerID}";\n')
            print(f"Error on {name}")

        with open('playersScraped.txt', "a") as file:
            file.writelines(url+"\n")

        lines = lines[1:]
        with open('playerlinks.txt', "w") as file:
            file.writelines(lines)

        time.sleep(7)

main()