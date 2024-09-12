export default {
    preset: 'ts-jest',
    transform: { '^.+\\.ts?$': 'ts-jest' },
    clearMocks: true,
    collectCoverage: true,
    coverageDirectory: "coverage",
    coverageReporters: ['json','html'],
    collectCoverageFrom: [
      'src/main/app/**/*.tsx'
    ]
  }