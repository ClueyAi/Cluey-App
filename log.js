const { spawn } = require('child_process');
const fs = require('fs');

const pathLogs = '.logs/';

const historyStream = fs.createWriteStream(`${pathLogs}.history`, { flags: 'a' });
const logStream = fs.createWriteStream(`${pathLogs}.log`, { flags: 'a' });
const warnStream = fs.createWriteStream(`${pathLogs}.warning`, { flags: 'a' });
const errStream = fs.createWriteStream(`${pathLogs}.error`, { flags: 'a' });

/*hooks.on('command', (command) => {
  const command = input.trim();
  if (command !== '') {
    logCommand(command);
  }
});*/

function logCommand(command) {
  const parts = command.split(' ');
  const cmd = parts.shift();
  const args = parts;

  const child = spawn(cmd, args, { stdio: 'pipe' });

  child.stdout.pipe(process.stdout);
  child.stderr.pipe(process.stderr);
  child.stdout.pipe(logStream);
  child.stderr.pipe(logStream);

  child.on('exit', (code) => {
    if (code === 0) {
      historyStream.write(`SUCCESS: ${command}\n`);
    } else {
      const error = `ERROR (${code}): ${command}\n`;
      historyStream.write(error);
      errStream.write(error);
    }
  });

  child.on('error', (err) => {
    const error = `ERROR: ${command}\n${err.message}\n`;
    historyStream.write(error);
    errStream.write(error);
  });

  child.stderr.on('data', (data) => {
    const warning = `WARNING: ${command}\n${data.toString()}\n`;
    historyStream.write(warning);
    warnStream.write(warning);
  });
}

logCommand('ls -la');