"use client";

import { useState } from "react";
import styles from "../page.module.css";

type Props = {
  onSearch: (keyword: string) => void;
};

export default function SearchBar({ onSearch }: Props) {
  const [keyword, setKeyword] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setKeyword(value);
    onSearch(value);
  };

  return (
    <div className={styles.searchBox}>
      <input
        type="text"
        value={keyword}
        onChange={handleChange}
        placeholder="イベントを検索（例：文化祭・体育館など）"
        className={styles.searchInput}
      />
    </div>
  );
}
