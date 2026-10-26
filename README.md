# NOTEPANS tester site

A free, static website (plain HTML/CSS/JS, no build step, no tracking) for recruiting Google Play closed testers.
Designed from your app's own look: graphite + brass, IBM Plex fonts, sharp 4px corners, and the app's ten themes.

```
index.html        Landing page (hero, features, screens, privacy, themes, FAQ)
test.html         Tester signup page: the 3 steps + keep-it-14-days checklist + fixes
privacy.html      Privacy policy (adapted from your existing one)
terms.html        Terms of use
delete-data.html  How to delete data
config.js         ★ THE FILE YOU EDIT: email, group link, numbers, screenshots, video
css/style.css     All colours (top "THEME TOKENS" block) and layout
js/               theme.js + site.js (fills links from config.js; no need to touch)
assets/           icon, favicon, og.png (Facebook preview image), fonts
```

---

## 1. Fill in `config.js` (5 minutes)

Open `config.js`. A yellow "Setup needed" bar shows on the site until these are done.

| Setting | What to put |
|---|---|
| `contactEmail` | Your public contact email. Shown in footers and the privacy policy. |
| `groupUrl` | Your Google Group link, e.g. `https://groups.google.com/g/notepans-testers`. **Using an email list in Play Console instead?** Set it to `""` and step 1 automatically becomes "Send me your Gmail". |
| `optInUrl`, `playUrl` | Already built from `com.mpsparki012.snap`. Only change if Play gives you a different opt-in link. |
| `testersNeeded`, `daysNeeded` | 12 and 14 (Google's current rule). Change if it changes. |
| `status` | `"testing"` now. Change to `"live"` after launch and every button turns into **Get it on Google Play**. |
| `screenshots` | See section 3. |
| `videoUrl` | Optional YouTube link. A video section appears when filled. |

### Creating the Google Group (if you use one)
1. Go to groups.google.com → **Create group** (name e.g. `notepans-testers`).
2. Settings → **Who can join: Anyone can ask / anyone can join**, and make sure non-members can find it (so a tap on "Join" works).
3. Play Console → your app → **Testing → Closed testing → Testers → Create email list / use Google Groups** → add the group's email (`notepans-testers@googlegroups.com`).
4. Same page: **Copy link** under "How testers join" → that is your `optInUrl`.

---

## 2. Put it online with GitHub Pages (free)

You don't need git on your computer.

1. On github.com → **New repository** → name it `notepans` → **Public** → Create.
2. **Add file → Upload files**: drag in *everything inside this folder* (including the `css`, `js`, `assets` folders and the hidden `.nojekyll`; if the hidden file is skipped, that's fine). Commit.
3. **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: `main` / `(root)` → Save.**
4. After about a minute your site is at **https://mpsparki012.github.io/notepans/**

**If your repo is named something other than `notepans`**, search-and-replace `mpsparki012.github.io/notepans` in `index.html` and `test.html` (the `canonical` and `og:` lines at the top). That's only for the Facebook preview; the site itself works under any name.

---

## 3. How to edit things

**Edit on GitHub directly:** open your repo, click a file, click the ✏️ pencil, change, then **Commit changes**. The site updates in about a minute. (Press `.` on the repo page for a full in-browser editor.)

| I want to… | Do this |
|---|---|
| Change text (headline, features, FAQ) | Edit `index.html` / `test.html`. It's plain readable HTML: change the words between tags. |
| Change links or the email | Only `config.js`. Never hard-code them in the HTML. |
| Use **real screenshots** | Take 3 phone screenshots, save as `.webp` or `.png`, upload to `assets/`, then in `config.js` write e.g. `home: "assets/shot-home.webp"`. Slots: `home`, `projects`, `notes`, `vault`. The drawn phone is replaced automatically. |
| Add a FAQ question | Copy a `<details>…</details>` block in `index.html` and edit it. |
| Change colours | `css/style.css` → top "THEME TOKENS" block. `--accent` is the brass colour. |
| Change the default look | In `js/theme.js` the site follows the visitor's light/dark setting. To force dark for everyone, change the line that picks `"light"` to `"dark"`. |
| Add a launch video | Paste a YouTube link into `videoUrl` in `config.js`. |
| Change the Facebook preview picture | Replace `assets/og.png` (1200×630). After posting, force Facebook to refresh at developers.facebook.com/tools/debug. |
| Hide the "Share" button | Delete the `<button … data-share>` lines. |

Preview on your own computer before uploading: open the folder in a terminal and run `python3 -m http.server 8000`, then visit http://localhost:8000 (double-clicking the file also mostly works).

---

## 4. Things to do before you promote it

- **Privacy policy URL.** Your app and Play Console currently use `https://mpsparki012.github.io/snap-privacy/`. Easiest: keep that repo and replace its `index.html` with this site's `privacy.html` content, **or** change the URL in Play Console and in `src/utils/appInfo.ts` (`PRIVACY_POLICY_URL`) and ship an app update. This site's policy page is a fuller version of the same promises. Re-read it once to confirm it's accurate for you.
- **Terms and policy are plain-English drafts**, not legal advice.
- **Test the whole flow yourself** on a phone with a *different* Google account (join group → opt in → install) before posting it to Facebook.
- Tell testers to **stay opted in for the full 14 days**; uninstalling early can reset their count.
- Post the link `…/notepans/test.html` (the tester page) in Facebook groups, not just the home page.
