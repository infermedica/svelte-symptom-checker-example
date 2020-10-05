const express = require("express");
const cors = require("cors");
const app = express();
const httpProxyMiddleware = require("http-proxy-middleware");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

app.use(cors());

app.use(
  "/v3",
  httpProxyMiddleware.createProxyMiddleware({
    target: "https://api.infermedica.com",
    changeOrigin: true,
    onProxyReq: (proxyReq, req, res) => {
      proxyReq.setHeader("App-Id", process.env.APP_ID);
      proxyReq.setHeader("App-Key", process.env.APP_KEY);
    },
    onProxyRes: (proxyRes, req, res) => {
      proxyRes.headers["Access-Control-Allow-Origin"] = process.env.CLIENT_URL;
    },
  })
);
app.listen(3000);
