/**
 * Set cookie.
 * @param {String} name
 * @param {String} value
 * @param {Number} days
 * @returns Void
 */
const setCookie = (name, value, days) => {
  var expires = '';
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = name + '=' + (value || '') + expires + '; path=/';
};

/**
 * Get cookie data.
 * @param {String} name
 * @returns {String|Null}|
 */
const getCookie = name => {
  var nameEQ = name + '=';
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0)
      return c.substring(nameEQ.length, c.length);
  }
  return null;
};

/**
 * Erase cookie value
 * @param {String} name
 */
const eraseCookie = name => {
  document.cookie = name + '=; Max-Age=-99999999';
};
