// import CONFIG from '@/config'
// Cookie过期时间：默认三个小时（与后台必须一致）
// export const CookieExpires = parseFloat(CONFIG.MEMBER_COOKIE_EXPIRES) / 24

export default {
  setCookie: function(cname, cvalue, exdays = 30) {
    var d = new Date()
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000)
    var expires = 'expires=' + d.toUTCString()
    if (process.env.NODE_ENV === 'production') {
      document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/; domain=.yyjzt.com;'
    } else {
      document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/;'
    }
    console.log(document.cookie)
  },
  getCookie: function(cname) {
    var name = cname + '='
    var ca = document.cookie.split(';')
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i]
      while (c.charAt(0) === ' ') c = c.substring(1)
      if (c.indexOf(name) !== -1) return c.substring(name.length, c.length)
    }
    return ''
  },
  // 清除cookie
  clearCookie: function() {
    this.setCookie('username', '', -1)
  },
  // 删除cookie
  removeCookie: function(cookieName) {
    this.setCookie(cookieName, '', -1)
  }
}
