package org.pftp;

import android.app.Application;

import com.facebook.react.ReactApplication;
import android.content.Context;
import com.facebook.react.PackageList;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
//import com.taessina.paypal.RNPaypalWrapperPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.bugsnag.BugsnagReactNative;
import com.inprogress.reactnativeyoutube.ReactNativeYouTube;
//import com.gettipsi.stripe.StripeReactPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.imagepicker.ImagePickerPackage;
import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
import com.horcrux.svg.SvgPackage;

import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
// import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import java.lang.reflect.InvocationTargetException;
// import com.reactlibrary.RNTooltipsPackage;

// import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      
    }

    @Override
    protected List<ReactPackage> getPackages() {
      @SuppressWarnings("UnnecessaryLocalVariable")
      List<ReactPackage> packages = new PackageList(this).getPackages();
      // Packages that cannot be autolinked yet can be added manually here, for example:
      // packages.add(new MyReactNativePackage());
      return packages;
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
    initializeFlipper(this); // Remove this line if you don't want Flipper enabled
  }
}

/**
* Loads Flipper in React Native templates.
*
* @param context
*/
private static void initializeFlipper(Context context) {
  if (BuildConfig.DEBUG) {
    try {
      /*
        We use reflection here to pick up the class that initializes Flipper,
      since Flipper library is not available in release mode
      */
      Class<?> aClass = Class.forName("com.facebook.flipper.ReactNativeFlipper");
      aClass.getMethod("initializeFlipper", Context.class).invoke(null, context);
    } catch (ClassNotFoundException e) {
      e.printStackTrace();
    } catch (NoSuchMethodException e) {
      e.printStackTrace();
    } catch (IllegalAccessException e) {
      e.printStackTrace();
    } catch (InvocationTargetException e) {
      e.printStackTrace();
    }
  }
}