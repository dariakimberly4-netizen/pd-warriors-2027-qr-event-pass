# PD Warriors — Get Together 2027

Offline-first staff event pass application. Hosted as static files on GitHub Pages.

## Prepare before the event
1. Open the site online on each staff device. Choose one Registration & raffle device, one Snack device, and one Lunch device. Station selection is a workflow setting, not authentication.
2. On Registration, import a Google Sheets CSV with a `Name` column. Optional `ID` values must start with `PDW27-`; optional `Mobile` column is accepted. Repeated names without IDs are treated as the same record: provide distinct IDs for different people with the same name.
3. Export a JSON roster from Registration. Import the exact same roster into both claim devices. Do not independently import CSV on each station.
4. In Reports & setup, tap Prepare offline. Reopen in airplane mode and test a practice pass, scan, and claim on the actual devices. Browser storage and camera permissions must be available. Clearing site data erases local records.
5. Open each attendee pass and save its image for sending manually by Messenger or email. Sending requires connectivity before the event; viewing a downloaded pass does not.

## During the event
- Check-in enters a participant in the raffle once. Walk-ins are checked in and entered immediately on Registration. Participants can photograph the generated QR pass.
- QR generation and decoding use bundled local libraries. Camera scanning, image scanning, and name/ID lookup are supported. Camera access needs HTTPS or localhost and browser permission.
- QR passes contain name, ID, and walk-in status, not mobile numbers. An unknown walk-in can be added on a claim station only after staff confirms verification with Registration. QR passes are not cryptographic proof of identity.
- Snack and Lunch devices record only their own assigned claims. A second claim is blocked on that device; other disconnected devices cannot enforce cross-device uniqueness. Do not use two independent devices for the same claim.
- The official raffle runs only on Registration; checked-in entrants are eligible, past winners are excluded, and draws use browser cryptographic randomness.
- Export JSON backups during the event. Manually transfer and import backups to merge station records. Same-ID name conflicts abort the whole import; claims are never cleared by import. There is no automatic cloud or local-network synchronization.
- Existing `pdw27data` local storage from the previous app is preserved. Open older checked-in entries and tap Check in & enter raffle if their raffle entry was not yet recorded.

## Data & delivery
Personal data stays in each browser until staff explicitly downloads a backup/report. No attendee data is included in the repository. The same public site URL is a staff interface; share saved pass images with attendees, not staff backups.

Local libraries: qrcode-generator 2.0.4 (MIT; license notice in source), jsQR 1.4.0 (Apache-2.0; bundled license).
