export type Category = {
  id: string;
  label: string; // translation key
  emoji: string;
};

export const CATEGORIES: Category[] = [
  { id: 'sports', label: 'categories.sports', emoji: '⚽' },
  { id: 'tech', label: 'categories.tech', emoji: '💻' },
  { id: 'creative', label: 'categories.creative', emoji: '🎨' },
  { id: 'house', label: 'categories.house', emoji: '🏠' },
  { id: 'tools', label: 'categories.tools', emoji: '🔧' },
  { id: 'music', label: 'categories.music', emoji: '🎵' },
  { id: 'outdoor', label: 'categories.outdoor', emoji: '🌲' },
  { id: 'fitness', label: 'categories.fitness', emoji: '💪' },
  { id: 'gaming', label: 'categories.gaming', emoji: '🎮' },
  { id: 'party', label: 'categories.party', emoji: '🎉' },
  { id: 'camping', label: 'categories.camping', emoji: '⛺' },
  { id: 'photography', label: 'categories.photography', emoji: '📸' },
];

export type Condition = {
  id: string;
  label: string; // translation key
  emoji: string;
};

export const CONDITIONS: Condition[] = [
  { id: 'new', label: 'conditions.new', emoji: '🆕' },
  { id: 'like_new', label: 'conditions.like_new', emoji: '✨' },
  { id: 'good', label: 'conditions.good', emoji: '👍' },
  { id: 'fair', label: 'conditions.fair', emoji: '👌' },
  { id: 'poor', label: 'conditions.poor', emoji: '🔻' },
]; 