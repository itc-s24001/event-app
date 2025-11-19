"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import styles from "../page.module.css";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialKeyword = searchParams.get("q") || "";
  const [keyword, setKeyword] = useState(initialKeyword);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setKeyword(v);

    // 現在の URL パラメータを引き継ぐ（重要！）
    const params = new URLSearchParams(searchParams.toString());

    if (v.trim() === "") {
      params.delete("q");
    } else {
      params.set("q", v);
    }

    // 検索されたら1ページ目に戻す
    params.set("page", "1");

    router.push(`/?${params.toString()}`);
  };

  return (
    <div className={styles.searchBox}>
      <input
        type="text"
        value={keyword}
        onChange={handleChange}
        placeholder="イベントを検索（例：文化祭など）"
        className={styles.searchInput}
      />
    </div>
  );
}
