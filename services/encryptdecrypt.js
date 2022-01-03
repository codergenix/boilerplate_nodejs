const Cryptr = require('cryptr');
const cryptr = new Cryptr('encryptdescrypt');

const encrypt = (text) => {
    try {
        let ecnrypttext = cryptr.encrypt(text);
        return ecnrypttext    
      } catch (err) {
        throw "Invalid data"
      }
};
const decrypt = (text) => {
    try {
        let decrypttext = cryptr.decrypt(text);
        return decrypttext 
      } 
      catch (err) 
      {
        return false
      }
};
module.exports = { encrypt, decrypt};  

