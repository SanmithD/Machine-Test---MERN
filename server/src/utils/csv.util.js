import csv from 'csv-parser';
import { createReadStream } from 'fs';
import { extname } from 'path';
import pkg from 'xlsx';

const { readFile, utils } = pkg;

export const processCSV = async (filePath) => {
  const ext = extname(filePath).toLowerCase();

  try {
    if (ext === '.csv') return await processCSVFile(filePath);
    if (['.xlsx', '.xls'].includes(ext)) return await processExcelFile(filePath);
    throw new Error('Unsupported file format');
  } catch (err) {
    console.error('CSV processing error:', err);
    throw new Error('Error processing file: ' + err.message);
  }
};

const processCSVFile = (filePath) =>
  new Promise((resolve, reject) => {
    const results = [];
    createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        const cleaned = validateAndCleanRow(row);
        if (cleaned) results.push(cleaned);
      })
      .on('end', () => resolve(results))
      .on('error', reject);
  });

const processExcelFile = (filePath) => {
  try {
    const workbook = readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = utils.sheet_to_json(sheet);

    return jsonData.map(validateAndCleanRow).filter(Boolean);
  } catch (err) {
    throw new Error('Error reading Excel file: ' + err.message);
  }
};

const validateAndCleanRow = (row) => {
  const firstName = getFieldValue(row, ['firstname', 'first_name', 'FirstName', 'First Name']);
  const phone = getFieldValue(row, ['phone', 'Phone', 'phone_number', 'Phone Number', 'mobile', 'Mobile']);
  const notes = getFieldValue(row, ['notes', 'Notes', 'note', 'Note', 'comments', 'Comments']);

  if (!firstName || !phone) return null;

  const cleanedPhone = cleanPhoneNumber(phone);
  if (!cleanedPhone) return null;

  return {
    firstName: firstName.toString().trim(),
    phone: cleanedPhone,
    notes: notes ? notes.toString().trim() : ''
  };
};

const getFieldValue = (row, names) =>
  names.find((name) => row[name] !== undefined && row[name] !== null && row[name] !== '') 
    ? row[names.find((name) => row[name] !== undefined && row[name] !== null && row[name] !== '')] 
    : null;

const cleanPhoneNumber = (phone) => {
  const cleaned = phone.toString().replace(/[^\d+]/g, '');
  if (cleaned.length < 10) return null;

  return cleaned.startsWith('+')
    ? cleaned.length >= 11 && cleaned.length <= 16
      ? cleaned
      : null
    : cleaned;
};

