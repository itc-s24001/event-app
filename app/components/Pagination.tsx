"use client";

import Link from "next/link";
import styles from "../page.module.css";

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
};

export default function Pagination({ currentPage, totalPages }: Props) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={styles.pagination}>
      {pages.map((page) => (
        <Link
          key={page}
          href={`/?page=${page}`}
          className={`${styles.pageButton} ${
            currentPage === page ? styles.active : ""
          }`}
        >
          {page}
        </Link>
      ))}
    </div>
  );
}
