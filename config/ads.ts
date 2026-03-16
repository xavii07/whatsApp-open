import { Platform } from "react-native";
import { TestIds } from "react-native-google-mobile-ads";

const IS_DEV = __DEV__;

const PROD_BANNER_ID =
  process.env.EXPO_PUBLIC_ADMOB_BANNER_ID ??
  "ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX";

const PROD_INTERSTITIAL_ID =
  process.env.EXPO_PUBLIC_ADMOB_INTERSTITIAL_ID ??
  "ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX";

export const AD_UNIT_IDS = {
  BANNER: IS_DEV ? TestIds.BANNER : PROD_BANNER_ID,
  INTERSTITIAL: IS_DEV ? TestIds.INTERSTITIAL : PROD_INTERSTITIAL_ID,
};

export const SHOULD_RENDER_ADS = Platform.OS !== "web";
