import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export const sendRecruitmentEmail = async (emails: string[]) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.GMAIL,
      pass: process.env.GMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  await Promise.all(
    emails.map(async (email) => {
      const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject:
          "Invitation to Use an Adaptive Elearning Platform",
        text: `
Welcome to NeuraCraft

        `,
      };

      await transporter.sendMail(mailOptions);
    })
  );
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const emails: string[] = req.body.emails;

  try {
    await sendRecruitmentEmail(emails);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error sending recruitment emails" });
  }

  res.status(200).json({ message: "Recruitment email(s) sent successfully" });
}
