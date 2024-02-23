import fs from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function buildUtils() {
  try {
    fs.mkdirSync(join(__dirname, '.output/server/node_modules/@popperjs'));
    fs.renameSync(
      join(__dirname, '.output/server/node_modules/@sxzz/popperjs-es'),
      join(__dirname, '.output/server/node_modules/@popperjs/core')
    );
  } catch (error) {
    console.log(error);
  }
}

buildUtils();
