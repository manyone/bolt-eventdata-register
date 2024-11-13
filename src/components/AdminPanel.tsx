import React, { useState } from 'react';
import type { EventData, RegistrationCounts } from '../types';
import { Settings } from 'lucide-react';
import AdminTabs from './AdminTabs';
import { getRegistrations, getRegistrationCounts } from '../utils/registrationUtils';

interface Props {
  eventData: EventData;
  onUpdate: (data: EventData) => void;
}

export default function AdminPanel({ eventData, onUpdate }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('settings');
  const [formData, setFormData] = useState(eventData);
  const [newSpecialty, setNewSpecialty] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
    setIsOpen(false);
  };

  const handleAddSpecialty = () => {
    if (newSpecialty && !formData.specialties.includes(newSpecialty)) {
      setFormData({
        ...formData,
        specialties: [...formData.specialties, newSpecialty]
      });
      setNewSpecialty('');
    }
  };

  const handleRemoveSpecialty = (specialty: string) => {
    setFormData({
      ...formData,
      specialties: formData.specialties.filter(s => s !== specialty)
    });
  };

  const registrationCounts: RegistrationCounts = getRegistrationCounts(getRegistrations());

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-700"
      >
        <Settings className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Admin Panel</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <AdminTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {activeTab === 'settings' && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Event Title</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white text-gray-900 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white text-gray-900 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Background Image URL</label>
              <input
                type="url"
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white text-gray-900 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                value={formData.backgroundImage}
                onChange={(e) => setFormData({...formData, backgroundImage: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Start Date</label>
                <input
                  type="datetime-local"
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white text-gray-900 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                  value={formData.startDate}
                  onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">End Date</label>
                <input
                  type="datetime-local"
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white text-gray-900 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                  value={formData.endDate}
                  onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                />
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
              >
                Update Event
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {activeTab === 'specialties' && (
          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={newSpecialty}
                onChange={(e) => setNewSpecialty(e.target.value)}
                placeholder="New specialty..."
                className="flex-1 rounded-md border border-gray-300 px-3 py-2"
              />
              <button
                onClick={handleAddSpecialty}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
              >
                Add
              </button>
            </div>
            <ul className="space-y-2">
              {formData.specialties.map(specialty => (
                <li key={specialty} className="flex justify-between items-center bg-gray-50 p-3 rounded-md">
                  {specialty}
                  <button
                    onClick={() => handleRemoveSpecialty(specialty)}
                    className="text-red-600 hover:text-red-700"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Registration Statistics</h3>
            <div className="grid gap-4">
              {Object.entries(registrationCounts).map(([specialty, count]) => (
                <div key={specialty} className="flex justify-between items-center bg-gray-50 p-4 rounded-md">
                  <span className="font-medium">{specialty}</span>
                  <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full">
                    {count} registrants
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'csv' && (
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-md">
              <pre className="whitespace-pre-wrap font-mono text-sm">
                {getRegistrations()}
              </pre>
            </div>
            <button
              onClick={() => {
                const blob = new Blob([getRegistrations()], { type: 'text/csv' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'registrations.csv';
                a.click();
                window.URL.revokeObjectURL(url);
              }}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
              Download CSV
            </button>
          </div>
        )}
      </div>
    </div>
  );
}