export function formatDate(date: Date): string {
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

/**
 * Returns the image URL or a fallback placeholder if the image is missing
 * @param image - The image URL or undefined
 * @param fallback - Optional custom fallback URL
 * @returns The image URL or fallback
 */
export function getImageWithFallback(
    image: string | undefined,
    fallback: string = "/images/placeholder.jpg"
): string {
    return image || fallback;
}
