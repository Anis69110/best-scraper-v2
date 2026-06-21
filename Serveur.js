const express = require("express");
const { fetchPageHtml } = require("./scraper");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/scrape", async (req, res) => {
  const url = req.query.url;

  if (!url) {
    return res.status(400).json({ error: "URL manquante" });
  }

  try {
    const html = await fetchPageHtml(url);
    res.json({
      ok: true,
      length: html.length,
      html: html.slice(0, 5000) // limite sécurité
    });
  } catch (e) {
    res.status(500).json({
      ok: false,
      error: e.message
    });
  }
});

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});