<template>
  <div class="app-container">
    <navcomponent />
    <div class="main-content">
      <!-- Header Section -->
      <div class="page-header">
        <div class="header-left">
          <div class="page-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" fill="#FFD700"/>
              <path d="M14 2V8H20" fill="#FFA500"/>
            </svg>
          </div>
          <div class="header-text">
            <h1 class="page-title">Trading Documents</h1>
            <p class="page-subtitle">Access comprehensive trading guides and educational resources</p>
          </div>
        </div>
        <div class="header-right">
          <div class="stats-summary">
            <span class="stat-item">{{ Array.isArray(documentslist) ? documentslist.length : Object.keys(documentslist).length || 0 }} Documents</span>
            <span class="stat-divider">•</span>
            <span class="stat-item vip">{{ Array.isArray(documentslist) ? documentslist.filter(d => !d.ispublic).length : Object.values(documentslist).filter(d => !d.ispublic).length || 0 }} VIP</span>
            <span class="stat-divider">•</span>
            <span class="stat-item recent">Last 30 Days</span>
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
            All Documents
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

      <!-- Documents Section -->
      <div class="documents-section">

        <div class="documents-grid">
          <div class="document-card" v-for="value in filteredDocuments" :key="value.id">
            <!-- Document Icon & Type -->
            <div class="document-header">
              <div class="document-icon">
                <div class="file-icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" fill="currentColor"/>
                    <path d="M14 2V8H20" fill="rgba(255,255,255,0.3)"/>
                  </svg>
                </div>
                <span class="file-type">{{ getFileType(value.file_url) }}</span>
              </div>
              
              <div v-if="!value.ispublic" class="vip-badge">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" fill="#FFD700"/>
                </svg>
                VIP
              </div>
            </div>

            <!-- Document Info -->
            <div class="document-info">
              <h3 class="document-title">{{ value.title }}</h3>
              <p class="document-description">{{ value.description }}</p>
              
              <div class="document-meta">
                <div class="meta-item">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2ZM13 17H11V11H13V17ZM13 9H11V7H13V9Z" fill="#b0c4e6"/>
                  </svg>
                  <span>{{ formatUSDate(value.last_update) }}</span>
                </div>
                <div class="meta-item">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#b0c4e6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                  </svg>
                  <span>{{ value.pages || 'Multi-page' }}</span>
                </div>
                <div class="meta-item">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 7H17V9H7V7ZM7 11H17V13H7V11ZM7 15H14V17H7V15Z" fill="#b0c4e6"/>
                </svg>
                  <span>{{ getFileSize(value.file_size) }}</span>
                </div>
              </div>

              <div class="document-actions">
                <button @click="previewDocument(value)" class="action-btn primary">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 3H6C4.9 3 4 3.9 4 5V19C4 20.1 4.9 21 6 21H18C19.1 21 20 20.1 20 19V8L15 3ZM18 19H6V5H13V9H18V19Z" fill="currentColor"/>
                  </svg>
                  Preview
                </button>
                <button @click="downloadDocument(value)" class="action-btn secondary">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 15V19C21 20.1 20.1 21 19 21H5C3.9 21 3 20.1 3 19V15M7 10L12 15L17 10M12 15V3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                    </svg>
                    Download
                  </button>
              </div>

              <!-- Progress Bar (if applicable) -->
              <div class="document-progress" v-if="value.progress">
                <div class="progress-info">
                  <span>Reading Progress</span>
                  <span>{{ value.progress }}%</span>
                </div>
                <div class="progress-bar">
                  <div class="progress-fill" :style="{ width: value.progress + '%' }"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Categories Section -->
        <div class="categories-section">
          <h3 class="categories-title">Browse by Category</h3>
          <div class="categories-grid">
            <div class="category-card">
              <div class="category-icon"><i class="bi bi-graph-up"></i></div>
              <h4>Trading Strategies</h4>
              <p>Advanced trading methodologies</p>
            </div>
            <div class="category-card">
              <div class="category-icon">📊</div>
              <h4>Market Analysis</h4>
              <p>Technical and fundamental analysis</p>
            </div>
            <div class="category-card">
              <div class="category-icon">💡</div>
              <h4>Beginner Guides</h4>
              <p>Start your trading journey</p>
            </div>
            <div class="category-card">
              <div class="category-icon">⚡</div>
              <h4>Quick References</h4>
              <p>Cheat sheets and summaries</p>
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
import { getdocuments } from '../../api/module/web/index';
import { useUserStore } from '@/store';

const userStore = useUserStore();
const router = useRouter();
let documentslist = ref({});
let filteredDocuments = ref({});
let activeFilter = ref('all');

onMounted(() => {
  getVipDashboardData();
});

const getVipDashboardData = async () => {
  const res = await getdocuments(null);
  if (res.success) {
    // 确保 documentslist 是数组格式
    if (Array.isArray(res.data)) {
      documentslist.value = res.data;
    } else {
      // 如果是对象，转换为数组
      documentslist.value = Object.values(res.data);
    }
    // 过滤出最近30天的文档用于显示
    filteredDocuments.value = filterDocumentsByDate(documentslist.value, 30);
  }
};

// 过滤文档：只显示最近N天的文档，并按时间排序
const filterDocumentsByDate = (documents: any, days: number) => {
  if (!documents || !Array.isArray(documents)) return [];
  
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);
  
  // 过滤出最近N天的文档
  const filteredDocs = documents.filter((doc: any) => {
    if (doc && doc.last_update) {
      const docDate = new Date(doc.last_update);
      return docDate >= cutoffDate;
    }
    return false;
  });
  
  // 按上传时间排序（最新的在前）
  const sortedDocs = filteredDocs.sort((a: any, b: any) => {
    const dateA = new Date(a.last_update);
    const dateB = new Date(b.last_update);
    
    // 确保日期解析正确
    if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
      console.warn('Invalid date detected:', a.last_update, b.last_update);
      return 0;
    }
    
    return dateB.getTime() - dateA.getTime(); // 降序排列，最新的在前
  });
  
  return sortedDocs;
};

const setFilter = (filter: string) => {
  activeFilter.value = filter;
  
  // 确保 documentslist 是数组格式
  const allDocs = Array.isArray(documentslist.value) 
    ? documentslist.value 
    : Object.values(documentslist.value);
  
  // 首先应用30天过滤
  const recentDocs = filterDocumentsByDate(allDocs, 30);
  
  if (filter === 'all') {
    filteredDocuments.value = recentDocs;
  } else if (filter === 'free') {
    // 过滤公开文档并保持排序
    const freeDocs = recentDocs.filter((doc: any) => doc.ispublic);
    
    // 按最后更新时间排序
    const sortedFreeDocs = freeDocs.sort((a: any, b: any) => {
      const dateA = new Date(a.last_update);
      const dateB = new Date(b.last_update);
      
      if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
        console.warn('Invalid date detected in free filter:', a.last_update, b.last_update);
        return 0;
      }
      
      return dateB.getTime() - dateA.getTime();
    });
    
    filteredDocuments.value = sortedFreeDocs;
  } else if (filter === 'vip') {
    // 过滤VIP文档并保持排序
    const vipDocs = recentDocs.filter((doc: any) => !doc.ispublic);
    
    // 按最后更新时间排序
    const sortedVipDocs = vipDocs.sort((a: any, b: any) => {
      const dateA = new Date(a.last_update);
      const dateB = new Date(b.last_update);
      
      if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
        console.warn('Invalid date detected in VIP filter:', a.last_update, b.last_update);
        return 0;
      }
      
      return dateB.getTime() - dateA.getTime();
    });
    
    filteredDocuments.value = sortedVipDocs;
  }
};

const getFileType = (url: string) => {
  if (!url) return 'PDF';
  const extension = url.split('.').pop()?.toUpperCase();
  return extension || 'PDF';
};

const getFileSize = (size: number) => {
  if (!size) return '< 1 MB';
  if (size < 1024) return size + ' KB';
  if (size < 1024 * 1024) return Math.round(size / 1024) + ' KB';
  return Math.round(size / (1024 * 1024)) + ' MB';
};

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

const previewDocument = (document: any) => {
  // 如果是VIP文档，检查登录状态
  if (!document.ispublic && !userStore.token) {
    alert('Please login to preview VIP documents');
    router.push('/userlogin');
    return;
  }
  
  if (!document.file_url) {
    console.error('No file URL available');
    return;
  }

  const fileType = getFileType(document.file_url).toLowerCase();
  
  // 创建预览窗口
  const previewWindow = window.open('', '_blank', 'width=1000,height=800,scrollbars=yes,resizable=yes');
  
  if (previewWindow) {
    let previewContent = '';
    
    if (fileType === 'pdf') {
      // PDF 预览
      previewContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Preview: ${document.title}</title>
          <style>
            body { 
              margin: 0; 
              background: #f5f5f5; 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            }
            .header {
              background: #1a1a2e;
              color: white;
              padding: 16px 24px;
              display: flex;
              justify-content: space-between;
              align-items: center;
            }
            .title {
              font-size: 1.2rem;
              font-weight: 600;
            }
            .download-btn {
              background: #FFD700;
              color: #181F2A;
              padding: 8px 16px;
              border-radius: 8px;
              text-decoration: none;
              font-weight: 600;
            }
            .preview-container {
              width: 100%;
              height: calc(100vh - 70px);
              border: none;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="title">${document.title}</div>
            <a href="${document.file_url}" download class="download-btn">Download</a>
          </div>
          <iframe src="${document.file_url}" class="preview-container"></iframe>
        </body>
        </html>
      `;
    } else if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(fileType)) {
      // 图片预览
      previewContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Preview: ${document.title}</title>
          <style>
            body { 
              margin: 0; 
              background: #000; 
              display: flex; 
              justify-content: center; 
              align-items: center; 
              height: 100vh;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            }
            img { 
              max-width: 90%; 
              max-height: 90%; 
              object-fit: contain;
              box-shadow: 0 4px 20px rgba(0,0,0,0.3);
            }
            .header {
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              background: rgba(26, 26, 46, 0.9);
              color: white;
              padding: 16px 24px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              backdrop-filter: blur(10px);
              z-index: 100;
            }
            .download-btn {
              background: #FFD700;
              color: #181F2A;
              padding: 8px 16px;
              border-radius: 8px;
              text-decoration: none;
              font-weight: 600;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div>${document.title}</div>
            <a href="${document.file_url}" download class="download-btn">Download</a>
          </div>
          <img src="${document.file_url}" alt="${document.title}">
        </body>
        </html>
      `;
    } else {
      // 其他文件类型，尝试直接在iframe中预览
      previewContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Preview: ${document.title}</title>
          <style>
            body { 
              margin: 0; 
              background: #f5f5f5; 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            }
            .header {
              background: #1a1a2e;
              color: white;
              padding: 16px 24px;
              display: flex;
              justify-content: space-between;
              align-items: center;
            }
            .title {
              font-size: 1.2rem;
              font-weight: 600;
            }
            .download-btn {
              background: #FFD700;
              color: #181F2A;
              padding: 8px 16px;
              border-radius: 8px;
              text-decoration: none;
              font-weight: 600;
            }
            .preview-container {
              width: 100%;
              height: calc(100vh - 70px);
              border: none;
            }
            .fallback {
              padding: 40px;
              text-align: center;
              color: #666;
            }
            .fallback a {
              color: #FFD700;
              text-decoration: none;
              font-weight: 600;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="title">${document.title}</div>
            <a href="${document.file_url}" download class="download-btn">Download</a>
          </div>
          <iframe src="${document.file_url}" class="preview-container" 
                  onerror="document.querySelector('.fallback').style.display='block'"></iframe>
          <div class="fallback" style="display:none;">
            <h3>Preview not available</h3>
            <p>This file type cannot be previewed in the browser.</p>
            <a href="${document.file_url}" download>Click here to download the file</a>
          </div>
        </body>
        </html>
      `;
    }
    
    previewWindow.document.write(previewContent);
    previewWindow.document.close();
  }
};

const downloadDocument = (document: any) => {
  // 如果是VIP文档，检查登录状态
  if (!document.ispublic && !userStore.token) {
    alert('Please login to download VIP documents');
    router.push('/userlogin');
    return;
  }
  
  if (!document.file_url) {
    console.error('No file URL available');
    return;
  }
  
  // 创建临时链接并触发下载
  const link = document.createElement('a');
  link.href = document.file_url;
  link.download = document.title || 'document';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
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

.stat-item.recent {
  color: #4CAF50;
  font-size: 0.9rem;
  font-weight: 500;
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

/* Documents Section */
.documents-section {
  margin-bottom: 80px;
}

/* Documents Grid */
.documents-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 32px;
  margin-bottom: 80px;
  align-items: stretch; /* 让所有卡片保持相同高度 */
}

.document-card {
  background: linear-gradient(135deg, rgba(35, 43, 62, 0.95) 0%, rgba(24, 31, 42, 0.9) 100%);
  border-radius: 24px;
  overflow: hidden;
  border: 2px solid rgba(255, 255, 255, 0.08);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 8px 32px rgba(24, 31, 42, 0.4);
  display: flex;
  flex-direction: column;
  min-height: 100%; /* 确保卡片填满网格单元格 */
}

.document-card:hover {
  transform: translateY(-8px) scale(1.02);
  border-color: rgba(255, 215, 0, 0.4);
  box-shadow: 0 20px 60px rgba(255, 215, 0, 0.15), 0 8px 32px rgba(24, 31, 42, 0.6);
}

/* Document Header */
.document-header {
  padding: 32px 32px 0 32px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.document-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.file-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 32px rgba(255, 215, 0, 0.3);
}

.file-icon svg {
  width: 40px;
  height: 40px;
  color: #181F2A;
}

.file-type {
  font-size: 0.9rem;
  font-weight: 700;
  color: #FFD700;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.vip-badge {
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

/* Document Info */
.document-info {
  padding: 32px;
  flex: 1; /* 让信息区域填满剩余空间 */
  display: flex;
  flex-direction: column;
}

.document-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 16px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 3.6rem; /* 固定标题区域高度，确保对齐 */
}

.document-description {
  color: #b0c4e6;
  line-height: 1.6;
  margin-bottom: 24px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 4.8rem; /* 固定描述区域高度，确保对齐 */
  flex: 1; /* 让描述区域填满可用空间 */
}

.document-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 32px;
  min-height: 2rem; /* 固定元数据区域高度 */
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

/* Document Actions */
.document-actions {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  margin-top: auto; /* 将按钮推到底部 */
}

.action-btn {
  padding: 14px 28px;
  border-radius: 16px;
  border: none;
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  flex: 1;
  justify-content: center;
  text-decoration: none;
}

.action-btn svg {
  width: 18px;
  height: 18px;
}

.action-btn.primary {
  background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
  color: #181F2A;
  box-shadow: 0 6px 24px rgba(255, 215, 0, 0.3);
}

.action-btn.primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 32px rgba(255, 215, 0, 0.4);
  background: linear-gradient(135deg, #FFE033 0%, #FFB347 100%);
  color: #181F2A;
  text-decoration: none;
}

.action-btn.secondary {
  background: rgba(255, 255, 255, 0.1);
  color: #b0c4e6;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.action-btn.secondary:hover {
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
  transform: translateY(-2px);
  text-decoration: none;
}

/* Document Progress */
.document-progress {
  margin-top: 24px;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  font-size: 0.9rem;
  color: #b0c4e6;
}

.progress-bar {
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
  border-radius: 4px;
  transition: width 0.3s ease;
}

/* Categories Section */
.categories-section {
  margin-top: 80px;
}

.categories-title {
  font-size: 2rem;
  font-weight: 900;
  color: #fff;
  margin-bottom: 32px;
  text-align: center;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

.category-card {
  background: linear-gradient(135deg, rgba(35, 43, 62, 0.8) 0%, rgba(24, 31, 42, 0.7) 100%);
  border-radius: 20px;
  padding: 40px 32px;
  text-align: center;
  border: 2px solid rgba(255, 255, 255, 0.08);
  transition: all 0.3s ease;
  cursor: pointer;
}

.category-card:hover {
  transform: translateY(-8px);
  border-color: rgba(255, 215, 0, 0.3);
  box-shadow: 0 16px 48px rgba(255, 215, 0, 0.1);
}

.category-icon {
  font-size: 3rem;
  margin-bottom: 20px;
}

.category-icon i {
  color: #2ecc71;
}

.category-card h4 {
  font-size: 1.3rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 12px;
}

.category-card p {
  color: #b0c4e6;
  line-height: 1.5;
  margin: 0;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .documents-grid {
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
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
  
  .documents-grid {
    grid-template-columns: 1fr;
  }
  
  .document-actions {
    flex-direction: column;
  }
  
  .categories-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
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
  
  .document-info {
    padding: 24px;
  }
  
  .document-header {
    padding: 24px 24px 0 24px;
  }
  
  .document-meta {
    flex-direction: column;
    gap: 12px;
  }
}
</style>