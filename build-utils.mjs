import fs from 'fs';
// import { dirname } from 'path';
// import { fileURLToPath } from 'url';

// const __dirname = dirname(fileURLToPath(import.meta.url));

function buildUtils() {
  try {
    if (fs.existsSync('./.output/server/node_modules/')) {
      try {
        fs.mkdirSync('./.output/server/node_modules/@popperjs');
      } catch (error) {
        console.log(error);
      }
    }
    if (fs.existsSync('./.output/server/node_modules/@sxzz/popperjs-es')) {
      fs.renameSync(
        './.output/server/node_modules/@sxzz/popperjs-es',
        './.output/server/node_modules/@popperjs/core'
      );
    }
  } catch (error) {
    console.error(error);
  }
}

buildUtils();
