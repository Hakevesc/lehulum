/* ============================================================
   Shared announcement registry

   Single source of truth for every announcement surface:
     • Announcement.html         — the full Announcements screen
     • Announcement Detail.html  — the expanded view of one item
     • Lehulum Home.html         — strip / bell tooltip / popup

   Dates are expressed as offsets from today so the prototype
   always demonstrates live prioritisation and expiry rules.
     priority         : 3 = high (operational / time-critical), 2 = medium, 1 = normal
     publishedDaysAgo : drives "latest first" ordering
     expiresInDays    : <= 0 means expired -> auto-archived, never rendered
   ============================================================ */

window.MPESA_ANNOUNCEMENTS = [
  {
    id: 'sys-maintenance',
    type: 'notice',
    priority: 3,
    featured: false,
    pinned: true,
    homeStrip: false,
    title: 'Scheduled Maintenance — 12 Aug',
    desc: 'Bill Payment and Bank Transfer will be unavailable from 01:00 to 03:00 AM.',
    short: 'Bill Payment & Bank Transfer down 01:00–03:00 AM',
    publishedDaysAgo: 0,
    expiresInDays: 3,
    icon: 'wrench',
    glyph: '🛠️',
    iconBg: '#FFF8E1',
    badge: 'Service Notice',
    gradient: 'linear-gradient(135deg, #FF9800 0%, #E65100 100%)',
    cta: { label: 'Details', href: '' },
    body: 'To improve service reliability we will be performing scheduled maintenance on our payment switch on 12 August 2026 between 01:00 AM and 03:00 AM (EAT).\n\nDuring this window Bill Payment and Bank Transfer will be temporarily unavailable. Send Money to M-PESA wallets, Airtime purchase and Balance enquiry will continue to work normally.',
    terms: [
      'Affected services: Bill Payment, Bank Transfer',
      'Any transaction started before 01:00 AM will complete normally',
      'No action is required from you'
    ],
    detail: {
      cover: 'notice',
      image: 'assets/maintenance-bg.jpg',
      coverBg: 'linear-gradient(160deg, #1C1C21 0%, #2A2A32 100%)',
      accent: '#FE353D',
      badgeBg: '#FE353D',
      badgeColor: '#FFFFFF',
      icon: '',
      headline: 'Bill Payment & Bank Transfer',
      kicker: 'Some services will be temporarily unavailable.',
      stats: [
        { icon: 'calendar', label: 'Date', value: '12 Aug 2026' },
        { icon: 'clock',    label: 'Time', value: '01:00 – 03:00 AM' }
      ],
      introTitle: "What's happening?",
      intro: "We're performing a system maintenance to serve you better. During this time, the following services may be unavailable:",
      highlights: [
        { icon: 'receipt-text', title: 'Bill Payment',  desc: 'You may not be able to pay your bills.' },
        { icon: 'landmark',     title: 'Bank Transfer', desc: 'Transfers to other banks may be delayed.' }
      ],
      reassure: { title: 'Your money is safe', text: 'This maintenance will not affect your account, balance or saved information.' },
      tip: { title: 'Tip', text: 'You can still use other services like Merchant Payment, Airtime & Packages, and Transfer Money.' },
      support: true,
      ctaLabel: 'Got it'
    }
  },
  {
    id: 'cashback-50',
    type: 'campaign',
    priority: 2,
    featured: true,
    homePopup: true,
    title: '50% Cashback on Bill Payments',
    popupTitleHtml: '<span class="ann-modal-title-red">50%</span> CASHBACK<br>ON BILL PAYMENTS',
    desc: 'Pay any utility bill with M-PESA and get 50% back, up to 200 ETB per month.',
    popupDesc: 'Get 50% of your bill payment back as instant cashback. Worry less when you pay your electricity, water or internet bill through M-Pesa.',
    short: 'Get 50% back, up to 200 ETB this month',
    publishedDaysAgo: 1,
    expiresInDays: 3,
    badge: 'Cashback',
    glyph: '💰',
    image: 'assets/popup ads-art.png',
    popupImage: 'assets/popup ads-art.png',
    iconBg: '#E8F9EC',
    gradient: 'linear-gradient(175deg, #DE2B35 0%, #B31922 100%)',
    cta: { label: 'Pay a Bill', href: 'Pay Bill.html' },
    ghostCta: { label: 'Maybe Later' },
    body: 'Get 50% of your bill payment back as instant cashback, every time you pay an electricity, water or internet bill through M-PESA.\n\nCashback is credited to your M-PESA wallet within 24 hours of a successful payment. No registration needed — just pay your bill as usual.',
    terms: [
      'Maximum cashback of 200 ETB per customer per month',
      'Valid on Ethiopian Electric Utility, Addis Water and internet billers',
      'Cashback is credited within 24 hours of a successful payment',
      'Reversed or failed payments do not qualify'
    ],
    // Promotional cover: photo-led, minimal copy, CTA into Bill Payment.
    detail: {
      cover: 'photo',
      image: 'assets/announcement-bill-payment.jpg',
      accent: '#12912B',
      badgeBg: 'rgba(255,255,255,0.24)',
      badge: 'Cashback Offer',
      headline: '50% Cashback',
      kicker: 'on every bill you pay',
      stats: [
        { icon: 'wallet', label: 'Up to',   value: '200 ETB' },
        { icon: 'clock',  label: 'Ends in', value: '3 days' }
      ],
      introTitle: 'How it works',
      intro: 'Pay any utility bill with M-PESA and we send half of it straight back to your wallet.',
      highlights: [
        { icon: 'receipt-text', title: 'Pay any bill', desc: 'Electricity, water or internet.' },
        { icon: 'gift',         title: 'Get 50% back', desc: 'Credited within 24 hours.' }
      ],
      reassure: { title: 'No registration needed', text: 'Cashback is applied automatically — just pay your bill as you normally would.' },
      tip: { title: 'Tip', text: 'Spread your bills across the month to make the most of the 200 ETB monthly cap.' },
      support: true,
      ctaLabel: 'Pay a Bill Now'
    }
  },
  {
    id: 'errif-launch',
    type: 'launch',
    priority: 2,
    featured: true,
    title: 'Introducing Errif Overdraft',
    desc: 'Short on balance? Complete your payment now and settle it later with Errif.',
    short: 'Pay now, settle later with Errif',
    publishedDaysAgo: 2,
    expiresInDays: 24,
    badge: 'New Feature',
    glyph: '⚡',
    iconBg: '#F0EEFF',
    gradient: 'linear-gradient(135deg, #6C5CE7 0%, #3B2FB5 100%)',
    cta: { label: 'Learn More', href: 'Credit & Saving.html' },
    body: 'Errif lets you finish a transaction even when your wallet balance falls short. Activate it once, and M-PESA will top up the difference so your payment goes through.\n\nYou repay automatically from your next deposit — no paperwork, no waiting.',
    terms: [
      'One-time activation required before first use',
      'A service fee applies per Errif transaction',
      'Repayment is deducted automatically from incoming funds',
      'Available on Bill Payment, Merchant Payment, Airtime and Transfer'
    ],
    detail: {
      cover: 'notice',
      coverBg: 'linear-gradient(160deg, #EEEBFF 0%, #F8F7FF 100%)',
      accent: '#5A4BD1',
      badgeBg: '#DDD8FA',
      icon: 'zap',
      headline: 'Pay now, settle later',
      kicker: 'Errif covers the gap when your balance runs short.',
      stats: [
        { icon: 'wallet',      label: 'Limit',  value: 'Up to 5,000 ETB' },
        { icon: 'refresh-ccw', label: 'Repay',  value: 'Automatic' }
      ],
      introTitle: 'How it works',
      intro: 'Activate Errif once and M-PESA tops up the difference so your payment always goes through.',
      highlights: [
        { icon: 'zap',        title: 'Instant top-up',   desc: 'Your transaction completes right away.' },
        { icon: 'arrow-down', title: 'Automatic repay',  desc: 'Settled from your next deposit.' }
      ],
      reassure: { title: 'No paperwork', text: 'Activation takes under a minute and there is nothing to sign.' },
      tip: { title: 'Tip', text: 'Errif works on Bill Payment, Merchant Payment, Airtime and Transfer.' },
      support: true,
      ctaLabel: 'Activate Errif'
    }
  },
  {
    id: 'send-free',
    type: 'promo',
    priority: 2,
    featured: true,
    title: 'Send Money Free This Week',
    desc: 'Zero transfer fees on every wallet-to-wallet send until Sunday.',
    short: 'Zero transfer fees until Sunday',
    publishedDaysAgo: 3,
    expiresInDays: 5,
    badge: 'Limited Offer',
    glyph: '🎁',
    iconBg: '#FFF1F2',
    gradient: 'linear-gradient(135deg, #FE353D 0%, #A41016 100%)',
    cta: { label: 'Send Money', href: 'Send Money Menu.html' },
    body: 'For one week only, every M-PESA wallet-to-wallet transfer is completely free. No transfer fee, no minimum, no limit on the number of sends.\n\nJust open Send Money and transfer as you normally would — the fee is waived automatically at confirmation.',
    terms: [
      'Applies to M-PESA wallet-to-wallet transfers only',
      'Bank transfers are excluded from this promotion',
      'Standard daily transaction limits still apply',
      'Offer ends Sunday at 23:59'
    ],
    detail: {
      cover: 'notice',
      coverBg: 'linear-gradient(160deg, #FFE7E8 0%, #FFF6F6 100%)',
      accent: '#C41520',
      badgeBg: '#FFD2D4',
      icon: 'send',
      headline: 'Send money for free',
      kicker: 'Zero fees on every wallet-to-wallet transfer.',
      stats: [
        { icon: 'percent', label: 'Fee',     value: '0 ETB' },
        { icon: 'clock',   label: 'Ends in', value: '5 days' }
      ],
      introTitle: 'How it works',
      intro: 'Send to any M-PESA wallet this week and the transfer fee is waived automatically at confirmation.',
      highlights: [
        { icon: 'users',    title: 'Any M-PESA wallet', desc: 'Friends, family, anyone.' },
        { icon: 'infinity', title: 'No send limit',     desc: 'As many transfers as you like.' }
      ],
      reassure: { title: 'Nothing to claim', text: 'The fee is removed at confirmation — you will see 0 ETB before you approve.' },
      tip: { title: 'Tip', text: 'Bank transfers are not included in this offer, only M-PESA wallets.' },
      support: true,
      ctaLabel: 'Send Money Now'
    }
  },
  {
    id: 'airtime-bonus',
    type: 'promo',
    priority: 1,
    featured: true,
    title: '10% Bonus Airtime',
    desc: 'Top up 100 ETB or more and receive 10% extra airtime instantly.',
    short: '10% extra on top-ups over 100 ETB',
    publishedDaysAgo: 5,
    expiresInDays: 12,
    badge: 'Promo',
    glyph: '📱',
    iconBg: '#E8F0FF',
    gradient: 'linear-gradient(135deg, #0F62FE 0%, #0A3D9E 100%)',
    cta: { label: 'Buy Airtime', href: 'Airtime_Buy.html' },
    body: 'Buy airtime worth 100 ETB or more through M-PESA and we will add 10% on top, credited to the same number instantly.\n\nWorks for your own number and for anyone you top up.',
    terms: [
      'Minimum top-up of 100 ETB per transaction',
      'Bonus airtime is credited instantly to the recipient number',
      'Valid on Safaricom and Ethiotelecom top-ups',
      'Bonus airtime cannot be transferred or converted to cash'
    ],
    detail: {
      cover: 'notice',
      coverBg: 'linear-gradient(160deg, #E3ECFF 0%, #F5F8FF 100%)',
      accent: '#0A4FCB',
      badgeBg: '#CFDEFB',
      icon: 'smartphone',
      headline: '10% bonus airtime',
      kicker: 'Every time you top up 100 ETB or more.',
      stats: [
        { icon: 'arrow-up', label: 'Bonus',   value: '10%' },
        { icon: 'clock',    label: 'Ends in', value: '12 days' }
      ],
      introTitle: 'How it works',
      intro: 'Top up 100 ETB or more and we add 10% on top, credited instantly to the same number.',
      highlights: [
        { icon: 'smartphone', title: 'Any number', desc: 'Yours or someone else’s.' },
        { icon: 'zap',        title: 'Instant',    desc: 'Bonus lands with the top-up.' }
      ],
      reassure: { title: 'Works on both networks', text: 'Valid for Safaricom and Ethiotelecom top-ups.' },
      tip: { title: 'Tip', text: 'One 200 ETB top-up earns more bonus than two 100 ETB top-ups spread out.' },
      support: true,
      ctaLabel: 'Buy Airtime Now'
    }
  },
  {
    id: 'bank-transfer-live',
    type: 'notice',
    priority: 2,
    featured: false,
    title: 'Bank Transfer Now Supports 4 New Banks',
    desc: 'Awash, Dashen, Abyssinia and Zemen are now available for instant transfers.',
    short: '4 new banks available for instant transfer',
    publishedDaysAgo: 6,
    expiresInDays: 20,
    glyph: '🏦',
    iconBg: '#F1F1F4',
    badge: 'Service Update',
    gradient: 'linear-gradient(135deg, #1C1C21 0%, #4A4A55 100%)',
    cta: { label: 'Transfer', href: 'Transfer_Select Bank.html' },
    body: 'You can now move money from your M-PESA wallet straight into an account at Awash International Bank, Dashen Bank, Bank of Abyssinia or Zemen Bank.\n\nTransfers settle instantly and appear in your transaction history with a shareable receipt.',
    terms: [
      'Standard bank transfer tariffs apply',
      'Recipient account name is validated before you confirm',
      'Transfers settle instantly during banking hours'
    ],
    detail: {
      cover: 'notice',
      coverBg: 'linear-gradient(160deg, #E9E9EE 0%, #F8F8FA 100%)',
      accent: '#3A3A45',
      badgeBg: '#DCDCE3',
      icon: 'landmark',
      headline: '4 new banks added',
      kicker: 'Awash, Dashen, Abyssinia and Zemen.',
      stats: [
        { icon: 'landmark', label: 'Banks',      value: '4 new' },
        { icon: 'zap',      label: 'Settlement', value: 'Instant' }
      ],
      introTitle: "What's new?",
      intro: 'You can now move money from your M-PESA wallet straight into an account at four more banks.',
      highlights: [
        { icon: 'shield-check', title: 'Name check', desc: 'Account name shown before you confirm.' },
        { icon: 'receipt-text', title: 'Receipt',    desc: 'Shareable receipt for every transfer.' }
      ],
      reassure: { title: 'Instant settlement', text: 'Transfers land in the recipient account straight away during banking hours.' },
      tip: { title: 'Tip', text: 'Save a bank account to Favourites to skip re-entering it next time.' },
      support: true,
      ctaLabel: 'Transfer to Bank'
    }
  },
  {
    id: 'fayda-awareness',
    type: 'notice',
    priority: 2,
    featured: false,
    title: 'Link Your Fayda ID',
    desc: 'Linking your Fayda ID raises your daily limit and secures your account.',
    short: 'Raise your daily limit in two minutes',
    publishedDaysAgo: 8,
    expiresInDays: 30,
    glyph: '🆔',
    iconBg: '#E0F7FC',
    badge: 'Account',
    gradient: 'linear-gradient(135deg, #00B4D8 0%, #0077B6 100%)',
    cta: { label: 'Link Now', href: 'Link Fayda_SignUp.html' },
    body: 'Customers who link their Fayda national ID enjoy a higher daily transaction limit and an extra layer of account protection.\n\nLinking takes under two minutes and only needs your Fayda number.',
    terms: [
      'Your Fayda number must match your registered M-PESA name',
      'Higher limits apply from the next business day',
      'You can unlink at any time from Account settings'
    ],
    detail: {
      cover: 'notice',
      coverBg: 'linear-gradient(160deg, #DFF4FA 0%, #F3FBFD 100%)',
      accent: '#00769B',
      badgeBg: '#C4EAF4',
      icon: 'id-card',
      headline: 'Higher limits with Fayda',
      kicker: 'Link your national ID in under two minutes.',
      stats: [
        { icon: 'trending-up', label: 'Daily limit', value: 'Increased' },
        { icon: 'clock',       label: 'Takes',       value: '2 minutes' }
      ],
      introTitle: 'Why link it?',
      intro: 'Linking your Fayda ID raises your daily transaction limit and adds a further layer of account protection.',
      highlights: [
        { icon: 'trending-up',  title: 'Bigger limits', desc: 'Send and pay more each day.' },
        { icon: 'shield-check', title: 'Extra security', desc: 'Stronger identity protection.' }
      ],
      reassure: { title: 'You stay in control', text: 'You can unlink your Fayda ID at any time from Account settings.' },
      tip: { title: 'Tip', text: 'Your Fayda name must match your registered M-PESA name for the link to succeed.' },
      support: true,
      ctaLabel: 'Link Fayda ID'
    }
  },
  {
    id: 'fraud-awareness',
    type: 'notice',
    priority: 3,
    featured: false,
    title: 'Never Share Your PIN',
    desc: 'M-PESA staff will never call or SMS you asking for your PIN or OTP.',
    short: 'M-PESA will never ask for your PIN or OTP',
    publishedDaysAgo: 10,
    expiresInDays: 60,
    glyph: '🔒',
    iconBg: '#FFF1F2',
    badge: 'Security',
    gradient: 'linear-gradient(135deg, #C41520 0%, #7A0D14 100%)',
    cta: { label: 'Read Tips', href: '' },
    body: 'Fraudsters may call, SMS or message you pretending to be M-PESA support and ask for your PIN, OTP or account details.\n\nM-PESA will never ask for these. If you receive such a request, end the conversation and report it immediately.',
    terms: [
      'Never share your PIN or OTP with anyone, including family',
      'M-PESA staff will never ask for your PIN over a call or SMS',
      'Report suspicious messages to 100 free of charge',
      'Change your PIN immediately if you think it has been exposed'
    ],
    detail: {
      cover: 'notice',
      coverBg: 'linear-gradient(160deg, #FFE4E5 0%, #FFF5F5 100%)',
      accent: '#C41520',
      badgeBg: '#FFD0D2',
      icon: 'shield-alert',
      headline: 'Never share your PIN',
      kicker: 'M-PESA will never ask for it — not by call, not by SMS.',
      stats: [
        { icon: 'phone-off', label: 'We never ask', value: 'PIN or OTP' },
        { icon: 'phone',     label: 'Report to',    value: '100 (free)' }
      ],
      introTitle: 'How to stay safe',
      intro: 'Fraudsters may pretend to be M-PESA support and ask for your PIN, OTP or account details. Here is what to watch for:',
      highlights: [
        { icon: 'phone-off', title: 'Unexpected calls', desc: 'End the call if your PIN is requested.' },
        { icon: 'link-2',    title: 'Suspicious links', desc: 'Never enter your PIN on a web page.' }
      ],
      reassure: { title: 'M-PESA will never ask', text: 'No genuine M-PESA agent or staff member will ever request your PIN or OTP.' },
      tip: { title: 'Tip', text: 'Change your PIN straight away if you think someone has seen it.' },
      support: true,
      ctaLabel: 'Got it'
    }
  },
  {
    id: 'new-year',
    type: 'seasonal',
    priority: 1,
    featured: false,
    title: 'Melkam Addis Amet!',
    desc: 'Wishing you a prosperous Ethiopian New Year from all of us at M-PESA.',
    short: 'Happy Ethiopian New Year from M-PESA',
    publishedDaysAgo: 12,
    expiresInDays: 8,
    glyph: '🎊',
    iconBg: '#FFF6E0',
    badge: 'Seasonal',
    gradient: 'linear-gradient(135deg, #FFB300 0%, #E67E00 100%)',
    cta: { label: '', href: '' },
    body: 'From everyone at M-PESA Ethiopia — Melkam Addis Amet! Thank you for banking with us this year.',
    terms: [],
    detail: {
      cover: 'notice',
      coverBg: 'linear-gradient(160deg, #FFF0D2 0%, #FFFAEE 100%)',
      accent: '#C77A00',
      badgeBg: '#FBE3B0',
      icon: 'party-popper',
      headline: 'Melkam Addis Amet!',
      kicker: 'Wishing you a prosperous Ethiopian New Year.',
      stats: [],
      introTitle: 'From all of us',
      intro: 'Thank you for banking with M-PESA this year. Here is to a bright and prosperous new one.',
      highlights: [],
      reassure: null,
      tip: null,
      support: false,
      ctaLabel: 'Thank you'
    }
  },
  {
    // Expired on purpose: demonstrates automatic archival — never rendered.
    id: 'ramadan-expired',
    type: 'seasonal',
    priority: 1,
    featured: true,
    title: 'Ramadan Kareem Offer',
    desc: 'Double cashback throughout the holy month.',
    short: 'Double cashback all month',
    publishedDaysAgo: 40,
    expiresInDays: -6,
    badge: 'Seasonal',
    glyph: '🌙',
    iconBg: '#F0EBF7',
    gradient: 'linear-gradient(135deg, #6A4C93 0%, #3A2A57 100%)',
    cta: { label: 'View', href: '' },
    body: '',
    terms: []
  },
  {
    // Expired on purpose: demonstrates automatic archival — never rendered.
    id: 'july-promo-expired',
    type: 'promo',
    priority: 2,
    featured: false,
    title: 'July Merchant Payment Draw',
    desc: 'Pay any merchant for a chance to win 50,000 ETB.',
    short: 'Win 50,000 ETB',
    publishedDaysAgo: 45,
    expiresInDays: -11,
    glyph: '🏆',
    iconBg: '#FFF1F2',
    gradient: 'linear-gradient(135deg, #E5303A 0%, #8A0F16 100%)',
    cta: { label: 'View', href: '' },
    body: '',
    terms: []
  }
];

window.MPESA_TRENDING = [
  { name: 'Errif Overdraft', meta: '2.1k activations', icon: 'zap',          tone: 'info',    href: 'Credit & Saving.html' },
  { name: 'Bill Payment',    meta: 'Cashback live',    icon: 'receipt-text', tone: 'success', href: 'Pay Bill.html' },
  { name: 'Send Money',      meta: 'Free this week',   icon: 'send',         tone: '',        href: 'Send Money Menu.html' },
  { name: 'Buy Airtime',     meta: '10% bonus',        icon: 'smartphone',   tone: 'warning', href: 'Airtime_Buy.html' },
  { name: 'Bank Transfer',   meta: '4 new banks',      icon: 'landmark',     tone: 'info',    href: 'Transfer_Select Bank.html' }
];

window.MPESA_ANN = {
  TYPE_LABEL: {
    promo:    'Promotion',
    campaign: 'Campaign',
    notice:   'Notice',
    launch:   'New Feature',
    seasonal: 'Seasonal'
  },

  // Expiry management: anything past its expiry date is archived, not shown.
  isActive: a => a.expiresInDays > 0,

  // Prioritisation: high priority first, then most recently published.
  byPriorityThenDate: (a, b) =>
    b.priority - a.priority || a.publishedDaysAgo - b.publishedDaysAgo,

  // Active announcements, already prioritised.
  active() {
    return window.MPESA_ANNOUNCEMENTS
      .filter(this.isActive)
      .sort(this.byPriorityThenDate);
  },

  archivedCount() {
    return window.MPESA_ANNOUNCEMENTS.filter(a => !this.isActive(a)).length;
  },

  find(id) {
    return window.MPESA_ANNOUNCEMENTS.find(a => a.id === id) || null;
  },

  publishedLabel(days) {
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7)   return days + ' days ago';
    if (days < 14)  return 'Last week';
    return Math.floor(days / 7) + ' weeks ago';
  },

  // Only surface expiry when it is genuinely time-sensitive.
  expiryLabel(days) {
    if (days <= 0)  return 'Expired';
    if (days === 1) return 'Ends today';
    if (days <= 5)  return 'Ends in ' + days + ' days';
    return null;
  }
};
