const info = (...params) => {
  console.log("\x1b[32m", "info", "\x1b[0m", ...params);
};

const error = (...params) => {
  console.error("\x1b[31m", "error", "\x1b[0m", ...params);
};

module.exports = { info, error };
