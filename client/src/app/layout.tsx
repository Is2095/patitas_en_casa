import './globals.css';
import type { Metadata } from 'next';
import { Providers } from './Providers';
import BarraNavegacion from '@/componentes/barraNavegacion';

export const metadata: Metadata = {
  title: 'Patitas En Casa',
  description: 'Aplicación para adopción de perros y gatos',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="h-screen">
        <Providers>
          <BarraNavegacion/>
          {children}
        </Providers>
      </body>
    </html>
  )
}
