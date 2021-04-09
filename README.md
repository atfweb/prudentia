
INTRODUCTION
------------
This theme is a sub-theme of uswds_base drupal theme. 
This sub-theme requires the full USWDS assets folder.
The steps below assume you are using a docker container to run Drupal app and you Lando to spin services and tooling in your app.
It uses GULP to compile SASS and copy USWDS assets.

INSTALLATION
------------
1. Install Prudentia theme
`lando composer require atf/prudentia`

3. Copy the "**yourthemename**" folder from the "*/prudentia/starterkit*" dir to the "*themes/custom*" directory in your codebase.

4. Replace "**yourthemename**" folder name and file names with your theme name

5. In your lando.yml file, paste this code and, replace "**yourthemename**" with your theme name :
```
services:
  node:
    type: node
    build:
      - npm install --prefix ./web/themes/contrib/prudentia/
      - rm -rf ./web/themes/custom/yourthemename/node_modules
      - mv ./web/themes/contrib/prudentia/node_modules ./web/themes/custom/yourthemename
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
6. Run ``lando rebuild -y``

7. In your terminal go to your theme directory  (*web/themes/custom/yourthemename*) 

8. Run `lando gulp init`

9.  In your drupal application:

   - Go to "*admin/config/development/performance*" and uncheck: "Aggregate CSS files" and "Aggregate JavaScript files" under the Bandwidth Optimization and click Save Configuration (to prevent caching)

   - Go to "*/admin/appearance*" page and "Install and set as default" ***yourthemename*** theme.

10.   Clear cache `lando drush cr`

11.   Go to your application home page. It should be running your theme (based on Prudentia theme).

**Important Notes**:
- The lando.yml code above:
  - Runs on lando rebuild and installs  Node and NPM in your docker container, adds gulp and other packages and their dependencies to the 'node_modules' in /themes.contrib/prudentia directory.
  - Assumes your webroot folder name is "web". You might need to change it with "docroot" or with the name of your webroot folder. 

- The Prudentia theme depends on the Components Library Drupal module (https://www.drupal.org/project/components) and the module must be enabled to enable the theme. If you install the theme via composer the module will be pulled into your codebase automatically.


- This theme uses as reference the uswds-gulp repo to configure npm and gulp files.

**References:**
- Drupal and Lando ( https://stephencross.com/2019/11/29/drupal-8-and-lando/)
- USWDS-GULP (https://github.com/uswds/uswds-gulp )
- USWDS_BASE theme (https://www.drupal.org/project/uswds_base )