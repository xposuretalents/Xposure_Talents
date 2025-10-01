XposureTalents - Upgraded Static Site Package
---------------------------------------------

Files:
- index.html, about.html, showcase.html, events.html, artists.html, contact.html, gallery.html
- style.css, script.js, logo.jpeg
- netlify.toml (Netlify deploy helper)
- README.txt (this file)

Highlights of upgrades:
- Refined colors and typography (Poppins + Inter via Google Fonts in HTML head)
- Animated hero glow, scroll reveal, hover effects
- Gallery page with lightbox
- Booking / Press Kit form (Netlify-ready: includes form attributes and file upload)
- Deployment instructions for GitHub Pages and Netlify included below

Netlify quick deploy:
- Drag & drop the folder in Netlify Sites dashboard OR connect a Git repo with this folder.
- Netlify supports forms and file uploads; the included form is prepared with `data-netlify="true"`.
- You may remove the demo JS form override in script.js to allow true posting behavior.

GitHub Pages:
- Create a repo, push this folder to `main` branch.
- In repo settings -> Pages, select 'main branch / root' to publish.
- For repository-based pages, assets and forms may be limited (Netlify is recommended for forms/uploads).