import 'dotenv/config';

export default {
  expo: {
    name: "Cluey",
    slug: "cluey",
    scheme: "cluey",
    version: "0.0.1",
    main: "index.js",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/images/splash.png",
      resizeMode: "contain",
      backgroundColor: "#FFBF00"
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.cluey.clueyapp",
      buildNumber: "0.0.1",
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#FFBF00"
      },
      package: "com.cluey.clueyapp",
      versionCode: 1,
      googleServicesFile: "./google-services.json",
    },
    web: {
      favicon: "./assets/images/favicon.png"
    },
    "plugins": [
      [
        "expo-image-picker",
        {
          "photosPermission": "Allow Cluey to access your photos",
          "cameraPermission": "Allow Cluey to access your camera"
        }
      ],
    ],
    extra: {
      eas: {
        projectId: process.env.PROJECT_ID,
      },
      firebase: {
        apiKey: process.env.API_KEY,
        authDomain: process.env.AUTH_DOMAIN,
        projectId: process.env.PROJECT_ID,
        storageBucket: process.env.STORAGE_BUCKET,
        messagingSenderId: process.env.MESSAGING_SENDER_ID,
        appId: process.env.APP_ID,
        measurementId: process.env.MEASUREMENT_ID
      },
      google: {
        webClientId: process.env.WEB_CLIENT_ID,
        webClientSecret: process.env.WEB_CLIENT_SECRET,
        redirectUri: process.env.REDIRECT_URI,
      },
      gpt: {
        apiKey: process.env.GPT_API_KEY
      }
    }
  }
}
