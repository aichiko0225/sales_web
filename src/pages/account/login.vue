<template>
    <div class="login-container">
      <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">

        <div class="title-container">
          <h3 class="title">系统登录</h3>
        </div>
        <el-form-item prop="username">
          <span class="svg-container svg-container_login">
            <icon-svg icon-class="user" />
          </span>
          <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="账号" autofocus="true"/>
        </el-form-item>

        <el-form-item prop="password">
          <span class="svg-container">
            <icon-svg icon-class="password" />
          </span>
          <el-input name="password" :type="passwordType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on"
            placeholder="密码" />
          <span class="show-pwd" @click="showPwd">
            <icon-svg v-bind:icon-class="eyeSvg" />
          </span>
        </el-form-item>

        <el-button type="primary" style="width:100%;margin-bottom:30px;" :loading="loading" @click.native.prevent="handleLogin">登录</el-button>
        <!-- <el-button class="thirdparty-button" type="primary" @click="showDialog=true">{{$t('login.thirdparty')}}</el-button> -->
      </el-form>
    </div>
</template>

<script>
import cookie from '../../utils/cookie.js'
// import qs from 'qs'

export default {
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.length <= 0) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能少于6位'))
      } else {
        callback()
      }
    }
    return {
      // message: '密码不能少于6位数',
      message: '',
      showMessage: false,
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      eyeSvg: 'eye',
      disabled: true,
      loading: false
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
        this.eyeSvg = 'eye_open'
      } else {
        this.passwordType = 'password'
        this.eyeSvg = 'eye'
      }
    },
    handleLogin() {
      console.log(this.loginForm.username, this.loginForm.password)
      // Make a request for a user with a given ID
      if (this.loginForm.username.length > 0 && this.loginForm.password.length >= 6) {
        var that = this
        // URLSearchParams对象是为了让参数以form data形式
        // var params = new URLSearchParams()
        // params.append('jdmc', 'hello jdmc你好')
        // params.append('jddm', '2')

        let params = {
          username: this.loginForm.username,
          password: this.loginForm.password
        }

        this.$http.post('/account/login', params).then(function(response) {
          // handle success
          console.log('data ===== ', response.data)
          let user_id = response.data.data.user_id
          if (user_id != null) {
            cookie.setCookie('user_id', user_id)
            that.$router.push({
              path: '/',
              params: { userId: user_id }
            })
          }
        }).catch(function(error) {
          // handle error
          console.log('error ===== ', error)
        })
      }
      
      // if (this.loginForm.username.length > 0 && this.loginForm.password.length >= 6) {
      //   cookie.setCookie('user_id', '1000')
      //   this.$router.push({
      //     path: '/',
      //     params: { userId: 123 }
      //   })
      //   console.log('lalala')
      // } else {
      //   console.log('账号密码格式不正确')
      // }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */
  $bg:#283443;
  $light_gray:#eee;
  $cursor: #fff;
  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input{
      color: $cursor;
      &::first-line {
        color: $light_gray;
      }
    }
  }
  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;
        &:-webkit-autofill {
          -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }
</style>

<style lang="scss" scoped>

$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    &_login {
      font-size: 20px;
    }
  }
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .set-language {
      color: #fff;
      position: absolute;
      top: 5px;
      right: 0px;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .thirdparty-button {
    position: absolute;
    right: 35px;
    bottom: 28px;
  }
}

</style>
