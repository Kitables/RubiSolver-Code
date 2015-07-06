var serialport = require('serialport'),
    q = require('q');

module.exports = {
    COMMAND_HANDSHAKE: 'H',
    COMMAND_INSTRUCTIONS: 'I',
    RESPONSE_ACK: 'A',

    find: function() {
        var self = this;

        var deferred = q.defer();

        var failures = 0;
        var ports = this.list().then(function(ports) {

            ports.forEach(function(port) {
                self.handshake(port.comName).then(function(port) {
                    deferred.resolve(port);
                }).catch(function() {
                    failures++;

                    if(failures === ports.length) {
                        deferred.reject();
                    }
                });
            });
        });

        return deferred.promise;
    },

    list: function() {
        var deferred = q.defer();

        serialport.list(function(err, ports) {
            if(err) {
                deferred.reject();
                return;
            }

            deferred.resolve(ports);
        });

        return deferred.promise;
    },

    handshake: function(port) {
        var to = null;
        var writeTimeout = 5000;
        var timeout = 2000;
        var deferred = q.defer();
        var sp = new serialport.SerialPort(port, {
            baudrate: 9600
        }, false);
        var answered = false;

        var self = this;
        sp.open(function(err) {
            if(err) {
                deferred.reject();
                return;
            }

            sp.on('data', function(data) {
                data = data.toString();
                answered = true;

                if(to) {
                    clearTimeout(to)
                }

                if(data === self.RESPONSE_ACK) {
                    deferred.resolve(sp);
                } else {
                    deferred.reject();
                    sp.close();
                }
            });

            sp.on('error', function(err) {
                console.log(err);
                sp.close();
                deferred.reject();
            });

            setTimeout(function() {
                sp.write(self.COMMAND_HANDSHAKE, function(err, results) {
                    if(err) {
                        deferred.reject();
                        sp.close();
                        return;
                    }

                    sp.drain(function(err) {
                        if(err) {
                            deferred.reject();
                            sp.close();
                            return;
                        }

                        to = setTimeout(function() {
                            if(!answered) {
                                deferred.reject();
                                sp.close();
                            }
                        }, timeout);
                    });
                });
            }, writeTimeout);
        });

        return deferred.promise;
    },

    sendInstructions: function(sp, instructions) {
        var totalLen = instructions.length + 2;

        var buffer = new Buffer(totalLen);
        buffer.write(this.COMMAND_INSTRUCTIONS, 0, 1);
        buffer.writeIntLE(instructions.length, 1, 1);
        buffer.write(instructions, 2, instructions.length);

        var deferred = q.defer();
        sp.write(buffer, function(err) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve();
            }
        });

        return deferred.promise;
    }
};
