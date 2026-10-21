import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const scriptPath = path.join(__dirname, 'server', 'src', 'scripts', 'seedTargetDatabase.js');
const serverCwd = path.join(__dirname, 'server');

const child = spawn('node', [scriptPath, ...process.argv.slice(2)], {
    cwd: serverCwd,
    stdio: 'inherit'
});

child.on('exit', (code) => {
    process.exit(code ?? 0);
});
