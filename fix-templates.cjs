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
        if (dirFile.endsWith('.jsx') || dirFile.endsWith('.js')) {
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

let updatedCount = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  const original = content;
  
  // Find all instances where we accidentally replaced ${ with ₹{
  content = content.replace(/₹\{/g, '${');

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
    updatedCount++;
  }
});

console.log(`Finished updating ${updatedCount} files.`);
