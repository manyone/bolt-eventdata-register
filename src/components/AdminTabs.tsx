import React from 'react';
import { Settings, Users, ListTree, FileSpreadsheet } from 'lucide-react';

interface Props {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function AdminTabs({ activeTab, onTabChange }: Props) {
  const tabs = [
    { id: 'settings', icon: Settings, label: 'Event Settings' },
    { id: 'specialties', icon: ListTree, label: 'Specialties' },
    { id: 'stats', icon: Users, label: 'Registration Stats' },
    { id: 'csv', icon: FileSpreadsheet, label: 'View CSV' }
  ];

  return (
    <div className="flex space-x-2 mb-6">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex items-center px-4 py-2 rounded-lg ${
            activeTab === tab.id
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <tab.icon className="w-4 h-4 mr-2" />
          {tab.label}
        </button>
      ))}
    </div>
  );
}