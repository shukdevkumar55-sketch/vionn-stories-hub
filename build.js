const fs = require('fs');

const stories = [];

// Pure folder ko scan karna
fs.readdirSync('./').forEach(file => {
  // index.html ko chhod kar baaki saari html files ko scan karo
  if (file.endsWith('.html') && file !== 'index.html') {
    const content = fs.readFileSync(file, 'utf8');
    
    // Title, Image aur Category ko code ke andar se nikaalna
    const titleMatch = content.match(/<title>(.*?)<\/title>/);
    const title = titleMatch ? titleMatch[1] : file;

    const imageMatch = content.match(/<meta property="og:image" content="(.*?)"/);
    const image = imageMatch ? imageMatch[1] : '';

    const catMatch = content.match(/<meta name="category" content="(.*?)"/);
    const category = catMatch ? catMatch[1] : 'Trending';

    stories.push({ title, url: file, image, category });
  }
});

// stories.json file generate karna
fs.writeFileSync('stories.json', JSON.stringify(stories, null, 2));
console.log('VIONN Engine: stories.json has been updated!');
