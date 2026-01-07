<template>
  <div class="app-container">
    <navcomponent></navcomponent>
    <!-- Top Navigation -->
    <!-- <nav class="top-nav">
      <div class="nav-content">
        <div class="nav-left">
          <a href="/" class="btn btn-back">
              <i class="bi bi-arrow-left me-1"></i>Back to Home
            </a>
        </div>
        <div class="nav-center d-none d-md-flex">
          <i class="bi bi-graph-up header-icon"></i>
          <h1 class="header-title">{{ homeTopTitle }}</h1>
        </div>
        <div class="nav-right">
          <button class="btn btn-login" :class="{ 'logged-in': isLoggedIn }" @click="handleLoginButtonClick">
            <i :class="isLoggedIn ? 'bi bi-person-check-fill' : 'bi bi-person-fill'" class="me-1"></i>
            {{ isLoggedIn ? username : 'Login' }}
          </button>
        </div>
      </div>
    </nav> -->

    <!-- Login Modal -->
    <div class="modal fade" id="loginModal" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
          <h5 class="modal-title" id="loginModalLabel">User Login</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
          <div class="modal-body">
            <form @submit.prevent="handleLogin">
              <div class="mb-3">
                <label for="username" class="form-label">Username</label>
              <input type="text" class="form-control" id="username" v-model="loginUsername" placeholder="Enter your username">
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
              <input type="password" class="form-control" id="password" v-model="loginPassword" placeholder="Enter your password">
              </div>
              <button type="submit" class="btn btn-submit">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Dynamic VIP Welcome Zone -->
    <div class="vip-dynamic-zone">
      <div class="dynamic-background">
        <div class="wave-animation"></div>
        <div class="floating-particles">
          <div class="particle particle-1">💫</div>
          <div class="particle particle-2">✨</div>
          <div class="particle particle-3">🌟</div>
          <div class="particle particle-4">💎</div>
          <div class="particle particle-5">⚡</div>
        </div>
        <div class="gradient-orbs">
          <div class="orb orb-1"></div>
          <div class="orb orb-2"></div>
          <div class="orb orb-3"></div>
        </div>
      </div>
      
      <div class="welcome-stage">
        <!-- VIP Crown Animation -->
        <div class="crown-entrance">
          <div class="crown-glow-ring"></div>
          <div class="crown-main">👑</div>
          <div class="crown-sparkles">
            <div class="sparkle sparkle-1">✦</div>
            <div class="sparkle sparkle-2">✧</div>
            <div class="sparkle sparkle-3">✦</div>
            <div class="sparkle sparkle-4">✧</div>
          </div>
        </div>
        
        <!-- Dynamic Welcome Text -->
        <div class="welcome-text-dynamic">
          <div class="welcome-line-1">
            <span class="text-reveal text-greeting">Welcome Back,</span>
          </div>
          <div class="welcome-line-2">
            <span class="text-reveal text-name">{{ isLoggedIn ? username : 'Elite Trader' }}</span>
            <div class="text-decoration">
              <div class="name-underline"></div>
              <div class="name-glow"></div>
            </div>
          </div>
          <div class="welcome-line-3">
            <span class="text-reveal text-subtitle">Your VIP Trading Sanctuary Awaits</span>
            <div class="subtitle-effects">
              <div class="typing-cursor">|</div>
            </div>
          </div>
          
          <!-- Text Enhancement Effects -->
          <div class="text-background-effects">
            <div class="text-shadow-1"></div>
            <div class="text-shadow-2"></div>
            <div class="text-shadow-3"></div>
          </div>
        </div>
        
      
        
        <!-- Meteor Lightsaber Effects -->
        <div class="meteor-effects">
          <div class="meteor-trail meteor-1">
            <div class="meteor-core"></div>
            <div class="meteor-glow"></div>
            <div class="meteor-particles">
              <div class="particle p1"></div>
              <div class="particle p2"></div>
              <div class="particle p3"></div>
            </div>
          </div>
          
          <div class="meteor-trail meteor-2">
            <div class="meteor-core"></div>
            <div class="meteor-glow"></div>
            <div class="meteor-particles">
              <div class="particle p1"></div>
              <div class="particle p2"></div>
              <div class="particle p3"></div>
            </div>
          </div>
          
          <div class="meteor-trail meteor-3">
            <div class="meteor-core"></div>
            <div class="meteor-glow"></div>
            <div class="meteor-particles">
              <div class="particle p1"></div>
              <div class="particle p2"></div>
              <div class="particle p3"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container" style="max-width: 1230px;">
      <!-- Progress Section -->
      <div class="progress-section">
        <a href="/vipdashboard" style="text-decoration:none;color:inherit;" @click.prevent="handleProgressCardClick">
          <div class="progress-card" :class="{ 'clickable': isLoggedIn, 'unclickable': !isLoggedIn }" :style="{ cursor: isLoggedIn ? 'pointer' : 'not-allowed' }">
            <div class="row align-items-center g-2">
              <div class="col-md-3">
                <div class="current-level">
                  <i class="bi bi-star-fill"></i>
                  <h4 class="text-white mb-0" style="font-size: 1rem;">Current Level</h4>
                  <p class="text-gold mb-0">{{ nowLevelInfo.currlevelname }}</p>
                </div>
              </div>
              <div class="col-md-6">
                <div class="progress-bar-wrapper">
                  <div class="progress">
                    <div class="progress-bar" role="progressbar" 
                      :style="{ width: progress + '%' }"
                      :aria-valuenow="dynamicTotalAsset"
                      aria-valuemin="0"
                      :aria-valuemax="currentTarget">
                      <span class="progress-percent">{{ progress }}%</span>
                    </div>
                  </div>
                  <div class="progress-labels d-flex justify-content-between">
                    <span style="font-size: 14px;">${{ formatNumber(dynamicTotalAsset) }} / ${{ formatNumber(nowLevelInfo.nextmoney) }}</span>
                    <span class="text-gold">Next Level: {{ nowLevelInfo.nextname }}</span>
                    
                  </div>
                </div>
              </div>
              <div class="col-md-3">
                <div class="next-milestone">
                  <i class="bi bi-crown-fill"></i>
                  <h4 class="text-white mb-0" style="font-size: 1rem;">Next Level</h4>
                  <p class="text-gold mb-0">{{ nowLevelInfo.nextname }}</p>
                </div>
              </div>
            </div>
          </div>
        </a>
      </div>

      <!-- Membership Cards Section -->
      <div class="membership-cards-container">
        <!-- Membership Cards -->
        <div v-for="(level, index) in vipList" :key="index" class="membership-card-wrapper">
          <div :class="['membership-card', getCardClass(level.name), 'text-center']">
            <span v-if="nowLevelInfo.currlevelname === level.name" class="vip-badge">Current Selection</span>
            <i class="bi bi-star-fill card-icon"></i>
            <h3 class="h3Height">{{ level.name }}</h3>
            <div class="card-requirement">>=${{ formatNumber(level.min_trading_volume) }}</div>
            <ul class="feature-list">              <li v-for="(benefit, i) in level.benefits" :key="i">
                <i class="bi bi-check-circle-fill"></i> {{ benefit }}
              </li>
            </ul>
         
            <div v-if="level.vip_price>0" class="upgrade-info">
              <div class="vip-price">
                <span class="price-value">
                  {{ formatNumber(level.vip_price || 0) }}
                  <span class="price-currency">USDT</span>
                </span>
              </div>
              <button class="btn-purchase" @click="openPaymentModal(level)">
                Purchase Now
              </button>
            </div>          
          </div>
        </div>
      </div>
      
      <!-- Membership Agreement Button -->
      <div class="text-center mt-4 mb-4">
        <button class="btn-community-primary" data-bs-toggle="modal" data-bs-target="#membershipAgreementModal">
          <i class="bi bi-file-text me-2"></i>View Membership Agreement
        </button>
      </div>
      
    </div>
    
    <!-- Membership Agreement Modal -->
    <div class="modal fade" id="membershipAgreementModal" tabindex="-1" aria-labelledby="membershipAgreementModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="membershipAgreementModalLabel">Membership Agreement</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="agreement-content">
              <div class="agreement-header-section">
                <h3 class="agreement-main-title">Membership Agreement</h3>
                <p class="agreement-description">
                  This platform is a paid service focused on providing members with professional investment strategies and market analysis. Members pay commissions based on actual profits. In the event of significant losses, the platform will compensate and share commissions according to the ratios shown in the membership level table.
                </p>
              </div>
              
              <div class="agreement-table-section">
                <h4 class="table-title">Membership Commission Mechanism</h4>
                <div class="table-responsive">
                  <table class="table table-striped table-dark">
                    <thead>
                      <tr>
                        <th>Membership Level</th>
                        <th>Fund Range</th>
                        <th>Monthly Profit Ratio</th>
                        <th>Commission Ratio</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(level, index) in vipList" :key="index">
                        <td><span class="badge bg-warning">{{level.name}}</span></td>
                        <td>>=${{ formatNumber(level.min_trading_volume) }}</td>
                        <td><span class="text-success">{{level.monthly_profit_ratio}}%</span></td>
                        <td><span class="text-info">{{level.commission_ratio}}%</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div class="agreement-table-section">
                <h4 class="table-title">Membership Compensation Mechanism</h4>
                <div class="table-responsive">
                  <table class="table table-striped table-dark">
                    <thead>
                      <tr>
                        <th>Membership Level</th>
                        <th>Fund Range</th>
                        <th>Risk Ratio</th>
                        <th>Compensation Ratio</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(level, index) in vipList" :key="index">
                        <td><span class="badge bg-warning">{{level.name}}</span></td>
                        <td>>=${{ formatNumber(level.min_trading_volume) }}</td>
                        <td><span class="text-danger">{{level.risk_ratio}}%</span></td>
                        <td><span class="text-success">{{level.compensation_ratio}}%</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div class="agreement-terms">
                <h4>Terms and Conditions</h4>
               
                <ul class="terms-list">
                  <li v-for="(term, index) in traderTerms" :key="index">
                    <i class="bi bi-check-circle text-success me-2"></i>{{ term }}
                  </li>
                  <!-- 如果没有交易员条款数据，显示默认条款 -->
                  <template v-if="traderTerms.length === 0">
                    <li><i class="bi bi-check-circle text-success me-2"></i>Membership fees are non-refundable once paid</li>
                    <li><i class="bi bi-check-circle text-success me-2"></i>Commission is calculated based on actual profits</li>
                    <li><i class="bi bi-check-circle text-success me-2"></i>Compensation is provided for losses exceeding risk thresholds</li>
                    <li><i class="bi bi-check-circle text-success me-2"></i>Platform reserves the right to modify terms with notice</li>
                    <li><i class="bi bi-check-circle text-success me-2"></i>All trading involves risk, past performance doesn't guarantee future results</li>
                  </template>
                </ul>
              </div>
              
            
            </div>
          </div>
          <div class="modal-footer justify-content-center">
            <button type="button" class="btn-community-primary" @click="joinCommunity">
              I already know
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Payment Modal -->
    <div class="modal fade" id="paymentModal" tabindex="-1" aria-labelledby="paymentModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title display-6 text-gold" id="paymentModalLabel">
              <i class="bi bi-crown me-2"></i>VIP Payment
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <!-- Payment QR Code Section -->
            <div class="payment-section mb-5 p-4 bg-gradient-radial" style="background: rgba(255, 215, 0, 0.05); border-radius: 20px; border: 1px solid rgba(255, 215, 0, 0.1);">
              <!-- Amount -->
              <div class="text-center mb-4">
                <h4 class="section-title" style="color: #ffd700; font-weight: 700; margin-bottom: 0.5rem;">
                  Amount
                </h4>
                <div class="payment-detail-item">
                  <span class="font-weight-bold text-gold" style="font-size: 1.8rem;">
                    {{ formatNumber(selectedVipLevel?.vip_price || 0) }}
                    <span style="font-size: 1rem;"> USDT</span>
                  </span>
                </div>
              </div>
              
              <!-- QR Code -->
              <div class="text-center">
                <h4 class="section-title mb-3" style="color: #ffd700; font-weight: 700;">
                  QR Code
                </h4>
                <div class="qr-code-container p-4" style="background: rgba(255, 255, 255, 0.05); border-radius: 15px; display: inline-block; max-width: 100%;">
                  <img 
                    v-if="paymentQrCode" 
                    :src="paymentQrCode" 
                    alt="Payment QR Code" 
                    class="payment-qr-code"
                  >
                  <div v-else class="qr-code-placeholder">
                    <i class="bi bi-qr-code display-1 text-gold"></i>
                    <p class="text-muted mt-2">Loading QR Code...</p>
                  </div>
                  
                </div>
              </div>
               <div class="qr-code-placeholder">
                    wallet:<i class="bi display-1 text-gold" style="font-size: 13px;">{{ paycode }}</i> <a @click="copypaycode" style="cursor: pointer;">copy</a>
                  </div>
            </div>

            <!-- Payment Proof Upload Section -->
            <div class="upload-section p-4 bg-gradient-radial" style="background: rgba(255, 215, 0, 0.05); border-radius: 20px; border: 1px solid rgba(255, 215, 0, 0.1);">
              <h4 class="section-title mb-4 text-center" style="color: #ffd700; font-weight: 700;">
                <i class="bi bi-upload me-2"></i>Upload Payment Proof
              </h4>
              
              <div class="upload-container text-center">
                <input 
                  type="file" 
                  id="paymentProof" 
                  ref="paymentProofUpload" 
                  class="payment-proof-input" 
                  accept="image/*" 
                  @change="handlePaymentProofUpload"
                >
                
                <div v-if="!paymentProofPreview" class="upload-placeholder">
                  <button 
                    type="button" 
                    class="btn-upload"
                    @click="triggerPaymentProofUpload"
                  >
                    <i class="bi bi-cloud-arrow-up-fill display-3 mb-3 text-gold"></i>
                    <h5 class="mb-2" style="font-weight: 600;">Click or Drag to Upload</h5>
                    <p class="text-muted mb-1">Upload your payment screenshot here</p>
                    <small class="text-muted">Supports JPG, PNG, GIF • Max 5MB</small>
                  </button>
                </div>
                
                <!-- Preview uploaded image -->
                <div v-else class="proof-preview-container mt-4">
                  <div class="proof-preview">
                    <img :src="paymentProofPreview" alt="Payment Proof Preview" class="preview-image">
                    <button 
                      type="button" 
                      class="btn-remove-preview"
                      @click="removePaymentProofPreview"
                    >
                      <i class="bi bi-x-lg"></i>
                    </button>
                  </div>
                  <div class="proof-preview-info mt-3">
                    <h6 class="mb-0" style="font-weight: 600;">Payment Proof Uploaded</h6>
                    <p class="text-muted text-sm mb-0">Click the <i class="bi bi-x"></i> button to replace the image</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer justify-content-center gap-3 py-4">
            <button type="button" class="btn-secondary" data-bs-dismiss="modal">
              <i class="bi bi-x-circle me-2"></i>Cancel
            </button>
            <button 
              type="button" 
              class="btn-community-primary" 
              @click="submitPayment"
              :disabled="!paymentProofPreview"
              style="min-width: 200px;"
            >
              <i v-if="!isSubmitting" class="bi bi-check-circle me-2"></i>
              <i v-else class="bi bi-hourglass-split me-2"></i>
              <span v-if="!isSubmitting">Submit Payment</span>
              <span v-else>Processing...</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Interactive Trading Quiz -->
    <div class="trading-quiz-arena" v-if="quizQuestions.length>0">
      <div class="quiz-container-interactive">
        
        <!-- Quiz Dashboard -->
        <div class="quiz-dashboard">
          <div class="dashboard-left">
            <div class="quiz-branding">
              <div class="brand-icon">💰</div>
              <div class="brand-text">
                <h2>Trading Mastery Challenge</h2>
                <p>Prove Your Market Expertise</p>
              </div>
            </div>
        </div>

          <div class="dashboard-center">
            <div class="question-counter">
              <div class="counter-display">
                <span class="current">{{ currentQuestionIndex + 1 }}</span>
                <span class="divider">/</span>
                <span class="total">{{ quizQuestions.length }}</span>
              </div>
              <div class="counter-label">Questions</div>
            </div>
          </div>
          
          <div class="dashboard-right">
            <div class="score-tracker">
              <div class="score-display">
                <span class="score-number">{{ score }}</span>
                <span class="score-label">Score</span>
              </div>
              <div class="accuracy-ring">
                <svg width="60" height="60" class="ring-svg">
                  <circle cx="30" cy="30" r="25" class="ring-bg"></circle>
                  <circle cx="30" cy="30" r="25" class="ring-progress" 
                    :stroke-dasharray="157" 
                    :stroke-dashoffset="157 - (157 * (currentQuestionIndex > 0 ? score / currentQuestionIndex : 0))"></circle>
                </svg>
                <div class="ring-text">{{ currentQuestionIndex > 0 ? Math.round((score / currentQuestionIndex) * 100) : 0 }}%</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Question Area -->
        <div class="question-arena" v-if="!quizCompleted">
          <div class="question-stage">
            <div class="question-badge">
              <span class="badge-icon">🎯</span>
              <span class="badge-text">Financial Strategy</span>
            </div>
            
            <div class="question-content">
              <h3 class="main-question">{{ currentQuestion.question }}</h3>
            </div>
          </div>
          
          <!-- Interactive Answer Cards -->
          <div class="answer-battlefield">
            <div
              v-for="(option, index) in currentQuestion.options"
              :key="index"
              class="answer-card"
              :class="{
                'selected': selectedAnswer === index,
                'correct-answer': showResult && index === currentQuestion.correctAnswer,
                'wrong-answer': showResult && selectedAnswer === index && index !== currentQuestion.correctAnswer,
                'revealed': showResult
              }"
              @click="handleSelectAnswer(index)"
              @mouseenter="playHoverSound"
            >
              <div class="card-header">
                <div class="option-badge">{{ String.fromCharCode(65 + index) }}</div>
                <div class="card-status">
                  <div v-if="showResult && index === currentQuestion.correctAnswer" class="status-icon correct">✓</div>
                  <div v-else-if="showResult && selectedAnswer === index && index !== currentQuestion.correctAnswer" class="status-icon wrong">✗</div>
                </div>
              </div>
              
              <div class="card-content">
                <p class="answer-text">{{ option }}</p>
              </div>
              
              <div class="card-glow"></div>
            </div>
          </div>
          
          <!-- Next Question Button -->
          <div v-if="showResult" class="next-question-zone">
            <button @click="goToNextQuestion" class="next-question-btn">
              <span class="btn-icon">{{ currentQuestionIndex < quizQuestions.length - 1 ? '🚀' : '🏁' }}</span>
              <span class="btn-text">{{ currentQuestionIndex < quizQuestions.length - 1 ? 'Next Challenge' : 'See Results' }}</span>
              <div class="btn-shine"></div>
            </button>
          </div>
          </div>

        <!-- Victory Screen -->
        <div v-else class="victory-screen">
          <div class="victory-animation">
            <div class="trophy-container">
              <div class="trophy-glow"></div>
              <div class="trophy">🏆</div>
              <div class="victory-particles"></div>
            </div>
            
            <h2 class="victory-title">Trading Challenge Complete!</h2>
            
            <div class="final-stats">
              <div class="stat-card">
                <div class="stat-icon">🎯</div>
                <div class="stat-value">{{ score }}/{{ quizQuestions.length }}</div>
                <div class="stat-label">Correct Answers</div>
              </div>
              
              <div class="stat-card">
                <div class="stat-icon">📊</div>
                <div class="stat-value">{{ Math.round((score / quizQuestions.length) * 100) }}%</div>
                <div class="stat-label">Accuracy Rate</div>
              </div>
              
              <div class="stat-card">
                <div class="stat-icon">⭐</div>
                <div class="stat-value">{{ getPerformanceRating() }}</div>
                <div class="stat-label">Performance</div>
              </div>
            </div>
            
            <div class="victory-message">
              <div v-if="score === quizQuestions.length" class="perfect-message">
                <h4>🌟 PERFECT SCORE! 🌟</h4>
                <p>You're a true trading master! Your market knowledge is exceptional and ready for real trading!</p>
              </div>
              <div v-else-if="score >= quizQuestions.length * 0.8" class="excellent-message">
                <h4>🎯 EXCELLENT PERFORMANCE!</h4>
                <p>Outstanding! You have strong trading fundamentals. You're well-prepared for market challenges!</p>
              </div>
              <div v-else-if="score >= quizQuestions.length * 0.6" class="good-message">
                <h4>📈 SOLID PROGRESS!</h4>
                <p>Good work! You're building solid knowledge. Keep learning to become a trading expert!</p>
              </div>
              <div v-else class="improve-message">
                <h4>💪 KEEP GROWING!</h4>
                <p>Every successful trader started here. Focus on learning and you'll see amazing progress!</p>
              </div>
            </div>
            
            <div class="victory-actions">
              <button @click="restartQuiz" class="action-button primary">
                <span class="btn-icon">🔥</span>
                <span>New Challenge</span>
                <div class="button-ripple"></div>
              </button>
              
              <button @click="restartQuiz" class="action-button secondary">
                <span class="btn-icon">📚</span>
                <span>Change Topic</span>
            </button>
            </div>
          </div>
          </div>
        </div>

      <!-- Floating Success/Error Notifications -->
      <div v-if="showNotification" class="floating-notification" :class="notificationType">
        <div class="notification-bubble">
          <div class="bubble-icon">
            {{ notificationType === 'success' ? '🎉' : '💡' }}
        </div>
          <div class="bubble-text">{{ notificationMessage }}</div>
          <div class="bubble-progress"></div>
      </div>
      </div>
      
      <!-- Background Effects -->
      <div class="quiz-background-effects">
        <div class="floating-coin coin-1">💰</div>
        <div class="floating-coin coin-2">📈</div>
        <div class="floating-coin coin-3">💎</div>
        <div class="floating-coin coin-4">🚀</div>
      </div>
    </div>

     <!-- Redirect Message -->
    <div class="redirect-message" v-show="showContactPopup">
        <span class="text">Redirecting to WhatsApp Community</span><span class="dots"></span>
    </div>
    <!-- 合作单位 -->
    <PartnerOrganizations />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted,computed } from 'vue';
import { useRouter } from 'vue-router';
import { Modal } from 'bootstrap';
import navcomponent from '../component/nav/nav.vue'
import PartnerOrganizations from '@/components/PartnerOrganizations.vue';
import{ get_userinfo,get_membership_levels,updateUserLevel, get_random_questions,startquestions, createPaymentRecord } from '../../api/module/web/vip'
import { get_whatsapp_link,gettrader_profiles } from '../../api/module/web/index'
import { uploadImage } from '../../api/module/commone'
import { useUserStore } from '@/store';
const userStore = useUserStore()
const router = useRouter();

// Contact popup state (same as HomeView.vue)
const showContactPopup = ref(false);

// Toggle contact popup function (same as HomeView.vue)
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

// Payment Modal state
const selectedVipLevel = ref(null);
const paymentQrCode = ref('');
const paycode = ref('');
const paymentProofPreview = ref('');
const isSubmitting = ref(false);
const isUploading = ref(false); // Upload status flag
const paymentProofUpload = ref(null);
const traderProfiles=ref({})
let paymentModalInstance = null;
let uploadedImageUrl = ref(''); // Store the uploaded image URL

// Open payment modal
const openPaymentModal = (level) => {
  selectedVipLevel.value = level;
  isSubmitting.value = false;
  paymentProofPreview.value = '';
  
  // Get payment QR code
  getPaymentQrCode();
  
  // Show modal
  if (!paymentModalInstance) {
    const modalElement = document.getElementById('paymentModal');
    if (modalElement) {
      paymentModalInstance = new Modal(modalElement);
    }
  }
  paymentModalInstance?.show();
};

// Get payment QR code from traderProfiles
const getPaymentQrCode = () => {
  console.log(traderProfiles.value)
  // Use the pay_qr_code_img from the loaded traderProfiles
  paymentQrCode.value = traderProfiles.value.pay_qr_code_img || '';
  paycode.value = traderProfiles.value.paycode || '';
};

// Trigger payment proof upload
const triggerPaymentProofUpload = () => {
  paymentProofUpload.value?.click();
};

// Handle payment proof upload
const handlePaymentProofUpload = async (event) => {
  const file = event.target.files[0];
  if (file) {
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }
    
    // Create preview URL
    const reader = new FileReader();
    reader.onload = (e) => {
      paymentProofPreview.value = e.target.result;
    };
    reader.readAsDataURL(file);
    
    // Set uploading state
    isUploading.value = true;
    
    try {
      // Create FormData object
      const formData = new FormData();
      formData.append('file', file);
      
      // Call uploadImage API to upload image
      const response = await uploadImage(formData);
      
      // Store the uploaded image URL
      uploadedImageUrl.value = response.data.url;
      console.log('Payment proof uploaded successfully:', uploadedImageUrl.value);
    } catch (error) {
      console.error('Failed to upload payment proof:', error);
      alert('Failed to upload payment proof. Please try again later.');
      // Clear preview if upload fails
      removePaymentProofPreview();
    } finally {
      // Reset upload state
      isUploading.value = false;
      // Clear input to allow selecting the same file again
      event.target.value = '';
    }
  }
};

// Remove payment proof preview
const removePaymentProofPreview = () => {
  paymentProofPreview.value = '';
  uploadedImageUrl.value = ''; // Clear the uploaded image URL
  if (paymentProofUpload.value) {
    paymentProofUpload.value.value = '';
  }
};

// Submit payment
const submitPayment = async () => {
  if (!paymentProofPreview.value) {
    alert('Please upload payment proof first');
    return;
  }
  
  if (!uploadedImageUrl.value) {
    alert('Please wait for the payment proof to upload successfully');
    return;
  }
  
  isSubmitting.value = true;
  
  try {
    // Create payment record data
    const paymentData = {
      vip_level_id: selectedVipLevel.value.id,
      vip_level_name: selectedVipLevel.value.name,
      amount: selectedVipLevel.value.vip_price,
      payment_screenshot: uploadedImageUrl.value,
      trader_uuid: traderProfiles.value.trader_uuid || '' // 添加trader_uuid字段
    };
    
    // Call API to create payment record
    const response = await createPaymentRecord(paymentData);
    
    if (response.success) {
      console.log('Payment record created successfully:', paymentData);
      alert('Payment submitted successfully! We will review your payment and upgrade your VIP level within 24 hours.');
      
      // Close modal
      paymentModalInstance?.hide();
      
      // Reset form
      removePaymentProofPreview();
      selectedVipLevel.value = null;
      paymentQrCode.value = '';
    } else {
      throw new Error(response.message || 'Failed to create payment record');
    }
  } catch (error) {
    console.error('Failed to submit payment:', error);
    alert('Failed to submit payment. Please try again later.');
  } finally {
    isSubmitting.value = false;
  }
};

// Function to handle joining community (same as HomeView.vue)
const joinCommunity = () => {
  // Close membership agreement modal
  const modalElement = document.getElementById('membershipAgreementModal');
  if (modalElement) {
    const modal = Modal.getInstance(modalElement) || new Modal(modalElement);
    modal.hide();
  }
  
  
};
const userinfo=ref({})
const membership_levels=ref([])
const traderTerms=ref<string[]>([])
// Page data
const homeTopTitle = ref('RenderZaice Trading Platform');
const membershipLevel = ref('Regular Member');
const isLoggedIn = ref(false);
const username = ref('');
const loginUsername = ref('');
const loginPassword = ref('');
const current_level=ref(0)
// 模拟数据
const nowLevelInfo = ref({
  current_level:-1,
  currlevelname: 'Regular Member',
  next_level: -1,
  nextmoney: 50000,
  nextname: 'Gold Member'
});

const dynamicTotalAsset = ref(0);
const currentTarget = ref(1000000);
const progress = ref(Math.round((dynamicTotalAsset.value / nowLevelInfo.value.nextmoney) * 100 * 10) / 10);

const vipList = ref([]);

// 根据会员等级获取标题
const getTitleByLevel = (level: string) => {
  const titleMap: Record<string, string> = {
    'Regular Member': 'Esteemed VIP Member',
    'Gold Member': 'Honorable Gold Member',
    'Diamond Member': 'Distinguished Diamond Member',
    'Supreme Black Card': 'Supreme Black Card Member'
  };
  return titleMap[level] || 'VIP Membership Area';
};

// 获取卡片样式类
const getCardClass = (level: string) => {
  const classMap: Record<string, string> = {
    '黄金会员': 'premium',
    '钻石会员': 'diamond',
    '至尊黑卡': 'supreme'
  };
  return classMap[level] || '';
};

// 格式化数字
const formatNumber = (num: number) => {
  return num.toLocaleString('en-US');
};

// 加载交易员条款数据
const loadTraderTerms = async () => {
  try {
    const response = await gettrader_profiles();
   
    if (response.success && response.data) {
      // 获取第一个交易员档案的terms数据
      const traderProfile = response.data.trader_profiles;
      // 保存完整的交易员档案数据
      traderProfiles.value = traderProfile;
      
      if (traderProfile.terms) {
        // 将terms字符串按行分割成数组
        traderTerms.value = traderProfile.terms.split('\n').filter(term => term.trim() !== '');
      }
    }
  } catch (error) {
    console.error('加载交易员条款失败:', error);
  }
};

// 处理登录按钮点击
const handleLoginButtonClick = () => {
  if (isLoggedIn.value) {
    handleLogout();
  } else {
     router.push('/userlogin');
    // // 显示登录模态框
    // const loginModal = new (window as any).bootstrap.Modal(document.getElementById('loginModal'));
    // loginModal.show();
  }
};

// 处理登录表单提交
const handleLogin = async () => {
  if (!loginUsername.value.trim() || !loginPassword.value.trim()) {
    alert('Please enter username and password');
    return;
  }
  
  try {
    // 模拟登录成功
    isLoggedIn.value = true;
    username.value = loginUsername.value;
    
    // 关闭模态框
    const loginModal = new (window as any).bootstrap.Modal(document.getElementById('loginModal'));
    loginModal.hide();
    
    // 清空表单
    loginUsername.value = '';
    loginPassword.value = '';
    
    alert('Login successful!');
    // 更新UI
    updateUIForLoggedInUser();
  } catch (error) {
    console.error('登录错误:', error);
    alert('Login failed, please try again');
  }
};

// 处理登出
const handleLogout = async () => {
  try {
    // 模拟登出成功
    isLoggedIn.value = false;
    username.value = '';
    alert('Logout successful!');
    // 刷新页面
    window.location.reload();
  } catch (error) {
    console.error('登出错误:', error);
    alert('Logout failed, please try again');
  }
};

// 处理进度卡片点击
const handleProgressCardClick = () => {
  if (isLoggedIn.value) {
      if(userStore.userInfo.signing)
      {
        router.push('/vipdashboard');
      }
      else
      {
         const modalElement = document.getElementById('membershipAgreementModal');
       const modal = Modal.getInstance(modalElement) || new Modal(modalElement);
      modal.show();
      }
  } else {
    alert('Please login first');
    const loginModal = new (window as any).bootstrap.Modal(document.getElementById('loginModal'));
    loginModal.show();
  }
};
// 初始化
onMounted(() => {
  // 模拟检查登录状态
  // 实际项目中应该通过API检查登录状态
  get_info()
 
});
const get_info=async()=>{
  if(userStore.token){
    await getUserInfo()
  }
  await get_membership_levels_list()
   get_current_level()
   fetchQuizQuestions()
   loadTraderTerms()
}
const getUserInfo=async()=>{
  try{
  const res=await get_userinfo()
  if(res.success)
  {
    userinfo.value=res.data
    username.value=res.data.username
    isLoggedIn.value=true
    dynamicTotalAsset.value = userinfo.value.initial_asset+userinfo.value.utotle_profit;
    nowLevelInfo.value.nextmoney=1000000
    progress.value = Math.round((dynamicTotalAsset.value / nowLevelInfo.value.nextmoney) * 100 * 10) / 10;
  }
}
catch(err){
  console.log(err)
}
 
  
}
const get_membership_levels_list=async()=>{
  const res=await get_membership_levels()
  if(res.success)
  {
    vipList.value=res.data
    vipList.value.forEach(item => {
      item.benefits=item.benefits.split(',')
    });
     userStore.vipList=vipList.value
  }
}
const get_current_level=async()=>{
  vipList.value.forEach(item => {
    if(item.min_trading_volume<=dynamicTotalAsset.value)
    {
      nowLevelInfo.value.current_level=item.level
      nowLevelInfo.value.currlevelname=item.name
    }
  });

  vipList.value.forEach(item => {
    if(nowLevelInfo.value.next_level==-1 && item.level>nowLevelInfo.value.current_level)
    {
      nowLevelInfo.value.next_level=item.level
      nowLevelInfo.value.nextmoney=item.min_trading_volume
      nowLevelInfo.value.nextname=item.name
    }
  });
  if(userStore.token){
  await updateUserLevel({levelname:nowLevelInfo.value.currlevelname})
  }

}

// Quiz Functionality
// Question data
const quizQuestions = ref([]);

// 响应式变量
const currentQuestionIndex = ref(0);
const selectedAnswer = ref<number | null>(null);
const showResult = ref(false);
const isAnswerCorrect = ref(false);
const quizCompleted = ref(false);
const score = ref(0);
const isLoading = ref(false);
const isFireworkActive = ref(false);
const answersHistory = ref<boolean[]>([]);
const showNotification = ref(false);
const notificationType = ref('success');
const notificationMessage = ref('');
let fireworkInterval: number | null = null;
const startQuestion=ref(false)
// Function to fetch quiz questions from API
const fetchQuizQuestions = async () => {
  try {
    startQuestion.value=false;
    isLoading.value = true;
    const response = await get_random_questions();
    if (response.success && response.data && response.data.length > 0) {
      // Format the questions to match the expected structure
      quizQuestions.value = response.data;
    } else {
      // Fallback to default questions if API fails
      console.warn('Failed to fetch questions from API, using default questions');
      quizQuestions.value = [
       
      ];
    }
  } catch (error) {
    console.error('Error fetching quiz questions:', error);
    // Set default questions in case of error
    quizQuestions.value = [
     
    ];
  } finally {
    isLoading.value = false;
  }
};

// 获取当前题目
const currentQuestion = computed(() => {
  console.log(quizQuestions.value)
  return quizQuestions.value[currentQuestionIndex.value];
});

// 处理选择答案
const handleSelectAnswer = (index: number) => {
  if (selectedAnswer.value !== null || showResult.value) return;
  
  selectedAnswer.value = index;
  isAnswerCorrect.value = index === currentQuestion.value.correctAnswer;
  
  // 记录答题历史
  answersHistory.value[currentQuestionIndex.value] = isAnswerCorrect.value;
  
  // 如果回答正确，增加分数
  if (isAnswerCorrect.value) {
    score.value++;
  }
  console.log(startQuestion.value)
  //todo 处理用户扣分
    if(!startQuestion.value){
    startquestions({stype:'start'}).then(res=>{
      if(res.success)
      {
      
      }
    })
  }
  startQuestion.value=true;

  //判断是否以及答题完成 完成后进行加分
  if(currentQuestionIndex.value==quizQuestions.value.length-1)
  {
    //todo 处理用户加分
    if(score.value/quizQuestions.value.length>=0.6)
    {
      startquestions({stype:'end'}).then(res=>{
      if(res.success)
      {
      
      }
      })
    }
  }
  // 显示通知
  showAnswerNotification();
  
  // 显示结果
  setTimeout(() => {
    showResult.value = true;
    
   
  }, 300);
};

// 显示答题通知
const showAnswerNotification = () => {
  if (isAnswerCorrect.value) {
    notificationType.value = 'success';
    const successMessages = [
      '🎉 Correct! +1 Point',
      '✨ Great! Keep it up!',
      '🏆 Perfect! Well done!',
      '💰 Excellent! You\'re learning!',
      '🚀 Amazing! Next question!'
    ];
    notificationMessage.value = successMessages[Math.floor(Math.random() * successMessages.length)];
  } else {
    notificationType.value = 'error';
    const encouragementMessages = [
      '📚 Not quite! Keep learning!',
      '💪 Try again! You can do it!',
      '🎯 Close! Study more!',
      '📈 Learning opportunity!',
      '🌟 Keep practicing!'
    ];
    notificationMessage.value = encouragementMessages[Math.floor(Math.random() * encouragementMessages.length)];
  }
  
  showNotification.value = true;
  setTimeout(() => {
    showNotification.value = false;
  }, 2500);
};

// 获取表现评级
const getPerformanceRating = () => {
  const percentage = (score.value / quizQuestions.value.length) * 100;
  if (percentage === 100) return 'Master';
  if (percentage >= 80) return 'Expert';
  if (percentage >= 60) return 'Advanced';
  if (percentage >= 40) return 'Intermediate';
  return 'Beginner';
};

// 播放悬停音效（模拟）
const playHoverSound = () => {
  // 这里可以添加实际的音效播放逻辑
  console.log('Hover sound effect');
};

// 播放点击音效（模拟）
const playClickSound = () => {
  // 这里可以添加实际的音效播放逻辑
  console.log('Click sound effect');
};

// 格式化货币显示
const formatCurrency = (amount) => {
  if (amount >= 1000000) {
    return (amount / 1000000).toFixed(1) + 'M';
  } else if (amount >= 1000) {
    return (amount / 1000).toFixed(1) + 'K';
  }
  return amount.toLocaleString();
};

// 进入下一题
const goToNextQuestion = () => {
  // 停止烟花效果
  isFireworkActive.value = false;
  if (fireworkInterval) {
    clearInterval(fireworkInterval);
    fireworkInterval = null;
  }
  
  // 清除烟花容器中的所有粒子
  const fireworkContainer = document.getElementById('firework-container');
  if (fireworkContainer) {
    while (fireworkContainer.firstChild) {
      fireworkContainer.removeChild(fireworkContainer.firstChild);
    }
  }
  
  showResult.value = false;
  selectedAnswer.value = null;
  currentQuestionIndex.value++;
  
  // 检查是否完成所有题目
  if (currentQuestionIndex.value >= quizQuestions.value.length) {
    quizCompleted.value = true;
  }
};

// 复制钱包地址
const copypaycode = () => {
  if (paycode.value) {
    navigator.clipboard.writeText(paycode.value).then(() => {
      showNotification.value = true;
      notificationType.value = 'success';
      notificationMessage.value = 'Paycode copied to clipboard!';
      setTimeout(() => {
        showNotification.value = false;
      }, 2000);
    }).catch(err => {
      showNotification.value = true;
      notificationType.value = 'error';
      notificationMessage.value = 'Failed to copy paycode!';
      setTimeout(() => {
        showNotification.value = false;
      }, 2000);
    });
  }
};

// 重新开始答题
const restartQuiz = () => {
  startQuestion.value=false;
  // 停止烟花效果
  isFireworkActive.value = false;
  if (fireworkInterval) {
    clearInterval(fireworkInterval);
    fireworkInterval = null;
  }
  
  // 清除烟花容器中的所有粒子
  const fireworkContainer = document.getElementById('firework-container');
  if (fireworkContainer) {
    while (fireworkContainer.firstChild) {
      fireworkContainer.removeChild(fireworkContainer.firstChild);
    }
  }
  
  // 重置所有状态
  fetchQuizQuestions();
  currentQuestionIndex.value = 0;
  selectedAnswer.value = null;
  showResult.value = false;
  isAnswerCorrect.value = false;
  quizCompleted.value = false;
  score.value = 0;
  answersHistory.value = [];
  showNotification.value = false;
  startQuestion.value=false;
};

// 创建烟花效果
const createFirework = () => {
 // 获取烟花容器
  let fireworkContainer = document.getElementById('firework-container');
  if (!fireworkContainer) {
    fireworkContainer = document.createElement('div');
    fireworkContainer.id = 'firework-container';
    fireworkContainer.className = 'firework-container';
    document.body.appendChild(fireworkContainer);
  }
  
  // 创建烟花粒子
  const particleCount = 180; // 增加粒子数量，提高粒度
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    
    // 随机颜色
    const colors = ['#ffd700', '#ffb300', '#ffe066', '#ffcc00', '#ffed4e'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    // 设置粒子样式
    particle.style.position = 'absolute';
    particle.style.width = `${Math.random() * 4 + 2}px`; // 增加粒子大小
    particle.style.height = `${Math.random() * 4 + 2}px`; // 增加粒子大小
    particle.style.backgroundColor = color;
    particle.style.borderRadius = '50%';
    particle.style.left = '50%';
    particle.style.top = '50%';
    particle.style.opacity = '1';
    particle.style.pointerEvents = 'none';
    particle.style.boxShadow = `0 0 15px ${color}, 0 0 30px ${color}40`; // 增加发光效果
    
    // 随机速度和角度
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 12 + 5; // 增加速度范围，使烟花更分散
    let vx = Math.cos(angle) * speed;
    let vy = Math.sin(angle) * speed;
    
    fireworkContainer.appendChild(particle);
    
    // 动画粒子
    let x = 0;
    let y = 0;
    let alpha = 1;
    const friction = 0.97;
    const gravity = 0.05;
    
    const animateParticle = () => {
      x += vx;
      y += vy;
      vy += gravity;
      vx *= friction;
      vy *= friction;
      alpha -= 0.02;
      
      particle.style.transform = `translate(${x}px, ${y}px)`;
      particle.style.opacity = alpha.toString();
      
      if (alpha > 0) {
        requestAnimationFrame(animateParticle);
      } else {
        if (particle.parentNode === fireworkContainer) {
          fireworkContainer.removeChild(particle);
        }
      }
    };
    
    animateParticle();
  }
  
  // 当烟花效果不活跃时才清理容器
  setTimeout(() => {
    if (!isFireworkActive.value && fireworkContainer && document.body.contains(fireworkContainer)) {
      // 移除所有子元素
      while (fireworkContainer.firstChild) {
        fireworkContainer.removeChild(fireworkContainer.firstChild);
      }
    }
  }, 5000);
};

</script>

<style scoped>
/* 自定义样式 */
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700&family=Montserrat:wght@400;600&family=Inter:wght@300;400;500;600;700&display=swap');

:root {
  --primary-color: #181c2b;
  --secondary-color: #23243a;
  --accent-color: #4361ee;
  --success-color: #2ecc71;
  --danger-color: #e74c3c;
  --warning-color: #f1c40f;
  --text-color: #ffffff;
  --border-color: #2a2a3a;
  --gold-color: #ffd700;
}

.app-container {
  background: linear-gradient(120deg, #181c2b 0%, #23243a 100%);
  color: #ffffff;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  margin: 0;
  padding: 0;
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
  min-height: 100vh;
}

/* 添加光纤划过效果 */
.app-container::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    45deg,
    transparent 0%,
    rgba(255, 255, 255, 0.03) 30%,
    rgba(255, 255, 255, 0.05) 40%,
    transparent 100%
  );
  animation: lightBeam 8s infinite linear;
  pointer-events: none;
}

@keyframes lightBeam {
  0% {
    transform: rotate(0deg) translate(-50%, -50%);
  }
  100% {
    transform: rotate(360deg) translate(-50%, -50%);
  }
}

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

.nav-right {
  flex: 0 0 auto;
}

.header-icon {
  color: #ffd700;
  font-size: 1.5rem;
}

.header-title {
  color: #ffffff;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
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

.btn-login.logged-in {
  background: #28a745;
  color: white;
}

.btn-login.logged-in:hover {
  background: #218838;
  color: white;
}

.btn-back {
  background: transparent;
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  text-decoration: none;
}

.btn-back:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  text-decoration: none;
}

.modal-content {
  background: linear-gradient(145deg, #181c2b 0%, #13141f 100%);
  border: 1px solid rgba(255, 215, 0, 0.1);
  border-radius: 20px;
  color: #ffffff;
}

.modal-header {
  border-bottom: 1px solid rgba(255, 215, 0, 0.1);
  padding: 1.5rem;
}

/* Responsive Image Styles */
.payment-qr-code {
  max-width: 100%;
  height: auto;
  max-height: 300px;
  object-fit: contain;
  border-radius: 8px;
}

.preview-image {
  max-width: 100%;
  height: auto;
  max-height: 300px;
  object-fit: contain;
  border-radius: 8px;
  margin: 0 auto;
  display: block;
}

.proof-preview {
  position: relative;
  display: inline-block;
  max-width: 100%;
}

.btn-remove-preview {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(220, 53, 69, 0.9);
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
}

.btn-remove-preview:hover {
  background: rgba(220, 53, 69, 1);
  transform: scale(1.1);
}

/* Upload Section Fix */
.upload-placeholder {
  margin: 0 auto;
}

/* Hide the file input */
.payment-proof-input {
  display: none;
}

.btn-upload {
  width: 100%;
  max-width: 400px;
  padding: 1rem;
  background: transparent;
  border: 2px dashed rgba(255, 215, 0, 0.3);
  color: white;
  border-radius: 10px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.btn-upload:hover {
  background: rgba(255, 215, 0, 0.1);
  border-color: rgba(255, 215, 0, 0.6);
}

.modal-header .btn-close {
  color: #ffffff;
  filter: invert(1) grayscale(100%) brightness(200%);
}

.modal-body {
  padding: 2rem;
}

.form-control {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 215, 0, 0.1);
  color: #ffffff;
  border-radius: 10px;
  padding: 0.75rem 1rem;
}

.form-control:focus {
  background: rgba(255, 255, 255, 0.08);
  border-color: #ffd700;
  color: #ffffff;
  box-shadow: 0 0 0 0.25rem rgba(255, 215, 0, 0.1);
}

.form-control::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.btn-submit {
  background: linear-gradient(90deg, #ffd700 0%, #b8860b 100%);
  color: #000;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 50px;
  font-weight: 600;
  width: 100%;
  margin-top: 1rem;
}

.btn-submit:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 215, 0, 0.2);
}

/* Dynamic VIP Welcome Zone */
.vip-dynamic-zone {
  background: linear-gradient(135deg, 
    #0a0a1a 0%, 
    #1a1a2e 30%, 
    #16213e 60%, 
    #0f1419 100%);
  padding: 40px 0 20px 0;
  position: relative;
  overflow: hidden;
  min-height: 220px;
}

/* Dynamic Background Effects */
.dynamic-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.wave-animation {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, 
    transparent 40%, 
    rgba(255, 215, 0, 0.03) 50%, 
    transparent 60%);
  animation: waveMove 8s ease-in-out infinite;
}

@keyframes waveMove {
  0%, 100% { transform: translateX(-100%) skewX(-10deg); }
  50% { transform: translateX(100%) skewX(10deg); }
}

.floating-particles {
  position: absolute;
  width: 100%;
  height: 100%;
}

.particle {
  position: absolute;
  font-size: 1.5rem;
  opacity: 0.6;
  animation: particleDance 12s linear infinite;
}

.particle-1 {
  top: 10%;
  left: 15%;
  animation-delay: 0s;
}

.particle-2 {
  top: 25%;
  right: 20%;
  animation-delay: 2s;
}

.particle-3 {
  bottom: 30%;
  left: 25%;
  animation-delay: 4s;
}

.particle-4 {
  top: 60%;
  right: 15%;
  animation-delay: 6s;
}

.particle-5 {
  bottom: 15%;
  right: 30%;
  animation-delay: 8s;
}

@keyframes particleDance {
  0% { transform: translateY(0px) rotate(0deg) scale(1); opacity: 0.3; }
  25% { transform: translateY(-30px) rotate(90deg) scale(1.1); opacity: 0.8; }
  50% { transform: translateY(-10px) rotate(180deg) scale(0.9); opacity: 0.4; }
  75% { transform: translateY(-40px) rotate(270deg) scale(1.2); opacity: 0.7; }
  100% { transform: translateY(0px) rotate(360deg) scale(1); opacity: 0.3; }
}

.gradient-orbs {
  position: absolute;
  width: 100%;
  height: 100%;
}

.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(40px);
  animation: orbFloat 10s ease-in-out infinite;
}

.orb-1 {
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(255, 215, 0, 0.2) 0%, transparent 70%);
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.orb-2 {
  width: 150px;
  height: 150px;
  background: radial-gradient(circle, rgba(255, 165, 0, 0.15) 0%, transparent 70%);
  bottom: 20%;
  right: 20%;
  animation-delay: 3s;
}

.orb-3 {
  width: 180px;
  height: 180px;
  background: radial-gradient(circle, rgba(255, 215, 0, 0.1) 0%, transparent 70%);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation-delay: 6s;
}

@keyframes orbFloat {
  0%, 100% { transform: translateY(0px) scale(1); opacity: 0.4; }
  33% { transform: translateY(-20px) scale(1.1); opacity: 0.7; }
  66% { transform: translateY(10px) scale(0.9); opacity: 0.5; }
}

/* Welcome Stage */
.welcome-stage {
  position: relative;
  z-index: 10;
  text-align: center;
  max-width: 100%;
  margin: 0 auto;
  padding: 0 0px;
}

/* Crown Entrance Animation */
.crown-entrance {
  position: relative;
  display: inline-block;
  margin-bottom: 20px;
  animation: crownEntrance 2s ease-out;
}

@keyframes crownEntrance {
  0% { opacity: 0; transform: translateY(-100px) scale(0.3) rotate(-180deg); }
  60% { transform: translateY(10px) scale(1.2) rotate(10deg); }
  80% { transform: translateY(-5px) scale(0.95) rotate(-5deg); }
  100% { opacity: 1; transform: translateY(0) scale(1) rotate(0deg); }
}

.crown-glow-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  border: 2px solid rgba(255, 215, 0, 0.4);
  border-radius: 50%;
  animation: ringPulse 3s ease-in-out infinite;
}

@keyframes ringPulse {
  0%, 100% { 
    transform: translate(-50%, -50%) scale(1); 
    border-color: rgba(255, 215, 0, 0.4); 
  }
  50% { 
    transform: translate(-50%, -50%) scale(1.2); 
    border-color: rgba(255, 215, 0, 0.8); 
  }
}

.crown-main {
  font-size: 3rem;
  position: relative;
  z-index: 2;
  animation: crownFloat 4s ease-in-out infinite;
  filter: drop-shadow(0 0 20px rgba(255, 215, 0, 0.5));
}

@keyframes crownFloat {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-15px) rotate(5deg); }
}

.crown-sparkles {
  position: absolute;
  top: 40%;
  left: 40%;
  transform: translate(-50%, -50%);
  width: 150px;
  height: 150px;
}

.sparkle {
  position: absolute;
  color: #FFD700;
  font-size: 1.2rem;
  animation: sparkleRotate 6s linear infinite;
}

.sparkle-1 {
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  animation-delay: 0s;
}

.sparkle-2 {
  right: 10%;
  top: 50%;
  transform: translateY(-50%);
  animation-delay: 1.5s;
}

.sparkle-3 {
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  animation-delay: 3s;
}

.sparkle-4 {
  left: 10%;
  top: 50%;
  transform: translateY(-50%);
  animation-delay: 4.5s;
}

@keyframes sparkleRotate {
  0% { opacity: 0.3; transform: translateX(-50%) scale(0.5); }
  25% { opacity: 1; transform: translateX(-50%) scale(1.2); }
  50% { opacity: 0.5; transform: translateX(-50%) scale(0.8); }
  75% { opacity: 0.8; transform: translateX(-50%) scale(1.1); }
  100% { opacity: 0.3; transform: translateX(-50%) scale(0.5); }
}

/* Dynamic Welcome Text */
.welcome-text-dynamic {
  margin-top: 30px;
  margin-bottom: 30px;
  position: relative;
}

.welcome-line-1,
.welcome-line-2,
.welcome-line-3 {
  margin-bottom: 12px;
  overflow: hidden;
  position: relative;
}

.text-reveal {
  display: inline-block;
  animation: textReveal 1.2s ease-out forwards;
  opacity: 0;
  transform: translateY(50px);
  position: relative;
}

/* Greeting Text - "Welcome Back," */
.text-greeting {
  animation-delay: 0.5s;
  font-size: 1.6rem;
  font-weight: 300;
  background: linear-gradient(135deg, #b0c4e6 0%, #8a9bb8 50%, #b0c4e6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: 3px;
  text-transform: uppercase;
  position: relative;
  text-shadow: 0 4px 12px rgba(176, 196, 230, 0.3);
}

.text-greeting::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #b0c4e6, transparent);
  animation: greetingUnderline 1.5s ease-out 1s forwards;
}

@keyframes greetingUnderline {
  to { width: 100%; }
}

/* Name Text - Main Highlight */
.text-name {
  animation-delay: 0.8s;
  font-size: 3.2rem;
  font-weight: 900;
  background: linear-gradient(135deg, 
    #FFD700 0%, 
    #FFA500 25%, 
    #FFD700 50%, 
    #FF8C00 75%, 
    #FFD700 100%);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: nameGradientShift 3s ease-in-out infinite, textReveal 1.2s ease-out forwards;
  text-shadow: 
    0 8px 24px rgba(255, 215, 0, 0.4),
    0 0 40px rgba(255, 215, 0, 0.2);
  letter-spacing: 2px;
  position: relative;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
}

@keyframes nameGradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.text-decoration {
  position: absolute;
  bottom: -15px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 20px;
}

.name-underline {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 4px;
  background: linear-gradient(90deg, 
    transparent 0%, 
    #FFD700 25%, 
    #FFA500 50%, 
    #FFD700 75%, 
    transparent 100%);
  animation: nameUnderlineExpand 2s ease-out 1.3s forwards;
  border-radius: 2px;
  box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
}

@keyframes nameUnderlineExpand {
  to { width: 80%; }
}

.name-glow {
  position: absolute;
  bottom: -5px;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  height: 15px;
  background: radial-gradient(ellipse, rgba(255, 215, 0, 0.3) 0%, transparent 70%);
  animation: nameGlowPulse 2s ease-in-out infinite 1.5s;
  border-radius: 50%;
}

@keyframes nameGlowPulse {
  0%, 100% { opacity: 0.3; transform: translateX(-50%) scaleX(1); }
  50% { opacity: 0.8; transform: translateX(-50%) scaleX(1.2); }
}

/* Subtitle Text */
.text-subtitle {
  animation-delay: 1.1s;
  font-size: 1.3rem;
  font-weight: 400;
  background: linear-gradient(135deg, #8a9bb8 0%, #b0c4e6 50%, #8a9bb8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: 1.5px;
  text-transform: capitalize;
  position: relative;
  text-shadow: 0 2px 8px rgba(138, 155, 184, 0.2);
}

.subtitle-effects {
  display: inline-block;
  position: relative;
}

.typing-cursor {
  display: inline-block;
  font-size: 1.8rem;
  color: #FFD700;
  font-weight: 300;
  animation: cursorBlink 1.5s infinite 2s;
  margin-left: 5px;
}

@keyframes cursorBlink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

/* Text Background Effects */
.text-background-effects {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: -1;
}

.text-shadow-1,
.text-shadow-2,
.text-shadow-3 {
  position: absolute;
  border-radius: 50%;
  filter: blur(30px);
  animation: textShadowFloat 6s ease-in-out infinite;
}

.text-shadow-1 {
  top: 20%;
  left: 10%;
  width: 150px;
  height: 150px;
  background: radial-gradient(circle, rgba(255, 215, 0, 0.1) 0%, transparent 70%);
  animation-delay: 0s;
}

.text-shadow-2 {
  top: 40%;
  right: 15%;
  width: 120px;
  height: 120px;
  background: radial-gradient(circle, rgba(255, 165, 0, 0.08) 0%, transparent 70%);
  animation-delay: 2s;
}

.text-shadow-3 {
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  height: 100px;
  background: radial-gradient(ellipse, rgba(255, 215, 0, 0.06) 0%, transparent 70%);
  animation-delay: 4s;
}

@keyframes textShadowFloat {
  0%, 100% { transform: translateY(0px) scale(1); opacity: 0.3; }
  50% { transform: translateY(-20px) scale(1.1); opacity: 0.6; }
}

@keyframes textReveal {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Floating Status Badges */
.floating-badges {
  position: relative;
  display: flex;
  justify-content: center;
  gap: 50px;
  margin-bottom: 0px;
}

.status-badge {
  position: relative;
  animation: badgeFloat 1.5s ease-out forwards;
  opacity: 0;
  transform: translateY(50px);
}

.badge-left {
  animation-delay: 1.4s;
}

.badge-center {
  animation-delay: 1.7s;
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
.badge-right {
  animation-delay: 2s;
}

@keyframes badgeFloat {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.badge-pulse {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  border: 1px solid rgba(255, 215, 0, 0.3);
  border-radius: 50%;
  animation: badgePulse 2s ease-in-out infinite;
}

@keyframes badgePulse {
  0%, 100% { 
    transform: translate(-50%, -50%) scale(1); 
    border-color: rgba(255, 215, 0, 0.3); 
  }
  50% { 
    transform: translate(-50%, -50%) scale(1.3); 
    border-color: rgba(255, 215, 0, 0.6); 
  }
}

.badge-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 50%;
  border: 1px solid rgba(255, 215, 0, 0.2);
  backdrop-filter: blur(10px);
  transition: all 0.4s ease;
  cursor: pointer;
}

.badge-content:hover {
  background: rgba(255, 215, 0, 0.1);
  transform: translateY(-5px) scale(1.05);
  box-shadow: 0 10px 30px rgba(255, 215, 0, 0.2);
}

.badge-icon {
  font-size: 1.8rem;
}

.badge-text {
  font-size: 0.75rem;
  color: #b0c4e6;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
}

/* Meteor Lightsaber Effects */
.meteor-effects {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  overflow: hidden;
}

.meteor-trail {
  position: absolute;
  width: 100%;
  height: 8px;
  animation: meteorSweep 4s ease-in-out infinite;
}

.meteor-1 {
  top: 25%;
  animation-delay: 0s;
}

.meteor-2 {
  top: 50%;
  animation-delay: 1.5s;
}

.meteor-3 {
  top: 75%;
  animation-delay: 3s;
}

.meteor-core {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  width: 600px;
  height: 4px;
  background: linear-gradient(90deg, 
    transparent 0%,
    rgba(255, 255, 255, 0.9) 8%,
    rgba(255, 215, 0, 1) 20%,
    rgba(255, 165, 0, 1) 35%,
    rgba(255, 140, 0, 0.8) 50%,
    rgba(255, 215, 0, 0.6) 70%,
    rgba(255, 215, 0, 0.3) 85%,
    transparent 100%);
  border-radius: 2px;
  box-shadow: 
    0 0 8px rgba(255, 215, 0, 0.8),
    0 0 16px rgba(255, 165, 0, 0.6),
    0 0 24px rgba(255, 215, 0, 0.4);
}

.meteor-glow {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  width: 800px;
  height: 12px;
  background: linear-gradient(90deg, 
    transparent 0%,
    rgba(255, 215, 0, 0.1) 15%,
    rgba(255, 215, 0, 0.3) 25%,
    rgba(255, 165, 0, 0.4) 40%,
    rgba(255, 215, 0, 0.3) 60%,
    rgba(255, 215, 0, 0.2) 75%,
    rgba(255, 215, 0, 0.1) 90%,
    transparent 100%);
  filter: blur(4px);
  border-radius: 6px;
}

.meteor-particles {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  width: 100%;
  height: 20px;
}

.particle {
  position: absolute;
  width: 3px;
  height: 3px;
  background: radial-gradient(circle, rgba(255, 215, 0, 1) 0%, rgba(255, 165, 0, 0.8) 50%, transparent 100%);
  border-radius: 50%;
  animation: particleTrail 4s ease-in-out infinite;
}

.particle.p1 {
  top: 2px;
  animation-delay: 0.1s;
}

.particle.p2 {
  top: 50%;
  transform: translateY(-50%);
  animation-delay: 0.2s;
}

.particle.p3 {
  bottom: 2px;
  animation-delay: 0.3s;
}

@keyframes meteorSweep {
  0% {
    transform: translateX(-120%) skewX(-15deg);
    opacity: 0;
  }
  2% {
    opacity: 0.2;
  }
  5% {
    opacity: 1;
  }
  95% {
    opacity: 1;
  }
  98% {
    opacity: 0.2;
  }
  100% {
    transform: translateX(120%) skewX(-15deg);
    opacity: 0;
  }
}

@keyframes particleTrail {
  0% {
    transform: translateX(-50px) scale(0);
    opacity: 0;
  }
  5% {
    transform: translateX(0px) scale(0.8);
    opacity: 0.6;
  }
  15% {
    transform: translateX(100px) scale(1);
    opacity: 1;
  }
  50% {
    transform: translateX(400px) scale(0.9);
    opacity: 0.8;
  }
  85% {
    transform: translateX(700px) scale(0.6);
    opacity: 0.4;
  }
  95% {
    transform: translateX(850px) scale(0.3);
    opacity: 0.2;
  }
  100% {
    transform: translateX(900px) scale(0);
    opacity: 0;
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .vip-dynamic-zone {
    padding: 10px 0 10px 0;
    min-height: 180px;
  }
  
  .crown-main {
    font-size: 2.5rem;
  }
  
  /* Mobile Text Sizes */
  .text-greeting {
    font-size: 1.2rem;
    letter-spacing: 2px;
  }
  
  .text-name {
    font-size: 2.5rem;
    letter-spacing: 1px;
  }
  
  .text-subtitle {
    font-size: 1rem;
    letter-spacing: 1px;
  }
  
  .typing-cursor {
    font-size: 1rem;
  }
  
  .floating-badges {
    flex-direction: column;
    align-items: center;
    gap: 20px;
    margin-bottom: 15px;
  }
  
  .badge-content {
    padding: 16px;
  }
  
  .text-shadow-1,
  .text-shadow-2,
  .text-shadow-3 {
    width: 80px;
    height: 80px;
  }
  
  .welcome-text-dynamic {
    margin-bottom: 20px;
  }
  
  .welcome-line-1,
  .welcome-line-2,
  .welcome-line-3 {
    margin-bottom: 8px;
  }
}

@media (max-width: 480px) {
  .vip-dynamic-zone {
    padding: 25px 0 35px 0;
    min-height: 160px;
  }
  
  .text-greeting {
    font-size: 1rem;
    letter-spacing: 1px;
  }
  
  .text-name {
    font-size: 2rem;
  }
  
  .text-subtitle {
    font-size: 0.9rem;
  }
  
  .typing-cursor {
    font-size: 0.9rem;
  }
  
  .crown-main {
    font-size: 2rem;
  }
}

.vip-title {
  text-align: center;
  padding: 2rem 0;
  margin: 2rem 0;
}

.vip-title h1 {
  font-size: 3.5rem;
  font-weight: 700;
  letter-spacing: 2px;
  margin: 0;
  padding: 0;
  transition: all 0.3s ease;
}

/* VIP Member Area 标题样式 */
.vip-title.regular h1 {
  font-family: 'Cinzel', serif;
  font-size: 4.5rem;
  background: linear-gradient(120deg, #4a90e2 0%, #87ceeb 25%, #4a90e2 50%, #87ceeb 75%, #4a90e2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 
    0 0 20px rgba(74, 144, 226, 0.4),
    0 0 40px rgba(74, 144, 226, 0.2);
  animation: titleGlow 3s ease-in-out infinite alternate;
  letter-spacing: 3px;
  position: relative;
  z-index: 1;
}

.vip-title.regular h1::before {
  content: '';
  position: absolute;
  top: -20px;
  left: -20px;
  right: -20px;
  bottom: -20px;
  background: radial-gradient(circle at center, rgba(74, 144, 226, 0.1) 0%, transparent 70%);
  z-index: -1;
  animation: pulseBackground 3s ease-in-out infinite;
}

@keyframes titleGlow {
  0% {
    text-shadow: 
      0 0 20px rgba(74, 144, 226, 0.4),
      0 0 40px rgba(74, 144, 226, 0.2);
    transform: scale(1);
  }
  100% {
    text-shadow: 
      0 0 30px rgba(74, 144, 226, 0.6),
      0 0 60px rgba(74, 144, 226, 0.3);
    transform: scale(1.02);
  }
}

@keyframes pulseBackground {
  0% {
    transform: scale(1);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 0.5;
  }
}

/* 黄金会员样式 */
.vip-title.gold h1 {
  font-family: 'Cinzel', serif;
  color: #ffd700;
  background: linear-gradient(120deg, #ffd700, #ffa500);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 15px rgba(255, 215, 0, 0.5);
  font-weight: 700;
  letter-spacing: 2px;
}

/* 钻石会员样式 */
.vip-title.diamond h1 {
  font-family: 'Cinzel', serif;
  color: #b9f2ff;
  background: linear-gradient(120deg, #b9f2ff, #00ffff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 20px rgba(185, 242, 255, 0.6);
  font-weight: 700;
  letter-spacing: 3px;
}

/* 至尊黑卡会员样式 */
.vip-title.supreme h1 {
  font-family: 'Cinzel', serif;
  color: #fff;
  background: linear-gradient(120deg, #ffd700, #fff, #ffd700);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 3.5rem;
  text-shadow: 0 0 30px rgba(255, 215, 0, 0.8);
  font-weight: 700;
  letter-spacing: 4px;
  position: relative;
  z-index: 1;
  animation: supremeGlow 3s ease-in-out infinite alternate;
}

.vip-title.supreme h1::before {
  content: '';
  position: absolute;
  top: -15px;
  left: -15px;
  right: -15px;
  bottom: -15px;
  background: linear-gradient(120deg, #000, #1a1a1a, #000);
  z-index: -1;
  filter: blur(25px);
  opacity: 0.7;
  border-radius: 50%;
}

.vip-title.supreme h1::after {
  content: '';
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  background: linear-gradient(45deg, transparent 0%, rgba(255,215,0,0.1) 50%, transparent 100%);
  z-index: -1;
  animation: supremeShine 3s linear infinite;
}

@keyframes supremeGlow {
  0% {
    text-shadow: 0 0 30px rgba(255, 215, 0, 0.8);
    transform: scale(1);
  }
  50% {
    text-shadow: 0 0 50px rgba(255, 215, 0, 1);
    transform: scale(1.02);
  }
  100% {
    text-shadow: 0 0 30px rgba(255, 215, 0, 0.8);
    transform: scale(1);
  }
}

@keyframes supremeShine {
  0% {
    transform: translateX(-100%) rotate(45deg);
  }
  100% {
    transform: translateX(100%) rotate(45deg);
  }
}

.user-progress {
  font-family: 'Montserrat', sans-serif;
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.5rem;
  margin-top: 1rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  opacity: 0;
  animation: fadeIn 0.5s forwards;
  animation-delay: 0.3s;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.membership-cards-container {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  padding: 2rem 0;
  margin: 0 auto;
  max-width: 1400px;
}

.membership-card-wrapper {
  flex: 1;
  min-width: 280px;
  max-width: 320px;
}

.membership-card {
  background: linear-gradient(145deg, #181c2b 0%, #13141f 100%);
  border-radius: 20px;
  padding: 2rem 1.5rem;
  height: 100%;
  transition: all 0.3s ease;
  position: relative;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.membership-card.premium {
  box-shadow: 0 10px 30px rgba(255, 215, 0, 0.1);
}

.membership-card.diamond {
  box-shadow: 0 10px 30px rgba(185, 242, 255, 0.1);
}

.membership-card.supreme {
  background: linear-gradient(145deg, #000000 0%, #1a1a1a 100%);
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.card-icon {
  font-size: 2.5rem;
  color: #ffd700;
  margin-bottom: 1.5rem;
  display: block;
}

.membership-card h3 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #ffffff;
  font-weight: 600;
}

.card-requirement {
  color: #ffd700;
  font-size: 1.4rem;
  margin: 1.5rem 0;
  padding: 1rem 0;
  border-top: 1px solid rgba(255, 215, 0, 0.1);
  border-bottom: 1px solid rgba(255, 215, 0, 0.1);
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 1.5rem 0;
  text-align: left;
}

.feature-list li {
  margin-bottom: 1rem;
  color: #ffffff;
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  line-height: 1.4;
}

.feature-list li i {
  color: #ffd700;
  margin-right: 0.75rem;
  font-size: 1.3rem;
  flex-shrink: 0;
}

.upgrade-info {
  margin-top: 2.5rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 215, 0, 0.15);
  text-align: center;
}

.upgrade-info p {
  color: rgba(255, 255, 255, 0.85);
  font-size: 1.25rem;
  margin: 0;
  line-height: 1.6;
}

/* VIP Price Styles */
.vip-price {
  margin-bottom: 1.5rem;
  text-align: center;
  padding: 1.25rem;
  background: rgba(35, 36, 58, 0.8);
  border-radius: 16px;
  border: 1px solid rgba(255, 215, 0, 0.2);
  transition: all 0.3s ease;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
}

.vip-price:hover {
  background: rgba(35, 36, 58, 0.9);
  border-color: rgba(255, 215, 0, 0.3);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
}

.price-value {
  font-size: 3.2rem;
  font-weight: 900;
  color: #ffd700;
  text-shadow: 0 0 30px rgba(255, 215, 0, 0.6), 0 0 10px rgba(255, 215, 0, 0.4);
  display: block;
  line-height: 1;
  transition: all 0.3s ease;
  letter-spacing: 1px;
}

.price-currency {
  font-size: 12px;
  font-weight: 600;
  color: rgba(255, 215, 0, 0.8);
  text-shadow: none;
  margin-left: 0.25rem;
  vertical-align: super;
  opacity: 0.9;
}

.membership-card:hover .price-value {
  color: #ffed4e;
  text-shadow: 0 0 40px rgba(255, 215, 0, 0.8), 0 0 20px rgba(255, 215, 0, 0.6);
}

/* Purchase Button Styles */
.btn-purchase {
  background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
  color: #000000;
  border: 2px solid #ffd700;
  padding: 1.1rem 2.5rem;
  border-radius: 12px;
  font-weight: 800;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  box-shadow: 0 10px 30px rgba(255, 215, 0, 0.4);
  position: relative;
  overflow: hidden;
  font-family: 'Inter', sans-serif;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  letter-spacing: 0.5px;
}

.btn-purchase:hover {
  background: linear-gradient(135deg, #ffed4e 0%, #ffd700 100%);
  transform: translateY(-3px);
  box-shadow: 0 15px 40px rgba(255, 215, 0, 0.5);
  border-color: #ffed4e;
}

.btn-purchase:active {
  transform: translateY(-1px);
  box-shadow: 0 8px 25px rgba(255, 215, 0, 0.4);
}

.btn-purchase:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
  box-shadow: 0 5px 15px rgba(255, 215, 0, 0.2);
}

/* 增强卡片悬停效果 */
.membership-card:hover .vip-price {
  background: rgba(35, 36, 58, 0.9);
  border-color: rgba(255, 215, 0, 0.3);
}

/* 响应式调整 */
@media (max-width: 768px) {
  .vip-price {
    padding: 1.25rem;
    margin-bottom: 1.5rem;
  }
  
  .price-value {
    font-size: 2.8rem;
  }
  
  .btn-purchase {
    padding: 1rem 2rem;
    font-size: 1.1rem;
  }
}

@media (max-width: 576px) {
  .vip-price {
    padding: 1rem;
    margin-bottom: 1.25rem;
  }
  
  .price-label {
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }
  
  .price-value {
    font-size: 2.4rem;
  }
  
  .btn-purchase {
    padding: 0.9rem 1.8rem;
    font-size: 1rem;
  }
}

.vip-badge {
  background: linear-gradient(90deg, #ffd700 0%, #b8860b 100%);
  color: #000;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: bold;
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  box-shadow: 0 2px 10px rgba(255, 215, 0, 0.3);
}

.progress-section {
  margin-bottom: 2rem;
}

.progress-card {
  padding: 1rem;
  margin-bottom: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
}

.current-level, .next-milestone {
  padding: 0.5rem;
  text-align: center;
}

.current-level i, .next-milestone i {
  font-size: 1.75rem;
  margin-bottom: 0.25rem;
  color: #ffd700;
}

.progress {
  height: 15px !important;
  background: rgba(255, 215, 0, 0.1);
  margin: 0.5rem 0;
}

.progress-bar {
  background: linear-gradient(90deg, #ffd700, #b8860b);
}

.progress-labels {
  font-size: 1.1rem;
  margin-top: 0.5rem;
  color: rgba(255, 255, 255, 0.9);
}

.current-level h4, .next-milestone h4 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.current-level p, .next-milestone p {
  font-size: 1.3rem;
  margin-bottom: 0;
}

/* 动态进度卡片样式 - 优化可读性 */
.progress-card.clickable {
  background: linear-gradient(90deg, #ffe066 0%, #ffd700 60%, #ffb300 100%) !important;
  box-shadow: 0 8px 32px rgba(255, 215, 0, 0.2), 0 2px 16px rgba(255, 215, 0, 0.14);
  color: #23243a !important;
  transition: transform 0.22s cubic-bezier(.4,2,.6,1), box-shadow 0.22s, background 0.22s;
  cursor: pointer;
  position: relative;
}

.progress-card.clickable * {
  color: #23243a !important;
  font-weight: 700;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.5), 0 0 2px rgba(255, 215, 0, 0.2);
}

.progress-card.clickable .text-gold {
  color: #b8860b !important;
}

.progress-card.clickable:hover {
  transform: scale(1.035);
  box-shadow: 0 16px 48px rgba(255, 215, 0, 0.35), 0 4px 24px rgba(255, 215, 0, 0.2);
  background: linear-gradient(90deg, #ffd700 0%, #ffe066 100%) !important;
}

.progress-card.unclickable {
  background: rgba(255,255,255,0.04) !important;
  color: #aaa !important;
  filter: grayscale(0.3) brightness(0.85);
  cursor: not-allowed;
  transition: none;
}

.progress-card.unclickable * {
  color: #aaa !important;
  text-shadow: none;
}

.progress-card.unclickable:hover {
  transform: none;
  box-shadow: none;
}

/* 进度条优化 */
.progress-bar-wrapper .progress {
  background: rgba(0,0,0,0.13) !important;
  border-radius: 16px !important;
  height: 24px !important;
  box-shadow: 0 2px 12px rgba(184, 134, 11, 0.2), 0 1px 8px rgba(255, 255, 255, 0.25);
  position: relative;
}

.progress-bar-wrapper .progress-bar {
  background: linear-gradient(90deg, #fffbe6 0%, #ffe066 30%, #ffd700 70%, #ffb300 100%) !important;
  box-shadow: 0 2px 16px rgba(255, 215, 0, 0.55), 0 0 8px rgba(255, 255, 255, 0.5);
  border-radius: 16px !important;
  height: 24px !important;
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 1.1rem;
  color: #23243a !important;
  text-shadow: 0 1px 4px rgba(255, 255, 255, 0.7), 0 0 2px rgba(255, 215, 0, 0.6);
  overflow: visible;
}

.progress-bar-wrapper .progress-bar .progress-percent {
  width: 100%;
  text-align: center;
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.h3Height {
  height: 80px;
}

.text-gold {
  color: #ffd700 !important;
}

/* 响应式调整 */
@media (max-width: 1400px) {
  .membership-cards-container {
    padding: 2rem;
    gap: 1rem;
  }
}

@media (max-width: 1200px) {
  .membership-cards-container {
    flex-wrap: wrap;
    justify-content: center;
  }

  .membership-card-wrapper {
    flex: 0 0 calc(50% - 1rem);
    margin-bottom: 1rem;
  }
}

@media (max-width: 768px) {
  .nav-content {
    padding: 0 0.75rem;
  }
  
  .nav-center {
    display: none !important;
  }

  .btn-back, .btn-login {
    padding: 0.25rem 0.5rem;
  }

  .membership-card-wrapper {
    flex: 0 0 100%;
    max-width: 100%;
  }

  .membership-card {
    padding: 1.5rem;
  }

  .card-icon {
    font-size: 2rem;
  }

  .membership-card h3 {
    font-size: 1.5rem;
  }

  .feature-list li {
    font-size: 1rem;
  }
  
  /* 手机端弹窗优化 */
  .modal-dialog {
    margin: 0.5rem;
    max-width: calc(100% - 1rem);
  }
  
  .modal-content {
    border-radius: 15px;
    margin: 0;
  }
  
  .modal-header {
    padding: 1rem;
    border-radius: 15px 15px 0 0;
  }
  
  .modal-header .modal-title {
    font-size: 1.1rem;
    font-weight: 600;
  }
  
  .modal-body {
    padding: 1.5rem 1rem;
  }
  
  .form-control {
    padding: 0.875rem 1rem;
    font-size: 16px; /* 防止iOS缩放 */
    border-radius: 8px;
  }
  
  .btn-submit {
    padding: 0.875rem 1.5rem;
    font-size: 16px;
    border-radius: 25px;
    margin-top: 1.5rem;
  }
  
  .form-label {
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
  }
}

@media (max-width: 576px) {
  .container {
    padding: 0 0.75rem;
    overflow: hidden;
  }

  .col-md-6 {
    padding: 0 0.375rem;
  }

  .membership-card {
    padding: 1rem;
  }

  .vip-badge {
    padding: 0.25rem 0.5rem;
    font-size: 0.75rem;
  }
  
  /* 超小屏幕优化 */
  .modal-dialog {
    margin: 0.25rem;
    max-width: calc(100% - 0.5rem);
  }
  
  .modal-header {
    padding: 0.875rem;
  }
  
  .modal-body {
    padding: 1.25rem 0.875rem;
  }
  
  .modal-header .btn-close {
    padding: 0.5rem;
    margin: -0.5rem -0.5rem -0.5rem auto;
  }
}

/* 平滑滚动 */
html {
  scroll-behavior: smooth;
}

/* 答题结果显示样式 */
.quiz-result {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid rgba(255, 215, 0, 0.2);
  width: 80%;
  max-width: 500px;
  z-index: 1000;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.quiz-result h3 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #ffd700;
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
}

.quiz-result p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: #ffffff;
}

.quiz-result button {
  background: linear-gradient(90deg, #ffd700 0%, #b8860b 100%);
  color: #000;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.quiz-result button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 215, 0, 0.3);
}

/* 烟花效果容器 */
.firework-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999;
  overflow: hidden;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .quiz-container {
    padding: 1.5rem;
    margin-top: 2rem;
  }
  
  .quiz-question {
    font-size: 1.3rem;
    margin-bottom: 1.5rem;
  }
  
  .quiz-option {
    padding: 1rem;
    margin-bottom: 1rem;
    font-size: 1rem;
  }
  
  .quiz-result {
    width: 90%;
    padding: 1.5rem;
  }
  
  .quiz-result h3 {
    font-size: 1.5rem;
  }
  
  .quiz-result p {
    font-size: 1rem;
  }
}

@media (max-width: 576px) {
  .quiz-container {
    padding: 1rem;
    margin-top: 1.5rem;
  }
  
  .quiz-question {
    font-size: 1.2rem;
  }
  
  .quiz-option {
    padding: 0.75rem;
    font-size: 0.9rem;
  }
}

/* 动画效果 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideIn {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.quiz-container {
  animation: fadeIn 0.5s ease-out;
  background: linear-gradient(145deg, rgba(255, 215, 0, 0.05) 0%, rgba(255, 215, 0, 0.02) 100%);
  border: 2px solid rgba(255, 215, 0, 0.3);
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(255, 215, 0, 0.15), 0 0 50px rgba(255, 215, 0, 0.05) inset;
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
}

.quiz-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent 0%, rgba(255, 215, 0, 0.5) 50%, transparent 100%);
  animation: borderShine 4s infinite linear;
}

@keyframes borderShine {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.quiz-option {
  width: 100%;
  transition: all 0.3s ease;
  transform-origin: left center;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 215, 0, 0.1);
  color: #ffffff;
  border-radius: 12px;
  padding: 1.25rem;
  margin-bottom: 0.75rem;
  text-align: left;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  position: relative;
  overflow: hidden;
}

.quiz-option:hover:not(:disabled) {
  transform: translateX(5px);
  box-shadow: 0 4px 16px rgba(255, 215, 0, 0.3);
  background: rgba(255, 255, 255, 0.08);
}

.quiz-option:active:not(:disabled) {
  transform: translateX(3px);
  box-shadow: 0 2px 8px rgba(255, 215, 0, 0.2);
  background: rgba(255, 215, 0, 0.15);
}

.quiz-option.correct {
  background-color: rgba(46, 204, 113, 0.2);
  border-color: #2ecc71;
  animation: correctAnswer 1s ease-in-out;
}

.quiz-option.incorrect {
  background-color: rgba(231, 76, 60, 0.2);
  border-color: #e74c3c;
}

.quiz-option.selected {
  background-color: rgba(255, 215, 0, 0.2);
  border-color: #ffd700;
  box-shadow: 0 0 0 2px rgba(255, 215, 0, 0.3);
}

/* 正确答案动画 */
@keyframes correctAnswer {
  0%, 100% {
    background-color: rgba(255, 215, 0, 0.1);
  }
  50% {
    background-color: rgba(255, 215, 0, 0.3);
  }
}

.quiz-option.correct {
  animation: correctAnswer 1s ease-in-out;
}

/* 加载更多效果 */
.loading-spinner {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 215, 0, 0.3);
  border-radius: 50%;
  border-top-color: #ffd700;
  animation: spin 1s ease-in-out infinite;
  margin-left: 10px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* 答题完成页面样式 */
.quiz-completed {
  text-align: center;
  padding: 3rem;
  animation: fadeIn 0.5s ease-out;
}

.quiz-completed h2 {
  font-size: 2.5rem;
  color: #ffd700;
  margin-bottom: 1.5rem;
  text-shadow: 0 0 15px rgba(255, 215, 0, 0.5);
}

.quiz-completed p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: #ffffff;
}

.quiz-completed .score {
  font-size: 3rem;
  font-weight: bold;
  color: #ffd700;
  margin: 2rem 0;
  text-shadow: 0 0 20px rgba(255, 215, 0, 0.6);
  animation: scorePulse 2s ease-in-out infinite;
}

@keyframes scorePulse {
  0% {
    transform: scale(1);
    text-shadow: 0 0 20px rgba(255, 215, 0, 0.6);
  }
  50% {
    transform: scale(1.05);
    text-shadow: 0 0 30px rgba(255, 215, 0, 0.8);
  }
  100% {
    transform: scale(1);
    text-shadow: 0 0 20px rgba(255, 215, 0, 0.6);
  }
}

.quiz-completed button {
  background: linear-gradient(90deg, #ffd700 0%, #b8860b 100%);
  color: #000;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
}

.quiz-completed button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(255, 215, 0, 0.3);
}

/* 重置按钮样式 */
.reset-quiz-btn {
  background: rgba(255, 255, 255, 0.1) !important;
  color: #ffffff !important;
  border: 1px solid rgba(255, 215, 0, 0.3) !important;
}

.reset-quiz-btn:hover {
  background: rgba(255, 255, 255, 0.2) !important;
  border-color: #ffd700 !important;
}

/* 禁用状态样式 */
.quiz-option:disabled {
  cursor: not-allowed;
  opacity: 0.7;
}

.quiz-option:disabled:hover {
  transform: none;
  box-shadow: none;
}

/* 答题导航指示器 */
.quiz-navigation {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 2rem;
  gap: 0.5rem;
  padding: 0 1rem;
}

.quiz-nav-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
  cursor: pointer;
}

.quiz-nav-indicator:hover {
  transform: scale(1.2);
}

.quiz-nav-indicator.active {
  background: #ffd700;
  box-shadow: 0 0 10px rgba(255, 215, 0, 0.7);
  transform: scale(1.3);
}

.quiz-nav-indicator.completed {
  background: rgba(255, 215, 0, 0.5);
}

.quiz-nav-indicator.completed.correct {
  background: #2ecc71;
  box-shadow: 0 0 5px rgba(46, 204, 113, 0.5);
}

.quiz-nav-indicator.completed.incorrect {
  background: #e74c3c;
  box-shadow: 0 0 5px rgba(231, 76, 60, 0.5);
}

/* 烟花效果容器 */
.firework-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999;
  overflow: hidden;
}

/* 题目样式 */
.quiz-question {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 2rem;
  color: #ffffff;
  line-height: 1.4;
  text-align: left;
  padding: 0.5rem 0;
}

/* Interactive Trading Quiz Arena */
.trading-quiz-arena {
  max-width: 1200px;
  margin: 60px auto;
  padding: 0 20px;
  position: relative;
  min-height: 600px;
}

.quiz-container-interactive {
  background: linear-gradient(135deg, rgba(24, 31, 42, 0.98) 0%, rgba(16, 21, 35, 0.95) 100%);
  border-radius: 24px;
  padding: 40px;
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.4),
    0 0 0 1px rgba(255, 215, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  position: relative;
  overflow: hidden;
}

.quiz-container-interactive::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent 0%, #FFD700 50%, transparent 100%);
  animation: topGlow 3s ease-in-out infinite;
}

@keyframes topGlow {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
}

/* Quiz Dashboard */
.quiz-dashboard {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 48px;
  padding: 24px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 20px;
  border: 1px solid rgba(255, 215, 0, 0.1);
}

.quiz-branding {
  display: flex;
  align-items: center;
  gap: 20px;
}

.brand-icon {
  font-size: 3rem;
  animation: iconPulse 2s ease-in-out infinite;
}

@keyframes iconPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

.brand-text h2 {
  font-size: 1.8rem;
  font-weight: 800;
  color: #FFD700;
  margin: 0 0 4px 0;
  text-shadow: 0 2px 8px rgba(255, 215, 0, 0.3);
}

.brand-text p {
  font-size: 1rem;
  color: #b0c4e6;
  margin: 0;
  font-weight: 500;
}

.question-counter {
  text-align: center;
}

.counter-display {
  font-size: 2.5rem;
  font-weight: 900;
  color: #FFD700;
  margin-bottom: 8px;
  text-shadow: 0 4px 12px rgba(255, 215, 0, 0.4);
}

.divider {
  color: #b0c4e6;
  margin: 0 8px;
}

.counter-label {
  font-size: 0.9rem;
  color: #b0c4e6;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
}

.score-tracker {
  display: flex;
  align-items: center;
  gap: 20px;
}

.score-display {
  text-align: center;
}

.score-number {
  font-size: 2.5rem;
  font-weight: 900;
  color: #00FF88;
  text-shadow: 0 4px 12px rgba(0, 255, 136, 0.4);
}

.score-label {
  display: block;
  font-size: 0.9rem;
  color: #b0c4e6;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
  margin-top: 4px;
}

.accuracy-ring {
  position: relative;
  width: 60px;
  height: 60px;
}

.ring-svg {
  transform: rotate(-90deg);
}

.ring-bg {
  fill: none;
  stroke: rgba(255, 255, 255, 0.1);
  stroke-width: 4;
}

.ring-progress {
  fill: none;
  stroke: #FFD700;
  stroke-width: 4;
  stroke-linecap: round;
  transition: stroke-dashoffset 0.5s ease;
}

.ring-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 0.9rem;
  font-weight: 700;
  color: #FFD700;
}

/* Question Arena */
.question-arena {
  margin-bottom: 40px;
}

.question-stage {
  margin-bottom: 40px;
}

.question-badge {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
  color: #000;
  padding: 12px 24px;
  border-radius: 25px;
  font-weight: 700;
  margin-bottom: 24px;
  box-shadow: 0 6px 20px rgba(255, 215, 0, 0.3);
  animation: badgeFloat 3s ease-in-out infinite;
}

@keyframes badgeFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

.badge-icon {
  font-size: 1.2rem;
}

.main-question {
  font-size: 1.8rem;
  font-weight: 700;
  color: #fff;
  line-height: 1.5;
  margin: 0;
  padding: 32px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
  border-radius: 20px;
  border: 2px solid rgba(255, 215, 0, 0.2);
  position: relative;
  overflow: hidden;
}

.main-question::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: linear-gradient(180deg, #FFD700 0%, #FFA500 100%);
}

/* Answer Battlefield */
.answer-battlefield {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 40px;
}

.answer-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 100%);
  border: 2px solid rgba(255, 255, 255, 0.15);
  border-radius: 20px;
  padding: 24px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  min-height: 120px;
  display: flex;
  flex-direction: column;
}

.answer-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, transparent 30%, rgba(255, 215, 0, 0.1) 50%, transparent 70%);
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}

.answer-card:hover::before {
  transform: translateX(100%);
}

.answer-card:hover {
  transform: translateY(-8px) scale(1.03);
  border-color: rgba(255, 215, 0, 0.5);
  box-shadow: 
    0 20px 40px rgba(255, 215, 0, 0.2),
    0 0 30px rgba(255, 215, 0, 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.option-badge {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
  color: #000;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 1.1rem;
  box-shadow: 0 4px 12px rgba(255, 215, 0, 0.3);
}

.status-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 1.2rem;
  opacity: 0;
  animation: statusPop 0.5s ease forwards;
}

.status-icon.correct {
  background: #00FF88;
  color: #000;
}

.status-icon.wrong {
  background: #FF6B6B;
  color: #fff;
}

@keyframes statusPop {
  0% { opacity: 0; transform: scale(0); }
  50% { transform: scale(1.2); }
  100% { opacity: 1; transform: scale(1); }
}

.card-content {
  flex: 1;
  display: flex;
  align-items: center;
}

.answer-text {
  font-size: 1.1rem;
  font-weight: 500;
  color: #fff;
  line-height: 1.4;
  margin: 0;
}

.answer-card.selected {
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.2) 0%, rgba(255, 165, 0, 0.1) 100%);
  border-color: #FFD700;
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 12px 32px rgba(255, 215, 0, 0.3);
}

.answer-card.correct-answer {
  background: linear-gradient(135deg, rgba(0, 255, 136, 0.25) 0%, rgba(0, 204, 102, 0.15) 100%);
  border-color: #00FF88;
  animation: correctCelebration 1s ease;
}

.answer-card.wrong-answer {
  background: linear-gradient(135deg, rgba(255, 107, 107, 0.25) 0%, rgba(255, 68, 68, 0.15) 100%);
  border-color: #FF6B6B;
  animation: wrongReaction 0.6s ease;
}

@keyframes correctCelebration {
  0%, 100% { transform: scale(1); }
  25% { transform: scale(1.05) rotate(1deg); }
  75% { transform: scale(1.05) rotate(-1deg); }
}

@keyframes wrongReaction {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-5px); }
  40% { transform: translateX(5px); }
  60% { transform: translateX(-3px); }
  80% { transform: translateX(3px); }
}

/* Next Question Zone */
.next-question-zone {
  text-align: center;
  margin-top: 40px;
  animation: fadeInUp 0.5s ease 0.3s both;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.next-question-btn {
  background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
  color: #000;
  border: none;
  padding: 18px 48px;
  border-radius: 30px;
  font-size: 1.2rem;
  font-weight: 800;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 16px;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(255, 215, 0, 0.4);
}

.next-question-btn:hover {
  transform: translateY(-4px) scale(1.05);
  box-shadow: 0 16px 48px rgba(255, 215, 0, 0.5);
}

.btn-icon {
  font-size: 1.4rem;
  animation: iconBounce 2s ease-in-out infinite;
}

@keyframes iconBounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
}

.btn-shine {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  animation: btnShine 2s ease-in-out infinite;
}

@keyframes btnShine {
  0% { left: -100%; }
  100% { left: 100%; }
}

/* Victory Screen */
.victory-screen {
  text-align: center;
  padding: 60px 40px;
  animation: victoryEntrance 1s ease;
}

@keyframes victoryEntrance {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}

.trophy-container {
  position: relative;
  margin-bottom: 40px;
}

.trophy {
  font-size: 6rem;
  animation: trophyRotate 4s ease-in-out infinite;
  filter: drop-shadow(0 10px 20px rgba(255, 215, 0, 0.4));
}

@keyframes trophyRotate {
  0%, 100% { transform: rotate(0deg) scale(1); }
  50% { transform: rotate(5deg) scale(1.05); }
}

.victory-title {
  font-size: 2.5rem;
  font-weight: 900;
  color: #FFD700;
  margin-bottom: 48px;
  text-shadow: 0 4px 16px rgba(255, 215, 0, 0.4);
  animation: titleGlow 2s ease-in-out infinite alternate;
}

@keyframes titleGlow {
  from { text-shadow: 0 4px 16px rgba(255, 215, 0, 0.4); }
  to { text-shadow: 0 8px 24px rgba(255, 215, 0, 0.6); }
}

.final-stats {
  display: flex;
  justify-content: center;
  gap: 32px;
  margin-bottom: 48px;
}

.stat-card {
  background: rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 24px;
  min-width: 120px;
  border: 1px solid rgba(255, 215, 0, 0.2);
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(255, 215, 0, 0.2);
}

.stat-icon {
  font-size: 2rem;
  margin-bottom: 12px;
}

.stat-value {
  font-size: 1.8rem;
  font-weight: 900;
  color: #FFD700;
  margin-bottom: 8px;
}

.stat-label {
  font-size: 0.9rem;
  color: #b0c4e6;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.victory-message {
  margin-bottom: 48px;
  padding: 32px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  border: 1px solid rgba(255, 215, 0, 0.1);
}

.victory-message h4 {
  font-size: 1.5rem;
  margin-bottom: 16px;
  font-weight: 800;
}

.victory-message p {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #b0c4e6;
  margin: 0;
}

.victory-actions {
  display: flex;
  gap: 24px;
  justify-content: center;
}

.action-button {
  padding: 16px 32px;
  border-radius: 25px;
  border: none;
  font-weight: 700;
  font-size: 1.1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.action-button.primary {
  background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
  color: #000;
  box-shadow: 0 8px 24px rgba(255, 215, 0, 0.3);
}

.action-button.primary:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 12px 32px rgba(255, 215, 0, 0.4);
}

.action-button.secondary {
  background: rgba(255, 255, 255, 0.1);
  color: #b0c4e6;
  border: 2px solid rgba(255, 255, 255, 0.2);
}

.action-button.secondary:hover {
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
  transform: translateY(-2px);
}

/* Floating Notification */
.floating-notification {
  position: fixed;
  top: 100px;
  right: 30px;
  z-index: 9999;
  animation: bounceIn 0.6s ease;
}

@keyframes bounceIn {
  0% { opacity: 0; transform: translateX(100%) scale(0.3); }
  50% { transform: translateX(-10%) scale(1.05); }
  70% { transform: translateX(5%) scale(0.95); }
  100% { opacity: 1; transform: translateX(0) scale(1); }
}

.notification-bubble {
  background: linear-gradient(135deg, rgba(24, 31, 42, 0.95) 0%, rgba(35, 43, 62, 0.9) 100%);
  border-radius: 16px;
  padding: 20px 24px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(20px);
  border: 2px solid;
  display: flex;
  align-items: center;
  gap: 16px;
  max-width: 320px;
  position: relative;
  overflow: hidden;
}

.floating-notification.success .notification-bubble {
  border-color: #00FF88;
  box-shadow: 0 12px 40px rgba(0, 255, 136, 0.2);
}

.floating-notification.error .notification-bubble {
  border-color: #FF6B6B;
  box-shadow: 0 12px 40px rgba(255, 107, 107, 0.2);
}

.bubble-icon {
  font-size: 1.5rem;
  animation: iconSpin 1s ease;
}

@keyframes iconSpin {
  0% { transform: rotate(0deg) scale(1); }
  50% { transform: rotate(180deg) scale(1.2); }
  100% { transform: rotate(360deg) scale(1); }
}

.bubble-text {
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
  line-height: 1.4;
}

.bubble-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background: linear-gradient(90deg, #00FF88, #00D4FF);
  animation: progressFill 3s linear forwards;
}

@keyframes progressFill {
  from { width: 0%; }
  to { width: 100%; }
}

/* Membership Agreement Modal Styles */
.agreement-content {
  max-height: 70vh;
  overflow-y: auto;
  padding: 0 10px;
}

.agreement-header-section {
  text-align: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 2px solid rgba(255, 255, 255, 0.1);
}

.agreement-main-title {
  font-size: 2rem;
  font-weight: 900;
  color: #FFD700;
  margin-bottom: 15px;
  text-shadow: 0 4px 16px rgba(255, 215, 0, 0.3);
}

.agreement-description {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #b0c4e6;
  margin: 0;
  padding: 0 20px;
}

.agreement-table-section {
  margin-bottom: 30px;
}

.table-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: #00D4FF;
  margin-bottom: 15px;
  text-align: center;
}

.agreement-table-section .table {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.agreement-table-section .table thead th {
  background: linear-gradient(135deg, rgba(0, 212, 255, 0.2) 0%, rgba(255, 215, 0, 0.2) 100%);
  border: none;
  color: #fff;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.9rem;
  letter-spacing: 0.5px;
  padding: 15px 10px;
}

.agreement-table-section .table tbody td {
  border-color: rgba(255, 255, 255, 0.05);
  padding: 12px 10px;
  vertical-align: middle;
  color: #e0e6f0;
}

.agreement-table-section .table tbody tr:hover {
  background: rgba(255, 255, 255, 0.03);
}

.agreement-terms {
  margin-bottom: 30px;
}

.agreement-terms h4 {
  font-size: 1.3rem;
  font-weight: 700;
  color: #00FF88;
  margin-bottom: 20px;
  text-align: center;
}

.terms-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.terms-list li {
  margin-bottom: 12px;
  font-size: 1rem;
  line-height: 1.5;
  color: #b0c4e6;
  display: flex;
  align-items: flex-start;
}

.terms-list li i {
  margin-top: 3px;
  font-size: 1.1rem;
}

.agreement-footer-section {
  padding-top: 20px;
  border-top: 2px solid rgba(255, 255, 255, 0.1);
}

.agreement-footer-section p {
  font-size: 1rem;
  line-height: 1.6;
  color: #b0c4e6;
  margin-bottom: 15px;
}

.agreement-date {
  color: #6c757d;
  font-size: 0.9rem;
}

/* Modal Customization */
#membershipAgreementModal .modal-content {
  background: linear-gradient(135deg, rgba(24, 31, 42, 0.98) 0%, rgba(35, 43, 62, 0.95) 100%);
  backdrop-filter: blur(20px);
  border: 2px solid rgba(255, 215, 0, 0.3);
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

#membershipAgreementModal .modal-header {
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(0, 212, 255, 0.1) 100%);
  border-bottom: 2px solid rgba(255, 215, 0, 0.2);
  border-radius: 20px 20px 0 0;
  padding: 20px 30px;
}

#membershipAgreementModal .modal-title {
  font-size: 1.5rem;
  font-weight: 800;
  color: #FFD700;
  text-shadow: 0 2px 8px rgba(255, 215, 0, 0.3);
}

#membershipAgreementModal .modal-body {
  padding: 30px;
}

#membershipAgreementModal .modal-footer {
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.05) 0%, rgba(0, 212, 255, 0.05) 100%);
  border-top: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 0 0 20px 20px;
  padding: 20px 30px;
}

#membershipAgreementModal .btn-close {
  background: transparent;
  opacity: 0.7;
  transition: all 0.3s ease;
}

#membershipAgreementModal .btn-close:hover {
  opacity: 1;
  transform: scale(1.1);
}

#membershipAgreementModal .btn-close::before {
  content: '✕';
  color: #FFD700;
  font-size: 1.5rem;
  font-weight: bold;
}

/* Community Primary Button Style (Matching Homepage) */
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

/* Secondary Button Style */
.btn-secondary {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 30px;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 1);
  border-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 255, 255, 0.15);
}

.btn-secondary:active {
  transform: translateY(0);
}

/* Responsive Design */
 @media (max-width: 768px) {
   .agreement-content {
     padding: 0;
   }
   
   .agreement-main-title {
     font-size: 1.5rem;
   }
   
   .agreement-description {
     font-size: 1rem;
     padding: 0 10px;
   }
   
   .table-title {
     font-size: 1.1rem;
   }
   
   .agreement-table-section .table {
     font-size: 0.8rem;
   }
   
   .agreement-table-section .table thead th,
   .agreement-table-section .table tbody td {
     padding: 8px 5px;
   }
   
   .terms-list li {
     font-size: 0.9rem;
   }
   
   #membershipAgreementModal .modal-dialog {
     margin: 10px;
   }
   
   #membershipAgreementModal .modal-content {
     border-radius: 15px;
   }
   
   #membershipAgreementModal .modal-header,
   #membershipAgreementModal .modal-body,
   #membershipAgreementModal .modal-footer {
     padding: 20px;
   }
   
   /* Responsive button adjustments */
   .btn-community-primary {
     font-size: 1rem;
     padding: 0.875rem 1.75rem;
   }
 }
/* Background Effects */
.quiz-background-effects {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  overflow: hidden;
}

.floating-coin {
  position: absolute;
  font-size: 2rem;
  opacity: 0.1;
  animation: floatAround 15s linear infinite;
}

.coin-1 {
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}

.coin-2 {
  top: 20%;
  right: 15%;
  animation-delay: 3s;
}

.coin-3 {
  bottom: 30%;
  left: 20%;
  animation-delay: 6s;
}

.coin-4 {
  bottom: 15%;
  right: 10%;
  animation-delay: 9s;
}

@keyframes floatAround {
  0% { transform: translateY(0px) rotate(0deg); opacity: 0.1; }
  25% { transform: translateY(-20px) rotate(90deg); opacity: 0.3; }
  50% { transform: translateY(0px) rotate(180deg); opacity: 0.1; }
  75% { transform: translateY(-15px) rotate(270deg); opacity: 0.2; }
  100% { transform: translateY(0px) rotate(360deg); opacity: 0.1; }
}

/* Responsive Design */
@media (max-width: 768px) {
  .trading-quiz-arena {
    margin: 40px auto;
    padding: 0 16px;
  }
  
  .quiz-container-interactive {
    padding: 24px;
  }
  
  .quiz-dashboard {
    flex-direction: column;
    gap: 24px;
    text-align: center;
  }
  
  .answer-battlefield {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .final-stats {
    flex-direction: column;
    gap: 16px;
  }
  
  .victory-actions {
    flex-direction: column;
    gap: 16px;
  }
  
  .floating-notification {
    right: 16px;
    left: 16px;
  }
  
  .notification-bubble {
    max-width: none;
  }
}

/* Redirect Message Styles (Same as HomeView.vue) */
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
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
}

@keyframes dots {
  0%, 20% {
    content: '.';
  }
  40% {
    content: '..';
  }
  60%, 100% {
    content: '...';
  }
}
</style>

