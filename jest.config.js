const path = require('path');
const fs = require('fs');
const { jsWithTs: tsjPreset } = require('ts-jest/presets');

const ignorePatterns = ['.d.ts$','.styled.ts$','.example.tsx$']
module.exports = {
    verbose: true,
    preset: 'ts-jest/preset/js-with-ts',
    global: {
        'ts-jest': {
            tsConfig: {
                target: 'es2015'
            }
        }
    },
    rootDir: __dirname,
    "roots": [
      "<rootDir>/src"
    ],
    "transform": {
        ...tsjPreset.transform,
      "^.+\\.tsx?$": "ts-jest",
      '^.+.css$': require.resolve('react-script/config/jest/cssTransform.js'),
      '^(?!.*.(js|jsx|ts|tsx|css|json)$)': require.resolve('react-script/config/jest/fileTransform.js')
    },
    "transformIngnorePatterns": [
        'node_modules',
        '^.+.module.(css|sass|scss)$'
    ],
    "collectCoverageFrom": ['src/**/*.{js,jsx,ts,tsx}'],
    "coveragePathIgnorePatterns":[
        ...ignorePatterns,
        'src/(.*)/(.*).d.ts',
        'src/(.*).stories.tsx',
        'src/(.*)/(.*).stories.tsx',
        'src/(.*)/serviceWorker.(.*)',
        'src/(.*)/registerServiceWorker.(.*)',
        'src/shells/(.*).(.*)',
        'src/util/log/(.*)',
        'src/index.ts',
        'src/logConfig.ts',
        'node_modules/(.*)',
        'src/data/(.*)',
        'src/utils/log/(.*)',
        'src/utils/graphql/(.*)'
    ],
    "moduleNameMapper": {
        '^.+.module.(css|sass|scss)$':'identity-obj-proxy'
    },
    "setupFiles": [require.resolve('react-app-polyfill/jsdom.js')],
    "setupFilesAfterEnv": [
        fs.existsSync(path.join(__dirname, 'src/setupTests.ts')) ? '<rootDir>/src/setupTests.ts' : '<rootDir>/src/setupTests.ts'
    ],
    "testMatch": [
        '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
        '<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}',
        '<rootDir>/test/!(__mock__)/*.{js,jsx,ts,tsx}',
        '<rootDir>/test/!(__mock__)/**/*.{js,jsx,ts,tsx}',
    ],
    "testEnviroment": 'jest-enviroment-jsdom-fourteen',
    "testPathIgnorePatterns": ignorePatterns,
    // "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
    "moduleFileExtensions": [
      "ts",
      "tsx",
      "js",
      "jsx",
      "json",
      "node"
    ],
    "snapshotSerializers": ["enzyme-to-json/serializer"],
    "modulePaths": [path.join(__dirname, 'src')],
    "testResultsProcessor": 'jest-sonar-reporter'
  }