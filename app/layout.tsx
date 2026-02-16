import type { Metadata } from 'next';
import { Orbitron, Rajdhani } from 'next/font/google';
import './globals.css';

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap',
});

const rajdhani = Rajdhani({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-rajdhani',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Aston Martin Valkyrie | The Ultimate Hypercar',
  description: 'Experience the Aston Martin Valkyrie. 1,160HP hybrid V12 engineering masterpiece.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${orbitron.variable} ${rajdhani.variable}`}>
      <body className="font-sans antialiased bg-aston-black text-white selection:bg-bright-gold selection:text-black">
        {children}
      </body>
    </html>
  );
}
