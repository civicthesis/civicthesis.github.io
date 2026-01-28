// Featured content configuration for homepage
export const featuredConfig = {
    // Manually specify featured story slug, or null for auto-selection
    // When set to a slug, that story will be featured regardless of selectionStrategy
    featuredStorySlug: null as string | null, // e.g., "haryana-cet-safe-score-2026"

    // Auto-selection strategy: "newest" | "random"
    // Only used when featuredStorySlug is null
    selectionStrategy: "newest" as "newest" | "random",

    // Number of sub-featured stories (displayed in smaller cards)
    subFeaturedCount: 4,

    // Number of secondary stories (grid layout)
    secondaryCount: 3,

    // Number of horizontal stories (full-width cards)
    horizontalCount: 6,

    // Featured Categories Configuration
    categories: {
        // Manually specify which categories to feature (in order)
        // Set to null or empty array for auto-selection based on strategy
        featured: null as string[] | null, // e.g., ["Politics", "Technology", "Environment"]

        // Auto-selection strategy: "popular" | "recent" | "alphabetical"
        // "popular" - Sort by story count (most stories first)
        // "recent" - Sort by most recently updated categories
        // "alphabetical" - Sort alphabetically
        selectionStrategy: "popular" as "popular" | "recent" | "alphabetical",

        // Number of categories to display on home page
        maxDisplay: 6,

        // Show "View All Categories" link
        showViewAllLink: true,

        // Section title
        sectionTitle: "Explore Topics",

        // Categories to exclude from auto-selection (always hidden)
        exclude: [] as string[], // e.g., ["Uncategorized", "Draft"]
    },
};
