import './globals.css'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Beer Collection App',
  description: 'Organize and explore your favorite beers',
}

export default function RootLayout({ 
  children }: { children: ReactNode }) {
  return (
    <html lang="en">
    <body className={`${inter.className} bg-gray-100`}>
      <header className="p-4 shadow-md bg-yellow-100 dark:bg-zinc-800">
        <h1 className="text-2xl font-bold text-center">🍺 Beer Collection App</h1>
      </header>
      <main>
        {children}
      </main>
      <footer className="p-4 bg-yellow-100 dark:bg-zinc-800 text-center pb-[10px]">
        <p className="text-sm pt-30">© 2025 Beer Collection App - Desenvolvido por Pedro Reis</p>
      </footer>
    </body>
  </html>
  )
}