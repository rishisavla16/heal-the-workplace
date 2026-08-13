/* Heal the Workplace — self-assessment engine
   Data-driven: one renderer builds all six assessments from the
   content below, scores them live, and shows the matching rubric band. */
(function () {
  'use strict';

  const SCALES = {
    agree5: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
    true3: ['Mostly False', 'Somewhat True', 'Mostly True'],
    rare3: ['Rarely True', 'Sometimes True', 'Often True'],
    freq5: ['Rarely True', 'Occasionally', 'Sometimes', 'Often', 'Always'],
  };

  const ASSESSMENTS = [
    {
      id: 'org-burnout',
      group: 'burnout',
      tag: 'For business & HR leaders',
      title: 'Organizational Burnout Risk Diagnostic',
      description:
        'Reviews workload and pacing, role clarity, recognition, team climate, fairness, and meaning across the organization.',
      scale: 'agree5',
      items: [
        ['Workload & Pacing', 'Employees can complete their work within normal hours, without consistently sacrificing personal time.'],
        ['Role Clarity & Autonomy', 'Employees have clarity on expectations and the freedom to shape how they meet their goals.'],
        ['Recognition & Feedback', 'People feel their contributions are seen, appreciated, and regularly acknowledged.'],
        ['Team Climate & Belonging', 'Team members feel psychologically safe, respected, and supported by peers and managers.'],
        ['Fairness', 'Decisions around promotions, pay, and recognition are transparent and consistently applied.'],
        ['Meaning & Purpose', 'Employees feel their work contributes to something meaningful and aligns with their values.'],
      ],
      bands: [
        { min: 6, max: 14, label: 'High Risk', text: 'Widespread structural issues likely contributing to stress and disengagement.' },
        { min: 15, max: 22, label: 'Moderate Risk', text: 'Some stressors present. Address specific gaps in culture, workload, or support.' },
        { min: 23, max: 30, label: 'Low Risk', text: 'Conditions are generally healthy. Maintain efforts and continue listening.' },
      ],
    },
    {
      id: 'team-burnout',
      group: 'burnout',
      tag: 'For managers',
      title: 'Team Burnout Risk Diagnostic',
      description: 'A manager self-assessment of how work is experienced within the team — support, safety, autonomy, and outlook.',
      scale: 'true3',
      items: [
        ['Workload & Clarity', 'Workload is fairly distributed and manageable.'],
        ['Workload & Clarity', 'Team members have clearly defined roles.'],
        ['Manager Support & Check-ins', 'I check in with my team about their well-being.'],
        ['Manager Support & Check-ins', 'I adjust work expectations when needed.'],
        ['Psychological Safety', 'Team members feel safe speaking up or admitting mistakes.'],
        ['Psychological Safety', 'There is mutual respect and openness.'],
        ['Boundaries & Breaks', 'Team members take breaks and time off without guilt.'],
        ['Boundaries & Breaks', 'I respect and model healthy boundaries.'],
        ['Recognition & Motivation', "I acknowledge my team's efforts regularly."],
        ['Recognition & Motivation', 'Work feels aligned with their strengths.'],
        ['Autonomy', 'Team members have control over how they do their work.'],
        ['Autonomy', 'I give them space to make decisions.'],
        ['Belonging', 'There is a sense of connection and inclusion in the team.'],
        ['Belonging', 'People feel like they belong.'],
        ['Competence', 'Team members feel confident in their roles.'],
        ['Competence', 'They have opportunities to grow and succeed.'],
        ['Fairness', 'Work and rewards are distributed fairly.'],
        ['Fairness', "There's transparency in recognition and decisions."],
        ['Meaning', 'Team members understand the purpose of their work.'],
        ['Meaning', 'They find it personally meaningful.'],
        ['Positive Emotions', 'Team members express hope about their goals.'],
        ['Positive Emotions', 'I see signs of resilience and self-belief in the team.'],
      ],
      bands: [
        { min: 22, max: 35, label: 'High Risk', text: 'Several critical factors are missing. Immediate attention needed to restructure support, autonomy, and fairness within the team.' },
        { min: 36, max: 49, label: 'Medium Risk', text: 'Some key elements are in place, but there are gaps. Focus on strengthening psychological resources and team dynamics.' },
        { min: 50, max: 66, label: 'Low Risk', text: 'Most key factors are well supported. Maintain and reinforce practices that foster sustainable engagement and well-being.' },
      ],
    },
    {
      id: 'individual-burnout',
      group: 'burnout',
      tag: 'For individual readers',
      title: 'Individual Burnout Risk Assessment',
      description: 'A structured, private check-in on workload, autonomy, belonging, competence, meaning, safety, and support.',
      scale: 'rare3',
      items: [
        ['Workload & Boundaries', 'I can usually complete my work within working hours.'],
        ['Workload & Boundaries', 'I regularly take breaks and time off without guilt.'],
        ['Autonomy', 'I have control over how I approach and complete my work.'],
        ['Autonomy', 'I can make decisions about my tasks with confidence.'],
        ['Sense of Belonging', 'I feel accepted and included by my team and organization.'],
        ['Sense of Belonging', 'I have a sense of connection with colleagues.'],
        ['Competence', 'I feel capable in my role and able to handle challenges.'],
        ['Competence', 'I have opportunities to use and grow my skills.'],
        ['Fairness Perception', 'I believe rewards and recognition at work are distributed fairly.'],
        ['Fairness Perception', 'I feel my contributions are valued appropriately.'],
        ['Meaning & Purpose', 'I find my work meaningful and aligned with my values.'],
        ['Meaning & Purpose', 'My tasks contribute to something I care about.'],
        ['Psychological Safety', 'I feel safe sharing concerns or mistakes at work.'],
        ['Psychological Safety', 'I can speak up without fear of judgment.'],
        ['Emotional State', 'I feel emotionally energized by my work.'],
        ['Emotional State', 'I still have the energy to enjoy tasks I used to like.'],
        ['Resilience', 'I bounce back from setbacks relatively quickly.'],
        ['Resilience', 'I have personal strategies to manage stress.'],
        ['Hope & Optimism', 'I feel hopeful about my future at work.'],
        ['Hope & Optimism', 'I believe my efforts will lead to positive outcomes.'],
        ['Support System', 'I have colleagues, friends, or mentors I can turn to during difficult times.'],
        ['Support System', "I don't feel alone when I'm under pressure."],
      ],
      bands: [
        { min: 22, max: 35, label: 'High Risk', text: 'You may be experiencing high burnout. Consider prioritizing rest, seeking support, and exploring ways to adjust your workload or environment.' },
        { min: 36, max: 49, label: 'Medium Risk', text: "You're showing moderate signs of burnout. Some areas of support are working well, but others may need attention to improve resilience." },
        { min: 50, max: 66, label: 'Low Risk', text: "You're doing well on most fronts. Continue maintaining healthy boundaries, purpose, and support systems to stay resilient." },
      ],
    },
    {
      id: 'org-culture',
      group: 'culture',
      tag: 'For business & HR leaders',
      title: 'Organizational Culture Health Check',
      description: 'Surfaces toxic behaviours, unhealthy urgency, and destructive leadership patterns across the organization.',
      scale: 'agree5',
      items: [
        ['Respect', 'People in this organization treat each other with respect, regardless of role or seniority.'],
        ['Feedback', 'Feedback flows honestly and constructively, both upward and downward.'],
        ['Transparency', 'Decisions are made transparently, with input from those affected.'],
        ['Psychological Safety', 'People feel psychologically safe to speak up, question, or share bad news.'],
        ['Accountability', 'There are clear consequences for discriminatory, bullying, or unethical behaviour, regardless of who is involved.'],
        ['Inclusion', 'Meetings and decision-making spaces include diverse voices, not just insiders.'],
        ['Internal Competition', 'The culture discourages ruthless internal competition and cutthroat behaviour.'],
        ['Fair Success', 'Success is not achieved at the expense of others; backstabbing or undercutting is not tolerated.'],
      ],
      bands: [
        { min: 8, max: 16, label: 'Toxic Culture Likely', text: 'Trust, safety, and respect may be compromised. A serious cultural reset is likely needed.' },
        { min: 17, max: 25, label: 'Toxic Tendencies Present', text: 'Cultural erosion is underway. Address known hotspots and invest in incremental change.' },
        { min: 26, max: 33, label: 'Caution Zone', text: 'Mostly healthy, but signs of stress or cultural drift. Time to listen closely and course correct.' },
        { min: 34, max: 40, label: 'Healthy Culture', text: "Strong cultural foundation. Reinforce and scale what's working." },
      ],
    },
    {
      id: 'team-culture',
      group: 'culture',
      tag: 'For managers',
      title: 'Team Culture Assessment for Managers',
      description: 'Reflects on the everyday cultural signals managers shape — norms, recognition, role modelling, and rituals.',
      scale: 'agree5',
      items: [
        ['Norms', 'Our team has clear, consistent expectations about how we treat each other, and these are upheld.'],
        ['Norms', 'I address toxic behaviours (e.g., disrespect, exclusion, abuse, aggression) quickly and constructively.'],
        ['Recognition & Rewards', 'I regularly acknowledge team members who demonstrate our values, not just those who deliver results.'],
        ['Recognition & Rewards', 'Promotions, visibility, or rewards in my team go to those who collaborate and uplift others.'],
        ['Role Modelling', 'I consistently model the behaviours I want to see (e.g., listening, admitting mistakes, staying respectful under pressure).'],
        ['Socialization', 'When someone new joins the team, I intentionally integrate them through introductions, context, early wins, and connection.'],
        ['Rituals', 'Our team has recurring practices that build connection, learning, and shared purpose (e.g., retrospectives, gratitude circles, learning huddles).'],
      ],
      bands: [
        { min: 7, max: 14, label: 'Needs Immediate Attention', text: 'Signals of toxicity or neglect may be present. Rebuild norms, address gaps directly, and seek support if needed.' },
        { min: 15, max: 21, label: 'At Risk', text: 'Culture may be drifting or inconsistent. Have open conversations with the team and create space for course correction.' },
        { min: 22, max: 29, label: 'Solid but Needs Focus', text: "You're doing many things right. Identify one or two weaker areas and make them a priority for the next quarter." },
        { min: 30, max: 35, label: 'Thriving Culture', text: "You're modelling strong cultural leadership. Keep reinforcing it and invite your team to co-own the culture." },
      ],
    },
    {
      id: 'individual-culture',
      group: 'culture',
      tag: 'For individuals',
      title: 'Toxic Culture Awareness & Accountability Self-Assessment',
      description: 'Reflects on your role in shaping, challenging, or unintentionally enabling toxic dynamics at work.',
      scale: 'freq5',
      items: [
        ['Awareness', 'I can identify subtle toxic behaviours like exclusion, micromanagement, passive aggression, or gaslighting, both in others and myself.'],
        ['Integrity', 'I do not tolerate disrespect, even if it comes from someone with power or influence.'],
        ['Voice', 'I speak up (or signal support) when I witness toxic or unfair behaviour, even in small ways.'],
        ['Respect', 'I engage with people respectfully regardless of their role or status.'],
        ['Accountability', "When I've contributed to a toxic exchange (e.g., sarcasm, disrespect, dismissal), I own it and make amends."],
        ['Influence', 'I actively model psychological safety in meetings and discussions.'],
      ],
      bands: [
        { min: 6, max: 13, label: 'Unintentional Contributor', text: "Your actions may be reinforcing toxic dynamics, even if that's not your intent. Awareness and small shifts can begin real change." },
        { min: 14, max: 19, label: 'At Risk of Enabling', text: 'You may be avoiding or normalizing harmful behaviours. Consider where fear, fatigue, or ambiguity are keeping you silent.' },
        { min: 20, max: 25, label: 'Aware Ally', text: 'You notice toxic signals and make efforts to push back. Focus now on being more visible and consistent in your response.' },
        { min: 26, max: 30, label: 'Culture Corrector', text: "You're a strong force for cultural health. You model and protect psychological safety consistently." },
      ],
    },
  ];

  function bandForScore(bands, score) {
    return bands.find((b) => score >= b.min && score <= b.max) || null;
  }

  function buildCard(assessment) {
    const scaleLabels = SCALES[assessment.scale];
    const maxScore = assessment.items.length * scaleLabels.length;

    const card = document.createElement('details');
    card.className = 'assess-card';
    card.id = assessment.id;

    const summary = document.createElement('summary');
    summary.className = 'assess-summary';
    summary.innerHTML = `
      <div class="assess-summary-left">
        <span class="assess-tag">${assessment.tag}</span>
        <h3>${assessment.title}</h3>
        <p>${assessment.description}</p>
      </div>
      <span class="assess-toggle" aria-hidden="true">
        <svg viewBox="0 0 16 16" fill="none"><path d="M8 1v14M1 8h14" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
      </span>
    `;
    card.appendChild(summary);

    const body = document.createElement('div');
    body.className = 'assess-body';

    const scaleNote = document.createElement('p');
    scaleNote.className = 'assess-scale-note';
    scaleNote.textContent = 'Scale: ' + scaleLabels.map((l, i) => `${i + 1} = ${l}`).join('  ·  ');
    body.appendChild(scaleNote);

    const rowsWrap = document.createElement('div');
    assessment.items.forEach((item, idx) => {
      const [dim, statement] = item;
      const row = document.createElement('div');
      row.className = 'assess-row';
      const groupName = `${assessment.id}-q${idx}`;

      const scaleHTML = scaleLabels
        .map((_, i) => {
          const val = i + 1;
          const inputId = `${groupName}-${val}`;
          return `<input type="radio" name="${groupName}" id="${inputId}" value="${val}" data-item="${idx}">
                  <label for="${inputId}" title="${scaleLabels[i]}">${val}</label>`;
        })
        .join('');

      row.innerHTML = `
        <div class="assess-row-text">
          <span class="dim">${dim}</span>
          <p class="stmt">${statement}</p>
        </div>
        <div class="scale">${scaleHTML}</div>
      `;
      rowsWrap.appendChild(row);
    });
    body.appendChild(rowsWrap);

    const footer = document.createElement('div');
    footer.className = 'assess-footer';
    footer.innerHTML = `
      <div class="assess-score">
        <span class="num">0</span><span class="of">/ ${maxScore}</span>
      </div>
      <span class="assess-progress">0 of ${assessment.items.length} answered</span>
      <button type="button" class="assess-reset">Reset</button>
    `;
    body.appendChild(footer);

    const result = document.createElement('div');
    result.className = 'assess-result';
    result.innerHTML = `<p class="rlabel"></p><p class="rtext"></p>`;
    body.appendChild(result);

    card.appendChild(body);

    /* ---- behaviour ---- */
    const numEl = footer.querySelector('.num');
    const progressEl = footer.querySelector('.assess-progress');
    const rlabel = result.querySelector('.rlabel');
    const rtext = result.querySelector('.rtext');

    function recompute() {
      const radios = body.querySelectorAll('input[type="radio"]:checked');
      let total = 0;
      radios.forEach((r) => (total += Number(r.value)));
      numEl.textContent = String(total);
      progressEl.textContent = `${radios.length} of ${assessment.items.length} answered`;

      if (radios.length === assessment.items.length) {
        const band = bandForScore(assessment.bands, total);
        if (band) {
          rlabel.textContent = band.label;
          rtext.textContent = band.text;
          result.classList.add('is-visible');
        }
      } else {
        result.classList.remove('is-visible');
      }
    }

    body.addEventListener('change', (e) => {
      if (e.target && e.target.matches('input[type="radio"]')) recompute();
    });

    footer.querySelector('.assess-reset').addEventListener('click', () => {
      body.querySelectorAll('input[type="radio"]:checked').forEach((r) => (r.checked = false));
      recompute();
    });

    return card;
  }

  function mount() {
    const groups = document.querySelectorAll('[data-assess-group]');
    groups.forEach((mountPoint) => {
      const key = mountPoint.getAttribute('data-assess-group');
      ASSESSMENTS.filter((a) => a.group === key).forEach((a) => mountPoint.appendChild(buildCard(a)));
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
