module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    // Arquivos de estilo não importam nos testes: trocamos por um objeto vazio.
    '\\.(css|scss|sass)$': '<rootDir>/test/styleMock.js',
  },
  collectCoverageFrom: ['src/**/*.{js,jsx}', '!src/main.jsx'],
};
