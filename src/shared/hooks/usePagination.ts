"use client";

import { useMemo, useState } from "react";

export type UsePaginationOptions = {
  initialPage?: number;
  initialPageSize?: number;
  totalItems?: number;
};

export type PaginationRangeItem = number | "...";

function getSafePage(value: number): number {
  if (!Number.isFinite(value) || value < 1) {
    return 1;
  }

  return Math.floor(value);
}

function getSafePageSize(value: number): number {
  if (!Number.isFinite(value) || value < 1) {
    return 10;
  }

  return Math.floor(value);
}

export function getTotalPages(totalItems: number, pageSize: number): number {
  if (totalItems <= 0) {
    return 1;
  }

  return Math.max(1, Math.ceil(totalItems / pageSize));
}

export function getPaginationRange(
  currentPage: number,
  totalPages: number,
  siblingCount = 1
): PaginationRangeItem[] {
  const totalPageNumbers = siblingCount + 5;

  if (totalPageNumbers >= totalPages) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

  const shouldShowLeftDots = leftSiblingIndex > 2;
  const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

  const firstPageIndex = 1;
  const lastPageIndex = totalPages;

  if (!shouldShowLeftDots && shouldShowRightDots) {
    const leftItemCount = 3 + 2 * siblingCount;
    const leftRange = Array.from(
      { length: leftItemCount },
      (_, index) => index + 1
    );

    return [...leftRange, "...", totalPages];
  }

  if (shouldShowLeftDots && !shouldShowRightDots) {
    const rightItemCount = 3 + 2 * siblingCount;
    const rightRange = Array.from(
      { length: rightItemCount },
      (_, index) => totalPages - rightItemCount + index + 1
    );

    return [firstPageIndex, "...", ...rightRange];
  }

  const middleRange = Array.from(
    { length: rightSiblingIndex - leftSiblingIndex + 1 },
    (_, index) => leftSiblingIndex + index
  );

  return [firstPageIndex, "...", ...middleRange, "...", lastPageIndex];
}

export function usePagination({
  initialPage = 1,
  initialPageSize = 10,
  totalItems = 0
}: UsePaginationOptions = {}) {
  const [page, setPageState] = useState(getSafePage(initialPage));
  const [pageSize, setPageSizeState] = useState(
    getSafePageSize(initialPageSize)
  );

  const totalPages = useMemo(
    () => getTotalPages(totalItems, pageSize),
    [totalItems, pageSize]
  );

  const range = useMemo(
    () => getPaginationRange(page, totalPages),
    [page, totalPages]
  );

  function setPage(nextPage: number) {
    const safePage = getSafePage(nextPage);
    setPageState(Math.min(safePage, totalPages));
  }

  function setPageSize(nextPageSize: number) {
    const safePageSize = getSafePageSize(nextPageSize);
    setPageSizeState(safePageSize);
    setPageState(1);
  }

  function nextPage() {
    setPage(Math.min(page + 1, totalPages));
  }

  function previousPage() {
    setPage(Math.max(page - 1, 1));
  }

  function firstPage() {
    setPage(1);
  }

  function lastPage() {
    setPage(totalPages);
  }

  const offset = (page - 1) * pageSize;

  return {
    page,
    pageSize,
    totalItems,
    totalPages,
    range,
    offset,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
    setPage,
    setPageSize,
    nextPage,
    previousPage,
    firstPage,
    lastPage
  };
}