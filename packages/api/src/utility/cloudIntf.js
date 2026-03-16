const { getLogger } = require('dbgate-tools');

const logger = getLogger('cloudIntf');

async function createDbGateIdentitySession() {
  return null;
}

function startCloudTokenChecking() {}

async function startCloudFiles() {}

async function getPublicCloudFiles() {
  return [];
}

async function getPublicFileData() {
  return null;
}

async function refreshPublicFiles() {}

async function callCloudApiGet() {
  return null;
}

async function callCloudApiPost() {
  return null;
}

async function getCloudFolderEncryptor() {
  return null;
}

async function getCloudContent() {
  return null;
}

async function loadCachedCloudConnection() {
  return null;
}

async function putCloudContent() {
  return null;
}

function removeCloudCachedConnection() {}

async function readCloudTokenHolder() {
  return null;
}

async function readCloudTestTokenHolder() {
  return null;
}

async function getPublicIpInfo() {
  return { ip: 'disabled' };
}

async function getPromoWidgetData() {
  return null;
}

async function getPromoWidgetPreview() {
  return null;
}

async function getPromoWidgetList() {
  return [];
}

module.exports = {
  createDbGateIdentitySession,
  startCloudTokenChecking,
  startCloudFiles,
  getPublicCloudFiles,
  getPublicFileData,
  refreshPublicFiles,
  callCloudApiGet,
  callCloudApiPost,
  getCloudFolderEncryptor,
  getCloudContent,
  loadCachedCloudConnection,
  putCloudContent,
  removeCloudCachedConnection,
  readCloudTokenHolder,
  readCloudTestTokenHolder,
  getPublicIpInfo,
  getPromoWidgetData,
  getPromoWidgetPreview,
  getPromoWidgetList,
};
