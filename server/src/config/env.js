import dotenv from 'dotenv';
import path from 'path';

// Load .env before any other module imports execute
dotenv.config({ path: path.join(process.cwd(), 'server', '.env') });
dotenv.config({ path: path.join(process.cwd(), '.env') });
dotenv.config();

export default process.env;
