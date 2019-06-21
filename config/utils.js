const path = require('path');
const fs = require('fs');

const ROOT_DIR = fs.realpathSync(process.cwd());
const resolvePath = relativePath => path.resolve(ROOT_DIR, relativePath);

module.exports = {
    ROOT_DIR,
    resolvePath,
};
