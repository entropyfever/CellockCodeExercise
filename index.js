'use strict';

const port = 8010;
const createApp = require('./src/app');

const main = async () => {
    const app = await createApp();
    app.listen(port, () => console.log(`App started and listening on port ${port}`));
}

main().catch(console.error);
