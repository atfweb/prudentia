
INTRODUCTION
------------
This theme is a sub-theme of uswds_base drupal theme. 
This sub-theme requires the full USWDS assets folder.


INSTALLATION
------------
1. Install uswds_base theme 
`lando composer require 'drupal/uswds_base:^2.4'`

2. Install Prudentia theme
`lando composer require atf/prudentia`

3. Copy the “yourthemename” folder from the /prudentia/starterkit to the themes/custom directory in your codebase

4. Replace “yourthemename” from directory name and files with your theme name

5. On your lando.yml project, paste this code:
`
services:
  node:
    type: node
    build:
      - npm install
     
      - npm install --prefix ./web/themes/custom/yourthemename/ autoprefixer gulp gulp-replace sass gulp-sass gulp-sourcemaps gulp-postcss postcss-csso postcss uswds uswds-gulp@github:uswds/uswds-gulp --save-dev
    globals:
      gulp-cli: latest
      
tooling:
  node:
    service: node
  npm:
    service: node
  gulp:
    service: node

`

6. Run `lando rebuild -y`

7. In your terminal go to your theme directory  ( web/themes/custom/yourthemename ) 

8. Run `lando gulp init`
This will create the assets directories, copy uswds sass in your theme sass folder and compile the sass

9. In the browser got to admin/config/development/performance and uncheck: “Aggregate CSS files” and “Aggregate JavaScript files” under the Bandwidth Optimization and click Save Configuration ( this is to avoid caching)

10. In your drupal application go to /admin/appearance page and "Install and set as default" your theme.

11. Clear cache `lando drush cr`

12. Go to your application home page. It should be running the your theme based on Prudentia theme.

Important Notes:
- The lando.yml code will run on lando rebuild and will install the node, npm in your docker container, add the 'node_modules', gulp and some dependencies in your theme  directory.

- The lando.yml code assumes your webroot folder name is “web”. You might need to change it to “docroot” or with the name of your webroot folder. 

- In the starterkit/yourthemename folder a gulpfile.js file is included ( to compile sass ),  you might need to replace  the instance of 'web' with the name of your project webroot name