const { execSync } = require("child_process");

test(`Build site output`, () => {
    // Run build
    execSync("npm run build", { stdio: "ignore" })
});