const { render } = require("prettyjson");
const data = {
  message: "Thank's for installing ReplAPI.it!",
  help: "If you need help, visit the documentation or ask on the Github Discussion.",
  contributing:
    "If you are interested in contributing, feel free to visit the repo.",
  links: [
    "Documentation: https://replapi-it-docs.vercel.app",
    "Repository: https://github.com/RayhanADev/ReplAPI.it",
  ],
};

const renderOpts = {
  dashColor: "green",
  keysColor: "cyan",
  stringColor: "white",
};

console.log(render(data, renderOpts));
