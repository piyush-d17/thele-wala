const nodemailer = require("nodemailer");

const sendMembershipformMail = async () => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.EMAILUSER,
        pass: process.env.EMAILPASSWORD,
      },
    });

    const mailOptions = {
      from: `"Maiflix Bot" <${process.env.EMAILUSER}>`,
      to: "piyushsinghchauhan5816@gmail.com",
      subject: `🎉 New Order From ${"piyush"}`,
      html: `
          <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h2 style="color: #E50914;">🎉 New Order Recieved</h2>
            <p><strong>Name:</strong> ${"piyush"}</p>
            <p><strong>Phone Number:</strong> ${"9982448543"}</p>
            <p><strong>City:</strong> ${"Delhi"}</p>
  
            <hr style="margin: 20px 0;" />
            <p style="color: #555;">TheleWala.</p>
            <p style="margin-top:20px;">Cheers,<br/>TheleWala 🤖</p>
          </div>
        `,
    };
    console.log(process.env.EMAILUSER);
    const info = await transporter.sendMail(mailOptions);
    console.log("Membership form email sent:", info.response);
  } catch (error) {
    console.error("Error while sending membership form email:", error.message);
  }
};

module.exports = sendMembershipformMail;
