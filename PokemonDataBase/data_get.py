from bs4 import BeautifulSoup
import requests
import csv

result = requests.get('https://hyperwiki.jp/pokemonsv/zukan/')
soup = BeautifulSoup(result.content, 'html.parser')

table = soup.find('table', class_='sortable')
names = table.find_all("strong")
stats = table.find_all("td")
data_list = []

for i in range(400):
    base_data = []
    base_data.append(names[i].get_text())
    base_data.append(stats[2 + i*8].get_text())
    base_data.append(stats[3 + i*8].get_text())
    base_data.append(stats[4 + i*8].get_text())
    base_data.append(stats[5 + i*8].get_text())
    base_data.append(stats[6 + i*8].get_text())
    base_data.append(stats[7 + i*8].get_text())
    data_list.append(base_data)

with open("PokemonData.csv", 'w') as f:
    writer = csv.writer(f, lineterminator='\n')
    writer.writerows(data_list)