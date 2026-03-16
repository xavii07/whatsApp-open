import { useEffect, useRef } from "react";
import { AdEventType, InterstitialAd } from "react-native-google-mobile-ads";
import { AD_UNIT_IDS, SHOULD_RENDER_ADS } from "@/config/ads";

export function useInterstitialAd() {
  const adRef = useRef<InterstitialAd | null>(null);
  const isLoadedRef = useRef(false);

  useEffect(() => {
    if (!SHOULD_RENDER_ADS) return;

    const ad = InterstitialAd.createForAdRequest(AD_UNIT_IDS.INTERSTITIAL, {
      requestNonPersonalizedAdsOnly: true,
    });

    adRef.current = ad;

    const unsubLoaded = ad.addAdEventListener(AdEventType.LOADED, () => {
      isLoadedRef.current = true;
    });

    const unsubClosed = ad.addAdEventListener(AdEventType.CLOSED, () => {
      isLoadedRef.current = false;
      ad.load();
    });

    const unsubError = ad.addAdEventListener(AdEventType.ERROR, () => {
      isLoadedRef.current = false;
    });

    ad.load();

    return () => {
      unsubLoaded();
      unsubClosed();
      unsubError();
      adRef.current = null;
      isLoadedRef.current = false;
    };
  }, []);

  const showAd = async () => {
    if (!isLoadedRef.current || !adRef.current) return;
    isLoadedRef.current = false;
    await adRef.current.show();
  };

  return { showAd };
}
