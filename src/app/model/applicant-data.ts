export class ApplicantData {
  name: string;
  mail: string;
  tel_no: string;
  uni: string;
  degree: string;
  year: string;
  linkedin: string;
  github: string;
  start_date: string;
  intern_type: string;
  prog_lan: string;
  cvname: string;
  status: string;

  constructor(formData: any) {
    this.name = formData.name;
    this.mail = formData.mail;
    this.tel_no = String(formData.tel_no);
    this.uni = formData.uni;
    this.degree = formData.degree;
    this.year = formData.year;
    this.linkedin = formData.linkedin;
    this.github = formData.github;
    this.start_date = JSON.stringify(formData.start_date);
    this.intern_type = JSON.stringify(formData.intern_type);
    this.prog_lan = JSON.stringify(formData.prog_lan);
    this.cvname = formData.cvFile;
    this.status = formData.status;
  }
}
