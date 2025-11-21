import { client } from "@/libs/microcms";
import styles from "./page.module.css";
import Image from "next/image";

type Event = {
  id: string;
  title: string;
  date: string;
  place: string;
  description: string;
  image?: {
    url: string;
  };
};

export default async function EventDetail({
  params,
}: {
  params: { id: string };
}) {
  const event = await client.get<Event>({
    endpoint: "events",
    contentId: params.id,
  });

  return (
    <main className={styles.main}>
      <div className={styles.card}>
        <h1 className={styles.title}>{event.title}</h1>

        <div className={styles.info}>
          <span>
            📅{" "}
            {new Date(event.date).toLocaleString("ja-JP", {
              year: "numeric",
              month: "long",
              day: "numeric",
              weekday: "short",
              hour: "2-digit",
              minute: "2-digit",
              timeZone: "Asia/Tokyo",
            })}
          </span>
          <span>📍 {event.place}</span>
        </div>

        <hr className={styles.line} />

        <p className={styles.desc}>{event.description}</p>

        {event.image && (
          <Image
            src={event.image.url}
            alt={event.title}
            width={600}
            height={400}
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "12px",
              marginTop: "1.5rem",
            }}
          />
        )}

        <a href="/" className={styles.backLink}>
          ← イベント一覧に戻る
        </a>
      </div>
    </main>
  );
}
