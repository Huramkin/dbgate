async function getHardwareFingerprint() {
  return {};
}

async function getHardwareFingerprintHash() {
  return 'disabled';
}

async function getPublicHardwareFingerprint() {
  return { hash: 'disabled', payload: {} };
}

module.exports = {
  getHardwareFingerprint,
  getHardwareFingerprintHash,
  getPublicHardwareFingerprint,
};
