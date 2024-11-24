/* eslint-disable react/prop-types */
import React from 'react';
import { X } from 'lucide-react';
import UserCard from './UserCard';

const UsersModal = ({ isOpen, onClose, title, users, actionLabel, onAction }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="p-4 overflow-y-auto max-h-[calc(80vh-80px)]">
          {users.length > 0 ? (
            <div className="space-y-4">
              {users.map(user => (
                <UserCard
                  key={user.id}
                  user={user}
                  actionLabel={actionLabel}
                  onAction={onAction}
                />
              ))}
            </div>
          ) : (
            <div className="text-gray-400 text-center p-4">
              No users to display
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsersModal;