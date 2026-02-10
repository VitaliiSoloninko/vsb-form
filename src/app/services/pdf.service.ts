import { Injectable } from '@angular/core';
import { Content, TDocumentDefinitions } from 'pdfmake/interfaces';
import { ApplicationFormData } from '../models/form-data.models';

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  // Translations for PDF headers
  private translations: { [key: string]: any } = {
    en: {
      title: 'Application Form',
      personal: 'Personal Information',
      contact: 'Contact & Address',
      education: 'Education',
      languages: 'Language Skills',
      workExperience: 'Work Experience',
      firstName: 'First Name',
      lastName: 'Last Name',
      dateOfBirth: 'Date of Birth',
      placeOfBirth: 'Place of Birth',
      nationality: 'Nationality',
      maritalStatus: 'Marital Status',
      phone: 'Phone',
      email: 'Email',
      address: 'Address',
      schoolType: 'School Type',
      schoolPeriod: 'School Period',
      higherEducation: 'Higher Education',
      higherEducationPeriod: 'Higher Education Period',
      germanLevel: 'German Level',
      englishLevel: 'English Level',
      additionalLanguages: 'Additional Languages',
      position: 'Position',
      period: 'Period',
      responsibilities: 'Responsibilities',
      maritalStatuses: {
        single: 'Single',
        married: 'Married',
        divorced: 'Divorced',
      },
      schoolTypes: {
        '9classes': '9 Classes',
        '10classes': '10 Classes',
        gymnasium: 'Gymnasium',
      },
      higherEducationTypes: {
        none: 'None',
        bachelor: 'Bachelor',
        master: 'Master',
      },
    },
    de: {
      title: 'Bewerbungsformular',
      personal: 'Persönliche Informationen',
      contact: 'Kontakt & Adresse',
      education: 'Bildung',
      languages: 'Sprachkenntnisse',
      workExperience: 'Berufserfahrung',
      firstName: 'Vorname',
      lastName: 'Nachname',
      dateOfBirth: 'Geburtsdatum',
      placeOfBirth: 'Geburtsort',
      nationality: 'Nationalität',
      maritalStatus: 'Familienstand',
      phone: 'Telefon',
      email: 'E-Mail',
      address: 'Adresse',
      schoolType: 'Schultyp',
      schoolPeriod: 'Schulzeit',
      higherEducation: 'Hochschulbildung',
      higherEducationPeriod: 'Hochschulzeit',
      germanLevel: 'Deutschkenntnisse',
      englishLevel: 'Englischkenntnisse',
      additionalLanguages: 'Weitere Sprachen',
      position: 'Position',
      period: 'Zeitraum',
      responsibilities: 'Aufgaben',
      maritalStatuses: {
        single: 'Ledig',
        married: 'Verheiratet',
        divorced: 'Geschieden',
      },
      schoolTypes: {
        '9classes': '9 Klassen',
        '10classes': '10 Klassen',
        gymnasium: 'Gymnasium',
      },
      higherEducationTypes: {
        none: 'Keine',
        bachelor: 'Bachelor',
        master: 'Master',
      },
    },
    ru: {
      title: 'Анкета',
      personal: 'Личная информация',
      contact: 'Контакты и адрес',
      education: 'Образование',
      languages: 'Языковые навыки',
      workExperience: 'Опыт работы',
      firstName: 'Имя',
      lastName: 'Фамилия',
      dateOfBirth: 'Дата рождения',
      placeOfBirth: 'Место рождения',
      nationality: 'Национальность',
      maritalStatus: 'Семейное положение',
      phone: 'Телефон',
      email: 'Email',
      address: 'Адрес',
      schoolType: 'Тип школы',
      schoolPeriod: 'Период обучения в школе',
      higherEducation: 'Высшее образование',
      higherEducationPeriod: 'Период обучения',
      germanLevel: 'Уровень немецкого',
      englishLevel: 'Уровень английского',
      additionalLanguages: 'Дополнительные языки',
      position: 'Должность',
      period: 'Период',
      responsibilities: 'Обязанности',
      maritalStatuses: {
        single: 'Холост/Не замужем',
        married: 'Женат/Замужем',
        divorced: 'Разведен/Разведена',
      },
      schoolTypes: {
        '9classes': '9 классов',
        '10classes': '10 классов',
        gymnasium: 'Гимназия',
      },
      higherEducationTypes: {
        none: 'Нет',
        bachelor: 'Бакалавр',
        master: 'Магистр',
      },
    },
    ar: {
      title: 'استمارة التقديم',
      personal: 'المعلومات الشخصية',
      contact: 'جهات الاتصال والعنوان',
      education: 'التعليم',
      languages: 'المهارات اللغوية',
      workExperience: 'الخبرة العملية',
      firstName: 'الاسم الأول',
      lastName: 'اسم العائلة',
      dateOfBirth: 'تاريخ الميلاد',
      placeOfBirth: 'مكان الولادة',
      nationality: 'الجنسية',
      maritalStatus: 'الحالة الاجتماعية',
      phone: 'الهاتف',
      email: 'البريد الإلكتروني',
      address: 'العنوان',
      schoolType: 'نوع المدرسة',
      schoolPeriod: 'فترة الدراسة',
      higherEducation: 'التعليم العالي',
      higherEducationPeriod: 'فترة التعليم العالي',
      germanLevel: 'مستوى الألمانية',
      englishLevel: 'مستوى الإنجليزية',
      additionalLanguages: 'لغات إضافية',
      position: 'المنصب',
      period: 'الفترة',
      responsibilities: 'المسؤوليات',
      maritalStatuses: {
        single: 'أعزب',
        married: 'متزوج',
        divorced: 'مطلق',
      },
      schoolTypes: {
        '9classes': '9 صفوف',
        '10classes': '10 صفوف',
        gymnasium: 'صالة للألعاب الرياضية',
      },
      higherEducationTypes: {
        none: 'لا يوجد',
        bachelor: 'بكالوريوس',
        master: 'ماجستير',
      },
    },
    uk: {
      title: 'Анкета',
      personal: 'Особиста інформація',
      contact: 'Контакти та адреса',
      education: 'Освіта',
      languages: 'Мовні навички',
      workExperience: 'Досвід роботи',
      firstName: "Ім'я",
      lastName: 'Прізвище',
      dateOfBirth: 'Дата народження',
      placeOfBirth: 'Місце народження',
      nationality: 'Національність',
      maritalStatus: 'Сімейний стан',
      phone: 'Телефон',
      email: 'Email',
      address: 'Адреса',
      schoolType: 'Тип школи',
      schoolPeriod: 'Період навчання в школі',
      higherEducation: 'Вища освіта',
      higherEducationPeriod: 'Період навчання',
      germanLevel: 'Рівень німецької',
      englishLevel: 'Рівень англійської',
      additionalLanguages: 'Додаткові мови',
      position: 'Посада',
      period: 'Період',
      responsibilities: "Обов'язки",
      maritalStatuses: {
        single: 'Неодружений/Незаміжня',
        married: 'Одружений/Заміжня',
        divorced: 'Розлучений/Розлучена',
      },
      schoolTypes: {
        '9classes': '9 класів',
        '10classes': '10 класів',
        gymnasium: 'Гімназія',
      },
      higherEducationTypes: {
        none: 'Немає',
        bachelor: 'Бакалавр',
        master: 'Магістр',
      },
    },
  };

  async generatePDF(
    formData: ApplicationFormData,
    language: string = 'en',
  ): Promise<void> {
    // Dynamically import pdfmake and fonts
    const pdfMakeModule = await import('pdfmake/build/pdfmake');
    const pdfFontsModule = await import('pdfmake/build/vfs_fonts');

    const pdfMake = (pdfMakeModule as any).default || pdfMakeModule;
    const pdfFonts = (pdfFontsModule as any).default || pdfFontsModule;

    // Set fonts
    if (pdfFonts.pdfMake && pdfFonts.pdfMake.vfs) {
      pdfMake.vfs = pdfFonts.pdfMake.vfs;
    } else {
      pdfMake.vfs = pdfFonts;
    }

    const t = this.translations[language] || this.translations['en'];

    const docDefinition: TDocumentDefinitions = {
      pageSize: 'A4',
      pageMargins: [40, 60, 40, 60],
      info: {
        title: t.title,
        author: `${formData.personal.firstName} ${formData.personal.lastName}`,
        subject: t.title,
      },
      content: this.buildContent(formData, t),
      styles: {
        header: {
          fontSize: 22,
          bold: true,
          margin: [0, 0, 0, 20],
          color: '#3880ff',
        },
        sectionHeader: {
          fontSize: 16,
          bold: true,
          margin: [0, 15, 0, 10],
          color: '#3880ff',
        },
        label: {
          fontSize: 10,
          bold: true,
          color: '#666',
          margin: [0, 5, 0, 2],
        },
        value: {
          fontSize: 12,
          margin: [0, 0, 0, 8],
        },
        tableHeader: {
          bold: true,
          fontSize: 11,
          color: '#fff',
          fillColor: '#3880ff',
        },
      },
      defaultStyle: {
        font: 'Roboto',
      },
    };

    pdfMake
      .createPdf(docDefinition)
      .download(`${t.title}_${formData.personal.lastName}.pdf`);
  }

  private buildContent(formData: ApplicationFormData, t: any): Content[] {
    const content: Content[] = [];

    // Title
    content.push({
      text: t.title,
      style: 'header',
      alignment: 'center',
    });

    // Personal Information
    content.push({ text: t.personal, style: 'sectionHeader' });
    content.push(
      this.createInfoBlock(t.firstName, formData.personal.firstName),
    );
    content.push(this.createInfoBlock(t.lastName, formData.personal.lastName));
    content.push(
      this.createInfoBlock(t.dateOfBirth, formData.personal.dateOfBirth),
    );
    content.push(
      this.createInfoBlock(t.placeOfBirth, formData.personal.placeOfBirth),
    );
    content.push(
      this.createInfoBlock(t.nationality, formData.personal.nationality),
    );
    content.push(
      this.createInfoBlock(
        t.maritalStatus,
        t.maritalStatuses[formData.personal.maritalStatus] ||
          formData.personal.maritalStatus,
      ),
    );

    // Contact & Address
    content.push({ text: t.contact, style: 'sectionHeader' });
    content.push(this.createInfoBlock(t.phone, formData.contact.phone));
    content.push(this.createInfoBlock(t.email, formData.contact.email));
    content.push(
      this.createInfoBlock(
        t.address,
        `${formData.contact.street} ${formData.contact.houseNumber}, ${formData.contact.postalCode} ${formData.contact.city}`,
      ),
    );

    // Language Skills
    content.push({ text: t.languages, style: 'sectionHeader' });
    content.push(
      this.createInfoBlock(t.germanLevel, formData.languages.germanLevel),
    );
    content.push(
      this.createInfoBlock(t.englishLevel, formData.languages.englishLevel),
    );
    if (formData.languages.additionalLanguages) {
      content.push(
        this.createInfoBlock(
          t.additionalLanguages,
          formData.languages.additionalLanguages,
        ),
      );
    }

    // Education
    content.push({ text: t.education, style: 'sectionHeader' });
    content.push(
      this.createInfoBlock(
        t.schoolType,
        t.schoolTypes[formData.education.schoolType] ||
          formData.education.schoolType,
      ),
    );
    content.push(
      this.createInfoBlock(
        t.schoolPeriod,
        `${this.formatDate(formData.education.schoolStart)} - ${this.formatDate(formData.education.schoolEnd)}`,
      ),
    );

    if (
      formData.education.higherEducation &&
      formData.education.higherEducation !== 'none'
    ) {
      content.push(
        this.createInfoBlock(
          t.higherEducation,
          t.higherEducationTypes[formData.education.higherEducation] ||
            formData.education.higherEducation,
        ),
      );
      content.push(
        this.createInfoBlock(
          t.higherEducationPeriod,
          `${this.formatDate(formData.education.higherEducationStart)} - ${this.formatDate(formData.education.higherEducationEnd)}`,
        ),
      );
    }

    // Work Experience
    if (formData.workExperience && formData.workExperience.length > 0) {
      content.push({ text: t.workExperience, style: 'sectionHeader' });

      formData.workExperience.forEach((work, index) => {
        content.push({
          text: `${index + 1}. ${work.position}`,
          bold: true,
          fontSize: 12,
          margin: [0, 10, 0, 5],
        });
        content.push(
          this.createInfoBlock(
            t.period,
            `${this.formatDate(work.start)} - ${this.formatDate(work.end)}`,
          ),
        );
        content.push(
          this.createInfoBlock(t.responsibilities, work.responsibilities),
        );
      });
    }

    // Footer with date
    content.push({
      text: `\n\n${new Date().toLocaleDateString()}`,
      alignment: 'right',
      fontSize: 10,
      color: '#666',
      margin: [0, 20, 0, 0],
    });

    return content;
  }

  private createInfoBlock(label: string, value: string): Content {
    return {
      columns: [
        {
          width: '30%',
          text: label,
          style: 'label',
        },
        {
          width: '70%',
          text: value || '-',
          style: 'value',
        },
      ],
    };
  }

  private formatDate(dateString: string): string {
    if (!dateString) return '';
    const [year, month] = dateString.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  }
}
