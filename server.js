import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import logger from './middleware/logger.js';
import coursesRouter from './routes/courses.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use(logger);

app.use('/courses', coursesRouter);
app.use('/enroll', coursesRouter);

app.get('/', (req, res) => {
  res.json({ message: 'Course Enrollment API is running!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});