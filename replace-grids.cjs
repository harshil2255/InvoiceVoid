const fs = require('fs');
const path = require('path');
const components = ['Hero', 'Features', 'EstimatesSection', 'ExpensesSection', 'InvoicingSection', 'ReportsSection', 'StatsBanner', 'TestimonialsSection', 'Footer', 'ContactSection', 'Contact'];
components.forEach(c => {
  let file = path.join('src', 'components', c + '.jsx');
  if (!fs.existsSync(file)) file = path.join('src', 'pages', c + '.jsx');
  if (fs.existsSync(file)) {
    let text = fs.readFileSync(file, 'utf8');
    text = text.replace(/gridTemplateColumns: '1fr 1fr', gap: '4rem'/g, 'gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 350px), 1fr))", gap: "4rem"');
    text = text.replace(/gridTemplateColumns: '1fr 1fr', gap: '0\.5rem'/g, 'gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 350px), 1fr))", gap: "0.5rem"');
    text = text.replace(/minmax\(350px/g, 'minmax(min(100%, 350px)');
    text = text.replace(/minmax\(300px/g, 'minmax(min(100%, 300px)');
    text = text.replace(/minmax\(200px/g, 'minmax(min(100%, 200px)');
    text = text.replace(/minmax\(180px/g, 'minmax(min(100%, 180px)');
    fs.writeFileSync(file, text);
    console.log("Updated", file);
  }
});
