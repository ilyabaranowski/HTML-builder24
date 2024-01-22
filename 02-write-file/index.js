const fs = require('fs');
const path = require('path');
const { stdin, stdout, exit } = process;
const stream = fs.createWriteStream(path.join(__dirname, 'note.txt'));

stdout.write('Hello! Please, write something\n');

stdin.on('data', (data) => {
  if (data.toString().trim() === 'exit') {
    sayBye();
  }
  stream.write(data);
});

process.on('SIGINT', sayBye);

function sayBye() {
  stdout.write('\nHave a good day!');
  exit();
}
