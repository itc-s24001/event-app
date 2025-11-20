import Link from "next/link";
import { client } from "@/libs/microcms";
import Pagination from "@/app/components/Pagination";
import SearchBar from "@/app/components/SearchBar";
import styles from "./page.module.css";

const PER_PAGE = 4;

type Event = {
  id: string;
  title: string;
  date: string;
  place: string;
  description?: string;
};

type MicroCMSResponse = {
  contents: Event[];
  totalCount: number;
  offset: number;
  limit: number;
};

export default async function Home({
  searchParams,
}: {
  searchParams?: { page?: string; q?: string };
}) {
  const page = Number(searchParams?.page) || 1;
  const keyword = searchParams?.q || "";

  let data: MicroCMSResponse;

  try {
    data = await client.get<MicroCMSResponse>({
      endpoint: "events",
      queries: {
        limit: PER_PAGE,
        offset: (page - 1) * PER_PAGE,
        orders: "date",
        ...(keyword !== "" && { q: keyword }),
      },
    });
  } catch (error) {
    console.error("microCMSからのデータ取得エラー:", error);
    // エラー時は空のデータを返す
    data = {
      contents: [],
      totalCount: 0,
      offset: 0,
      limit: PER_PAGE,
    };
  }

  const totalPages = Math.ceil(data.totalCount / PER_PAGE);

  return (
    <main className={styles.main}>
      <div className={styles.hero}>
        <h1 className={styles.title}>🎪 イベント一覧</h1>
        <p className={styles.subtitle}>開催予定のイベントをご覧いただけます</p>
      </div>

      <SearchBar />

      {data.contents.length === 0 ? (
        <div className={styles.noResult}>
          <p>イベントが見つかりませんでした</p>
          <p style={{ fontSize: "0.9rem", color: "#999", marginTop: "0.5rem" }}>
            {keyword
              ? "検索条件を変更してください"
              : "イベントが登録されていません"}
          </p>
        </div>
      ) : (
        <>
          <div className={styles.list}>
            {data.contents.map((event) => (
              <Link
                key={event.id}
                href={`/events/${event.id}`}
                className={styles.item}
              >
                <div className={styles.info}>
                  <h2>{event.title}</h2>
                  <p className={styles.meta}>
                    📅 {event.date} ｜ 📍 {event.place}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination currentPage={page} totalPages={totalPages} />
          )}
        </>
      )}
    </main>
  );
}
