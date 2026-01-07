<template>
  <div class="app-container">
    <navcomponent></navcomponent>

    <!-- 登录容器 -->
    <div class="login-container">
      <div class="login-header">
        <div class="avatar">?</div>
        <h1>Professional Trader</h1>
        <p>Stock Trading Expert | Technical Analysis Master</p>
      </div>

      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" id="username" v-model="loginUsername" placeholder="Enter your username">
          <div v-if="usernameError" class="error-message">{{ usernameError }}</div>
        </div>
        
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="loginPassword" placeholder="Enter your password">
          <div v-if="passwordError" class="error-message">{{ passwordError }}</div>
        </div>
        
        <button type="submit" class="login-btn" :disabled="isLoggingIn">
          <span v-if="isLoggingIn" class="loading-spinner"></span>
          <span>{{ isLoggingIn ? 'Logging in...' : 'Login' }}</span>
        </button>
      </form>
      
      <div class="divider">
        <span>or</span>
      </div>
      
      <div class="signup-link">
        <p>Don't have an account? <a href="/register">Sign up now</a></p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import navcomponent from '../component/nav/nav.vue'
import{ login } from '../../api/module/web/login'
import { useUserStore } from '../../store/user'
const router = useRouter();
 const userStore = useUserStore()
// 页面数据
const homeTopTitle = 'RenderZaice Trading Platform';
const loginUsername = ref('');
const loginPassword = ref('');
const usernameError = ref('');
const passwordError = ref('');
const isLoggingIn = ref(false); // 添加登录状态变量

onMounted(() => {
  console.log(userStore.token)
  // 移除自动跳转逻辑，由路由守卫处理
  // if(userStore.token){
  //   router.push('/vip');
  // }
});
// 处理登录
const handleLogin = async () => {
  // 重置错误消息
  usernameError.value = '';
  passwordError.value = '';
  
  // 简单验证
  if (!loginUsername.value.trim()) {
    usernameError.value = 'Username is required';
    return;
  }
  
  if (!loginPassword.value.trim()) {
    passwordError.value = 'Password is required';
    return;
  }
  
  try {
    // 设置登录状态为正在登录
    isLoggingIn.value = true;
    
    // 模拟API调用
    // 在实际应用中，这里应该是真实的API请求
    // 这里使用setTimeout模拟异步操作
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // 模拟登录成功
    // 在实际应用中，这里应该根据API响应来判断
    let logindata={
        username:loginUsername.value,
        password_hash:loginPassword.value
    }
    const response = await login(logindata); // 假设登录成功
    
    if (response.success) {
       // 存储session_token到userStore
          userStore.token = response.session_token;
          userStore.userInfo=response.data;
          try {
            // 初始化用户信息
            await userStore.initUserInfo();
          } catch (userInfoError) {
            console.error('初始化用户信息失败:', userInfoError);
            // 即使获取用户信息失败，只要登录成功了也应该能进入系统
          }
      // 登录成功后跳转到VIP页面
      await userStore.initUserInfo();
      router.push('/vip');
    } else {
      // 登录失败
      alert('Login failed. Please check your username and password.');
      isLoggingIn.value = false;
    }
  } catch (error) {
    console.error('Login error:', error);
    alert('An error occurred during login. Please try again later.');
  } finally {
    // 无论成功失败，都设置登录状态为false
    isLoggingIn.value = false;
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
  --accent-color: #ffd700;
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
  color: var(--accent-color);
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
  color: var(--accent-color);
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

/* 登录容器 */
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

/* 登录头部 */
.login-header {
  text-align: center;
  margin-bottom: 30px;
}

.login-header .avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 3px solid var(--accent-color);
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 215, 0, 0.1);
  font-size: 24px;
  color: var(--accent-color);
}

.login-header h1 {
  color: var(--accent-color);
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
  margin-bottom: 20px;
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

/* 登录按钮 */
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
  position: relative;
  overflow: hidden;
}

.login-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(255, 215, 0, 0.4);
}

.login-btn:active:not(:disabled) {
  transform: translateY(0);
}

.login-btn:disabled {
  cursor: not-allowed;
  opacity: 0.8;
}

/* 加载动画 */
.loading-spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(26, 35, 50, 0.3);
  border-radius: 50%;
  border-top-color: #1a2332;
  animation: spin 0.8s ease-in-out infinite;
  margin-right: 8px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
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
  color: var(--accent-color);
  font-size: 14px;
}

/* 注册链接 */
.signup-link {
  text-align: center;
  margin-top: 20px;
}

.signup-link a {
  color: var(--accent-color);
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
    margin-bottom: 15px;
  }
  
  .form-group input {
    font-size: 13px;
    padding: 10px 12px;
  }
  
  .login-btn {
    font-size: 15px;
    padding: 11px;
  }
  
  .login-header h1 {
    font-size: 24px;
  }
  
  .login-header .avatar {
    width: 70px;
    height: 70px;
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
    font-size: 26px;
  }
  
  .login-header .avatar {
    width: 75px;
    height: 75px;
  }
}
</style>