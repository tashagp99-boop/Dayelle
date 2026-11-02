# Dayelle

*Your personal life journal.* Not just a diary, a beautiful archive of your life.

Journal pages with mood, best moment and gratitude; photo and video memories; plans, calendar and reminders;
self-care routine, habits, bucket list, spending, songs, health and cycle tracking.

## How this project fits together

| Part | What it is |
|---|---|
| `src/harian.html` | The whole app: one HTML page with its CSS and JavaScript. The same file runs as the web preview. |
| `scripts/build-web.js` | Wraps that page into `www/index.html`, adds Capacitor and Supabase, and bundles the fonts. |
| `capacitor.config.json` | App name, app id and notification icon settings. |
| `android/` | The native Android shell (a WebView) that Capacitor generated. |
| `.github/workflows/build-apk.yml` | GitHub builds the APK on every push and publishes it as the **latest** release. |

## Data and privacy

- Everything is saved on the phone first, so the app works without internet.
- After signing in, changes sync to a private Supabase project: `user_state` (planner data), `journal_entries`,
  `memories` and the private `memories` storage bucket. Row-level security lets each person read and write only their own rows and files.

## Getting the app

Open **Releases → latest** on your Android phone and download the `.apk`.
New versions install over the old one with the same signing key, so your data is kept.
