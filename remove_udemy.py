import os

files = ['tools/index.html', 'praise.html', 'generate_praise.py']
udemy_link = '<a href="#">Udemy course — coming soon</a>'

for filepath in files:
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        if udemy_link in content:
            content = content.replace(udemy_link + '\n        ', '')
            content = content.replace(udemy_link, '')
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f'Removed Udemy link from {filepath}')
