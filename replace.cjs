const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    try {
      if (fs.statSync(dirFile).isDirectory()) {
        if (!dirFile.includes('node_modules') && !dirFile.includes('.git')) {
          filelist = walkSync(dirFile, filelist);
        }
      } else {
        if (dirFile.endsWith('.jsx') || dirFile.endsWith('.js') || dirFile.endsWith('.html')) {
          filelist.push(dirFile);
        }
      }
    } catch (err) {
      // ignore
    }
  });
  return filelist;
};

const files = walkSync(path.join(__dirname, 'src'));
files.push(path.join(__dirname, 'index.html'));

let updatedCount = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  const original = content;
  
  content = content.replace(/InvoiceMan/g, 'InvoiceVoid');
  content = content.replace(/invoiceman/g, 'invoicevoid');
  content = content.replace(/\$/g, '₹');

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
    updatedCount++;
  }
});

console.log(`Finished updating ${updatedCount} files.`);
