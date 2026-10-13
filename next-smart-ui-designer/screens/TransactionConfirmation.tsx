'use client';

import { ConfirmationReceipt } from '@/screens/_shared/ConfirmationReceipt';

const TX = {
  type: 'Bank Transfer',
  beneficiaryBank: 'Abyssinia Bank',
  beneficiaryAccount: '978784356436',
  beneficiaryName: 'Kidist Alemayehu Tadesse',
  senderNumber: '0712131415',
  transactionId: 'fxt45632578',
  amount: '-1,050.20',
  currency: 'ETB',
  date: '12/12/2024',
  time: '8:34 AM'
};

export function TransactionConfirmationScreen() {
  return (
    <ConfirmationReceipt
      details={[
        { label: 'Transaction Type', value: TX.type },
        { label: "Beneficiary's Bank", value: TX.beneficiaryBank },
        { label: "Beneficiary's Account Number", value: TX.beneficiaryAccount },
        { label: "Sender's M-PESA Number", value: TX.senderNumber }
      ]}
      transactionId={TX.transactionId}
      dateTime="12/12/2024 at 8:34 AM"
      beneficiaryName={TX.beneficiaryName}
      amount={TX.amount}
      currency={TX.currency}
      qrData={TX}
    />
  );
}
