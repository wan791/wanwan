<template>
  <div class="ai-tools-page">
     <navcomponent></navcomponent>
    <!-- Navigation Bar -->
    <!-- <nav class="navbar navbar-expand-lg navbar-dark mb-3">
      <div class="container">
        <a class="navbar-brand" href="/">
          <i class="bi bi-graph-up me-2"></i>
          {{ traderInfo.homeTopTitle || 'AI Trading Platform' }}
        </a>
        <div class="navbar-nav ms-auto">
          <a href="/" class="back-btn">
            <i class="bi bi-arrow-left"></i>
            Back to Home
          </a>
        </div>
      </div>
    </nav> -->

    <!-- AI Header -->
    <div class="ai-header">
      <div class="container">
        <h1><i class="bi bi-robot"></i> AI Trading Tools</h1>
        <p>Advanced AI-powered stock analysis and selection tools</p>
      </div>
    </div>

    <div class="container ai-tools-container">
      <!-- AI Stock Picker -->
      <div class="ai-tool-card">
        <div class="tool-header">
          <div class="tool-icon">
            <i class="bi bi-stars"></i>
          </div>
          <div class="tool-title">
            <h3>AI Smart Stock Picker</h3>
            <p>Intelligent stock selection based on market data, technical analysis, and AI algorithms</p>
          </div>
          <div>
            <a href="/ai-history" style="color: #ffffff;">AI history data</a>
          </div>
        </div>
        
        <div class="tool-content">
          <div class="input-section">
            <h4><i class="bi bi-sliders"></i> Selection Criteria</h4>
            
            <!-- Market Sector is now fixed as "All Sectors" - no selector needed -->
            
            <label class="form-label">Investment Style</label>
            <select class="form-select" v-model="stockPickerCriteria.style">
              <option value="Long-term investment">Long-term investment</option>
              <option value="Short-term trading">Short-term trading</option>
              <option value="Growth">Growth</option>
              <option value="Value">Value</option>
              <option value="Momentum">Momentum</option>
              <option value="Dividend">Dividend</option>
              <option value="Balanced">Balanced</option>
            </select>
            
            <label class="form-label">Risk Level</label>
            <select class="form-select" v-model="stockPickerCriteria.risk">
              <option value="Low">Low Risk</option>
              <option value="Medium">Medium Risk</option>
              <option value="High">High Risk</option>
            </select>
            
            <label class="form-label">Time Horizon</label>
            <select class="form-select" v-model="stockPickerCriteria.timeHorizon">
              <option value="Short-term (1-3 months)">Short-term (1-3 months)</option>
              <option value="Medium-term (3-12 months)">Medium-term (3-12 months)</option>
              <option value="Long-term (1-3 years)">Long-term (1-3 years)</option>
            </select>
            
            <label class="form-label">Investment Amount (USD)</label>
            <input type="number" class="form-control" v-model="stockPickerCriteria.investmentAmount" 
                   placeholder="Enter investment amount (e.g., 100000)" min="1000" step="1000">
            
            <label class="form-label">Investment Goal</label>
            <select class="form-select" v-model="stockPickerCriteria.investmentGoal">
              <option value="Capital Appreciation">Capital Appreciation</option>
              <option value="Income Generation">Income Generation</option>
              <option value="Capital Preservation">Capital Preservation</option>
              <option value="Speculation">Speculation</option>
              <option value="Diversification">Diversification</option>
            </select>
            
            <label class="form-label">Risk Tolerance</label>
            <div class="risk-tolerance-slider">
              <input type="range" class="form-range" v-model="stockPickerCriteria.riskTolerance" 
                     min="1" max="10" step="1" id="riskSlider">
              <div class="slider-labels">
                <span>Conservative (1)</span>
                <span>Moderate (5)</span>
                <span>Aggressive (10)</span>
              </div>
              <div class="current-value">Current: {{ stockPickerCriteria.riskTolerance }}/10</div>
            </div>
            
            <button class="btn btn-ai" @click="runStockPicker" :disabled="isStockPickerLoading">
              <i class="bi bi-magic"></i>
              Generate AI Recommendations
            </button>
            
            <!-- 整体投资策略区域 - 移动到左侧 -->
            <div v-if="overallStrategy && !isStockPickerLoading" class="investment-summary-section">
              <h4><i class="bi bi-clipboard-data"></i> Overall Investment Strategy</h4>
              <div class="strategy-content">
                <div class="strategy-item">
                  <h5>Position Allocation</h5>
                  <div class="allocation-content">
                    <div class="strategy-paragraph" v-html="formatStrategyText(overallStrategy.positionAllocation)"></div>
                  </div>
                </div>
                <div class="strategy-item">
                  <h5>Risk Management</h5>
                  <div class="risk-management-content">
                    <div class="strategy-paragraph" v-html="formatStrategyText(overallStrategy.riskManagement)"></div>
                  </div>
                </div>
                <div class="strategy-item">
                  <h5>Trading Strategy</h5>
                  <div class="trading-strategy-content">
                    <div class="strategy-paragraph" v-html="formatStrategyText(overallStrategy.tradingStrategy)"></div>
                  </div>
                </div>
              </div>
            </div>
           
          </div>
          
          <div class="results-section">
            <h4><i class="bi bi-trophy"></i> AI Recommendations</h4>
            <div id="stockPickerResults" v-if="!isStockPickerLoading">
              <div v-if="stockRecommendations.length === 0 && !stockPickerError" class="text-center text-muted" style="padding: 3rem 0;">
                <i class="bi bi-robot" style="font-size: 3rem; opacity: 0.3;"></i>
                <p style="margin-top: 1rem; color: aqua;">Configure your criteria and click "Generate AI Recommendations" to get started</p>
              </div>
              <div v-if="stockPickerError" class="alert alert-danger">
                <i class="bi bi-exclamation-triangle"></i>
                Error generating recommendations: {{ stockPickerError }}
              </div>
             
              <div v-for="(stock, index) in stockRecommendations" :key="stock.symbol" 
                   class="stock-recommendation result-item" :style="{ animationDelay: `${index * 0.1}s` }">
                
                <!-- 股票基本信息 -->
                <div class="stock-header">
                  <div class="stock-symbol">{{ stock.symbol }}</div>
                  <div class="stock-price-info">
                    <span class="current-price">${{ formatPrice(stock.currentPrice) }}</span>
                    <span class="price-change" :class="{ positive: stock.week52Change && stock.week52Change.includes('+'), negative: stock.week52Change && stock.week52Change.includes('-') }">
                      {{ stock.week52Change || 'N/A' }}
                    </span>
                  </div>
                </div>
                
                <div class="stock-name">{{ stock.companyName }}</div>
                <div class="stock-industry">{{ stock.industry }}</div>
                
                <!-- 基础指标 -->
                <div class="stock-metrics">
                  <div class="metric-item">
                    <span class="metric-label">Market Cap:</span>
                    <span class="metric-value">{{ stock.marketCap }}</span>
                  </div>
                  <div v-if="stock.peRatio > 0" class="metric-item">
                    <span class="metric-label">P/E Ratio:</span>
                    <span class="metric-value">{{ stock.peRatio.toFixed(1) }}</span>
                  </div>
                  <div class="metric-item">
                    <span class="metric-label">52W Change:</span>
                    <span class="metric-value" :class="{ positive: stock.week52Change && stock.week52Change.includes('+'), negative: stock.week52Change && stock.week52Change.includes('-') }">
                      {{ stock.week52Change || 'N/A' }}
                    </span>
                  </div>
                </div>

                <!-- 增强的6维度分析显示 -->
                <div v-if="stock.analysis && Object.keys(stock.analysis).length > 0" class="enhanced-analysis">
                  <div class="analysis-tabs">
                    <button v-for="(analysis, key) in stock.analysis" :key="key" 
                            class="analysis-tab" 
                            :class="{ active: activeTab[stock.symbol] === key }"
                            @click="setActiveTab(stock.symbol, key)">
                      <i :class="getAnalysisIcon(key)"></i>
                      {{ getAnalysisTitle(key) }}
                    </button>
                  </div>
                  
                  <div class="analysis-content">
                    <div v-for="(analysis, key) in stock.analysis" :key="key" 
                         v-show="activeTab[stock.symbol] === key"
                         class="analysis-panel">
                      <div class="analysis-header">
                        <h6>{{ getAnalysisTitle(key) }}</h6>
                        <span class="analysis-score" :class="`score-${getScoreLevel(analysis.score)}`">
                          {{ analysis.score }}/100
                        </span>
                      </div>
                      <div class="analysis-text" v-html="formatAnalysisContent(analysis.content)"></div>
                    </div>
                  </div>
                </div>
                
                <!-- 兼容旧数据结构：显示reason字段 -->
                <div v-else-if="stock.reason" class="basic-analysis">
                  <h6><i class="bi bi-robot"></i> AI Professional Analysis Report</h6>
                  <div class="analysis-text gpt-analysis" v-html="formatGPTAnalysis(stock.reason)"></div>
                </div>
                
                <!-- 兼容sections数据结构 -->
                <div v-else-if="stock.sections" class="sections-analysis">
                  <div v-for="(section, index) in stock.sections" :key="index" class="analysis-section">
                    <div class="analysis-header">
                      <h6>{{ section.title }}</h6>
                      <span class="analysis-score" :class="`score-${getScoreLevel(section.score)}`">
                        {{ section.score }}/100
                      </span>
                    </div>
                    <div class="analysis-text" v-html="formatAnalysisContent(section.content)"></div>
                  </div>
                </div>
                
                <!-- 投资建议 -->
                <div v-if="stock.investmentAdvice" class="investment-advice">
                  <h6><i class="bi bi-lightbulb"></i> Investment Advice</h6>
                  <div class="advice-grid">
                    <div class="advice-item">
                      <span class="advice-label">Action:</span>
                      <span class="advice-value action-buy">{{ stock.investmentAdvice.recommendedAction }}</span>
                    </div>
                    <div class="advice-item">
                      <span class="advice-label">Target Price:</span>
                      <span class="advice-value">${{ stock.investmentAdvice.targetPrice }}</span>
                    </div>
                    <div class="advice-item">
                      <span class="advice-label">Stop Loss:</span>
                      <span class="advice-value">${{ stock.investmentAdvice.stopLoss }}</span>
                    </div>
                    <div class="advice-item">
                      <span class="advice-label">Position:</span>
                      <span class="advice-value">{{ stock.investmentAdvice.suggestedPosition }}%</span>
                    </div>
                    <div class="advice-item">
                      <span class="advice-label">Holding Period:</span>
                      <span class="advice-value">{{ stock.investmentAdvice.holdingPeriod }}</span>
                    </div>
                  </div>
                </div>
                
                <!-- 风险评估 -->
                <div v-if="stock.riskAssessment" class="risk-assessment">
                  <h6><i class="bi bi-shield-exclamation"></i> Risk Assessment</h6>
                  <div class="risk-level">
                    <span class="risk-badge" :class="stock.riskAssessment.riskLevel.toLowerCase()">
                      {{ stock.riskAssessment.riskLevel }} Risk
                    </span>
                  </div>
                  <div class="risk-details">
                    <p><strong>Short-term:</strong> {{ stock.riskAssessment.shortTermRisks }}</p>
                    <p><strong>Long-term:</strong> {{ stock.riskAssessment.longTermRisks }}</p>
                  </div>
                </div>
                
                <!-- 公司基本面 -->
                <div v-if="stock.fundamentals" class="fundamentals-section">
                  <h6><i class="bi bi-building"></i> Company Fundamentals</h6>
                  <div class="fundamentals-content">
                    <p><strong>Main Business:</strong> {{ stock.fundamentals.mainBusiness }}</p>
                    <p><strong>Financial Performance:</strong> {{ stock.fundamentals.financialPerformance }}</p>
                    <p><strong>Competitive Advantages:</strong> {{ stock.fundamentals.competitiveAdvantages }}</p>
                  </div>
                </div>
                
                <div class="stock-footer">
                  <span class="sector-tag">
                    <i class="bi bi-tag"></i> {{ stock.sector }}
                  </span>
                  <span class="return-estimate" :class="{ positive: parseFloat(stock.expectedReturn) >= 0, negative: parseFloat(stock.expectedReturn) < 0 }">
                    <i class="bi bi-graph-up"></i> {{ stock.expectedReturn }}%
                  </span>
                  <span class="risk-level">
                    <i class="bi bi-shield"></i> {{ stock.riskLevel }}
                  </span>
                </div>
              </div>
            </div>
            <div class="loading-spinner" v-if="isStockPickerLoading">
              <div class="spinner-border" role="status">
                <span class="visually-hidden">Analyzing...</span>
              </div>
              <p style="margin-top: 1rem;">AI is analyzing market data...</p>
            </div>
            
          </div>
        </div>
      </div>

      <!-- AI Stock Diagnosis -->
      <div class="ai-tool-card">
        <div class="tool-header">
          <div class="tool-icon">
            <i class="bi bi-search"></i>
          </div>
          <div class="tool-title">
            <h3>AI Stock Diagnosis</h3>
            <p>Analyze your portfolio performance and get professional investment advice based on your holdings</p>
          </div>
        </div>
        
        <div class="tool-content">
          <div class="input-section">
            <h4><i class="bi bi-input-cursor"></i> Portfolio Stock Analysis</h4>
            
            <label class="form-label">Stock Symbol</label>
            <input type="text" class="form-control" v-model="portfolioData.symbol" 
                   placeholder="Enter stock symbol (e.g., AAPL, TSLA)" style="text-transform: uppercase;"
                   @input="formatStockSymbol" @keypress.enter="runPortfolioDiagnosis">
            
            <label class="form-label">Purchase Price</label>
            <input type="number" class="form-control" v-model="portfolioData.purchasePrice" 
                   placeholder="Enter purchase price (e.g., 150.50)" step="0.01" min="0">
            
            <label class="form-label">Purchase Date</label>
            <input type="date" class="form-control" v-model="portfolioData.purchaseDate" 
                   :max="new Date().toISOString().split('T')[0]" lang="en-US" 
                   data-lang="en" data-format="MM/DD/YYYY">
            
            <label class="form-label">Purchase Market</label>
            <select class="form-select" v-model="portfolioData.purchaseMarket">
              <option value="NASDAQ">NASDAQ</option>
              <option value="NYSE">NYSE (New York Stock Exchange)</option>
              <option value="AMEX">AMEX (American Stock Exchange)</option>
              <option value="OTC">OTC (Over-the-Counter)</option>
            </select>
            
            <label class="form-label">Analysis Type</label>
            <select class="form-select" v-model="portfolioData.analysisType">
              <option value="portfolio">Portfolio Analysis (Recommended)</option>
              <option value="comprehensive">Comprehensive Analysis</option>
              <option value="technical">Technical Analysis</option>
              <option value="fundamental">Fundamental Analysis</option>
              <option value="sentiment">Market Sentiment</option>
              <option value="risk">Risk Assessment</option>
            </select>
            
            <button class="btn btn-ai" @click="runPortfolioDiagnosis" :disabled="isDiagnosisLoading">
              <i class="bi bi-activity"></i>
              Run AI Diagnosis
            </button>
          </div>
          
          <div class="results-section">
            <h4><i class="bi bi-clipboard-data"></i> Diagnosis Report</h4>
            <div id="stockDiagnosisResults" v-if="!isDiagnosisLoading">
              <div v-if="!stockDiagnosis && !diagnosisError" class="text-center text-muted" style="padding: 3rem 0;">
                <i class="bi bi-search" style="font-size: 3rem; opacity: 0.3;"></i>
                <p style="margin-top: 1rem;color: aqua;">Enter a stock symbol and click "Run AI Diagnosis" to analyze</p>
              </div>
              <div v-if="diagnosisError" class="alert alert-danger">
                <i class="bi bi-exclamation-triangle"></i>
                Portfolio diagnosis error: {{ diagnosisError }}
              </div>
              <div v-if="stockDiagnosis">
                <!-- Portfolio performance overview -->
                <div v-if="stockDiagnosis.portfolioPerformance" class="diagnosis-section result-item">
                  <div class="diagnosis-header">
                    <h5 class="diagnosis-title">
                      <i class="bi bi-briefcase"></i> {{ stockDiagnosis.symbol }} - Portfolio Performance
                    </h5>
                    <span class="badge" :class="`bg-${getScoreColor(stockDiagnosis.overallScore)}`">
                      {{ stockDiagnosis.overallScore }}/100
                    </span>
                  </div>
                  <div class="portfolio-metrics">
                    <div class="row">
                      <div class="col-md-6">
                        <div class="metric-card">
                          <div class="metric-label">Purchase Price</div>
                          <div class="metric-value">$
                            {{ formatPrice(stockDiagnosis.portfolioPerformance.purchasePrice) }}
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="metric-card">
                          <div class="metric-label">Current Price</div>
                          <div class="metric-value">$
                            {{ formatPrice(stockDiagnosis.portfolioPerformance.currentPrice) }}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row mt-2">
                      <div class="col-md-6">
                        <div class="metric-card">
                          <div class="metric-label">Total Return</div>
                          <div class="metric-value" :class="{ 'text-success': stockDiagnosis.portfolioPerformance.totalReturn >= 0, 'text-danger': stockDiagnosis.portfolioPerformance.totalReturn < 0 }">
                            <i class="bi" :class="stockDiagnosis.portfolioPerformance.totalReturn >= 0 ? 'bi-arrow-up' : 'bi-arrow-down'"></i>
                            {{ stockDiagnosis.portfolioPerformance.totalReturn >= 0 ? '+' : '' }}
                            {{ formatPercent(stockDiagnosis.portfolioPerformance.totalReturn) }}
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="metric-card">
                          <div class="metric-label">Holding Days</div>
                          <div class="metric-value">{{ stockDiagnosis.portfolioPerformance.holdingDays }} days</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="diagnosis-content mt-3 gpt-analysis" v-html="formatGPTAnalysis(stockDiagnosis.summary)"></div>
                </div>
                <!-- Stock analysis without portfolio performance -->
                <div v-else class="diagnosis-section result-item">
                  <div class="diagnosis-header">
                    <h5 class="diagnosis-title">{{ stockDiagnosis.symbol }} - Stock Analysis</h5>
                    <span class="badge" :class="`bg-${getScoreColor(stockDiagnosis.overallScore)}`">
                      {{ stockDiagnosis.overallScore }}/100
                    </span>
                  </div>
                  <div class="diagnosis-content gpt-analysis" v-html="formatGPTAnalysis(stockDiagnosis.summary)"></div>
                </div>
                
                <!-- GPT增强分析结果 -->
                <div v-if="stockDiagnosis.gptAnalysis" class="gpt-diagnosis-section result-item">
                  <div class="diagnosis-header">
                    <h6 class="diagnosis-title">
                      <i class="bi bi-robot"></i> AI Professional Diagnosis Analysis
                    </h6>
                    <span class="badge bg-info">GPT Enhanced</span>
                  </div>
                  <div class="diagnosis-content gpt-analysis" v-html="formatGPTAnalysis(stockDiagnosis.gptAnalysis)"></div>
                </div>
                
                <!-- Analysis sections -->
                <div v-if="stockDiagnosis.sections" v-for="(section, index) in stockDiagnosis.sections" 
                     :key="index" class="diagnosis-section result-item" 
                     :style="{ animationDelay: `${(index + 1) * 0.1}s` }">
                  <div class="diagnosis-header">
                    <h6 class="diagnosis-title">{{ section.title }}</h6>
                    <span class="badge" :class="`bg-${getScoreColor(section.score)}`">
                      {{ section.score }}/100
                    </span>
                  </div>
                  <div class="diagnosis-content gpt-analysis" v-html="formatGPTAnalysis(section.content)"></div>
                </div>
              </div>
            </div>
            <div class="loading-spinner" v-if="isDiagnosisLoading">
              <div class="spinner-border" role="status">
                <span class="visually-hidden">Diagnosing...</span>
              </div>
              <p style="margin-top: 1rem;">AI is performing deep analysis...</p>
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
import navcomponent from '../component/nav/nav.vue'
import PartnerOrganizations from '@/components/PartnerOrganizations.vue';
import { ref, onMounted } from 'vue';
import { getStockRecommendations, getPortfolioDiagnosis } from '../../api/module/web/ai';
import { useUserStore } from '@/store';

const userStore = useUserStore();
// Mock data for trader info
const traderInfo = ref({
  homeTopTitle: 'AI Trading Platform'
});

// Stock Picker related data
const stockPickerCriteria = ref({
  sector: '', // 保持为空字符串，表示所有行业，但不在UI上显示选择框
  style: 'Long-term investment',
  risk: 'Medium',
  timeHorizon: 'Medium-term (3-12 months)',
  investmentAmount: 100000,
  investmentGoal: 'Capital Appreciation',
  riskTolerance: 5
});
const stockRecommendations = ref<any[]>([]);
const isStockPickerLoading = ref(false);
const stockPickerError = ref('');
const investmentSummary = ref<string>('');
const overallStrategy = ref<any>(null);

// Stock Diagnosis related data
const portfolioData = ref({
  symbol: '',
  purchasePrice: '',
  purchaseDate: new Date().toISOString().split('T')[0], // 设置为当前日期
  purchaseMarket: 'NASDAQ',
  analysisType: 'portfolio'
});
const stockDiagnosis = ref<any>(null);
const isDiagnosisLoading = ref(false);
const diagnosisError = ref('');

// 新增：分析标签页管理
const activeTab = ref<Record<string, string>>({});

// Helper methods
function formatPrice(price: number) {
  return typeof price === 'number' ? price.toFixed(2) : '0.00';
}

function formatPercent(percent: number) {
  return typeof percent === 'number' ? percent.toFixed(2) : '0.00';
}

function formatMarketCap(cap: number) {
  if (!cap) return '$0';
  if (cap > 1e12) return `$${(cap / 1e12).toFixed(1)}T`;
  if (cap > 1e9) return `$${(cap / 1e9).toFixed(1)}B`;
  if (cap > 1e6) return `$${(cap / 1e6).toFixed(1)}M`;
  return `$${cap.toFixed(0)}`;
}

function getScoreColor(score: number) {
  if (score >= 80) return 'success';
  if (score >= 60) return 'warning';
  return 'danger';
}

function getScoreLabel(score: number) {
  if (score >= 80) return 'Strong Buy';
  if (score >= 60) return 'Buy';
  if (score >= 40) return 'Hold';
  return 'Sell';
}

// 新增：分析相关方法
function setActiveTab(symbol: string, tabKey: string) {
  activeTab.value[symbol] = tabKey;
}

function getAnalysisIcon(key: string) {
  const icons: Record<string, string> = {
    'businessAnalysis': 'bi bi-building',
    'financialAnalysis': 'bi bi-graph-up',
    'technicalAnalysis': 'bi bi-bar-chart',
    'investmentAdvice': 'bi bi-lightbulb',
    'riskAssessment': 'bi bi-shield-exclamation',
    'positionAdvice': 'bi bi-pie-chart'
  };
  return icons[key] || 'bi bi-info-circle';
}

function getAnalysisTitle(key: string) {
  const titles: Record<string, string> = {
    'businessAnalysis': 'Business Analysis',
    'financialAnalysis': 'Financial Performance',
    'technicalAnalysis': 'Technical Analysis',
    'investmentAdvice': 'Investment Advice',
    'riskAssessment': 'Risk Assessment',
    'positionAdvice': 'Position Analysis'
  };
  return titles[key] || key;
}

function getScoreLevel(score: number) {
  if (score >= 80) return 'excellent';
  if (score >= 60) return 'good';
  if (score >= 40) return 'fair';
  return 'poor';
}

function formatAnalysisContent(content: string) {
  if (!content) return '';
  
  // 格式化内容，支持换行和重点标记
  return content
    .replace(/\n/g, '<br>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>');
}

// 新增：格式化策略文本为段落
function formatStrategyText(content: string) {
  if (!content) return '';
  
  // 将策略内容按段落分割并格式化
  const paragraphs = content.split('\n').filter(p => p.trim());
  
  return paragraphs.map(paragraph => {
    const trimmed = paragraph.trim();
    
    // 检查是否是标题（包含冒号且较短）
    if (trimmed.includes(':') && trimmed.length < 100) {
      const parts = trimmed.split(':');
      if (parts.length === 2) {
        return `<div class="strategy-title"><strong>${parts[0]}:</strong> ${parts[1].trim()}</div>`;
      }
    }
    // 检查是否是列表项（以-开头）
    else if (trimmed.startsWith('-')) {
      return `<div class="strategy-list-item">${trimmed.replace(/^-\s*/, '')}</div>`;
    }
    // 检查是否是粗体标题（**包围）
    else if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
      return `<div class="strategy-title"><strong>${trimmed.replace(/\*\*/g, '')}</strong></div>`;
    }
    // 检查是否包含粗体文本
    else if (trimmed.includes('**')) {
      return `<div class="strategy-paragraph-text">${trimmed.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</div>`;
    }
    // 普通段落
    else {
      return `<div class="strategy-paragraph-text">${trimmed}</div>`;
    }
  }).join('');
}

function formatStockSymbol(event: Event) {
  const input = event.target as HTMLInputElement;
  input.value = input.value.toUpperCase();
  portfolioData.value.symbol = input.value;
}

// 格式化GPT分析内容
function formatGPTAnalysis(content: string): string {
  if (!content) return '';
  
  // 将内容按段落分割，支持多种分隔符
  const paragraphs = content.split(/\n+|\r\n+/).filter(p => p.trim());
  
  return paragraphs.map(paragraph => {
    const trimmed = paragraph.trim();
    
    // 检查是否是数字列表（以数字和点开头）
    if (/^\d+\./.test(trimmed)) {
      // 提取数字和内容
      const match = trimmed.match(/^(\d+)\.\s*(.*)$/);
      if (match) {
        const number = match[1];
        const content = match[2];
        return `<div class="gpt-numbered-item">
          <span class="number">${number}.</span>
          <span class="content">${content}</span>
        </div>`;
      }
      return `<div class="gpt-numbered-item">${trimmed}</div>`;
    }
    // 检查是否是标题（包含冒号且较短）
    else if (trimmed.includes(':') && trimmed.length < 100) {
      const parts = trimmed.split(':');
      if (parts.length === 2) {
        return `<div class="gpt-title"><strong>${parts[0]}:</strong> ${parts[1].trim()}</div>`;
      }
    }
    // 检查是否是列表项（以-开头）
    else if (trimmed.startsWith('-')) {
      return `<div class="gpt-list-item">${trimmed.replace(/^-\s*/, '')}</div>`;
    }
    // 检查是否是粗体标题（**包围）
    else if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
      return `<div class="gpt-title"><strong>${trimmed.replace(/\*\*/g, '')}</strong></div>`;
    }
    // 检查是否包含粗体文本
    else if (trimmed.includes('**')) {
      return `<div class="gpt-paragraph">${trimmed.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</div>`;
    }
    // 普通段落
    else {
      return `<div class="gpt-paragraph">${trimmed}</div>`;
    }
  }).join('');
}

// 强制设置日期选择器为英文显示
function setDatePickerLocale() {
  const dateInputs = document.querySelectorAll('input[type="date"]');
  dateInputs.forEach(input => {
    // 设置语言属性
    input.setAttribute('lang', 'en-US');
    input.setAttribute('data-lang', 'en');
    
    // 强制设置语言环境
    if (input.style) {
      input.style.setProperty('-webkit-locale', 'en-US');
      input.style.setProperty('locale', 'en-US');
    }
    
    // 尝试强制设置浏览器语言环境
    try {
      // 创建新的日期对象来测试语言环境
      const testDate = new Date();
      const options = { 
        weekday: 'short', 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        locale: 'en-US'
      };
      testDate.toLocaleDateString('en-US', options);
    } catch (e) {
      console.log('Language setting not fully supported');
    }
  });
}

// 在组件挂载后设置
onMounted(() => {
  setDatePickerLocale();
  // 监听DOM变化，确保新添加的日期选择器也被设置
  const observer = new MutationObserver(() => {
    setDatePickerLocale();
  });
  observer.observe(document.body, { childList: true, subtree: true });
});

// API Functions
async function checkLoginStatus() {
  try {
    const response = await fetch('/api/checklogin', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error('Error checking login status:', error);
  }
  return { success: false };
}

async function runStockPicker() {
  try{
        let histaryday = new Date();
        histaryday.setDate(histaryday.getDate() - 1);
        console.log(histaryday.toISOString().slice(0, 10))
        localStorage.removeItem(`runStockPicker_${histaryday.toISOString().slice(0, 10)}`)
    }
    catch(error){
      
    }
  const today = new Date().toISOString().slice(0, 10);
  const likeKey = `runStockPicker_${today}`;
  
  // Clear previous results and errors
  stockRecommendations.value = [];
  stockPickerError.value = '';
  isStockPickerLoading.value = true;
  
  try {
    // Check login status
   
    if (!userStore.token) {
      if (localStorage.getItem(likeKey)) {
        stockPickerError.value = 'You have already used it once today. If you want to continue using it, please log in!';
        return;
      }
    }
    
    const data = await getStockRecommendations(stockPickerCriteria.value);
    console.log('AI选股返回数据:', data);
    if (!data.success) {
      stockPickerError.value=data.error || 'Server returned error status';
      return;
      // throw new Error(data.error || 'Server returned error status');
    }
    
    stockRecommendations.value = data.recommendations || [];
    investmentSummary.value = data.investmentSummary || '';
    overallStrategy.value = data.overallStrategy || null;
    
    // 调试：打印返回的数据结构
    
    console.log('推荐股票数据:', stockRecommendations.value);
    console.log('投资摘要:', investmentSummary.value);
    console.log('整体策略:', overallStrategy.value);
    
    // 为每个股票设置默认激活的分析标签页
    stockRecommendations.value.forEach((stock: any) => {
      console.log('股票数据:', stock.symbol, stock);
      
      // 检查各种可能的数据结构
      if (stock.analysis && Object.keys(stock.analysis).length > 0) {
        const firstKey = Object.keys(stock.analysis)[0];
        activeTab.value[stock.symbol] = firstKey;
        console.log('设置分析标签页:', stock.symbol, firstKey);
      } else if (stock.sections) {
        // 兼容旧的数据结构
        console.log('使用sections数据结构');
      } else if (stock.reason) {
        // 显示reason字段作为基础分析
        console.log('使用reason字段:', stock.reason);
      }
    });
    
    localStorage.setItem('runStock', JSON.stringify(stockRecommendations.value));
    
  } catch (error) {
    console.error('Error in runStockPicker:', error);
    stockPickerError.value = error instanceof Error ? error.message : 'Unknown error';
  } finally {
    isStockPickerLoading.value = false;
    localStorage.setItem(likeKey, '1');
  }
}

async function runPortfolioDiagnosis() {
  const today = new Date().toISOString().slice(0, 10);
  const likeKey = `runPortfolioDiagnosis_${today}`;
  
  // Validate required fields
  if (!portfolioData.value.symbol.trim()) {
    alert('Please enter a stock symbol');
    return;
  }
  
  if (!portfolioData.value.purchasePrice || !portfolioData.value.purchaseDate) {
    alert('Please fill in purchase price and date for more accurate portfolio analysis');
  }
  
  // Clear previous results and errors
  stockDiagnosis.value = null;
  diagnosisError.value = '';
  isDiagnosisLoading.value = true;
  
  try {
    // Check login status
    const loginStatus = await checkLoginStatus();
    if (loginStatus.success && !loginStatus.userlogin) {
      if (localStorage.getItem(likeKey)) {
        diagnosisError.value = 'You have already used it once today. If you want to continue using it, please log in!';
        return;
      }
    }
    
    const requestData = {
      ...portfolioData.value,
      purchasePrice: portfolioData.value.purchasePrice ? parseFloat(portfolioData.value.purchasePrice) : null,
    };
    
    const data = await getPortfolioDiagnosis(requestData);
    
    if (!data.success) {
      diagnosisError.value=data.error || 'Server returned error status';
      return;
    }
    
    stockDiagnosis.value = data.diagnosis || null;
    
  } catch (error) {
    console.error('Error in runPortfolioDiagnosis:', error);
    diagnosisError.value = error instanceof Error ? error.message : 'Unknown error';
  } finally {
    isDiagnosisLoading.value = false;
    localStorage.setItem(likeKey, '1');
  }
}

async function testAPI() {
  console.log('Testing AI Stock Picker API...');
  try {
    const response = await fetch('/api/ai/stock-picker', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sector: 'technology',
        style: 'growth',
        risk: 'medium',
        timeHorizon: 'medium'
      })
    });
    
    console.log('Response status:', response.status);
    const data = await response.json();
    console.log('Full API response:', data);
    
    if (data.recommendations && data.recommendations.length > 0) {
      alert(`API test successful! Got ${data.recommendations.length} recommendations`);
    } else {
      alert('API response successful but no recommendations found');
    }
  } catch (error) {
    console.error('API test failed:', error);
    alert(`API test failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Load saved results on mount
onMounted(() => {
  try {
    const savedResults = localStorage.getItem('runStock');
    if (savedResults) {
      stockRecommendations.value = JSON.parse(savedResults);
    }
  } catch (error) {
    console.error('Error loading saved results:', error);
  }
});
</script>

<style scoped>
.ai-tools-page {
  background: linear-gradient(145deg, #13141f 0%, #181c2b 100%);
  color: #ffffff;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  margin: 0;
  padding: 0;
  min-height: 100vh;
}

.navbar {
  background: linear-gradient(90deg, #181c2b 0%, #13141f 100%);
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
  padding: 0.5rem 0;
  border-bottom: 1px solid #ffd700;
}

.navbar-brand {
  font-weight: 600;
  font-size: 1rem;
  color: #ffd700;
}

.ai-header {
  background: linear-gradient(135deg, #ffb300 0%, #ffd700 50%, #b8860b 100%);
  padding: 3rem 0;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.ai-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="circuit" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M10,5 L15,10 L10,15 L5,10 Z" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23circuit)"/></svg>') repeat;
  opacity: 0.1;
}

.ai-header h1 {
  font-size: 3rem;
  font-weight: 700;
  color: #13141f;
  margin-bottom: 1rem;
  text-shadow: 0 2px 10px rgba(255,255,255,0.2);
  position: relative;
  z-index: 1;
}

.ai-header p {
  font-size: 1.2rem;
  color: #13141f;
  opacity: 0.9;
  margin-bottom: 0;
  position: relative;
  z-index: 1;
}

.ai-tools-container {
  padding: 2rem 0;
}

.ai-tool-card {
  background: linear-gradient(145deg, #181c2b 0%, #13141f 100%);
  border-radius: 15px;
  margin-bottom: 2rem;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
  position: relative;
  overflow: hidden;
  border-top: 3px solid #ffd700;
}

.ai-tool-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
  border-color: var(--gold-color);
}

.ai-tool-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--ai-gradient);
}

.tool-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.tool-icon {
  background: linear-gradient(135deg, #ffd700 0%, #ffb300 100%);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  flex-shrink: 0;
  color: #1a1a2e;
  font-size: 1.25rem;
}

.tool-title {
  flex: 1;
}

.tool-title h3 {
  color: #ffffff;
  margin: 0;
  font-size: 1.5rem;
}

.tool-title p {
  color: #a0a0a0;
  margin: 0.25rem 0 0 0;
  font-size: 0.9rem;
}

.tool-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-top: 1.5rem;
}

.input-section {
  background: rgba(255,215,0,0.05);
  border: 1px solid #2a2a3a;
  border-radius: 12px;
  padding: 1.5rem;
}

.input-section h4 {
  color: #ffd700;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.form-control, .form-select {
  background-color: #1a1a2e;
  border: 1px solid #2a2a3a;
  color: #ffffff;
  border-radius: 8px;
  padding: 0.75rem;
  margin-bottom: 1rem;
}

.form-control:focus, .form-select:focus {
  background-color: #1a1a2e;
  border-color: #ffd700;
  color: #ffffff;
  box-shadow: 0 0 0 0.2rem rgba(255, 215, 0, 0.25);
}

.btn-ai {
  background: linear-gradient(90deg, #ffd700 0%, #b8860b 100%);
  border: none;
  color: #13141f;
  padding: 0.75rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-ai:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(255, 215, 0, 0.4);
  color: #13141f;
}

.btn-ai:disabled {
  opacity: 0.6;
  transform: none;
  box-shadow: none;
}

.results-section {
  background: rgba(46, 204, 113, 0.05);
  border: 1px solid #2ecc71;
  border-radius: 12px;
  padding: 1.5rem;
  min-height: 200px;
}

.results-section h4 {
  color: #ffd700;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.loading-spinner {
  text-align: center;
  padding: 2rem;
}

.spinner-border {
  color: #ffd700;
}

.stock-recommendation {
  background: rgba(255,215,0,0.1);
  border: 1px solid #ffd700;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;
}

.stock-recommendation:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(255, 215, 0, 0.3);
  border-color: #ffb300;
}

.stock-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
}

.stock-symbol {
  font-size: 1.4rem;
  font-weight: 700;
  color: #ffd700;
}

.stock-name {
  font-size: 0.9rem;
  color: #a0a0a0;
  margin-bottom: 1rem;
  font-weight: 500;
}

.stock-price-info {
  text-align: right;
}

.current-price {
  font-size: 1.1rem;
  font-weight: 600;
  color: #ffffff;
  display: block;
}

.price-change {
  font-size: 0.85rem;
  font-weight: 600;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  margin-top: 0.25rem;
  display: inline-block;
}

.price-change.positive {
  background: rgba(46, 204, 113, 0.2);
  color: #2ecc71;
}

.price-change.negative {
  background: rgba(231, 76, 60, 0.2);
  color: #e74c3c;
}

.stock-score {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.score-badge {
  background: linear-gradient(90deg, #ffd700 0%, #b8860b 100%);
  color: #13141f;
  padding: 0.3rem 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
}

.stock-metrics {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
  padding: 0.75rem;
  background: rgba(0,0,0,0.2);
  border-radius: 8px;
}

.metric-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-width: 80px;
}

.metric-label {
  font-size: 0.75rem;
  color: #888;
  margin-bottom: 0.25rem;
}

.metric-value {
  font-size: 0.9rem;
  font-weight: 600;
  color: #ffffff;
}

.metric-value.high-volume {
  color: #f1c40f;
}

.stock-reason {
  color: #a0a0a0;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 1rem;
  padding: 1rem;
  background: rgba(0,0,0,0.1);
  border-radius: 8px;
  border-left: 3px solid #ffd700;
}

.stock-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  font-size: 0.85rem;
}

.sector-tag, .return-estimate, .risk-level {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  background: rgba(0,0,0,0.3);
}

.sector-tag {
  color: #ffd700;
}

.return-estimate.positive {
  color: #2ecc71;
}

.return-estimate.negative {
  color: #e74c3c;
}

.risk-level {
  color: #f1c40f;
}

.diagnosis-section {
  background: rgba(255, 215, 0, 0.05);
  border: 1px solid #ffd700;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
}

.diagnosis-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.diagnosis-title {
  color: #ffd700;
  font-weight: 600;
  margin: 0;
}

.diagnosis-content {
  color: #a0a0a0;
  line-height: 1.5;
}

.portfolio-metrics {
  margin: 1rem 0;
}

.metric-card {
  background: rgba(255, 215, 0, 0.05);
  border: 1px solid rgba(255, 215, 0, 0.3);
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
  margin-bottom: 0.5rem;
}

.metric-label {
  font-size: 0.9rem;
  color: #a0a0a0;
  margin-bottom: 0.5rem;
}

.metric-value {
  font-size: 1.2rem;
  font-weight: 600;
  color: #ffffff;
}

.text-success {
  color: #2ecc71 !important;
}

.text-danger {
  color: #dc3545 !important;
}

.back-btn {
  background: #13141f;
  border: 1px solid rgba(255, 215, 0, 0.3);
  color: #ffffff;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.back-btn:hover {
  border-color: #ffd700;
  color: #ffd700;
  text-decoration: none;
}

/* AI Animation Effects */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.ai-thinking {
  animation: pulse 1.5s infinite;
}

/* Result Display Animation */
.result-item {
  opacity: 0;
  transform: translateY(20px);
  animation: slideIn 0.5s ease forwards;
}

@keyframes slideIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 增强分析样式 */
.enhanced-analysis {
  margin-top: 1rem;
  border-top: 1px solid #e9ecef;
  padding-top: 1rem;
}

.analysis-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.analysis-tab {
  background: #f8f9fa;
  border: 1px solid #dee2e6;
  color: #495057;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.analysis-tab:hover {
  background: #e9ecef;
  border-color: #adb5bd;
}

.analysis-tab.active {
  background: #007bff;
  border-color: #007bff;
  color: white;
}

.analysis-panel {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid #e9ecef;
}

.analysis-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #dee2e6;
}

.analysis-header h6 {
  margin: 0;
  color: #495057;
  font-weight: 600;
}

.analysis-score {
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
}

.score-excellent {
  background: #d4edda;
  color: #155724;
}

.score-good {
  background: #d1ecf1;
  color: #0c5460;
}

.score-fair {
  background: #fff3cd;
  color: #856404;
}

.score-poor {
  background: #f8d7da;
  color: #721c24;
}

.analysis-text {
  line-height: 1.6;
  color: #2c3e50;
  font-weight: 500;
}

/* 投资建议样式 */
.investment-advice {
  margin-top: 1rem;
  padding: 1rem;
  background: linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%);
  border-radius: 8px;
  border-left: 4px solid #2196f3;
}

.investment-advice h6 {
  color: #1976d2;
  margin-bottom: 0.75rem;
  font-weight: 600;
}

.advice-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.75rem;
}

.advice-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.advice-label {
  font-size: 0.875rem;
  color: #666;
  font-weight: 500;
}

.advice-value {
  font-size: 0.95rem;
  color: #333;
  font-weight: 600;
}

/* 风险评估样式 */
.risk-assessment {
  margin-top: 1rem;
  padding: 1rem;
  background: linear-gradient(135deg, #fff3e0 0%, #fce4ec 100%);
  border-radius: 8px;
  border-left: 4px solid #ff9800;
}

.risk-assessment h6 {
  color: #f57c00;
  margin-bottom: 0.75rem;
  font-weight: 600;
}

.risk-content {
  line-height: 1.6;
  color: #2c3e50;
  font-weight: 500;
}

.risk-details p {
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.risk-details strong {
  color: #f57c00;
  font-weight: 700;
}

/* 基础分析样式 */
.basic-analysis {
  margin-top: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #6c757d;
}

.basic-analysis h6 {
  color: #495057;
  margin-bottom: 0.75rem;
  font-weight: 600;
}

.basic-analysis .analysis-text {
  color: #2c3e50;
  line-height: 1.6;
  font-weight: 500;
}

/* sections分析样式 */
.sections-analysis {
  margin-top: 1rem;
}

.analysis-section {
  margin-bottom: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.analysis-section:last-child {
  margin-bottom: 0;
}

.analysis-section .analysis-text {
  color: #2c3e50;
  line-height: 1.6;
  font-weight: 500;
}

/* GPT分析样式 */
.gpt-analysis {
  line-height: 1.6;
  color: #2c3e50;
  font-weight: 500;
}

.analysis-paragraph-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #ffd700;
  margin: 1rem 0 0.5rem 0;
  padding: 0.5rem 0;
  border-bottom: 2px solid rgba(255, 215, 0, 0.5);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.analysis-paragraph-subtitle {
  font-size: 1rem;
  font-weight: 600;
  color: #f1c40f;
  margin: 0.75rem 0 0.25rem 0;
  padding-left: 1rem;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.analysis-paragraph {
  margin: 0.5rem 0;
  padding: 0.5rem 0;
  color: #2c3e50;
  font-weight: 500;
}

/* GPT 数字列表样式 */
.gpt-numbered-item {
  margin: 0.75rem 0;
  padding: 0.75rem 0;
  border-left: 3px solid #3498db;
  padding-left: 1rem;
  background: rgba(52, 152, 219, 0.05);
  border-radius: 0 8px 8px 0;
}

.gpt-numbered-item .number {
  font-weight: 700;
  color: #2980b9;
  font-size: 1.05em;
  margin-right: 0.5rem;
}

.gpt-numbered-item .content {
  color: #2c3e50;
  line-height: 1.6;
}

/* GPT 段落样式 */
.gpt-paragraph {
  margin: 0.5rem 0;
  padding: 0.5rem 0;
  color: #2c3e50;
  line-height: 1.6;
}

/* GPT 标题样式 */
.gpt-title {
  margin: 1rem 0 0.5rem 0;
  padding: 0.5rem 0;
  font-weight: 600;
  color: #e74c3c;
}

/* GPT 列表项样式 */
.gpt-list-item {
  margin: 0.5rem 0;
  padding: 0.5rem 0 0.5rem 1.5rem;
  position: relative;
}

.gpt-list-item::before {
  content: "•";
  position: absolute;
  left: 0.5rem;
  color: #3498db;
  font-weight: bold;
}


.gpt-diagnosis-section {
  background: rgba(52, 152, 219, 0.1);
  border: 1px solid #3498db;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1rem;
}

.gpt-diagnosis-section .diagnosis-title {
  color: #3498db;
}

.bg-info {
  background-color: #3498db !important;
}

/* 风险容忍度滑块样式 */
.risk-tolerance-slider {
  margin: 1rem 0;
}

.slider-labels {
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: #666;
}

.current-value {
  text-align: center;
  margin-top: 0.5rem;
  font-weight: 600;
  color: #007bff;
}

/* 股票行业样式 */
.stock-industry {
  color: #6c757d;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

/* 投资建议样式增强 */
.action-buy {
  background: #28a745;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-weight: 600;
}

/* 风险等级徽章 */
.risk-badge {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.875rem;
}

.risk-badge.low {
  background: #d4edda;
  color: #155724;
}

.risk-badge.medium {
  background: #fff3cd;
  color: #856404;
}

.risk-badge.high {
  background: #f8d7da;
  color: #721c24;
}

/* 公司基本面样式 */
.fundamentals-section {
  margin-top: 1rem;
  padding: 1rem;
  background: linear-gradient(135deg, #e8f5e8 0%, #f0f8ff 100%);
  border-radius: 8px;
  border-left: 4px solid #28a745;
}

.fundamentals-section h6 {
  color: #28a745;
  margin-bottom: 0.75rem;
  font-weight: 600;
}

.fundamentals-content p {
  margin-bottom: 0.5rem;
  line-height: 1.5;
  color: #2c3e50;
  font-weight: 500;
}

.fundamentals-content strong {
  color: #28a745;
  font-weight: 700;
}

/* 左侧投资策略样式 */
.investment-summary-section {
  background: rgba(46, 204, 113, 0.15);
  border: 2px solid #2ecc71;
  border-radius: 12px;
  padding: 1.5rem;
  margin-top: 1.5rem;
  box-shadow: 0 4px 8px rgba(46, 204, 113, 0.2);
}

.investment-summary-section h4 {
  color: #2ecc71;
  margin-bottom: 1rem;
  font-size: 1.2rem;
  font-weight: 700;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.strategy-content {
  display: grid;
  gap: 1rem;
}

.strategy-item {
  background: rgba(255, 255, 255, 0.9);
  padding: 1rem;
  border-radius: 8px;
  border-left: 4px solid #2ecc71;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.strategy-item h5 {
  color: #2ecc71;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
}

.strategy-item p {
  margin: 0;
  line-height: 1.6;
  color: #2c3e50;
  font-weight: 500;
}

/* 策略内容样式 */
.allocation-content,
.risk-management-content,
.trading-strategy-content {
  margin-top: 0.5rem;
}

.allocation-summary {
  padding: 0.75rem;
  background: rgba(46, 204, 113, 0.15);
  border-radius: 6px;
  border-left: 3px solid #2ecc71;
  color: #2c3e50;
  font-weight: 600;
  font-size: 1rem;
}

/* 策略段落样式优化 */
.strategy-paragraph {
  margin-top: 0.5rem;
}

.strategy-title {
  margin-bottom: 0.75rem;
  padding: 0.75rem 1rem;
  background: linear-gradient(135deg, rgba(46, 204, 113, 0.15), rgba(46, 204, 113, 0.08));
  border-radius: 8px;
  border-left: 4px solid #2ecc71;
  color: #1a252f;
  font-weight: 700;
  font-size: 1rem;
  box-shadow: 0 2px 4px rgba(46, 204, 113, 0.1);
  transition: all 0.3s ease;
}

.strategy-title:hover {
  background: linear-gradient(135deg, rgba(46, 204, 113, 0.2), rgba(46, 204, 113, 0.12));
  transform: translateX(2px);
}

.strategy-title strong {
  color: #27ae60;
  font-weight: 800;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.strategy-list-item {
  margin-bottom: 0.6rem;
  padding: 0.5rem 0.5rem 0.5rem 1.5rem;
  color: #2c3e50;
  font-weight: 600;
  font-size: 0.95rem;
  position: relative;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 4px;
  border-left: 2px solid #2ecc71;
  transition: all 0.2s ease;
}

.strategy-list-item:hover {
  background: rgba(46, 204, 113, 0.08);
  transform: translateX(3px);
}

.strategy-list-item::before {
  content: "▶";
  color: #2ecc71;
  font-weight: bold;
  font-size: 0.8rem;
  position: absolute;
  left: 0.5rem;
  top: 0.5rem;
}

.strategy-paragraph-text {
  margin-bottom: 0.8rem;
  color: #34495e;
  font-weight: 600;
  font-size: 0.95rem;
  line-height: 1.7;
  padding: 0.6rem 0.8rem;
  background: rgba(255, 255, 255, 0.4);
  border-radius: 6px;
  border-left: 3px solid #3498db;
  text-align: justify;
  transition: all 0.2s ease;
}

/* AI诊股结果文字优化 */
.diagnosis-content {
  color: #ffffff !important;
  font-weight: 500;
  line-height: 1.7;
  font-size: 0.95rem;
}

.diagnosis-content p {
  color: #ffffff !important;
  margin-bottom: 0.8rem;
  font-weight: 500;
}

.diagnosis-content strong {
  color: #4fc3f7 !important;
  font-weight: 700;
}

.diagnosis-content h1,
.diagnosis-content h2,
.diagnosis-content h3,
.diagnosis-content h4,
.diagnosis-content h5,
.diagnosis-content h6 {
  color: #4fc3f7 !important;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

/* GPT分析内容优化 */
.gpt-analysis {
  background: rgba(79, 195, 247, 0.1);
  border-radius: 8px;
  padding: 1rem;
  border-left: 4px solid #4fc3f7;
}

.gpt-analysis p {
  color: #ffffff !important;
  margin-bottom: 0.8rem;
  font-weight: 500;
  line-height: 1.7;
}

.gpt-analysis strong {
  color: #4fc3f7 !important;
  font-weight: 700;
}

/* 诊断标题优化 */
.diagnosis-title {
  color: #4fc3f7 !important;
  font-weight: 700;
  font-size: 1.1rem;
}

.diagnosis-header {
  border-bottom: 2px solid rgba(79, 195, 247, 0.3);
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
}

/* 诊断卡片背景优化 */
.diagnosis-section {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(79, 195, 247, 0.2);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  backdrop-filter: blur(10px);
}

/* GPT分析段落样式优化 */
.gpt-title {
  margin-bottom: 0.75rem;
  padding: 0.75rem 1rem;
  background: rgba(79, 195, 247, 0.15);
  border-radius: 8px;
  border-left: 4px solid #4fc3f7;
  color: #ffffff !important;
  font-weight: 700;
  font-size: 1rem;
  box-shadow: 0 2px 4px rgba(79, 195, 247, 0.1);
  transition: all 0.3s ease;
}

.gpt-title:hover {
  background: rgba(79, 195, 247, 0.2);
  transform: translateX(2px);
}

.gpt-title strong {
  color: #4fc3f7 !important;
  font-weight: 800;
}

.gpt-list-item {
  margin-bottom: 0.6rem;
  padding: 0.5rem 0.5rem 0.5rem 1.5rem;
  color: #ffffff !important;
  font-weight: 500;
  font-size: 0.95rem;
  position: relative;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  border-left: 2px solid #4fc3f7;
  transition: all 0.2s ease;
}

.gpt-list-item:hover {
  background: rgba(79, 195, 247, 0.15);
  transform: translateX(3px);
}

.gpt-list-item::before {
  content: "▶";
  color: #4fc3f7;
  font-weight: bold;
  font-size: 0.8rem;
  position: absolute;
  left: 0.5rem;
  top: 0.5rem;
}

.gpt-numbered-item {
  margin-bottom: 0.6rem;
  padding: 0.5rem 0.5rem 0.5rem 1.5rem;
  color: #ffffff !important;
  font-weight: 500;
  font-size: 0.95rem;
  position: relative;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  border-left: 2px solid #ff9800;
  transition: all 0.2s ease;
}

.gpt-numbered-item:hover {
  background: rgba(255, 152, 0, 0.15);
  transform: translateX(3px);
}

.gpt-numbered-item::before {
  content: "🔢";
  font-size: 0.7rem;
  position: absolute;
  left: 0.5rem;
  top: 0.5rem;
}

.gpt-paragraph {
  margin-bottom: 0.8rem;
  color: #ffffff !important;
  font-weight: 500;
  font-size: 0.95rem;
  line-height: 1.7;
  padding: 0.6rem 0.8rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 6px;
  border-left: 3px solid #4fc3f7;
  text-align: justify;
  transition: all 0.2s ease;
}

.gpt-paragraph:hover {
  background: rgba(79, 195, 247, 0.1);
  transform: translateX(2px);
}

/* 强制应用策略段落样式 - 使用深度选择器 */
.strategy-paragraph :deep(.strategy-title) {
  margin-bottom: 0.75rem;
  padding: 0.75rem 1rem;
  background: linear-gradient(135deg, rgba(46, 204, 113, 0.15), rgba(46, 204, 113, 0.08));
  border-radius: 8px;
  border-left: 4px solid #2ecc71;
  color: #1a252f !important;
  font-weight: 700;
  font-size: 1rem;
  box-shadow: 0 2px 4px rgba(46, 204, 113, 0.1);
  transition: all 0.3s ease;
}

.strategy-paragraph :deep(.strategy-title strong) {
  color: #27ae60 !important;
  font-weight: 800;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.strategy-paragraph :deep(.strategy-list-item) {
  margin-bottom: 0.6rem;
  padding: 0.5rem 0.5rem 0.5rem 1.5rem;
  color: #2c3e50 !important;
  font-weight: 600;
  font-size: 0.95rem;
  position: relative;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 4px;
  border-left: 2px solid #2ecc71;
  transition: all 0.2s ease;
}

.strategy-paragraph :deep(.strategy-list-item::before) {
  content: "▶";
  color: #2ecc71;
  font-weight: bold;
  font-size: 0.8rem;
  position: absolute;
  left: 0.5rem;
  top: 0.5rem;
}

.strategy-paragraph :deep(.strategy-paragraph-text) {
  margin-bottom: 0.8rem;
  color: #34495e !important;
  font-weight: 600;
  font-size: 0.95rem;
  line-height: 1.7;
  padding: 0.6rem 0.8rem;
  background: rgba(255, 255, 255, 0.4);
  border-radius: 6px;
  border-left: 3px solid #3498db;
  text-align: justify;
  transition: all 0.2s ease;
}
  
/* 日期选择器优化 - 强制英文显示 */
input[type="date"] {
  color-scheme: dark;
  font-family: inherit;
  direction: ltr;
  /* 强制使用英文语言环境 */
  -webkit-locale: "en-US";
  locale: "en-US";
}

input[type="date"]::-webkit-calendar-picker-indicator {
  filter: invert(1);
  cursor: pointer;
}

/* 强制日期选择器使用英文星期显示 */
input[type="date"]::-webkit-datetime-edit-text,
input[type="date"]::-webkit-datetime-edit-month-field,
input[type="date"]::-webkit-datetime-edit-day-field,
input[type="date"]::-webkit-datetime-edit-year-field {
  color: #ffffff;
  font-family: inherit;
}

/* 确保日期格式为美国格式 */
input[type="date"] {
  text-align: left;
  unicode-bidi: bidi-override;
  direction: ltr;
}

/* Mobile Responsive Design */
@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }
  
  .ai-header {
    padding: 2rem 1rem;
  }
  
  .ai-header h1 {
    font-size: 2.2rem;
    margin-bottom: 0.5rem;
  }
  
  .ai-header p {
    font-size: 1rem;
  }
  
  .ai-tools-container {
    padding: 1rem 0;
  }
  
  .ai-tool-card {
    margin-bottom: 1.5rem;
    padding: 1.5rem 1rem;
  }
  
  .tool-header {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
  
  .tool-icon {
    width: 40px;
    height: 40px;
    font-size: 1rem;
    margin-right: 0;
  }
  
  .tool-title h3 {
    font-size: 1.3rem;
  }
  
  .tool-title p {
    font-size: 0.85rem;
  }
  
  .tool-content {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    margin-top: 1rem;
  }
  
  .input-section {
    padding: 1rem;
  }
  
  .input-section h4 {
    font-size: 1rem;
    margin-bottom: 0.75rem;
  }
  
  .form-control, .form-select {
    padding: 0.6rem;
    font-size: 0.9rem;
    margin-bottom: 0.75rem;
  }
  
  .btn-ai {
    padding: 0.6rem 1.5rem;
    font-size: 0.9rem;
    width: 100%;
    justify-content: center;
  }
  
  .results-section {
    padding: 1rem;
    min-height: 150px;
  }
  
  .results-section h4 {
    font-size: 1rem;
    margin-bottom: 0.75rem;
  }
  
  .stock-recommendation {
    padding: 1rem;
    margin-bottom: 1rem;
  }
  
  .stock-header {
    flex-direction: column;
    gap: 0.75rem;
    align-items: flex-start;
  }
  
  .stock-symbol {
    font-size: 1.1rem;
  }
  
  .stock-name {
    font-size: 0.8rem;
  }
  
  .stock-price-info {
    text-align: left;
    width: 100%;
  }
  
  .current-price {
    font-size: 1rem;
  }
  
  .price-change {
    font-size: 0.8rem;
    padding: 0.15rem 0.4rem;
  }
  
  .stock-metrics {
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.5rem;
  }
  
  .metric-item {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    min-width: auto;
    padding: 0.25rem 0;
  }
  
  .metric-label {
    font-size: 0.8rem;
    margin-bottom: 0;
  }
  
  .metric-value {
    font-size: 0.85rem;
  }
  
  .stock-reason {
    font-size: 0.85rem;
    padding: 0.75rem;
    margin-bottom: 0.75rem;
  }
  
  .stock-footer {
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
  }
  
  .sector-tag, .return-estimate, .risk-level {
    font-size: 0.8rem;
    padding: 0.2rem 0.4rem;
  }
  
  .diagnosis-section {
    padding: 0.75rem;
    margin-bottom: 0.75rem;
  }
  
  .diagnosis-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .diagnosis-title {
    font-size: 0.9rem;
  }
  
  .diagnosis-content {
    font-size: 0.85rem;
  }
  
  .metric-card {
    padding: 0.75rem;
    margin-bottom: 0.5rem;
  }
  
  .metric-label {
    font-size: 0.8rem;
    margin-bottom: 0.25rem;
  }
  
  .metric-value {
    font-size: 1rem;
  }
}

@media (max-width: 576px) {
  .ai-header {
    padding: 1.5rem 0.75rem;
  }
  
  .ai-header h1 {
    font-size: 1.8rem;
  }
  
  .ai-header p {
    font-size: 0.9rem;
  }
  
  .ai-tool-card {
    padding: 1rem 0.75rem;
    margin-bottom: 1rem;
  }
  
  .tool-title h3 {
    font-size: 1.2rem;
  }
  
  .tool-title p {
    font-size: 0.8rem;
  }
  
  .input-section {
    padding: 0.75rem;
  }
  
  .form-control, .form-select {
    padding: 0.5rem;
    font-size: 0.85rem;
  }
  
  .btn-ai {
    padding: 0.5rem 1rem;
    font-size: 0.85rem;
  }
  
  .results-section {
    padding: 0.75rem;
  }
  
  .stock-recommendation {
    padding: 0.75rem;
  }
  
  .stock-symbol {
    font-size: 1rem;
  }
  
  .stock-metrics {
    padding: 0.4rem;
  }
  
  .metric-item {
    padding: 0.2rem 0;
  }
  
  .stock-reason {
    font-size: 0.8rem;
    padding: 0.6rem;
  }
  
  .diagnosis-section {
    padding: 0.6rem;
  }
  
  .diagnosis-content {
    font-size: 0.8rem;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 0.5rem;
  }
  
  .ai-header {
    padding: 1rem 0.5rem;
  }
  
  .ai-header h1 {
    font-size: 1.6rem;
  }
  
  .ai-header p {
    font-size: 0.85rem;
  }
  
  .ai-tool-card {
    padding: 0.75rem 0.5rem;
  }
  
  .tool-icon {
    width: 35px;
    height: 35px;
    font-size: 0.9rem;
  }
  
  .tool-title h3 {
    font-size: 1.1rem;
  }
  
  .tool-title p {
    font-size: 0.75rem;
  }
  
  .input-section {
    padding: 0.6rem;
  }
  
  .form-control, .form-select {
    padding: 0.45rem;
    font-size: 0.8rem;
  }
  
  .btn-ai {
    padding: 0.45rem 0.8rem;
    font-size: 0.8rem;
  }
  
  .results-section {
    padding: 0.6rem;
  }
  
  .stock-recommendation {
    padding: 0.6rem;
  }
  
  .stock-symbol {
    font-size: 0.95rem;
  }
  
  .stock-name {
    font-size: 0.75rem;
  }
  
  .current-price {
    font-size: 0.9rem;
  }
  
  .price-change {
    font-size: 0.75rem;
  }
  
  .stock-metrics {
    padding: 0.3rem;
  }
  
  .metric-label {
    font-size: 0.75rem;
  }
  
  .metric-value {
    font-size: 0.8rem;
  }
  
  .stock-reason {
    font-size: 0.75rem;
    padding: 0.5rem;
  }
  
  .sector-tag, .return-estimate, .risk-level {
    font-size: 0.75rem;
    padding: 0.15rem 0.3rem;
  }
  
  .diagnosis-section {
    padding: 0.5rem;
  }
  
  .diagnosis-title {
    font-size: 0.85rem;
  }
  
  .diagnosis-content {
    font-size: 0.75rem;
  }
}
</style>