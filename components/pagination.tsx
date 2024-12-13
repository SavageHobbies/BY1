'use client';

import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  baseUrl,
}: PaginationProps) {
  const maxVisible = 5;
  const pages: (number | string)[] = [];

  // Always show first page
  pages.push(1);

  if (currentPage > maxVisible - 2) {
    pages.push('...');
  }

  // Show pages around current page
  for (
    let i = Math.max(2, currentPage - 1);
    i <= Math.min(totalPages - 1, currentPage + 1);
    i++
  ) {
    pages.push(i);
  }

  if (currentPage < totalPages - (maxVisible - 3)) {
    pages.push('...');
  }

  // Always show last page
  if (totalPages > 1) {
    pages.push(totalPages);
  }

  return (
    <div className="flex items-center justify-center space-x-2">
      <Button
        variant="outline"
        size="icon"
        disabled={currentPage === 1}
        asChild={currentPage !== 1}
      >
        {currentPage === 1 ? (
          <div>
            <ChevronLeft className="h-4 w-4" />
          </div>
        ) : (
          <Link href={`${baseUrl}?page=${currentPage - 1}`}>
            <ChevronLeft className="h-4 w-4" />
          </Link>
        )}
      </Button>

      {pages.map((page, index) => {
        if (page === '...') {
          return (
            <Button
              key={`ellipsis-${index}`}
              variant="ghost"
              size="icon"
              disabled
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          );
        }

        const isCurrentPage = page === currentPage;
        return (
          <Button
            key={page}
            variant={isCurrentPage ? 'default' : 'outline'}
            size="icon"
            asChild={!isCurrentPage}
          >
            {isCurrentPage ? (
              <div>{page}</div>
            ) : (
              <Link href={`${baseUrl}?page=${page}`}>{page}</Link>
            )}
          </Button>
        );
      })}

      <Button
        variant="outline"
        size="icon"
        disabled={currentPage === totalPages}
        asChild={currentPage !== totalPages}
      >
        {currentPage === totalPages ? (
          <div>
            <ChevronRight className="h-4 w-4" />
          </div>
        ) : (
          <Link href={`${baseUrl}?page=${currentPage + 1}`}>
            <ChevronRight className="h-4 w-4" />
          </Link>
        )}
      </Button>
    </div>
  );
}
