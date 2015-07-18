TYPES = {
    SUCCESS: 'success',
    ERROR: 'error',
    WARNING: 'warning',
    INFO: 'info'
};

var MessageContainerView = Backbone.View.extend({
    post: function(message, type, timeout) {
        timeout = timeout || 5000;

        var messageView = new Messageview({
            message: message,
            type: type,
            timeout: timeout
        });

        this.$el.prepend(messageView.render());
    }
});

var Messageview = Backbone.View.extend({
    ICONS: {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-warning',
        info: 'fa-info-circle'
    },

    template: require('../templates/message'),

    events: {
        'click': 'remove'
    },

    initialize: function(options) {
        _.bindAll(this, 'remove');

        this.message = options.message;
        this.type = options.type || TYPE.INFO;
        this.timeout = options.timeout || timeout;
    },

    render: function() {
        var icon = this.ICONS[this.type];

        this.$el.html(this.template({
            msg: this.message,
            type: this.type,
            icon: icon
        }));

        var self = this;
        this.to = setTimeout(function() {
            self.remove();
        }, this.timeout);

        return this.$el;
    },

    remove: function() {
        if(this.to) {
            clearTimeout(this.to);
        }

        var self = this;
        this.$el.css('-webkit-animation', 'fadeout .25s');
        this.$el.bind('webkitAnimationEnd', function() {
            self.$el.remove();
        });
    }
});

module.exports = {
    TYPES: TYPES,
    MessageContainerView: MessageContainerView
}
