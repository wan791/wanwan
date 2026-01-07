<template>
  <div class="app-container">
    <navcomponent />
    <div class="main-content">
      <!-- Header Section -->
      <div class="page-header">
        <div class="header-left">
          <div class="page-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 5V19L19 12L8 5Z" fill="#FFD700"/>
            </svg>
          </div>
          <div class="header-text">
            <h1 class="page-title">Video Tutorials</h1>
            <p class="page-subtitle">Master exclusive trading strategies with our video library</p>
          </div>
        </div>
        <div class="header-right">
          <div class="stats-summary">
            <span class="stat-item">{{ Object.keys(vedioslist).length || 0 }} Videos</span>
            <span class="stat-divider">•</span>
            <span class="stat-item vip">{{ Object.values(vedioslist).filter(v => !v.ispublic).length || 0 }} VIP</span>
          </div>
        </div>
      </div>

      <!-- Filter Bar -->
      <div class="filter-section">
        <div class="filter-tabs">
          <button 
            class="filter-tab" 
            :class="{ active: activeFilter === 'all' }"
            @click="setFilter('all')"
          >
            All Videos
          </button>
          <button 
            class="filter-tab" 
            :class="{ active: activeFilter === 'free' }"
            @click="setFilter('free')"
          >
            Free
          </button>
          <button 
            class="filter-tab" 
            :class="{ active: activeFilter === 'vip' }"
            @click="setFilter('vip')"
          >
            VIP Only
          </button>
        </div>
        <div class="view-options">
          <button class="view-btn active">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="3" width="7" height="7" fill="currentColor"/>
              <rect x="14" y="3" width="7" height="7" fill="currentColor"/>
              <rect x="3" y="14" width="7" height="7" fill="currentColor"/>
              <rect x="14" y="14" width="7" height="7" fill="currentColor"/>
            </svg>
          </button>
          <button class="view-btn">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="6" width="18" height="2" fill="currentColor"/>
              <rect x="3" y="12" width="18" height="2" fill="currentColor"/>
              <rect x="3" y="18" width="18" height="2" fill="currentColor"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Video Grid -->
      <div class="videos-section">

        <div class="videos-grid">
          <div class="video-card" v-for="value in filteredVideos" :key="value.id" :data-video-id="value.id">
            <!-- Video Thumbnail -->
            <div class="video-thumbnail" @click="playVideo($event, value)">
              <video 
                :src="(value.ispublic || userStore.token) ? value.video_url : ''" 
                :poster="value.thumbnail || ''"
                preload="metadata"
                class="video-player"
                :controls="false"
                ref="videoPlayer"
              ></video>
              <div class="play-overlay" :class="{ 'playing': value.isPlaying }">
                <div class="play-button">
                  <svg v-if="!value.isPlaying" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 5V19L19 12L8 5Z" fill="white"/>
                  </svg>
                  <svg v-else viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 4H10V20H6V4ZM14 4H18V20H14V4Z" fill="white"/>
                  </svg>
                </div>
              </div>
              <div v-if="!value.ispublic" class="vip-badge">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" fill="#FFD700"/>
                </svg>
                VIP
              </div>
              <div class="video-duration" v-if="value.duration">{{ value.duration }}</div>
            </div>

            <!-- Video Info -->
            <div class="video-info">
              <h3 class="video-title">{{ value.title }}</h3>
              <p class="video-description">{{ value.description }}</p>
              
              <div class="video-meta">
                <div class="meta-item">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2ZM13 17H11V11H13V17ZM13 9H11V7H13V9Z" fill="#b0c4e6"/>
                  </svg>
                  <span>{{ formatUSDate(value.last_update) }}</span>
                </div>
                <div class="meta-item">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 6L18.29 8.29L13.41 13.17L9.41 9.17L2 16.59L3.41 18L9.41 12L13.41 16L20.71 8.71L23 11V6H16Z" fill="#b0c4e6"/>
                  </svg>
                  <span>{{ value.difficulty || 'Intermediate' }}</span>
                </div>
              </div>

              <div class="video-actions">
                <button class="watch-btn" @click="watchVideo(value)">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 5V19L19 12L8 5Z" fill="currentColor"/>
                  </svg>
                  Watch Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 合作单位 -->
    <PartnerOrganizations />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import navcomponent from '../component/nav/nav.vue';
import PartnerOrganizations from '@/components/PartnerOrganizations.vue';
import { getvideos } from '../../api/module/web/index';
import { useUserStore } from '@/store';

const userStore = useUserStore();
const router = useRouter();
let vedioslist = ref({});
let filteredVideos = ref({});
let activeFilter = ref('all');

onMounted(() => {
  getVipDashboardData();
});

// 格式化日期为美国时间格式
const formatUSDate = (dateString: string) => {
  if (!dateString) return '';
  
  try {
    // 确保正确解析UTC时间字符串
    let date: Date;
    
    // 如果时间字符串没有时区信息，假设它是UTC时间
    if (dateString.includes('T') && !dateString.includes('Z') && !dateString.includes('+') && !dateString.includes('-', 10)) {
      // 添加Z表示UTC时间
      date = new Date(dateString + 'Z');
    } else {
      date = new Date(dateString);
    }
    
    // 验证日期是否有效
    if (isNaN(date.getTime())) {
      console.error('无效的时间字符串:', dateString);
      return dateString;
    }
    
    const usTime = date.toLocaleDateString('en-US', {
      timeZone: 'America/New_York',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
    
    // 添加时区标识
    const timeZone = date.toLocaleString('en-US', {
      timeZone: 'America/New_York',
      timeZoneName: 'short'
    }).split(' ').pop();
    
    return `${usTime} ${timeZone}`;
  } catch (error) {
    console.error('时间转换错误:', error, '原始时间:', dateString);
    return dateString; // 如果解析失败，返回原始字符串
  }
};

const getVipDashboardData = async () => {
  const res = await getvideos(null);
  if (res.success) {
    // 确保数据格式一致
    let videosData = res.data;
    // 如果是数组，转换为对象格式
    if (Array.isArray(videosData)) {
      videosData = videosData.reduce((acc, video, index) => {
        acc[index] = video;
        return acc;
      }, {} as any);
    }
    // 为每个视频添加播放状态
    const videosWithState = Object.keys(videosData).reduce((acc, key) => {
      acc[key] = {
        ...videosData[key],
        isPlaying: false
      };
      return acc;
    }, {} as any);
    vedioslist.value = videosWithState;
    filteredVideos.value = videosWithState; // 初始显示所有视频
  }
};

const setFilter = (filter: string) => {
  activeFilter.value = filter;
  
  if (filter === 'all') {
    filteredVideos.value = vedioslist.value;
  } else if (filter === 'free') {
    filteredVideos.value = Object.keys(vedioslist.value).reduce((acc, key) => {
      if (vedioslist.value[key].ispublic) {
        acc[key] = vedioslist.value[key];
      }
      return acc;
    }, {} as any);
  } else if (filter === 'vip') {
    filteredVideos.value = Object.keys(vedioslist.value).reduce((acc, key) => {
      if (!vedioslist.value[key].ispublic) {
        acc[key] = vedioslist.value[key];
      }
      return acc;
    }, {} as any);
  }
};

const playVideo = (event: Event, videoData: any) => {
  event.preventDefault();
  event.stopPropagation();
  
  // 如果是VIP视频，检查登录状态
  if (!videoData.ispublic && !userStore.token) {
    alert('Please login to watch VIP videos');
    router.push('/userlogin');
    return;
  }
  
  const thumbnail = event.currentTarget as HTMLElement;
  const video = thumbnail.querySelector('video') as HTMLVideoElement;
  
  if (!video || !video.src) {
    console.error('视频元素不存在或没有视频源');
    return;
  }

  // 暂停所有其他视频
  const allVideos = document.querySelectorAll('video');
  allVideos.forEach((v, index) => {
    if (v !== video && !v.paused) {
      v.pause();
      // 重置其他视频的播放状态
      const otherVideoData = Object.values(vedioslist.value)[index];
      if (otherVideoData) {
        otherVideoData.isPlaying = false;
      }
    }
  });

  try {
    if (video.paused) {
      // 显示控制条并播放
      video.controls = true;
      video.play().then(() => {
        videoData.isPlaying = true;
        console.log('视频开始播放');
      }).catch((error) => {
        console.error('播放失败:', error);
        videoData.isPlaying = false;
        video.controls = false;
      });
    } else {
      video.pause();
      videoData.isPlaying = false;
      video.controls = false;
    }
  } catch (error) {
    console.error('视频操作失败:', error);
  }

  // 监听视频事件
  video.addEventListener('pause', () => {
    videoData.isPlaying = false;
  });
  
  video.addEventListener('ended', () => {
    videoData.isPlaying = false;
    video.controls = false;
  });
};

const watchVideo = (videoData: any) => {
  console.log('观看视频:', videoData);
  
  // 如果是VIP视频，检查登录状态
  if (!videoData.ispublic && !userStore.token) {
    alert('Please login to watch VIP videos');
    router.push('/userlogin');
    return;
  }
  
  if (videoData.video_url) {
    // 创建一个全屏播放模态框或直接在新窗口打开
    const videoWindow = window.open('', '_blank', 'width=800,height=600');
    if (videoWindow) {
      videoWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>${videoData.title}</title>
          <style>
            body { margin: 0; background: #000; display: flex; justify-content: center; align-items: center; height: 100vh; }
            video { max-width: 100%; max-height: 100%; }
          </style>
        </head>
        <body>
          <video controls autoplay style="width: 100%; height: auto;">
            <source src="${videoData.video_url}" type="video/mp4">
            您的浏览器不支持视频播放。
          </video>
        </body>
        </html>
      `);
      videoWindow.document.close();
    }
  }
};
</script>

<style scoped>
.app-container {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  min-height: 100vh;
  width: 100%;
}

.main-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 32px 80px 32px;
}

/* Page Header */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  margin: 24px 0 32px 0;
  gap: 32px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 20px;
  flex: 1;
}

.page-icon {
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 32px rgba(255, 215, 0, 0.3);
  flex-shrink: 0;
}

.page-icon svg {
  width: 32px;
  height: 32px;
}

.header-text {
  flex: 1;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 900;
  color: #fff;
  margin: 0 0 8px 0;
  letter-spacing: -0.5px;
}

.page-subtitle {
  font-size: 1.2rem;
  color: #b0c4e6;
  margin: 0;
  line-height: 1.4;
}

.header-right {
  display: flex;
  align-items: center;
}

.stats-summary {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1.1rem;
  color: #b0c4e6;
}

.stat-item {
  font-weight: 600;
}

.stat-item.vip {
  color: #FFD700;
}

.stat-divider {
  color: rgba(176, 196, 230, 0.5);
  font-weight: 300;
}

/* Filter Section */
.filter-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  padding: 20px 32px;
  background: rgba(24, 31, 42, 0.6);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
}

.filter-tabs {
  display: flex;
  gap: 4px;
  background: rgba(255, 255, 255, 0.05);
  padding: 6px;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.filter-tab {
  padding: 12px 24px;
  background: transparent;
  border: none;
  color: #b0c4e6;
  font-weight: 600;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 0.95rem;
  position: relative;
  overflow: hidden;
}

.filter-tab::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;
}

.filter-tab.active::before,
.filter-tab:hover::before {
  opacity: 1;
}

.filter-tab.active,
.filter-tab:hover {
  color: #181F2A;
  transform: translateY(-1px);
}

.view-options {
  display: flex;
  gap: 8px;
}

.view-btn {
  width: 44px;
  height: 44px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #b0c4e6;
}

.view-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 215, 0, 0.3);
  color: #FFD700;
}

.view-btn.active {
  background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
  border-color: #FFD700;
  color: #181F2A;
}

.view-btn svg {
  width: 18px;
  height: 18px;
}

/* Videos Section */
.videos-section {
  margin-bottom: 80px;
}

/* Video Grid */
.videos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 32px;
  align-items: stretch; /* 让所有卡片高度一致 */
}

.video-card {
  background: linear-gradient(135deg, rgba(35, 43, 62, 0.95) 0%, rgba(24, 31, 42, 0.9) 100%);
  border-radius: 24px;
  overflow: hidden;
  border: 2px solid rgba(255, 255, 255, 0.08);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 8px 32px rgba(24, 31, 42, 0.4);
  display: flex;
  flex-direction: column;
  height: 100%; /* 确保卡片填满网格高度 */
}

.video-card:hover {
  transform: translateY(-12px) scale(1.02);
  border-color: rgba(255, 215, 0, 0.4);
  box-shadow: 0 20px 60px rgba(255, 215, 0, 0.15), 0 8px 32px rgba(24, 31, 42, 0.6);
}

/* Video Thumbnail */
.video-thumbnail {
  position: relative;
  height: 220px;
  overflow: hidden;
  cursor: pointer;
}

.video-player {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.video-card:hover .video-player {
  transform: scale(1.05);
}

.play-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.video-thumbnail:hover .play-overlay {
  opacity: 1;
}

.play-overlay.playing {
  opacity: 1;
  background: rgba(0, 0, 0, 0.2);
}

.play-button {
  width: 80px;
  height: 80px;
  background: rgba(255, 215, 0, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: scale(0.8);
  transition: all 0.3s ease;
}

.play-overlay:hover .play-button {
  transform: scale(1);
  background: #FFD700;
}

.play-button svg {
  width: 32px;
  height: 32px;
  margin-left: 4px;
}

.vip-badge {
  position: absolute;
  top: 16px;
  right: 16px;
  background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
  color: #181F2A;
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: 900;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 6px;
  box-shadow: 0 4px 16px rgba(255, 215, 0, 0.4);
}

.vip-badge svg {
  width: 16px;
  height: 16px;
}

.video-duration {
  position: absolute;
  bottom: 16px;
  right: 16px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 6px 12px;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 600;
}

/* Video Info */
.video-info {
  padding: 32px;
  flex: 1; /* 让信息区域占用剩余空间 */
  display: flex;
  flex-direction: column;
}

.video-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 16px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 3.6rem; /* 固定标题高度 */
}

.video-description {
  color: #b0c4e6;
  line-height: 1.6;
  margin-bottom: 24px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1; /* 让描述区域填充剩余空间 */
  min-height: 4.8rem; /* 固定描述最小高度 */
}

.video-meta {
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
  min-height: 2.5rem; /* 固定元数据区域高度 */
  align-items: flex-start;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #b0c4e6;
  font-size: 0.9rem;
}

.meta-item svg {
  width: 16px;
  height: 16px;
}

/* Video Actions */
.video-actions {
  display: flex;
  justify-content: center;
  padding: 0 32px 32px 32px;
  margin-top: auto; /* 将按钮推到底部 */
}

.watch-btn {
  padding: 12px 32px;
  border-radius: 25px;
  border: none;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s ease;
  background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
  color: #181F2A;
  box-shadow: 0 4px 16px rgba(255, 215, 0, 0.3);
  min-width: 140px;
  justify-content: center;
}

.watch-btn svg {
  width: 18px;
  height: 18px;
}

.watch-btn:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 8px 24px rgba(255, 215, 0, 0.4);
  background: linear-gradient(135deg, #FFE033 0%, #FFB347 100%);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .videos-grid {
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 24px;
  }
  
  .page-title {
    font-size: 2.2rem;
  }
  
  .filter-section {
    padding: 16px 24px;
  }
}

@media (max-width: 768px) {
  .main-content {
    padding: 0 16px 60px 16px;
  }
  
  .page-header {
    flex-direction: column;
    gap: 20px;
    align-items: flex-start;
    margin: 20px 0 24px 0;
  }
  
  .header-left {
    width: 100%;
  }
  
  .page-title {
    font-size: 2rem;
  }
  
  .page-subtitle {
    font-size: 1.1rem;
  }
  
  .header-right {
    align-self: flex-end;
  }
  
  .filter-section {
    flex-direction: column;
    gap: 20px;
    padding: 20px;
  }
  
  .filter-tabs {
    align-self: stretch;
    justify-content: center;
  }
  
  .view-options {
    align-self: center;
  }
  
  .videos-grid {
    grid-template-columns: 1fr;
  }
  
  .watch-btn {
    min-width: 120px;
  }
}

@media (max-width: 480px) {
  .header-left {
    gap: 16px;
  }
  
  .page-icon {
    width: 56px;
    height: 56px;
  }
  
  .page-icon svg {
    width: 28px;
    height: 28px;
  }
  
  .page-title {
    font-size: 1.8rem;
  }
  
  .page-subtitle {
    font-size: 1rem;
  }
  
  .stats-summary {
    font-size: 1rem;
  }
  
  .filter-section {
    padding: 16px;
  }
  
  .filter-tabs {
    flex-direction: column;
    gap: 6px;
  }
  
  .filter-tab {
    padding: 10px 20px;
  }
  
  .video-info {
    padding: 24px;
  }
  
  .watch-btn {
    min-width: 100px;
    font-size: 0.9rem;
    padding: 10px 24px;
  }
}
</style>