const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname, 'secret-folder'), (err, data) => {
  if (err) throw err;
  data.forEach((file) => {
    fs.stat(path.join(__dirname, 'secret-folder', file), (err, stat) => {
      if (err) throw err;
      if (stat.isFile()) {
        console.log(
          `${file.split('.')[0]} - ${file.split('.')[1]} - ${stat.size}b`,
        );
      }
    });
  });
});
