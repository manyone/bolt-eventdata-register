export const appendToCSV = (data: string) => {
  try {
    localStorage.setItem('registrations', 
      (localStorage.getItem('registrations') || 'First Name,Last Name,Email,Specialty,Comments\n') + data
    );
  } catch (error) {
    console.error('Error saving registration:', error);
  }
};

export const getRegistrations = () => {
  return localStorage.getItem('registrations') || '';
};

export const getRegistrationCounts = (csvData: string): { [key: string]: number } => {
  const lines = csvData.split('\n').slice(1); // Skip header
  return lines.reduce((acc: { [key: string]: number }, line) => {
    if (!line) return acc;
    const specialty = line.split(',')[3];
    acc[specialty] = (acc[specialty] || 0) + 1;
    return acc;
  }, {});
};