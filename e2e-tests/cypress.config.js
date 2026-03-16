const { defineConfig } = require('cypress');
const killPort = require('kill-port');
const waitOn = require('wait-on');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

module.exports = defineConfig({
  e2e: {
    // baseUrl: 'http://localhost:3000',
    // trashAssetsBeforeRuns: false,
    chromeWebSecurity: false,
    reporter: process.env.CI ? 'mocha-reporter-gha' : 'spec',

    setupNodeEvents(on, config) {
      // implement node event listeners here

      on('before:spec', async details => {
        // console.log('********************* DETAILS *********************', JSON.stringify(details));

        if (config.isInteractive) {
          try {
            await killPort(3000);
          } catch (e) {
            console.warn('Error killing process on port 3000:', e.message);
          }
          switch (details.fileName) {
            case 'add-connection':
              serverProcess = exec('pnpm start:add-connection');
              break;
            case 'portal':
              serverProcess = exec('pnpm start:portal');
              break;
            case 'oauth':
              serverProcess = exec('pnpm start:oauth');
              break;
            case 'browse-data':
              serverProcess = exec('pnpm start:browse-data');
              break;
            case 'rest':
              serverProcess = exec('pnpm start:rest');
              break;
            case 'team':
              serverProcess = exec('pnpm start:team');
              break;
            case 'multi-sql':
              serverProcess = exec('pnpm start:multi-sql');
              break;
            case 'cloud':
              serverProcess = exec('pnpm start:cloud');
              break;
            case 'charts':
              serverProcess = exec('pnpm start:charts');
              break;
            case 'redis':
              serverProcess = exec('pnpm start:redis');
              break;
            case 'ai-chat':
              serverProcess = exec('pnpm start:ai-chat');
              break;
          }

          await waitOn({ resources: ['http://localhost:3000'] });
          serverProcess.stdout.on('data', data => {
            console.log(data.toString());
          });
          serverProcess.stderr.on('data', data => {
            console.error(data.toString());
          });
        }
      });

      on('after:screenshot', details => {
        if (details.name) {
          fs.renameSync(details.path, path.resolve(__dirname, `screenshots/${details.name}.png`));
        }
      });
      // on('task', {
      //   renameFile({ from, to }) {
      //     fs.renameSync(from, to);
      //   },
      // });
    },
  },
});
