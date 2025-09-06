import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  console.log("email check", userId)
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {$set:{
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      }
      });
    } else if (emailType == "RESET") {
      await User.findByIdAndUpdate(userId, {$set:{
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      }
      });
    }
    // Looking to send emails in production? Check out our Email API/SMTP product!
    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "f3da435b525667",
        pass: "4d595c3309697a",
      },
    });
    const mailOptions = {
      from: '"Maddison Foo Koch" <maddison53@ethereal.email>', //senders address
      to: email,
      subject:
        emailType == "VERIFY" ? "verify your email" : "reset your password",
      // text: "Hello world?", // plain‑text body
      html: `<p>click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}">here </a> to ${
        emailType === "VERIFY" ? `verify your email (${email})` : `reset your password for (${email})`
      } or copy and paste the link below in your browser.<br>
      ${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`, // HTML body
    };
    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
