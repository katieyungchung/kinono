interface Friend {
  id: string;
  name: string;
  username: string;
  avatar: string;
}

interface FriendsTabProps {
  onFriendClick: (friend: Friend) => void;
}

const mockFriends: Friend[] = [
  {
    id: '1',
    name: 'Alex Chen',
    username: '@alexc',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMGZhY2V8ZW58MXx8fHwxNzY4NjY0ODU5fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '2',
    name: 'Riley Morgan',
    username: '@rileym',
    avatar: 'https://images.unsplash.com/photo-1484863137850-59afcfe05386?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBzbWlsaW5nfGVufDF8fHx8MTc2ODc1Nzc4Nnww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '3',
    name: 'Jordan Kim',
    username: '@jordank',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHBlcnNvbnxlbnwxfHx8fDE3Njg3NTc4MjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '4',
    name: 'Sam Taylor',
    username: '@samt',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBwb3J0cmFpdHxlbnwxfHx8fDE3Njg3NTc4NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '5',
    name: 'Casey Jones',
    username: '@caseyj',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYWNlJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzY4NzU3ODU5fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '6',
    name: 'Morgan Lee',
    username: '@morganl',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBmYWNlfGVufDF8fHx8MTc2ODc1Nzg3N3ww&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

export function FriendsTab({ onFriendClick }: FriendsTabProps) {
  return (
    <div className="grid grid-cols-2 gap-3 p-4">
      {mockFriends.map((friend) => (
        <button
          key={friend.id}
          onClick={() => onFriendClick(friend)}
          className="bg-white/10 rounded-lg p-4 flex flex-col items-center text-center hover:bg-white/15 hover:shadow-md transition-all border border-white/20"
        >
          <div className="w-16 h-16 rounded-full mb-3 overflow-hidden bg-gray-200 ring-2 ring-[#D4F4E7]/50">
            <img 
              src={friend.avatar} 
              alt={friend.name}
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="font-medium text-white text-xs">{friend.name}</h3>
          <p className="text-[10px] text-white/60">{friend.username}</p>
        </button>
      ))}
    </div>
  );
}

export type { Friend };