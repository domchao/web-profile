// Import marked library if using modules
// import { marked } from 'marked';

class MarkdownRenderer {
    constructor(options = {}) {
        // Configure marked options
        marked.setOptions({
            gfm: true, // GitHub Flavored Markdown
            breaks: true, // Convert line breaks to <br>
            headerIds: true, // Add IDs to headers for linking
            mangle: false, // Don't escape HTML
            sanitize: false, // Don't sanitize HTML (we'll do it ourselves)
            ...options
        });

        // Configure DOMPurify options
        this.purifyConfig = {
            ALLOWED_TAGS: [
                'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul', 'ol',
                'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'code', 'hr', 'br', 'div',
                'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre', 'span', 'img'
            ],
            ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class', 'id'],
            ADD_ATTR: ['target'], // Add target="_blank" to links
            FORBID_TAGS: ['style', 'script'],
            FORBID_ATTR: ['onerror', 'onload', 'onclick']
        };

        // Add default styles
        this.addDefaultStyles();
    }

    addDefaultStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .markdown-content ul,
            .markdown-content ol {
                padding-left: 2em;
                margin: 1em 0;
            }
        `;
        document.head.appendChild(style);
    }

    async renderMarkdown(markdownFile, targetElement) {
        if (!targetElement) {
            throw new Error('Target element not specified');
        }

        try {
            // Add loading state
            targetElement.innerHTML = '<div class="loading">Loading...</div>';
            targetElement.classList.add('markdown-content');

            const response = await fetch(markdownFile);
            if (!response.ok) {
                throw new Error(`Failed to load file: ${response.statusText}`);
            }

            const markdownText = await response.text();
            
            // Convert markdown to HTML
            const rawHtml = marked.parse(markdownText);
            
            // Sanitize HTML using DOMPurify
            const cleanHtml = DOMPurify.sanitize(rawHtml, this.purifyConfig);
            
            // Render the content
            targetElement.innerHTML = cleanHtml;

            // Process code blocks for syntax highlighting if Prism.js is available
            if (window.Prism) {
                targetElement.querySelectorAll('pre code').forEach((block) => {
                    Prism.highlightElement(block);
                });
            }

            // Add target="_blank" to external links
            targetElement.querySelectorAll('a[href^="http"]').forEach(link => {
                link.setAttribute('target', '_blank');
                link.setAttribute('rel', 'noopener noreferrer');
            });

        } catch (error) {
            console.error('Error rendering Markdown:', error);
            targetElement.innerHTML = `
                <div class="error">
                    Error loading Markdown content: ${error.message}
                </div>
            `;
        }
    }
}

// Usage example
document.addEventListener('DOMContentLoaded', () => {
    const contentDiv = document.getElementById('markdown-content');
    const markdownFile = contentDiv?.getAttribute('data-markdown');
    
    if (markdownFile && contentDiv) {
        const renderer = new MarkdownRenderer();
        renderer.renderMarkdown(markdownFile, contentDiv);
    }
});