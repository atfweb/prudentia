/*
   ___  ___  __  _____  _____  _______________ 
  / _ \/ _ \/ / / / _ \/ __/ |/ /_  __/  _/ _ |
 / ___/ , _/ /_/ / // / _//    / / / _/ // __ |
/_/  /_/|_|\____/____/___/_/|_/ /_/ /___/_/ |_|
------------------------------------------------
PRUDENTIA SASS GULPFILE
------------------------------------------------
*/

const uswds = require('@uswds/compile');

//PRUDENTIA source sass
uswds.paths.src.projectSass = './node_modules/uswds/dist/scss';

//Project sass file destination
uswds.paths.dist.theme = './sass';

//Project style files destination paths
uswds.paths.dist.css = './assets/css';
uswds.paths.dist.js = './assets/js';
uswds.paths.dist.fonts = './assets/fonts';
uswds.paths.dist.img = './assets/img';


exports.compile = uswds.compile;
exports.copyAssets = uswds.copyAssets;
exports.updateUswds = uswds.updateUswds;
