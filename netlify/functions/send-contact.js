const nodemailer = require("nodemailer");

const REQUIRED_ENV = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS"];

const validatePayload = (payload) => {
  if (!payload) {
    throw new Error("データが送信されていません。");
  }

  const {
    kansaiResidence,
    name,
    email,
    desiredAreas,
    purpose,
    budget,
    timeline,
    questions,
  } = payload;

  if (!kansaiResidence) {
    throw new Error("現住所の情報を選択してください。");
  }

  if (!name) {
    throw new Error("お名前を入力してください。");
  }

  if (!email) {
    throw new Error("メールアドレスを入力してください。");
  }

  if (!Array.isArray(desiredAreas) || desiredAreas.length === 0) {
    throw new Error("リフォーム希望箇所を選択してください。");
  }

  if (!purpose) {
    throw new Error("リフォームの目的/お悩みを入力してください。");
  }

  if (!budget) {
    throw new Error("ご予算イメージを選択してください。");
  }

  if (!timeline) {
    throw new Error("希望時期を選択してください。");
  }

  return {
    kansaiResidence,
    name,
    email,
    desiredAreas,
    purpose,
    budget,
    timeline,
    questions: questions || "",
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
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: {
        Allow: "POST",
      },
      body: "Method Not Allowed",
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
      body: JSON.stringify({ error: message }),
    };
  }
};
