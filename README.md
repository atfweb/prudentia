
INTRODUCTION
------------
This theme is a sub-theme of uswds_base drupal theme. 
This sub-theme requires the full USWDS assets folder and the @USWDS/compile package.
The steps below assume you are using a docker container to run Drupal app and you Lando to spin services and tooling in your app.
It uses GULP to compile SASS and copy/update USWDS assets.
This assumes your webroot is : web . If your codebase webroot name is different, you need to update lando.yml file.

Install and enable a Prudentia subtheme in a Drupal 9 website
-------------------------------------------------------------
1. Install the prudentia theme `lando composer require atf/prudentia`

_**Note**: As March 2022, to use the USWDS 2.13.1 version we need the uswds_base 2.13@alpha version. Since this alpha version that does not meet the composer minimum-stability, manually installation of that version is needed.

2. Run: `lando composer require 'drupal/uswds_base:^2.13@alpha'`

3. Copy the /web/themes/contrib/prudentia/starterkit/yourthemename folder 

4. Paste the yourthemename folder in the /web/themes/custom/ directory

5. Replace "yourthemename" folder name with your theme name

6. Replace all instances of "yourthemename" in the filenames with your theme name.

     custom/yourthemename/

     custom/yourthemename/config/install

     custom/yourthemename/config/optional

     custom/yourthemename/config/schema

     custom/yourthemename/js

     custom/yourthemename/sass

7. Open the files inside each of the following folders and replace all instances of "yourthemename" with your theme name.

     custom/yourthemename/

     custom/yourthemename/config/install

     custom/yourthemename/config/optional

     custom/yourthemename/config/schema

     custom/yourthemename/js

     custom/yourthemename/sass


**NOTE:** Remove the 'rename-me' from the filename of  custom/yourthemename/yourthemename.info.rename.me.yml file


8. Navigate to /admin/extend and enable the components module

9. Navigate to the /admin/appearance page

10. Install and set as default "yourthemename" theme

11. Open lando.yml file and add the following code:

Note: replace **yourthemename** with your theme name
```
services:
  node:
    type: node:16
    build:
      - npm install --prefix ./web/themes/contrib/prudentia/
      - rm -rf ./web/themes/custom/yourthemename/node_modules
      - mv ./web/themes/contrib/prudentia/node_modules ./web/themes/custom/yourthemename
      
tooling:
  node:
    service: node
  npm:
    service: node
  npx:
    service: node
```
Notes: 
- Change 'web' with the root of your application if it is needed.
- The reason of removing node_modules from yourthemename/ is to avoid issue of not finding empty directory on lando rebuild -y


12. `lando rebuild -y`

13. `cd web/themes/custom/yourthemename`

14. `lando npx gulp copyAssets`

15. `lando npx gulp compile`

16. `lando drush cr`

17. In your drupal application:

   - Go to "*admin/config/development/performance*" and uncheck: "Aggregate CSS files" and "Aggregate JavaScript files" under the Bandwidth Optimization and click Save Configuration (to prevent caching)

   - Go to "*/admin/appearance*" page and "Install and set as default" ***yourthemename*** theme.

18. Clear cache `lando drush cr`

19. Navigate to your project home page, it should be running your custom theme based on Prudentia

**Important Notes**:
- The lando.yml code above:
  - Runs on lando rebuild and installs  Node and NPM in your docker container, adds @uswds/compile, uswds design system and other packages/dependencies to the 'node_modules' in *docroot/themes/custom/yourthemename* directory.
  - Assumes your webroot folder name is "web". You might need to change it with "docroot" or with the name of your webroot folder. 

- The Prudentia theme depends on the Components Library Drupal module (https://www.drupal.org/project/components) and the module must be enabled for the theme to be enabled. If you install the theme via composer the module will be pulled into your codebase automatically.

- As March 2022, this theme needs the uswds_base ^2.13@alpha version which works with uswds 2.13.1. You need to manually require the uswds_base ^2.13@alpha version. 

- This theme uses USWDS Compiler (@uswds/compile package) to compile SASS and it requires Node v16

- Upgrade lando to version 3.6.2 that supports Node v16


PRUDENTIA GITHUB REPO: https://github.com/atfweb/prudentia/

**References:**
- Drupal and Lando (https://stephencross.com/2020/12/10/drupal-9-and-lando/)
- USWDS-COMPILE (https://github.com/uswds/uswds-compile)
- USWDS_BASE theme (https://www.drupal.org/project/uswds_base)
- Drupal - Creating sub-themes (https://www.drupal.org/node/2165673)
- USWDS - Design System package: (https://www.npmjs.com/package/uswds)
- USWDS JSDELIVR : (https://www.jsdelivr.com/?query=uswds)
- USWDS Design System : (https://designsystem.digital.gov/)