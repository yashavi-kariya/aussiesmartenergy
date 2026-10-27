import './env.js';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';
import { Readable } from 'stream';

/**
 * Configure or refresh Cloudinary configuration dynamically from process.env
 */
export const configureCloudinary = () => {
    const cloud_name = (process.env.CLOUDINARY_CLOUD_NAME || '').trim();
    const api_key = (process.env.CLOUDINARY_API_KEY || '').trim();
    const api_secret = (process.env.CLOUDINARY_API_SECRET || '').trim();

    cloudinary.config({
        cloud_name,
        api_key,
        api_secret,
        secure: true,
    });
};

// Initial configuration
configureCloudinary();

/**
 * Check if Cloudinary credentials are fully configured
 */
export const isCloudinaryConfigured = () => {
    configureCloudinary();
    return Boolean(
        process.env.CLOUDINARY_CLOUD_NAME?.trim() &&
        process.env.CLOUDINARY_API_KEY?.trim() &&
        process.env.CLOUDINARY_API_SECRET?.trim()
    );
};

/**
 * Safely resolves the directory for local uploads
 */
export const getUploadsDir = () => {
    const cwd = process.cwd();
    // If running with CWD inside 'server'
    if (path.basename(cwd) === 'server') {
        return path.join(cwd, 'uploads');
    }
    // If running from project root and 'server' directory exists
    const serverUploads = path.join(cwd, 'server', 'uploads');
    if (fs.existsSync(serverUploads) || fs.existsSync(path.join(cwd, 'server'))) {
        return serverUploads;
    }
    return path.join(cwd, 'uploads');
};

/**
 * Save a file buffer to local disk storage fallback
 */
export const saveToLocalDisk = (buffer, options = {}) => {
    const {
        folder = 'aussiesmartenergy/projects',
        originalname = 'image.jpg',
        req,
    } = options;

    const baseUploadsDir = getUploadsDir();
    const subFolder = folder.split('/').pop() || 'projects';
    const targetDir = path.join(baseUploadsDir, subFolder);

    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
    }

    const ext = path.extname(originalname) || '.jpg';
    const cleanBase = path.parse(originalname).name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const diskFilename = `${cleanBase}-${Date.now()}${ext}`;
    const filePath = path.join(targetDir, diskFilename);

    fs.writeFileSync(filePath, buffer);

    const host = req ? `${req.protocol}://${req.get('host')}` : 'http://localhost:5000';
    return `${host}/uploads/${subFolder}/${diskFilename}`;
};

/**
 * Upload a file buffer to Cloudinary (with automatic fallback to local disk if unconfigured or on error)
 * @param {Buffer} buffer - File buffer from multer memoryStorage
 * @param {Object} options - { folder, filename, originalname, req }
 * @returns {Promise<string>} Secure URL of uploaded image
 */
export const uploadImageBuffer = async (buffer, options = {}) => {
    const {
        folder = 'aussiesmartenergy/projects',
        filename,
        originalname = 'image.jpg',
        req,
    } = options;

    if (isCloudinaryConfigured()) {
        try {
            return await new Promise((resolve, reject) => {
                const cleanName = filename || (
                    path.parse(originalname).name.replace(/[^a-z0-9]/gi, '_').toLowerCase() +
                    `_${Date.now()}`
                );

                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        folder,
                        public_id: cleanName,
                        resource_type: 'image',
                        overwrite: true,
                    },
                    (error, result) => {
                        if (error) {
                            console.error('[Cloudinary] Upload stream failed:', error);
                            return reject(error);
                        }
                        resolve(result.secure_url);
                    }
                );

                const stream = Readable.from(buffer);
                stream.pipe(uploadStream);
            });
        } catch (cloudErr) {
            console.warn('[Cloudinary] Upload failed (' + (cloudErr?.message || cloudErr) + '). Falling back to local disk storage.');
            // Fall through to local storage fallback
        }
    } else {
        console.warn('[Storage] Cloudinary credentials not detected in .env. Saving file to local disk fallback.');
    }

    // Fallback: Local disk storage
    return saveToLocalDisk(buffer, options);
};

/**
 * Delete image from Cloudinary or local disk
 * @param {string} imageUrl - Full image URL
 */
export const deleteImage = async (imageUrl) => {
    if (!imageUrl || typeof imageUrl !== 'string') return;

    // Check if Cloudinary URL
    if (imageUrl.includes('cloudinary.com')) {
        try {
            configureCloudinary();
            // Extract public_id: e.g. aussiesmartenergy/projects/filename
            const parts = imageUrl.split('/upload/');
            if (parts.length > 1) {
                const subParts = parts[1].replace(/^v\d+\//, ''); // remove version e.g. v1712345/
                const publicId = subParts.substring(0, subParts.lastIndexOf('.')) || subParts;
                await cloudinary.uploader.destroy(publicId);
            }
        } catch (err) {
            console.error('[Cloudinary] Failed to delete image from Cloudinary:', err.message);
        }
        return;
    }

    // Local disk deletion fallback
    try {
        const uploadIdx = imageUrl.indexOf('/uploads/');
        if (uploadIdx !== -1) {
            const relPath = imageUrl.substring(uploadIdx + '/uploads/'.length);
            const baseUploadsDir = getUploadsDir();
            const localFile = path.join(baseUploadsDir, relPath);
            if (fs.existsSync(localFile)) {
                fs.unlinkSync(localFile);
            }
        }
    } catch (err) {
        console.error('[Storage] Local file deletion error:', err.message);
    }
};

export default cloudinary;
