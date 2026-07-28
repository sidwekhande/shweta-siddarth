# RSVP backend: Google Sheets + Apps Script

Free, no-hosting-required backend for the RSVP form. Every submission becomes a
row in a Google Sheet you own.

## 1. Create the Sheet

1. Go to [sheets.new](https://sheets.new) and create a blank spreadsheet.
2. Name it something like "Wedding RSVPs".

## 2. Add the script

1. In the Sheet, go to **Extensions → Apps Script**.
2. Delete the placeholder code and paste in the contents of `Code.gs` from this folder.
3. Save the project (any name is fine, e.g. "RSVP Backend").

## 3. Deploy as a Web App

1. Click **Deploy → New deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Set:
   - **Execute as:** Me
   - **Who has access:** Anyone
4. Click **Deploy**, then authorize the script when prompted (you'll see an
   "unverified app" warning — that's expected since it's your own script;
   click **Advanced → Go to (project name)** to proceed).
5. Copy the **Web app URL** it gives you — it looks like
   `https://script.google.com/macros/s/XXXXXXXX/exec`.

## 4. Wire it up to the site

1. In the project root, copy `.env.example` to `.env`.
2. Set `PUBLIC_GAS_URL=` to the Web app URL you copied.
3. Also add it as a repository secret/variable named `PUBLIC_GAS_URL` in
   GitHub (Settings → Secrets and variables → Actions → Variables) so the
   GitHub Actions build picks it up when deploying to Pages.

## 5. Test it

Visit the Web app URL directly in a browser — you should see
"RSVP endpoint is live." Then submit the RSVP form on your site once deployed
and confirm a new row appears in the "RSVPs" sheet tab.

## Notes

- The form submits with `mode: "no-cors"`, which is the standard workaround
  for calling Apps Script from a static site without CORS errors. The
  trade-off is the browser can't read the response, so the site shows a
  success message optimistically. If something's wrong (bad URL, script not
  deployed, revoked access), the row simply won't appear — check the Sheet
  directly if you're unsure submissions are coming through.
- If you ever edit `Code.gs` in the Apps Script editor, you need to create a
  **new deployment version** (Deploy → Manage deployments → edit → new
  version) for changes to take effect on the existing URL.
