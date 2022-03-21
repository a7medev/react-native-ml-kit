// BarcodeScanningModule.java

package com.rnmlkit.barcodescanning;

import android.net.Uri;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.mlkit.vision.common.InputImage;
// import com.google.mlkit.vision.barcode.*;
import com.google.mlkit.vision.barcode.common.Barcode;
import com.google.mlkit.vision.barcode.BarcodeScanner;
import com.google.mlkit.vision.barcode.BarcodeScannerOptions;
import com.google.mlkit.vision.barcode.BarcodeScanning;
import java.io.IOException;
import java.util.List;

public class BarcodeScanningModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;

    public BarcodeScanningModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "BarcodeScanning";
    }

    @ReactMethod
    public void scan(String url, Promise promise) {
        Uri uri = Uri.parse(url);
        InputImage image;
        try {
            image = InputImage.fromFilePath(reactContext, uri);

            BarcodeScanner scanner = BarcodeScanning.getClient();
            scanner.process(image)
                    .addOnSuccessListener(new OnSuccessListener<List<Barcode>>() {
                        @Override
                        public void onSuccess(List<Barcode> barcodes) {
                            WritableArray result = Arguments.createArray();
                            for (Barcode barcode : barcodes) {
                                WritableMap map = Arguments.createMap();
                                map.putString("value", barcode.getRawValue());
                                map.putDouble("format", barcode.getFormat());
                                result.pushMap(map);
                            }
                            promise.resolve(result);
                        }
                    })
                    .addOnFailureListener(new OnFailureListener() {
                        @Override
                        public void onFailure(@NonNull Exception e) {
                            e.printStackTrace();
                            promise.reject("Barcode scanning failed", e);
                        }
                    });
        } catch (IOException e) {
            e.printStackTrace();
            promise.reject("Barcode scanning failed", e);
        }
    }
}
