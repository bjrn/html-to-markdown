const jsonfile = require('jsonfile');
const toMarkdown = require('to-markdown');

function convert(data) {
  const out = {};
  try {
    for (let key in data) {
      out[key] = toMarkdown(data[key]);
      console.log(out[key]);
    }
    return out;
  } catch (error) {
    console.error(error);
  }
  return null;
}

function convertFile(source, dest) {
  const file = dest || source.replace(/\.json$/, '-md.json');
  jsonfile.readFile(source, function(err, obj) {
    const out = convert(obj);
    jsonfile.writeFile(file, out, { spaces: 2 }, function(err) {
      if (err) console.error(err);
      else console.log('success! output written to: ' + file);
    });
  });
}

// example:
convertFile('./test/data.json', './test/data-md.json');
