import type { ComponentType, ReactNode } from 'react';
import { LegacyScreenPreview } from '@/components/LegacyScreenPreview';
import { HomeScreenPreview } from '@/components/HomeScreenPreview';
import { getScreenById } from '@/lib/registry';

import { FirstVisit1Screen, FirstVisit2Screen, FirstVisit3Screen, FirstVisit4Screen } from '@/screens/HomeOnboarding';
import { AppWalkthroughScreen } from '@/screens/AppWalkthrough';
import { CreditSavingScreen } from '@/screens/CreditSaving';
import { MyQRCodeScreen } from '@/screens/MyQRCode';
import { ScanQRScreen } from '@/screens/ScanQR';
import { VerifyReceiptScreen } from '@/screens/VerifyReceipt';
import { AuthSignupScreen } from '@/screens/AuthSignup';
import { AuthPhoneSignUpScreen } from '@/screens/AuthPhoneSignUp';
import { AuthLoginScreen } from '@/screens/AuthLogin';
import { AuthOTPScreen } from '@/screens/AuthOTP';
import { AuthCreatePinScreen } from '@/screens/AuthCreatePin';
import { AuthReenterPinScreen } from '@/screens/AuthReenterPin';
import { AuthPinLockedScreen } from '@/screens/AuthPinLocked';
import { AuthVerifyBirthYearScreen } from '@/screens/AuthVerifyBirthYear';
import { AuthForgotPinScreen } from '@/screens/AuthForgotPin';
import { AuthForgotPinSQScreen } from '@/screens/AuthForgotPinSQ';
import { AuthSignupHomeScreen } from '@/screens/AuthSignupHome';
import { AuthConfirmProfileScreen } from '@/screens/AuthConfirmProfile';
import { AuthSignupConfirmationScreen } from '@/screens/AuthSignupConfirmation';
import { AuthFingerprintSetupScreen } from '@/screens/AuthFingerprintSetup';
import { AuthLinkFaydaScreen } from '@/screens/AuthLinkFayda';
import { PopupFaydaActivationScreen } from '@/screens/PopupFaydaActivation';
import { PopupEnableFingerprintScreen } from '@/screens/PopupEnableFingerprint';
import { TransactionSendMoneyScreen } from '@/screens/TransactionSendMoney';
import { TransactionHistoryScreen } from '@/screens/TransactionHistory';
import { ManageStatementScreen } from '@/screens/ManageStatement';
import { ManageStatementEmptyScreen } from '@/screens/ManageStatementEmpty';
import { TransferSelectBankScreen } from '@/screens/TransferSelectBank';
import { TransferEnterAmountScreen } from '@/screens/TransferEnterAmount';
import { TransferEnterPinScreen } from '@/screens/TransferEnterPin';
import { TransactionConfirmationScreen } from '@/screens/TransactionConfirmation';
import { TransferWalletAmountScreen } from '@/screens/TransferWalletAmount';
import { TransferWalletPinScreen } from '@/screens/TransferWalletPin';
import { TransferWalletConfirmationScreen } from '@/screens/TransferWalletConfirmation';
import { MerchantPayScreen } from '@/screens/MerchantPay';
import { MerchantEnterAmountScreen } from '@/screens/MerchantEnterAmount';
import { MerchantEnterPinScreen } from '@/screens/MerchantEnterPin';
import { MerchantConfirmationScreen } from '@/screens/MerchantConfirmation';
import { BillPaymentScreen } from '@/screens/BillPayment';
import { BillSelectBillerScreen } from '@/screens/BillSelectBiller';
import { BillEnterAccountScreen } from '@/screens/BillEnterAccount';
import { BillEnterAmountScreen } from '@/screens/BillEnterAmount';
import { BillEnterPinScreen } from '@/screens/BillEnterPin';
import { BillConfirmationScreen } from '@/screens/BillConfirmation';
import { StatementPdfScreen } from '@/screens/StatementPdf';
import { TransactionStatementPdfScreen } from '@/screens/TransactionStatementPdf';
import { SendMoneyReceiptPdfScreen } from '@/screens/SendMoneyReceiptPdf';
import { AccountScreen } from '@/screens/Account';
import { AccountDetailScreen } from '@/screens/AccountDetail';
import { AddFavouritesScreen } from '@/screens/AddFavourites';
import { ManageFavouritesScreen } from '@/screens/ManageFavourites';
import { ManageFavouriteEmptyScreen } from '@/screens/ManageFavouriteEmpty';
import { NotificationCenterScreen } from '@/screens/NotificationCenter';
import { NotificationCenterEmptyScreen } from '@/screens/NotificationCenterEmpty';
import { FaydaStepsScreen } from '@/screens/FaydaSteps';
import {
  DatePickerScreen,
  SignupPinPopupScreen,
  ToastMessageScreen,
  UpdateNoticePopupScreen,
  UpdateNoticeTooltipScreen,
  UpdateRequestOptionalScreen
} from '@/screens/PopupNotices';

/**
 * Maps a screen id to its native React component. Screens not listed here fall
 * back to LegacyScreenPreview (the original HTML in an iframe). Migrating a
 * screen = add its component + one entry here, then flip `status` in screens.json.
 * Both /presentation and /flows/[flowId]/[screenId] render through renderScreen().
 */
export const screenComponents: Record<string, ComponentType> = {
  // Home
  'lehulum-home': HomeScreenPreview,
  'first-visit-1': FirstVisit1Screen,
  'first-visit-2': FirstVisit2Screen,
  'first-visit-3': FirstVisit3Screen,
  'first-visit-4': FirstVisit4Screen,
  'app-walkthrough': AppWalkthroughScreen,
  'credit-saving': CreditSavingScreen,
  'my-qr-code': MyQRCodeScreen,
  'scan-qr': ScanQRScreen,
  'verify-receipt': VerifyReceiptScreen,
  // Auth
  'auth-signup': AuthSignupScreen,
  'auth-phone-signup': AuthPhoneSignUpScreen,
  'auth-login': AuthLoginScreen,
  'auth-otp': AuthOTPScreen,
  'auth-create-pin': AuthCreatePinScreen,
  'auth-reenter-pin': AuthReenterPinScreen,
  'auth-pin-locked': AuthPinLockedScreen,
  'auth-verify-birth-year': AuthVerifyBirthYearScreen,
  'auth-forgot-pin': AuthForgotPinScreen,
  'auth-forgot-pin-sq': AuthForgotPinSQScreen,
  'auth-signup-home': AuthSignupHomeScreen,
  'auth-confirm-profile': AuthConfirmProfileScreen,
  'auth-signup-confirmation': AuthSignupConfirmationScreen,
  'auth-fingerprint-setup': AuthFingerprintSetupScreen,
  'auth-link-fayda': AuthLinkFaydaScreen,
  // Popups
  'popup-fayda-activation': () => <PopupFaydaActivationScreen forced={false} />,
  'popup-fayda-activation-forced': () => <PopupFaydaActivationScreen forced={true} />,
  'popup-enable-fingerprint': PopupEnableFingerprintScreen,
  // Legacy popup ids that share the same source as the React popups above
  'fayda-activation': () => <PopupFaydaActivationScreen forced={false} />,
  'fayda-activation-forced': () => <PopupFaydaActivationScreen forced={true} />,
  'enable-fingerprint': PopupEnableFingerprintScreen,
  'signup-pin-popup': SignupPinPopupScreen,
  'toast-message': ToastMessageScreen,
  'update-notice-popup': UpdateNoticePopupScreen,
  'update-notice-tooltip': UpdateNoticeTooltipScreen,
  'update-request-optional': UpdateRequestOptionalScreen,
  'date-picker': DatePickerScreen,
  // Transactions
  'send-money-menu': TransactionSendMoneyScreen,
  'transfer-select-bank': TransferSelectBankScreen,
  'transfer-enter-amount': TransferEnterAmountScreen,
  'transfer-enter-pin': TransferEnterPinScreen,
  'transaction-confirmation': TransactionConfirmationScreen,
  'transfer-wallet-amount': TransferWalletAmountScreen,
  'transfer-wallet-pin': TransferWalletPinScreen,
  'transfer-wallet-confirmation': TransferWalletConfirmationScreen,
  'transaction-history': TransactionHistoryScreen,
  'manage-statement': ManageStatementScreen,
  'manage-statement-empty': ManageStatementEmptyScreen,
  'statement-pdf': StatementPdfScreen,
  'transaction-statement-pdf': TransactionStatementPdfScreen,
  'send-money-receipt-pdf': SendMoneyReceiptPdfScreen,
  // Merchant Payment
  'pay-merchant': MerchantPayScreen,
  'merchant-enter-amount': MerchantEnterAmountScreen,
  'merchant-enter-pin': MerchantEnterPinScreen,
  'merchant-confirmation': MerchantConfirmationScreen,
  // Bill Payment
  'pay-bill': BillPaymentScreen,
  'bill-select-biller': BillSelectBillerScreen,
  'bill-enter-account': BillEnterAccountScreen,
  'bill-enter-amount': BillEnterAmountScreen,
  'bill-enter-pin': BillEnterPinScreen,
  'bill-confirmation': BillConfirmationScreen,
  // Account
  'account': AccountScreen,
  'account-detail': AccountDetailScreen,
  'add-favourites': AddFavouritesScreen,
  'manage-favourites': ManageFavouritesScreen,
  'manage-favourite-empty': ManageFavouriteEmptyScreen,
  'notification-center': NotificationCenterScreen,
  'notification-center-empty': NotificationCenterEmptyScreen,
  'link-fayda-signup': AuthLinkFaydaScreen,
  'fayda-steps': FaydaStepsScreen
};

/** Render a screen by id: native React component if registered, else the legacy iframe. */
export function renderScreen(id: string): ReactNode {
  const Component = screenComponents[id];
  if (Component) return <Component />;
  const screen = getScreenById(id);
  return <LegacyScreenPreview src={screen.sourceFile} title={screen.title} />;
}
