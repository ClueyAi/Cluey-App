import 'dotenv/config';

export default {
  expo: {
    name: "Cluey",
    slug: "cluey",
    version: "0.1.0",
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
      bundleIdentifier: "com.gustavofalcao1.cluey",
      buildNumber: "0.1.0"
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#FFBF00"
      },
      package: "com.gustavofalcao1.cluey",
      versionCode: 1
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
      ]
    ],
    extra: {
      eas: {
        projectId: "b6e3ae4c-c16e-493e-a186-1b1a40a5ebb5"
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
      gpt: {
        apiKey: process.env.GPT_API_KEY
      }
    }
  }
}
