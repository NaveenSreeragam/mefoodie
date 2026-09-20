import type { Metadata } from 'next';
import '../index.css';

export const metadata: Metadata = {
  title: 'meFoodie | Satisfy Every Craving',
  description: 'Hyper-local authentic food finder, AI craving assistant, and foodie community.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#E8DEC8] text-[#24221D] font-body antialiased">
        {children}
      </body>
    </html>
  );
}
