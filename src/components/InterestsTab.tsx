import { Plus, X, Search } from 'lucide-react';
import { useState } from 'react';

interface Interest {
  id: string;
  name: string;
  color: string;
}

interface InterestsTabProps {
  userName?: string; // If provided, shows this user's name and makes read-only
  isReadOnly?: boolean; // If true, can't add/remove interests
}

// Available interests to choose from
const availableInterests: Interest[] = [
  { id: '1', name: 'Coffee', color: 'bg-[#D4F4E7]/30 text-white border-[#D4F4E7]/50' },
  { id: '2', name: 'Hiking', color: 'bg-[#D4F4E7]/30 text-white border-[#D4F4E7]/50' },
  { id: '3', name: 'Board Games', color: 'bg-[#D4F4E7]/30 text-white border-[#D4F4E7]/50' },
  { id: '4', name: 'Movies', color: 'bg-[#D4F4E7]/30 text-white border-[#D4F4E7]/50' },
  { id: '5', name: 'Food Tours', color: 'bg-[#D4F4E7]/30 text-white border-[#D4F4E7]/50' },
  { id: '6', name: 'Photography', color: 'bg-[#D4F4E7]/30 text-white border-[#D4F4E7]/50' },
  { id: '7', name: 'Live Music', color: 'bg-[#D4F4E7]/30 text-white border-[#D4F4E7]/50' },
  { id: '8', name: 'Brunch', color: 'bg-[#D4F4E7]/30 text-white border-[#D4F4E7]/50' },
  { id: '9', name: 'Art Galleries', color: 'bg-[#D4F4E7]/30 text-white border-[#D4F4E7]/50' },
  { id: '10', name: 'Fitness', color: 'bg-[#D4F4E7]/30 text-white border-[#D4F4E7]/50' },
  { id: '11', name: 'Cooking', color: 'bg-[#D4F4E7]/30 text-white border-[#D4F4E7]/50' },
  { id: '12', name: 'Trivia Nights', color: 'bg-[#D4F4E7]/30 text-white border-[#D4F4E7]/50' },
  { id: '13', name: 'Running', color: 'bg-[#D4F4E7]/30 text-white border-[#D4F4E7]/50' },
  { id: '14', name: 'Reading', color: 'bg-[#D4F4E7]/30 text-white border-[#D4F4E7]/50' },
  { id: '15', name: 'Yoga', color: 'bg-[#D4F4E7]/30 text-white border-[#D4F4E7]/50' },
  { id: '16', name: 'Gaming', color: 'bg-[#D4F4E7]/30 text-white border-[#D4F4E7]/50' },
  { id: '17', name: 'Dancing', color: 'bg-[#D4F4E7]/30 text-white border-[#D4F4E7]/50' },
  { id: '18', name: 'Cycling', color: 'bg-[#D4F4E7]/30 text-white border-[#D4F4E7]/50' },
  { id: '19', name: 'Wine Tasting', color: 'bg-[#D4F4E7]/30 text-white border-[#D4F4E7]/50' },
  { id: '20', name: 'Rock Climbing', color: 'bg-[#D4F4E7]/30 text-white border-[#D4F4E7]/50' },
  { id: '21', name: 'Painting', color: 'bg-[#D4F4E7]/30 text-white border-[#D4F4E7]/50' },
  { id: '22', name: 'Swimming', color: 'bg-[#D4F4E7]/30 text-white border-[#D4F4E7]/50' },
  { id: '23', name: 'Karaoke', color: 'bg-[#D4F4E7]/30 text-white border-[#D4F4E7]/50' },
  { id: '24', name: 'Camping', color: 'bg-[#D4F4E7]/30 text-white border-[#D4F4E7]/50' },
  { id: '25', name: 'Theater', color: 'bg-[#D4F4E7]/30 text-white border-[#D4F4E7]/50' },
];

export function InterestsTab({ userName, isReadOnly }: InterestsTabProps) {
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [userInterests, setUserInterests] = useState<Interest[]>([
    { id: '1', name: 'Coffee', color: 'bg-[#D4F4E7]/30 text-white border-[#D4F4E7]/50' },
    { id: '2', name: 'Hiking', color: 'bg-[#D4F4E7]/30 text-white border-[#D4F4E7]/50' },
    { id: '3', name: 'Board Games', color: 'bg-[#D4F4E7]/30 text-white border-[#D4F4E7]/50' },
    { id: '4', name: 'Movies', color: 'bg-[#D4F4E7]/30 text-white border-[#D4F4E7]/50' },
    { id: '5', name: 'Food Tours', color: 'bg-[#D4F4E7]/30 text-white border-[#D4F4E7]/50' },
    { id: '6', name: 'Photography', color: 'bg-[#D4F4E7]/30 text-white border-[#D4F4E7]/50' },
    { id: '7', name: 'Live Music', color: 'bg-[#D4F4E7]/30 text-white border-[#D4F4E7]/50' },
    { id: '8', name: 'Brunch', color: 'bg-[#D4F4E7]/30 text-white border-[#D4F4E7]/50' },
    { id: '9', name: 'Art Galleries', color: 'bg-[#D4F4E7]/30 text-white border-[#D4F4E7]/50' },
    { id: '10', name: 'Fitness', color: 'bg-[#D4F4E7]/30 text-white border-[#D4F4E7]/50' },
    { id: '11', name: 'Cooking', color: 'bg-[#D4F4E7]/30 text-white border-[#D4F4E7]/50' },
    { id: '12', name: 'Trivia Nights', color: 'bg-[#D4F4E7]/30 text-white border-[#D4F4E7]/50' },
  ]);

  const displayName = userName ? userName.split(' ')[0] : 'your';
  const possessiveName = userName ? `${userName.split(' ')[0]}'s` : 'your';

  // Filter available interests based on search query and exclude already selected ones
  const filteredInterests = availableInterests.filter(interest => {
    const matchesSearch = interest.name.toLowerCase().includes(searchQuery.toLowerCase());
    const notAlreadyAdded = !userInterests.some(ui => ui.id === interest.id);
    return matchesSearch && notAlreadyAdded;
  });

  const handleAddInterest = (interest: Interest) => {
    setUserInterests([...userInterests, interest]);
    setSearchQuery('');
    setShowModal(false);
  };

  const handleRemoveInterest = (interestId: string) => {
    if (!isReadOnly) {
      setUserInterests(userInterests.filter(i => i.id !== interestId));
    }
  };

  return (
    <>
      <div className="p-4">
        {!isReadOnly && (
          <div className="mb-6">
            <p className="text-xs text-white/60 mb-4">
              Add your interests to help suggest future meetups with friends who share similar hobbies.
            </p>
            <button 
              onClick={() => setShowModal(true)}
              className="w-full bg-[#F59E0B] hover:bg-[#E89450] text-white rounded-lg py-2.5 text-sm font-medium flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg"
            >
              <Plus className="w-4 h-4" />
              Add New Interest
            </button>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {userInterests.map((interest) => (
            <div
              key={interest.id}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border ${interest.color} ${isReadOnly ? '' : 'cursor-pointer transition-all hover:scale-105 hover:opacity-75'}`}
              onClick={() => !isReadOnly && handleRemoveInterest(interest.id)}
            >
              {interest.name}
            </div>
          ))}
        </div>

        {!isReadOnly && (
          <div className="mt-8 bg-white/10 rounded-lg p-4 border border-white/20">
            <h3 className="font-semibold text-white mb-2 text-sm">💡 Match Suggestions</h3>
            <p className="text-xs text-white/70 mb-3">
              Based on {possessiveName} interests, you have great matches with:
            </p>
            <div className="space-y-2">
              <div className="flex items-center justify-between bg-white/5 rounded-lg p-3 border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 ring-2 ring-[#F59E0B]/50">
                    <img 
                      src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMGZhY2V8ZW58MXx8fHwxNzY4NjY0ODU5fDA&ixlib=rb-4.1.0&q=80&w=1080" 
                      alt="Alex Chen"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-sm text-white">Alex Chen</p>
                    <p className="text-[10px] text-white/60">6 shared interests</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between bg-white/5 rounded-lg p-3 border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 ring-2 ring-[#D4F4E7]/50">
                    <img 
                      src="https://images.unsplash.com/photo-1484863137850-59afcfe05386?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBzbWlsaW5nfGVufDF8fHx8MTc2ODc1Nzc4Nnww&ixlib=rb-4.1.0&q=80&w=1080" 
                      alt="Riley Morgan"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-sm text-white">Riley Morgan</p>
                    <p className="text-[10px] text-white/60">5 shared interests</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Interest Modal */}
      {showModal && (
        <div className="absolute inset-0 bg-black/50 z-50 flex items-end rounded-3xl overflow-hidden">
          <div className="bg-[#5A3D5C] w-full max-h-[80%] rounded-t-3xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#5A3D5C] to-[#7A5D7C] p-6 text-white relative border-b border-white/10">
              <button
                onClick={() => {
                  setShowModal(false);
                  setSearchQuery('');
                }}
                className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-2xl font-bold mb-2">Add Interest</h2>
              <p className="text-white/70 text-sm">Search and select your interests</p>
            </div>

            {/* Search Bar */}
            <div className="p-4 border-b border-white/10">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#D4F4E7]/70" />
                <input
                  type="text"
                  placeholder="Search interests..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-white/20 bg-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#D4F4E7] focus:border-transparent"
                  autoFocus
                />
              </div>
            </div>

            {/* Content - Filtered Interests */}
            <div className="p-4 overflow-y-auto" style={{ maxHeight: 'calc(80vh - 200px)' }}>
              <div className="space-y-2">
                {filteredInterests.map((interest) => (
                  <button
                    key={interest.id}
                    onClick={() => handleAddInterest(interest)}
                    className={`w-full text-left px-4 py-3 rounded-lg border transition-all hover:scale-102 hover:shadow-md ${interest.color}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{interest.name}</span>
                      <Plus className="w-5 h-5" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}