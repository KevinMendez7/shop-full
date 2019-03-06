const app = require('./app');
const env = require('./utils/.env');
const { handleFatalError } = require('./utils/utility');

const setupDatabase = require('./db/db');

const sequelize = setupDatabase();

sequelize.authenticate()
          .then(() => console.log('CONNECTED'))
          .catch((err) => {
            handleFatalError(err)
          })
          .done();

sequelize.sync()
          .then(() => {
            app.set('port', env.PORT);

            app.listen(app.get('port'), () => {
              console.log(`Shopmate listening on port: ${env.PORT}`);
            });
          })
          .catch(err => console.log(err));