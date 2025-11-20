"use client";

import { useRouter, useSearchParams } from "next/navigation";
import styles from "../page.module.css";

export default function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const move = (p: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(p));
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
