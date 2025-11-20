import { client } from "@/libs/microcms";
import styles from "./page.module.css";

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
          <span>📅 {event.date}</span>
          <span>📍 {event.place}</span>
        </div>

        <hr className={styles.line} />

        <p className={styles.desc}>{event.description}</p>

        {event.image && (
          <img
            src={event.image.url}
            alt={event.title}
            style={{
              width: "100%",
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
