const SHEET_NAME = 'RSVPs';
const HEADERS = ['Timestamp', 'Name', 'Guests', 'Mehendi', 'Ceremony', 'Reception', 'Message'];

function getSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
  }
  return sheet;
}

function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const sheet = getSheet_();

  sheet.appendRow([
    new Date(),
    data.name || '',
    data.guests || 1,
    data.mehendi || 'No',
    data.ceremony || 'No',
    data.reception || 'No',
    data.message || '',
  ]);

  return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(
    ContentService.MimeType.JSON
  );
}

function doGet(e) {
  return ContentService.createTextOutput('RSVP endpoint is live.');
}
