export type ConnectionType = 
  | 'The Instigator'
  | 'The Curator'
  | 'The Connector'
  | 'The Spontaneous One'
  | 'The Reliable Anchor';

export interface ConnectionTypeInfo {
  type: ConnectionType;
  description: string;
}

const connectionTypeDescriptions: Record<ConnectionType, string> = {
  'The Instigator': "You're the spark. You don't overthink it, you send the invite, float the idea, and see who's in. Most plans wouldn't happen without you making the first move.",
  'The Curator': "You're all about the vibe. You know the best spots, the right timing, and who should be there. When you plan something, it's thoughtful, intentional, and always a good time.",
  'The Connector': "You bring worlds together. You love introducing people, mixing friend groups, and turning casual plans into something bigger. Hangouts with you always feel social and easy.",
  'The Spontaneous One': "You thrive on last-minute energy. A free evening turns into a plan, and a plan turns into a story. You're always down, and that makes others say yes more often.",
  'The Reliable Anchor': "You keep things grounded. People trust you to follow through, show up, and make plans actually happen. When you're involved, everyone knows it's real."
};

const connectionTypes: ConnectionType[] = [
  'The Instigator',
  'The Curator',
  'The Connector',
  'The Spontaneous One',
  'The Reliable Anchor'
];

// Hash function to consistently assign connection types based on user identifier
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

export function getConnectionType(userId: string | number): ConnectionTypeInfo {
  const hash = hashString(String(userId));
  const index = hash % connectionTypes.length;
  const type = connectionTypes[index];
  
  return {
    type,
    description: connectionTypeDescriptions[type]
  };
}
