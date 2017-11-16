let toastr = require('toastr');
export function toastrNotification(type, message, overloadOptions) {
    // type有4种，success、info、warning、error
    toastr.options = {
        "debug"            : false,
        "newestOnTop"      : false,
        "positionClass"    : "toast-top-center",
        "preventDuplicates": true,
        "onclick"          : null,
        "showDuration"     : "300",
        "hideDuration"     : "1000",
        "timeOut"          : "3000",
        "extendedTimeOut"  : "1000",
        "showEasing"       : "swing",
        "hideEasing"       : "linear",
        "showMethod"       : "fadeIn",
        "hideMethod"       : "fadeOut"
    };

    if (typeof overloadOptions === 'object') {
        for (var i in overloadOptions) {
            toastr.options[i] = overloadOptions[i];
        }
    }

    return toastr[type](message);
}