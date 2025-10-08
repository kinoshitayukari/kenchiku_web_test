import { articleMetas } from "./data/articles";

export default function ReformLandingJP() {
  const Feature = ({ title, desc }: { title: string; desc: string }) => (
    <div className="p-6 rounded-2xl bg-white/70 backdrop-blur shadow-sm border">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm leading-6 text-gray-600">{desc}</p>
    </div>
  );

  const SectionTitle = ({
    kicker,
    title,
    subtitle,
  }: {
    kicker?: string;
    title: string;
    subtitle?: string;
  }) => (
    <div className="max-w-3xl mx-auto text-center mb-10">
      {kicker && (
        <p className="text-xs tracking-widest text-indigo-600 font-semibold uppercase mb-2">
          {kicker}
        </p>
      )}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
        {title}
      </h2>
      {subtitle && <p className="text-gray-600 mt-3">{subtitle}</p>}
    </div>
  );

  const PriceRow = ({
    label,
    normal,
    ours,
    note,
  }: {
    label: string;
    normal: string;
    ours: string;
    note?: string;
  }) => (
    <tr className="border-b last:border-b-0">
      <td className="py-3 px-4 font-medium">{label}</td>
      <td className="py-3 px-4 text-gray-500 line-through">{normal}</td>
      <td className="py-3 px-4 font-semibold text-emerald-600">{ours}</td>
      <td className="py-3 px-4 text-xs text-gray-500">{note}</td>
    </tr>
  );

  const articleLinks = articleMetas.slice(0, 4).map((article) => ({
    ...article,
    href: `/articles/${article.slug}`,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-white text-gray-900">
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 11l9-7 9 7" />
                <path d="M9 22V12h6v10" />
                <path d="M14.5 7.5l2 2" />
                <path d="M16.5 5a2 2 0 012 2l-3.2 3.2-2-2L16.5 5z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold leading-none">直営リフォーム工房</p>
              <p className="text-[11px] text-gray-500 leading-tight">
                中間手数料を極力カットし“適正価格”へ
              </p>
            </div>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#services" className="hover:text-indigo-600">
              サービス
            </a>
            <a href="#reason" className="hover:text-indigo-600">
              半額の理由
            </a>
            <a href="#prices" className="hover:text-indigo-600">
              参考価格
            </a>
            <a href="#flow" className="hover:text-indigo-600">
              流れ
            </a>
            <a href="#works" className="hover:text-indigo-600">
              施工事例
            </a>
            <a href="#faq" className="hover:text-indigo-600">
              FAQ
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <a
              href="tel:0120000000"
              className="hidden sm:inline text-sm text-gray-600 hover:text-indigo-600"
            >
              電話相談: 0120-000-000
            </a>
            <a
              href="#contact"
              className="inline-flex items-center px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold shadow hover:opacity-90"
            >
              無料見積
            </a>
          </div>
        </div>
      </header>

      <section id="top" className="relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10 opacity-30 pointer-events-none"
          aria-hidden="true"
        >
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1440 560">
            <defs>
              <linearGradient id="g" x1="0" x2="1">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#22c55e" />
              </linearGradient>
            </defs>
            <path
              d="M0,320 C300,180 540,480 840,360 C1140,240 1260,280 1440,220 L1440,0 L0,0 Z"
              fill="url(#g)"
            />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 grid md:grid-cols-2 items-center gap-10">
          <div>
            <p className="inline-flex items-center text-[11px] font-semibold tracking-wider uppercase text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full">
              実質価格 最大50%ダウン(条件による)
            </p>
            <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
              大手見積の<strong className="text-indigo-600">半額クラス</strong>でも、
              <br />仕上がりは<strong className="text-emerald-600">きっちり</strong>。
            </h1>
            <p className="mt-4 text-base sm:text-lg text-gray-700">
              物価高で「リフォームは無理かも…」という声が増えています。大手は多くの人や会社が関わるため
              <span className="font-semibold">
                中間手数料が積み上がり、原価率が約10%の見積になりがち
              </span>
              で、結果として割高に。
              私たちは<strong>個人事業</strong>として中間コストを極力下げ、
              <strong>原価率50%以上</strong>を目安にすることで、
              <strong>実際の価格を約50%まで下げる</strong>ことを目指します。
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href="#contact"
                className="inline-flex justify-center items-center px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold shadow hover:opacity-90"
              >
                今すぐ無料見積
              </a>
              <a
                href="#reason"
                className="inline-flex justify-center items-center px-5 py-3 rounded-xl bg-white text-indigo-700 font-semibold border hover:bg-indigo-50"
              >
                半額の理由を見る
              </a>
            </div>
            <ul className="mt-6 text-sm text-gray-600 space-y-1 list-disc list-inside">
              <li>
                最短<strong>24時間以内</strong>に概算見積(平日)
              </li>
              <li>
                各種保険加入/近隣挨拶/保証(内容は工事により異なります)
              </li>
            </ul>
          </div>
          <div className="md:pl-6">
            <div className="aspect-video rounded-2xl bg-white shadow-lg border p-6 flex items-center justify-center">
              <svg
                viewBox="0 0 480 270"
                className="w-full h-full"
                fill="none"
                stroke="#6366f1"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M60 150 L240 40 L420 150" />
                <rect x="100" y="150" width="280" height="90" rx="8" stroke="#0ea5e9" />
                <rect x="140" y="180" width="60" height="60" rx="6" />
                <rect x="280" y="170" width="60" height="70" rx="6" />
                <path d="M340 70a22 22 0 10-18 18l30 30 18-18-30-30z" stroke="#22c55e" />
                <path d="M352 104l24 24" stroke="#22c55e" />
                <rect x="70" y="80" width="70" height="24" rx="6" stroke="#f59e0b" />
                <path d="M105 104v28h18" stroke="#f59e0b" />
              </svg>
            </div>
            <p className="text-[11px] text-gray-500 mt-2">
              イラストは装飾です。実施工写真に置き換え可能です。
            </p>
          </div>
        </div>
      </section>

      <section id="reason" className="py-14 bg-gradient-to-b from-white to-indigo-50/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            kicker="Reason"
            title="なぜ“半額クラス”が可能なのか"
            subtitle="見えにくい中間コストを省き、原価率を高める設計です。"
          />
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="rounded-2xl bg-white border shadow-sm p-6">
              <h3 className="font-semibold">コスト構造の比較（概念図）</h3>
              <div className="mt-4 space-y-6">
                <div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">大手の見積(例)</span>
                    <span className="text-gray-500">原価率 約10%</span>
                  </div>
                  <div className="mt-2 h-6 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gray-300"
                      style={{ width: "20%" }}
                      title="広告・販管費"
                    />
                    <div
                      className="h-full bg-gray-400"
                      style={{ width: "35%" }}
                      title="元請マージン"
                    />
                    <div
                      className="h-full bg-gray-500"
                      style={{ width: "35%" }}
                      title="下請・再委託マージン"
                    />
                    <div
                      className="h-full bg-emerald-500"
                      style={{ width: "10%" }}
                      title="原価(材料+職人)"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">当社の見積(例)</span>
                    <span className="text-gray-500">原価率 50%以上</span>
                  </div>
                  <div className="mt-2 h-6 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gray-300"
                      style={{ width: "10%" }}
                      title="販管費"
                    />
                    <div
                      className="h-full bg-emerald-500"
                      style={{ width: "55%" }}
                      title="原価(材料+職人)"
                    />
                    <div
                      className="h-full bg-gray-400"
                      style={{ width: "35%" }}
                      title="適正利益・運営費"
                    />
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-gray-500 mt-3">
                ※上記は概念図です。案件により構成比は変動します。
              </p>
            </div>
            <div className="text-sm leading-7 text-gray-700">
              <p className="font-semibold">ポイントは“人の層”と“再委託”。</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>元請→一次→二次…と重なるほど、各社の管理費・利益が累積。</li>
                <li>広告・営業・展示場などの固定費も価格に上乗せ。</li>
                <li>結果として、材料と職人に回る“原価”が小さくなりがち。</li>
              </ul>
              <p className="mt-4 font-semibold">当社は“直営・少人数”。</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>
                  再委託を極力減らし、 <span className="font-semibold">原価率を50%以上</span>へ。
                </li>
                <li>
                  実質価格が <span className="font-semibold">大手比で約50%下がる</span>案件が多数(条件あり)。
                </li>
                <li>品質は工程管理・養生・写真報告・保証で担保。</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            kicker="Strength"
            title="価格だけでなく、段取りと品質も“まっすぐ”"
            subtitle="直営体制でブレのない管理と丁寧施工。"
          />
          <div className="grid md:grid-cols-3 gap-6">
            <Feature
              title="中間手数料を徹底カット"
              desc="多層下請けを避け、直接施工を基本に。マージンを抑えて適正価格を実現。"
            />
            <Feature
              title="原価率50%以上を目安"
              desc="材料・職人にしっかりコストを配分し、安かろう悪かろうを回避。"
            />
            <Feature
              title="大手並みの安心体制"
              desc="養生/近隣配慮/工程可視化/保証まで標準化した品質管理。"
            />
          </div>
        </div>
      </section>

      <section id="services" className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            kicker="Services"
            title="対応メニュー"
            subtitle="小工事からフルリノベまで。"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { t: "内装(壁紙/床/建具)", d: "張替え・補修・室内ドア・収納造作など" },
              {
                t: "水回り(キッチン/浴室/洗面/トイレ)",
                d: "設備交換・レイアウト変更・配管調整",
              },
              { t: "塗装/外壁/屋根", d: "外装塗装・屋根葺き替え・防水・雨漏り" },
              {
                t: "窓/断熱/省エネ",
                d: "サッシ交換・内窓・断熱改修・補助金サポート",
              },
              {
                t: "間取り変更/リノベ",
                d: "LDK化・和室→洋室・スケルトンリノベ",
              },
              {
                t: "小工事/原状回復",
                d: "巾木・手すり・棚板・賃貸リフォームなど",
              },
            ].map((service) => (
              <div
                key={service.t}
                className="p-6 rounded-2xl bg-white shadow-sm border hover:shadow-md transition"
              >
                <div className="flex items-center gap-3">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-6 h-6 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 11l9-7 9 7" />
                    <path d="M9 22V12h6v10" />
                  </svg>
                  <h3 className="font-semibold text-lg">{service.t}</h3>
                </div>
                <p className="text-sm text-gray-600 mt-2">{service.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="prices" className="py-14 bg-gradient-to-b from-white to-emerald-50/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            kicker="Price"
            title="参考価格(目安)"
            subtitle="仕様・現場状況により変動。現地確認後に正式お見積り。"
          />
          <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="py-3 px-4 text-left">工事項目</th>
                  <th className="py-3 px-4 text-left">一般的な相場</th>
                  <th className="py-3 px-4 text-left">当方参考(大手比)</th>
                  <th className="py-3 px-4 text-left">注記</th>
                </tr>
              </thead>
              <tbody>
                <PriceRow
                  label="クロス張替え(6畳)"
                  normal="¥60,000〜"
                  ours="¥28,000〜"
                  note="量産/下地良好時"
                />
                <PriceRow
                  label="トイレ交換(標準)"
                  normal="¥150,000〜"
                  ours="¥80,000〜"
                  note="本体グレードにより変動"
                />
                <PriceRow
                  label="システムキッチン交換"
                  normal="¥1,200,000〜"
                  ours="¥600,000〜"
                  note="配管/内装別途あり"
                />
                <PriceRow
                  label="ユニットバス交換"
                  normal="¥1,300,000〜"
                  ours="¥600,000〜"
                  note="サイズ/搬入経路により変動"
                />
                <PriceRow
                  label="外壁塗装(30坪)"
                  normal="¥1,000,000〜"
                  ours="¥540,000〜"
                  note="塗料/足場で変動"
                />
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-gray-500 mt-2">
            ※目安です。材料/グレード/下地/搬入/追加工事の有無で金額は変わります。
          </p>
        </div>
      </section>

      <section id="flow" className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            kicker="Flow"
            title="お問い合わせから施工までの流れ"
            subtitle="はじめての方にもわかりやすく。"
          />
          <ol className="grid lg:grid-cols-7 gap-4 text-sm">
            {[
              "ヒアリング",
              "現地調査",
              "概算見積(最短24h)",
              "仕様決定/正式見積",
              "ご契約",
              "施工(写真共有)",
              "完了検査/保証",
            ].map((step, index) => (
              <li
                key={step}
                className="bg-white border shadow-sm rounded-2xl p-4 flex flex-col items-start"
              >
                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold mb-2">
                  {index + 1}
                </div>
                <p className="font-semibold">{step}</p>
                <p className="text-gray-600 mt-1 text-xs">
                  {index === 0 && "ご要望・ご予算・期日を共有。写真/図面があれば迅速です。"}
                  {index === 1 && "寸法/下地/配管/電気/搬入経路を確認。近隣配慮もチェック。"}
                  {index === 2 && "数量拾いと工程試算を行い、概算をご提示。"}
                  {index === 3 && "メーカー型番・仕様確定。正式見積と工程表をご提出。"}
                  {index === 4 && "ご契約/着手金(任意)。近隣挨拶・資材発注を開始。"}
                  {index === 5 && "丁寧養生・安全管理。進捗は日次で写真共有。"}
                  {index === 6 && "仕上がり確認・引渡し。保証/アフターのご案内。"}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="works" className="py-14 bg-gradient-to-b from-white to-indigo-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            kicker="Works"
            title="施工事例"
            subtitle="撮影/掲載許可を頂いた事例の一部です。"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <figure
                key={item}
                className="overflow-hidden rounded-2xl border bg-white shadow-sm"
              >
                <div className="aspect-video grid place-items-center bg-gray-50">
                  <svg
                    viewBox="0 0 120 68"
                    className="w-3/4 h-3/4"
                    fill="none"
                    stroke="#94a3b8"
                    strokeWidth="1.6"
                  >
                    <rect x="6" y="26" width="108" height="36" rx="3" />
                    <path d="M10 28 L60 10 L110 28" />
                    <rect x="20" y="40" width="20" height="20" rx="2" />
                    <rect x="52" y="36" width="26" height="24" rx="2" />
                    <rect x="84" y="44" width="18" height="16" rx="2" />
                  </svg>
                </div>
                <figcaption className="p-4 text-sm">
                  <p className="font-semibold">戸建リビング改装</p>
                  <p className="text-gray-600">床フロア貼替/壁紙/建具交換/照明計画</p>
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-3">
            ※掲載写真はダミーです。実績写真に差し替えてご利用ください。
          </p>
        </div>
      </section>

      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            kicker="Voice"
            title="お客様の声"
            subtitle="“半額クラスでも仕上がりはしっかり”とのお声を多数。"
          />
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            {[
              {
                n: "T様(横浜市)",
                c: "大手の半分程度の見積で助かりました。段取りも良く、仕上がりに大満足です。",
              },
              {
                n: "S様(世田谷区)",
                c: "価格の根拠(中間コストの説明)がわかりやすく、納得して依頼できました。",
              },
              {
                n: "M様(川崎市)",
                c: "原価率の考え方に共感。材料や職人さんにきちんとお金が回るのが良い。",
              },
            ].map((voice) => (
              <blockquote
                key={voice.n}
                className="p-6 bg-white border rounded-2xl shadow-sm"
              >
                <p className="text-gray-700">“{voice.c}”</p>
                <footer className="mt-3 text-xs text-gray-500">— {voice.n}</footer>
              </blockquote>
            ))}
          </div>
          <p className="text-[11px] text-gray-500 mt-3">
            ※体裁見本です。実レビューに差し替えてご利用ください。
          </p>
        </div>
      </section>

      <section id="faq" className="py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle kicker="FAQ" title="よくあるご質問" />
          <div className="space-y-4">
            {[
              {
                q: "なぜ大手より安いのですか？",
                a: "多重下請けや再委託で各階層の管理費・利益が上乗せされるためです。当社は直営・少人数で中間手数料を極力カットし、原価率50%以上を目安にしています。",
              },
              {
                q: "“安かろう悪かろう”では？",
                a: "材料は正規メーカー品を使用し、養生・検査・写真報告・保証まで標準化。原価率を高く保つので、むしろ品質を重視できます。",
              },
              {
                q: "概算見積はいつ出ますか？",
                a: "平日であれば、写真・寸法情報を頂ければ24時間以内を目安に概算をご提示。正式金額は現地調査後に確定します。",
              },
              {
                q: "対応エリアは？",
                a: "拠点から車で約90分圏内を基本としています。エリア外もまずはご相談ください。",
              },
              {
                q: "補助金や減税の相談は可能？",
                a: "断熱改修・窓リフォーム等の補助金は申請サポート可能な場合があります。案件に応じてご案内します。",
              },
            ].map((faq, index) => (
              <details key={index} className="group border rounded-2xl p-4 bg-white shadow-sm">
                <summary className="font-semibold cursor-pointer list-none flex items-center justify-between">
                  <span>{faq.q}</span>
                  <span className="text-gray-400 group-open:rotate-180 transition">▼</span>
                </summary>
                <p className="mt-2 text-sm text-gray-700">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-16 bg-indigo-600/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-10 items-start">
          <div>
            <h3 className="text-2xl font-bold">お問い合わせフォーム</h3>
            <p className="text-gray-700 mt-2">
              お手数ですが、下記の内容にお答えしてお問い合わせしてください。
            </p>
            <p className="text-gray-700 mt-2">
              お問い合わせから３営業日以内に、ご連絡します。
            </p>
            <p className="text-gray-700 mt-2">
              いただいた情報は、お見積りやご相談のためだけに使用します。第三者に公開されることはありません。
            </p>
            <p className="text-sm text-gray-500 mt-6">一級 Akira Ban</p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-semibold shadow hover:opacity-90"
                href="tel:0120000000"
              >
                電話で相談
              </a>
              <a
                className="px-4 py-2 rounded-xl bg-white text-indigo-700 font-semibold border hover:bg-indigo-50"
                href="mailto:banakira0326@gmail.com"
              >
                メールで相談
              </a>
            </div>
            <p className="text-[11px] text-gray-500 mt-3">
              ※実運用ではプライバシーポリシー/特商法表記/会社情報の掲載を推奨します。
            </p>
          </div>
          <div className="bg-white border rounded-2xl shadow-sm p-3 sm:p-6 space-y-6">
            <div>
              <h4 className="text-lg font-semibold">最新の記事</h4>
              <p className="text-sm text-gray-600 mt-1">
                リフォームをご検討中の方に役立つ情報をまとめました。気になるテーマをご覧ください。
              </p>
              <ul className="mt-4 space-y-4">
                {articleLinks.map((article) => (
                  <li key={article.href} className="group">
                    <a
                      href={article.href}
                      className="text-indigo-700 font-semibold group-hover:text-indigo-500"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {article.title}
                    </a>
                    <p className="text-xs text-gray-500 mt-1">
                      公開日:
                      {" "}
                      {new Date(article.publishedAt).toLocaleDateString("ja-JP", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">{article.summary}</p>
                  </li>
                ))}
              </ul>
              <div className="pt-2">
                <a
                  href="/articles/index.html"
                  className="inline-flex items-center text-sm font-semibold text-indigo-700 hover:text-indigo-500"
                  target="_blank"
                  rel="noreferrer"
                >
                  記事をすべて見る ↗
                </a>
              </div>
            </div>
            <div className="relative">
              <iframe
                title="お問い合わせフォーム"
                src="https://docs.google.com/forms/d/e/1FAIpQLSfQETOV-WxN_gYJNU9eWC2y9XTfHU8J-36_RfMmRrSlIn3FSA/viewform?embedded=true"
                width="640"
                height={2056}
                className="w-full rounded-xl border-0"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
                loading="lazy"
                style={{ minHeight: "2056px" }}
              >
                読み込んでいます…
              </iframe>
              <p className="sr-only">
                フォームが表示されない場合は
                <a
                  className="text-indigo-600 underline ml-1"
                  href="https://docs.google.com/forms/d/e/1FAIpQLSfQETOV-WxN_gYJNU9eWC2y9XTfHU8J-36_RfMmRrSlIn3FSA/viewform"
                  target="_blank"
                  rel="noreferrer"
                >
                  こちら
                </a>
                からアクセスしてください。
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="fixed bottom-4 right-4 z-40">
        <a
          href="#contact"
          className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl shadow-lg bg-indigo-600 text-white font-semibold hover:opacity-90"
        >
          無料見積はこちら
        </a>
      </div>

      <footer className="mt-16 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
          <div>
            <p className="font-semibold">直営リフォーム工房</p>
            <p className="text-gray-600 mt-2 text-sm">
              中間手数料を極力カットし、原価率50%以上を目安に“適正価格”をご提案。
            </p>
          </div>
          <div>
            <p className="font-semibold">運営情報(例)</p>
            <ul className="mt-2 text-gray-600 space-y-1">
              <li>屋号: 〇〇リフォーム</li>
              <li>代表: 〇〇 〇〇</li>
              <li>所在地: 〇〇県〇〇市</li>
              <li>メール: info@example.com</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold">対応エリア(例)</p>
            <p className="text-gray-600 mt-2">拠点から車で約90分圏内。エリア外は応相談。</p>
          </div>
          <div>
            <p className="font-semibold">法令/表記</p>
            <ul className="mt-2 text-gray-600 space-y-1">
              <li>
                <a className="hover:text-indigo-600" href="#">
                  プライバシーポリシー(雛形)
                </a>
              </li>
              <li>
                <a className="hover:text-indigo-600" href="#">
                  特定商取引法に基づく表記(雛形)
                </a>
              </li>
              <li>
                <a className="hover:text-indigo-600" href="#">
                  施工請負契約の標準条項(雛形)
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center text-xs text-gray-500 pb-8">
          © {new Date().getFullYear()} Direct Reform. All rights reserved.
        </div>
      </footer>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HomeAndConstructionBusiness",
            name: "直営リフォーム工房",
            areaServed: "拠点から車で約90分圏内",
            url: "https://example.com",
            telephone: "0120-000-000",
            priceRange: "￥",
            description:
              "個人事業で中間手数料を極力下げ、原価率50%以上を目安に適正価格を実現。大手比で実質価格を約50%下げることを目指します。",
            address: {
              "@type": "PostalAddress",
              addressRegion: "都道府県",
              addressLocality: "市区町村",
              streetAddress: "任意",
            },
            openingHours: "Mo-Fr 09:00-18:00",
          }),
        }}
      />
    </div>
  );
}
