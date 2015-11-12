/* jshint strict: true */
/* global console, require, module, process */
var Message = (function () {
    function Message(code, message, fields) {
        if (code === void 0) { code = 0; }
        if (message === void 0) { message = ''; }
        if (fields === void 0) { fields = []; }
        this.code = code;
        this.message = message;
        this.fields = fields;
    }
    return Message;
})();
module.exports.Message = Message;
var Channel = (function () {
    function Channel(id, desc, href, rel) {
        if (id === void 0) { id = null; }
        if (desc === void 0) { desc = ''; }
        if (href === void 0) { href = ''; }
        if (rel === void 0) { rel = ''; }
        this.id = id;
        this.desc = desc;
        this.href = href;
        this.rel = rel;
    }
    return Channel;
})();
module.exports.Channel = Channel;
//# sourceMappingURL=model.js.map