import fs from 'fs';
// import { dirname } from 'path';
// import { fileURLToPath } from 'url';

// const __dirname = dirname(fileURLToPath(import.meta.url));

function buildUtils() {
  try {
    try {
      fs.mkdirSync('./.output/server/node_modules/@popperjs');
    } catch (error) {
      console.log(error);
    }
    fs.renameSync(
      './.output/server/node_modules/@sxzz/popperjs-es',
      './.output/server/node_modules/@popperjs/core'
    );
  } catch (error) {
    console.error(error);
  }
}

buildUtils();
