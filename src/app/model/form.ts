export class Form {
  name: string = "";
  mail: string = "";
  tel_no: number | null = null;
  uni: string = "";
  degree: string = "";
  year: string = "";
  linkedin: string = "";
  github: string = "";
  cvFile?: string = "";
  start_date: string[] = [];
  intern_type: string[] = [];
  prog_lan = {
    java: "0" ,
    csharp: "0",
    flutter: "0",
    angular: "0",
    html: "0",
    css: "0",
    bash: "0",
    sql: "0"
  };
}
