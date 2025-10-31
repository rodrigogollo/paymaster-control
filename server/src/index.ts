import path from 'path';
import http from 'node:http';
import app from './app.ts';
import dotenv from 'dotenv';
const __dirname = import.meta.dirname;

dotenv.config({ path: path.join(__dirname, '../.env') })

const { PORT } = process.env;

const server = http.createServer(app);

async function startServer() {
  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  })
}
startServer()
