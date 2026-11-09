# MODDED BY ASPEN — joke hacked website (v4)

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

## Changes in v4

- The first screen is now solid black, with only **Click Screen For a Surprise!** centered on it.
- Clicking/tapping anywhere reveals the entire joke website, begins the popup spam, and starts the 20-layer audio soundtrack with a 5-second stagger. The soundtrack is preloaded while the black screen is displayed. A real user click enables playback under modern browser policies.

## Previous features

- Audio uses **100% master output gain**, and every one of the **20 looping layers** feeds the compressor at full input gain. Strong compression helps contain the extreme overlapping peaks; the playback is intentionally loud, so listeners should keep their device volume low.
- Every audio layer is now scheduled **5 seconds** after the previous layer (0, 5, 10 ... 95 seconds), rather than 0.1 seconds apart. Each layer loops continuously after starting.
- The audio starts when the visitor clicks the black intro screen, using that genuine browser interaction to unlock sound. The site does not attempt sound playback before the click.
- Popups still spawn every **220 ms on desktop** and **320 ms on mobile**, with a limit to keep the page responsive.
- No Aspen Control Center, Stop Effects button, volume slider, or audio button.
- The yellow banner scrolls in a seamless infinite loop.

## Note

This is a joke page. Its fake alerts appear only *inside* the page, and it does not actually hack or modify devices. No external libraries, APIs, or dependencies.
