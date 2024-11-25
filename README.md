# web-profile

My web profile. Done as plainly as possible. An exercise for me to get more hands on with html/css, and a place for my 'blog'.

- The inspiration and styling orginated from [this repo][smol-james-repo] and [tutorial][smol-james-video]
- The timeline and other styling was inspried by [Andrej Karpathy's profile][karpathy-profile]

## Deployment

- The profile app is deployed as a 'manual deployment' on [netlify][netlify-link]. Simply upload a folder containing the required files and away we go.
- The command `make distribution` will create a folder called `output` containing the required files for the website (namely copying the `index.html`, `style.css`, and the `renderMarkdownFile.js` files, and the `assets/`, and `blog/` folders to the `output/` folder) which can then be uploaded to netlify.

<!-- Links -->
[smol-james-video]: https://www.youtube.com/watch?v=aLb_fMGZQXI&ab_channel=Smoljames
[smol-james-repo]: https://github.com/jamezmca/ultimate-web-portfolio
[karpathy-profile]: https://karpathy.ai/
[netlify-link]: https://www.netlify.com/