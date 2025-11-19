import { client } from "@/app/_lib/microcms";
import styles from "./page.module.css";

export default async function EventDetail({
  params,
}: {
  params: { id: string };
}) {
  const event = await client.get({
    endpoint: "events",
    contentId: params.id,
  });

  return (
    <main className={styles.main}>
      <h1>{event.title}</h1>
      <p>📅 {event.date}</p>
      <p>📍 {event.place}</p>
      <p>{event.description}</p>

      {event.image && (
        <img src={event.image.url} alt={event.title} className={styles.image} />
      )}
    </main>
  );
}
