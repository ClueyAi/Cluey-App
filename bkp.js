const readlineSync = require('readline-sync');
const archiver = require('archiver');
const path = require('path');
const fs = require('fs');

const name = readlineSync.question('Name (backup name): ');
const version = readlineSync.question('Version (ex.: 1.0.1, 0.1): ');
const type = readlineSync.question('Type (ex.: dev, apha, realese): ');
const comment = readlineSync.question('Comment (for info file): ');
const dateTime = new Date().toLocaleString();

const fileName = `${name}-v${version}(${type}).zip`;
const pathFile = `.bkps/${type}/`;
const fullPath = `${pathFile}${fileName}`;
const infoFile = `Name: ${name}\nVersion: ${version}\nType: ${type}\nComment: ${comment}\nDateTime: ${dateTime}`;

if (fs.existsSync(fullPath)) {
  const answer = readlineSync.question(
    `The file named "${fullPath}", already exists. Do you want to provide a new name? (Y/N) `
  );
  if (answer.toUpperCase() === 'Y') {
    // Pede um novo nome para o arquivo
    const newFullPath = readlineSync.question('New name: ');
    if (newFullPath !== '') {
      // Renomeia o arquivo e reinicia o script
      fs.renameSync(fullPath, newFullPath);
      console.log(`File renamed to "${fileName}"`);
      process.exit(0);
    } else {
      console.log('Invalid name. Aborting...');
      process.exit(1);
    }
  } else {
    console.log('Process canceled by the user. Aborting...');
    process.exit(1);
  }
}

const output = fs.createWriteStream(fullPath);
const archive = archiver('zip', { zlib: { level: 9 } });

const gitignorePath = path.join(__dirname, '.bkpignore');
const gitignore = fs.readFileSync(gitignorePath, 'utf-8');
const filesToIgnore = gitignore.split('\n').filter((line) => !line.startsWith('#') && line !== '');
const archiveIgnores = filesToIgnore.map((fileToIgnore) => `**/${fileToIgnore}`);

output.on('close', () => {
  console.log(`The file has ${archive.pointer()} bytes total`);
  console.log(`Current projet saved in "${pathFile}" as "${fileName}"`);
});

archive.on('warning', (err) => {
  if (err.code === 'ENOENT') {
    console.warn(err);
  } else {
    throw err;
  }
});

archive.on('error', (err) => {
  throw err;
});

const bkpsDir = path.join(__dirname, pathFile);
if (!fs.existsSync(bkpsDir)) {
  fs.mkdirSync(bkpsDir);
}

archive.pipe(output);
archive.glob('**/*', { ignore: archiveIgnores });
archive.append(infoFile, { name: 'info.txt' });
archive.finalize();