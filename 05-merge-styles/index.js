const fs = require('fs');
const path = require('path');

fs.writeFile(
  path.join(__dirname, 'project-dist', 'bundle.css'),
  '',
  { recursive: true },
  () => {},
);
fs.readdir(path.join(__dirname, 'styles'), (err, data) => {
  if (err) throw err;
  data.forEach((el) => {
    fs.stat(path.join(__dirname, 'styles', el), (err, stat) => {
      if (err) throw err;
      if (stat.isFile() && el.split('.')[1] === 'css') {
        fs.readFile(
          path.join(__dirname, 'styles', el),
          function (err, content) {
            if (err) {
              throw err;
            } else {
              const compl = Buffer.from(content);
              fs.appendFile(
                path.join(__dirname, 'project-dist', 'bundle.css'),
                compl,
                (err) => {
                  if (err) {
                    throw err;
                  }
                },
              );
            }
          },
        );
      }
    });
  });
});
