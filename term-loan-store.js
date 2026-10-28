/* Term Loan prototype store — shared by Term Loan, Apply, Details, PIN and Receipt.
   Loans live in sessionStorage ('termLoans'); the in-flight apply/repay payload in
   'termLoanData'. Seeded with the two loans from the product mockups. */
(function () {
  const LIMIT = 92000;            // credit limit; available = limit − outstanding
  const SCORE = { value: 720, label: 'Good' };
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

  function seed() {
    return [
      { id: 'L1001', offer: 'boa10', lender: 'Bank of Abyssinia', logo: BANKS + 'abyssinya-bank.png', product: '10-Day Term Loan',
        amount: 4800, total: 5000, disbursed: iso(-10), instalments: [
          { n: 1, amount: 2500, due: iso(10), paid: false },
          { n: 2, amount: 2500, due: iso(20), paid: false }] },
      { id: 'L1002', offer: 'awash30', lender: 'Awash Bank', logo: BANKS + 'awass-bank.png', product: '30-Day Salary Advance',
        amount: 6700, total: 7000, disbursed: iso(-10), instalments: [
          { n: 1, amount: 7000, due: iso(20), paid: false }] }
    ];
  }
  function load() {
    try { const s = JSON.parse(sessionStorage.getItem('termLoans') || 'null'); if (Array.isArray(s)) return s; } catch (e) {}
    const s = seed(); save(s); return s;
  }
  function save(list) { try { sessionStorage.setItem('termLoans', JSON.stringify(list)); } catch (e) {} }
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

  window.TL = { LIMIT, SCORE, OFFERS, fmt, dateStr, dueIn, load, save, paidOf, remainingOf, nextDue, active, outstanding, quote,
    offer: id => OFFERS.find(o => o.id === id) };
})();
