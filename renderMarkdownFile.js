// Function to load and render Markdown
function renderMarkdown(markdownFile) {
    const contentDiv = document.getElementById('markdown-content');

    // Fetch the Markdown file
    fetch(markdownFile)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load file: ${response.statusText}`);
            }
            return response.text();
        })
        .then(markdownText => {
            // Render the Markdown content
            contentDiv.innerHTML = marked.parse(markdownText);
        })
        .catch(error => {
            console.error('Error fetching Markdown file:', error);
            contentDiv.textContent = 'Error loading Markdown content.';
        });
}

// Load the Markdown file specified in the HTML data attribute
document.addEventListener('DOMContentLoaded', () => {
    const contentDiv = document.getElementById('markdown-content');
    const markdownFile = contentDiv.getAttribute('data-markdown');
    if (markdownFile) {
        renderMarkdown(markdownFile);
    } else {
        console.error('No Markdown file specified.');
        contentDiv.textContent = 'No Markdown file specified.';
    }
});
