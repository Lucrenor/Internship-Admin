export class Status {
  name: string;
  mail: string;
  tel_no: string;
  date: string;
  department: string;
  status: string;

  constructor(Status: any) {
    this.name = Status.name;
    this.mail = Status.mail;
    this.tel_no = String(Status.tel_no);
    this.date = Status.date;
    this.department = Status.department;
    this.status = Status.status;
  }
}
