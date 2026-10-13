import type { Template } from '@/lib/types';

/**
 * Rule-based screen blueprints. Each template composes registered builder
 * components (see components/BuilderComponents.tsx) — no AI required. The parser
 * (matchByKeywords) maps a free-text request to one of these by keyword overlap.
 */
export const templates: Template[] = [
  {
    templateId: 'money-transfer',
    name: 'Send Money',
    description: 'Transfer money to an M-PESA wallet or a bank account.',
    keywords: ['send', 'transfer', 'money', 'send money', 'wallet', 'recipient'],
    components: [
      { componentId: 'status-bar' },
      { componentId: 'header-nav', props: { title: 'Send Money', subtitle: 'Transfer to a wallet or bank' } },
      { componentId: 'contact-row', props: { name: 'Henok Chala', detail: 'M-PESA · 0712 338 293' } },
      { componentId: 'amount-display', props: { amount: '0.00', currency: 'ETB' } },
      { componentId: 'input-field', props: { label: 'Note (optional)', placeholder: 'e.g. Rent' } },
      { componentId: 'primary-button', props: { label: 'Continue' } }
    ]
  },
  {
    templateId: 'bill-payment',
    name: 'Bill Payment',
    description: 'Pay a utility or service bill to a registered biller.',
    keywords: ['bill', 'payment', 'pay bill', 'utility', 'electric', 'water', 'biller'],
    components: [
      { componentId: 'status-bar' },
      { componentId: 'header-nav', props: { title: 'Pay Bill', subtitle: 'Select a biller and pay' } },
      { componentId: 'input-field', props: { label: 'Biller', placeholder: 'e.g. Ethiopian Electric Utility' } },
      { componentId: 'input-field', props: { label: 'Account / Meter Number', placeholder: 'Enter account number', type: 'tel' } },
      { componentId: 'input-field', props: { label: 'Amount (ETB)', placeholder: '0.00', type: 'tel' } },
      { componentId: 'primary-button', props: { label: 'Pay Bill' } }
    ]
  },
  {
    templateId: 'airtime-purchase',
    name: 'Buy Airtime',
    description: 'Top up airtime for your own or another number.',
    keywords: ['airtime', 'topup', 'top up', 'recharge', 'bundle', 'data'],
    components: [
      { componentId: 'status-bar' },
      { componentId: 'header-nav', props: { title: 'Buy Airtime', subtitle: 'Top up any number' } },
      { componentId: 'input-field', props: { label: 'Phone Number', placeholder: '09xx xxx xxx', type: 'tel' } },
      { componentId: 'input-field', props: { label: 'Amount (ETB)', placeholder: '0.00', type: 'tel' } },
      { componentId: 'primary-button', props: { label: 'Buy Airtime' } }
    ]
  },
  {
    templateId: 'login',
    name: 'Login',
    description: 'Sign in with an M-PESA number and PIN.',
    keywords: ['login', 'log in', 'sign in', 'signin', 'pin', 'authenticate'],
    components: [
      { componentId: 'status-bar' },
      { componentId: 'header-nav', props: { title: 'Welcome Back', subtitle: 'Sign in to continue' } },
      { componentId: 'input-field', props: { label: 'M-PESA Number', placeholder: '09xx xxx xxx', type: 'tel' } },
      { componentId: 'pin-input', props: { length: 4, filled: 2 } },
      { componentId: 'primary-button', props: { label: 'Log In' } },
      { componentId: 'secondary-button', props: { label: 'Forgot PIN?' } }
    ]
  },
  {
    templateId: 'transaction-history',
    name: 'Transaction History',
    description: 'Searchable list of recent transactions.',
    keywords: ['history', 'transactions', 'transaction history', 'statement', 'activity'],
    components: [
      { componentId: 'status-bar' },
      { componentId: 'header-nav', props: { title: 'Transaction History' } },
      { componentId: 'input-field', props: { label: 'Search', placeholder: 'Search by date, vendor, amount' } },
      { componentId: 'transaction-row', props: { title: 'From Mikias Dereje', subtitle: 'Transfer Money', amount: '+1,000.00', positive: true } },
      { componentId: 'transaction-row', props: { title: 'London Cafe', subtitle: 'Merchant Payment', amount: '-350.00' } },
      { componentId: 'transaction-row', props: { title: 'Ethiopia Electric Utility', subtitle: 'Bill Payment', amount: '-5,000.00' } }
    ]
  },
  {
    templateId: 'loan-application',
    name: 'Loan Application',
    description: 'Apply for a short-term loan against your wallet.',
    keywords: ['loan', 'credit', 'borrow', 'apply', 'lending', 'advance'],
    components: [
      { componentId: 'status-bar' },
      { componentId: 'header-nav', props: { title: 'Apply for a Loan', subtitle: 'Quick credit to your wallet' } },
      { componentId: 'card', props: { title: 'Eligible Limit', subtitle: 'Up to 25,000.00 ETB' } },
      { componentId: 'input-field', props: { label: 'Loan Amount (ETB)', placeholder: '0.00', type: 'tel' } },
      { componentId: 'input-field', props: { label: 'Repayment Term', placeholder: 'e.g. 30 days' } },
      { componentId: 'card', props: { title: 'Service Fee', subtitle: '1.5% · due with repayment' } },
      { componentId: 'primary-button', props: { label: 'Apply Now' } }
    ]
  },
  {
    templateId: 'sign-up',
    name: 'Create Account',
    description: 'Onboard a new user with name and M-PESA number.',
    keywords: ['sign up', 'signup', 'register', 'create account', 'new account', 'onboard', 'join'],
    components: [
      { componentId: 'status-bar' },
      { componentId: 'header-nav', props: { title: 'Create Account', subtitle: 'Join M-PESA in a minute' } },
      { componentId: 'input-field', props: { label: 'Full Name', placeholder: 'Your name' } },
      { componentId: 'input-field', props: { label: 'M-PESA Number', placeholder: '09xx xxx xxx', type: 'tel' } },
      { componentId: 'primary-button', props: { label: 'Get Started' } }
    ]
  },
  {
    templateId: 'merchant-payment',
    name: 'Pay Merchant',
    description: 'Pay a merchant by till/merchant number.',
    keywords: ['merchant', 'buy goods', 'till', 'pay merchant', 'shop', 'store'],
    components: [
      { componentId: 'status-bar' },
      { componentId: 'header-nav', props: { title: 'Pay Merchant', subtitle: 'Enter a till or merchant number' } },
      { componentId: 'input-field', props: { label: 'Merchant / Till Number', placeholder: 'e.g. 247810', type: 'tel' } },
      { componentId: 'input-field', props: { label: 'Amount (ETB)', placeholder: '0.00', type: 'tel' } },
      { componentId: 'primary-button', props: { label: 'Pay Merchant' } }
    ]
  },
  {
    templateId: 'qr-pay',
    name: 'Scan & Pay',
    description: 'Pay by scanning a merchant QR code.',
    keywords: ['qr', 'scan', 'scan qr', 'qr code', 'scan to pay'],
    components: [
      { componentId: 'status-bar' },
      { componentId: 'header-nav', props: { title: 'Scan & Pay' } },
      { componentId: 'card', props: { title: 'Point camera at merchant QR', subtitle: 'Align the code within the frame' } },
      { componentId: 'input-field', props: { label: 'Amount (ETB)', placeholder: '0.00', type: 'tel' } },
      { componentId: 'primary-button', props: { label: 'Confirm Payment' } }
    ]
  },
  {
    templateId: 'request-money',
    name: 'Request Money',
    description: 'Ask another M-PESA user to pay you.',
    keywords: ['request', 'request money', 'ask', 'collect', 'invoice'],
    components: [
      { componentId: 'status-bar' },
      { componentId: 'header-nav', props: { title: 'Request Money', subtitle: 'Ask someone to pay you' } },
      { componentId: 'input-field', props: { label: 'From (M-PESA Number)', placeholder: '09xx xxx xxx', type: 'tel' } },
      { componentId: 'input-field', props: { label: 'Amount (ETB)', placeholder: '0.00', type: 'tel' } },
      { componentId: 'input-field', props: { label: 'Reason', placeholder: 'e.g. Lunch' } },
      { componentId: 'primary-button', props: { label: 'Send Request' } }
    ]
  },
  {
    templateId: 'savings',
    name: 'Savings',
    description: 'Deposit toward a savings goal.',
    keywords: ['savings', 'save', 'deposit', 'goal', 'credit and saving', 'wallet savings'],
    components: [
      { componentId: 'status-bar' },
      { componentId: 'header-nav', props: { title: 'Savings', subtitle: 'Grow your money' } },
      { componentId: 'card', props: { title: 'Goal: New Laptop', subtitle: '12,000 / 40,000 ETB saved' } },
      { componentId: 'amount-display', props: { amount: '0.00', currency: 'ETB' } },
      { componentId: 'primary-button', props: { label: 'Deposit' } }
    ]
  },
  {
    templateId: 'create-pin',
    name: 'Create PIN',
    description: 'Set and confirm a 4-digit wallet PIN.',
    keywords: ['pin', 'create pin', 'set pin', 'passcode', 'security pin'],
    components: [
      { componentId: 'status-bar' },
      { componentId: 'header-nav', props: { title: 'Create your PIN', subtitle: 'Choose a 4-digit code to secure your wallet' } },
      { componentId: 'pin-input', props: { length: 4, filled: 0 } },
      { componentId: 'primary-button', props: { label: 'Continue' } }
    ]
  },
  {
    templateId: 'otp-verification',
    name: 'OTP Verification',
    description: 'Verify a phone number with a one-time code.',
    keywords: ['otp', 'verify', 'verification', 'code', 'confirm code', 'one time'],
    components: [
      { componentId: 'status-bar' },
      { componentId: 'header-nav', props: { title: 'Verify your number', subtitle: 'Enter the 6-digit code' } },
      { componentId: 'pin-input', props: { length: 6, filled: 3 } },
      { componentId: 'primary-button', props: { label: 'Verify' } },
      { componentId: 'secondary-button', props: { label: 'Resend Code' } }
    ]
  },
  {
    templateId: 'forgot-pin',
    name: 'Forgot PIN',
    description: 'Recover wallet access with a security answer.',
    keywords: ['forgot', 'forgot pin', 'reset', 'recover', 'recovery', 'reset pin'],
    components: [
      { componentId: 'status-bar' },
      { componentId: 'header-nav', props: { title: 'Forgot PIN', subtitle: 'Recover access to your wallet' } },
      { componentId: 'input-field', props: { label: 'M-PESA Number', placeholder: '09xx xxx xxx', type: 'tel' } },
      { componentId: 'input-field', props: { label: 'Security Answer', placeholder: 'Your answer' } },
      { componentId: 'primary-button', props: { label: 'Reset PIN' } }
    ]
  },
  {
    templateId: 'add-favourite',
    name: 'Add Favourite',
    description: 'Save a contact or payee for quick transfers.',
    keywords: ['favourite', 'favorite', 'save contact', 'add favourite', 'shortcut', 'quick send'],
    components: [
      { componentId: 'status-bar' },
      { componentId: 'header-nav', props: { title: 'Add to Favourites', subtitle: 'Save for quick transfers' } },
      { componentId: 'input-field', props: { label: 'Account Name', placeholder: 'e.g. Abebe Zewdu' } },
      { componentId: 'input-field', props: { label: 'Nickname', placeholder: 'e.g. Mom M-PESA' } },
      { componentId: 'primary-button', props: { label: 'Save to Favourites' } }
    ]
  },
  {
    templateId: 'withdraw-cash',
    name: 'Withdraw Cash',
    description: 'Cash out at an M-PESA agent.',
    keywords: ['withdraw', 'cash', 'agent', 'cash out', 'withdrawal', 'atm'],
    components: [
      { componentId: 'status-bar' },
      { componentId: 'header-nav', props: { title: 'Withdraw Cash', subtitle: 'At an M-PESA agent' } },
      { componentId: 'input-field', props: { label: 'Agent Number', placeholder: 'Enter agent number', type: 'tel' } },
      { componentId: 'input-field', props: { label: 'Amount (ETB)', placeholder: '0.00', type: 'tel' } },
      { componentId: 'primary-button', props: { label: 'Withdraw' } }
    ]
  },
  {
    templateId: 'account-settings',
    name: 'Account Settings',
    description: 'Manage security and notification preferences.',
    keywords: ['settings', 'account', 'preferences', 'security', 'profile', 'options'],
    components: [
      { componentId: 'status-bar' },
      { componentId: 'header-nav', props: { title: 'Settings', subtitle: 'Security & preferences' } },
      { componentId: 'toggle', props: { label: 'Fingerprint Login', on: true } },
      { componentId: 'toggle', props: { label: 'Transaction Alerts', on: true } },
      { componentId: 'toggle', props: { label: 'Dark Mode', on: false } },
      { componentId: 'secondary-button', props: { label: 'Log Out' } }
    ]
  }
];

export function matchByKeywords(query: string): Template[] {
  if (!query.trim()) return templates;
  const q = query.toLowerCase();
  return templates
    .filter((t) => t.keywords.some((k) => q.includes(k.toLowerCase())))
    .sort((a, b) => {
      const aScore = a.keywords.filter((k) => q.includes(k.toLowerCase())).length;
      const bScore = b.keywords.filter((k) => q.includes(k.toLowerCase())).length;
      if (bScore !== aScore) return bScore - aScore;
      return a.name.localeCompare(b.name);
    });
}

export function getTemplateById(id: string): Template | undefined {
  return templates.find((t) => t.templateId === id);
}
