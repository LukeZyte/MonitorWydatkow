import * as dotenv from "dotenv";

// initialize dotenv
dotenv.config();

const navColor = "black";
export default ({ config }) => ({
  ...config,
  name: "Monitor Wydatkow",
  slug: "MonitorWydatkow",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon2_mw.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/splash2_mw.png",
    resizeMode: "contain",
    backgroundColor: "#0c0e22",
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.lukezyte.MonitorWydatkow",
  },
  android: {
    backgroundColor: "black",

    softwareKeyboardLayoutMode: "pan",
    adaptiveIcon: {
      foregroundImage: "./assets/icon2_mw_trans.png",
      backgroundColor: "#0c0e22",
    },
    package: "com.lukezyte.MonitorWydatkow",
  },
  web: {
    favicon: "./assets/favicon.png",
  },
  extra: {
    eas: {
      projectId: "616e3341-fbb8-47bd-bb96-923b677f78f6",
    },
  },
  androidStatusBar: {
    barStyle: "light-content",
    backgroundColor: "#0c0e22",
  },
  androidNavigationBar: {
    backgroundColor: navColor,
  },
});
