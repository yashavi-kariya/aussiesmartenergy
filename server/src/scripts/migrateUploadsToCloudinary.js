import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env
dotenv.config({ path: path.join(__dirname, '../../.env') });

import { uploadImageBuffer, isCloudinaryConfigured } from '../config/cloudinary.js';
import Project from '../models/Project.js';
import Banner from '../models/Banner.js';

async function migrate() {
    if (!isCloudinaryConfigured()) {
        console.error('❌ Cloudinary is not configured yet.');
        console.log('Please add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET to server/.env first.');
        process.exit(1);
    }

    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
        console.error('❌ MONGODB_URI missing from .env');
        process.exit(1);
    }

    console.log('Connecting to MongoDB...');
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB.');

    const baseUploadsDir = path.join(__dirname, '../../uploads');

    // 1. Migrate Projects
    const projects = await Project.find({});
    console.log(`\nScanning ${projects.length} project(s)...`);

    for (const project of projects) {
        let changed = false;

        // Main Image
        if (project.mainImage && !project.mainImage.includes('cloudinary.com')) {
            const filename = project.mainImage.split('/uploads/projects/')[1];
            if (filename) {
                const localFile = path.join(baseUploadsDir, 'projects', filename);
                if (fs.existsSync(localFile)) {
                    console.log(`Uploading project mainImage: ${filename} to Cloudinary...`);
                    const buffer = fs.readFileSync(localFile);
                    const cloudUrl = await uploadImageBuffer(buffer, {
                        folder: 'aussiesmartenergy/projects',
                        originalname: filename,
                    });
                    project.mainImage = cloudUrl;
                    changed = true;
                }
            }
        }

        // Gallery
        if (Array.isArray(project.gallery) && project.gallery.length > 0) {
            const updatedGallery = [];
            for (const item of project.gallery) {
                if (item && !item.includes('cloudinary.com')) {
                    const filename = item.split('/uploads/projects/')[1];
                    if (filename) {
                        const localFile = path.join(baseUploadsDir, 'projects', filename);
                        if (fs.existsSync(localFile)) {
                            console.log(`Uploading project gallery image: ${filename} to Cloudinary...`);
                            const buffer = fs.readFileSync(localFile);
                            const cloudUrl = await uploadImageBuffer(buffer, {
                                folder: 'aussiesmartenergy/projects',
                                originalname: filename,
                            });
                            updatedGallery.push(cloudUrl);
                            changed = true;
                            continue;
                        }
                    }
                }
                updatedGallery.push(item);
            }
            project.gallery = updatedGallery;
        }

        if (changed) {
            await project.save();
            console.log(`✅ Updated project "${project.name}" with permanent Cloudinary URLs.`);
        }
    }

    // 2. Migrate Banners
    const banners = await Banner.find({});
    console.log(`\nScanning ${banners.length} banner(s)...`);

    for (const banner of banners) {
        if (banner.imageUrl && !banner.imageUrl.includes('cloudinary.com')) {
            const filename = banner.imageUrl.split('/uploads/banners/')[1];
            if (filename) {
                const localFile = path.join(baseUploadsDir, 'banners', filename);
                if (fs.existsSync(localFile)) {
                    console.log(`Uploading banner image: ${filename} to Cloudinary...`);
                    const buffer = fs.readFileSync(localFile);
                    const cloudUrl = await uploadImageBuffer(buffer, {
                        folder: 'aussiesmartenergy/banners',
                        originalname: filename,
                    });
                    banner.imageUrl = cloudUrl;
                    await banner.save();
                    console.log(`✅ Updated banner "${banner.title}" with permanent Cloudinary URL.`);
                }
            }
        }
    }

    console.log('\n🎉 Migration complete! All images are now permanently hosted on Cloudinary.');
    await mongoose.disconnect();
}

migrate().catch(err => {
    console.error('Migration failed:', err);
    process.exit(1);
});
