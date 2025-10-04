const nodemailer = require("nodemailer");

const REQUIRED_ENV = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS"];
const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};
const RESIDENCE_OPTIONS = ["はい", "いいえ", "関西に引っ越し予定"];
const BUDGET_OPTIONS = ["〜50万円", "50〜100万円", "100〜300万円", "300万円以上"];
const TIMELINE_OPTIONS = ["すぐにでも", "3か月以内", "半年以内", "1年以内"];
const DESIRED_AREA_OPTIONS = [
  "キッチン",
  "浴室",
  "トイレ",
  "外壁",
  "屋根",
  "内装",
  "その他",
];

const sanitizeSingleLine = (value) =>
  typeof value === "string" ? value.replace(/[\r\n]+/g, " ").trim() : "";
const sanitizeMultiline = (value) =>
  typeof value === "string" ? value.replace(/\r/g, "").trim() : "";

const validateEmail = (value) =>
  typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const assertInOptions = (value, options, message) => {
  if (!options.includes(value)) {
    throw new Error(message);
  }
};

const validatePayload = (payload) => {
  if (!payload || typeof payload !== "object") {
    throw new Error("データが送信されていません。");
  }

  const raw = {
    kansaiResidence: sanitizeSingleLine(payload.kansaiResidence),
    name: sanitizeSingleLine(payload.name),
    email: sanitizeSingleLine(payload.email),
    desiredAreas: Array.isArray(payload.desiredAreas)
      ? payload.desiredAreas.map(sanitizeSingleLine)
      : [],
    purpose: sanitizeMultiline(payload.purpose),
    budget: sanitizeSingleLine(payload.budget),
    timeline: sanitizeSingleLine(payload.timeline),
    questions: sanitizeMultiline(payload.questions || ""),
  };

  if (!raw.kansaiResidence) {
    throw new Error("現住所の情報を選択してください。");
  }
  assertInOptions(
    raw.kansaiResidence,
    RESIDENCE_OPTIONS,
    "現住所の選択肢が正しくありません。"
  );

  if (!raw.name) {
    throw new Error("お名前を入力してください。");
  }
  if (raw.name.length > 100) {
    throw new Error("お名前は100文字以内で入力してください。");
  }

  if (!validateEmail(raw.email)) {
    throw new Error("正しいメールアドレスを入力してください。");
  }

  const filteredDesiredAreas = DESIRED_AREA_OPTIONS.filter((option) =>
    raw.desiredAreas.includes(option)
  );
  if (filteredDesiredAreas.length === 0) {
    throw new Error("リフォーム希望箇所を選択してください。");
  }

  if (!raw.purpose) {
    throw new Error("リフォームの目的/お悩みを入力してください。");
  }
  if (raw.purpose.length > 2000) {
    throw new Error("リフォームの目的/お悩みは2000文字以内で入力してください。");
  }

  if (!raw.budget) {
    throw new Error("ご予算イメージを選択してください。");
  }
  assertInOptions(
    raw.budget,
    BUDGET_OPTIONS,
    "ご予算イメージの選択肢が正しくありません。"
  );

  if (!raw.timeline) {
    throw new Error("希望時期を選択してください。");
  }
  assertInOptions(
    raw.timeline,
    TIMELINE_OPTIONS,
    "希望時期の選択肢が正しくありません。"
  );

  if (raw.questions.length > 2000) {
    throw new Error("ご質問内容は2000文字以内で入力してください。");
  }

  return {
    kansaiResidence: raw.kansaiResidence,
    name: raw.name,
    email: raw.email,
    desiredAreas: filteredDesiredAreas,
    purpose: raw.purpose,
    budget: raw.budget,
    timeline: raw.timeline,
    questions: raw.questions,
  };
};

const buildMailText = (data) => {
  return [
    "新しいお問い合わせが届きました。",
    "",
    `現住所: ${data.kansaiResidence}`,
    `お名前: ${data.name}`,
    `メールアドレス: ${data.email}`,
    `リフォーム希望箇所: ${data.desiredAreas.join(", ")}`,
    "",
    "---",
    "リフォームの目的 / お悩み:",
    data.purpose,
    "---",
    "",
    `ご予算イメージ: ${data.budget}`,
    `希望時期: ${data.timeline}`,
    "",
    "---",
    "気になっていること、質問したいこと:",
    data.questions || "(未記入)",
    "---",
  ].join("\n");
};

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers: {
        ...CORS_HEADERS,
      },
    };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: {
        Allow: "POST",
        ...CORS_HEADERS,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    const payload = validatePayload(JSON.parse(event.body || "{}"));

    for (const key of REQUIRED_ENV) {
      if (!process.env[key]) {
        throw new Error(
          `環境変数 ${key} が設定されていません。メール送信設定を確認してください。`
        );
      }
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 465),
      secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE !== "false" : true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const fromAddress = process.env.SMTP_FROM || process.env.SMTP_USER;

    await transporter.sendMail({
      from: fromAddress,
      to: "banakira0326@gmail.com",
      replyTo: `${payload.name} <${payload.email}>`,
      subject: `【お問い合わせ】${payload.name}様より`,
      text: buildMailText(payload),
    });

    return {
      statusCode: 200,
      headers: {
        ...CORS_HEADERS,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    console.error("send-contact error", error);

    const message =
      error instanceof Error
        ? error.message
        : "予期せぬエラーが発生しました。";

    return {
      statusCode: 400,
      headers: {
        ...CORS_HEADERS,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ error: message }),
    };
  }
};
