import React, { useState } from 'react';
import type { Registration } from '../types';

interface Props {
  specialties: string[];
  onSubmit: (data: Registration) => void;
  onCancel: () => void;
}

export default function RegistrationForm({ specialties, onSubmit, onCancel }: Props) {
  const [formData, setFormData] = useState<Registration>({
    firstName: '',
    lastName: '',
    email: '',
    specialty: specialties[0],
    comments: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      specialty: specialties[0],
      comments: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto bg-white p-6 rounded-lg shadow-xl">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">First Name</label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white text-gray-900 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
            value={formData.firstName}
            onChange={(e) => setFormData({...formData, firstName: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Last Name</label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white text-gray-900 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
            value={formData.lastName}
            onChange={(e) => setFormData({...formData, lastName: e.target.value})}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          required
          className="mt-1 block w-full rounded-md border border-gray-300 bg-white text-gray-900 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Specialty</label>
        <select
          className="mt-1 block w-full rounded-md border border-gray-300 bg-white text-gray-900 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
          value={formData.specialty}
          onChange={(e) => setFormData({...formData, specialty: e.target.value})}
        >
          {specialties.map(specialty => (
            <option key={specialty} value={specialty} className="text-gray-900">{specialty}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Comments</label>
        <textarea
          className="mt-1 block w-full rounded-md border border-gray-300 bg-white text-gray-900 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
          rows={3}
          value={formData.comments}
          onChange={(e) => setFormData({...formData, comments: e.target.value})}
        />
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
        >
          Register Now
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}