/* M-PESA Savings prototype store — Individual, Target, Fixed Deposit and Group
   saving (adopted from the super-app Savings spec). State lives in sessionStorage ('mpSavings'); the
   in-flight action (opt-in, create, deposit, withdraw, close) in 'savingData'.
   Interest is derived, never stored: 7% p.a. per movement from its own day. */
(function () {
  const RATE = 7;              // % per year, Individual and Target
  const TARGET_MIN = 500;      // smallest goal
  const WALLET = 75000;        // M-PESA main balance used by the prototype
  const DAY = 864e5;
  const VERSION = 4;
  const iso = d => new Date(Date.now() + d * DAY).toISOString();
  const addMonths = (s, m) => { const d = new Date(s); d.setMonth(d.getMonth() + m); return d.toISOString(); };
  const days = (a, b) => (new Date(b) - new Date(a)) / DAY;

  // Fixed deposit: one partner bank, four lock plans
  const PARTNER = { name: 'Awash Bank', logo: 'assets/banks logo/awass-bank.png' };
  const PLANS = [{ months: 3, min: 10000, rate: 8 }, { months: 6, min: 20000, rate: 9 }, { months: 9, min: 30000, rate: 9.5 }, { months: 12, min: 50000, rate: 10 }];
  // Group saving: me plus the address book
  const AV = 'assets/avatars/';
  const ME = { id: 'me', name: 'Mikias', phone: '711223344', avatar: AV + 'avatar-2.png' };
  const CONTACTS = [
    { id: 'c1', name: 'Beth Obura', phone: '712345678', avatar: AV + 'avatar-1.png' },
    { id: 'c3', name: 'Sara Tesfaye', phone: '713456789', avatar: AV + 'avatar-3.png' },
    { id: 'c4', name: 'Daniel Bekele', phone: '714567890', avatar: AV + 'avatar-4.png' },
    { id: 'c5', name: 'Hana Girma', phone: '715678901', avatar: AV + 'avatar-5.png' },
    { id: 'c6', name: 'Yonas Alemu', phone: '716789012', avatar: AV + 'avatar-6.png' }
  ];
  const LEAVE_NEEDED = 3;      // other members who must approve a leave request
  // Auto-save: a recurring wallet → saving transfer
  const AUTO_MIN = 50;
  const FREQS = { daily: { label: 'Daily', every: 'every day' }, weekly: { label: 'Weekly', every: 'every week' }, monthly: { label: 'Monthly', every: 'every month' } };
  const fmt = n => Number(n || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const dateStr = s => new Date(s).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

  function seed() {
    return {
      optedIn: false, wallet: WALLET, notices: [],   // first visit shows the opt-in; the sample pockets appear after it
      pockets: [
        { id: 'IS90212410', kind: 'target', name: 'New Phone', opened: iso(-120), target: { amount: 35000, from: iso(-120), by: iso(60) },
          auto: { amount: 3000, freq: 'monthly', start: iso(-4), next: iso(26) },
          txns: [{ type: 'DEPOSIT', amount: 8000, on: iso(-120) }, { type: 'DEPOSIT', amount: 6000, on: iso(-75) }, { type: 'DEPOSIT', amount: 6000, on: iso(-20) }, { type: 'DEPOSIT', amount: 5000, on: iso(-4) }] },
        { id: 'IS90212455', kind: 'target', name: 'Emergency Fund', opened: iso(-90), target: { amount: 15000, from: iso(-90), by: iso(30) },
          txns: [{ type: 'DEPOSIT', amount: 4000, on: iso(-90) }, { type: 'DEPOSIT', amount: 3200, on: iso(-30) }] },
        { id: 'IS90212501', kind: 'individual', name: 'Rainy Day', opened: iso(-60), target: null,
          auto: { amount: 250, freq: 'weekly', start: iso(3), next: iso(3) },
          txns: [{ type: 'DEPOSIT', amount: 3000, on: iso(-60) }, { type: 'WITHDRAW', amount: 590, on: iso(-12) }] }
      ],
      // A 12-month deposit with 210 days to go, and a 3-month one that matured 8 days ago
      deposits: [
        deposit('FD20417731', PLANS[3], 50000, addMonths(iso(210), -12)),
        deposit('FD20398105', PLANS[0], 10000, addMonths(iso(-8), -3))
      ],
      groups: [
        { id: 'GS30215547', kind: 'group', name: 'Family Trip', admin: 'me', opened: iso(-60), closed: null,
          target: { amount: 60000, from: iso(-60), by: iso(120) },
          members: [{ id: 'me' }, { id: 'c1' }, { id: 'c3' }, { id: 'c6' }, { id: 'c4', pending: true }],
          leave: { who: 'c3', approvals: ['c1', 'c6'], on: iso(-1) },
          auto: { amount: 2000, freq: 'monthly', start: iso(15), next: iso(15) },
          txns: [tx(8000, -60, 'me'), tx(6000, -45, 'c1'), tx(5000, -30, 'c3'), tx(3500, -28, 'c6'), tx(4000, -15, 'me'), tx(2500, -2, 'c1')] },
        { id: 'GS81904412', kind: 'group', name: 'Office Fund', admin: 'c5', opened: iso(-90), closed: null,
          target: { amount: 20000, from: iso(-90), by: iso(30) },
          members: [{ id: 'c5' }, { id: 'me' }, { id: 'c1' }, { id: 'c6' }, { id: 'c3' }],
          leave: null,
          txns: [tx(3000, -88, 'c5'), tx(2000, -80, 'me'), tx(2000, -70, 'c1'), tx(1500, -60, 'c6'), tx(1500, -40, 'c3'), tx(1000, -20, 'me')] }
      ]
    };
  }
  function tx(amount, d, by) { return { type: 'DEPOSIT', amount, on: iso(d), by }; }
  function deposit(id, plan, principal, opened) {
    return { id, name: plan.months + ' Months Lock', months: plan.months, rate: plan.rate, principal, opened, closed: null, txns: [{ type: 'DEPOSIT', amount: principal, on: opened }] };
  }
  function load() {
    try {
      const s = JSON.parse(sessionStorage.getItem('mpSavings') || 'null');
      if (s && s.pockets && +sessionStorage.getItem('mpSavingsV') === VERSION) { if (applyAuto(s)) save(s); return s; }
    } catch (e) {}
    const s = seed(); save(s); return s;
  }
  function save(s) { try { sessionStorage.setItem('mpSavings', JSON.stringify(s)); sessionStorage.setItem('mpSavingsV', VERSION); } catch (e) {} }

  const balanceOf = p => p.txns.reduce((a, t) => a + (t.type === 'WITHDRAW' ? -t.amount : t.amount), 0);
  // Each movement earns from its own day forward, so a withdrawal stops earning
  const interestOf = p => Math.max(0, p.txns.reduce((a, t) => a + (t.type === 'WITHDRAW' ? -1 : 1) * t.amount * RATE / 100 * Math.max(0, (Date.now() - new Date(t.on)) / DAY) / 365, 0));
  const daysLeft = p => p.target ? Math.max(0, Math.ceil((new Date(p.target.by) - Date.now()) / DAY)) : null;
  const pctOf = p => p.target ? Math.min(100, Math.round(balanceOf(p) / p.target.amount * 100)) : null;
  // REACHED / NOT STARTED / ON TRACK / BEHIND (pro-rata share due so far)
  function statusOf(p) {
    if (!p.target) return null;
    const bal = balanceOf(p);
    if (bal >= p.target.amount) return { key: 'reached', label: 'Reached' };
    if (bal <= 0) return { key: 'none', label: 'Not started' };
    const span = new Date(p.target.by) - new Date(p.target.from), done = Math.min(1, Math.max(0, (Date.now() - new Date(p.target.from)) / span));
    return bal >= p.target.amount * done ? { key: 'ok', label: 'On track' } : { key: 'behind', label: 'Behind' };
  }
  // Monthly amount still needed to reach the goal on time
  function monthlyNeeded(goal, saved, by) {
    const months = Math.max(1, Math.ceil((new Date(by) - Date.now()) / (30.4 * DAY)));
    return Math.max(0, Math.ceil((goal - saved) / months));
  }
  const newId = (pre = 'IS') => pre + String(Date.now()).slice(-8);

  // ── Auto-save ──
  const nextRun = (on, freq) => freq === 'monthly' ? addMonths(on, 1) : new Date(+new Date(on) + (freq === 'weekly' ? 7 : 1) * DAY).toISOString();
  // How many transfers fit from `start` up to and including `by`
  function runsUntil(start, by, freq) { let n = 0; for (let d = start; new Date(d) <= new Date(by) && n < 2000; d = nextRun(d, freq)) n++; return Math.max(1, n); }
  // The amount per transfer that lands exactly on the goal
  const suggested = (goal, saved, start, by, freq) => Math.max(AUTO_MIN, Math.ceil(Math.max(0, goal - saved) / runsUntil(start, by, freq)));
  // Date of the transfer that reaches the goal
  function reachesOn(goal, saved, auto) { const n = Math.ceil(Math.max(0, goal - saved) / auto.amount); let d = auto.next || auto.start; for (let i = 1; i < n && i < 2000; i++) d = nextRun(d, auto.freq); return n ? d : null; }
  const autoLine = a => `${fmt(a.amount)} ETB ${FREQS[a.freq].every}`;
  // Every transfer that has come due since the last visit (skipped when the wallet is short)
  function applyAuto(s) {
    let changed = false;
    const run = (acc, by) => {
      const a = acc.auto; if (!a) return;
      for (let i = 0; new Date(a.next) <= new Date() && i < 400; i++) {
        if (s.wallet >= a.amount) { acc.txns.push({ type: 'DEPOSIT', amount: a.amount, on: a.next, by, auto: true }); s.wallet -= a.amount; }
        else a.missed = (a.missed || 0) + 1;
        a.next = nextRun(a.next, a.freq); changed = true;
      }
    };
    s.pockets.forEach(p => run(p, 'auto'));
    (s.groups || []).filter(g => !g.closed && g.members.some(m => m.id === 'me' && !m.pending)).forEach(g => run(g, 'me'));
    return changed;
  }
  // In-app notices (e.g. an invitation was accepted); each one shows once
  const notice = (s, text) => { s.notices = s.notices || []; s.notices.push({ text, on: new Date().toISOString(), seen: false }); };
  function takeNotices(s) { const out = (s.notices || []).filter(n => !n.seen); if (out.length) { out.forEach(n => n.seen = true); save(s); } return out; }

  // ── Fixed deposit maths ──
  const maturityOf = a => addMonths(a.opened, a.months);
  const termDays = a => Math.round(days(a.opened, maturityOf(a)));
  const fdStatus = a => a.closed ? 'closed' : Date.now() >= new Date(maturityOf(a)) ? 'matured' : 'active';
  const elapsed = a => Math.min(termDays(a), Math.max(0, Math.floor(days(a.opened, a.closed ? a.closed.on : Date.now()))));
  // Daily, capped at the term; an early withdrawal forfeits it
  const accrued = a => a.closed && a.closed.lost != null ? 0 : a.principal * a.rate / 100 * elapsed(a) / 365;
  const maturedTotal = a => a.principal + accrued(a);
  const daysToMaturity = a => Math.max(0, Math.ceil(days(Date.now(), maturityOf(a))));
  const projected = (plan, amount) => { const by = addMonths(new Date().toISOString(), plan.months); return { by, interest: amount * plan.rate / 100 * Math.round(days(Date.now(), by)) / 365 }; };
  // Movements plus one INTEREST ACCRUED line per month run, oldest first
  function history(a) {
    if (a.closed && a.closed.lost != null) return a.txns.slice();
    const out = a.txns.slice(), end = new Date(a.closed ? a.closed.on : Math.min(Date.now(), new Date(maturityOf(a))));
    for (let m = 1; new Date(addMonths(a.opened, m)) <= end; m++) out.push({ type: 'INTEREST ACCRUED', amount: a.principal * a.rate / 100 * days(addMonths(a.opened, m - 1), addMonths(a.opened, m)) / 365, on: addMonths(a.opened, m) });
    const rank = t => t.type === 'INTEREST ACCRUED' ? 0 : 1;
    return out.sort((x, y) => new Date(x.on) - new Date(y.on) || rank(x) - rank(y));
  }

  // ── Group maths (a group shares the pocket shape: txns, target) ──
  const fmtPhone = n => String(n).replace(/^(\d{3})(\d{3})(\d{3})$/, '+251 $1 $2 $3');
  const person = id => id === 'me' ? ME : CONTACTS.find(c => c.id === id) || { id, name: fmtPhone(id), phone: id };
  const memberTotal = (g, id) => g.txns.reduce((a, t) => a + (t.by === id ? (t.type === 'WITHDRAW' ? -t.amount : t.amount) : 0), 0);
  const memberInterest = (g, id) => Math.max(0, g.txns.filter(t => t.by === id).reduce((a, t) => a + (t.type === 'WITHDRAW' ? -1 : 1) * t.amount * RATE / 100 * Math.max(0, days(t.on, Date.now())) / 365, 0));
  const leavePayout = (g, id) => memberTotal(g, id) + memberInterest(g, id);
  const joined = g => g.members.filter(m => !m.pending);
  const membersLine = g => { const j = joined(g).length, p = g.members.length - j; return j + ' members' + (p ? ' · ' + p + ' invited' : ''); };
  const canWithdraw = g => g.admin === 'me' && !g.closed && balanceOf(g) > 0 && (balanceOf(g) >= g.target.amount || Date.now() >= new Date(g.target.by));
  const groupsOf = s => (s.groups || []).filter(g => !g.closed);
  const openDeposits = s => (s.deposits || []).filter(a => !a.closed);

  const totals = s => ({
    saved: s.pockets.reduce((a, p) => a + balanceOf(p), 0) + openDeposits(s).reduce((a, d) => a + d.principal, 0) + groupsOf(s).reduce((a, g) => a + memberTotal(g, 'me'), 0),
    interest: s.pockets.reduce((a, p) => a + interestOf(p), 0) + openDeposits(s).reduce((a, d) => a + accrued(d), 0) + groupsOf(s).reduce((a, g) => a + memberInterest(g, 'me'), 0),
    count: s.pockets.length + openDeposits(s).length + groupsOf(s).length
  });

  window.SV = { RATE, TARGET_MIN, PARTNER, PLANS, ME, CONTACTS, LEAVE_NEEDED, fmt, dateStr, iso, addMonths, load, save, balanceOf, interestOf, daysLeft, pctOf, statusOf, monthlyNeeded, newId, totals,
    maturityOf, termDays, fdStatus, elapsed, accrued, maturedTotal, daysToMaturity, projected, history,
    person, fmtPhone, memberTotal, memberInterest, leavePayout, joined, membersLine, canWithdraw, groupsOf, openDeposits,
    AUTO_MIN, FREQS, nextRun, runsUntil, suggested, reachesOn, autoLine, applyAuto, notice, takeNotices };
})();
