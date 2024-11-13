export interface EventData {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  backgroundImage: string;
  specialties: string[];
}

export interface Registration {
  firstName: string;
  lastName: string;
  email: string;
  specialty: string;
  comments: string;
}

export interface RegistrationCounts {
  [key: string]: number;
}