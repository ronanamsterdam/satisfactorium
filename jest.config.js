
module.exports = {
  transform: {
    "^.+\\.[jt]sx?$": "<rootDir>/jest-preprocess.js",
  },
  modulePaths: ["src"],
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss)$': `identity-obj-proxy`,
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': `<rootDir>/src/__mocks__/file-mock.js`,
    "^src(.*)$": '<rootDir>/src$1',
    "^components\/\/(.*)$": '<rootDir>/src/components$1',
    "^images\/\/(.*)$": '<rootDir>/src/images$1',
    "^pages\/\/(.*)$": '<rootDir>/src/pages$1',
    "^statics\/\/(.*)$": '<rootDir>/src/statics$1',
    "^style\/\/(.*)$": '<rootDir>/src/style$1',
    "^apps\/\/(.*)$": '<rootDir>/src/apps$1',
    "^common\/\/(.*)$": '<rootDir>/src/common$1',
  },
  testPathIgnorePatterns: [`node_modules`, `.cache`],
  transformIgnorePatterns: [`node_modules/(?!(gatsby)/)`],
  globals: {
    __PATH_PREFIX__: ``,
  },
  testURL: `http://localhost`,
  setupFilesAfterEnv: [`<rootDir>/jest.setup.js`],
  setupFiles: [`<rootDir>/jest-loadershim.js`],
  coverageDirectory: "<rootDir>/cov",
    coverageReporters: [
      "text",
      "html"
    ],
  // collectCoverageFrom: [
  //   "<rootDir>/src/**/*.js",
  // ],
}
