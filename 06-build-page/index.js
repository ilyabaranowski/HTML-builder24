const fs = require('fs');
const path = require('path');
const { start } = require('repl');

async function directory() {
  await fs.mkdir(
    path.join(__dirname, 'project-dist'),
    { recursive: true },
    () => {},
  );
  await fs.mkdir(
    path.join(__dirname, 'project-dist', 'assets'),
    { recursive: true },
    () => {},
  );
}

function starts() {
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
                const dataBuffer = Buffer.from(content);
                fs.appendFile(
                  path.join(__dirname, 'project-dist', 'style.css'),
                  dataBuffer,
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

  function copyDir(filesPath, copiedPath) {
    fs.readdir(filesPath, { withFileTypes: true }, (err, data) => {
      if (err) {
        throw err;
      } else {
        data.forEach((el) => {
          if (el.isFile()) {
            fs.copyFile(
              path.join(filesPath, el.name),
              path.join(copiedPath, el.name),
              (err) => {
                if (err) throw err;
              },
            );
          } else if (el.isDirectory()) {
            fs.mkdir(
              copiedPath + '\\' + el.name,
              { recursive: true },
              (err) => {
                if (err) throw err;
              },
            );
            copyDir(
              path.join(filesPath, el.name),
              path.join(copiedPath, el.name),
            );
          }
        });
      }
    });
  }
  copyDir(
    path.join(__dirname, 'assets'),
    path.join(__dirname, 'project-dist') + '\\' + 'assets',
  );

  let templateTxt = '';
  fs.readFile(
    path.join(__dirname, 'template.html'),
    'utf-8',
    (err, templateData) => {
      if (err) throw err;
      templateTxt += templateData;
      fs.readdir(
        path.join(__dirname, 'components'),
        { withFileTypes: true },
        (err, files) => {
          if (err) throw err;
          files.forEach((file) => {
            if (file.isFile() && path.extname(file.name) === '.html') {
              fs.readFile(
                path.join(path.join(__dirname, 'components'), file.name),
                'utf-8',
                (err, data) => {
                  if (err) throw err;
                  const objName = '{{' + path.parse(file.name).name + '}}';
                  templateTxt = templateTxt.replace(objName, data);
                  fs.writeFile(
                    path.join(__dirname, 'project-dist', 'template.html'),
                    templateTxt,
                    (err) => {
                      if (err) throw err;
                    },
                  );
                },
              );
            }
          });
        },
      );
    },
  );
}

directory();
starts();
