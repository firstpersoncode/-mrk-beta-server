module.exports = {
    roots: ['<rootDir>/src'],
    transform: {
        '^.+\\.ts': 'ts-jest',
        '^.+\\.js': 'babel-jest',
    },
    testRegex: '(\\.|/)(test|spec)\\.(t|j)s',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'node'],
}
