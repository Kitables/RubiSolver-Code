var serial = require('./serial');

var DetectorView = Backbone.View.extend({
    STATUS_LOOKING: 'looking',
    STATUS_FOUND: 'found',
    STATUS_NOT_FOUND: 'not_found',

    TEMPLATES: {
        looking: require('../templates/detector-looking'),
        found: require('../templates/detector-found'),
        not_found: require('../templates/detector-not-found')
    },

    className: 'detector',

    events: {
        'click .search-button': 'search'
    },

    initialize: function() {
        _.bindAll(this, 'search');

        this.status = this.STATUS_LOOKING;
    },

    search: function() {
        var self = this;
        this.status = this.STATUS_LOOKING;
        this.render();

        serial.find().then(function(port) {
            self.port = port;
            self.status = self.STATUS_FOUND;
            self.render();

            var disconnectFn = function() {
                self.trigger('notfound');
                self.status = self.STATUS_NOT_FOUND;
                self.render();
            }

            port.on('error', function() {
                disconnectFn();
            });

            port.on('close', function() {
                disconnectFn();
            });

            self.trigger('found', port);
        }).catch(function() {
            self.status = self.STATUS_NOT_FOUND;
            self.render();

            self.trigger('notfound');
        });
    },

    render: function() {
        this.$el.html('');

        var tpl = this.TEMPLATES[this.status];
        this.$el.html(tpl());
    }
});

var CommView = Backbone.View.extend({
    template: require('../templates/comm'),

    port: null,

    events: {
        'keyup .msg': 'validate',
        'click .send-button': 'send'
    },

    initialize: function() {
        _.bindAll(this, 'validate', 'send');
    },

    setPort: function(port) {
        this.port = port;

        this.validate();
    },

    render: function() {
        this.$el.html(this.template());
        this.validate();
    },

    validate: function(e) {
        if(e) {
            e.stopPropagation();
        }

        var valid = this.$('.msg').val() !== '' && this.port;
        this.$('.send-button').prop('disabled', !valid);
    },

    setMsg: function(msg) {
        this.$('.msg').val(msg);
        this.validate();
    },

    send: function() {
        if(this.port) {
            var instructions = this.$('.msg').val();
            serial.sendInstructions(this.port, instructions);
        }
    }
});

module.exports = {
    DetectorView: DetectorView,
    CommView: CommView
};
