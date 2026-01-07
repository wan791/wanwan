<template>
  <div class="app-container">
    <navcomponent></navcomponent>
    <!-- Navigation Bar
    <nav class="navbar navbar-expand-lg navbar-dark mb-3">
      <div class="container">
        <a class="navbar-brand" href="#">
          <i class="bi bi-graph-up me-2"></i>
          Expert Trader Profile
        </a>
        <div class="navbar-nav ms-auto">
          <a class="nav-link" href="#" style="color: #ffd700; font-weight: 600;">
            <i class="bi bi-robot me-1"></i>
            AI Tools
          </a>
          <a class="nav-link" href="/vip" style="color: #ffd700; font-weight: 600;">
            <i class="bi bi-crown me-1"></i>
            VIP Membership
          </a>
          <a class="nav-link" href="/login" style="color: #ffd700; font-weight: 600;">
            <i class="bi bi-box-arrow-in-right me-1"></i>
            Login
          </a>
          <a class="nav-link" href="/register" style="color: #ffd700; font-weight: 600;">
            <i class="bi bi-person-plus me-1"></i>
            Register
          </a>
        </div>
      </div>
    </nav> -->

    <div class="container">
      <!-- Profile Section -->
      <div class="profile-section mb-5">
        <div class="profile-header">
          <div class="profile-main">
            <div class="profile-avatar" @click="openAvatarPreview">
              <img :src="trader_profiles.profile_image_url" alt="Avatar" class="avatar-img">
              <div class="online-status"></div>
              <button class="avatar-upload" @click.stop="triggerAvatarUpload">
                <i class="bi bi-camera-fill"></i>
              </button>
              <input type="file" ref="avatarUpload" class="avatar-upload-input" accept="image/*" @change="handleAvatarUpload">
            </div>
            <div class="profile-details">
              <h1 class="profile-name">{{trader_profiles.trader_name}}</h1>
              <div class="profile-title">{{trader_profiles.professional_title}}</div>
              <div class="profile-stats">
                <div class="stat-item">
                  <span class="stat-value">{{trader_profiles.years_of_experience}}</span>
                  <span class="stat-label">Years of Experience</span>
                </div>
                <div class="stat-item">
                  <span class="stat-value">{{trader_profiles.total_trades}}</span>
                  <span class="stat-label">Total Trades</span>
                </div>
                <div class="stat-item">
                  <span class="stat-value">{{trader_profiles.win_rate}}%</span>
                  <span class="stat-label">Win Rate</span>
                </div>
              </div>
            </div>
          </div>
          <div class="profile-performance">
            <div class="performance-card">
              <div class="performance-header">
                <i class="bi bi-briefcase"></i>
                <span>Active Positions</span>
              </div>
              <div class="performance-value">
                {{ Activecount }}
              </div>
            </div>
            <div class="performance-card">
              <div class="performance-header">
                <i class="bi bi-calendar-check"></i>
                <span>Monthly P&L</span>
              </div>
              <div class="performance-value" :class="{ 'profit-positive': Monthly >= 0, 'profit-negative': Monthly < 0 }">
                {{ Monthly>=0 ? '+':'' }}${{formatCurrency(Monthly)}}
              </div>
            </div>
            <div class="performance-card">
              <div class="performance-header">
                <i class="bi bi-graph-up"></i>
                <span>Total P&L</span>
              </div>
              <div class="performance-value" :class="{ 'profit-positive': Total >= 0, 'profit-negative': Total < 0 }">
                 {{ Total>=0 ? '+':'' }}${{formatCurrency(Total)}}
              </div>
            </div>
          </div>
        </div>

        <!-- Strategy Update Section -->
        <div class="strategy-update" >
          <div class="strategy-header">
            <h3><i class="bi bi-lightbulb glow-bulb"></i> Today's Trading Strategy</h3>
            <span class="update-time">Updated at: {{formatUSTime(strategy_info.updated_at)}}</span>
          </div>
          <div class="strategy-content">
            <div class="market-analysis">
              <h4>Market Analysis</h4>
              <p>
                {{strategy_info.market_analysis}}
              </p>
               <audio id="audioPlayer" :src="strategy_info.analysis_path" controls v-if="strategy_info.analysis_path &&strategy_info.stype==1"></audio>
               <video :src="strategy_info.analysis_path" controls="" style="width:100%;height:280px;border-radius:12px;background:#232e4a;" v-if="strategy_info.analysis_path &&strategy_info.stype==2"></video>
            </div>
            <div class="trading-focus">
              <h4>Focus Areas</h4>
              <ul>
                <li v-for="(value, index) in strategy_info.trading_focus" :key="index">
                  {{value}}
                </li>
              </ul>
            </div>
            <div class="risk-warning">
              <h4>Risk Warning</h4>
              <p> {{strategy_info.risk_warning}}</p>
               <audio id="audioPlayer" :src="strategy_info.warn_path" controls v-if="strategy_info.warn_path &&strategy_info.warntype==1"></audio>
               <video :src="strategy_info.warn_path" controls="" style="width:100%;height:280px;border-radius:12px;background:#232e4a;" v-if="strategy_info.warn_path &&strategy_info.warntype==2"></video>
            </div>
          </div>
        </div>
      </div>

      <!-- Trading Record Divider -->
      <div class="trade-separator">
        <h3><i class="bi bi-clipboard-data"></i> Trading Records (Last 3 Months)</h3>
        <div class="divider-line"></div>
      </div>

      <!-- Stock Trading Cards - Active Trades -->
     
      <div class="row">
        <div class="col-md-6 col-lg-4" v-for="value in trades">
          <div class="card">
            <div class="stock-info">
              <div class="country-badge-container">
                <span class="country-badge" :class="getCountryClass(value.trade_market)">
                  <span class="country-flag">{{ getCountryFlag(value.trade_market) }}</span>
                  <span class="country-text">{{value.trade_market.toUpperCase()}}</span>
                </span>
              </div>
              <div class="stock-center">
                <div class="stock-symbol">{{value.symbol}}</div>
              </div>
              <div class="status-badge-container">
                <span class="status-badge-enhanced" :class="getStatusClass(value.status, value.Ratio)">
                  <span class="status-icon">{{ getStatusIcon(value.status) }}</span>
                  <span class="status-text">{{getStatusText(value.status, value.Ratio)}}</span>
                </span>
              </div>
            </div>

            <img :src="value.image_url" alt="AAPL" class="trade-screenshot" @click="openImageModal(value.symbol,value.image_url)">
            
            <div class="secondary-info">
              <div class="secondary-info-item" >
                <span class="secondary-info-label">Entry Date</span>
                <span class="secondary-info-value">{{formatUSDate(value.entry_date)}}</span>
              </div>
              
              <div class="secondary-info-item">
                <span class="secondary-info-label">Entry Price</span>
                <span class="secondary-info-value">{{value.currency}}{{formatCurrency(value.entry_price)}}</span>
              </div>
              <div class="secondary-info-item" v-if="value.status == 'Active'">
                <span class="secondary-info-label">Current Price</span>
                <span class="secondary-info-value">{{value.currency}}{{formatCurrency(value.current_price)}}</span>
              </div>
              <div class="secondary-info-item" v-else>
                <span class="secondary-info-label">Exit Date</span>
                <span class="secondary-info-value">{{formatUSDate(value.exit_date)}}</span>
              </div>
              <div class="secondary-info-item" v-if="value.status == 'Active'">
                <span class="secondary-info-label">Quantity</span>
                <span class="secondary-info-value">{{formatQuantity(value.size)}}</span>
              </div>
              <div class="secondary-info-item" v-else>
                <span class="secondary-info-label">Exit Price</span>
                <span class="secondary-info-value">{{value.currency}}{{formatCurrency(value.exit_price)}}</span>
              </div>
            </div>

            <div class="main-stats">
              <div class="main-stat-item">
                <div class="main-stat-label">Entry Amount</div>
                <div class="main-stat-value">{{value.currency}}{{formatCurrency(value.entry_price*value.size)}}</div>
               
              </div>
              <div class="main-stat-item">
                <div class="main-stat-label">Market Value</div>
                <div class="main-stat-value">{{value.currency}}{{formatCurrency(value.Market_Value)}}</div>
               
              </div>
              <div class="main-stat-item">
                <div class="main-stat-label" >P&L Ratio</div>
                <div :class="['main-stat-value',value.Ratio > 0? 'profit-positive': 'profit-negative']">{{value.Ratio}}%</div>
               
              </div>
              <div class="main-stat-item">
                <div class="main-stat-label">P&L Amount</div>
                <div :class="['main-stat-value',value.Ratio > 0? 'profit-positive': 'profit-negative']">{{value.currency}}{{formatCurrency(value.Amount)}}</div>
               
              </div>
            </div>
          </div>
        </div>

       
      </div>
    </div>

    <!-- Floating Contact Button -->
    <div class="contact-btn" @click="toggleContactPopup">
      <i class="bi bi-people-fill"></i>
      Join Community
    </div>

     <!-- Redirect Message -->
    <div class="redirect-message" v-show="showContactPopup">
        <span class="text">Redirecting to WhatsApp Community</span><span class="dots"></span>
    </div>
    <!-- Contact Popup
    <div class="contact-popup" v-show="showContactPopup">
      <h4><i class="bi bi-envelope"></i> Contact Information</h4>
      <div class="contact-item">
        <i class="bi bi-telegram"></i>
        <span>@traderjohn</span>
      </div>
      <div class="contact-item">
        <i class="bi bi-envelope"></i>
        <span>contact@traderjohn.com</span>
      </div>
      <div class="contact-item">
        <i class="bi bi-discord"></i>
        <span>TraderJohn#1234</span>
      </div>
    </div> -->

    <!-- Image Modal -->
    <div class="modal fade" id="imageModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ selectedTradeSymbol }}</h5>
            <button type="button" class="btn-close" @click="closeImageModal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <img :src="selectedTradeName" alt="Trade Chart" class="modal-image">
          </div>
        </div>
      </div>
    </div>

    <!-- Avatar Preview Modal -->
    <div class="modal fade avatar-preview-modal" id="avatarPreviewModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-md">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Profile Picture</h5>
            <button type="button" class="btn-close" @click="closeAvatarPreview" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <img :src="trader_profiles.profile_image_url" alt="Avatar Preview" class="avatar-preview-img">
          </div>
        </div>
      </div>
    </div>
     <!-- Avatar Preview Modal -->
    <div class="profile-badges-floating">
        <a href="/leaderboard" style="text-decoration: none; color: inherit;">
            <div class="badge-item" style="cursor:pointer;">
                <div class="badge-row">
                    <span class="badge-icon-container">
                        <span class="badge-icon">
                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <linearGradient id="trophyGold" x1="6" y1="7" x2="16" y2="14" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#FFD700"/>
                                        <stop offset="1" stop-color="#FFA500"/>
                                    </linearGradient>
                                </defs>
                                <ellipse cx="11" cy="20" rx="7" ry="2" fill="#FFD700" opacity="0.18"/>
                                <path d="M6 7C6 4 16 4 16 7C16 10 14 14 11 14C8 14 6 10 6 7Z" fill="url(#trophyGold)" stroke="#FFD700" stroke-width="1.2"/>
                                <rect x="9" y="14" width="4" height="3" rx="1" fill="#FFD700" stroke="#FFD700" stroke-width="1"/>
                            </svg>
                        </span>
                        <span class="badge-label">LB</span>
                    </span>
                </div>
                
            </div>
        </a>
        <a href="/vip" style="text-decoration: none; color: inherit;">
            <div class="badge-item" style="cursor:pointer;">
                <div class="badge-row">
                    <image src="@assets" alt="VIP" class="badge-icon" />
                    <span class="badge-label">VIP</span>
                </div>
                <span class="badge-value-vip" id="vip-count">{{trader_profiles.members_count}}</span>
            </div>
        </a>
        <div class="badge-item" id="like-badge" style="cursor:pointer;" @click="handleLikeClick">
            <div class="badge-row">
                <span class="badge-icon-svg" id="like-icon">
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                        <defs>
                            <linearGradient id="likeGold" x1="0" y1="0" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#FFD700"/>
                                <stop offset="1" stop-color="#FFB300"/>
                            </linearGradient>
                        </defs>
                        <path d="M6 10V18C6 18.55 6.45 19 7 19H13C13.55 19 14 18.55 14 18V10" stroke="url(#likeGold)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M10 19V7.5C10 6.12 11.12 5 12.5 5C13.88 5 15 6.12 15 7.5V10" stroke="url(#likeGold)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </span>
                <span class="badge-label">Likes</span>
            </div>
            <span class="badge-value-alt" id="likes-count">{{(trader_profiles.likes_count/ 1000).toFixed(1) + 'K'}}</span>
        </div>
    </div>
    
    <!-- Welcome Popup Modal -->
    <div class="modal fade" id="welcomePopupModal" tabindex="-1" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content welcome-popup-modal">
                <div class="modal-body">
                  
                    <button type="button" class="btn-close btn-close-white" id="allow_close" data-bs-dismiss="modal" style="position: absolute;right: 20px; top: 20px;" v-if="announcementData.allow_close_dialog===1"></button>
                    
                    <div class="welcome-content">
                        <h3 class="teacher-intro">{{trader_profiles.trader_name}} - {{trader_profiles.professional_title}}</h3>
                        <p class="welcome-description">
                            Dedicated to providing professional trading strategy analysis and real-time market guidance for investors
                        </p>
                        
                        <div class="performance-overview">
                            <div class="performance-stats">
                                <div class="stat-box">
                                    <div class="stat-icon"><i class="bi bi-trophy"></i></div>
                                    <div class="stat-info">
                                        <div class="stat-value" id="total-profit-display" style="font-size: 16px;" :class="{ 'profit-positive': Total >= 0, 'profit-negative': Total < 0 }">
                                            {{ Total>=0 ? '+':'' }}${{formatCurrency(Total)}}
                                        </div>
                                        <div class="stat-label">Total Profit</div>
                                    </div>
                                </div>
                                <div class="stat-box">
                                    <div class="stat-icon"><i class="bi bi-calendar-check"></i></div>
                                    <div class="stat-info">
                                        <div class="stat-value" id="monthly-profit-display" style="font-size: 16px;" :class="{ 'profit-positive': Monthly >= 0, 'profit-negative': Monthly < 0 }">
                                            {{ Monthly>=0 ? '+':'' }}${{formatCurrency(Monthly)}}
                                        </div>
                                        <div class="stat-label">Monthly Profit</div>
                                    </div>
                                </div>
                                <div class="stat-box">
                                    <div class="stat-icon"><i class="bi bi-graph-up"></i></div>
                                    <div class="stat-info">
                                        <div class="stat-value" id="active-trades-display" style="font-size: 16px;">
                                            {{ Activecount }}
                                        </div>
                                        <div class="stat-label">Active Trades</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="announcement-info" id="announcement-section">
                                <div class="announcement-header">
                                    <i class="bi bi-megaphone-fill"></i>
                                    <span>Important Announcement</span>
                                </div>
                                <div class="announcement-content" id="announcement-content">
                                    <div style="margin-bottom: 0.5rem;">
                                        <div style="font-weight: 600; color: #ffd700; margin-bottom: 0.5rem; font-size: 1rem;">
                                            {{ announcementData.title }}
                                        </div>
                                        <div style="color: #e0e0e0; line-height: 1.6; font-size: 0.9rem;">
                                            {{ announcementData.content }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        
                        <div class="community-highlight">
                            <div class="community-benefits">
                                <h4><i class="bi bi-people-fill"></i> Join Exclusive Trading Community</h4>
                                <ul class="benefits-list">
                                    <li><i class="bi bi-check-circle-fill"></i> Real-time Trading Signals</li>
                                    <li><i class="bi bi-check-circle-fill"></i> Professional Strategy Analysis</li>
                                    <li><i class="bi bi-check-circle-fill"></i> One-on-One Trading Guidance</li>
                                    <li><i class="bi bi-check-circle-fill"></i> Exclusive Market Analysis Reports</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div class="welcome-cta">
                            <button class="btn-community-primary" @click="joinCommunity">
                                <i class="bi bi-people-fill"></i>
                                Join Exclusive Community Now
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

<script lang="ts" setup>
import navcomponent from '../component/nav/nav.vue'
import PartnerOrganizations from '@/components/PartnerOrganizations.vue';
import moment from 'moment';
import { ref, reactive, onMounted } from 'vue'
import { Modal } from 'bootstrap';
import{getIndexData,get_whatsapp_link,getannouncement,likeTrader} from '../../api/module/web/index'
import { useUserStore } from '@/store';
import { layer } from '@layui/layui-vue';
const trader_profiles=ref({});
const strategy_info=ref({
    "updated_at": "",
    "market_analysis": "",
    "trading_focus": [
    ],
    "risk_warning": "",
    "id": 0,
    "trader_uuid": "",
    "stype": 0,
    "analysis_path": "",
    "warntype": 0,
    "warn_path": ""
});
const trades=ref({});
const Activecount=ref(0)
const Monthly=ref(0)
const Total=ref(0)
const userStore = useUserStore()
// State for contact popup
const showContactPopup = ref(false);
// State for image modal
const selectedTradeSymbol = ref('');
const selectedTradeName = ref('');
const selectedImageUrl = ref('');
const announcementData=ref({});
let imageModalInstance: Modal | null = null;
let avatarPreviewModalInstance: Modal | null = null;
// 点赞状态
const likesCount = ref(0);
const isLiked = ref(false);
const likeIcon = ref<HTMLElement | null>(null);
// 初始化加载数据
onMounted(() => {
  try{
  // 检查 indexData 是否已经是对象，如果是则直接使用，否则解析 JSON
  let indexdata;
  if (typeof userStore.indexData === 'string') {
    indexdata = JSON.parse(userStore.indexData || '{}');
  } else {
    indexdata = userStore.indexData || {};
  }
  trader_profiles.value=indexdata.trader_profiles;
    if(indexdata.strategy_info){
      strategy_info.value=indexdata.strategy_info;
    }
    
    // 对本地存储的数据也进行过滤和排序
    if(indexdata.trades && Array.isArray(indexdata.trades)) {
      // 首先过滤出3个月内的交易记录
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
      
      const filteredTrades = indexdata.trades.filter((trade: any) => {
        const entryDate = new Date(trade.entry_date);
        // 如果交易记录有退出日期，也要检查退出日期是否在3个月内
        if (trade.exit_date) {
          const exitDate = new Date(trade.exit_date);
          // 只要entry_date或exit_date在3个月内，就显示
          return entryDate >= threeMonthsAgo || exitDate >= threeMonthsAgo;
        }
        // 如果没有退出日期（Active状态），只检查entry_date
        return entryDate >= threeMonthsAgo;
      });
      
      const sortedTrades = filteredTrades.sort((a: any, b: any) => {
        // 首先按重点交易排序：重点交易在前
        // 处理 null/undefined 的情况
        const isImportantA = a.is_important === true || a.is_important === 1 || a.is_important === 'true' || a.is_featured === true || a.is_featured === 1;
        const isImportantB = b.is_important === true || b.is_important === 1 || b.is_important === 'true' || b.is_featured === true || b.is_featured === 1;
        
        if (isImportantA !== isImportantB) {
          return isImportantA ? -1 : 1; // 重点交易在前
        }
        
        // 然后按状态排序：Active在前，平仓在后
        const isActiveA = a.status === 'Active';
        const isActiveB = b.status === 'Active';
        
        if (isActiveA !== isActiveB) {
          return isActiveA ? -1 : 1; // Active在前
        }
        
        // 同状态内按时间排序
        if (isActiveA) {
          // 持仓的按买入时间排序（最新的在前）
          const dateA = new Date(a.entry_date);
          const dateB = new Date(b.entry_date);
          return dateB.getTime() - dateA.getTime();
        } else {
          // 平仓的按退出时间排序（最新的在前）
          const dateA = new Date(a.exit_date || a.entry_date);
          const dateB = new Date(b.exit_date || b.entry_date);
          return dateB.getTime() - dateA.getTime();
        }
      });
      
      // 调试信息：显示重点交易数量
      const importantTrades = sortedTrades.filter((t: any) => t.is_important === true || t.is_important === 1 || t.is_featured === true || t.is_featured === 1);
      if (importantTrades.length > 0) {
        console.log(`⭐ 重点交易记录数量: ${importantTrades.length}`, importantTrades.map((t: any) => ({ symbol: t.symbol, is_important: t.is_important })));
      }
      
      trades.value = sortedTrades;
    } else {
      trades.value = indexdata.trades;
    }
   
    if(trades.value){
    Activecount.value=trades.value.filter((item:any)=>item.status=='Active').length
    }
    Monthly.value=indexdata.Monthly;
    Total.value=indexdata.Total;
  }
  catch(error)
  {
    console.log(error)
  }
  getindexdata()
  getannouncementdataData()

  
  // 初始化点赞数
  if (trader_profiles.value && trader_profiles.value.likes_count) {
    likesCount.value = trader_profiles.value.likes_count;
  }
});

// 处理点赞点击事件
const handleLikeClick = async () => {
  try {
    try{
        let histaryday = new Date();
        histaryday.setDate(histaryday.getDate() - 1);
        console.log(histaryday.toISOString().slice(0, 10))
        localStorage.removeItem(`traderlikes_${histaryday.toISOString().slice(0, 10)}`)
    }
    catch(error){
      
    }
     const today = new Date().toISOString().slice(0, 10);
 
    const likeKey = `traderlikes_${today}`;
    
      if (localStorage.getItem(likeKey)) {
         layer.msg("Today and past, please come back tomorrow. Thank you for your support!", { icon : 6, time: 1000})
       
        return;
      }
   
    if (!trader_profiles.value || !trader_profiles.value.id) {
      console.error('Trader ID not found');
      return;
    }
    
    const response = await likeTrader({
      id: trader_profiles.value.id
    });
    
    if (response.success) {
      localStorage.setItem(likeKey, '1');
      isLiked.value = response.isLiked;
       layer.msg("Liked successfully, thank you!", { icon : 6, time: 1000})
      // 更新点赞数
      if (isLiked.value) {
        likesCount.value++;
      } else {
        likesCount.value--;
      }
      
      // 更新显示的点赞数
      if (trader_profiles.value) {
        trader_profiles.value.likes_count = likesCount.value;
      }
      
      // 更新UI显示
      updateLikeIcon();
    } else {
      console.error('Like operation failed:', response.message);
    }
  } catch (error) {
    console.error('Error during like operation:', error);
  }
};

// 更新点赞图标样式
const updateLikeIcon = () => {
  if (likeIcon.value) {
    // 根据点赞状态更新图标样式
    if (isLiked.value) {
      likeIcon.value.querySelector('path')?.setAttribute('fill', '#FFB300');
    } else {
      likeIcon.value.querySelector('path')?.removeAttribute('fill');
    }
  }
  
  // 更新点赞数显示
  const likesCountElement = document.getElementById('likes-count');
  if (likesCountElement) {
    likesCountElement.textContent = (likesCount.value / 1000).toFixed(1) + 'K';
  }
};
// Refs
const avatarUpload = ref<HTMLInputElement>();

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

// Open image modal
const openImageModal = (symbol: string, name: string) => {
  selectedTradeSymbol.value = symbol;
  selectedTradeName.value = name;
  selectedImageUrl.value = `https://via.placeholder.com/800x600?text=${symbol}+Detailed+Chart`;
  
  if (!imageModalInstance) {
    const modalElement = document.getElementById('imageModal');
    if (modalElement) {
      imageModalInstance = new Modal(modalElement);
    }
  }
  
  imageModalInstance?.show();
};

// Close image modal
const closeImageModal = () => {
  imageModalInstance?.hide();
};

// Open avatar preview
const openAvatarPreview = () => {
  if (!avatarPreviewModalInstance) {
    const modalElement = document.getElementById('avatarPreviewModal');
    if (modalElement) {
      avatarPreviewModalInstance = new Modal(modalElement);
    }
  }
  
  avatarPreviewModalInstance?.show();
};

// Close avatar preview
const closeAvatarPreview = () => {
  avatarPreviewModalInstance?.hide();
};

// Trigger avatar upload
const triggerAvatarUpload = () => {
  avatarUpload.value?.click();
};

// Handle avatar upload
const handleAvatarUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  
  if (!file) return;
  
  // Check file type and size
  if (!file.type.startsWith('image/')) {
    alert('请上传图片文件');
    return;
  }
  
  if (file.size > 5 * 1024 * 1024) {
    alert('图片大小不能超过5MB');
    return;
  }
  
  // In a real application, you would upload the file here
  alert('Avatar upload functionality would be implemented here');
};
const getindexdata= async()=>{
  const res=await getIndexData();
  if(res.success && res.data){
    userStore.indexData=JSON.stringify(res.data);
    trader_profiles.value=res.data.trader_profiles;
     if(res.data.strategy_info){
    strategy_info.value=res.data.strategy_info;
     }
    
    // 首先过滤出3个月内的交易记录
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
    
    const filteredTrades = res.data.trades.filter((trade: any) => {
      const entryDate = new Date(trade.entry_date);
      // 如果交易记录有退出日期，也要检查退出日期是否在3个月内
      if (trade.exit_date) {
        const exitDate = new Date(trade.exit_date);
        // 只要entry_date或exit_date在3个月内，就显示
        return entryDate >= threeMonthsAgo || exitDate >= threeMonthsAgo;
      }
      // 如果没有退出日期（Active状态），只检查entry_date
      return entryDate >= threeMonthsAgo;
    });
    
    // 复杂排序：首先按重点交易，然后按状态，最后按时间
    const sortedTrades = filteredTrades.sort((a: any, b: any) => {
      // 首先按重点交易排序：重点交易在前
      // 处理 null/undefined 的情况
      const isImportantA = a.is_important === true || a.is_important === 1 || a.is_important === 'true' || a.is_featured === true || a.is_featured === 1;
      const isImportantB = b.is_important === true || b.is_important === 1 || b.is_important === 'true' || b.is_featured === true || b.is_featured === 1;
      
      if (isImportantA !== isImportantB) {
        return isImportantA ? -1 : 1; // 重点交易在前
      }
      
      // 然后按状态排序：Active在前，平仓在后
      const isActiveA = a.status === 'Active';
      const isActiveB = b.status === 'Active';
      
      if (isActiveA !== isActiveB) {
        return isActiveA ? -1 : 1; // Active在前
      }
      
      // 同状态内按时间排序
      if (isActiveA) {
        // 持仓的按买入时间排序（最新的在前）
        const dateA = new Date(a.entry_date);
        const dateB = new Date(b.entry_date);
        return dateB.getTime() - dateA.getTime();
      } else {
        // 平仓的按退出时间排序（最新的在前）
        const dateA = new Date(a.exit_date || a.entry_date);
        const dateB = new Date(b.exit_date || b.entry_date);
        return dateB.getTime() - dateA.getTime();
      }
    });
    
    // 调试信息：显示重点交易数量
    const importantTrades = sortedTrades.filter((t: any) => t.is_important === true || t.is_important === 1 || t.is_featured === true || t.is_featured === 1);
    if (importantTrades.length > 0) {
      console.log(`⭐ 重点交易记录数量: ${importantTrades.length}`, importantTrades.map((t: any) => ({ symbol: t.symbol, is_important: t.is_important })));
    }
    
    trades.value = sortedTrades;
    Activecount.value=trades.value.filter((item:any)=>item.status=='Active').length
    Monthly.value=res.data.Monthly;
    Total.value=res.data.Total;
   
   
  }
};
const getannouncementdataData= async()=>{
  const res=await getannouncement();
  if(res.success){
    announcementData.value=res.announcement;
    // Show welcome modal when component mounts
   
    setTimeout(() => {
        openWelcomeModal();
    }, announcementData.value.delay_seconds*1000);
  }
}
// // Set up event listeners when component mounts
// onMounted(() => {
//   getindexdata()
//   // // Close contact popup when clicking outside
//   // document.addEventListener('click', (e) => {
//   //   const target = e.target as HTMLElement;
//   //   if (!target.closest('.contact-btn') && !target.closest('.contact-popup') && showContactPopup.value) {
//   //     showContactPopup.value = false;
//   //   }
//   // });
// });

// Welcome Modal functionality
let welcomeModalInstance: Modal | null = null;

// Function to open welcome modal
const openWelcomeModal = () => {
  if (!welcomeModalInstance) {
    const modalElement = document.getElementById('welcomePopupModal');
    if (modalElement) {
      welcomeModalInstance = new Modal(modalElement, {
        backdrop: 'static',
        keyboard: false
      });
    }
  }
  
  welcomeModalInstance?.show();
};

// Function to close welcome modal
const closeWelcomeModal = () => {
  welcomeModalInstance?.hide();
};

// Function to handle joining community
const joinCommunity = () => {
  // Close welcome popup
  closeWelcomeModal();
  
  // Trigger contact button click event after a delay
  setTimeout(() => {
    toggleContactPopup();
  }, 300);
};

// 获取国家标识的样式类
const getCountryClass = (market: string) => {
  const marketUpper = market.toUpperCase();
  switch(marketUpper) {
    case 'USA':
    case 'NASDAQ':
    case 'NYSE':
      return 'country-usa';
    case 'UK':
    case 'LSE':
      return 'country-uk';
    case 'CN':
    case 'SSE':
    case 'SZSE':
      return 'country-cn';
    default:
      return 'country-default';
  }
};

// 获取国家旗帜emoji（简化版，返回空字符串）
const getCountryFlag = (market: string) => {
  return ''; // 不显示旗帜图标
};

// 获取状态样式类
const getStatusClass = (status: string, ratio: number) => {
  if (status.toLowerCase() === 'active') {
    return 'status-active';
  } else {
    // 对于所有非Active状态，根据盈亏情况判断是止盈还是止损
    if (ratio > 0) {
      return 'status-take-profit';
    } else {
      return 'status-stop-loss';
    }
  }
};

// 获取状态图标（简化版，返回空字符串）
const getStatusIcon = (status: string) => {
  return ''; // 不显示状态图标
};

// 获取状态文本（根据盈亏情况显示止盈/止损）
const getStatusText = (status: string, ratio: number) => {
  if (status.toLowerCase() === 'active') {
    return 'Active';
  } else {
    // 对于所有非Active状态，根据盈亏情况判断是止盈还是止损
    if (ratio > 0) {
      return 'Take Profit';
    } else {
      return 'Stop Loss';
    }
  }
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
    
    return date.toLocaleDateString('en-US', {
      timeZone: 'America/New_York',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch (error) {
    console.error('日期转换错误:', error, '原始时间:', dateString);
    return dateString; // 如果解析失败，返回原始字符串
  }
};

// 格式化时间，转换为美国当地时间
const formatUSTime = (dateString: string) => {
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
    
    // 转换为美国东部时间 (EST/EDT)
    const usTime = date.toLocaleString('en-US', {
      timeZone: 'America/New_York',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
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
    // 如果解析失败，返回原始字符串
    return dateString;
  }
};

// 格式化货币金额，添加千位分隔符
const formatCurrency = (amount: number | string) => {
  if (!amount && amount !== 0) return '0';
  
  // 转换为数字
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  // 添加千位分隔符
  return num.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};

// 格式化数量，添加千位分隔符
const formatQuantity = (quantity: number | string) => {
  if (!quantity && quantity !== 0) return '0';
  
  // 转换为数字
  const num = typeof quantity === 'string' ? parseFloat(quantity) : quantity;
  
  // 添加千位分隔符，不显示小数位
  return num.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
};


</script>

<style scoped>

:root {
  --primary-color: #1a1a2e;
  --secondary-color: #16213e;
  --accent-color: #4361ee;
  --success-color: #020202;
  --danger-color: #e74c3c;
  --warning-color: #f1c40f;
  --text-color: #ffffff;
  --border-color: #2a2a3a;
  --gold-color: #ffd700;
}

.app-container {
  background-color: #1a1a2e;
  min-height: 100vh;
  width: 100%;
}

body {
  color: #ffffff;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}



.card {
  background-color: #16213e;
  border: 1px solid #2a2a3a;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
  transition: all 0.3s ease;
  margin-bottom: 15px;
  overflow: hidden;
}

.card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 15px rgba(0,0,0,0.3);
  border-color: #ffd700;
}

.trade-screenshot {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-bottom: 1px solid #2a2a3a;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.trade-screenshot:hover {
  opacity: 0.9;
}

.stock-info {
  padding: 1rem;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid rgba(255, 215, 0, 0.1);
}

.stock-center {
  flex: 1;
  text-align: center;
}

.stock-symbol {
  font-size: 1.4rem;
  font-weight: 700;
  background: linear-gradient(135deg, #ffd700 0%, #ffb347 50%, #ffd700 100%);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 1px 3px rgba(255, 215, 0, 0.2);
  letter-spacing: 0.5px;
  animation: subtleGlow 4s ease-in-out infinite;
}

@keyframes subtleGlow {
  0%, 100% { 
    background-position: 0% 50%;
    filter: brightness(1);
  }
  50% { 
    background-position: 100% 50%;
    filter: brightness(1.1);
  }
}

.stock-name {
  font-size: 0.85rem;
  color: #a0a0a0;
}

/* 国家标识样式 */
.country-badge-container {
  display: flex;
  align-items: center;
}

.country-badge {
  display: inline-block;
  padding: 6px 12px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
  border: none;
  text-align: center;
  min-width: 50px;
}

.country-flag {
  display: none; /* 隐藏旗帜图标 */
}

.country-text {
  font-weight: 600;
  letter-spacing: 0.5px;
}

/* 简洁的国家标识样式 */
.country-usa {
  background: #28a745;
  border-color: #28a745;
  color: white;
  box-shadow: 0 2px 8px rgba(40, 167, 69, 0.3);
}

.country-uk {
  background: #007bff;
  border-color: #007bff;
  color: white;
  box-shadow: 0 2px 8px rgba(0, 123, 255, 0.3);
}

.country-cn {
  background: #dc3545;
  border-color: #dc3545;
  color: white;
  box-shadow: 0 2px 8px rgba(220, 53, 69, 0.3);
}

.country-default {
  background: #6c757d;
  border-color: #6c757d;
  color: white;
  box-shadow: 0 2px 8px rgba(108, 117, 125, 0.3);
}

/* 状态标识样式 */
.status-badge-container {
  display: flex;
  align-items: center;
}

.status-badge-enhanced {
  display: inline-block;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  border: 2px solid;
  background: transparent;
  text-align: center;
  min-width: 70px;
}

.status-icon {
  display: none; /* 隐藏状态图标 */
}

.status-text {
  font-weight: 600;
}

/* 简洁的Active状态样式 */
.status-active {
  background: transparent;
  border-color: #28a745;
  color: #28a745;
  box-shadow: 0 2px 8px rgba(40, 167, 69, 0.2);
}

/* 止盈状态样式 */
.status-take-profit {
  background: transparent;
  border-color: #01b622;
  color: #01b622;
  box-shadow: 0 2px 8px rgba(1, 182, 34, 0.2);
}

/* 止损状态样式 */
.status-stop-loss {
  background: transparent;
  border-color: #e74c3c;
  color: #e74c3c;
  box-shadow: 0 2px 8px rgba(231, 76, 60, 0.2);
}

.status-closed {
  background: linear-gradient(135deg, #888888 0%, #555555 100%);
  border-color: #888888;
  color: white;
}

.status-pending {
  background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
  border-color: #FFD700;
  color: #000;
}

.status-cancelled {
  background: linear-gradient(135deg, #FF4444 0%, #CC0000 100%);
  border-color: #FF4444;
  color: white;
}

.status-default {
  background: linear-gradient(135deg, #666666 0%, #444444 100%);
  border-color: #666666;
  color: white;
}

.status-badge {
  padding: 0.4rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
  border: 1px solid;
}

.secondary-info {
  padding: 1rem;
  background: linear-gradient(90deg, #16213e 0%, #1a1a2e 100%);
  border-bottom: 1px solid #2a2a3a;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

.secondary-info-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.secondary-info-label {
  font-size: 0.75rem;
  color: #a0a0a0;
}

.secondary-info-value {
  font-size: 0.9rem;
  color: #ffd700;
}

.main-stats {
  padding: 1rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  background: #1a1a2e;
}

.main-stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 0.75rem;
  background: rgba(255,215,0,0.03);
  border: 1px solid #2a2a3a;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.main-stat-item:hover {
  border-color: #ffd700;
  background: rgba(255,215,0,0.05);
}

.main-stat-label {
  font-size: 0.8rem;
  color: #a0a0a0;
  margin-bottom: 0.4rem;
  font-weight: 500;
}

.main-stat-value {
  font-size: 1.25rem;
  font-weight: 800;
  color: #ffd700;
  line-height: 1.2;
}

.profit-positive {
  color: #01b622;
  position: relative;
}

.profit-negative {
  color: #e74c3c;
  position: relative;
}


.bg-success {
  background: rgba(46, 204, 113, 0.1) !important;
  border-color: #020202 !important;
  color: #d0cece !important;
}

.bg-danger {
  background: rgba(231, 76, 60, 0.1) !important;
  border-color: #e74c3c !important;
  color: #e74c3c !important;
}

.bg-info {
  background: rgba(67, 97, 238, 0.1) !important;
  border-color: #4361ee !important;
  color: #4361ee !important;
}

.modal-content {
  background-color: #1a1a2e;
  border: 1px solid #2a2a3a;
}

/* Add Image Modal z-index settings */
.modal {
  z-index: 9999 !important;
}

.modal-backdrop {
  z-index: 1040;
}

.modal-header {
  border-bottom: 1px solid #2a2a3a;
}

/* Welcome Popup Modal Styles */
#welcomePopupModal.show .modal-dialog {
  animation: welcomeScaleIn 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

@keyframes welcomeScaleIn {
  from {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.3);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}

/* New popup content styles */
.welcome-popup-modal {
  background: linear-gradient(135deg, rgba(26,31,46,0.98) 0%, rgba(22,33,62,0.98) 100%);
  border: 1px solid rgba(255,215,0,0.3);
  border-radius: 24px;
  box-shadow: 0 10px 50px rgba(255,215,0,0.15);
  overflow: hidden;
}

.welcome-content {
  padding: 2rem;
  text-align: center;
}

.teacher-intro {
  font-size: 1.75rem;
  font-weight: 700;
  color: #ffd700;
  margin-bottom: 1rem;
  line-height: 1.3;
}

.welcome-description {
  font-size: 1.1rem;
  color: #e0e0e0;
  margin-bottom: 2rem;
  line-height: 1.6;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.performance-overview {
  margin: 2rem 0;
  padding: 2rem;
  background: linear-gradient(135deg, rgba(255,215,0,0.08) 0%, rgba(255,215,0,0.03) 100%);
  border-radius: 20px;
  border: 1px solid rgba(255,215,0,0.2);
  position: relative;
  overflow: hidden;
}

.performance-overview::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, transparent 0%, #ffd700 50%, transparent 100%);
}

.performance-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-box {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem 1.2rem;
  background: linear-gradient(145deg, rgba(26,31,46,0.8) 0%, rgba(38,42,63,0.6) 100%);
  border: 1px solid rgba(255,215,0,0.1);
  border-radius: 12px;
  transition: all 0.3s ease;
  min-width: 0;
  flex: 1;
}

.stat-box:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255,215,0,0.1);
  border-color: rgba(255,215,0,0.3);
}

.stat-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255,215,0,0.1);
  border-radius: 50%;
  color: #ffd700;
  font-size: 1.2rem;
  flex-shrink: 0;
}

.stat-info {
  text-align: left;
  flex: 1;
  min-width: 0;
  overflow: hidden;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 800;
  color: #ffd700;
  line-height: 1.2;
  word-break: break-all;
  overflow-wrap: break-word;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.stat-value.profit-positive {
  color: #01b622 !important;
}

.stat-value.profit-negative {
  color: #e74c3c !important;
}

.stat-label {
  font-size: 0.9rem;
  color: #a0a0a0;
  margin-top: 0.25rem;
}

.announcement-info {
  background: rgba(255,215,0,0.05);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid rgba(255,215,0,0.1);
}

.announcement-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  color: #ffd700;
  font-weight: 600;
  font-size: 1.1rem;
}

.announcement-content {
  color: #e0e0e0;
  line-height: 1.6;
  font-size: 1rem;
}

.community-highlight {
  margin: 2rem 0;
}

.community-benefits {
  background: linear-gradient(135deg, rgba(255,215,0,0.05) 0%, rgba(255,215,0,0.02) 100%);
  border-radius: 16px;
  padding: 1.75rem;
  border: 1px solid rgba(255,215,0,0.1);
}

.community-benefits h4 {
  color: #ffd700;
  margin-bottom: 1.25rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
}

.benefits-list {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
  max-width: 800px;
  margin: 0 auto;
}

.benefits-list li {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #e0e0e0;
  font-size: 1rem;
  line-height: 1.4;
}

.benefits-list li i {
  color: #01b622;
  flex-shrink: 0;
}

.welcome-cta {
  margin-top: 2.5rem;
}

.btn-community-primary {
  background: linear-gradient(135deg, #ffd700 0%, #ffb300 100%);
  color: #1a1a2e;
  border: none;
  border-radius: 30px;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  box-shadow: 0 4px 20px rgba(255,215,0,0.3);
}

.btn-community-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 25px rgba(255,215,0,0.4);
  background: linear-gradient(135deg, #ffed4e 0%, #ffc107 100%);
}

.btn-community-primary:active {
  transform: translateY(0);
}

/* Responsive adjustments for welcome modal */
@media (max-width: 768px) {
  .welcome-content {
    padding: 1.5rem;
  }
  
  .teacher-intro {
    font-size: 1.5rem;
  }
  
  .performance-stats {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .benefits-list {
    grid-template-columns: 1fr;
  }
  
  .btn-community-primary {
    font-size: 1rem;
    padding: 0.875rem 1.75rem;
  }
}

.modal-body {
  padding: 0;
}

.modal-footer {
  border-top: 1px solid #2a2a3a;
}

.modal-title {
  color: #ffd700;
}

.btn-close {
  filter: invert(1) grayscale(100%) brightness(200%);
}

.modal-image {
  width: 100%;
  height: auto;
  max-height: 80vh;
  object-fit: contain;
}

/* Profile Area Styles */
.profile-section {
  margin-top: 2rem;
}

.profile-header {
  background: #16213e;
  border: 1px solid #2a2a3a;
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
  position: relative;
  overflow: hidden;
}

.profile-header::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(255,215,0,0.1) 0%, rgba(255,215,0,0) 70%);
  z-index: 0;
}

.profile-main {
  display: flex;
  align-items: center;
  gap: 2.5rem;
  position: relative;
  z-index: 1;
}

.profile-avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid #ffd700;
  position: relative;
  box-shadow: 0 0 20px rgba(255,215,0,0.2);
  cursor: pointer;
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.online-status {
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 20px;
  height: 20px;
  background: #020202;
  border: 3px solid #16213e;
  border-radius: 50%;
}

.profile-details {
  flex: 1;
}

.profile-name {
  font-size: 2.5rem;
  font-weight: 700;
  color: #ffd700;
  margin-bottom: 0.5rem;
  text-shadow: 0 0 10px rgba(255,215,0,0.2);
}

.profile-title {
  font-size: 1.1rem;
  color: #a0a0a0;
  margin-bottom: 1.5rem;
}

.profile-stats {
  display: flex;
  gap: 2rem;
}

.profile-stats .stat-item {
  flex: 1 1 0;
  min-width: 120px;
  max-width: 200px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(255,215,0,0.05);
  padding: 0.75rem 1.25rem;
  border-radius: 12px;
  border: 1px solid #2a2a3a;
}

.profile-stats .stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffd700;
}

.profile-stats .stat-label {
  font-size: 0.9rem;
  color: #a0a0a0;
}

.profile-performance {
  display: flex;
  gap: 1.5rem;
  margin-top: 2rem;
}

.performance-card {
  flex: 1;
  background: rgba(255,215,0,0.03);
  border: 1px solid #2a2a3a;
  border-radius: 12px;
  padding: 1.25rem;
  transition: all 0.3s ease;
}

.performance-card:hover {
  transform: translateY(-3px);
  border-color: #ffd700;
  background: rgba(255,215,0,0.05);
}

.performance-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #a0a0a0;
  margin-bottom: 0.75rem;
}

.performance-header i {
  font-size: 1.25rem;
  color: #ffd700;
}

.performance-value {
  font-size: 1.75rem;
  font-weight: 700;
  color: #ffd700;
}

.performance-value.profit-positive {
  color: #01b622 !important;
}

.performance-value.profit-negative {
  color: #e74c3c !important;
}

.performance-value.positive {
  color: #020202;
}

/* Trading Strategy Update Area Styles */
.strategy-update {
  background: #16213e;
  border: 1px solid #2a2a3a;
  border-radius: 16px;
  padding: 2rem;
}

.strategy-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #2a2a3a;
}

.strategy-header h3 {
  font-size: 1.5rem;
  color: #ffd700;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.strategy-header h3 i {
  color: #ffd700;
}

.update-time {
  color: #a0a0a0;
  font-size: 0.9rem;
}

.strategy-content {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 2rem;
}

.strategy-content h4 {
  color: #ffd700;
  font-size: 1.1rem;
  margin-bottom: 1rem;
}

.strategy-content p {
  color: #a0a0a0;
  line-height: 1.6;
  margin: 0;
}

.trading-focus {
  background: rgba(255, 215, 0, 0.05);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: 12px;
  padding: 1.5rem;
}

.trading-focus h4 {
  color: #ffd700;
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.trading-focus h4::before {
  content: "🎯";
  font-size: 1rem;
}

.trading-focus ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.trading-focus li {
  color: #e0e0e0;
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(255, 215, 0, 0.1);
  line-height: 1.6;
  position: relative;
  padding-left: 1.5rem;
  font-weight: 600;
  font-size: 1rem;
}

.trading-focus li::before {
  content: "▶";
  color: #ffd700;
  position: absolute;
  left: 0;
  top: 0.75rem;
  font-size: 0.8rem;
}

.trading-focus li:last-child {
  border-bottom: none;
}

.risk-warning {
  background: rgba(231, 76, 60, 0.05);
  border: 1px solid #e74c3c;
  border-radius: 12px;
  padding: 1.25rem;
}

.risk-warning h4 {
  color: #e74c3c;
}

/* Trade Record Separator Styles */
.trade-separator {
  margin: 2rem 0;
}

.trade-separator h3 {
  font-size: 1.2rem;
  color: #ffd700;
  margin: 0 0 0.8rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.trade-separator h3 i {
  color: #ffd700;
  font-size: 1.1rem;
}

.trade-separator .divider-line {
  width: 100%;
  height: 2px;
  background: #2a2a3a;
}

/* Contact Button Styles */
.contact-btn {
  position: fixed;
  right: 30px;
  bottom: 30px;
  background: #ffd700;
  color: #1a1a2e;
  padding: 15px 25px;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  z-index: 1000;
  transition: all 0.3s ease;
}

.contact-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0,0,0,0.3);
}

.contact-btn i {
  font-size: 1.2rem;
}

.contact-popup {
  position: fixed;
  right: 30px;
  bottom: 90px;
  background: #16213e;
  border: 1px solid #ffd700;
  border-radius: 15px;
  padding: 20px;
  width: 300px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.3);
  z-index: 1000;
  animation: slideUp 0.3s ease;
}
.profile-badges-floating {
            position: fixed;
            top: 100px;
            right: 30px;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            z-index: 1100;
            transition: opacity 0.3s ease;
        }
        .badge-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            background: rgba(34,34,34,0.92);
            border-radius: 18px;
            box-shadow: 0 4px 18px rgba(0,0,0,0.18);
            padding: 0.7rem 1.1rem 0.4rem 1.1rem;
            min-width: 80px;
            transition: box-shadow 0.2s, transform 0.2s;
        }
        .badge-item:hover {
            box-shadow: 0 8px 28px rgba(0,0,0,0.22);
            transform: translateY(-2px) scale(1.04);
        }
        .badge-row {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.3em;
            margin-bottom: 0.2em;
        }
        .badge-icon {
            width: 22px;
            height: 22px;
            object-fit: contain;
            border-radius: 5px;
            box-shadow: 0 1px 4px #ffd70033;
            background: #111;
        }
        .badge-label {
            color: #FFD700;
            font-weight: 600;
            font-size: 1.05rem;
            letter-spacing: 1px;
        }
        .badge-value {
            color: #FFD700;
            font-weight: 700;
            font-size: 1.08rem;
            letter-spacing: 1px;
            text-shadow: 0 1px 2px #fff5;
            margin-top: 0.2rem;
        }
        .badge-value-alt {
            color: #fff;
            font-weight: 700;
            font-size: 1.08rem;
            letter-spacing: 1px;
            text-shadow: 0 1px 2px #FFD70055;
            margin-top: 0.2rem;
        }
        .badge-value-vip {
            color: #B0C4DE;
            font-weight: 700;
            font-size: 1.08rem;
            letter-spacing: 1px;
            text-shadow: 0 1px 2px #FFD70055;
            margin-top: 0.2rem;
        }
        .badge-art-text {
            background: linear-gradient(90deg, #222 60%, #444 100%);
            box-shadow: 0 4px 18px rgba(0,0,0,0.18);
            border-radius: 18px;
            padding: 0.7rem 1.1rem 0.4rem 1.1rem;
            min-width: 80px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .art-text {
            font-family: 'STXingkai', 'FZShuTi', 'Arial Black', cursive, sans-serif;
            font-size: 1.18rem;
            font-weight: bold;
            background: linear-gradient(90deg, #FFD700 60%, #fffbe6 100%);
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-shadow: 0 2px 8px #ffd70055, 0 1px 2px #fff5;
            letter-spacing: 2px;
            padding: 0.1em 0.2em;
        }
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.contact-popup h4 {
  color: #ffd700;
  margin: 0 0 15px 0;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  gap: 8px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 0;
  border-bottom: 1px solid #2a2a3a;
  color: #ffffff;
}

.contact-item:last-child {
  border-bottom: none;
}

.contact-item i {
  color: #ffd700;
  font-size: 1.2rem;
  width: 24px;
  text-align: center;
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
/* Avatar Upload and Preview Styles */
.avatar-upload {
  position: absolute;
  bottom: 0;
  right: 0;
  background: #ffd700;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.avatar-upload:hover {
  transform: scale(1.1);
}

.avatar-upload-input {
  display: none;
}

/* Avatar Preview Modal Styles */
.avatar-preview-modal .modal-content {
  background: #1a1a2e;
  border: 1px solid #ffd700;
}

.avatar-preview-img {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

/* Add glow animation at the end of style area */
.glow-bulb {
  color: #ffd700;
  filter: drop-shadow(0 0 8px #ffd700) drop-shadow(0 0 16px #fff200);
  animation: bulb-glow 1.2s infinite alternate;
  transition: color 0.3s;
}

@keyframes bulb-glow {
  0% {
    filter: drop-shadow(0 0 4px #ffd700) drop-shadow(0 0 8px #fff200);
    color: #ffd700;
  }
  50% {
    filter: drop-shadow(0 0 16px #fff200) drop-shadow(0 0 32px #fffbe0);
    color: #fffbe0;
  }
  100% {
    filter: drop-shadow(0 0 4px #ffd700) drop-shadow(0 0 8px #fff200);
    color: #ffd700;
  }
}

 /* Mobile responsiveness */
 @media (max-width: 768px) {
   .profile-main {
     flex-direction: column;
     text-align: center;
     gap: 1.5rem;
   }

   .profile-stats {
     justify-content: center;
   }

   .profile-performance {
     flex-direction: column;
   }

   .strategy-content {
     grid-template-columns: 1fr;
   }

   .strategy-header {
     flex-direction: column;
     align-items: flex-start;
     gap: 0.5rem;
   }

   .strategy-header h3 {
     font-size: 1.3rem;
     margin-bottom: 0.3rem;
   }

   .update-time {
     margin-left: 2rem;
     font-size: 0.85rem;
   }

   .profile-avatar {
     width: 120px;
     height: 120px;
   }

   .profile-name {
     font-size: 2rem;
   }

   .contact-popup {
     width: calc(100% - 60px);
     right: 15px;
     bottom: 90px;
   }
 }

 /* 超小屏幕优化 */
 @media (max-width: 480px) {
   .modal-dialog {
     margin: 0.25rem;
     max-width: calc(100% - 0.5rem);
   }

   .modal-header {
     padding: 0.75rem;
   }

   .modal-body {
     padding: 0.75rem;
   }

   .modal-header .modal-title {
     font-size: 1rem;
   }
 }

 @keyframes progressBar {
     0% {
         transform: translateX(-100%);
     }
     100% {
         transform: translateX(0);
     }
 }

 @keyframes textGradient {
     0% {
         opacity: 0.7;
         background-position: 0 0;
     }
     50% {
         opacity: 1;
         background-position: 100% 0;
     }
     100% {
         opacity: 0.7;
         background-position: 200% 0;
     }
 }

 @keyframes dots {
     0% { content: '.'; }
     33% { content: '..'; }
     66% { content: '...'; }
     100% { content: ''; }
 }
</style>

