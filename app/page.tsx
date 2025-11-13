"use client";

import { useState } from "react";
import Link from "next/link";
import Pagination from "./components/Pagination";
import SearchBar from "./components/SearchBar";
import styles from "./page.module.css";

const events = [
  {
    id: "1",
    title: "文化祭",
    date: "2025-11-20",
    place: "体育館",
    description: "模擬店や展示、ステージイベントなど盛りだくさん！",
  },
  {
    id: "2",
    title: "音楽発表会",
    date: "2025-12-05",
    place: "講堂",
    description: "吹奏楽部と合唱部の合同演奏をお楽しみください。",
  },
  {
    id: "3",
    title: "卒業式",
    date: "2026-03-15",
    place: "体育館",
    description: "卒業生の新たな門出を祝う式典です。",
  },
  {
    id: "4",
    title: "新入生歓迎会",
    date: "2026-04-10",
    place: "体育館",
    description: "新入生の皆さんを歓迎するイベントです！",
  },
  {
    id: "5",
    title: "運動会",
    date: "2026-05-20",
    place: "グラウンド",
    description: "全校生徒で盛り上がる恒例の運動会です！",
  },
  {
    id: "6",
    title: "文化講演会",
    date: "2026-06-10",
    place: "講堂",
    description: "著名な講師をお招きして行われる特別講演会。",
  },
];

const PER_PAGE = 4;

export default function Home() {
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");

  // 検索フィルタ
  const filteredEvents = events.filter((event) => {
    const search = keyword.toLowerCase();
    return (
      event.title.toLowerCase().includes(search) ||
      event.place.toLowerCase().includes(search) ||
      event.description.toLowerCase().includes(search)
    );
  });

  const totalPages = Math.ceil(filteredEvents.length / PER_PAGE);
  const startIndex = (page - 1) * PER_PAGE;
  const currentEvents = filteredEvents.slice(startIndex, startIndex + PER_PAGE);

  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <h1 className={styles.title}>🎪 イベント紹介サイト</h1>
        <p className={styles.subtitle}>
          最新の学校イベント情報をチェックしよう！
        </p>
      </section>

      {/* 🔍 検索バー */}
      <SearchBar
        onSearch={(value) => {
          setKeyword(value);
          setPage(1); // 新しい検索では1ページ目に戻す
        }}
      />

      {/* イベント一覧 */}
      <div className={styles.list}>
        {currentEvents.length > 0 ? (
          currentEvents.map((event) => (
            <Link
              key={event.id}
              href={`/events/${event.id}`}
              className={styles.item}
            >
              <div className={styles.info}>
                <h2>{event.title}</h2>
                <p className={styles.meta}>
                  📅 {event.date}　📍 {event.place}
                </p>
                <p className={styles.desc}>{event.description}</p>
              </div>
            </Link>
          ))
        ) : (
          <p className={styles.noResult}>
            該当するイベントが見つかりませんでした。
          </p>
        )}
      </div>

      {/* ページネーション */}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={(p) => setPage(p)}
      />
    </main>
  );
}
