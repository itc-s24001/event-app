import Link from "next/link";
import styles from "./page.module.css";

const events = [
  {
    id: "1",
    title: "文化祭",
    date: "2025-11-20",
    place: "体育館",
    description:
      "模擬店や展示、ステージイベントなど盛りだくさん！ぜひご家族や友人と一緒にお越しください。",
  },
  {
    id: "2",
    title: "音楽発表会",
    date: "2025-12-05",
    place: "講堂",
    description:
      "吹奏楽部と合唱部による合同演奏会。今年も名曲を多数披露します。入場無料です！",
  },
  {
    id: "3",
    title: "卒業式",
    date: "2026-03-15",
    place: "体育館",
    description:
      "卒業生の新たな門出を祝う式典です。保護者の皆さまのご参加をお待ちしております。",
  },
];

export default function EventDetail({ params }: { params: { id: string } }) {
  const event = events.find((e) => e.id === params.id);

  if (!event) {
    return <p className={styles.notFound}>イベントが見つかりません。</p>;
  }

  return (
    <main className={styles.main}>
      <div className={styles.card}>
        <h1 className={styles.title}>{event.title}</h1>
        <div className={styles.info}>
          <p>📅 {event.date}</p>
          <p>📍 {event.place}</p>
        </div>
        <hr className={styles.line} />
        <p className={styles.desc}>{event.description}</p>

        <Link href="/" className={styles.backLink}>
          ← 一覧ページに戻る
        </Link>
      </div>
    </main>
  );
}
