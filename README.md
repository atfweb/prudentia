
INTRODUCTION
------------
This theme is a sub-theme of uswds_base drupal theme. 
This sub-theme requires the full USWDS assets folder.
The steps below assume you are using a docker container to run Drupal app and you Lando to spin services and tooling in your app.
It uses gulp to compile sass following the uswds-gulp repo


INSTALLATION
------------
1. Install uswds_base theme 
`lando composer require 'drupal/uswds_base:^2.4'`

2. Install Prudentia theme
`lando composer require atf/prudentia`

3. Copy the "**yourthemename**" folder from the "*/prudentia/starterkit*" dir to the "*themes/custom*" directory in your codebase.

4. Replace "**yourthemename**" folder name and file names with your theme name

5. In your lando.yml file, paste this code:
```
services:
  node:
    type: node
    build:
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

```
6. In your terminal go to your theme directory  (*web/themes/custom/yourthemename*) 

7. Run ``lando rebuild -y``

8. Run `lando gulp init`

9.  In your drupal application:

   - Go to "*admin/config/development/performance*" and uncheck: "Aggregate CSS files" and "Aggregate JavaScript files" under the Bandwidth Optimization and click Save Configuration (to prevent caching)

   - Go to "*/admin/appearance*" page and "Install and set as default" ***yourthemename*** theme.

10.   Clear cache `lando drush cr`

11.   Go to your application home page. It should be running your theme (based on Prudentia theme).

**Important Notes**:
- The lando.yml code above:
  - Runs on lando rebuild and installs  Node and NPM in your docker container, adds gulp and other packages and their dependencies to the 'node_modules' in your theme directory.
  - Assumes your webroot folder name is "web". You might need to change it with "docroot" or with the name of your webroot folder. 

- In the **gulpfile.js** file inside the "*starterkit/yourthemename*" folder, you might need to replace  the instance of '**web**' with the name of your project webroot name.

- You need to install/enable **Components Library** Drupal module (https://www.drupal.org/project/components) to use the Pruedntia components 


**References:**
- Drupal and Lando ( https://stephencross.com/2019/11/29/drupal-8-and-lando/)
- USWDS-GULP (https://github.com/uswds/uswds-gulp )
- USWDS_BASE theme (https://www.drupal.org/project/uswds_base )