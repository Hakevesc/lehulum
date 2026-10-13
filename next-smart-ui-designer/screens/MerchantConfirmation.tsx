'use client';
import { C } from '@/screens/_shared/tokens';

import { Receipt, Share2 } from 'lucide-react';
import { ConfirmationReceipt } from '@/screens/_shared/ConfirmationReceipt';

const TX = {
  type: 'Merchant Payment',
  merchant: 'Shoa Supermarket',
  code: '247810',
  senderNumber: '0712 131 415',
  transactionId: 'MP2606160054321',
  amount: '250.00',
  currency: 'ETB'
};

export function MerchantConfirmationScreen() {
  return (
    <ConfirmationReceipt
      successHeading="Payment Successful"
      details={[
        { label: 'Transaction Type', value: TX.type },
        { label: 'Merchant Name', value: TX.merchant },
        { label: 'Merchant Code', value: TX.code },
        { label: "Sender's M-PESA Number", value: TX.senderNumber }
      ]}
      transactionId={TX.transactionId}
      dateTime="16/06/2026 at 10:05 AM"
      beneficiaryName={TX.merchant}
      amount={TX.amount}
      currency={TX.currency}
      qrData={TX}
      extraActions={[
        { icon: <Receipt size={24} color={C.primary} strokeWidth={2} />, label: 'Pay Again', message: 'Preparing to pay again…' },
        { icon: <Share2 size={24} color={C.primary} strokeWidth={2} />, label: 'Share', message: 'Share link copied!' }
      ]}
    />
  );
}
