export function insertAd(proseSelector: string, adContainerId: string) {
    const prose = document.querySelector(proseSelector);
    const adPlaceholder = document.getElementById(adContainerId);

    // adPlaceholder might be the ad itself if not wrapped, but usually in Astro slots it's a wrapper
    // Based on previous implementation: adPlaceholder is a hidden div wrapping the component
    const adContent = adPlaceholder?.firstElementChild;

    if (!prose || !adPlaceholder || !adContent) return;

    const headings = prose.querySelectorAll('h2, h3');

    // Priority 1: Before 2nd Heading (typically separating intro/first section from second)
    if (headings.length >= 3) {
        headings[2].insertAdjacentElement('beforebegin', adContent);
        return;
    }

    // Priority 2: Before 1st Heading (if only one section)
    if (headings.length >= 1) {
        headings[0].insertAdjacentElement('beforebegin', adContent);
        return;
    }

    // Priority 3: Paragraph based fallback
    const paragraphs = prose.querySelectorAll('p');

    // Before 3rd paragraph (approx mid-intro)
    if (paragraphs.length >= 3) {
        paragraphs[2].insertAdjacentElement('beforebegin', adContent);
    }
    // After 2nd paragraph
    else if (paragraphs.length >= 2) {
        paragraphs[1].insertAdjacentElement('afterend', adContent);
    }
    // After 1st paragraph
    else if (paragraphs.length >= 1) {
        paragraphs[0].insertAdjacentElement('afterend', adContent);
    }
    // End of content
    else {
        prose.appendChild(adContent);
    }
}
