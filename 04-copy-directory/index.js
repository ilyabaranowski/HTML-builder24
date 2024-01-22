const fs = require('fs');
const path = require('path');

fs.rm(path.join(__dirname, 'files-copy'), { recursive: true }, () => {});

function copyDir(from, to) {
  fs.readdir(path.join(__dirname, from), (err, data) => {
    fs.mkdir(path.join(__dirname, to), { recursive: true }, () => {});
    if (err) {
      throw err;
    }
    data.forEach((el) => {
      fs.copyFile(
        path.join(__dirname, from, el),
        path.join(__dirname, to, el),
        (err) => {
          if (err) throw err;
        },
      );
    });
  });
}

setTimeout(() => {
  copyDir('files', 'files-copy');
}, 100);
