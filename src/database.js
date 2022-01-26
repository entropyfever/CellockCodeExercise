const sqlite3 = require('sqlite3').verbose();
const buildSchemas = require('./schemas');

const initDatabase = () => new Promise((resolve, reject) => {
  const db = new sqlite3.Database(':memory:', (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      reject(err);
    } else {
      console.log('Connected to the SQLite database.')
      console.log('Build schemas ...');
      resolve(buildSchemas(db));
    }
  });
})

const once = (fn) => {
  let result;
  let justOnce = false;

  return () => {
    if (justOnce){
      return result;
    }
    justOnce = true;
    console.log('@@');
    result = fn();
    return result;
  }
}


module.exports = once(initDatabase);
