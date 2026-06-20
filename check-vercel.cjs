const https = require('https');
https.get('https://cevoid.vercel.app', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const linkMatch = data.match(/href="(\/assets\/index-[^\"]+\.css)"/);
    if (linkMatch) {
      https.get('https://cevoid.vercel.app' + linkMatch[1], (res2) => {
        let cssData = '';
        res2.on('data', chunk => cssData += chunk);
        res2.on('end', () => {
          console.log('cevoid CSS has flex-wrap?', cssData.includes('flex-wrap:wrap') && cssData.includes('.header-content'));
        });
      });
    } else {
      console.log('cevoid no link match. data:', data.substring(0, 100));
    }
  });
});
