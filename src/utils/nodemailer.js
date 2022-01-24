require("dotenv").config();
const nodemailer = require("nodemailer");
const google = require("googleapis");

// const CLIENT_ID = process.env.CLIENT_ID;
// const CLIENT_SECRET = process.env.CLIENT_SECRET;
// const REDIRECT_URI = process.env.REDIRECT_URI;
// const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

CLIENT_ID="826920594712-pdeh105bvi8i6pbk3kfcgkrbvejhkfuq.apps.googleusercontent.com"
CLIENT_SECRET="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"
REDIRECT_URI="https://developers.google.com/oauthplayground"
REFRESH_TOKEN="ya29.a0ARrdaM9oiiWSHHRZ7PPfUF4ms6v0UixOE1K7YgxCrOx2ceY7JAgh1M9jpOuk1c5izlZ87lP_gT_z4w9_rL11yEngRahN_Rw98aXO3Mv9sf3kdRY48yPjY93V3jPQiAuqz9RyeQ3_InmD1DJ6eVWh4RIGKXWL"



const createTransporter = async () => {
    const oauthClient = new google.Auth.OAuth2Client(
        CLIENT_ID,
        CLIENT_SECRET,
        REDIRECT_URI
    );

    oauthClient.setCredentials({refresh_token: REFRESH_TOKEN});

    const accessToken = await oauthClient.getAccessToken();

    console.log(accessToken)

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "oauth2",
            user: "mcamacho@gekoestudio.com",
            accessToken,
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            refreshToken: REFRESH_TOKEN
        }
    });

    return transporter;
}

const sendEmail = async (mailOptions) => {
    const transporter = await createTransporter();
    const response = await transporter.sendMail(mailOptions);
    return response;
}



module.exports = sendEmail;