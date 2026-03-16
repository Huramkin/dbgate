function checkLicense() {
  return {
    status: 'ok',
    type: 'premium',
    isExpired: false,
    daysLeft: 99999,
  };
}

function checkLicenseKey(key) {
  return {
    status: 'ok',
    type: 'premium',
  };
}

function isProApp() {
  return true;
}

module.exports = {
  checkLicense,
  checkLicenseKey,
  isProApp,
};
