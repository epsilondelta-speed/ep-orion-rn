// -------- src/config.ts
import type { RuntimeMetrics } from './types';
import { Platform } from 'react-native';
import { tryRequire } from './utils';

let rnVersion: string | undefined;

// RN 0.78+ exposes PlatformConstants.reactNativeVersion
const PlatformConstants = tryRequire<any>('react-native/Libraries/Utilities/PlatformConstants');
if (PlatformConstants?.reactNativeVersion) {
  const v = PlatformConstants.reactNativeVersion;
  rnVersion = [v.major, v.minor, v.patch].filter(x => x != null).join('.');
}

// Fallback older path
if (!rnVersion) {
  const RNVersion = tryRequire<any>('react-native/Libraries/Core/ReactNativeVersion');
  if (RNVersion?.version) {
    const v = RNVersion.version;
    rnVersion = [v.major, v.minor, v.patch].filter(x => x != null).join('.');
  }
}

export const BASE_META: RuntimeMetrics = {
  platform: Platform.OS as 'ios' | 'android',
  rnVersion,
};
