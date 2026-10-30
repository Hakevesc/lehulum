/* Term Loan prototype store — shared by Term Loan, Apply, Details, PIN and Receipt.
   Loans live in sessionStorage ('termLoans'); the in-flight apply/repay payload in
   'termLoanData'. Seeded with the two loans from the product mockups. */
(function () {
  const LIMIT = 92000;            // credit limit; available = limit − outstanding
  // Credit score (300–900); an uploaded bank statement can raise it (sessionStorage 'creditScore')
  const bandOf = v => v < 580 ? 'Poor' : v < 670 ? 'Fair' : v < 740 ? 'Good' : v < 800 ? 'Very Good' : 'Excellent';
  const SCORE = { value: 720, label: 'Good' };
  try { const v = +sessionStorage.getItem('creditScore'); if (v) { SCORE.value = v; SCORE.label = bandOf(v); } } catch (e) {}
  function setScore(v) { SCORE.value = v; SCORE.label = bandOf(v); try { sessionStorage.setItem('creditScore', v); } catch (e) {} }
  const BANKS = 'assets/banks logo/';

  // Loan offers by lender and product. Fees follow the Tariffs & Fees loan rows.
  const OFFERS = [
    { id: 'boa10', lender: 'Bank of Abyssinia', key: 'abyssinia', logo: BANKS + 'abyssinya-bank.png', product: 'cash', productLabel: 'Cash Loan',
      name: '10-Day Term Loan', min: 100, max: 4000, days: [10], inst: 1, access: 0.04, daily: 0.0015, penalty: 0.005 },
    { id: 'awash30', lender: 'Awash Bank', key: 'awash', logo: BANKS + 'awass-bank.png', product: 'salary', productLabel: 'Salary Advance',
      name: '30-Day Salary Advance', min: 500, max: 20000, days: [30], inst: 1, access: 0.04, daily: 0.0015, penalty: 0.005, note: 'Up to 20% of your net salary' },
    { id: 'boa60', lender: 'Bank of Abyssinia', key: 'abyssinia', logo: BANKS + 'abyssinya-bank.png', product: 'salary', productLabel: 'Salary Advance',
      name: '60-Day Salary Advance', min: 1000, max: 35000, days: [60], inst: 2, access: 0.04, daily: 0.0015, penalty: 0.005, note: 'Up to 35% of your net salary' },
    { id: 'awash30c', lender: 'Awash Bank', key: 'awash', logo: BANKS + 'awass-bank.png', product: 'cash', productLabel: 'Cash Loan',
      name: '30-Day Term Loan', min: 100, max: 10000, days: [10, 30], inst: 1, access: 0.04, daily: 0.0015, penalty: 0.005 },
    { id: 'dashen-bnpl', lender: 'Dashen Bank', key: 'more', logo: BANKS + 'dashen-bank.png', product: 'bnpl', productLabel: 'BNPL',
      name: 'Buy Now, Pay Later', min: 500, max: 15000, days: [30, 60], inst: 3, access: 0.03, daily: 0.001, penalty: 0.005, note: 'Pay in 3 parts at partner shops' },
    { id: 'coop30', lender: 'Coopbank', key: 'more', logo: BANKS + 'coop-bank.png', product: 'cash', productLabel: 'Cash Loan',
      name: '30-Day Term Loan', min: 200, max: 8000, days: [30], inst: 1, access: 0.04, daily: 0.0015, penalty: 0.005 }
  ];

  const DAY = 86400000;
  const iso = days => new Date(Date.now() + days * DAY).toISOString();
  const fmt = n => Number(n || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const dateStr = s => new Date(s).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  const dueIn = s => { const d = Math.ceil((new Date(s) - Date.now()) / DAY); return d > 1 ? d + ' days' : d === 1 ? '1 day' : d === 0 ? 'Today' : 'Overdue'; };

  // Sample loans: amounts chosen so amount + access fee + daily fee × days = total
  const SEED_VERSION = 2;
  function seed() {
    return [
      { id: 'L1001', offer: 'boa60', lender: 'Bank of Abyssinia', logo: BANKS + 'abyssinya-bank.png', product: '60-Day Salary Advance',
        amount: 4424.78, total: 5000, days: 60, disbursed: iso(-10), instalments: [
          { n: 1, amount: 2500, due: iso(20), paid: false },
          { n: 2, amount: 2500, due: iso(50), paid: false }] },
      { id: 'L1002', offer: 'awash30', lender: 'Awash Bank', logo: BANKS + 'awass-bank.png', product: '30-Day Salary Advance',
        amount: 6451.61, total: 7000, days: 30, disbursed: iso(-10), instalments: [
          { n: 1, amount: 7000, due: iso(20), paid: false }] }
    ];
  }
  function load() {
    // Loans saved by an older version of the samples are replaced with the current ones
    try {
      const s = JSON.parse(sessionStorage.getItem('termLoans') || 'null');
      if (Array.isArray(s) && +sessionStorage.getItem('termLoansV') === SEED_VERSION) return s;
    } catch (e) {}
    const s = seed(); save(s); return s;
  }
  function save(list) { try { sessionStorage.setItem('termLoans', JSON.stringify(list)); sessionStorage.setItem('termLoansV', SEED_VERSION); } catch (e) {} }
  const paidOf = l => l.instalments.filter(i => i.paid).reduce((a, i) => a + i.amount, 0);
  const remainingOf = l => l.total - paidOf(l);
  const nextDue = l => l.instalments.find(i => !i.paid);
  const active = list => list.filter(l => remainingOf(l) > 0.004);
  const outstanding = list => active(list).reduce((a, l) => a + remainingOf(l), 0);

  // Repayment quote for an offer, amount and tenure
  function quote(offer, amount, days) {
    const access = amount * offer.access;
    const dailyFee = amount * offer.daily * days;
    const total = amount + access + dailyFee;
    const n = offer.inst;
    const each = Math.round(total / n * 100) / 100;
    const instalments = Array.from({ length: n }, (_, k) => ({
      n: k + 1, amount: k === n - 1 ? Math.round((total - each * (n - 1)) * 100) / 100 : each,
      due: iso(Math.round(days * (k + 1) / n)), paid: false }));
    return { amount, access, dailyFee, total, instalments, due: instalments[n - 1].due };
  }

  // Errif overdraft (sessionStorage 'errif'): covers payments when the balance is
  // short and auto-repays from incoming money. Fees follow the Tariffs & Fees row.
  const ERRIF_FEES = { access: 0.03, dailyMax: 5, penalty: 0.005, days: 30, maxLimit: 3000 };   // limit is set from activity, up to maxLimit
  // Limit levels: the limit set from activity places the customer on one of these
  const ERRIF_LEVELS = [
    { name: 'Starter', limit: 500 }, { name: 'Bronze', limit: 1000 }, { name: 'Silver', limit: 1500 },
    { name: 'Gold', limit: 2000 }, { name: 'Platinum', limit: 3000 }];
  const errifLevel = limit => Math.max(0, ERRIF_LEVELS.reduce((k, l, i) => limit >= l.limit ? i : k, 0));
  function errifSeed() {
    return { active: true, limit: 3000, used: 1850, since: iso(-40), history: [
      { kind: 'use', what: 'Bill payment · EEU', amount: 1200, at: iso(-6) },
      { kind: 'repay', what: 'Auto-repaid from salary', amount: 650, at: iso(-3) },
      { kind: 'use', what: 'Airtime top up', amount: 500, at: iso(-2) },
      { kind: 'use', what: 'Merchant payment · Tomoca', amount: 800, at: iso(-1) }] };
  }
  function errifLoad() {
    // Saved state from before the 3,000 cap (or broken) is replaced with a fresh one
    try { const e = JSON.parse(sessionStorage.getItem('errif') || 'null'); if (e && typeof e === 'object' && e.limit > 0 && e.limit <= ERRIF_FEES.maxLimit) return e; } catch (e) {}
    const e = errifSeed(); errifSave(e); return e;
  }
  function errifSave(e) { try { sessionStorage.setItem('errif', JSON.stringify(e)); } catch (x) {} }

  window.TL = { LIMIT, SCORE, setScore, OFFERS, ERRIF_FEES, ERRIF_LEVELS, errifLevel, errifLoad, errifSave, fmt, dateStr, dueIn, load, save, paidOf, remainingOf, nextDue, active, outstanding, quote,
    offer: id => OFFERS.find(o => o.id === id) };
})();
