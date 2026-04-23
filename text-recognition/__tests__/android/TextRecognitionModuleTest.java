// TextRecognitionModuleTest.java
// Tests unitaires Android — JUnit 4 + Mockito
//
// Dépendances à ajouter dans build.gradle (android) :
//   testImplementation 'junit:junit:4.13.2'
//   testImplementation 'org.mockito:mockito-core:5.3.1'
//   testImplementation 'org.mockito:mockito-inline:5.3.1'  // pour mocker les classes final
//   testImplementation 'org.robolectric:robolectric:4.11.1'
//   testImplementation 'com.facebook.react:react-native:+'

package com.rnmlkit.textrecognition;

import android.graphics.Point;
import android.graphics.Rect;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.JavaOnlyArray;
import com.facebook.react.bridge.JavaOnlyMap;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.google.mlkit.vision.text.Text;
import com.google.mlkit.vision.text.latin.TextRecognizerOptions;
import com.google.mlkit.vision.text.chinese.ChineseTextRecognizerOptions;
import com.google.mlkit.vision.text.devanagari.DevanagariTextRecognizerOptions;
import com.google.mlkit.vision.text.japanese.JapaneseTextRecognizerOptions;
import com.google.mlkit.vision.text.korean.KoreanTextRecognizerOptions;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.MockedStatic;
import org.mockito.MockitoAnnotations;
import org.robolectric.RobolectricTestRunner;
import org.robolectric.annotation.Config;

import java.lang.reflect.Method;

import static org.junit.Assert.*;
import static org.mockito.Mockito.*;

@RunWith(RobolectricTestRunner.class)
@Config(manifest = Config.NONE)
public class TextRecognitionModuleTest {

    @Mock ReactApplicationContext mockContext;
    @Mock Promise mockPromise;
    @Mock Text.TextBlock mockBlock;
    @Mock Text.Line mockLine;
    @Mock Text.Element mockElement;

    private TextRecognitionModule module;

    // ─── Helpers de réflexion ─────────────────────────────────────────────────
    // Les méthodes helpers sont private dans le module.
    // On les teste via réflexion pour ne pas les rendre public juste pour les tests.

    private Object invoke(String methodName, Class<?>[] types, Object... args) throws Exception {
        Method m = TextRecognitionModule.class.getDeclaredMethod(methodName, types);
        m.setAccessible(true);
        return m.invoke(module, args);
    }

    @Before
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        module = new TextRecognitionModule(mockContext);
    }

    // ═════════════════════════════════════════════════════════════════════════
    // getName()
    // ═════════════════════════════════════════════════════════════════════════

    @Test
    public void getName_returnsTextRecognition() {
        assertEquals("TextRecognition", module.getName());
    }

    // ═════════════════════════════════════════════════════════════════════════
    // rectToMap()
    // ═════════════════════════════════════════════════════════════════════════

    @Test
    public void rectToMap_mapsAllFields() throws Exception {
        Rect rect = new Rect(10, 20, 110, 70); // left, top, right, bottom

        WritableMap result = (WritableMap) invoke(
            "rectToMap", new Class[]{Rect.class}, rect
        );

        // Rect(10, 20, 110, 70) → width=100, height=50, left=10, top=20
        assertEquals(100, result.getInt("width"));
        assertEquals(50,  result.getInt("height"));
        assertEquals(10,  result.getInt("left"));
        assertEquals(20,  result.getInt("top"));
    }

    @Test
    public void rectToMap_zeroRect_returnsZeros() throws Exception {
        Rect rect = new Rect(0, 0, 0, 0);
        WritableMap result = (WritableMap) invoke("rectToMap", new Class[]{Rect.class}, rect);

        assertEquals(0, result.getInt("width"));
        assertEquals(0, result.getInt("height"));
    }

    // ═════════════════════════════════════════════════════════════════════════
    // cornerPointsToMap()
    // ═════════════════════════════════════════════════════════════════════════

    @Test
    public void cornerPointsToMap_mapsXYCorrectly() throws Exception {
        Point[] points = {
            new Point(1, 2),
            new Point(3, 4),
            new Point(5, 6),
            new Point(7, 8),
        };

        WritableArray result = (WritableArray) invoke(
            "cornerPointsToMap", new Class[]{Point[].class}, (Object) points
        );

        assertEquals(4, result.size());

        WritableMap first = (WritableMap) result.getMap(0);
        assertEquals(1, first.getInt("x"));
        assertEquals(2, first.getInt("y"));

        WritableMap last = (WritableMap) result.getMap(3);
        assertEquals(7, last.getInt("x"));
        assertEquals(8, last.getInt("y"));
    }

    @Test
    public void cornerPointsToMap_emptyArray_returnsEmptyArray() throws Exception {
        Point[] points = new Point[0];
        WritableArray result = (WritableArray) invoke(
            "cornerPointsToMap", new Class[]{Point[].class}, (Object) points
        );
        assertEquals(0, result.size());
    }

    // ═════════════════════════════════════════════════════════════════════════
    // langToMap()
    // ═════════════════════════════════════════════════════════════════════════

    @Test
    public void langToMap_wrapsLanguageCode() throws Exception {
        WritableArray result = (WritableArray) invoke(
            "langToMap", new Class[]{String.class}, "fr"
        );
        assertEquals(1, result.size());
        assertEquals("fr", result.getMap(0).getString("languageCode"));
    }

    // ═════════════════════════════════════════════════════════════════════════
    // lineToMap()
    // ═════════════════════════════════════════════════════════════════════════

    @Test
    public void lineToMap_mapsTextAndConfidence() throws Exception {
        when(mockLine.getText()).thenReturn("Hello World");
        when(mockLine.getBoundingBox()).thenReturn(new Rect(0, 0, 200, 50));
        when(mockLine.getCornerPoints()).thenReturn(null);
        when(mockLine.getRecognizedLanguage()).thenReturn("en");
        when(mockLine.getConfidence()).thenReturn(0.98f);
        when(mockLine.getAngle()).thenReturn(0f);
        when(mockLine.getElements()).thenReturn(java.util.Collections.emptyList());

        WritableMap result = (WritableMap) invoke(
            "lineToMap", new Class[]{Text.Line.class}, mockLine
        );

        assertEquals("Hello World", result.getString("text"));
        assertEquals(0.98, result.getDouble("confidenceScore"), 0.001);
        assertNotNull(result.getMap("frame"));
        assertNotNull(result.getArray("elements"));
    }

    @Test
    public void lineToMap_nullBoundingBox_doesNotCrash() throws Exception {
        when(mockLine.getText()).thenReturn("Test");
        when(mockLine.getBoundingBox()).thenReturn(null); // ← cas réel possible
        when(mockLine.getCornerPoints()).thenReturn(null);
        when(mockLine.getRecognizedLanguage()).thenReturn("en");
        when(mockLine.getConfidence()).thenReturn(0.9f);
        when(mockLine.getAngle()).thenReturn(0f);
        when(mockLine.getElements()).thenReturn(java.util.Collections.emptyList());

        WritableMap result = (WritableMap) invoke(
            "lineToMap", new Class[]{Text.Line.class}, mockLine
        );

        // frame ne doit pas être dans la map si getBoundingBox() == null
        assertFalse(result.hasKey("frame"));
    }

    // ═════════════════════════════════════════════════════════════════════════
    // blockToMap()
    // ═════════════════════════════════════════════════════════════════════════

    @Test
    public void blockToMap_mapsTextAndLines() throws Exception {
        when(mockLine.getText()).thenReturn("Line text");
        when(mockLine.getBoundingBox()).thenReturn(null);
        when(mockLine.getCornerPoints()).thenReturn(null);
        when(mockLine.getRecognizedLanguage()).thenReturn("en");
        when(mockLine.getConfidence()).thenReturn(0.9f);
        when(mockLine.getAngle()).thenReturn(0f);
        when(mockLine.getElements()).thenReturn(java.util.Collections.emptyList());

        when(mockBlock.getText()).thenReturn("Block text");
        when(mockBlock.getBoundingBox()).thenReturn(new Rect(0, 0, 300, 100));
        when(mockBlock.getCornerPoints()).thenReturn(null);
        when(mockBlock.getRecognizedLanguage()).thenReturn("en");
        when(mockBlock.getLines()).thenReturn(java.util.Arrays.asList(mockLine));

        WritableMap result = (WritableMap) invoke(
            "blockToMap", new Class[]{Text.TextBlock.class}, mockBlock
        );

        assertEquals("Block text", result.getString("text"));
        assertEquals(1, result.getArray("lines").size());
    }

    // ═════════════════════════════════════════════════════════════════════════
    // getScriptTextRecognizerOptions()
    // ═════════════════════════════════════════════════════════════════════════

    @Test
    public void getScriptOptions_nullScript_returnsDefaultOptions() {
        assertInstanceOf(
            TextRecognizerOptions.class,
            module.getScriptTextRecognizerOptions(null)
        );
    }

    @Test
    public void getScriptOptions_chinese_returnsChineseOptions() {
        assertInstanceOf(
            ChineseTextRecognizerOptions.class,
            module.getScriptTextRecognizerOptions("Chinese")
        );
    }

    @Test
    public void getScriptOptions_devanagari_returnsDevanagariOptions() {
        assertInstanceOf(
            DevanagariTextRecognizerOptions.class,
            module.getScriptTextRecognizerOptions("Devanagari")
        );
    }

    @Test
    public void getScriptOptions_japanese_returnsJapaneseOptions() {
        assertInstanceOf(
            JapaneseTextRecognizerOptions.class,
            module.getScriptTextRecognizerOptions("Japanese")
        );
    }

    @Test
    public void getScriptOptions_korean_returnsKoreanOptions() {
        assertInstanceOf(
            KoreanTextRecognizerOptions.class,
            module.getScriptTextRecognizerOptions("Korean")
        );
    }

    @Test
    public void getScriptOptions_unknownScript_returnsDefaultOptions() {
        assertInstanceOf(
            TextRecognizerOptions.class,
            module.getScriptTextRecognizerOptions("Klingon")
        );
    }

    // ═════════════════════════════════════════════════════════════════════════
    // recognize() — succès et erreur
    // ═════════════════════════════════════════════════════════════════════════

    @Test
    public void recognize_invalidUrl_rejectsPromise() {
        // Une URL manifestement invalide doit appeler promise.reject()
        module.recognize("not_a_valid_url_%%%", "Latin", mockPromise);

        // On laisse un tick au thread background pour exécuter
        try { Thread.sleep(300); } catch (InterruptedException ignored) {}

        verify(mockPromise, atLeastOnce()).reject(eq("Text recognition failed"), any(Exception.class));
        verify(mockPromise, never()).resolve(any());
    }
}
