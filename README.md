# MODDED BY ASPEN — joke hacked website (v2)

An absurd fake hacked website with fast in-page alert windows, a continuously repeating yellow scrolling marquee, Matrix effects, a custom monkey background, and 20 overlapping loops of your audio file. It doesn't hack anything or open real browser/system warning dialogs.

## Files

```
modded-by-aspen/
├── index.html
├── style.css
├── script.js
├── images/
│   └── background.png
└── audio/
    ├── README.txt
    └── audio.mp3        <-- add this MP3 yourself
```

## Deploy to GitHub + Vercel

1. Upload **the contents** of this folder to the root of your GitHub repo, where `index.html` is at the top level.
2. Add your own MP3 at `audio/audio.mp3` and commit it. The soundtrack is not included in the ZIP.
3. In Vercel, import the GitHub repo as a new project.
4. Use Framework Preset **Other**, with no build command, then click Deploy.

## Changes in v2

- Popups spawn every **220 ms on desktop**, **320 ms on mobile** (instead of 720/1150 ms). There is a bounded window count to avoid indefinitely growing DOM usage.
- The Aspen Control Center, audio button/slider, Stop Effects button, and keyboard calm/restart shortcuts have been removed.
- The top yellow marquee is duplicated at runtime and animated by the exact measured segment width, so it loops without jumping or leaving a gap.
- Sound is enabled *by default in the site's code*. It attempts to autoplay on loading. **Browsers usually block unmuted autoplay**; if that happens, the first click/tap/keypress anywhere automatically enables it. A website cannot bypass the user's browser autoplay settings. Place the MP3 in the `audio` folder for it to work.
- All 20 layers loop with 0.1 seconds between their scheduled starts, with a compressor and reduced per-layer volume.

No external libraries, APIs, or dependencies.
