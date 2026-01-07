<template>
  <div v-if="organizations.length > 0 && !loading" class="partner-organizations-footer">
    <div class="partner-section">
      <h3 class="partner-title">{{ sectionTitle }}</h3>
      <div class="partner-list">
        <div 
          v-for="org in organizations" 
          :key="org.id" 
          class="partner-card"
          @click="handleClick(org)"
        >
          <div class="partner-logo">
            <img 
              v-if="org.logo_url" 
              :src="org.logo_url" 
              :alt="org.name"
              @error="handleImageError"
            />
            <div v-else class="partner-logo-placeholder">
              <i class="bi bi-building"></i>
            </div>
          </div>
          <div class="partner-name">{{ org.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getVipPartnerOrganizations, type PartnerOrganization } from '../api/module/partnerOrganizations';

const organizations = ref<PartnerOrganization[]>([]);
const loading = ref(false);
const sectionTitle = ref('');

// 加载VIP合作单位列表
const loadOrganizations = async () => {
  try {
    loading.value = true;
    const response = await getVipPartnerOrganizations();
    if (response.success) {
      // 确保 data 是数组格式
      if (Array.isArray(response.data)) {
        organizations.value = response.data;
      } else if (response.data && typeof response.data === 'object') {
        // 如果是对象，转换为数组
        organizations.value = Object.values(response.data);
      } else {
        organizations.value = [];
      }
      // 获取标题（优先使用返回的标题）
      if (response.section_title && response.section_title.trim() !== '') {
        sectionTitle.value = response.section_title;
      }
    }
  } catch (error) {
    console.error('加载VIP合作单位失败:', error);
    organizations.value = [];
  } finally {
    loading.value = false;
  }
};

// 处理点击事件
const handleClick = (org: PartnerOrganization) => {
  if (org.website_url) {
    window.open(org.website_url, '_blank');
  }
};

// 处理图片加载错误
const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement;
  img.style.display = 'none';
  const placeholder = img.nextElementSibling as HTMLElement;
  if (placeholder) {
    placeholder.style.display = 'flex';
  }
};

onMounted(() => {
  loadOrganizations();
});
</script>

<style scoped>
.partner-organizations-footer {
  background: linear-gradient(120deg, #181c2b 0%, #23243a 100%);
  border-top: 2px solid rgba(255, 215, 0, 0.2);
  padding: 40px 20px;
  margin-top: 0;
  width: 100%;
  position: relative;
  z-index: 1;
}

.partner-section {
  max-width: 1400px;
  margin: 0 auto;
}

.partner-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #FFD700;
  text-align: center;
  margin-bottom: 30px;
  letter-spacing: 1px;
}

.partner-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 24px;
  align-items: center;
}

.partner-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 24px;
  background: linear-gradient(135deg, rgba(35, 43, 62, 0.8) 0%, rgba(26, 35, 62, 0.9) 100%);
  border: 1.5px solid rgba(255, 215, 0, 0.2);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 160px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.partner-card:hover {
  transform: translateY(-5px);
  border-color: #FFD700;
  box-shadow: 0 8px 24px rgba(255, 215, 0, 0.3);
  background: linear-gradient(135deg, rgba(35, 43, 62, 0.95) 0%, rgba(26, 35, 62, 0.95) 100%);
}

.partner-logo {
  width: 80px;
  height: 80px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  overflow: hidden;
}

.partner-logo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 8px;
}

.partner-logo-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFD700;
  font-size: 2rem;
}

.partner-name {
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
  text-align: center;
  word-break: break-word;
  line-height: 1.4;
}


/* 响应式设计 */
@media (max-width: 768px) {
  .partner-organizations-footer {
    padding: 30px 16px;
  }

  .partner-title {
    font-size: 1.3rem;
    margin-bottom: 24px;
  }

  .partner-list {
    gap: 16px;
  }

  .partner-card {
    min-width: 140px;
    padding: 16px 20px;
  }

  .partner-logo {
    width: 60px;
    height: 60px;
    margin-bottom: 10px;
  }

  .partner-name {
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .partner-list {
    gap: 12px;
  }

  .partner-card {
    min-width: 120px;
    padding: 14px 16px;
  }

  .partner-logo {
    width: 50px;
    height: 50px;
  }

  .partner-name {
    font-size: 0.85rem;
  }
}
</style>

