const CustomError = function SpecifiedError(message) {
    this.name = 'CustomError';
    this.message = message || '';
    this.stack = (new Error()).stack;
};

CustomError.prototype = new Error();
CustomError.prototype.constructor = CustomError;

export default CustomError;