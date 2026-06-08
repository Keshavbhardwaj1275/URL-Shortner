import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { nanoid } from "nanoid";

dotenv.config();

const app = express();

const port = process.env.PORT || 1234;

/* =========================
   Middlewares
========================= */

app.use(express.json());

app.use(cors());

app.use("/", express.static("public"));

/* =========================
   MongoDB Connection
========================= */

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {

        console.log("Connected Successfully");

    })
    .catch((error) => {

        console.log(error);

    });

/* =========================
   Schema
========================= */

const schema = mongoose.Schema({

    shortCode: String,

    longUrl: String,

    clicks: {
        type: Number,
        default: 0
    }

});

const Url = mongoose.model("urlims", schema);

/* =========================
   Home Route
========================= */

app.get("/", (req, res) => {

    res.sendFile("index.html");

});

/* =========================
   Create Short URL
========================= */

app.post("/shorten", async (req, res) => {

    try {

        const { longUrl, customCode } = req.body;

        if (!longUrl) {

            return res.status(400).json({
                msg: "Long URL is required"
            });

        }

        let shortCode;

        if (customCode && customCode.trim() !== "") {

            const existing = await Url.findOne({
                shortCode: customCode
            });

            if (existing) {

                return res.status(400).json({
                    msg: "Custom code already exists"
                });

            }

            shortCode = customCode;

        } else {

            shortCode = nanoid(6);

        }

        const newUrl = new Url({

            shortCode: shortCode,

            longUrl: longUrl

        });

        await newUrl.save();

        const shortUrl = `${process.env.BASE_URL}/url/${shortCode}`;

        return res.status(201).json({

            shortUrl: shortUrl

        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({

            msg: "Internal Server Error"

        });

    }

});

/* =========================
   Redirect Route
========================= */

app.get("/url/:code", async (req, res) => {

    try {

        const shortCode = req.params.code;

        const doc = await Url.findOne({

            shortCode: shortCode

        });

        if (!doc) {

            return res.status(404).json({

                msg: "URL Not Found"

            });

        }

        // increase clicks

        doc.clicks = doc.clicks + 1;

        await doc.save();

        return res.redirect(doc.longUrl);

    } catch (error) {

        console.log(error);

        return res.status(500).json({

            msg: "Server Error"

        });

    }

});

/* =========================
   Analytics Route
========================= */

app.get("/analytics/:code", async (req, res) => {

    try {

        const shortCode = req.params.code;

        const doc = await Url.findOne({

            shortCode: shortCode

        });

        if (!doc) {

            return res.status(404).json({

                msg: "Analytics Not Found"

            });

        }

        return res.status(200).json({

            shortCode: doc.shortCode,

            longUrl: doc.longUrl,

            totalClicks: doc.clicks

        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({

            msg: "Internal Server Error"

        });

    }

});

/* =========================
   Start Server
========================= */

app.listen(port, () => {

    console.log(`App is Running on Port ${port}`);

});