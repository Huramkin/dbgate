const crypto = require('crypto');
const simpleEncryptor = require('simple-encryptor');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');

const { datadir } = require('./directories');
const { encryptionKeyArg } = require('./processArgs');

const OLD_DEFAULT_KEY = 'mQAUaXhavRGJDxDTXSCg7Ej0xMmGCrx6OKA07DIMBiDcYYkvkaXjTAzPUEHEHEf9';

let _encryptionKey = null;

function migrateOldKeyFile(keyFile) {
  try {
    const encryptedData = fs.readFileSync(keyFile, 'utf-8');
    if (/^[0-9a-f]{64}$/i.test(encryptedData.trim())) {
      return null;
    }
    const oldEncryptor = simpleEncryptor.createEncryptor(OLD_DEFAULT_KEY);
    const data = oldEncryptor.decrypt(encryptedData);
    if (data && data.encryptionKey) {
      fs.writeFileSync(keyFile, data.encryptionKey, 'utf-8');
      return data.encryptionKey;
    }
  } catch (err) {
    // not an old format file
  }
  return null;
}

function loadEncryptionKey() {
  if (encryptionKeyArg) {
    return encryptionKeyArg;
  }

  if (process.env.DBGATE_ENCRYPTION_KEY) {
    _encryptionKey = process.env.DBGATE_ENCRYPTION_KEY;
    return _encryptionKey;
  }

  if (_encryptionKey) {
    return _encryptionKey;
  }

  const keyFile = path.join(datadir(), '.key');

  if (!fs.existsSync(keyFile)) {
    const newKey = crypto.randomBytes(32).toString('hex');
    fs.writeFileSync(keyFile, newKey, 'utf-8');
    _encryptionKey = newKey;
    return _encryptionKey;
  }

  const fileContent = fs.readFileSync(keyFile, 'utf-8').trim();

  if (/^[0-9a-f]{64}$/i.test(fileContent)) {
    _encryptionKey = fileContent;
    return _encryptionKey;
  }

  const migrated = migrateOldKeyFile(keyFile);
  if (migrated) {
    _encryptionKey = migrated;
    return _encryptionKey;
  }

  const newKey = crypto.randomBytes(32).toString('hex');
  fs.writeFileSync(keyFile, newKey, 'utf-8');
  _encryptionKey = newKey;
  return _encryptionKey;
}

async function loadEncryptionKeyFromExternal(storedValue, setStoredValue) {
  if (process.env.DBGATE_ENCRYPTION_KEY) {
    setEncryptionKey(process.env.DBGATE_ENCRYPTION_KEY);
    return;
  }

  if (!storedValue) {
    const newKey = crypto.randomBytes(32).toString('hex');
    await setStoredValue(newKey);
    setEncryptionKey(newKey);
    return;
  }

  if (/^[0-9a-f]{64}$/i.test(storedValue.trim())) {
    setEncryptionKey(storedValue.trim());
    return;
  }

  try {
    const oldEncryptor = simpleEncryptor.createEncryptor(OLD_DEFAULT_KEY);
    const data = oldEncryptor.decrypt(storedValue);
    if (data && data.encryptionKey) {
      await setStoredValue(data.encryptionKey);
      setEncryptionKey(data.encryptionKey);
      return;
    }
  } catch (err) {
    // not old format
  }

  const newKey = crypto.randomBytes(32).toString('hex');
  await setStoredValue(newKey);
  setEncryptionKey(newKey);
}

let _encryptor = null;

function getInternalEncryptor() {
  if (_encryptor) {
    return _encryptor;
  }
  _encryptor = simpleEncryptor.createEncryptor(loadEncryptionKey());
  return _encryptor;
}

function encryptPasswordString(password) {
  if (password && !password.startsWith('crypt:')) {
    return 'crypt:' + getInternalEncryptor().encrypt(password);
  }
  return password;
}

function decryptPasswordString(password) {
  if (password && password.startsWith('crypt:')) {
    return getInternalEncryptor().decrypt(password.substring('crypt:'.length));
  }
  return password;
}

function encryptObjectPasswordField(obj, field, encryptor = null) {
  if (obj && obj[field] && !obj[field].startsWith('crypt:')) {
    return {
      ...obj,
      [field]: 'crypt:' + (encryptor || getInternalEncryptor()).encrypt(obj[field]),
    };
  }
  return obj;
}

function decryptObjectPasswordField(obj, field, encryptor = null) {
  if (obj && obj[field] && obj[field].startsWith('crypt:')) {
    return {
      ...obj,
      [field]: (encryptor || getInternalEncryptor()).decrypt(obj[field].substring('crypt:'.length)),
    };
  }
  return obj;
}

const fieldsToEncrypt = ['password', 'sshPassword', 'sshKeyfilePassword', 'connectionDefinition'];
const additionalFieldsToMask = [
  'databaseUrl',
  'server',
  'port',
  'user',
  'sshBastionHost',
  'sshHost',
  'sshKeyFile',
  'sshLogin',
  'sshMode',
  'sshPort',
  'sslCaFile',
  'sslCertFilePassword',
  'sslKeyFile',
  'sslRejectUnauthorized',
  'secretAccessKey',
  'accessKeyId',
  'endpoint',
  'endpointKey',
];

function encryptConnection(connection, encryptor = null) {
  if (connection.passwordMode != 'saveRaw') {
    for (const field of fieldsToEncrypt) {
      connection = encryptObjectPasswordField(connection, field, encryptor);
    }
  }
  return connection;
}

function maskConnection(connection) {
  if (!connection) return connection;
  return _.omit(connection, [...fieldsToEncrypt, ...additionalFieldsToMask]);
}

function decryptConnection(connection) {
  for (const field of fieldsToEncrypt) {
    connection = decryptObjectPasswordField(connection, field);
  }
  return connection;
}

function encryptUser(user) {
  if (user.encryptPassword) {
    user = encryptObjectPasswordField(user, 'password');
  }
  return user;
}

function decryptUser(user) {
  user = decryptObjectPasswordField(user, 'password');
  return user;
}

function pickSafeConnectionInfo(connection) {
  if (process.env.LOG_CONNECTION_SENSITIVE_VALUES) {
    return connection;
  }
  return _.mapValues(connection, (v, k) => {
    if (k == 'engine' || k == 'port' || k == 'authType' || k == 'sshMode' || k == 'passwordMode') return v;
    if (v === null || v === true || v === false) return v;
    if (v) return '***';
    return undefined;
  });
}

function setEncryptionKey(encryptionKey) {
  _encryptionKey = encryptionKey;
  _encryptor = null;
  global.ENCRYPTION_KEY = encryptionKey;
}

function getEncryptionKey() {
  return _encryptionKey;
}

function generateTransportEncryptionKey() {
  return crypto.randomBytes(32).toString('hex');
}

function createTransportEncryptor(encryptionKey) {
  return simpleEncryptor.createEncryptor(encryptionKey);
}

function recryptObjectPasswordField(obj, field, decryptEncryptor, encryptEncryptor) {
  if (obj && obj[field] && obj[field].startsWith('crypt:')) {
    return {
      ...obj,
      [field]: 'crypt:' + encryptEncryptor.encrypt(decryptEncryptor.decrypt(obj[field].substring('crypt:'.length))),
    };
  }
  return obj;
}

function recryptObjectPasswordFieldInPlace(obj, field, decryptEncryptor, encryptEncryptor) {
  if (obj && obj[field] && obj[field].startsWith('crypt:')) {
    obj[field] = 'crypt:' + encryptEncryptor.encrypt(decryptEncryptor.decrypt(obj[field].substring('crypt:'.length)));
  }
}

function recryptConnection(connection, decryptEncryptor, encryptEncryptor) {
  for (const field of fieldsToEncrypt) {
    connection = recryptObjectPasswordField(connection, field, decryptEncryptor, encryptEncryptor);
  }
  return connection;
}

function recryptUser(user, decryptEncryptor, encryptEncryptor) {
  user = recryptObjectPasswordField(user, 'password', decryptEncryptor, encryptEncryptor);
  return user;
}

module.exports = {
  loadEncryptionKey,
  encryptConnection,
  encryptUser,
  decryptUser,
  decryptConnection,
  maskConnection,
  pickSafeConnectionInfo,
  loadEncryptionKeyFromExternal,
  getEncryptionKey,
  setEncryptionKey,
  encryptPasswordString,
  decryptPasswordString,

  getInternalEncryptor,
  recryptConnection,
  recryptUser,
  generateTransportEncryptionKey,
  createTransportEncryptor,
  recryptObjectPasswordField,
  recryptObjectPasswordFieldInPlace,
};
