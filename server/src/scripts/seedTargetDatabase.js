/**
 * Seed Aussie Smart Energy data into any target MongoDB database
 * Usage:
 *   node src/scripts/seedTargetDatabase.js "<TARGET_MONGODB_URI>" [--drop]
 *
 * Example:
 *   node src/scripts/seedTargetDatabase.js "mongodb+srv://user:pass@cluster.mongodb.net/newDB" --drop
 */

import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function seedTarget() {
    const args = process.argv.slice(2);
    const targetUri = args.find(arg => !arg.startsWith('--'));
    const shouldDrop = args.includes('--drop');
    const stripIds = args.includes('--no-ids');

    if (!targetUri) {
        console.log('\n======================================================');
        console.log('  Aussie Smart Energy - Target Database Seeder');
        console.log('======================================================\n');
        console.log('Usage:');
        console.log('  node src/scripts/seedTargetDatabase.js "<TARGET_MONGODB_URI>" [options]\n');
        console.log('Options:');
        console.log('  --drop      Drop target collections before inserting');
        console.log('  --no-ids    Strip original _id so target system generates fresh IDs\n');
        console.log('Examples:');
        console.log('  node src/scripts/seedTargetDatabase.js "mongodb+srv://user:pass@cluster.mongodb.net/prod" --drop');
        console.log('  node src/scripts/seedTargetDatabase.js "mongodb://localhost:27017/myNewApp" --drop --no-ids\n');
        process.exit(1);
    }

    const rootDir = path.resolve(__dirname, '../../../');
    const seedFileName = stripIds ? 'seed_data_no_ids.json' : 'seed_data.json';
    const seedFilePath = path.join(rootDir, seedFileName);

    if (!fs.existsSync(seedFilePath)) {
        console.error(`Error: Seed file not found at ${seedFilePath}`);
        console.log('Please run "npm run export:db" first to generate the seed files.');
        process.exit(1);
    }

    const seedData = JSON.parse(fs.readFileSync(seedFilePath, 'utf-8'));
    const maskedUri = targetUri.replace(/:([^:@]+)@/, ':****@');
    console.log(`Connecting to target database: ${maskedUri}...`);

    await mongoose.connect(targetUri, { serverSelectionTimeoutMS: 15000 });
    console.log('Connected to target database successfully!\n');

    const db = mongoose.connection.db;
    console.log(`Target Database Name: "${db.databaseName}"`);
    console.log(`Using seed source:    ${seedFileName}`);
    if (shouldDrop) {
        console.log('Mode:                 --drop (clearing existing collections before inserting)');
    }
    console.log('');

    const stats = [];

    for (const [collectionName, records] of Object.entries(seedData)) {
        if (!Array.isArray(records) || records.length === 0) {
            console.log(`- Skipping empty collection: ${collectionName}`);
            continue;
        }

        const col = db.collection(collectionName);

        if (shouldDrop) {
            try {
                await col.drop();
                console.log(`  ✓ Dropped existing collection: ${collectionName}`);
            } catch (err) {
                // Ignore NamespaceNotFound if collection didn't exist
            }
        }

        // Convert string ISO dates back to Date objects for native Mongo queries
        const prepared = records.map(item => {
            const copy = { ...item };
            for (const [k, v] of Object.entries(copy)) {
                if (typeof v === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(v)) {
                    copy[k] = new Date(v);
                }
            }
            return copy;
        });

        const result = await col.insertMany(prepared, { ordered: false });
        stats.push({
            collection: collectionName,
            inserted: result.insertedCount,
            status: 'Success'
        });
        console.log(`  ✓ Inserted ${result.insertedCount} documents into "${collectionName}"`);
    }

    console.log('\n--- Seeding Completed Successfully! ---');
    console.table(stats);

    await mongoose.disconnect();
    console.log('Database disconnected.');
}

seedTarget().catch(err => {
    console.error('Seeding error:', err);
    process.exit(1);
});
