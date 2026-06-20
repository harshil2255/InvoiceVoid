const fs = require('fs');
const files = [
  'src/pages/ViewInvoice.jsx',
  'src/pages/EditInvoice.jsx',
  'src/pages/CreateInvoice.jsx',
  'src/components/MultiPlatformSection.jsx',
];
files.forEach(f => {
  if (fs.existsSync(f)) {
    let content = fs.readFileSync(f, 'utf8');
    content = content.replace(/minWidth:\s*['"]600px['"]/g, `minWidth: '100%'`);
    content = content.replace(/width:\s*['"]600px['"]/g, `width: '100%', maxWidth: '600px'`);
    content = content.replace(/width:\s*['"]400px['"]/g, `width: '100%', maxWidth: '400px'`);
    content = content.replace(/width:\s*['"]300px['"]/g, `width: '100%', maxWidth: '300px'`);
    fs.writeFileSync(f, content);
    console.log('Fixed', f);
  }
});
