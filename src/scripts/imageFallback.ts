/**
 * Handles image load errors by replacing failed images with a dynamic SVG placeholder.
 */
export const initImageFallback = () => {
    const handleImageError = (event: Event) => {
        const img = event.target as HTMLImageElement;
        if (img.dataset.fallbackApplied) return;

        const title = img.alt || "Civic Thesis";
        const seed = Array.from(title).reduce((acc, char) => (acc << 5) - acc + char.charCodeAt(0), 0);
        const colors = [
            ["#3B82F6", "#60A5FA"],
            ["#EC4899", "#F472B6"],
            ["#10B981", "#34D399"],
            ["#F59E0B", "#FBBF24"],
            ["#6366F1", "#818CF8"],
            ["#C5A059", "#D4B982"]
        ];
        const selectedColors = colors[Math.abs(seed) % colors.length];

        // Create a simple SVG data URI
        const svg = `
            <svg width="400" height="225" viewBox="0 0 400 225" xmlns="http://www.w3.org/2000/svg">
                <rect width="100%" height="100%" fill="${selectedColors[0]}" />
                <path d="M0 0l400 225M400 0L0 225" stroke="rgba(255,255,255,0.1)" stroke-width="20" />
                <text x="50%" y="50%" fill="white" font-family="sans-serif" font-weight="900" font-size="24" text-anchor="middle" dominant-baseline="middle" opacity="0.2">
                    CIVIC THESIS
                </text>
            </svg>
        `.trim().replace(/>\s+</g, '><');

        img.src = `data:image/svg+xml;base64,${btoa(svg)}`;
        img.dataset.fallbackApplied = "true";
        img.classList.add('fallback-applied');
    };

    // Attach to all current and future images
    document.addEventListener('error', (event) => {
        if (event.target instanceof HTMLImageElement) {
            handleImageError(event);
        }
    }, true);
};
