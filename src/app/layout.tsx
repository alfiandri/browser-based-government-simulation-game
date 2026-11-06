import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Presiden: Simulasi Indonesia (3D Game)',
  description: '3D Browser-Based Political & Government Simulation Game. Pimpin Republik Indonesia sebagai Kepala Negara.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="bg-slate-950 text-slate-100 antialiased overflow-hidden select-none">
        {children}
      </body>
    </html>
  );
}

