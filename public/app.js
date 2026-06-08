const button =
    document.getElementById("short");

const copyBtn =
    document.getElementById("copyBtn");

const downloadQR =
    document.getElementById("downloadQR");

const themeToggle =
    document.getElementById("themeToggle");

let currentQR = "";

/* =========================
   Theme Toggle
========================= */

if(localStorage.getItem("theme") === "light"){

    document.body.classList.add("light-mode");

    themeToggle.innerText = "☀️";
}

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("light-mode");

    if(document.body.classList.contains("light-mode")){

        localStorage.setItem("theme", "light");

        themeToggle.innerText = "☀️";
    }

    else{

        localStorage.setItem("theme", "dark");

        themeToggle.innerText = "🌙";
    }
});

/* =========================
   Shorten URL
========================= */

button.addEventListener("click", async () => {

    const longUrl =
        document.getElementById("longUrl").value;

    const customCode =
        document.getElementById("customCode").value;

    if(!longUrl){

        alert("Please enter a URL");

        return;
    }

    try{

        const response = await fetch("/shorten", {

            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({

                longUrl: longUrl,

                customCode: customCode,

            }),
        });

        const data = await response.json();

        if(!response.ok){

            alert(data.msg);

            return;
        }

        currentQR = data.qrCode;

        /* Show Result */

        document.getElementById("shortUrl")
        .innerHTML = `

            <a href="${data.shortUrl}" target="_blank">

                ${data.shortUrl}

            </a>

            <br><br>

            <img
                id="qrImage"
                src="${data.qrCode}"
                width="180"
            >

        `;

        /* Analytics */

        const code =
            data.shortUrl.split("/").pop();

        const analytics =
            await fetch(`/analytics/${code}`);

        const analyticsData =
            await analytics.json();

        document.getElementById("analyticsBox")
        .innerHTML = `

            <h3>Analytics</h3>

            <p>
                Total Clicks:
                ${analyticsData.totalClicks}
            </p>

        `;

    }

    catch(error){

        console.log(error);

        alert("Something went wrong");
    }

});

/* =========================
   Copy URL
========================= */

copyBtn.addEventListener("click", () => {

    const shortUrl =
        document.getElementById("shortUrl").innerText;

    navigator.clipboard.writeText(shortUrl);

    alert("Copied Successfully");

});

/* =========================
   Download QR
========================= */

downloadQR.addEventListener("click", () => {

    if(!currentQR){

        alert("Generate URL First");

        return;
    }

    const link =
        document.createElement("a");

    link.href = currentQR;

    link.download = "qr-code.png";

    link.click();

});