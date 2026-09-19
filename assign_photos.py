import re

with open('generate_praise.py', 'r', encoding='utf-8') as f:
    content = f.read()

# Map of name -> photo path — covers both single and double quote variations
photos = {
    'Daniel H. Pink': 'assets/praise/Daniel H. Pink.png',
    'Amy Edmondson': 'assets/praise/Amy Edmondson.png',
    'Michael Morris': 'assets/praise/Michael Morris.png',
    'Dave Ulrich': 'assets/praise/Dave Ulrich.png',
    'Jay Van Bavel': 'assets/praise/Jay Van Bavel.png',
    'Vanessa Bohns': 'assets/praise/Vanessa Bohns.png',
    'Malissa Clark': 'assets/praise/Malissa Clark.png',
    'Rebecca Hinds': 'assets/praise/Rebecca Hinds.png',
    'Alex Soojung-Kim Pang': 'assets/praise/Alex Soojung-Kim Pang.png',
    'Sebastian Wernicke': 'assets/praise/Sebastian Wernicke.png',
    'Egbert Schram': 'assets/praise/Egbert Schram.png',
    'Vivek Gambhir': 'assets/praise/Vivek Gambhir.png',
    'Ramesh Nair': 'assets/praise/Ramesh Nair.png',
    'Aparna Piramal Raje': 'assets/praise/Aparna Piramal Raje.png',
    'R Gopalakrishnan': 'assets/praise/R Gopalakrishnan.png',
    'Hari TN': 'assets/praise/Hari TN.png',
    'Professor Priya Nair Rajeev': 'assets/praise/Prof. Priya Nair Rajeev.png',
    'Sunder Ramachandran': 'assets/praise/Sunder Ramachandran.png',
    'Sumit Mitra': 'assets/praise/Sumit Mitra.png',
    'Saurabh Nigam': 'assets/praise/Saurabh Nigam.png',
    'Kavita Kurup': 'assets/praise/Kavita Kurup.png',
    'Karthi Marshan': 'assets/praise/Karthi Marshan.png',
    "S 'Venky' Venkatesh": "assets/praise/S 'Venky' Venkatesh.png",
    'Deepak Jayaraman': 'assets/praise/Deepak Jayaraman.png',
    'Rajiv Jayaraman': 'assets/praise/Rajiv Jayaraman.png',
    'Anita Bhogle': 'assets/praise/Anita Bhogle.png',
    'James Elfer': 'assets/praise/James Elfer.png',
    'Pawan Kumar Marella': 'assets/praise/Pawan Kumar Marella.png',
    'Dr. Tanvi Mankodi': 'assets/praise/Dr. Tanvi Mankodi.png',
}

for name, path in photos.items():
    # Match both single and double quoted name values, then replace photo: None
    # Pattern covers: 'name': 'X'  or  "name": "X" followed by photo: None
    pattern = re.compile(
        r'(["\']name["\']:\s*["\']' + re.escape(name) + r'["\'].*?["\']photo["\']:\s*)None',
        re.DOTALL
    )
    content = pattern.sub(lambda m: m.group(1) + f'"{path}"', content)

# Also fix the Michael Morris wrong photo (got Daniel H. Pink by mistake)
content = content.replace(
    "'name': 'Michael Morris',\n        'role': 'Professor at Columbia Business School; Author of Tribal: How the Cultural Instincts that Divide Us Can Help Bring Us Together',\n        'photo': 'assets/praise/Daniel H. Pink.png'",
    "'name': 'Michael Morris',\n        'role': 'Professor at Columbia Business School; Author of Tribal: How the Cultural Instincts that Divide Us Can Help Bring Us Together',\n        'photo': 'assets/praise/Michael Morris.png'"
)

with open('generate_praise.py', 'w', encoding='utf-8') as f:
    f.write(content)

none_count = content.count(': None')
photo_count = content.count("'assets/praise/") + content.count('"assets/praise/')
print(f"None remaining: {none_count}, Photos assigned: {photo_count}")
