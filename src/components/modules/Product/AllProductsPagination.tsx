"use client";

import { useRouter } from "next/navigation";
import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  searchParams: { [key: string]: any };
}

export function AllProductsPagination({ currentPage, totalPages, searchParams }: PaginationProps) {
  const router = useRouter();

  // Build URLSearchParams object from existing searchParams
  const searchParamsObj = new URLSearchParams();

  // Append all current params except page (will be overwritten)
  Object.entries(searchParams).forEach(([key, value]) => {
    if (value !== undefined && key !== "page") {
      searchParamsObj.append(key, String(value));
    }
  });

  // Helper to change page query param and navigate
  function goToPage(page: number) {
    if (page < 1 || page > totalPages) return;

    searchParamsObj.set("page", page.toString());
    router.push(`/products?${searchParamsObj.toString()}`);
  }

  return (
    <div className="flex justify-center items-center space-x-2 mt-8">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50"
      >
        Prev
      </button>

      {[...Array(totalPages)].map((_, i) => {
        const pageNum = i + 1;
        const isActive = pageNum === currentPage;

        return (
          <button
            key={pageNum}
            onClick={() => goToPage(pageNum)}
            className={`px-3 py-1 rounded border border-gray-300 ${
              isActive ? "bg-blue-600 text-white" : ""
            }`}
          >
            {pageNum}
          </button>
        );
      })}

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
