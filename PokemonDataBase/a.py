import csv

list = []
with open("PokemonData.csv", 'r', encoding="utf-8") as f:
    read = csv.reader(f)
    for line in read:
        list.append(line[0])

print(list)