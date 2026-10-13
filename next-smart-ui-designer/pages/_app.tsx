import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="data-theme" defaultTheme="light" enableSystem={false}>
      <Component {...pageProps} />
      {/* shadcn/ui toast host. theme="system" maps onto next-themes data-theme. */}
      <Toaster position="top-center" />
    </ThemeProvider>
  );
}
