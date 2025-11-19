import Link from "next/link";
import { client } from "@/app/_lib/microcms";
import Pagination from "@/app/components/Pagination";
import SearchBar from "@/app/components/SearchBar";
import styles from "./page.module.css";

const PER_PAGE = 4;

export default async function Home({
  searchParams,
}: {
  searchParams?: { page?: string; q?: string };
}) {
  const page = Number(searchParams?.page) || 1;
  const keyword = searchParams?.q || "";

  const data = await client.get({
    endpoint: "events",
    queries: {
      limit: PER_PAGE,
      offset: (page - 1) * PER_PAGE,
      q: keyword !== "" ? keyword : undefined,
    },
  });

  const totalPages = Math.ceil(data.totalCount / PER_PAGE);

  return (
    <main className={styles.main}>
      <h1>🎪 イベント一覧</h1>

      <SearchBar />

      <div className={styles.list}>
        {data.contents.map((event: any) => (
          <Link
            key={event.id}
            href={`/events/${event.id}`}
            className={styles.item}
          >
            <h2>{event.title}</h2>
            <p>
              {event.date}｜{event.place}
            </p>
          </Link>
        ))}
      </div>

      <Pagination currentPage={page} totalPages={totalPages} />
    </main>
  );
}
