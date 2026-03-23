import React, { useState } from 'react';
import { FileText, Volume2, Camera, Sparkles, Play, Edit3, ArrowRight, CheckCircle, Layers } from 'lucide-react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { AI_COLORS } from '../constants/colors';
import { useAuth } from '../contexts/AuthContext';
import NoPermissionDialog from '../components/NoPermissionDialog';
import { handlePermissionRedeem } from '../utils/permissionUtils';

interface CreationOption {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  bgColor: string;
  features: string[];
  path: string;
}

const AICreator: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isRoot = location.pathname === '/provider/creator';
  const isAiyaClient = import.meta.env.VITE_CLIENT_SID === 'aiya';
  const { featureFlag, checkAuth } = useAuth();
  const [showNoPermission, setShowNoPermission] = useState(false);
  
  // 添加調試信息
  console.log('AICreator 頁面載入中...');


  const creationOptions: CreationOption[] = [
    {
      id: 'audio',
      title: '音頻創作',
      description: '使用AI技術快速生成專業音頻，支援多種情緒和語音風格',
      icon: Volume2,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      features: ['智能腳本生成', '多種情緒表達', '自訂語音模型', '一鍵生成'],
      path: '/provider/creator/audio'
    },
    {
      id: 'video-creation',
      title: '影片創作',
      description: '上傳圖片搭配語音，快速生成專業影片內容',
      icon: Camera,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      features: ['圖片上傳', '語音選擇', '自動合成', '一鍵生成'],
      path: '/provider/creator/video-creation'
    },
    {
      id: 'article',
      title: '文章創作',
      description: 'AI輔助文章創作，支援圖片影片上傳，智能標籤推薦',
      icon: FileText,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100',
      features: ['智能內容建議', '圖片影片上傳', '標籤自動推薦', '即時預覽'],
      path: '/provider/creator/article'
    },
    {
      id: 'cardhack',
      title: '卡牌創作',
      description: '創建專屬塔羅牌卡組，自訂牌義與牌陣，打造個人占卜系統',
      icon: Layers,
      color: 'text-pink-600',
      bgColor: 'bg-pink-100',
      features: ['自訂牌組管理', '多張牌卡創建', '牌義解釋編輯', '牌陣設計'],
      path: '/provider/creator/cardhack'
    }
  ].filter((option) => !(isAiyaClient && option.id === 'cardhack'));

  // 添加導航處理函數
  const handleNavigation = (path: string, optionId?: string) => {
    if (optionId === 'article') {
      const enabled = Number(featureFlag?.article_enabled || 0);
      if (enabled === 0) {
        setShowNoPermission(true);
        return;
      }
    }
    console.log('導航到:', path);
    navigate(path);
  };

  const recentCreations = [
    {
      id: 1,
      type: 'video',
      title: '產品介紹影音',
      status: 'completed',
      createdAt: '2024-01-15',
      thumbnail: '🎬'
    },
    {
      id: 2,
      type: 'video-creation',
      title: '產品展示影片',
      status: 'completed',
      createdAt: '2024-01-14',
      thumbnail: '🎥'
    },
    {
      id: 3,
      type: 'audio',
      title: '品牌宣傳音頻',
      status: 'completed',
      createdAt: '2024-01-13',
      thumbnail: '🎵'
    },
    {
      id: 4,
      type: 'article',
      title: '技術分享文章',
      status: 'draft',
      createdAt: '2024-01-12',
      thumbnail: '📝'
    },
    {
      id: 5,
      type: 'video',
      title: '品牌宣傳片',
      status: 'processing',
      createdAt: '2024-01-11',
      thumbnail: '🎬'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'processing': return 'bg-blue-100 text-blue-700';
      case 'draft': return 'bg-amber-100 text-amber-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return '已完成';
      case 'processing': return '處理中';
      case 'draft': return '草稿';
      default: return '未知';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
        {isRoot && (
          <div className="max-w-6xl mx-auto px-4 py-6">
            {/* 移除 Header，直接顯示功能區域 */}
            


            {/* Creation Options */}
            <div className="mb-8">
              <div className="grid grid-cols-2 gap-4 md:gap-8">
                {creationOptions.map((option) => (
                  <div
                    key={option.id}
                    className="bg-white rounded-2xl p-4 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-purple-500 group"
                    tabIndex={0}
                    onClick={() => handleNavigation(option.path, option.id)}
                  >
                    <div className="text-center">
                      <div className={`w-16 h-16 md:w-20 md:h-20 ${option.bgColor} rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:scale-110 transition-transform`}>
                        <option.icon size={32} className={`${option.color} md:w-10 md:h-10`} />
                      </div>
                      <h3 className="text-lg md:text-2xl font-bold text-gray-900 mb-2 md:mb-3">{option.title}</h3>
                      <p className="text-xs md:text-base text-gray-600 mb-4 md:mb-6">{option.description}</p>

                      <div className="text-left space-y-2 md:space-y-3 mb-4 md:mb-6">
                        {option.features.map((feature, index) => (
                          <div key={index} className="flex items-start gap-2 md:gap-3">
                            <CheckCircle size={16} className="text-green-500 flex-shrink-0 mt-0.5 md:w-5 md:h-5" />
                            <span className="text-xs md:text-sm text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <div className={`px-3 md:px-4 py-2 ${AI_COLORS.bg} ${AI_COLORS.text} rounded-lg text-sm md:text-base font-semibold group-hover:shadow-md transition-shadow`}>
                        開始創作
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        <NoPermissionDialog
          isOpen={showNoPermission}
          onClose={() => setShowNoPermission(false)}
          onSubmitSerial={async (s) => {
            await handlePermissionRedeem(s, {
              checkAuth,
              onSuccess: () => setShowNoPermission(false)
            });
          }}
        />
        <Outlet />
      </div>
  );
};

export default AICreator; 