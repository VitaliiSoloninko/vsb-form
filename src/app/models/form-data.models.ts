export interface PersonalData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  placeOfBirth: string;
  nationality: string;
  maritalStatus: string;
}

export interface ContactData {
  phone: string;
  email: string;
  street: string;
  houseNumber: string;
  postalCode: string;
  city: string;
}

export interface EducationData {
  schoolType: string;
  schoolStartMonth: string;
  schoolStartYear: string;
  schoolEndMonth: string;
  schoolEndYear: string;
  higherEducation: string;
  higherEducationStartMonth: string;
  higherEducationStartYear: string;
  higherEducationEndMonth: string;
  higherEducationEndYear: string;
}

export interface LanguagesData {
  germanLevel: string;
  englishLevel: string;
  additionalLanguages: string;
}

export interface WorkExperience {
  startMonth: string;
  startYear: string;
  endMonth: string;
  endYear: string;
  position: string;
  responsibilities: string;
}

export interface ApplicationFormData {
  personal: PersonalData;
  contact: ContactData;
  education: EducationData;
  languages: LanguagesData;
  workExperience: WorkExperience[];
}
