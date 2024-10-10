const os = require('os');


function getLocalIP() {
    const interfaces = os.networkInterfaces();
    for (let iface in interfaces) {
      for (let i = 0; i < interfaces[iface].length; i++) {
        const addressInfo = interfaces[iface][i];
        if (addressInfo.family === 'IPv4' && !addressInfo.internal) {
          return addressInfo.address;
        }
      }
    }
    return '127.0.0.1'; // Fallback to localhost if no IP found
  }

  const ipAddress = getLocalIP();

  module.exports = ipAddress;