import Project from '../models/Project.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';
import { uploadImageBuffer, deleteImage } from '../config/cloudinary.js';

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

        let mainImage = '';
        if (req.files && req.files.mainImage && req.files.mainImage[0]) {
            mainImage = await uploadImageBuffer(req.files.mainImage[0].buffer, {
                folder: 'aussiesmartenergy/projects',
                originalname: req.files.mainImage[0].originalname,
                req,
            });
        }

        let gallery = [];
        if (req.files && req.files.gallery && req.files.gallery.length > 0) {
            gallery = await Promise.all(
                req.files.gallery.map(f =>
                    uploadImageBuffer(f.buffer, {
                        folder: 'aussiesmartenergy/projects',
                        originalname: f.originalname,
                        req,
                    })
                )
            );
        }

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

        // mainImage replacement
        if (req.files && req.files.mainImage && req.files.mainImage[0]) {
            if (project.mainImage) {
                await deleteImage(project.mainImage);
            }
            project.mainImage = await uploadImageBuffer(req.files.mainImage[0].buffer, {
                folder: 'aussiesmartenergy/projects',
                originalname: req.files.mainImage[0].originalname,
                req,
            });
        }

        // add new gallery files
        if (req.files && req.files.gallery && req.files.gallery.length > 0) {
            const newGallery = await Promise.all(
                req.files.gallery.map(f =>
                    uploadImageBuffer(f.buffer, {
                        folder: 'aussiesmartenergy/projects',
                        originalname: f.originalname,
                        req,
                    })
                )
            );
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

        // Delete cloud or local files
        if (project.mainImage) {
            await deleteImage(project.mainImage);
        }
        if (project.gallery && project.gallery.length) {
            await Promise.all(project.gallery.map(g => deleteImage(g)));
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

        const imagePath = project.gallery.find(g => g.endsWith(imageName) || g.includes(imageName));
        if (!imagePath) return errorResponse(res, 'Image not found in gallery', 404);

        // Remove from storage (Cloudinary or local)
        await deleteImage(imagePath);

        project.gallery = project.gallery.filter(g => g !== imagePath);
        await project.save();
        return successResponse(res, project, 'Gallery image removed');
    } catch (error) {
        next(error);
    }
};
