import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';
import { dbConnect } from './config/db.config.js';
import agentRouter from './routes/agent.route.js';
import listRouter from './routes/list.route.js';
import authRouter from './routes/user.route.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dbConnect();

const app = express();
const PORT = process.env.PORT || 5050;

app.use(cors({
    origin: ['https://machine-test-mern-dxbc.vercel.app'],
    methods: "GET,POST,PUT,DELETE,PATCH",
    credentials: true
}));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many request, Please try again after 15 minutes",
});

app.use(limiter);

app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use('/api/auth', authRouter);
app.use('/api/agent', agentRouter);
app.use('/api/list', listRouter);

app.listen(PORT, () => {
  console.log(`server started at ${PORT}`);
});
