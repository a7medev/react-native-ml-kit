// jest.setup.js
// Mock minimal de react-native pour Jest.
//
// On ne fait PAS jest.requireActual('react-native') + spread :
// cela déclenche l'initialisation de tous les modules natifs RN
// (SettingsManager, etc.) qui n'existent pas en environnement Node/Jest.
//
// On expose uniquement ce dont nos tests ont besoin.

jest.mock('react-native', () => {
  const mockRecognize = jest.fn();

  return {
    NativeModules: {
      TextRecognition: {
        recognize: mockRecognize,
      },
    },
    TurboModuleRegistry: {
      getEnforcing: jest.fn(() => ({
        recognize: mockRecognize,
      })),
      get: jest.fn(),
    },
    Platform: {
      OS: 'ios',
      select: jest.fn((obj) => obj.ios ?? obj.default),
    },
  };
});
