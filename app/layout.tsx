import { ReactNode } from 'react'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/lib/contexts/ThemeContext'
import NavButton from '@/components/NavButton/NavButton'
import ThemeToggle from '@/components/ThemeToggle/ThemeToggle'
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
        <ThemeProvider>
        <div className="flex flex-col min-h-screen">

            <header className="p-[20px]">
              <h1 className="text-center font-extrabold text-[36px] uppercase">
                Beer Collection App
              </h1>
              <div className="flex justify-center mt-2">
                <h2 className="text-3xl md:text-2xl font-medium sm:flex flex-col text-center text-gray-700 dark:text-gray-200">
                  Organize and explore your favorite beers
                </h2>
              </div>
              <div className="mx-auto max-w-[1280px] w-full flex items-center mt-[20px] relative">

                <div className="absolute left-1/2 transform -translate-x-1/2">
                  <NavButton />
                </div>
                

                <div className="ml-auto">
                  <ThemeToggle />
                </div>
              </div>
            </header>
            
            <main className="flex-1 mb-[60px]">{children}</main>
            
            <footer className="sticky bottom-0 w-full p-[10px] bg-yellow-100 dark:bg-zinc-800 text-center shadow-md mt-auto">
              <p className="text-sm">
                © 2025 Beer Collection App - Developed by{' '}
                <a
                  href="mailto:dropecosta@gmail.com"
                  className="text-blue-600 dark:text-blue-400 underline pl-1"
                >
                  Pedro Reis
                </a>
              </p>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}