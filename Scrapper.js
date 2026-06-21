const axios = require("axios");

async function fetchPageHtml(url) {
  try {
    const resp = await axios.get(url, {
      timeout: 15000,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0 Safari/537.36",
        "Accept-Language": "fr-FR,fr;q=0.9,en;q=0.8",
        "Accept": "text/html,application/xhtml+xml",
        "Cache-Control": "no-cache"
      }
    });

    if (!resp.data || resp.data.length < 300) {
      throw new Error("HTML vide ou bloqué");
    }

    return resp.data;
  } catch (err) {
    if (err.response) {
      throw new Error("HTTP " + err.response.status);
    }
    throw err;
  }
}

module.exports = {
  fetchPageHtml
};