// init globals
$ = require('jquery');
_ = require('underscore');
Backbone = require('backbone');
Handlebars = require('handlebars');
Backbone.$ = $;

var cube = require('./dist/js/cube');
var rubisolver = require('./dist/js/rubisolver');
var messages = require('./dist/js/message');
var translate = require('./dist/js/solver/translate');

$(document).ready(function() {
    var messagesView = new messages.MessageContainerView({
        el: '#messages'
    });

    var cubeControlView = new cube.CubeControlView({
        el: $('#cube_controls')
    });

    var commView = new rubisolver.CommView({
        el: '#comm'
    });
    commView.render();

    var worker = new Worker('dist/js/solver/kcube.js');
    worker.addEventListener('message', function(e) {
        var msg = e.data;

        if(msg.status === true) {
            messagesView.post('Solved!', messages.TYPES.SUCCESS);
            commView.setMsg(translate(msg.result));
        } else {
            messagesView.post(msg.result, messages.TYPES.ERROR);
        }

        cubeControlView.stop();
    });
    worker.postMessage();

    var colorPickerView = new cube.ColorPickerView({
        el: $('.pickers')
    });
    colorPickerView.render();

    var cubeView = new cube.CubeView({
        el: $('.cube')
    });
    cubeView.render();

    cubeControlView.on('clear', function() {
        cubeView.clear();
    });

    cubeControlView.on('solve', function() {
        cubeControlView.spin();

        var val = cubeView.value();
        //var val = "U:WWRYOOGBY D:BWROROYYR F:WGORWBOGG B:WRORBBWOR L:YWOYYGBBG R:BGGRGYBWY";
        worker.postMessage(val);
    });

    colorPickerView.on('color', function(color) {
        cubeView.setActiveColor(color);
    });

    var detector = new rubisolver.DetectorView({
        el: '#detector'
    });

    detector.on('found', function(port) {
        commView.setPort(port);
    });
    detector.on('notfound', function() {
        commView.setPort(null);
    });

    detector.search();
});
