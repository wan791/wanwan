<template>
  <div class="app-container">
    <!-- 顶部导航栏 -->
    <navcomponent></navcomponent>

    <!-- 注册容器 -->
    <div class="login-container">
      <div class="login-header">
        <div class="avatar">?</div>
        <h1>New user registration</h1>
        <p>Stock Trading Expert | Technical Analysis Master</p>
      </div>

      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <label for="username">Login name</label>
          <input type="text" id="username" v-model="username" placeholder="Enter your username" required>
          <div v-if="usernameError" class="error-message">{{ usernameError }}</div>
        </div>
        
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" placeholder="Enter your password" required>
          <div v-if="passwordError" class="error-message">{{ passwordError }}</div>
        </div>
        
        <div class="form-group">
          <label for="realname">Real name</label>
          <input type="text" id="realname" v-model="realname" placeholder="Confirm your Real name" required>
          <div v-if="realnameError" class="error-message">{{ realnameError }}</div>
        </div>
        
        <div class="form-group">
          <label for="email">E-mail</label>
          <input type="email" id="email" v-model="email" placeholder="Enter your E-mail" required>
          <div v-if="emailError" class="error-message">{{ emailError }}</div>
        </div>
        
        <div class="form-group">
          <label for="phonenumber">Mobile phone number</label>
          <input type="tel" id="phonenumber" v-model="phonenumber" placeholder="Enter your Mobile phone number" required>
          <div v-if="phonenumberError" class="error-message">{{ phonenumberError }}</div>
        </div>

        <div class="form-group">
          <label for="phonenumber">Invitation code</label>
          <input type="tel" id="invitationcode" v-model="invitationcode" placeholder="Enter Invitation code" required>
          <div v-if="invitationcodeError" class="error-message">{{ invitationcodeError }}</div>
          <div class="invitation-hint" @click="toggleContactPopup" style="cursor: pointer;"><span  style="color:chartreuse;">Contact customer service</span> to get the invitation code!</div>
        </div>
        
        <button type="submit" class="login-btn">Register now</button>
      </form>
      
      <div class="divider">
        <span>or</span>
      </div>
      
      <div class="signup-link">
        <p>I have an account? <a href="/userlogin" style="color:chartreuse;">Log in now</a></p>
      </div>
    </div>
  </div>
  <!-- Redirect Message -->
    <div class="redirect-message" v-show="showContactPopup">
        <span class="text">Redirecting to WhatsApp Community</span><span class="dots"></span>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import navcomponent from '../component/nav/nav.vue'
const router = useRouter();
import { register } from '@/api/module/web/login';
import{get_whatsapp_link} from '../../api/module/web/index'
// 页面数据
const homeTopTitle = 'RenderZaice Trading Platform';

// 表单数据
const username = ref('');
const password = ref('');
const realname = ref('');
const email = ref('');
const phonenumber = ref('');
const invitationcode = ref('');

// 错误消息
const usernameError = ref('');
const passwordError = ref('');
const realnameError = ref('');
const emailError = ref('');
const phonenumberError = ref('');
const invitationcodeError = ref('');
const showContactPopup = ref(false);
// Toggle contact popup
const toggleContactPopup = async () => {
  showContactPopup.value = !showContactPopup.value;

  const response=await get_whatsapp_link();
    if(response.success)
    {
      window.location.href = response.data;
      setTimeout(() => {
             showContactPopup.value = !showContactPopup.value;
      }, 3000);
    }
    else
    {
      showContactPopup.value = !showContactPopup.value;
    }
};
// 表单验证
const validateForm = (): boolean => {
  // 重置所有错误消息
  usernameError.value = '';
  passwordError.value = '';
  realnameError.value = '';
  emailError.value = '';
  phonenumberError.value = '';
  
  let isValid = true;
  
  // 验证用户名
  if (!username.value.trim()) {
    usernameError.value = 'Username is required';
    isValid = false;
  } else if (username.value.length < 3) {
    usernameError.value = 'Username must be at least 3 characters';
    isValid = false;
  }
  
  // 验证密码
  if (!password.value.trim()) {
    passwordError.value = 'Password is required';
    isValid = false;
  } else if (password.value.length < 6) {
    passwordError.value = 'Password must be at least 6 characters';
    isValid = false;
  }
  
  // 验证真实姓名
  if (!realname.value.trim()) {
    realnameError.value = 'Real name is required';
    isValid = false;
  }
  
  // 验证电子邮件
  if (!email.value.trim()) {
    emailError.value = 'Email is required';
    isValid = false;
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
      emailError.value = 'Please enter a valid email address';
      isValid = false;
    }
  }
  
  // 验证手机号码
  if (!phonenumber.value.trim()) {
    phonenumberError.value = 'Phone number is required';
    isValid = false;
  }
  // 验证邀请码
  if (!invitationcode.value.trim()) {
    invitationcodeError.value = 'Invitation code is required';
    isValid = false;
  }
  
  return isValid;
};

// 处理注册
const handleRegister = async () => {
  if (!validateForm()) {
    return;
  }
  
  try {
    // 模拟API调用
    // 在实际应用中，这里应该是真实的API请求
    // 这里使用setTimeout模拟异步操作
    await new Promise(resolve => setTimeout(resolve, 1000));
    // 调用注册API
    const response = await register({
      username: username.value,
      password: password.value,
      realname: realname.value,
      email: email.value,
      phonenumber: phonenumber.value,
      invitationcode: invitationcode.value
    });
    if(response.success){
      alert('Registration successful! Please log in.');
      // 注册成功后跳转到登录页面
      router.push('/userlogin');
    } else {
      // 注册失败
      alert(response.message);
    }
  } catch (error) {
    console.error('Registration error:', error);
    alert('An error occurred during registration. Please try again later.');
  }
};
</script>

<style scoped>
/* 导入Google字体 */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

/* CSS变量定义 */
:root {
  --primary-bg: #0f1419;
  --secondary-bg: #1a2332;

  --accent-hover: #ffed4e;
  --text-primary: #ffffff;
  --text-secondary: #a0a0a0;
  --text-dark: #1a2332;
  --border-color: rgba(255, 215, 0, 0.3);
  --border-hover: #ffd700;
  --shadow-color: rgba(0, 0, 0, 0.3);
}

/* 全局样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #0f1419 0%, #1a2332 100%);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #ffffff;
}

/* 光纤划过动画 */
@keyframes fiberOptic {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}

/* 顶部导航栏 */
.top-nav {
  background: rgba(26, 28, 46, 0.95);
  padding: 0.75rem 0;
  position: sticky;
  top: 0;
  z-index: 1000;
  border-bottom: 1px solid rgba(255, 215, 0, 0.1);
}

.nav-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1rem;
}

.nav-left {
  flex: 0 0 auto;
}

.nav-center {
  flex: 1;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
}

.nav-center h1 {
  color: var(#ffd700);
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
}

.nav-right {
  flex: 0 0 auto;
}

/* 返回首页按钮样式 */
.btn-back {
  background: rgba(15, 20, 25, 0.8);
  color: var(#ffd700);
  border: 2px solid rgba(255, 215, 0, 0.3);
  border-radius: 8px;
  padding: 0.5rem 1rem;
  text-decoration: none;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  font-weight: 500;
}

.btn-back:hover {
  border-color: #ffd700;
  background: rgba(255, 215, 0, 0.1);
  transform: translateY(-1px);
}

/* 注册容器 */
.login-container {
  background: rgba(26, 35, 50, 0.95);
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 450px;
  margin: auto;
  margin-top: 50px;
  margin-bottom: 50px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 215, 0, 0.2);
}

/* 注册头部 */
.login-header {
  text-align: center;
  margin-bottom: 30px;
}

.login-header .avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 3px solid var(#ffd700);
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 215, 0, 0.1);
  font-size: 24px;
  color: var(#ffd700);
}

.login-header h1 {
  color: var(#ffd700);
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 10px;
}

.login-header p {
  color: #a0a0a0;
  font-size: 14px;
}

/* 表单样式 */
.form-group {
  margin-bottom: 10px;
  transition: transform 0.3s ease;
}

.form-group:focus-within {
  transform: translateY(-2px);
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #ffffff;
  font-weight: 500;
  font-size: 14px;
}

.form-group input {
  width: 100%;
  padding: 12px 15px;
  border: 2px solid rgba(255, 215, 0, 0.3);
  border-radius: 10px;
  font-size: 14px;
  transition: all 0.3s ease;
  background: rgba(15, 20, 25, 0.8);
  color: #ffffff;
}

.form-group input:focus {
  outline: none;
  border-color: #ffd700;
  background: rgba(15, 20, 25, 0.9);
  box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.1);
}

.form-group input::placeholder {
  color: #666;
}

/* 错误消息 */
.error-message {
  color: #ff6b6b;
  font-size: 14px;
  margin-top: 5px;
}

/* 邀请码提示 */
.invitation-hint {
  color: #a0a0a0;
  font-size: 14px;
  margin-top: 15px;
  text-align: center;
  
}

/* 注册按钮 */
.login-btn {
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
  color: #1a2332;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 10px;
}

.login-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(255, 215, 0, 0.4);
}

.login-btn:active {
  transform: translateY(0);
}

/* 分隔线 */
.divider {
  text-align: center;
  margin: 25px 0;
  position: relative;
}

.divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: rgba(255, 215, 0, 0.3);
}

.divider span {
  background: rgba(26, 35, 50, 0.95);
  padding: 0 15px;
  color: var(#ffd700);
  font-size: 14px;
}

/* 登录链接 */
.signup-link {
  text-align: center;
  margin-top: 20px;
}

.signup-link a {
  color: var(#ffd700);
  text-decoration: none;
  font-weight: 500;
}

.signup-link a:hover {
  text-decoration: underline;
}

/* 响应式设计 */
@media (max-width: 480px) {
 .login-container {
    margin: 10px;
    padding: 20px 15px;
    max-width: 100%;
  }
  
  .nav-center h1 {
    font-size: 1.2rem;
  }
  
  .form-group {
    margin-bottom: 12px;
  }
  
  .form-group input {
    font-size: 13px;
    padding: 10px 12px;
  }
  
  .invitation-hint {
    font-size: 12px;
    margin-top: 10px;
  }
  
  .login-btn {
    font-size: 15px;
    padding: 11px;
  }
  
  .redirect-message {
    white-space: normal;
    width: 90%;
    max-width: 300px;
    font-size: 0.9rem;
    padding: 12px 15px;
    bottom: 20px;
  }
}

@media (max-width: 768px) {
  .nav-center {
    display: none;
  }
  
  .login-container {
    margin: 20px auto;
    padding: 25px 20px;
  }
  
  .login-header h1 {
    font-size: 24px;
  }
  
  .login-header .avatar {
    width: 70px;
    height: 70px;
  }
}

.redirect-message {
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            background: #1a1a2e;
            padding: 15px 30px;
            border-radius: 8px;
            color: #fff;
            font-size: 1rem;
            font-weight: 500;
            z-index: 10000;
            white-space: nowrap;
            overflow: hidden;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            -webkit-transform: translateX(-50%);
            -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
            will-change: transform, opacity;
        }

        .redirect-message::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, #ffd700 0%, #4361ee 100%);
            animation: progressBar 3s linear forwards;
            -webkit-animation: progressBar 3s linear forwards;
            opacity: 0.15;
        }

        .redirect-message .text {
            background: linear-gradient(90deg, #ffd700 0%, #4361ee 100%);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            animation: textGradient 3s linear forwards;
            -webkit-animation: textGradient 3s linear forwards;
        }

        .redirect-message .dots {
            display: inline-block;
            width: 24px;
        }

        .redirect-message .dots::after {
            content: '';
            animation: dots 1s infinite;
            -webkit-animation: dots 1s infinite;
        }
</style>