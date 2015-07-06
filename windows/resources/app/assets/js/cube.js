var COLORS = {
    RED: {
        key: 'R',
        className: 'cubie-red',
        name: 'RED'
    },
    ORANGE: {
        key: 'O',
        className: 'cubie-orange',
        name: 'ORANGE'
    },
    YELLOW: {
        key: 'Y',
        className: 'cubie-yellow',
        name: 'YELLOW'
    },
    GREEN: {
        key: 'G',
        className: 'cubie-green',
        name: 'GREEN'
    },
    BLUE: {
        key: 'B',
        className: 'cubie-blue',
        name: 'BLUE'
    },
    WHITE: {
        key: 'W',
        className: 'cubie-white',
        name: 'WHITE'
    }
};

var CubeControlView = Backbone.View.extend({
    events: {
        'click #clear': 'clear',
        'click #solve': 'solve'
    },

    initialize: function() {
        _.bindAll(this, 'clear', 'solve');
    },

    clear: function() {
        this.trigger('clear');
    },

    solve: function() {
        this.trigger('solve');
    },

    spin: function() {
        this.$('#solve i').addClass('fa-spin');
        this.$('#solve').prop('disabled', true)
        this.$('#clear').prop('disabled', true);
        this.$('#solve .text').text('WORKING');
    },

    stop: function() {
        this.$('#solve i').removeClass('fa-spin');
        this.$('#solve').prop('disabled', false);
        this.$('#clear').prop('disabled', false);
        this.$('#solve .text').text('SOLVE');
    }
});

var CubeView = Backbone.View.extend({
    template: require('../templates/cube'),

    initialize: function() {
        this.setActiveColor(COLORS.RED);
        this.initSides();
    },

    initSides: function() {
        this.sides = {
            top: new CubeSideView({
                title: 'TOP',
                key: 'U',
                className: 'side offset'
            }),
            left: new CubeSideView({
                title: 'LEFT',
                key: 'L'
            }),
            front: new CubeSideView({
                title: 'FRONT',
                key: 'F'
            }),
            right: new CubeSideView({
                title: 'RIGHT',
                key: 'R'
            }),
            back: new CubeSideView({
                title: 'BACK',
                key: 'B'
            }),
            bottom: new CubeSideView({
                title: 'BOTTOM',
                key: 'D',
                className: 'side offset'
            }),
        };
    },

    render: function() {
        this.$el.html(this.template());

        this.$('.top').html(this.sides.top.render());

        this.$('.middle').html('').append(
            this.sides.left.render(),
            this.sides.front.render(),
            this.sides.right.render(),
            this.sides.back.render()
        );
        this.$('.bottom').html(this.sides.bottom.render());
    },

    setActiveColor: function(color) {
        for(var sideName in this.sides) {
            this.sides[sideName].setActiveColor(color);
        }
    },

    clear: function() {
        for(var sideName in this.sides) {
            this.sides[sideName].clear();
        }
    },

    value: function() {
        var order = ['top', 'bottom', 'front', 'back', 'left', 'right'];

        var self = this;
        return _.map(order, function(sideName) {
            var side = self.sides[sideName];

            return side.key + ':' + side.value();
        }).join(' ');
    }
});

var CubeSideView = Backbone.View.extend({
    template: require('../templates/cube-side'),

    className: 'side',

    events: {
        'click .cubie': 'clickCubie'
    },

    initialize: function(options) {
        this.activeColor = COLORS.RED;

        this.title = (options.title || '').toUpperCase();
        this.key = options.key;

        this.sideData = [
            0, 0, 0,
            0, 0, 0,
            0, 0, 0
        ];

        _.bindAll(this, 'clickCubie');
    },

    render: function() {
        this.$el.html(this.template({
            title: this.title
        }));

        return this.$el;
    },

    setActiveColor: function(color) {
        this.activeColor = color;
    },

    clickCubie: function(evt) {
        var idx = parseInt($(evt.target).data('cubie'));

        this.set(idx, this.activeColor);
    },

    set: function(cubieIdx, color) {
        this.sideData[cubieIdx - 1] = color.key;

        this.$('[data-cubie=' + cubieIdx + ']')[0].className = 'cubie';
        this.$('[data-cubie=' + cubieIdx + ']').addClass(color.className);
    },

    status: function() {
        return this.sideData;
    },

    clear: function() {
        this.sideData = [
            0, 0, 0,
            0, 0, 0,
            0, 0, 0
        ];

        for(var i = 1; i < 10; i++) {
            this.$('[data-cubie=' + i + ']')[0].className = 'cubie cubie-blank';
        }
    },

    value: function() {
        return this.sideData.join('');
    }
});

var ColorPickerView = Backbone.View.extend({
    tagName: 'span',

    template: require('../templates/color-picker'),

    events: {
        'click .cubie-picker': 'onClick'
    },

    keyMap: {
        82: COLORS.RED,
        79: COLORS.ORANGE,
        89: COLORS.YELLOW,
        71: COLORS.GREEN,
        66: COLORS.BLUE,
        87: COLORS.WHITE
    },

    initialize: function(options) {
        _.bindAll(this, 'onClick');

        var self = this;
        $(window).on('keyup', function(evt) {
            var color = self.keyMap[evt.which];

            if(color) {
                self.select(color);
            }
        });
    },

    render: function() {
        this.$el.html(this.template());
    },

    onClick: function(evt) {
        var target = $(evt.target);
        var color = COLORS[target.data('color')];

        this.select(color);
    },

    select: function(color) {
        var target = this.$('[data-color=\'' + color.name + '\']');

        this.$('.cubie-picker').removeClass('selected');
        target.addClass('selected');

        this.trigger('color', color);
    }
});

module.exports = {
    COLORS: COLORS,
    CubeControlView: CubeControlView,
    CubeView: CubeView,
    ColorPickerView: ColorPickerView
}
