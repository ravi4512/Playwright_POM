const Excel = require("exceljs");
const path = require("path");

const EXCEL_PATH = path.resolve(process.cwd(), "performance-results.xlsx");

async function writeToExcel(dateSheetName, sizeLabel, timings) {
  const workbook = new Excel.Workbook();
  try {
    await workbook.xlsx.readFile(EXCEL_PATH);
  } catch { }

  let sheet = workbook.getWorksheet(dateSheetName);
  if (!sheet) {
    sheet = workbook.addWorksheet(dateSheetName);
  }

  // ---------- Create header if not exists ----------
  if (!sheet.getCell("A3").value || sheet.getCell("A3").value !== "File size - Pages") {
    sheet.mergeCells("A1:M1");
    sheet.getCell("A1").value = "With ID leakers - Performance Metrics";
    sheet.getRow(1).font = { bold: true, size: 14 };
    sheet.getRow(1).alignment = { horizontal: "center" };

    sheet.getRow(3).values = [
      "File size - Pages",
      "Time taken to generate RPD - Iteration 1", "Before authentication - Iteration 1",
      "After authentication - Iteration 1", "Print - Iteration 1",

      "Time taken to generate RPD - Iteration 2", "Before authentication - Iteration 2",
      "After authentication - Iteration 2", "Print - Iteration 2",

      "Time taken to generate RPD - Iteration 3", "Before authentication - Iteration 3",
      "After authentication - Iteration 3", "Print - Iteration 3"
    ];
    sheet.getRow(3).font = { bold: true };
    sheet.views = [{ state: "frozen", ySplit: 3 }];
  }

  // ---------- Check if ANY row already exists for this sizeLabel ----------
  let labelExistsEarlier = false;
  sheet.eachRow((row) => {
    if (row.getCell(1).value === sizeLabel) {
      labelExistsEarlier = true;
    }
  });

  // ---------- Decide row to insert ----------
  let rowToUpdate = null;

  // If label exists → ALWAYS create a new row
  let insertRow = 4;
  while (sheet.getRow(insertRow).getCell(1).value) insertRow++;

  rowToUpdate = insertRow;
  sheet.getRow(rowToUpdate).getCell(1).value = sizeLabel;

  const row = sheet.getRow(rowToUpdate);

  // ---------- Determine iteration only for first occurrence ----------
  let iteration = 1;

  if (!labelExistsEarlier) {
    // First entry for this label → fill horizontally
    for (let i = 1; i <= 3; i++) {
      const colIndex = 2 + (i - 1) * 4;
      if (!row.getCell(colIndex).value) {
        iteration = i;
        break;
      }
    }
  } else {
    // Next runs always start from iteration 1
    iteration = 1;
  }

  // ---------- Fill timing values ----------
  const base = 2 + (iteration - 1) * 4;

  row.getCell(base).value = `${timings.generate}`;
  row.getCell(base + 1).value = `${timings.beforeAuth}`;
  row.getCell(base + 2).value = `${timings.afterAuth}`;
  row.getCell(base + 3).value = timings.print
    ? `${timings.print}`
    : "Print popup not opened";

  // ---------- Autofit all columns ----------
  sheet.columns.forEach(col => {
    let max = 12;
    col.eachCell(cell => max = Math.max(max, cell.value ? cell.value.toString().length : 0));
    col.width = max + 2;
  });

  await workbook.xlsx.writeFile(EXCEL_PATH);
}

module.exports = { writeToExcel };
