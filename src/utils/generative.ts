/**
 * Generative Art Engine for Civic Thesis
 * Provides deterministic geometric patterns and color themes based on metadata.
 */

export interface GenerativeConfig {
    seed: number;
    title: string;
    category?: string;
    tags?: string[];
    theme?: 'light' | 'dark' | 'auto';
}

// Deterministic Pseudo-Random Number Generator (Lcg)
class PRNG {
    private state: number;
    constructor(seed: number) {
        this.state = seed || 1;
    }
    next() {
        this.state = (this.state * 1664525 + 1013904223) % 4294967296;
        return this.state / 4294967296;
    }
    nextRange(min: number, max: number) {
        return min + this.next() * (max - min);
    }
    nextInt(min: number, max: number) {
        return Math.floor(this.nextRange(min, max));
    }
    shuffle<T>(array: T[]): T[] {
        const result = [...array];
        for (let i = result.length - 1; i > 0; i--) {
            const j = this.nextInt(0, i + 1);
            [result[i], result[j]] = [result[j], result[i]];
        }
        return result;
    }
}

export const hashString = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) - hash + str.charCodeAt(i);
        hash |= 0;
    }
    return Math.abs(hash);
};

export const getCategoryTheme = (category?: string) => {
    const cat = category?.toLowerCase() || 'default';

    const themes: Record<string, { colors: string[], patterns: string[], objects: string[] }> = {
        education: {
            colors: ["#3B82F6", "#1E40AF", "#60A5FA", "#93C5FD"],
            patterns: ["technical-grid", "blueprint"],
            objects: ["isometric-cube", "node-network"],
        },
        fiction: {
            colors: ["#EC4899", "#831843", "#F472B6", "#FBCFE8"],
            patterns: ["curved-flow", "nebula"],
            objects: ["floating-sphere", "curved-ribbon"],
        },
        politics: {
            colors: ["#EF4444", "#111827", "#D1D5DB", "#B91C1C"],
            patterns: ["bauhaus-rects", "diagonal-split", "brutalist"],
            objects: ["isometric-cube", "stark-monolith"],
        },
        stats: {
            colors: ["#10B981", "#064E3B", "#D1FAE5", "#059669"],
            patterns: ["histogram-bars", "bell-curves"],
            objects: ["node-network", "data-pillar"],
        },
        default: {
            colors: ["#6366F1", "#312E81", "#EEF2FF", "#818CF8"],
            patterns: ["geometric-mix", "triangles", "mondrian"],
            objects: ["isometric-cube", "floating-sphere"],
        }
    };

    return themes[cat] || themes.default;
};

/**
 * Generates path data for an isometric cube
 */
export const getIsometricCube = (x: number, y: number, size: number) => {
    const s = size;
    const h = s * 0.866; // height adjustment for isometry

    // Top face
    const top = `M ${x} ${y} L ${x + s} ${y - h / 2} L ${x + 2 * s} ${y} L ${x + s} ${y + h / 2} Z`;
    // Left face
    const left = `M ${x} ${y} L ${x + s} ${y + h / 2} L ${x + s} ${y + h / 2 + s} L ${x} ${y + s} Z`;
    // Right face
    const right = `M ${x + s} ${y + h / 2} L ${x + 2 * s} ${y} L ${x + 2 * s} ${y + s} L ${x + s} ${y + h / 2 + s} Z`;

    return { top, left, right };
};

export const splitRects = (rng: PRNG, width: number, height: number, depth: number) => {
    let rects = [{ x: 0, y: 0, w: width, h: height }];

    for (let i = 0; i < depth; i++) {
        const nextRects: typeof rects = [];
        for (const r of rects) {
            if (r.w > 40 && r.h > 40 && rng.next() > 0.3) {
                const splitVert = r.w > r.h;
                if (splitVert) {
                    const splitX = rng.nextInt(r.w * 0.3, r.w * 0.7);
                    nextRects.push({ x: r.x, y: r.y, w: splitX, h: r.h });
                    nextRects.push({ x: r.x + splitX, y: r.y, w: r.w - splitX, h: r.h });
                } else {
                    const splitY = rng.nextInt(r.h * 0.3, r.h * 0.7);
                    nextRects.push({ x: r.x, y: r.y, w: r.w, h: splitY });
                    nextRects.push({ x: r.x, y: r.y + splitY, w: r.w, h: r.h - splitY });
                }
            } else {
                nextRects.push(r);
            }
        }
        rects = nextRects;
    }
    return rects;
};

export const generateVisuals = (config: GenerativeConfig) => {
    const rng = new PRNG(config.seed);
    const theme = getCategoryTheme(config.category);
    const palette = rng.shuffle(theme.colors);

    // Determine complexity based on title length and tags
    const complexity = (config.tags?.length || 0) + Math.min(config.title.length / 10, 5);

    // Pick patterns and objects
    const pattern = theme.patterns[rng.nextInt(0, theme.patterns.length)];
    const objectType = theme.objects[rng.nextInt(0, theme.objects.length)];

    // Generate random objects
    const objects = Array.from({ length: rng.nextInt(3, 3 + Math.floor(complexity)) }).map(() => {
        const x = rng.nextInt(20, 350);
        const y = rng.nextInt(20, 180);
        const size = rng.nextInt(20, 60);
        const type = rng.next() > 0.5 ? objectType : theme.objects[rng.nextInt(0, theme.objects.length)];

        return {
            x, y, size, type,
            rotation: rng.nextInt(0, 360),
            opacity: rng.nextRange(0.1, 0.4),
            parallax: rng.nextRange(0.5, 1.5)
        };
    });

    return {
        palette,
        pattern,
        objects,
        rng,
        id: config.seed,
        complexity
    };
};
