const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv");
const fs = require("fs");
dotenv.config();

const sendEmail = async (html) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const mailInfo = {
    from: "suminkim.me@gmail.com", // * 보내는 사람 메일 주소 (sendgrid에 추가한 이메일만 발신자로 지정 가능)
    to: "qpdjdhkrha@naver.com", // * 받는 사람 메일 주소
    subject: "Sendgrid를 이용한 이메일 보내기 테스트",
    text: "Sendgrid를 이용한 이메일 보내기 테스트",
    html,
  };

  try {
    await sgMail.send(mailInfo);
    console.log("메일 전송 성공✌🏻");
  } catch (error) {
    console.log("메일 전송 실패😅", error);
  }
};

async function getHtmlToString() {
  const filePath = "./template.html";

  try {
    const data = await fs.promises.readFile(filePath, "utf-8");
    const html = `${data}`;
    sendEmail(html);
  } catch (error) {
    console.log("템플릿 읽어들이기 실패😅", error);
  }
}

getHtmlToString();
