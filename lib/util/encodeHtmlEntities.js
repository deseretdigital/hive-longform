module.exports = function encodeHtmlEntities(str) {
  const buf = [];
  for (let i=str.length-1;i>=0;i--) {
    buf.unshift(['&#', str[i].charCodeAt(), ';'].join(''));
  }
  return buf.join('');
};
