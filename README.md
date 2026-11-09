# MODDED BY ASPEN — fake hacked site

A joke/fictional "hacked" website with in-page fake warning windows, glitch text, Matrix rain, a custom monkey background, and optional 20-layer audio. **This website doesn't hack or access anything.**

## Folder layout

```
modded-by-aspen/
├── index.html
├── style.css
├── script.js
├── images/
│   └── background.png
└── audio/
    ├── README.txt
    └── audio.mp3        <-- ADD YOUR OWN MP3 FILE HERE
```

## Deploy to GitHub + Vercel

1. Unzip and upload the contents of the `modded-by-aspen` folder (including `index.html`) to the **root** of a new GitHub repository.
2. Put your own MP3 file into `audio/` and name it **audio.mp3**. Commit it to your repository. Note that GitHub's web interface normally handles files up to 25 MiB per upload.
3. In Vercel, select **Add New → Project → Import Git Repository**. Choose the GitHub repository.
4. Select **Framework Preset: Other**. No build command is needed. The project's root directory should contain `index.html`.
5. Click **Deploy**. Vercel will serve the static site.

## Controls

- **ENABLE AUDIO** starts 20 looping layers of `audio/audio.mp3`, with 0.1 s between the start of each layer. The sound is opt-in due to browser autoplay restrictions. It has a low per-layer volume, a compressor, and an overall slider.
- **MUTE 20X AUDIO** stops every layer.
- **UNLEASH CHAOS** starts more fake HTML alerts. Click them closed, move them by dragging the title bar, or press **ESC / CALM MODE** to stop all popups and audio.
- **SPACE** restarts visual chaos (unless a control is focused).

No dependencies, API keys, real pop-ups, redirects, downloads, or external services. The warning windows stay inside the webpage and are harmless.
