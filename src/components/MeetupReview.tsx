import { motion } from 'motion/react';
import { ArrowLeft, Upload, X } from 'lucide-react';
import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface MeetupReviewProps {
  meetup: {
    id: string;
    name: string;
    date: string;
    time: string;
    location: string;
    friends: Array<{ name: string; avatar: string }>;
  };
  onBack: () => void;
  onSubmit: (review: MeetupReview) => void;
}

export interface MeetupReview {
  meetupId: string;
  comment: string;
  emoji: string;
  photos: string[];
}

const emojiOptions = ['😊', '🎉', '❤️', '😂', '🔥', '👍', '🤩', '😍', '🥳', '💯', '✨', '🙌'];

const availablePhotos = [
  'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400',
  'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400',
  'https://images.unsplash.com/photo-1543007631-283050bb3e8c?w=400',
  'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=400'
];

export function MeetupReview({ meetup, onBack, onSubmit }: MeetupReviewProps) {
  const [comment, setComment] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('');
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);
  const [showImagePicker, setShowImagePicker] = useState(false);

  const handlePhotoUpload = () => {
    setShowImagePicker(true);
  };

  const handleSelectPhoto = (photoUrl: string) => {
    setUploadedPhotos([...uploadedPhotos, photoUrl]);
    setShowImagePicker(false);
  };

  const removePhoto = (index: number) => {
    setUploadedPhotos(uploadedPhotos.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    onSubmit({
      meetupId: meetup.id,
      comment,
      emoji: selectedEmoji,
      photos: uploadedPhotos
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <motion.div
        className="w-full max-w-[375px] h-[812px] bg-[#5A3D5C] shadow-2xl rounded-3xl overflow-hidden flex flex-col"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* Header */}
        <div className="px-6 pt-8 pb-4 flex-shrink-0">
          <div className="flex items-center mb-6">
            <button
              onClick={onBack}
              className="text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="flex-1 text-center text-white text-xl font-semibold pr-6">
              Leave a Review
            </h1>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 pb-6">
          {/* Event Info Card */}
          <motion.div
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-white font-semibold text-lg mb-2">{meetup.name}</h2>
            <p className="text-white/70 text-sm mb-1">{meetup.date} • {meetup.time}</p>
            <p className="text-white/70 text-sm mb-3">{meetup.location}</p>
            
            {/* Friends who attended */}
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {meetup.friends.slice(0, 4).map((friend, index) => (
                  <div
                    key={index}
                    className="w-8 h-8 rounded-full border-2 border-[#5A3D5C] overflow-hidden"
                  >
                    <ImageWithFallback
                      src={friend.avatar}
                      alt={friend.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
                {meetup.friends.length > 4 && (
                  <div className="w-8 h-8 rounded-full border-2 border-[#5A3D5C] bg-white/20 flex items-center justify-center">
                    <span className="text-white text-xs font-semibold">
                      +{meetup.friends.length - 4}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Emoji Selection */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <label className="text-white font-semibold mb-3 block">
              How was the meetup?
            </label>
            <div className="grid grid-cols-6 gap-2">
              {emojiOptions.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => setSelectedEmoji(emoji)}
                  className={`aspect-square rounded-xl flex items-center justify-center text-3xl transition-all ${
                    selectedEmoji === emoji
                      ? 'bg-[#D4F4E7] scale-110 shadow-lg'
                      : 'bg-white/10 hover:bg-white/20'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Comment Section */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label className="text-white font-semibold mb-3 block">
              Share your thoughts
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="What did you enjoy most? Any funny moments?"
              className="w-full bg-white/10 backdrop-blur-lg text-white placeholder-white/50 rounded-2xl p-4 min-h-[120px] resize-none focus:outline-none focus:ring-2 focus:ring-[#D4F4E7]"
            />
          </motion.div>

          {/* Photo Upload */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <label className="text-white font-semibold mb-3 block">
              Add photos
            </label>
            
            <div className="grid grid-cols-3 gap-3">
              {uploadedPhotos.map((photo, index) => (
                <div key={index} className="relative aspect-square rounded-xl overflow-hidden group">
                  <ImageWithFallback
                    src={photo}
                    alt={`Uploaded ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => removePhoto(index)}
                    className="absolute top-1 right-1 w-6 h-6 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                </div>
              ))}
              
              {uploadedPhotos.length < 6 && (
                <button
                  onClick={handlePhotoUpload}
                  className="aspect-square bg-white/10 hover:bg-white/20 rounded-xl flex flex-col items-center justify-center gap-2 transition-colors"
                >
                  <Upload className="w-6 h-6 text-white/70" />
                  <span className="text-white/70 text-xs">Upload</span>
                </button>
              )}
            </div>
          </motion.div>

          {/* Submit Button */}
          <motion.button
            onClick={handleSubmit}
            disabled={!comment.trim() || !selectedEmoji}
            className="w-full bg-[#F59E0B] text-white rounded-2xl py-4 font-semibold hover:bg-[#E89450] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Submit Review
          </motion.button>
        </div>
      </motion.div>

      {/* Image Picker Modal */}
      {showImagePicker && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <motion.div
            className="bg-[#5A3D5C] rounded-3xl p-6 max-w-sm w-full shadow-2xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <h2 className="text-white text-xl font-semibold mb-4">Select a Photo</h2>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {availablePhotos.map((photoUrl, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectPhoto(photoUrl)}
                  className="relative aspect-square rounded-xl overflow-hidden hover:ring-4 hover:ring-[#D4F4E7] transition-all"
                >
                  <ImageWithFallback
                    src={photoUrl}
                    alt={`Photo option ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowImagePicker(false)}
              className="w-full bg-white/10 text-white rounded-2xl py-3 font-semibold hover:bg-white/20 transition-all"
            >
              Cancel
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}