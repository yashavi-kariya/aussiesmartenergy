/**
 * Utility to safely resolve uploaded media URLs from the backend.
 * Handles full URLs (localhost or production domain), relative /uploads paths,
 * and ensures images are always requested from the active backend server.
 */
export const getImageUrl = (url) => {
    if (!url || typeof url !== 'string') return '';
    if (url.startsWith('data:') || url.startsWith('blob:')) return url;

    // Extract the /uploads/... relative path if present
    const uploadIdx = url.indexOf('/uploads/');
    if (uploadIdx !== -1) {
        const relativePath = url.substring(uploadIdx);
        const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        const backendOrigin = apiBase.replace(/\/api\/?$/, '');
        return `${backendOrigin}${relativePath}`;
    }

    return url;
};

export default getImageUrl;
