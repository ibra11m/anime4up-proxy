const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

// هذا المسار يخلي UptimeRobot يصحي السيرفر
app.get("/wake", (req, res) => {
  res.send("🟢 Proxy is awake!");
});

app.get("/", async (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) {
    return res.status(400).send("❌ No URL provided.");
  }

  try {
    const response = await axios.get(targetUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
      },
    });
    res.send(response.data);
  } catch (err) {
    res.status(500).send(`❌ Error: ${err.message}`);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Proxy server running on port ${PORT}`);
});
