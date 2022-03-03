/*
----------------------------------------
YOURTHEME SASS GULPFILE
----------------------------------------
*/

const uswds = require('@uswds/compile');

//PRUDENTIA source sass
uswds.paths.src.projectSass = '../../contrib/prudentia/sass';

//Project sass file destination
uswds.paths.dist.theme = './sass';

//Project style files destination paths
uswds.paths.dist.css = './assets/css';
uswds.paths.dist.js = './assets/js';
uswds.paths.dist.fonts = './assets/fonts';
uswds.paths.dist.img = './assets/img';


exports.copyAssets = uswds.copyAssets;
exports.compile = uswds.compile;
exports.compileIcons = uswds.compileIcons;
