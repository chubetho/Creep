export const PlatformClassifier = {
  WINDOWS: 'Windows',
  LINUX: 'Linux',
  APPLE: 'Apple',
  OTHER: 'Other',
} as const

export type PlatformClassifierValue = typeof PlatformClassifier[keyof typeof PlatformClassifier]
