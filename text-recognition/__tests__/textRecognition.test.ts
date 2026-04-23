// textRecognition.test.ts
// Tests unitaires Jest — couche JavaScript/TypeScript
//
// Dépendances à ajouter dans package.json :
//   "devDependencies": {
//     "jest": "^29.0.0",
//     "@types/jest": "^29.0.0",
//     "ts-jest": "^29.0.0",
//     "@testing-library/react-native": "^12.0.0",
//     "react-native": "*"
//   }
//
// jest.config.js minimal :
//   module.exports = {
//     preset: 'react-native',
//     transform: { '^.+\\.tsx?$': 'ts-jest' },
//   };
//
// Pour lancer : yarn jest  ou  npx jest textRecognition.test.ts

import { recognize } from '../src/index';
import type { TextRecognitionResult, Script } from '../src/index';

// ─── Mock du module natif ─────────────────────────────────────────────────────
// On simule le module natif renvoyé par NativeModules.TextRecognition
// et le TurboModuleRegistry pour couvrir les deux branches de détection d'archi.

// mockRecognize déclaré DANS la factory pour éviter le problème de hoisting :
// jest.mock() est hissé avant les déclarations — toute variable externe
// est inaccessible au moment où la factory s'exécute.
// On récupère la référence après via NativeModules.TextRecognition.recognize.
jest.mock('react-native', () => ({
    NativeModules: {
        TextRecognition: {
            recognize: jest.fn(),
        },
    },
    TurboModuleRegistry: {
        getEnforcing: jest.fn(() => ({
            recognize: jest.fn(),
        })),
        get: jest.fn(),
    },
    Platform: {
        OS: 'ios',
        select: jest.fn((obj: Record<string, unknown>) => obj.ios ?? obj.default),
    },
}));

// Référence récupérée après le mock — utilisable dans tous les tests
import { NativeModules as MockNativeModules } from 'react-native';
const mockRecognize = MockNativeModules.TextRecognition.recognize as jest.Mock;

// ─── Fixture de résultat réaliste ─────────────────────────────────────────────

const MOCK_RESULT: TextRecognitionResult = {
    text: 'Hello World',
    blocks: [
        {
            text: 'Hello World',
            frame: { width: 200, height: 50, top: 10, left: 5 },
            cornerPoints: [
                { x: 5,   y: 10 },
                { x: 205, y: 10 },
                { x: 205, y: 60 },
                { x: 5,   y: 60 },
            ],
            recognizedLanguages: [{ languageCode: 'en' }],
            lines: [
                {
                    text: 'Hello World',
                    frame: { width: 200, height: 50, top: 10, left: 5 },
                    cornerPoints: null,
                    recognizedLanguages: [{ languageCode: 'en' }],
                    confidenceScore: 0.98,
                    rotationDegree: 0,
                    elements: [
                        { text: 'Hello', frame: { width: 90, height: 50, top: 10, left: 5 },   cornerPoints: null },
                        { text: 'World', frame: { width: 100, height: 50, top: 10, left: 105 }, cornerPoints: null },
                    ],
                },
            ],
        },
    ],
};

// ═════════════════════════════════════════════════════════════════════════════
// Structure du résultat
// ═════════════════════════════════════════════════════════════════════════════

describe('recognize() — structure du résultat', () => {

    beforeEach(() => {
        jest.clearAllMocks();
        mockRecognize.mockResolvedValue(MOCK_RESULT);
    });

    it('retourne le texte global', async () => {
        const result = await recognize('file:///path/to/image.jpg');
        expect(result.text).toBe('Hello World');
    });

    it('retourne un tableau de blocks', async () => {
        const result = await recognize('file:///path/to/image.jpg');
        expect(Array.isArray(result.blocks)).toBe(true);
        expect(result.blocks).toHaveLength(1);
    });

    it('chaque block contient text, frame, lines, recognizedLanguages', async () => {
        const result = await recognize('file:///path/to/image.jpg');
        const block = result.blocks[0];

        expect(block).toHaveProperty('text');
        expect(block).toHaveProperty('frame');
        expect(block).toHaveProperty('lines');
        expect(block).toHaveProperty('recognizedLanguages');
    });

    it('frame contient width, height, top, left', async () => {
        const result = await recognize('file:///path/to/image.jpg');
        const frame = result.blocks[0].frame!;

        expect(frame).toHaveProperty('width', 200);
        expect(frame).toHaveProperty('height', 50);
        expect(frame).toHaveProperty('top', 10);
        expect(frame).toHaveProperty('left', 5);
    });

    it('cornerPoints est un tableau de {x, y}', async () => {
        const result = await recognize('file:///path/to/image.jpg');
        const points = result.blocks[0].cornerPoints!;

        expect(points).toHaveLength(4);
        expect(points[0]).toEqual({ x: 5, y: 10 });
    });

    it('chaque line contient confidenceScore et rotationDegree', async () => {
        const result = await recognize('file:///path/to/image.jpg');
        const line = result.blocks[0].lines[0];

        expect(line.confidenceScore).toBeCloseTo(0.98);
        expect(line.rotationDegree).toBe(0);
    });

    it('elements contient les mots individuels', async () => {
        const result = await recognize('file:///path/to/image.jpg');
        const elements = result.blocks[0].lines[0].elements;

        expect(elements).toHaveLength(2);
        expect(elements[0].text).toBe('Hello');
        expect(elements[1].text).toBe('World');
    });
});

// ═════════════════════════════════════════════════════════════════════════════
// Paramètre script
// ═════════════════════════════════════════════════════════════════════════════

describe('recognize() — paramètre script', () => {

    beforeEach(() => {
        jest.clearAllMocks();
        mockRecognize.mockResolvedValue(MOCK_RESULT);
    });

    const scripts: Script[] = ['Latin', 'Chinese', 'Devanagari', 'Japanese', 'Korean'];

    it.each(scripts)('transmet le script "%s" au module natif', async (script) => {
        await recognize('file:///image.jpg', script);
        expect(mockRecognize).toHaveBeenCalledWith('file:///image.jpg', script);
    });

    it('utilise Latin par défaut si aucun script fourni', async () => {
        await recognize('file:///image.jpg');
        expect(mockRecognize).toHaveBeenCalledWith('file:///image.jpg', 'Latin');
    });
});

// ═════════════════════════════════════════════════════════════════════════════
// Propagation des erreurs
// ═════════════════════════════════════════════════════════════════════════════

describe('recognize() — gestion des erreurs', () => {

    beforeEach(() => jest.clearAllMocks());

    it('propage un rejet natif comme une erreur JS', async () => {
        const nativeError = new Error('Text recognition failed');
        mockRecognize.mockRejectedValue(nativeError);

        await expect(recognize('file:///bad.jpg')).rejects.toThrow('Text recognition failed');
    });

    it('propage un rejet réseau comme une erreur JS', async () => {
        mockRecognize.mockRejectedValue(new Error('Network request failed'));

        await expect(recognize('https://unreachable.example.com/img.jpg'))
            .rejects.toThrow('Network request failed');
    });

    it('ne swallow pas les erreurs silencieusement', async () => {
        mockRecognize.mockRejectedValue(new Error('Unknown error'));

        let caught: Error | null = null;
        try {
            await recognize('file:///image.jpg');
        } catch (e) {
            caught = e as Error;
        }
        expect(caught).not.toBeNull();
    });
});

// ═════════════════════════════════════════════════════════════════════════════
// Rétrocompatibilité : routing ancienne archi vs New Arch
// ═════════════════════════════════════════════════════════════════════════════

describe('routing dual-architecture', () => {

    beforeEach(() => jest.clearAllMocks());

    // Le routing est résolu à l'initialisation du module (au require),
    // pas à chaque appel. Les tests vérifient donc le comportement observable
    // (mockRecognize appelé) plutôt que le chemin interne.

    it('ancienne archi : recognize() appelle le module natif', async () => {
        mockRecognize.mockResolvedValue(MOCK_RESULT);
        await recognize('file:///img.jpg');
        expect(mockRecognize).toHaveBeenCalledWith('file:///img.jpg', 'Latin');
    });

    it('passe le bon script au module natif', async () => {
        mockRecognize.mockResolvedValue(MOCK_RESULT);
        await recognize('file:///img.jpg', 'Chinese');
        expect(mockRecognize).toHaveBeenCalledWith('file:///img.jpg', 'Chinese');
    });

    it('lève une erreur si le module natif rejette', async () => {
        mockRecognize.mockRejectedValue(new Error('native error'));
        await expect(recognize('file:///img.jpg')).rejects.toThrow('native error');
    });
});

// ═════════════════════════════════════════════════════════════════════════════
// Cas limites
// ═════════════════════════════════════════════════════════════════════════════

describe('recognize() — cas limites', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('gère un résultat avec blocks vide (image sans texte)', async () => {
        mockRecognize.mockResolvedValue({ text: '', blocks: [] });

        const result = await recognize('file:///blank.jpg');
        expect(result.text).toBe('');
        expect(result.blocks).toHaveLength(0);
    });

    it('gère des cornerPoints null dans un block', async () => {
        const resultWithNullPoints: TextRecognitionResult = {
            ...MOCK_RESULT,
            blocks: [{ ...MOCK_RESULT.blocks[0], cornerPoints: null }],
        };
        mockRecognize.mockResolvedValue(resultWithNullPoints);

        const result = await recognize('file:///image.jpg');
        expect(result.blocks[0].cornerPoints).toBeNull();
    });

    it('gère un frame null dans une line', async () => {
        const resultWithNullFrame: TextRecognitionResult = {
            ...MOCK_RESULT,
            blocks: [{
                ...MOCK_RESULT.blocks[0],
                lines: [{ ...MOCK_RESULT.blocks[0].lines[0], frame: null }],
            }],
        };
        mockRecognize.mockResolvedValue(resultWithNullFrame);

        const result = await recognize('file:///image.jpg');
        expect(result.blocks[0].lines[0].frame).toBeNull();
    });

    it('gère plusieurs blocks simultanément', async () => {
        const multiBlock: TextRecognitionResult = {
            text: 'Block1\nBlock2\nBlock3',
            blocks: [MOCK_RESULT.blocks[0], MOCK_RESULT.blocks[0], MOCK_RESULT.blocks[0]],
        };
        mockRecognize.mockResolvedValue(multiBlock);

        const result = await recognize('file:///multi.jpg');
        expect(result.blocks).toHaveLength(3);
    });

    it('ne modifie pas le résultat natif (pas de mutation)', async () => {
        mockRecognize.mockResolvedValue(MOCK_RESULT);
        const result = await recognize('file:///image.jpg');

        // Le résultat JS doit être structurellement identique au résultat natif
        expect(result).toEqual(MOCK_RESULT);
    });
});
