InputEngine = Class.extend({
    /**
     * A dictionary mapping ASCII key codes to string values describing
     * the action we want to take when that key is pressed.
     */
    bindings: {},

    /**
     * A dictionary mapping actions that might be taken in our game
     * to a boolean value indicating whether that action is currently being performed.
     */
    actions: {},

    listeners: [],

    init: function () {
    },

    setup: function () {
        this.bind(38, 'up');    // up arrow
        this.bind(37, 'left');  // left arrow
        this.bind(40, 'down');  // down arrow
        this.bind(39, 'right'); // right arrow
        this.bind(65, 'shoot'); // 'A' key (shoot)
        this.bind(83, 'punch'); // 'S' key (punch)

        document.addEventListener('keydown', this.onKeyDown);
        document.addEventListener('keyup', this.onKeyUp);
    },

    onKeyDown: function (event) {
        //debugger;
        var action = gInputEngine.bindings[event.keyCode];
        if (action) {
            gInputEngine.actions[action] = true;
            event.preventDefault();
        }
        return false;
    },

    onKeyUp: function (event) {
        var action = gInputEngine.bindings[event.keyCode];
        if (action) {
            gInputEngine.actions[action] = false;

            var listeners = gInputEngine.listeners[action];
            if (listeners) {
                for (var i = 0; i < listeners.length; i++) {
                    var listener = listeners[i];
                    listener();
                }
            }
            event.preventDefault();
        }
        return false;
    },

    /**
     * The bind function takes an ASCII keycode and a string representing
     * the action to take when that key is pressed.
     */
    bind: function (key, action) {
        this.bindings[key] = action;
    },

    addListener: function (action, listener) {
        this.listeners[action] = this.listeners[action] || new Array();
        this.listeners[action].push(listener);
    },

    removeAllListeners: function () {
        this.listeners = [];
    }
});

gInputEngine = new InputEngine();