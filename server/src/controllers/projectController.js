import fs from 'fs';
import path from 'path';
import Project from '../models/Project.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';

const makeSlug = async (name) => {
    const base = name.toString().toLowerCase().trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
    let slug = base;
    let counter = 1;
    while (await Project.findOne({ slug })) {
        slug = `${base}-${counter}`;
        counter += 1;
    }
    return slug;
};

export const createProject = async (req, res, next) => {
    try {
        const { name, shortDescription, longDescription } = req.body;
        if (!name) return errorResponse(res, 'Project name is required', 400);

        const slug = await makeSlug(name);

        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const mainImage = req.files && req.files.mainImage && req.files.mainImage[0]
            ? `${baseUrl}/uploads/projects/${req.files.mainImage[0].filename}`
            : '';

        const gallery = (req.files && req.files.gallery)
            ? req.files.gallery.map(f => `${baseUrl}/uploads/projects/${f.filename}`)
            : [];

        // New projects should be on top — use auto-increment integer (LIFO: sort DESC)
        const lastProject = await Project.findOne({}).sort({ displayOrder: -1 }).select('displayOrder');
        const displayOrder = lastProject ? lastProject.displayOrder + 1 : 1;

        const project = await Project.create({ name, shortDescription, longDescription, mainImage, gallery, slug, displayOrder });
        return successResponse(res, project, 'Project created', 201);
    } catch (error) {
        next(error);
    }
};

export const getAllProjects = async (req, res, next) => {
    try {
        const { status } = req.query;
        let query = {};
        if (status === 'deleted_from_admin' || status === 'deleted') {
            query = { deletedFromAdmin: true };
        } else if (status === 'all') {
            query = {};
        } else {
            // Default: active projects only
            query = { deletedFromAdmin: { $ne: true } };
        }

        const projects = await Project.find(query).sort({ displayOrder: -1, createdAt: -1 });
        return successResponse(res, projects, 'Projects retrieved');
    } catch (error) {
        next(error);
    }
};

export const getProjectBySlug = async (req, res, next) => {
    try {
        const project = await Project.findOne({ slug: req.params.slug });
        if (!project) return errorResponse(res, 'Project not found', 404);
        return successResponse(res, project, 'Project retrieved');
    } catch (error) {
        next(error);
    }
};

export const updateProject = async (req, res, next) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return errorResponse(res, 'Project not found', 404);

        const { name, shortDescription, longDescription } = req.body;
        if (name && name !== project.name) {
            // update slug only if name changed and not colliding
            project.slug = await makeSlug(name);
        }
        if (shortDescription !== undefined) project.shortDescription = shortDescription;
        if (longDescription !== undefined) project.longDescription = longDescription;

        const baseUploadsDir = process.cwd().endsWith('server')
            ? path.join(process.cwd(), 'uploads')
            : path.join(process.cwd(), 'server', 'uploads');

        // mainImage replacement
        if (req.files && req.files.mainImage && req.files.mainImage[0]) {
            // delete old mainImage file if present
            if (project.mainImage) {
                const parts = project.mainImage.split('/uploads/projects/');
                if (parts.length > 1) {
                    const oldPath = path.join(baseUploadsDir, 'projects', parts[1]);
                    try { if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath); } catch (e) { }
                }
            }
            project.mainImage = `${req.protocol}://${req.get('host')}/uploads/projects/${req.files.mainImage[0].filename}`;
        }

        // add new gallery files
        if (req.files && req.files.gallery) {
            const newGallery = req.files.gallery.map(f => `${req.protocol}://${req.get('host')}/uploads/projects/${f.filename}`);
            project.gallery = project.gallery.concat(newGallery);
        }

        await project.save();
        return successResponse(res, project, 'Project updated');
    } catch (error) {
        next(error);
    }
};

export const deleteProject = async (req, res, next) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return errorResponse(res, 'Project not found', 404);

        const mode = req.query.mode || req.body?.mode || 'both';

        if (mode === 'admin_only') {
            project.deletedFromAdmin = true;
            await project.save();
            return successResponse(res, project, 'Project deleted from admin only');
        }

        // delete files
        const baseUploadsDir = process.cwd().endsWith('server')
            ? path.join(process.cwd(), 'uploads')
            : path.join(process.cwd(), 'server', 'uploads');

        if (project.mainImage) {
            const parts = project.mainImage.split('/uploads/projects/');
            if (parts.length > 1) {
                const oldPath = path.join(baseUploadsDir, 'projects', parts[1]);
                try { if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath); } catch (e) { }
            }
        }
        if (project.gallery && project.gallery.length) {
            for (const g of project.gallery) {
                const parts = g.split('/uploads/projects/');
                if (parts.length > 1) {
                    const pth = path.join(baseUploadsDir, 'projects', parts[1]);
                    try { if (fs.existsSync(pth)) fs.unlinkSync(pth); } catch (e) { }
                }
            }
        }

        await Project.findByIdAndDelete(req.params.id);
        return successResponse(res, null, 'Project permanently deleted from admin and database');
    } catch (error) {
        next(error);
    }
};

export const restoreProject = async (req, res, next) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return errorResponse(res, 'Project not found', 404);

        project.deletedFromAdmin = false;
        await project.save();
        return successResponse(res, project, 'Project restored to admin');
    } catch (error) {
        next(error);
    }
};

export const deleteGalleryImage = async (req, res, next) => {
    try {
        const { id, imageName } = req.params;
        const project = await Project.findById(id);
        if (!project) return errorResponse(res, 'Project not found', 404);

        const imagePath = project.gallery.find(g => g.endsWith(imageName));
        if (!imagePath) return errorResponse(res, 'Image not found in gallery', 404);

        // remove file
        const baseUploadsDir = process.cwd().endsWith('server')
            ? path.join(process.cwd(), 'uploads')
            : path.join(process.cwd(), 'server', 'uploads');
        const parts = imagePath.split('/uploads/projects/');
        if (parts.length > 1) {
            const pth = path.join(baseUploadsDir, 'projects', parts[1]);
            try { if (fs.existsSync(pth)) fs.unlinkSync(pth); } catch (e) { }
        }

        project.gallery = project.gallery.filter(g => g !== imagePath);
        await project.save();
        return successResponse(res, project, 'Gallery image removed');
    } catch (error) {
        next(error);
    }
};
