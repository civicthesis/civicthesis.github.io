import { hashString, generateVisuals, getIsometricCube } from "../utils/generative";

/**
 * Handles image load errors by replacing failed images with a premium V3 generative SVG.
 */
export const initImageFallback = () => {
    const handleImageError = (img: HTMLImageElement) => {
        if (img.dataset.fallbackApplied) return;

        const title = img.alt || "Civic Thesis";
        const category = img.dataset.category || "default";
        const tags = img.dataset.tags ? img.dataset.tags.split(',') : [];

        const seed = hashString(title + category);
        const { palette, pattern, objects, id } = generateVisuals({ seed, title, category, tags });

        const color1 = palette[0];
        const color2 = palette[1];
        const colorAccent = palette[2] || palette[0];
        const prefix = `rv3-${seed.toString(36)}`;

        // Generate 3D Objects as internal SVG string
        const renderObjects = objects.map((obj: any, i: number) => {
            const delay = i * 0.5;
            let content = '';

            if (obj.type === "isometric-cube") {
                const c = getIsometricCube(-25, -25, 25);
                content = `
                    <g filter="url(#${prefix}-inner-shadow)">
                        <path d="${c.top}" fill="white" fill-opacity="0.3" />
                        <path d="${c.left}" fill="white" fill-opacity="0.1" />
                        <path d="${c.right}" fill="white" fill-opacity="0.2" />
                    </g>
                `;
            } else if (obj.type === "floating-sphere") {
                content = `
                    <circle r="25" fill="url(#${prefix}-sphere-grad)" stroke="white" stroke-opacity="0.2" filter="url(#${prefix}-bloom)" />
                `;
            } else {
                content = `
                    <g stroke="white" stroke-width="0.5" stroke-opacity="0.5">
                        <line x1="-20" y1="-20" x2="20" y2="20" />
                        <circle cx="-20" cy="-20" r="3" fill="white" />
                        <circle cx="20" cy="20" r="3" fill="white" />
                    </g>
                `;
            }

            return `
                <g class="float" transform="translate(${obj.x}, ${obj.y}) rotate(${obj.rotation}) scale(${obj.size / 50})" opacity="${obj.opacity}" style="animation-delay: ${delay}s; --parallax: ${obj.parallax}">
                    ${content}
                </g>
            `;
        }).join('');

        const svg = `
            <svg width="400" height="225" viewBox="0 0 400 225" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
                <style>
                    .float { animation: f 6s ease-in-out infinite alternate; }
                    @keyframes f { 
                        0% { transform: translate(0, 0) rotate(0deg); } 
                        100% { transform: translate(calc(10px * var(--parallax)), calc(15px * var(--parallax))) rotate(5deg); } 
                    }
                    .text { font-family: sans-serif; font-weight: 900; letter-spacing: 0.1em; }
                </style>
                
                <filter id="${prefix}-noise">
                    <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" />
                    <feColorMatrix type="saturate" values="0" />
                    <feComponentTransfer><feFuncA type="linear" slope="0.08" /></feComponentTransfer>
                    <feBlend mode="overlay" in2="SourceGraphic" />
                </filter>
                
                <filter id="${prefix}-bloom" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="b" /><feComposite in="b" in2="SourceGraphic" operator="over" />
                </filter>

                <filter id="${prefix}-inner-shadow">
                    <feOffset dx="0" dy="2" /><feGaussianBlur stdDeviation="2" result="ob" />
                    <feComposite operator="out" in="SourceGraphic" in2="ob" result="inv" />
                    <feFlood flood-color="black" flood-opacity="0.2" /><feComposite operator="in" in2="inv" />
                    <feComposite operator="over" in2="SourceGraphic" />
                </filter>

                <defs>
                    <linearGradient id="${prefix}-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="${color1}" />
                        <stop offset="100%" stop-color="${color2}" />
                    </linearGradient>
                    <radialGradient id="${prefix}-sphere-grad">
                        <stop offset="0%" stop-color="white" stop-opacity="0.4" />
                        <stop offset="100%" stop-color="white" stop-opacity="0.05" />
                    </radialGradient>
                </defs>

                <rect width="100%" height="100%" fill="url(#${prefix}-grad)" />
                <rect width="100%" height="100%" fill="white" fill-opacity="0.05" filter="url(#${prefix}-noise)" />
                
                <g class="objects">${renderObjects}</g>

                <text x="380" y="205" text-anchor="end" class="text" fill="white" fill-opacity="0.3" font-size="12">
                    ${category.toUpperCase()}
                </text>
                
                <text x="20" y="40" class="text" fill="white" fill-opacity="0.1" font-size="24">
                    ${title.slice(0, 15).toUpperCase()}
                </text>
            </svg>
        `.trim().replace(/>\s+</g, '><');

        img.src = `data:image/svg+xml;base64,${btoa(svg)}`;
        img.dataset.fallbackApplied = "true";
        img.classList.add('fallback-applied');
    };

    window.addEventListener('error', (event) => {
        if (event.target instanceof HTMLImageElement) handleImageError(event.target);
    }, true);

    const check = () => {
        document.querySelectorAll('img').forEach(img => {
            if (img.complete && img.naturalHeight === 0 && img.src) handleImageError(img);
        });
    };

    check();
    setTimeout(check, 1000);
    setTimeout(check, 3000);
};
