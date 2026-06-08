import express from "express";
import { nanoid } from "nanoid";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import QRCode from "qrcode";

dotenv.config();

const app = express();
const port = 1234;

/* Middleware */

app.use(express.json());

app.use(cors());

app.use("/", express.static("public"));

/* MongoDB Connection */

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Connected Successfully"))
    .catch((err) => console.log(err));

/* Schema */

const schema = mongoose.Schema({

    shortCode: String,

    longUrl: String,

    clicks: {

        type: Number,

        default: 0,

    },

});

/* Model */

const Url = mongoose.model("urlims", schema);

/* Home Route */

app.get("/", (req, res) => {

    res.sendFile("index.html", {

        root: "public",

    });

});

/* Shorten Route */

app.post("/shorten", async (req, res) => {

    try {

        const body = req.body;

        const longUrl = body.longUrl;

        if (!longUrl) {

            return res.status(400).json({

                msg: "URL is required",

            });
        }

        /* URL Validation */

        try {

            new URL(longUrl);

        }

        catch {

            return res.status(400).json({

                msg: "Invalid URL",

            });
        }

        /* Custom Code */

        const shortCode =
            body.customCode || nanoid(6);

        /* Duplicate Check */

        const existing =
            await Url.findOne({

                shortCode: shortCode,

            });

        if (existing) {

            return res.status(400).json({

                msg: "Custom short code already exists",

            });
        }

        /* Save */

        const url = new Url({

            shortCode: shortCode,

            longUrl: longUrl,

        });

        await url.save();

        /* Generate Short URL */

        const shortUrl =
            `http://localhost:${port}/url/${shortCode}`;

        /* Generate QR */

        const qrCode =
            await QRCode.toDataURL(shortUrl);

        return res.status(201).json({

            shortUrl: shortUrl,

            qrCode: qrCode,

        });

    }

    catch (error) {

        console.log(error);

        return res.status(500).json({

            msg: "Internal Server Error",

        });
    }

});

/* Redirect Route */

app.get("/url/:code", async (req, res) => {

    try {

        const shortCode = req.params.code;

        const doc = await Url.findOne({

            shortCode: shortCode,

        });

        if (!doc) {

            return res.status(404).json({

                msg: "Short URL Not Found",

            });
        }

        /* Increase Click Count */

        doc.clicks += 1;

        await doc.save();

        return res.redirect(doc.longUrl);

    }

    catch (error) {

        console.log(error);

        return res.status(500).json({

            msg: "Internal Server Error",

        });
    }

});

/* Analytics Route */

app.get("/analytics/:code", async (req, res) => {

    try {

        const shortCode = req.params.code;

        const doc = await Url.findOne({

            shortCode: shortCode,

        });

        if (!doc) {

            return res.status(404).json({

                msg: "URL Not Found",

            });
        }

        return res.json({

            shortCode: doc.shortCode,

            longUrl: doc.longUrl,

            totalClicks: doc.clicks,

        });

    }

    catch (error) {

        console.log(error);

        return res.status(500).json({

            msg: "Internal Server Error",

        });
    }

});

/* Start Server */

app.listen(port, () => {

    console.log(`App is Running on Port ${port}`);

});