import express from "express";
import cors from "cors";
import "dotenv/config";
import taskRoutes from "./routes/taskRoutes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(",")
  : ["http://localhost:4000"];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use((req, res, next) => {
  const defaultSrc = process.env.CSP_DEFAULT_SRC;
  const connectSrc = process.env.CSP_CONNECT_SRC;

  res.setHeader(
    "Content-Security-Policy",
    `default-src ${defaultSrc}; connect-src ${connectSrc}`
  );

  next();
});

app.get("/", (req, res) => {
  res.json({
    message: "HMCTS server is running",
    endpoints: ["/tasks"],
  });
});

app.use("/tasks", taskRoutes);

export default app;
