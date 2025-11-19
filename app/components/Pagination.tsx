"use client";

import { useRouter, useSearchParams } from "next/navigation";
import styles from "../page.module.css";

type Props = {
  currentPage: number;
  totalPages: number;
};

export default function Pagination({ currentPage, totalPages }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const move = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className={styles.pagination}>
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => move(p)}
          className={`${styles.pageButton} ${
            currentPage === p ? styles.active : ""
          }`}
        >
          {p}
        </button>
      ))}
    </div>
  );
}
