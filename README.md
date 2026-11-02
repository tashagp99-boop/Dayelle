# Harian

Personal day planner: routine, plans, calendar, notes, bucket list, money, songs, habits and health.
Data stays on each person's own phone.

## How this project fits together

| Part | What it is |
|---|---|
| `src/harian.html` | The whole app: one HTML page with its CSS and JavaScript. The same file runs on the web. |
| `scripts/build-web.js` | Wraps that page into `www/index.html` and adds Capacitor's runtime. |
| `capacitor.config.json` | App name, app id and notification icon settings. |
| `android/` | The native Android shell (a WebView) that Capacitor generated. |
| `.github/workflows/build-apk.yml` | GitHub builds the APK on every push and publishes it as the **latest** release. |

## Getting the app

Open the repository's **Releases → latest** page on your phone and download the `.apk`.
The first time, Android asks you to allow installing apps from your browser or Files app.

New versions install over the old one with the same signing key, so your data is kept.

## Reminders

Reminders are scheduled on the phone itself (no server):

- Morning briefing
- Morning and night routine, repeating every 30 minutes up to 3 times, stopping once everything is ticked
- Song practice, evening wrap, and 15 minutes before each timed plan

Times are set in the app under Settings → Reminders.
