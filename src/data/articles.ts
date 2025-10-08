export type ArticleMeta = {
  slug: string;
  title: string;
  summary: string;
  publishedAt: string;
};

export const articleMetas: ArticleMeta[] = [
  {
    slug: "renovation-planning-guide.html",
    title: "リフォーム計画の基本ガイド",
    summary:
      "予算やスケジュールの立て方など、工事前に押さえておきたい基礎を解説します。",
    publishedAt: "2024-05-12",
  },
  {
    slug: "kitchen-storage-ideas.html",
    title: "キッチン収納を見直す３つのポイント",
    summary:
      "毎日の料理をスムーズにするための収納改善のコツを紹介します。",
    publishedAt: "2024-05-08",
  },
  {
    slug: "bathroom-renovation-checklist.html",
    title: "バスルーム改修チェックリスト",
    summary:
      "浴室リフォームで確認したい設備や工程をチェックリスト形式でまとめました。",
    publishedAt: "2024-05-05",
  },
  {
    slug: "energy-saving-remodel-ideas.html",
    title: "省エネリフォームで光熱費を抑えるコツ",
    summary:
      "断熱や高効率設備で快適性と省エネを両立させるポイントを紹介します。",
    publishedAt: "2024-05-02",
  },
];
