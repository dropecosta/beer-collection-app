'use client'

import React from 'react'
import Link from 'next/link'

export default function Pagination({ page }: { page: number }) {
  return (
    <nav className="flex justify-center pb-[30px] pt-[60px]">
      <ul className="inline-flex items-center gap-[20px] list-none text-gray-600 font-semibold">
        <li>
          {page > 1 ? (
            <Link
              href={`/?page=${page - 1}`}
              className="px-4 py-2 bg-white rounded-l hover:bg-gray-50 transition"
            >
              ← Previous
            </Link>
          ) : (
            <span className="px-4 py-2 bg-gray-100 text-gray-400 rounded-l cursor-not-allowed">
              ← Previous
            </span>
          )}
        </li>
        <li>
          <span className="px-4 py-2 bg-gray-200 rounded">
            {page}
          </span>
        </li>
        <li>
          <Link
            href={`/?page=${page + 1}`}
            className="px-4 py-2 bg-white rounded-r hover:bg-gray-50 transition"
          >
            Next →
          </Link>
        </li>
      </ul>
    </nav>
  )
}