import React from 'react';
import { BlogPost } from '../types';
import { X, Calendar, Clock } from 'lucide-react';

interface BlogDetailModalProps {
  post: BlogPost | null;
  onClose: () => void;
}

export const BlogDetailModal: React.FC<BlogDetailModalProps> = ({ post, onClose }) => {
  if (!post) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-neutral-950/80 backdrop-blur-xl overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl my-auto max-h-[90vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950/60 sticky top-0 z-20 backdrop-blur-md">
          <div className="flex items-center gap-3 text-xs text-neutral-400 font-mono">
            <span>{post.date}</span>
            <span aria-hidden="true">·</span>
            <span>{post.readTime}</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-12 space-y-8">
          <div>
            <div className="text-xs uppercase tracking-widest text-neutral-500 font-mono mb-3">
              {post.tags.join(' / ')}
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-100 mb-4">
              {post.title}
            </h1>
          </div>

          <div className="prose prose-invert max-w-none text-neutral-300 leading-relaxed space-y-6 text-base sm:text-lg whitespace-pre-line font-sans border-t border-neutral-800 pt-8">
            {post.content}
          </div>
        </div>
      </div>
    </div>
  );
};
