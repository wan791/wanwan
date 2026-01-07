<template>
     <!-- Navigation Bar -->
    <nav class="navbar navbar-expand-lg navbar-dark mb-3">
      <div class="container">
        <a class="navbar-brand" :href="trader_profiles.home_top_title_link || '/'" :target="trader_profiles.home_top_title_link ? '_blank' : '_self'">
          <i class="bi bi-graph-up me-2"></i>
          {{ trader_profiles.home_top_title }}
        </a>
        <!-- 右侧导航项 - 大屏幕显示 -->
        <div class="navbar-nav ms-auto d-none d-lg-flex">
          <a class="nav-link" href="/" style="color: #ffd700; font-weight: 600;">
            <i class="bi bi-house me-1"></i>
            Home
          </a>
          <a class="nav-link" href="/videos" style="color: #ffd700; font-weight: 600;">
            <i class="bi bi-film me-1"></i>
            Videos
          </a>
          <a class="nav-link" href="/documents" style="color: #ffd700; font-weight: 600;">
            <i class="bi bi-file-earmark me-1"></i>
            Documents
          </a>
           
          <a class="nav-link" href="/AITools" style="color: #ffd700; font-weight: 600;">
            <i class="bi bi-robot me-1"></i>
            AI Tools
          </a>
          <a class="nav-link" href="/leaderboard" style="color: #ffd700; font-weight: 600;">
            <i class="bi bi-trophy me-1"></i>
            Leaderboard
          </a>
          <a class="nav-link" href="/vip" style="color: #ffd700; font-weight: 600;">
            <i class="bi bi-gem me-1"></i>
            Vip Center
          </a>
          
          
          <button class="btn btn-login ms-2" @click="loginto">
            <i class="bi bi-person-fill me-1"></i>{{ logintext }}
          </button>
           <button class="btn btn-login ms-2" v-if="userrole=='admin' || userrole=='superadmin'" @click="toadmin">
            <i class="bi bi-person-fill me-1"></i>Admin Panel
          </button>
        </div>
        
        <!-- 响应式菜单按钮 - 小屏幕显示 -->
        <div class="d-lg-none">
          <button class="btn btn-outline-warning me-2" type="button" data-bs-toggle="collapse" data-bs-target="#mobileMenu" aria-expanded="false" aria-controls="mobileMenu">
            <i class="bi bi-list"></i>
          </button>
        </div>
      </div>
      
      <!-- 响应式下拉菜单 -->
        <div class="collapse" id="mobileMenu">
          <div class="bg-dark p-4">
            <a class="d-block text-warning mb-3" href="/" style="text-decoration: none;">
              <i class="bi bi-house me-1"></i>
              Home
            </a>
             <a class="d-block text-warning mb-3" href="/videos" style="text-decoration: none;">
            <i class="bi bi-film me-1"></i>
            Videos
          </a>
          <a class="d-block text-warning mb-3" href="/documents" style="text-decoration: none;">
            <i class="bi bi-file-earmark me-1"></i>
            Documents
          </a>
          
            <a class="d-block text-warning mb-3" href="/AITools" style="text-decoration: none;">
              <i class="bi bi-robot me-1"></i>
              AI Tools
            </a>
          <a class="d-block text-warning mb-3" href="/leaderboard" style="text-decoration: none;">
            <i class="bi bi-trophy me-1"></i>
            Leaderboard
          </a>
          <a class="d-block text-warning mb-3" href="/vip" style="text-decoration: none;">
            <i class="bi bi-gem me-1"></i>
            Vip Center
          </a>
         
          <button class="btn btn-login w-100" @click="loginto">
            <i class="bi bi-person-fill me-1"></i>{{ logintext }}
          </button>
        </div>
      </div>
    </nav>
</template>
<script lang="ts">
export default {
    name: "navcomponent"
}
</script>
<script  setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import{ gettrader_profiles} from '../../../api/module/web/index'
import { useUserStore } from '@/store';
const trader_profiles=ref({});
const userStore = useUserStore()
const islogin=ref(false);
const logintext=ref('Login');
const router = useRouter();
const userrole=ref('');
onMounted(() => {
   
  if(userStore.token){
    islogin.value=true;
    logintext.value='Log out'
    userrole.value=userStore.userInfo.role
  }
  try
  {
   

  // 检查 indexData 是否已经是对象，如果是则直接使用，否则解析 JSON
  let indexdata;
  if (typeof userStore.indexData === 'string') {
    indexdata = JSON.parse(userStore.indexData || '{}');
  } else {
    indexdata = userStore.indexData || {};
  }
  if(indexdata){
   
   trader_profiles.value=indexdata.trader_profiles;
   document.title = indexdata.trader_profiles.website_title;
  }
  }
  catch(error)
  {
    console.log(error)
  }

  getindexdata()
});
const toadmin=()=>{
  router.push('/system/userStatistics')
}
const getindexdata= async()=>{
  const res=await gettrader_profiles();
  if(res.success){
   
    trader_profiles.value=res.data.trader_profiles;
    document.title = res.data.trader_profiles.website_title;
  }
};
const loginto=()=>{
  if(islogin.value){
    userStore.token=null;
    userStore.userInfo=null;
    islogin.value=false;
    router.push('/userlogin');
  } else {
    router.push('/userlogin');
  }
}
</script>

<style scoped>
.navbar {
  background-color: #16213e;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
  padding: 0.5rem 0;
  border-bottom: 1px solid #ffd700;
}

.navbar-brand {
  font-weight: 600;
  font-size: 1rem;
  color: #ffd700;
  max-width: 70%; /* 限制最大宽度 */
  overflow: hidden; /* 隐藏溢出内容 */
  text-overflow: ellipsis; /* 显示省略号 */
  white-space: nowrap; /* 保持文本不换行 */
  display: inline-block; /* 确保width属性生效 */
}

.navbar-nav .nav-link {
  color: #ffd700 !important;
  font-weight: 200;
  margin-right: 0px;

  transition: color 0.3s ease;
}

.navbar-nav .nav-link:hover {
  color: #b8860b !important;
}

.btn-login {
  background: #ffd700;
  color: #000;
  border: none;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.btn-login:hover {
  background: #b8860b;
  color: #000;
}

.btn-outline-warning {
  color: #ffd700;
  border-color: #ffd700;
}

.btn-outline-warning:hover {
  background-color: #ffd700;
  color: #000;
  border-color: #ffd700;
}

/* 响应式菜单样式 */
#mobileMenu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 1000000;
  transition: all 0.3s ease;
}

/* 确保小屏幕菜单完全展开 */
.collapse.show {
  display: block !important;
}

@media (max-width: 991px) {
  .navbar {
    padding: 0.5rem 1rem;
  }
}
</style>