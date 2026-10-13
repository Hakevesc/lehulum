'use client';

import { ConfirmationReceipt } from '@/screens/_shared/ConfirmationReceipt';

const TX = {
  type: 'Wallet Transfer',
  beneficiaryWallet: 'M-PESA',
  beneficiaryNumber: '0712131415',
  beneficiaryName: 'Henok Chala',
  senderNumber: '0712131415',
  transactionId: 'fxt45632578',
  amount: '-950.00',
  currency: 'ETB',
  date: '12/12/2024',
  time: '8:34 AM'
};

export function TransferWalletConfirmationScreen() {
  return (
    <ConfirmationReceipt
      details={[
        { label: 'Transaction Type', value: TX.type },
        { label: "Beneficiary's Wallet", value: TX.beneficiaryWallet },
        { label: "Beneficiary's Number", value: TX.beneficiaryNumber },
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
