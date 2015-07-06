var COMMAND = {
    FLIP: 'F',
    TURN: 'T',
    HOLD: 'H'
};

var Cube = function() {
    this.up = 'U';
    this.down = 'D';
    this.middle = ['L', 'F', 'R', 'B'];

    this.rotated = false;
};

Cube.prototype.rotateH = function() {
    if(this.rotated) {
        var el = this.middle.pop();
        this.middle.unshift(el);
    } else {
        var el = this.middle.shift();
        this.middle.push(el);
    }

    this.rotated = !this.rotated;
};

Cube.prototype.rotateV = function() {
    var oldUp = this.up;

    this.up = this.middle[1];
    this.middle[1] = this.down;
    this.down = this.middle[3];
    this.middle[3] = oldUp;
};


var translate = function(input) {
    var cube = new Cube();

    var commands = [];
    var translated = [];

    var split = input.trim().split(' ');

    _.each(split, function(token) {
        if(token.length === 2) {
            if(token[1] === '2') {
                commands.push(token[0]);
                commands.push(token[0]);
            } else {
                commands.push(token);
            }
        } else {
            commands.push(token);
        }
    });

    _.each(commands, function(face) {
        var reverse = face.length === 2;
        if(reverse) {
            face = face[0];
        }

        switch(face) {
            case cube.middle[3]:
                translated.push(COMMAND.FLIP);
                cube.rotateV();
                break;

            case cube.up:
                translated.push(COMMAND.FLIP);
                cube.rotateV();
                translated.push(COMMAND.FLIP);
                cube.rotateV();
                break;

            case cube.middle[1]:
                translated.push(COMMAND.FLIP);
                cube.rotateV();
                translated.push(COMMAND.FLIP);
                cube.rotateV();
                translated.push(COMMAND.FLIP);
                cube.rotateV();
                break;

            case cube.middle[0]:
                translated.push(COMMAND.TURN)
                cube.rotateH();

                if(!cube.rotated) {
                    translated.push(COMMAND.FLIP)
                    cube.rotateV();
                    translated.push(COMMAND.FLIP)
                    cube.rotateV();
                }

                translated.push(COMMAND.FLIP)
                cube.rotateV();
                break;

            case cube.middle[2]:
                translated.push(COMMAND.TURN)
                cube.rotateH();

                if(cube.rotated) {
                    translated.push(COMMAND.FLIP)
                    cube.rotateV();
                    translated.push(COMMAND.FLIP)
                    cube.rotateV();
                }

                translated.push(COMMAND.FLIP)
                cube.rotateV();
                break;

            default:
                break;
        }

        if(reverse == cube.rotated) {
            translated.push(COMMAND.TURN)
            cube.rotateH();
        }

        translated.push(COMMAND.HOLD);
        cube.rotated = !cube.rotated;
    });

    return translated.join(' ');
};

module.exports = translate;
