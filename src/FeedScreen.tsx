import { useState } from 'react';
import { SocialPostCard } from './components';
import { socialPosts } from './data';
import { PlusIcon } from './icons';

interface Props {
  onRestaurantClick: (id: string) => void;
  onCreatePost: () => void;
}

export default function FeedScreen({ onRestaurantClick, onCreatePost }: Props) {
  const tabs = ['For You', 'Following', 'Hidden Gems', 'New Spots'];
  const [activeTab, setActiveTab] = useState('For You');

  return (
    <div className="pb-28 screen-enter">
      {/* Header */}
      <div className="px-4 pt-12 pb-4 flex items-center justify-between">
        <div>
          <h1 className="font-display font-900 text-[#24221D] text-2xl">Discoveries</h1>
          <p className="text-[#8B8578] text-sm font-body mt-0.5">What Thiruvananthapuram is eating</p>
        </div>
        <button
          onClick={onCreatePost}
          className="w-11 h-11 rounded-full bg-[#FFC928] flex items-center justify-center"
          style={{ boxShadow: '0 4px 16px rgba(255,201,40,0.4)' }}
        >
          <PlusIcon size={20} className="text-[#24221D]" strokeWidth={2.5} />
        </button>
      </div>

      {/* Feed Tabs */}
      <div className="flex gap-2 px-4 overflow-x-auto pb-1 mb-5">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-display font-700 transition-all ${activeTab === tab ? 'bg-[#24221D] text-[#FFC928]' : 'bg-white text-[#8B8578]'}`}
            style={activeTab !== tab ? { boxShadow: '0 1px 4px rgba(36,34,29,0.06)' } : {}}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Posts */}
      <div className="flex flex-col gap-4 px-4">
        {socialPosts.map(post => (
          <SocialPostCard key={post.id} post={post} onRestaurantClick={onRestaurantClick} />
        ))}
      </div>

      {/* Load more nudge */}
      <div className="text-center py-8">
        <button className="text-[#FFC928] font-display font-700 text-sm">Load more discoveries ↓</button>
      </div>
    </div>
  );
}
