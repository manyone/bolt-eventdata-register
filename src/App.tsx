import React, { useState } from 'react';
import CountdownTimer from './components/CountdownTimer';
import RegistrationForm from './components/RegistrationForm';
import AdminPanel from './components/AdminPanel';
import type { EventData, Registration } from './types';
import { Calendar } from 'lucide-react';
import { appendToCSV } from './utils/registrationUtils';

function App() {
  const [showRegistration, setShowRegistration] = useState(false);
  const [eventData, setEventData] = useState<EventData>({
    title: "Tech Innovation Summit 2024",
    description: "Join us for an extraordinary gathering of tech visionaries and innovators. Experience cutting-edge demonstrations, engaging workshops, and unparalleled networking opportunities.",
    startDate: "2024-06-15T09:00",
    endDate: "2024-06-17T18:00",
    backgroundImage: "https://images.unsplash.com/photo-1492171983775-a51717616c0d?auto=format&fit=crop&q=80",
    specialties: ["Technology", "Healthcare", "Education", "Business", "Arts", "Other"]
  });

  const handleRegistration = (data: Registration) => {
    const csvData = `${data.firstName},${data.lastName},${data.email},${data.specialty},"${data.comments}"\n`;
    appendToCSV(csvData);
    setShowRegistration(false);
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${eventData.backgroundImage})` }}
    >
      <div className="min-h-screen bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-5xl font-bold mb-6">{eventData.title}</h1>
            <p className="text-xl mb-8">{eventData.description}</p>

            <div className="flex items-center justify-center gap-4 mb-8 text-lg">
              <Calendar className="w-6 h-6" />
              <span>{new Date(eventData.startDate).toLocaleDateString()} - {new Date(eventData.endDate).toLocaleDateString()}</span>
            </div>

            <div className="bg-black/30 p-8 rounded-lg backdrop-blur-md mb-8">
              <CountdownTimer targetDate={eventData.startDate} />
            </div>

            {!showRegistration ? (
              <button
                onClick={() => setShowRegistration(true)}
                className="bg-indigo-600 text-white py-3 px-8 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors"
              >
                Register Now
              </button>
            ) : (
              <RegistrationForm 
                specialties={eventData.specialties}
                onSubmit={handleRegistration}
                onCancel={() => setShowRegistration(false)}
              />
            )}
          </div>
        </div>

        <AdminPanel 
          eventData={eventData}
          onUpdate={setEventData}
        />
      </div>
    </div>
  );
}

export default App;