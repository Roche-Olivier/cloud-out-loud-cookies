var atob = require('atob');

exports._set_cookie_values = function(user_object, pjson) {
    var wfe_name = process.env.BASE_SERVER_URL + process.env.APP_BASE_PATH
    var app_data = {
        APP_VERSION: pjson.version,
        API_SITE_URL: process.env.API_URL_BASE_PATH,
        WFE_SITE_URL: wfe_name,
        API_SITE_TOKEN: process.env.API_URL_BASE_PATH_TOKEN,
        APP_USER: user_object,
        APP_ENV: process.env.APP_ENV,
        APP_NAME: pjson.name,
        APP_DESCRIPTION: pjson.description,
    }
    return app_data
}
exports._get_cookie_values = function(req) {
    var cookies = req.headers.cookie
    cookie_array = cookies.split(';')
    for (let index = 0; index < cookie_array.length; index++) {
        const cookie_item = cookie_array[index];
        // console.log(cookie_item)
        var cookie_parts = cookie_item.split('=')
        // console.log(cookie_parts)
        var cookie_name = cookie_parts[0].trim().toString()
        if (cookie_name === process.env.JWT_COOKIE_NAME) {
            var encrypted_data = cookie_parts[1].trim().toString()
            var unencrypted_data = encrypted_data.split('.')
            var alg = unencrypted_data[0]
            var data_string = unencrypted_data[1]
            var key = unencrypted_data[2]
            var data_object = atob(data_string);
            var json_object = JSON.parse(data_object)
        }

    }
    return json_object
}
