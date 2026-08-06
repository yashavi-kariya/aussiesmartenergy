import express from 'express';
import mongoose from 'mongoose';
import os from 'os';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const { version: applicationVersion } = require('../../package.json');

const router = express.Router();

// Map Mongoose numeric readyState values to readable health states.
const mongooseConnectionStates = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
};

// Keep database checks lightweight by inspecting Mongoose state only.
const getDatabaseHealth = () => {
    const readyState = mongoose.connection.readyState;

    return {
        status: mongooseConnectionStates[readyState] || 'unknown',
        readyState,
        connected: readyState === 1,
    };
};

// Return process memory metrics in bytes without expensive calculations.
const getMemoryUsage = () => process.memoryUsage();

// Return CPU time consumed by this Node process in microseconds.
const getCpuUsage = () => process.cpuUsage();

// GET /health/live confirms the Node process can respond to HTTP.
router.get('/live', (req, res) => {
    res.status(200).json({ status: 'alive' });
});

// GET /health/ready confirms dependencies needed to serve traffic are ready.
router.get('/ready', (req, res) => {
    const database = getDatabaseHealth();
    const httpStatus = database.connected ? 200 : 503;

    res.status(httpStatus).json({
        status: database.connected ? 'ready' : 'not_ready',
        timestamp: new Date().toISOString(),
        database,
    });
});

// GET /health returns full application health and runtime diagnostics.
router.get('/', (req, res) => {
    const database = getDatabaseHealth();
    const httpStatus = database.connected ? 200 : 503;

    res.status(httpStatus).json({
        status: database.connected ? 'healthy' : 'unhealthy',
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        database,
        memory: getMemoryUsage(),
        cpu: getCpuUsage(),
        nodeVersion: process.version,
        environment: process.env.NODE_ENV || 'development',
        version: applicationVersion,
        pid: process.pid,
        hostname: os.hostname(),
    });
});

export default router;
