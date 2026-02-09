import { motion } from 'motion/react';
import { Search, Sparkles, Mail, MessageSquare, X, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { KinonoLogo } from './KinonoLogo';
import { OnboardingProgressBar } from './OnboardingProgressBar';

interface OnboardingAddFriendsProps {
  currentStep: number;
  totalSteps: number;
  onStepClick: (step: number) => void;
  onContinue: () => void;
  onSkip: () => void;
}

// Mock data for contacts on Kinono
const mockContacts = [
  { id: 1, name: 'Sarah Chen', username: '@sarahc', avatar: '👩' },
  { id: 2, name: 'Mike Johnson', username: '@mikej', avatar: '👨' },
  { id: 3, name: 'Emma Wilson', username: '@emmaw', avatar: '👩‍🦰' },
  { id: 4, name: 'David Lee', username: '@davidl', avatar: '👨‍💼' },
  { id: 5, name: 'Alex Rodriguez', username: '@alexr', avatar: '🧑' },
];

// Mock data for username search
const mockUsers = [
  { id: 6, name: 'Jessica Park', username: '@jessicap', avatar: '👩‍🎨' },
  { id: 7, name: 'Ryan Smith', username: '@ryansmith', avatar: '👨‍🔧' },
  { id: 8, name: 'Lisa Brown', username: '@lisab', avatar: '👩‍💻' },
  { id: 9, name: 'Tom Anderson', username: '@toma', avatar: '👨‍🏫' },
  { id: 10, name: 'Maya Patel', username: '@mayap', avatar: '👩‍⚕️' },
];

export function OnboardingAddFriends({ currentStep, totalSteps, onStepClick, onContinue, onSkip }: OnboardingAddFriendsProps) {
  const [username, setUsername] = useState('');
  const [showContactsList, setShowContactsList] = useState(false);
  const [showInviteText, setShowInviteText] = useState(false);
  const [showInviteEmail, setShowInviteEmail] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState<Array<{id: number, name: string, username: string, avatar: string}>>([]);
  const [selectedUsers, setSelectedUsers] = useState<Array<{id: number, name: string, username: string, avatar: string}>>([]);
  const [phoneNumbers, setPhoneNumbers] = useState<string[]>([]);
  const [currentPhone, setCurrentPhone] = useState('');
  const [emails, setEmails] = useState<string[]>([]);
  const [currentEmail, setCurrentEmail] = useState('');
  const [inviteMessage] = useState(
    'Jordan is inviting you to download Kinono!'
  );

  const filteredUsers = username
    ? mockUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(username.toLowerCase()) ||
          user.username.toLowerCase().includes(username.toLowerCase())
      )
    : [];

  const handleSelectUser = (user: typeof mockUsers[0]) => {
    if (!selectedUsers.find(f => f.id === user.id)) {
      setSelectedUsers([...selectedUsers, user]);
    }
    setUsername('');
  };

  const handleRemoveUser = (id: number) => {
    setSelectedUsers(selectedUsers.filter(f => f.id !== id));
  };

  const handleRemoveContact = (id: number) => {
    setSelectedContacts(selectedContacts.filter(f => f.id !== id));
  };

  const handleSyncContacts = () => {
    setShowContactsList(true);
  };

  const handleSelectContact = (contact: typeof mockContacts[0]) => {
    if (!selectedContacts.find(f => f.id === contact.id)) {
      setSelectedContacts([...selectedContacts, contact]);
    }
  };

  const handleAddPhone = () => {
    if (currentPhone.trim()) {
      setPhoneNumbers([...phoneNumbers, currentPhone.trim()]);
      setCurrentPhone('');
    }
  };

  const handlePhoneKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddPhone();
    }
  };

  const handleRemovePhone = (index: number) => {
    setPhoneNumbers(phoneNumbers.filter((_, i) => i !== index));
  };

  const handleAddEmail = () => {
    if (currentEmail.trim()) {
      setEmails([...emails, currentEmail.trim()]);
      setCurrentEmail('');
    }
  };

  const handleEmailKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddEmail();
    }
  };

  const handleRemoveEmail = (index: number) => {
    setEmails(emails.filter((_, i) => i !== index));
  };

  // Contacts list view
  if (showContactsList) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <motion.div
          className="w-full max-w-[375px] h-[812px] bg-[#5A3D5C] shadow-2xl rounded-3xl overflow-hidden flex flex-col"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Header */}
          <div className="px-6 pt-6 pb-4 border-b border-white/10">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setShowContactsList(false)}
                className="text-white/70 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <h1 className="text-xl font-semibold text-white">Contacts on Kinono</h1>
              <button
                onClick={() => setShowContactsList(false)}
                className="text-[#F59E0B] font-semibold hover:text-[#E89450] transition-colors"
              >
                Done
              </button>
            </div>
          </div>

          {/* Contacts list */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {mockContacts.map((contact) => (
              <motion.button
                key={contact.id}
                onClick={() => handleSelectContact(contact)}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition-all mb-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="w-12 h-12 bg-[#9DE4CF] rounded-full flex items-center justify-center text-2xl">
                  {contact.avatar}
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-white font-medium">{contact.name}</h3>
                  <p className="text-white/60 text-sm">{contact.username}</p>
                </div>
                {selectedContacts.find(f => f.id === contact.id) && (
                  <div className="w-6 h-6 bg-[#9DE4CF] rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-[#5A3D5C]"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  // iMessage invite view
  if (showInviteText) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <motion.div
          className="w-full max-w-[375px] h-[812px] bg-white shadow-2xl rounded-3xl overflow-hidden flex flex-col"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* iMessage Header */}
          <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setShowInviteText(false)}
                className="text-blue-500 font-medium"
              >
                Cancel
              </button>
              <h1 className="font-semibold text-gray-800">New Message</h1>
              <button
                onClick={() => setShowInviteText(false)}
                className="text-blue-500 font-medium"
              >
                Send
              </button>
            </div>
          </div>

          {/* To field */}
          <div className="bg-white px-4 py-3 border-b border-gray-200">
            <div className="flex items-start gap-2">
              <span className="text-gray-500 pt-2">To:</span>
              <div className="flex-1 flex flex-wrap gap-2">
                {phoneNumbers.map((phone, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1 bg-blue-500 text-white px-3 py-1 rounded-full"
                  >
                    <span className="text-sm">{phone}</span>
                    <button onClick={() => handleRemovePhone(index)}>
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <input
                  type="tel"
                  value={currentPhone}
                  onChange={(e) => setCurrentPhone(e.target.value)}
                  onKeyDown={handlePhoneKeyDown}
                  placeholder="Enter phone number"
                  className="flex-1 outline-none text-gray-800 py-1 min-w-[150px]"
                />
              </div>
            </div>
          </div>

          {/* Message area */}
          <div className="flex-1 bg-white p-4">
            <div className="bg-blue-500 text-white rounded-3xl px-4 py-3 inline-block max-w-[80%]">
              <p className="text-sm leading-relaxed">
                {inviteMessage}
              </p>
              <p className="text-sm mt-2 underline">
                https://kinono.app/download
              </p>
            </div>
          </div>

          {/* Keyboard placeholder */}
          <div className="h-64 bg-gray-200 border-t border-gray-300"></div>
        </motion.div>
      </div>
    );
  }

  // Gmail invite view
  if (showInviteEmail) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <motion.div
          className="w-full max-w-[375px] h-[812px] bg-white shadow-2xl rounded-3xl overflow-hidden flex flex-col"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Gmail Header */}
          <div className="bg-white px-4 py-3 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setShowInviteEmail(false)}
                className="text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
              <h1 className="font-medium text-gray-800">Compose</h1>
              <button
                onClick={() => setShowInviteEmail(false)}
                className="bg-blue-500 text-white px-4 py-1.5 rounded-full text-sm font-medium"
              >
                Send
              </button>
            </div>
          </div>

          {/* From field */}
          <div className="bg-white px-4 py-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <span className="text-gray-500 text-sm">From:</span>
              <span className="text-gray-800 text-sm">jordan@email.com</span>
            </div>
          </div>

          {/* To field */}
          <div className="bg-white px-4 py-3 border-b border-gray-100">
            <div className="flex items-start gap-2">
              <span className="text-gray-500 text-sm pt-2">To:</span>
              <div className="flex-1 flex flex-wrap gap-2">
                {emails.map((email, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1 bg-gray-200 text-gray-800 px-3 py-1 rounded-full"
                  >
                    <span className="text-sm">{email}</span>
                    <button onClick={() => handleRemoveEmail(index)}>
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <input
                  type="email"
                  value={currentEmail}
                  onChange={(e) => setCurrentEmail(e.target.value)}
                  onKeyDown={handleEmailKeyDown}
                  placeholder="Enter email address"
                  className="flex-1 outline-none text-gray-800 py-1 min-w-[150px] text-sm"
                />
              </div>
            </div>
          </div>

          {/* Subject field */}
          <div className="bg-white px-4 py-3 border-b border-gray-100">
            <input
              type="text"
              value="Join me on Kinono!"
              readOnly
              className="w-full outline-none text-gray-800 text-sm"
            />
          </div>

          {/* Message area */}
          <div className="flex-1 bg-white p-4">
            <div className="text-gray-800 text-sm leading-relaxed">
              <p>{inviteMessage}</p>
              <p className="mt-2 text-blue-600 underline">
                https://kinono.app/download
              </p>
            </div>
          </div>

          {/* Keyboard placeholder */}
          <div className="h-64 bg-gray-200"></div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <motion.div
        className="w-full max-w-[375px] h-[812px] bg-[#5A3D5C] shadow-2xl rounded-3xl overflow-hidden flex flex-col"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Header with logo and progress */}
        <div className="px-6 pt-6 pb-3 flex-shrink-0">
          <div className="mb-4">
            <KinonoLogo />
          </div>

          {/* Progress bar */}
          <OnboardingProgressBar
            currentStep={currentStep}
            totalSteps={totalSteps}
            onStepClick={onStepClick}
          />
        </div>

        {/* Content - scrollable middle section */}
        <div className="flex-1 px-6 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-4"
          >
            <h1 className="text-2xl font-semibold text-white text-center mb-2">
              Add your friends
            </h1>
            <p className="text-white/70 text-center text-sm">
              Kinono works best with friends. Add a few to get started.
            </p>
          </motion.div>

          {/* Find friends section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/10 rounded-2xl p-4 mb-3"
          >
            <h2 className="text-white font-semibold mb-3 text-sm">
              Find friends on Kinono
            </h2>
            <button
              onClick={handleSyncContacts}
              className="w-full bg-[#F59E0B] text-white rounded-2xl py-2.5 font-semibold hover:bg-[#E89450] transition-all shadow-lg text-sm"
            >
              Sync contacts
            </button>
            
            {/* Selected contacts display */}
            {selectedContacts.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {selectedContacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="flex items-center gap-2 bg-[#9DE4CF]/20 border border-[#9DE4CF] text-white px-3 py-1.5 rounded-full"
                  >
                    <span className="text-sm">{contact.name}</span>
                    <button onClick={() => handleRemoveContact(contact.id)}>
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Search by username */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/10 rounded-2xl p-4 mb-3"
          >
            <h2 className="text-white font-semibold mb-2 text-sm">
              Already know their handle?
            </h2>
            
            {/* Selected friends display */}
            {selectedUsers.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-2">
                {selectedUsers.map((friend) => (
                  <div
                    key={friend.id}
                    className="flex items-center gap-2 bg-[#9DE4CF]/20 border border-[#9DE4CF] text-white px-3 py-1.5 rounded-full"
                  >
                    <span className="text-sm">{friend.name}</span>
                    <button onClick={() => handleRemoveUser(friend.id)}>
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Search by username"
                className="w-full bg-white/10 border border-white/20 rounded-2xl pl-10 pr-4 py-2.5 text-white text-sm placeholder-white/40 focus:outline-none focus:border-[#9DE4CF] focus:bg-white/15 transition-all"
              />
            </div>
            {filteredUsers.length > 0 && (
              <div className="mt-2 max-h-32 overflow-y-auto">
                {filteredUsers.map((user) => (
                  <button
                    key={user.id}
                    onClick={() => handleSelectUser(user)}
                    className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-white/10 transition-all mb-1"
                  >
                    <div className="w-10 h-10 bg-[#9DE4CF] rounded-full flex items-center justify-center text-xl">
                      {user.avatar}
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="text-white font-medium text-sm">{user.name}</h3>
                      <p className="text-white/60 text-xs">{user.username}</p>
                    </div>
                    {selectedUsers.find(f => f.id === user.id) && (
                      <div className="w-5 h-5 bg-[#9DE4CF] rounded-full flex items-center justify-center">
                        <svg
                          className="w-3 h-3 text-[#5A3D5C]"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="3"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Invite section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/10 rounded-2xl p-4 mb-4"
          >
            <h2 className="text-white font-semibold mb-3 text-sm">
              Invite a friend you'd actually hang out with
            </h2>

            {/* Invite buttons */}
            <div className="space-y-2">
              <button
                onClick={() => setShowInviteText(true)}
                className="w-full bg-white/10 border border-white/20 text-white rounded-2xl py-2.5 font-medium hover:bg-white/15 transition-all flex items-center justify-center gap-2 text-sm"
              >
                <MessageSquare className="w-4 h-4" />
                Invite via text
              </button>
              <button
                onClick={() => setShowInviteEmail(true)}
                className="w-full bg-white/10 border border-white/20 text-white rounded-2xl py-2.5 font-medium hover:bg-white/15 transition-all flex items-center justify-center gap-2 text-sm"
              >
                <Mail className="w-4 h-4" />
                Invite via email
              </button>
            </div>
          </motion.div>
        </div>

        {/* Bottom buttons - locked at bottom */}
        <div className="px-6 pb-6 flex-shrink-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="space-y-3"
          >
            <button
              onClick={onContinue}
              className="w-full bg-[#F59E0B] text-white rounded-2xl py-4 font-semibold hover:bg-[#E89450] transition-all shadow-lg"
            >
              Continue
            </button>
            <button
              onClick={onSkip}
              className="w-full text-white/70 hover:text-white transition-colors py-2 text-sm"
            >
              Skip for now
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}