import os

files = ['tools/index.html', 'praise.html', 'generate_praise.py']
for filepath in files:
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Remove newsletter link
        newsletter_link = '<a href="https://getculturedispatch.substack.com/" target="_blank" rel="noopener">Newsletter</a>'
        if newsletter_link in content:
            content = content.replace(newsletter_link + '\n        ', '')
            content = content.replace(newsletter_link, '')
        
        # Update Also by Subbu to The Millennials
        also_by_subbu = '<a href="https://amzn.in/d/06TCLx60" target="_blank" rel="noopener">Also by Subbu</a>'
        the_millennials = '<a href="https://amzn.in/d/06TCLx60" target="_blank" rel="noopener">The Millennials</a>'
        content = content.replace(also_by_subbu, the_millennials)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'Updated {filepath}')
