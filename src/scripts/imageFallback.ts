import { hashString, getCategoryTheme } from "../utils/generative";

/**
 * Handles image load errors by replacing failed images with a dynamic SVG placeholder.
 */
export const initImageFallback = () => {
    const handleImageError = (img: HTMLImageElement) => {
        if (img.dataset.fallbackApplied) return;

        const title = img.alt || "Civic Thesis";
        const seed = hashString(title);
        const theme = getCategoryTheme();
        const color1 = theme.colors[0];
        const color2 = theme.colors[1];

        // Unique ID for this specific usage to avoid any potential SVG reuse issues
        const id = Math.abs(seed).toString(36);

        const svg = `
            <svg width="400" height="225" viewBox="0 0 400 225" xmlns="http://www.w3.org/2000/svg">
                <rect width="100%" height="100%" fill="${color1}" />
                <defs>
                    <linearGradient id="g-${id}" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color: ${color1}" />
                        <stop offset="100%" style="stop-color: ${color2}" />
                    </linearGradient>
                </defs>
                <rect width="100%" height="100%" fill="url(#g-${id})" />
                <path d="M0 0l400 225M400 0L0 225" stroke="white" stroke-opacity="0.1" stroke-width="2" />
                <text x="50%" y="55%" fill="white" fill-opacity="0.2" font-family="sans-serif" font-weight="900" font-size="20" text-anchor="middle" letter-spacing="0.1em">
                    CIVIC THESIS
                </text>
            </svg>
        `.trim().replace(/>\s+</g, '><');

        img.src = `data:image/svg+xml;base64,${btoa(svg)}`;
        img.dataset.fallbackApplied = "true";
        img.classList.add('fallback-applied');
    };

    // 1. Monitor for new errors (Capturing to catch early ones)
    window.addEventListener('error', (event) => {
        if (event.target instanceof HTMLImageElement) {
            handleImageError(event.target);
        }
    }, true);

    // 2. Scan for images that already failed before script loaded
    const checkExisting = () => {
        document.querySelectorAll('img').forEach(img => {
            if (img.complete && img.naturalHeight === 0 && img.src) {
                handleImageError(img);
            }
        });
    };

    // Run immediately and after a short delay for lazy loaders
    checkExisting();
    setTimeout(checkExisting, 1000);
    setTimeout(checkExisting, 3000);
};
