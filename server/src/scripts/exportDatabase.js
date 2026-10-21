import 'dotenv/config';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Recursively convert MongoDB BSON types (ObjectId, Date, Buffer) into clean standard JSON
function cleanDocument(obj, stripIds = false) {
    if (obj === null || obj === undefined) return obj;

    if (Array.isArray(obj)) {
        return obj.map(item => cleanDocument(item, stripIds));
    }

    if (obj instanceof Date) {
        return obj.toISOString();
    }

    if (obj._bsontype === 'ObjectID' || obj.constructor?.name === 'ObjectId' || (obj.toHexString && typeof obj.toHexString === 'function')) {
        return obj.toString();
    }

    if (Buffer.isBuffer(obj)) {
        return obj.toString('base64');
    }

    if (typeof obj === 'object') {
        const cleaned = {};
        for (const [key, val] of Object.entries(obj)) {
            // Remove Mongoose version key
            if (key === '__v') continue;

            // Remove _id if requested for systems that auto-generate primary keys
            if (stripIds && key === '_id') continue;

            cleaned[key] = cleanDocument(val, stripIds);
        }
        return cleaned;
    }

    return obj;
}

async function exportDatabase() {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/aussiesmartenergy';
    const maskedUri = mongoUri.replace(/:([^:@]+)@/, ':****@');
    console.log(`Connecting to database: ${maskedUri}...`);

    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 15000 });
    console.log('Connected successfully!\n');

    const db = mongoose.connection.db;
    const dbName = db.databaseName || 'aussieDB';

    // Directories
    const serverDir = path.resolve(__dirname, '../../');
    const rootDir = path.resolve(serverDir, '../');
    const rootSeedsDir = path.join(rootDir, 'seeds');
    const rootExportsDir = path.join(rootDir, 'database_exports');
    const serverExportsDir = path.join(serverDir, 'exports');

    fs.mkdirSync(rootSeedsDir, { recursive: true });
    fs.mkdirSync(rootExportsDir, { recursive: true });
    fs.mkdirSync(serverExportsDir, { recursive: true });

    // List all collections
    const collections = await db.listCollections().toArray();
    console.log(`Found ${collections.length} collection(s) in "${dbName}":`);

    // Standard seed data with _id preserved
    const seedDataWithIds = {};
    // Seed data with _id stripped (for SQL or systems that auto-generate IDs)
    const seedDataWithoutIds = {};

    const fullExport = {
        database: dbName,
        exportedAt: new Date().toISOString(),
        collections: {}
    };

    const stats = [];

    for (const colInfo of collections) {
        const colName = colInfo.name;
        if (colName.startsWith('system.')) continue;

        const rawDocs = await db.collection(colName).find({}).toArray();

        const docsWithIds = rawDocs.map(doc => cleanDocument(doc, false));
        const docsWithoutIds = rawDocs.map(doc => cleanDocument(doc, true));

        // Store into aggregated objects
        seedDataWithIds[colName] = docsWithIds;
        seedDataWithoutIds[colName] = docsWithoutIds;
        fullExport.collections[colName] = docsWithIds;

        // Individual collection seed files (pure JSON array)
        fs.writeFileSync(path.join(rootSeedsDir, `${colName}.seed.json`), JSON.stringify(docsWithIds, null, 2), 'utf-8');
        fs.writeFileSync(path.join(rootExportsDir, `${colName}.json`), JSON.stringify(docsWithIds, null, 2), 'utf-8');

        stats.push({
            collection: colName,
            records: docsWithIds.length,
            seedFile: `seeds/${colName}.seed.json`
        });

        console.log(`  ✓ Processed ${colName}: ${docsWithIds.length} records`);
    }

    // 1. Primary Seed File: seed_data.json (Direct dictionary of collections ready for seeders)
    const seedFilePath = path.join(rootDir, 'seed_data.json');
    fs.writeFileSync(seedFilePath, JSON.stringify(seedDataWithIds, null, 2), 'utf-8');

    // 2. Secondary Seed File: seed_data_no_ids.json (Clean without _id for SQL / auto-gen IDs)
    const seedNoIdsPath = path.join(rootDir, 'seed_data_no_ids.json');
    fs.writeFileSync(seedNoIdsPath, JSON.stringify(seedDataWithoutIds, null, 2), 'utf-8');

    // 3. Full metadata export: database_export.json
    const fullExportPath = path.join(rootDir, 'database_export.json');
    fs.writeFileSync(fullExportPath, JSON.stringify(fullExport, null, 2), 'utf-8');

    // Also mirror to server/exports/
    fs.writeFileSync(path.join(serverExportsDir, 'seed_data.json'), JSON.stringify(seedDataWithIds, null, 2), 'utf-8');
    fs.writeFileSync(path.join(serverExportsDir, 'database_export.json'), JSON.stringify(fullExport, null, 2), 'utf-8');

    console.log('\n--- Seed Files Generated Successfully! ---');
    console.log(`Primary Seed File:       ${seedFilePath}`);
    console.log(`Seed File (No _id):      ${seedNoIdsPath}`);
    console.log(`Individual Seed Files:   ${rootSeedsDir}`);
    console.log(`Full Database Export:    ${fullExportPath}\n`);
    console.table(stats);

    await mongoose.disconnect();
    console.log('Database disconnected.');
}

exportDatabase().catch(err => {
    console.error('Export failed:', err);
    process.exit(1);
});
