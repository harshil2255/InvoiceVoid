const fs = require('fs');

// Add .invoice-paper to index.css
let css = fs.readFileSync('src/index.css', 'utf8');
if (!css.includes('.invoice-paper')) {
  css += '\n.invoice-paper {\n  padding: 4rem;\n  background-color: white;\n  color: black;\n  box-shadow: 0 20px 40px rgba(0,0,0,0.1);\n}\n@media (max-width: 768px) {\n  .invoice-paper {\n    padding: 1.5rem;\n  }\n}\n';
  fs.writeFileSync('src/index.css', css);
}

// Replace in JSX files
const files = ['src/pages/ViewInvoice.jsx', 'src/pages/CreateInvoice.jsx', 'src/pages/EditInvoice.jsx'];
for (const file of files) {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/style=\{\{\s*padding:\s*'4rem',\s*backgroundColor:\s*'white',\s*color:\s*'black',\s*boxShadow:\s*'0 20px 40px rgba\(0,0,0,0\.1\)'\s*\}\}/g, '');
    content = content.replace(/className="card"/g, 'className="card invoice-paper"');
    fs.writeFileSync(file, content);
  }
}
console.log('Done padding and flex-wrap fix');
