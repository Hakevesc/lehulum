/* M-PESA Savings shared UI: icons, the account cards used on every list
   (pocket, fixed deposit, group), empty states, avatars and the member picker.
   Needs savings-store.js first. */
(function () {
  const fmt = SV.fmt;
  const IC = {
    target: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.2"/></svg>',
    individual: '<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
    fixed: '<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="15" rx="2.5"/><circle cx="12" cy="11.5" r="3.5"/><path d="M12 9.8v1.7l1.1.8M6 19v2M18 19v2"/></svg>',   // safe
    group: '<svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><circle cx="17" cy="9" r="2.6"/><path d="M15.5 14.2A5 5 0 0 1 21.5 19"/></svg>',
    cal: '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>',
    clock: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    wallet: '<svg viewBox="0 0 24 24"><path d="M3 7a2 2 0 0 1 2-2h12v4"/><rect x="3" y="7" width="18" height="13" rx="2.5"/><path d="M16 13.5h2"/></svg>',
    cv: '<svg class="cv" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg>',
    check: '<svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>',
    x: '<svg viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>'
  };

  // Avatar: photo when we have one, initials otherwise
  function av(p, cls = '') {
    if (p.avatar) return `<img class="av ${cls}" src="${p.avatar}" alt="">`;
    const ini = (p.name || '').replace(/^\+251\s*/, '').split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase();
    return `<span class="av ini ${cls}">${ini || '#'}</span>`;
  }

  function pocketCard(p) {
    const bal = SV.balanceOf(p), st = SV.statusOf(p), pct = SV.pctOf(p), d = SV.daysLeft(p);
    return `<div class="pocket" onclick="location.href='Savings - Pocket.html?id=${p.id}'">
      <div class="p-top"><span class="p-ic">${IC[p.kind]}</span><span class="p-info"><b>${p.name}</b><small>${p.kind === 'target' ? 'Target Saving' : 'Individual Saving'} · ${SV.RATE}% Interest</small></span>
        ${!p.txns.length ? '<span class="chip none">Not started</span>' : st ? `<span class="chip ${st.key}">${st.label}</span>` : '<span class="chip flex">Flexible</span>'}</div>
      ${!p.txns.length
        ? `<div class="p-amt"><b>0.00<small>ETB</small></b><button type="button" class="dep-pill" onclick="event.stopPropagation(); location.href='Savings - Amount.html?id=${p.id}&kind=deposit'">+ Deposit</button></div>`
        : p.target
        ? `<div class="p-row"><span class="l">${IC.cal}<span>${d ? d + ' days left · by ' + SV.dateStr(p.target.by) : 'Target date reached'}</span></span><span class="r">${pct}% of <b>${fmt(p.target.amount)}</b></span></div>`
        : `<div class="p-amt"><b>${fmt(bal)}<small>ETB</small></b><span>+${fmt(SV.interestOf(p))} interest</span></div>`}
    </div>`;
  }

  const FD_CHIP = { active: ['flex', 'Locked'], matured: ['reached', 'Matured'], closed: ['none', 'Closed'] };
  function depositCard(a) {
    const st = SV.fdStatus(a), [ck, cl] = FD_CHIP[st], pct = Math.round(SV.elapsed(a) / SV.termDays(a) * 100);
    const amt = st === 'matured' ? SV.maturedTotal(a) : st === 'closed' ? a.closed.paid : a.principal;
    const right = st === 'active' ? `+${fmt(SV.accrued(a))} interest` : st === 'matured' ? '<b>Ready to collect</b>' : (a.closed.how || 'Closed');
    const foot = st === 'active' ? `${SV.daysToMaturity(a)} days to maturity · ${SV.dateStr(SV.maturityOf(a))}` : st === 'matured' ? 'Matured on ' + SV.dateStr(SV.maturityOf(a)) : 'Closed on ' + SV.dateStr(a.closed.on);
    return `<div class="pocket${st === 'closed' ? ' is-closed' : ''}" onclick="location.href='Fixed Deposit - Account.html?id=${a.id}&menu=20261119c'">
      <div class="p-top"><span class="p-ic">${IC.fixed}</span><span class="p-info"><b>${a.name}</b><small>Fixed Deposit · ${a.rate}% Interest</small></span><span class="chip ${ck}">${cl}</span></div>
      <div class="p-foot">${IC.cal}<span>${foot}</span></div>
    </div>`;
  }

  function groupCard(g) {
    const bal = SV.balanceOf(g), st = SV.statusOf(g), pct = SV.pctOf(g), d = SV.daysLeft(g);
    const faces = SV.joined(g).slice(0, 4).map(m => av(SV.person(m.id))).join('');
    return `<div class="pocket" onclick="location.href='Group Saving - Group.html?id=${g.id}'">
      <div class="p-top"><span class="p-ic">${IC.group}</span><span class="p-info"><b>${g.name}</b><small>Group Saving · ${SV.membersLine(g)}</small></span><span class="chip ${st.key}">${st.label}</span></div>
      <div class="p-amt"><b>${fmt(bal)}<small>ETB</small></b><span>${pct}% of <b>${fmt(g.target.amount)}</b></span></div>
      <div class="p-foot"><span class="avs">${faces}</span><span>${d ? d + ' days left' : 'Target date reached'} · you put in ${fmt(SV.memberTotal(g, 'me'))}</span></div>
    </div>`;
  }

  const EMPTY = {
    all: ['individual', 'No Active Saving Account', 'Open your first saving to start earning interest.'],
    individual: ['individual', 'No individual savings yet', 'Save any amount, any time.'],
    target: ['target', 'No target savings yet', 'Set a goal and save toward it.'],
    fixed: ['fixed', 'No fixed deposits yet', 'Lock your money at a fixed rate.'],
    group: ['group', 'No savings groups yet', 'Create a group and save together.']
  };
  // No account of this kind yet → a create step for it (Savings list tabs pass cta = true)
  const NEW = { all: ['New Saving', "openSheet('pickSheet')"], individual: ['New Individual Saving', "location.href='Savings - Create.html?type=individual'"],
    target: ['New Target Saving', "location.href='Savings - Create.html?type=target'"], fixed: ['New Fixed Deposit', "location.href='Fixed Deposit - Plans.html'"],
    group: ['New Group Saving', "location.href='Group Saving - Create.html'"] };
  const empty = (k, cta) => { const [ic, t, s] = EMPTY[k] || EMPTY.all, n = NEW[k] || NEW.all;
    return `<div class="empty"><i>${IC[ic]}</i><b>${t}</b><small>${s}</small>${cta ? `<button class="empty-cta" type="button" onclick="${n[1]}">+ ${n[0]}</button>` : ''}</div>`; };

  /* Member picker (create group / add members): a sheet with "Add by M-PESA
     number" and the contacts. `existing` ids are locked; onDone(ids) gets the
     newly picked ids. The page provides #scrim and openSheet / closeSheets. */
  function memberPicker({ existing = [], picked = [], button = 'Done', onDone }) {
    let sel = picked.slice(), extra = [];
    let sh = document.getElementById('memberSheet');
    if (!sh) { sh = document.createElement('div'); sh.className = 'sheet tall'; sh.id = 'memberSheet'; document.querySelector('.phone-frame').appendChild(sh); }
    const isNum = id => /^7\d{8}$/.test(id);
    function paint() {
      const people = SV.CONTACTS.concat(sel.concat(extra).filter(isNum).filter((v, i, a) => a.indexOf(v) === i).map(n => SV.person(n)));
      sh.innerHTML = `<div class="sheet-grip"></div><p class="sheet-title">Add members</p>
        <p class="mp-lbl">Add by M-PESA number</p>
        <div class="mp-num"><span>+251</span><input id="mpNum" inputmode="numeric" maxlength="9" placeholder="7XX XXX XXX"><button type="button" id="mpAdd">Add</button></div>
        <p class="hint err" id="mpErr" style="display:none;margin-top:6px"></p>
        <p class="mp-lbl" style="margin-top:14px">Contacts</p>
        <div class="mp-list">${people.map(p => { const lock = existing.includes(p.id), on = sel.includes(p.id);
          return `<button type="button" class="mp-row${lock ? ' lock' : ''}${on ? ' on' : ''}" data-id="${p.id}" ${lock ? 'disabled' : ''}>${av(p)}<span><b>${p.name}</b><small>${lock ? 'Already in the group' : SV.fmtPhone(p.phone || p.id)}</small></span><i class="box">${IC.check}</i></button>`; }).join('')}</div>
        <button class="btn-primary" id="mpDone" ${sel.length ? '' : 'disabled'}>${button}${sel.length ? ' (' + sel.length + ')' : ''}</button>`;
      sh.querySelectorAll('.mp-row:not(.lock)').forEach(b => b.onclick = () => { const id = b.dataset.id; sel = sel.includes(id) ? sel.filter(x => x !== id) : sel.concat(id); paint(); });
      sh.querySelector('#mpAdd').onclick = () => {
        const n = sh.querySelector('#mpNum').value.replace(/\D/g, ''), err = sh.querySelector('#mpErr');
        const known = SV.CONTACTS.find(c => c.phone === n), id = known ? known.id : n;
        const msg = !/^7\d{8}$/.test(n) ? 'M-PESA numbers have 9 digits and start with 7'
          : existing.includes(id) || sel.includes(id) || n === SV.ME.phone ? SV.person(id).name + ' is already added' : '';
        if (msg) { err.textContent = msg; err.style.display = ''; return; }
        if (!known) extra.push(n);
        sel.push(id); paint();
      };
      sh.querySelector('#mpDone').onclick = () => { closeSheets(); onDone(sel.slice()); };
    }
    paint(); openSheet('memberSheet');
  }

  IC.repeat = '<svg viewBox="0 0 24 24"><path d="M17 2l4 4-4 4"/><path d="M3 11V9a3 3 0 0 1 3-3h15"/><path d="M7 22l-4-4 4-4"/><path d="M21 13v2a3 3 0 0 1-3 3H3"/></svg>';
  // Auto-save card for a pocket page or a group page (href opens the setup)
  function autoCard(a, href, groupMode) {
    return a ? `<div class="card auto on" onclick="location.href='${href}'"><i>${IC.repeat}</i><span><b>Auto Recurring Deposit · ${fmt(a.amount)} ETB ${SV.FREQS[a.freq].label.toLowerCase()}</b>
        <small>Next on ${SV.dateStr(a.next)} from your M-PESA wallet${a.missed ? ` · ${a.missed} skipped (low balance)` : ''}</small></span><em class="chip ${a.paused ? 'none' : 'ok'}">${a.paused ? 'Paused' : 'On'}</em></div>`
      : `<div class="card auto" onclick="location.href='${href}'"><i>${IC.repeat}</i><span><b>Auto Recurring Deposit</b>
        <small>Move money from your wallet on a schedule</small></span>${IC.cv}</div>`;
  }
  // One-time in-app notices (e.g. "Daniel accepted your invitation")
  function noticeBanner(S) {
    return SV.takeNotices(S).map(n => `<div class="notice info">${IC.group}<span>${n.text}</span></div>`).join('');
  }

  // One row of action buttons: [{ label, ic, kind: 'main'|''|'off'|'on', sub, onclick, disabled }]
  const RB = {
    plus: '<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>',
    down: '<svg viewBox="0 0 24 24"><path d="M12 4v11M7.5 10.5 12 15l4.5-4.5"/><path d="M5 20h14"/></svg>',
    members: '<svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><circle cx="17" cy="9" r="2.6"/><path d="M15.5 14.2A5 5 0 0 1 21.5 19"/></svg>'
  };
  // Shortcut tiles (Saving & Credit style): icon · label · chevron; a green dot marks Recurring Transfer as on
  // Withdraw (circle: true) is an icon-only circle at the end of the row
  const roundActions = list => list.map(a => a.circle
    ? `<button class="tcircle ${a.kind === 'off' ? 'off' : ''}" type="button" onclick="${a.onclick}"${a.disabled ? ' disabled' : ''} aria-label="${a.label}" title="${a.label}">${RB[a.ic] || IC[a.ic] || a.ic}</button>`
    : `<button class="tile ${a.kind === 'on' ? 'on' : ''}" type="button" onclick="${a.onclick}"${a.disabled ? ' disabled' : ''}><span class="t-ic">${RB[a.ic] || IC[a.ic] || a.ic}</span><span class="t-txt"><b>${a.label}</b></span><svg class="cv" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg></button>`).join('');
  // The Recurring Transfer button: grey when off, a green dot when on (label only)
  // Opens Recurring Deposits for this saving / group (its own deposits only: edit · pause · delete · new)
  const recurring = (auto, href) => ({ label: 'Recurring', ic: 'repeat', kind: auto ? 'on' : 'off', onclick: `location.href='Savings - Recurring.html?${(href.split('?')[1] || '')}&back=' + encodeURIComponent(location.pathname.split('/').pop() + location.search)` });

  window.SVUI = { IC, av, pocketCard, depositCard, groupCard, empty, memberPicker, autoCard, noticeBanner, roundActions, recurring };
})();
