const db = require('../database');

module.exports = {
  getColors: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM colors ORDER BY colorName', (error, results) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(results);
      });
    });
  },
  getColorByHex: (hexCode) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM colors WHERE hexCode like ?', [String(hexCode)], (error, results) => {
        if (error) {
          reject(error);
          return;
        }
        if (results.length > 0) {
          resolve(results[0]);
        } else {
          resolve(false);
        }
      });
    });
  },
  createColor: (hexCode, colorName) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO colors(hexCode,colorName) VALUES(?,?)',
        [hexCode, colorName], (error, results) => {
          if (error) {
            reject(error);
            return;
          }
          resolve(results.insertId);
        });
    });
  },
  updateColor: (pKey, hexCode, colorName) => {
    return new Promise((resolve, reject) => {
      db.query('UPDATE colors SET hexCode = ?, colorName = ? WHERE pKey = ?',
        [hexCode, colorName, pKey], (error, results) => {
          if (error) {
            reject(error);
            return;
          }
          resolve(results);
        });
    });
  },
  deleteColor: (pKey) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM colors WHERE pKey = ?', [pKey], (error, results) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(results);
      });
    });
  },
}
