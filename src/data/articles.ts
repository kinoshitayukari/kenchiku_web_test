export type ArticleMeta = {
  slug: string;
  title: string;
  summary: string;
  publishedAt: string;
  coverImage: string;
  coverImageAlt: string;
};

export const articleMetas: ArticleMeta[] = [
  {
    slug: "renovation-estimate-complete-guide.html",
    title: "【40代主婦向け】リフォーム見積もり完全ガイド",
    summary:
      "リフォーム見積もりの基礎から費用相場、業者選び、資金計画までを丁寧に解説した決定版ガイドです。",
    publishedAt: "2024-05-20",
    coverImage:
      "/articles/images_renovation-estimate-complete-guide/タイトル（H1）_1.png",
    coverImageAlt: "【40代主婦向け】リフォーム見積もり完全ガイドのアイキャッチ画像",
  },
  {
    slug: "renovation-planning-guide.html",
    title: "リフォーム計画の基本ガイド",
    summary:
      "予算やスケジュールの立て方など、工事前に押さえておきたい基礎を解説します。",
    publishedAt: "2024-05-12",
    coverImage:
      "/articles/images_renovation-planning-guide/タイトル（H1）_1.png",
    coverImageAlt: "リフォーム計画の基本ガイドのアイキャッチ画像",
  },
  {
    slug: "kitchen-storage-ideas.html",
    title: "キッチン収納を見直す３つのポイント",
    summary:
      "毎日の料理をスムーズにするための収納改善のコツを紹介します。",
    publishedAt: "2024-05-08",
    coverImage:
      "/articles/images_kitchen-storage-ideas/タイトル（H1）_1.png",
    coverImageAlt: "キッチン収納を見直す３つのポイントのアイキャッチ画像",
  },
  {
    slug: "bathroom-renovation-checklist.html",
    title: "バスルーム改修チェックリスト",
    summary:
      "浴室リフォームで確認したい設備や工程をチェックリスト形式でまとめました。",
    publishedAt: "2024-05-05",
    coverImage:
      "/articles/images_bathroom-renovation-checklist/タイトル（H1）_1.png",
    coverImageAlt: "バスルーム改修チェックリストのアイキャッチ画像",
  },
  {
    slug: "energy-saving-remodel-ideas.html",
    title: "省エネリフォームで光熱費を抑えるコツ",
    summary:
      "断熱や高効率設備で快適性と省エネを両立させるポイントを紹介します。",
    publishedAt: "2024-05-02",
    coverImage:
      "/articles/images_energy-saving-remodel-ideas/タイトル（H1）_1.png",
    coverImageAlt: "省エネリフォームで光熱費を抑えるコツのアイキャッチ画像",
  },
];
