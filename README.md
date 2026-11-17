# OVHcloud x Elastic Meetup: Slide Deck

Slides for the Elastic meetup #104 hosted with OVHcloud. The talk covers custom Elastic integrations for a vendor platform: eleven OVHcloud integrations, how they are built with `elastic-package` and an AI agent, and a live demo.

The deck is built with [fslides](https://fslides.dev): each slide is a plain HTML file on a fixed 1280×720 canvas, in the `elastic-web` style.

## Talk outline

The slide order is defined in `fslides.config.js` (25 slides).

| Part | Topic |
|------|-------|
| Intro | Title, speakers (Frederic, Aurelie), agenda |
| 1. Fragmented | Eleven stops: an SRE hunting through separate OVHcloud consoles and APIs |
| 2. Concept | Collect / Schema / Value, the Elastic Agent, "same fields" on one timeline |
| 3. Building | Build steps with `elastic-package` QA, an AI agent builds an integration, the OVH Terraform provider, DevRel cameo |
| 4. Tour | Eleven integrations, with the Kubernetes and FinOps dashboards |
| 5. Live demo | Break it on purpose, one Fleet and one happy SRE, AI Endpoint reveal |
| Close | Three takeaways, resources, the ask, thank you, hands-on event invitation |

Speaker notes for each slide are in `notes.json`. Many are marked `DRAFT`.

## Repository layout

```
.
├── README.md
├── meetup-slides/               # The deck (run all commands from here)
│   ├── fslides.config.js        # Slide order and labels (the source of truth)
│   ├── notes.json               # Speaker notes, keyed by slide filename
│   ├── package.json             # fslides scripts
│   ├── slides/                  # One HTML file per slide (25)
│   │   └── assets/              # Shared deck.css, people.css/js, scenes.js, img/
│   ├── ovh-elastic-meetup-export-2026-11-18.html   # Single-file export
│   └── generate_slides.py.truncated                # Old slide generator (see Notes)
```

Every file in `slides/` is in `fslides.config.js`. Alternate and earlier slide versions were moved out of the repository.

## Usage

Requires Node.js.

```bash
cd meetup-slides
npm install
npm run serve    # live-reload editing and presenter mode
npm run build    # static site into _site/
npm run pdf      # export to PDF
npm run gif      # export to GIF
```

## Notes

- **Placeholders:** some slides contain placeholders, such as the DevRel speaker name and an illustrative Terraform snippet. Check the speaker notes before presenting.
- **Screenshots:** `assets/img/finops.png` is a real screenshot of the `ovh_billing` dashboard. Check it for real spend figures before sharing the deck outside the room.
- **Generator:** `generate_slides.py.truncated` is a truncated copy of an earlier script that generated the slides. It is no longer the source. The slides are now edited directly as HTML, so don't rely on regenerating them.
