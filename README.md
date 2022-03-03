
INTRODUCTION
------------
This theme is a sub-theme of uswds_base drupal theme. 
This sub-theme requires the full USWDS assets folder and the @USWDS/compile package.
The steps below assume you are using a docker container to run Drupal app and you Lando to spin services and tooling in your app.
It uses GULP to compile SASS and copy/update USWDS assets.

INSTALLATION
------------
1. Install Prudentia theme
`lando composer require atf/prudentia`

  1.a. In terminal run: `lando composer require 'drupal/uswds_base:^2.13@alpha'`

2. Copy the "**yourthemename**" folder from the "*/prudentia/starterkit*" dir to the "*themes/custom*" directory in your codebase.

3. Replace "**yourthemename**" folder name and file names with your theme name

4. In your lando.yml file, paste this code and, replace "**yourthemename**" with your theme name :
```
services:
  node:
    type: node
    build:
      - npm install --prefix ./docroot/themes/contrib/prudentia/
      - mv ./docroot/themes/contrib/prudentia/node_modules ./docroot/themes/custom/yourthemename
      
tooling:
  node:
    service: node
  npm:
    service: node

```
5. Run ``lando rebuild -y``

   Note: On lando rebuild the *node_modules* dir gets included in your theme directory  (*docroot/themes/custom/yourthemename*). You might need to gitignore that directory.

6. In your terminal go to your theme directory  (*docroot/themes/custom/yourthemename*) 

7. Run `npx gulp copyAssets`

8. Run `npx gulp compile`

9. Run `npx gulp updateUswds`

10. In your drupal application:

   - Go to "*admin/config/development/performance*" and uncheck: "Aggregate CSS files" and "Aggregate JavaScript files" under the Bandwidth Optimization and click Save Configuration (to prevent caching)

   - Go to "*/admin/appearance*" page and "Install and set as default" ***yourthemename*** theme.

11. Clear cache `lando drush cr`

12. Go to your application home page. It should be running your theme (based on Prudentia theme).

**Important Notes**:
- The lando.yml code above:
  - Runs on lando rebuild and installs  Node and NPM in your docker container, adds @uswds/compile, uswds design system and other packages/dependencies to the 'node_modules' in *docroot/themes/custom/yourthemename* directory.
  - Assumes your webroot folder name is "docroot". You might need to change it with "web" or with the name of your webroot folder. 

- The Prudentia theme depends on the Components Library Drupal module (https://www.drupal.org/project/components) and the module must be enabled for the theme to be enabled. If you install the theme via composer the module will be pulled into your codebase automatically.

- As March 2022, this theme needs the uswds_base ^2.13@alpha version which works with uswds 2.13.1. You need to manually require the uswds_base ^2.13@alpha version. 


- This theme uses USWDS Compiler (@uswds/compile package) to compile SASS.

PRUDENTIA GITHUB REPO: https://github.com/atfweb/prudentia/

**References:**
- Drupal and Lando (https://stephencross.com/2020/12/10/drupal-9-and-lando/)
- USWDS-COMPILE (https://github.com/uswds/uswds-compile)
- USWDS_BASE theme (https://www.drupal.org/project/uswds_base)
- Drupal - Creating sub-themes (https://www.drupal.org/node/2165673)
- USWDS - Design System package: (https://www.npmjs.com/package/uswds)
- USWDS JSDELIVR : (https://www.jsdelivr.com/?query=uswds)
- USWDS Design System : (https://designsystem.digital.gov/)