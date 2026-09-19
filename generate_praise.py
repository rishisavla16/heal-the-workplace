import re
import html

# All quotes with their structured data
quotes = [
    {
        'quote': 'For too long, we’ve treated burnout as a private failing. Kalpathi marshals the evidence to advance a more convincing explanation: Exhaustion is usually a signal from the environment, not a defect in the person. HEAL THE WORKPLACE is a human, rigorous guide to help organizations fix the mine instead of blaming the canary.',
        'name': 'Daniel H. Pink',
        'role': '#1 New York Times bestselling author of DRIVE and THE POWER OF REGRET',
        'photo': 'assets/praise/Daniel H. Pink.png'
    },
    {
        'quote': 'Heal The Workplace offers a guide to building healthier organizations, by blending compelling stories and research evidence. In a world struggling with burnout and apathy, author Subramanian Kalpathi offers a hopeful, practical roadmap for creating workplaces where people can thrive and do their best thinking.',
        'name': 'Amy Edmondson',
        'role': 'Professor, Harvard Business School; Author of Right Kind of Wrong',
        'photo': 'assets/praise/Amy Edmondson.png'
    },
    {
        'quote': 'Subramanian Kalpathi is a leading expert on organizational culture who combines research evidence with compelling case studies to reach novel conclusions. In Heal the Workplace, he looks beyond the usual questions of short term performance and asks how cultures can nurture health over the long run - both the mental health of individuals and the sustainability of the business. This is an essential book in volatile times when employees burnout and businesses go belly-up.',
        'name': 'Michael Morris',
        'role': 'Professor at Columbia Business School; Author of Tribal: How the Cultural Instincts that Divide Us Can Help Bring Us Together',
        'photo': 'assets/praise/Michael Morris.png'
    },
    {
        'quote': 'What a fantastic book! Subbu has woven it with great care, bringing together logic, tools, stories, and action in a remarkably cohesive way. In particular, the RENEW framework offers hope for every employee, leader, and organization. Ideas come from research; tools from experience; actions from application; and impact from making this book personal. The visuals and Stories Of Hope are especially compelling.',
        'name': 'Dave Ulrich',
        'role': 'Rensis Likert Professor Emeritus, University of Michigan; Partner, the RBL Group',
        'photo': 'assets/praise/Dave Ulrich.png'
    },
    {
        "quote": "We spend too much time teaching exhausted employees to cope and too little time asking why work is exhausting them. Heal The Workplace makes a compelling case that burnout is not a failure of resilience, it is often a failure of design. This book provides a thoughtful and practical guide to building organizations where people and performance can thrive together.",
        "name": "Jay Van Bavel",
        "role": "Author of The Power of Us and Professor of Psychology at New York University",
        "photo": "assets/praise/Daniel H. Pink.png"
    },
    {
        "quote": "My entire working life, I've been told that working hard is the key to success. I still believe that's true. But over time, I've realized that this advice needs some qualification, lest we all have very short careers due to burnout. I'm so grateful to Subramanian Kalpathi for offering a perspective that is both balanced and wise, and one that elevates sustainability and longevity alongside hard work.",
        "name": "Vanessa Bohns",
        "role": "Cornell professor and author of You Have More Influence Than You Think and Should I Say Something?",
        "photo": "assets/praise/Amy Edmondson.png"
    },
    {
        "quote": "Heal The Workplace is a refreshing, engaging read. Weaving together inspirational success stories with practical suggestions, the book gives organizations and leaders the tools to foster healthy workplaces that uplift workers instead of grinding them down.",
        "name": "Malissa Clark",
        "role": "Professor and Head, Department of Psychology, University of Georgia; Author of Never Not Working",
        "photo": "assets/praise/Michael Morris.png"
    },
    {
        "quote": "Conventional wisdom will tell you that burnout is a personal shortcoming. Through evidence and hard-won stories, Heal The Workplace shows much of it is rooted in broken systems. Subramanian Kalpathi offers leaders a clear-eyed path to healthier, more human workplaces.",
        "name": "Rebecca Hinds",
        "role": "Organizational expert and bestselling author of Your Best Meeting Ever",
        "photo": "assets/praise/Dave Ulrich.png"
    },
    {
        "quote": "Everyone who experiences burnout blames themselves. So do too many companies: in a world where overwork is heroic, burnout is treated as a sign of personal weakness. But Subramanian Kalpathi's new book Heal The Workplace makes a compelling case that leaders should see burnout as an organizational problem, and explains the practical steps they can take to create healthier, more sustainable businesses. Every reader and business can learn and benefit from this timely, well-argued book.",
        "name": "Alex Soojung-Kim Pang",
        "role": "Author of REST and WORK LESS DO MORE",
        "photo": "assets/praise/Jay Van Bavel.png"
    },
    {
        "quote": "Heal the Workplace dismantles the illusions of modern \u2018productivity theatre\u2019 and \u2018pseudo-agile\u2019 workflows. Through actionable, modular frameworks, Kalpathi delivers a pragmatic blueprint to engineer a culture of care that is grounded in the crucial distinction between \u2018owed\u2019 and \u2018earned\u2019 respect. An essential manual for leaders serious about building systems that sustain high performance over the long haul.",
        "name": "Sebastian Wernicke",
        "role": "Partner at Oxera Consulting and author of Data Inspired: Building an Organizational Culture of Inquiry for Lasting Transformation",
        "photo": "assets/praise/Vanessa Bohns.png"
    },
    {
        "quote": "I\u2019ve known the author for a long time, and his active practice of introspection and making sense of the world through continuous learning lies at the core of the RENEW framework Subramanian introduces in this book. The framework provides leaders with a practical blueprint to dismantle toxic dynamics and build cultures anchored in psychological safety, intentionality, and care. It is an essential read for building an enduring organization.",
        "name": "Egbert Schram",
        "role": "Group CEO, The Culture Factor Group",
        "photo": "assets/praise/Malissa Clark.png"
    },
    {
        "quote": "Before you add another meditation app, Friday yoga class or \u2018wellness day\u2019, pause on this question: why do so many workplaces create the stress they later try to fix? Heal The Workplace gets into the everyday machinery of work: managers, priorities, pace, trust, meetings and leadership behaviour, and shows how changing these can change the experience of work itself. The research is strong, the stories are compelling, and more than once I found myself thinking, \u201cI could have handled that better.\u201d Read the book. You will look at your own workplace differently on Monday morning.",
        "name": "Vivek Gambhir",
        "role": "Venture Partner, Lightspeed India",
        "photo": "assets/praise/Vivek Gambhir.png"
    },
    {
        "quote": "Many employees feel burnt out. This book goes beyond the numbers and tells leaders what they can do about it. Subbu talks simply about work pressure, toxic workplaces and the four day work week. The book makes the case that culture change begins with the inner work of the leader. Heal the Workplace is a must read for every founder and CEO who wants to build a better workplace for the long term.",
        "name": "Ramesh Nair",
        "role": "MD & CEO, Mindspace REIT",
        "photo": "assets/praise/Rebecca Hinds.png"
    },
    {
        "quote": "As India grows, we need to ask not only how fast our organizations can grow, but how well, and for how long. Heal The Workplace makes a compelling case that human wellbeing and organizational longevity are inseparable. By looking across leaders, managers, teams and individuals, it offers a timely framework for building workplaces where both people and organizations can endure and thrive.",
        "name": "Aparna Piramal Raje",
        "role": "Author, Chemical Khichdi: How I Hacked My Mental Health",
        "photo": "assets/praise/Alex Soojung-Kim Pang.png"
    },
    {
        "quote": "Are technology and urbanization increasing the pace of life? Of course. Does this impact peace of mind and mental balance? Of course. Can one avoid these tectonic changes? Of course, not. Can one learn how to cope with their effects? Of course. Swami Vivekananda advised how to do this during his travels in the USA in 1893\u2014become self-aware; protect your resources; serve others before yourself; finally, work with compassion. Easy to remember, but difficult to implement. Read young Subramanian\u2019s modern-day advice in this book.",
        "name": "R Gopalakrishnan",
        "role": "Author and Corporate Advisor",
        "photo": "assets/praise/Sebastian Wernicke.png"
    },
    {
        "quote": "Most conversations about workplace wellbeing become abstract very quickly. Heal the Workplace stays grounded in the realities of how organizations actually grow, how cultures get shaped, and how leaders behave when the pressure is on. Subramanian Kalpathi makes a persuasive case that healthy workplaces are not built through slogans or wellness initiatives, but through the everyday choices leaders make about people, performance and culture. A practical and timely book for anyone trying to build an organization that lasts.",
        "name": "Hari TN",
        "role": "Executive Chairman, STEER World; Author; Angel Investor",
        "photo": "assets/praise/Egbert Schram.png"
    },
    {
        "quote": "In my teaching of courses on Navigating Workplace Emotions: A Manager\u2019s Guide and Leading Self and Organisations, I have always emphasised that self-awareness and empathy must be reflected in the everyday choices managers make. The RENEW framework builds on this understanding and offers a clear pathway for organisations to recover from burnout, create more thoughtful cultures and find sustainable ways of working. Organisations can grow only when the people within them can also grow, contribute, and most importantly remain well.",
        "name": "Professor Priya Nair Rajeev",
        "role": "Indian Institute of Management Kozhikode",
        "photo": "assets/praise/Vivek Gambhir.png"
    },
    {
        "quote": "Subbu went looking for what actually breaks people at work, and for the few leaders building something better. His book is honest and hard to put down. Read it slowly and then go fix one thing.",
        "name": "Sunder Ramachandran",
        "role": "Chief People and Transformation Officer, Biological E Ltd",
        "photo": "assets/praise/Ramesh Nair.png"
    },
    {
        "quote": "This book challenges the comfortable excuse that burnout is a personal resilience problem and puts responsibility where it belongs: on how leaders design work, reward behaviour, and lead their teams. The Stories of Hope prove that healthy culture is a choice made by the organisation.",
        "name": "Sumit Mitra",
        "role": "Group Head \u2013 Human Resources and Corporate Services, Godrej Industries",
        "photo": "assets/praise/Aparna Piramal Raje.png"
    },
    {
        "quote": "Subbu has a rare gift \u2014 he turns lived experience into research you can act on. Heal the Workplace moves past burnout as a buzzword and gives leaders a genuine roadmap, the RENEW framework, grounded in stories from companies that chose to build differently. Essential reading for anyone who owns a culture, not just a P&L.",
        "name": "Saurabh Nigam",
        "role": "Founder, ProGrowth People Solutions",
        "photo": "assets/praise/R Gopalakrishnan.png"
    },
    {
        "quote": "I have never believed that the greatest legacy of a leader is the business they build. I believe it is the people who leave that business believing more in themselves than when they first walked through its doors. At a time when burnout is becoming normal, speed is mistaken for progress, and technology is reshaping every aspect of work, Subramanian Kalpathi offers something both rare and necessary: a deeply human blueprint for building organizations that endure. Healing the workplace is not an act of compassion alone. It is an act of leadership. And the organizations that will define the future will not be those that extract the most from people, but those that enable people to become more than they ever imagined possible.",
        "name": "Kavita Kurup",
        "role": "Chief People Officer, Cyient",
        "photo": "assets/praise/Hari TN.png"
    },
    {
        "quote": "Subramanian Kalpathi\u2019s book could not have come at a more opportune time. His exhaustive homework on what\u2019s broken, what\u2019s not, who\u2019s got it right and what we must do to prioritize employee well-being, the sine qua non for customer satisfaction as well as organizational sustainability, makes for compelling reading, as well as a nudge for action.",
        "name": "Karthi Marshan",
        "role": "Marshan.ink; President & CMO (former), Kotak Mahindra Group",
        "photo": "assets/praise/Prof. Priya Nair Rajeev.png"
    },
    {
        "quote": "In an increasingly polarised world, the business corporation can either fall into the same pattern or stand out as a beacon of hope. Author Subramanian Kalpathi\u2019s well researched Heal The Workplace is a useful guide to companies to tread the latter path and create a better and sustainable workplace for their employees.",
        "name": "S \u2018Venky\u2019 Venkatesh",
        "role": "People & Organization Advisor; CHRO Veteran for global conglomerates",
        "photo": "assets/praise/Sunder Ramachandran.png"
    },
    {
        "quote": "Every plant needs the right climate to flourish. Subramanian\u2019s book, and especially the RENEW model, gives organizations access to the control panel for them to get the climate right for the humans in the system to play to their potential! A must read if you want to be intentional about creating the right conditions for your people to thrive over the long run.",
        "name": "Deepak Jayaraman",
        "role": "Founder, Play to Potential Ecosystem (Podcast, Book, Journals)",
        "photo": "assets/praise/Sumit Mitra.png"
    },
    {
        "quote": "Work is broken in ways we have learned to normalize. Burnout is treated as an individual resilience problem. Stress is managed through wellness programs. Psychological safety is reduced to a survey score. And performance is often pursued at the expense of the very people expected to deliver it. In Heal the Workplace, author Subramanian Kalpathi argues for a different approach: we need to stop treating the symptoms and start redesigning the system. At a time when workplaces are getting relentlessly digitized, this book makes a compelling case for humanizing the workplace, where people feel safe enough to speak, healthy enough to sustain their energy, and challenged enough to perform at their best.",
        "name": "Rajiv Jayaraman",
        "role": "Founder-CEO, KNOLSKAPE; Author, Clearing the Digital BLUR",
        "photo": "assets/praise/Saurabh Nigam.png"
    },
    {
        "quote": "In a world where businesses focus on growth and agility at any cost, employee engagement and organisational wellness often get neglected. Subramanian Kalpathi\u2019s well-researched book, Heal The Workplace offers a roadmap to build organisational longevity and success by investing in thoughtful cultures in which employees don\u2019t experience burnout and teams achieve maximum productivity.",
        "name": "Anita Bhogle",
        "role": "Co-author, The Winning Way; Author, Equal, Yet Different \u2014 Career Catalysts for the Professional Woman",
        "photo": "assets/praise/Kavita Kurup.png"
    },
    {
        "quote": "In Heal the Workplace, Subramanian Kalpathi blends hard evidence about wellbeing at work with real-world stories that bring it to life. So many leaders recognise the urgency of this topic, but fail to turn it into practices that make a difference. Subbu\u2019s book is the perfect reset \u2014 a compellingly practical guide to impact.",
        "name": "James Elfer",
        "role": "Founder, MoreThanNow | Behavioural Science at Work",
        "photo": "assets/praise/Karthi Marshan.png"
    },
    {
        "quote": "What I particularly enjoyed about this book is how close to home it feels. Subbu brings workplace culture alive through real Indian stories and case studies\u2014a refreshing change from the largely Western examples we often encounter. The cartoons add wit, while the separate takeaways for founders, managers, and leaders make it wonderfully practical.",
        "name": "Pawan Kumar Marella",
        "role": "Chief Brand Officer, Max Healthcare; ex Global Marketing Vice President, Unilever",
        "photo": "assets/praise/Deepak Jayaraman.png"
    },
    {
        "quote": "What I particularly appreciate about Heal The Workplace is that it does not locate burnout and workplace distress solely within the individual. It asks us to look more closely at the cultures we create, the ways we lead, and the everyday organizational practices that can either sustain people or slowly deplete them. By bringing these ideas together through the RENEW framework, the book invites leaders to think more deliberately about what it takes to build healthier workplaces that can endure. A thoughtful and timely contribution to an important conversation about the future of work and leadership.",
        "name": "Dr. Tanvi Mankodi",
        "role": "Academician",
        "photo": "assets/praise/Rajiv Jayaraman.png"
    },
]

def make_initials_avatar(name):
    parts = name.replace('Dr. ', '').replace('Professor ', '').strip().split()
    initials = ''.join(p[0].upper() for p in parts[:2])
    return initials

def make_card(q):
    quote_html = html.escape(q['quote'])
    name_html = html.escape(q['name'])
    role_html = html.escape(q['role'])
    
    if q['photo']:
        photo_html = f'<img src="{q["photo"]}" alt="{name_html}" class="praise-photo">'
    else:
        initials = make_initials_avatar(q['name'])
        photo_html = f'<div class="praise-avatar">{initials}</div>'
    
    return f'''        <div class="praise-card">
          <div class="praise-photo-row">
            {photo_html}
            <p class="praise-attrib"><strong>{name_html}</strong><span>{role_html}</span></p>
          </div>
          <blockquote>&ldquo;{quote_html}&rdquo;</blockquote>
        </div>'''

cards = '\n'.join(make_card(q) for q in quotes)

html_out = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Praise — Heal the Workplace</title>
<meta name="description" content="Advance praise for Heal the Workplace by Subramanian (Subbu) Kalpathi.">
<link rel="canonical" href="https://healtheworkplace.com/praise" />
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="styles.css">
</head>
<body class="page-ready">

<header class="site-header">
  <div class="container">
    <a href="index.html" class="wordmark">Heal The Workplace</a>
    <button class="nav-toggle" aria-label="Toggle navigation" aria-expanded="false"><span></span></button>
    <nav class="nav-links">
      <a href="index.html#book">The Book</a>
      <a href="index.html#author">Author</a>
      <div class="nav-dropdown">
        <a href="tools/index.html" class="nav-dropdown-toggle">Tools</a>
        <div class="nav-dropdown-menu" aria-label="Tools quick links">
          <a href="tools/index.html#renew">Renew</a>
          <a href="tools/index.html#burnout-tools">Tools</a>
          <a href="tools/index.html#sketchnotes">Sketchnotes</a>
        </div>
      </div>
      <a href="index.html#order" class="btn btn-primary nav-cta">Order the book</a>
    </nav>
  </div>
</header>

<main>
  <section class="wash" id="praise">
    <div class="container">
      <div class="section-head" style="margin-bottom: 48px;">
        <h2>Praise for Heal the Workplace</h2>
      </div>
      <div class="praise-grid">
{cards}
      </div>
    </div>
  </section>
</main>

<footer class="site-footer">
  <div class="container">
    <div class="footer-top">
      <span class="footer-word">Heal the Workplace</span>
      <div class="footer-links">
        <a href="mailto:hello@healtheworkplace.com">Contact</a>
        <a href="https://www.linkedin.com/in/subuks/" target="_blank" rel="noopener">LinkedIn</a>
        <a href="https://bit.ly/m/cult_m" target="_blank" rel="noopener">Culture Matters</a>
        <a href="https://amzn.in/d/06TCLx60" target="_blank" rel="noopener">The Millennials</a>
      </div>
    </div>
  </div>
</footer>

<script src="script.js"></script>
</body>
</html>
"""

with open("praise.html", "w", encoding="utf-8") as f:
    f.write(html_out)

print(f"Generated praise.html with {len(quotes)} cards")
