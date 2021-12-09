require("dotenv").config();

const appEnv = process.env.APP_ENV

if (appEnv.toLocaleLowerCase() === 'production') {
    const cli = require("next/dist/cli/next-start");

    cli.nextStart(["-p", process.env.APP_PORT || 3000]);
} else {
    const cli = require("next/dist/cli/next-dev");

    cli.nextDev(["-p", process.env.APP_PORT || 3000]);
}

