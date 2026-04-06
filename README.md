# 🧩 Meme Sorter

**An interactive sorting algorithm visualizer — but make it memes.**

🔗 **[Live Demo → meme-sorter.vercel.app](https://meme-sorter.vercel.app)**

---

## What is it?

Meme Sorter is a browser-based visualizer that teaches sorting algorithms by scrambling a meme image into tiles and watching an algorithm put it back together — one swap at a time. Instead of boring bars and numbers, you get a chaotic meme getting progressively less chaotic. Learning has never been this unhinged.

---

## Features

- **5 sorting algorithms** — Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, and Quick Sort
- **Meme-tile visualization** — the image is scrambled into a grid; each tile swap is animated in real time
- **Code view** — see the algorithm's source code highlighted as it runs
- **Flowchart view** — switch to a visual flowchart of the algorithm's logic
- **Live metrics** — tracks comparisons, swaps, time complexity, and space complexity as you go
- **Step mode** — advance one step at a time to really understand what's happening
- **Speed control** — slide from slow-motion to blazing fast
- **Sound toggle** — mute if you need to pretend you're doing real work
- **Celebration screen** — confetti and a bonus meme when sorting completes
- **Animated landing page** — "Ready… Set… GO!" because drama matters

---

## Algorithms Included

| Algorithm | Time Complexity | Space Complexity |
|---|---|---|
| Bubble Sort | O(n²) | O(1) |
| Selection Sort | O(n²) | O(1) |
| Insertion Sort | O(n²) | O(1) |
| Merge Sort | O(n log n) | O(n) |
| Quick Sort | O(n log n) avg | O(log n) |

---

## Tech Stack

- **HTML** — structure
- **CSS** — styling, animations, mesh gradients
- **JavaScript** — sorting logic, visualization engine, sound, confetti
- **Vercel** — deployment
- **Google Fonts** — Inter + JetBrains Mono

No frameworks. No build tools. Just vibes and vanilla JS.

---

## Getting Started

Clone the repo and open `index.html` in your browser — that's it. No installs, no dependencies.

```bash
git clone https://github.com/Lebronmeow/meme-sorter.git
cd meme-sorter
open index.html
```

Or just visit the [live site](https://meme-sorter.vercel.app).

---

## How to Use

1. Hit **GO!** on the landing screen to enter the app
2. Choose a **sorting algorithm** from the dropdown
3. Click **Scramble** to shuffle the meme tiles
4. Hit **Play** to watch the algorithm sort, or use **Step** to go one move at a time
5. Adjust the **Speed** slider to your taste
6. Switch between **Code** and **Flow** tabs to follow along with the logic
7. Watch the metrics update live — comparisons, swaps, complexities
8. Celebrate when the meme is reassembled 🎉

---

## Project Structure

```
meme-sorter/
├── index.html   # App structure and layout
├── style.css    # All styling and animations
└── script.js    # Sorting algorithms and visualization logic
```

---

## License

Do whatever you want with it. It's memes.
