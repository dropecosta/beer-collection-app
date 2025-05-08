import { ReactNode } from 'react'
import { Inter } from 'next/font/google'
import NavButton from '@/components/NavButton'
import './globals.css'

export const metadata = {
  title: 'Beer Collection App',
  description: 'Organize and explore your favorite beers',
}

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="p-[20px]">
          <h1 className="text-center font-extrabold text-[36px] uppercase">
            🍺 Beer Collection App
          </h1>
          <div className="flex justify-center mt-2">
            <h2 className="text-3xl md:text-2xl font-medium">
              Organize e explore suas cervejas favoritas
            </h2>
          </div>
          <div className="mx-auto max-w-[1280px] w-full flex justify-center items-center gap-4 mt-[20px]">
            <NavButton />
          </div>
        </header>
        <main>{children}</main>
        <footer className="p-[10px] bg-yellow-100 dark:bg-zinc-800 text-center">
          <p className="text-sm">
            © 2025 Beer Collection App - Desenvolvido por{' '}
            <a
              href="mailto:dropecosta@gmail.com"
              className="text-blue-600 underline pl-1"
            >
              Pedro Reis
            </a>
          </p>
        </footer>
      </body>
    </html>
  )
}