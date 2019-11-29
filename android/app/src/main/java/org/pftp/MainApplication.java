package org.pftp;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.horcrux.svg.SvgPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.imagepicker.ImagePickerPackage;
import com.reactnativecommunity.rnpermissions.RNPermissionsPackage;
import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.swmansion.reanimated.ReanimatedPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.inprogress.reactnativeyoutube.ReactNativeYouTube;
//import com.taessina.paypal.RNPaypalWrapperPackage;
//import com.gettipsi.stripe.StripeReactPackage;

import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
// import com.reactlibrary.RNTooltipsPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
            new SvgPackage(),
            new RNDeviceInfo(),
            new ImagePickerPackage(),
            new RNPermissionsPackage(),
            new RNI18nPackage(),
            new AsyncStoragePackage(),
            new ReanimatedPackage(),
            new RNGestureHandlerPackage(),
            new ReactNativeYouTube()
            //new RNPaypalWrapperPackage(),
           // new StripeReactPackage()
          //  new RNTooltipsPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
