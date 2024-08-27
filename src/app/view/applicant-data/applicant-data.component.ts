import { Component, OnInit } from '@angular/core';
import { DataService } from '../../server/data.service';
import { ApplicantData } from '../../model/applicant-data';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-applicant-data',
  standalone: true,
  imports: [
    HttpClientModule,
    TableModule,
    NgIf,
    FormsModule,
    NgForOf
  ],
  providers: [DataService],
  templateUrl: './applicant-data.component.html',
  styleUrls: ['./applicant-data.component.css']
})
export class ApplicantDataComponent implements OnInit {
  data: ApplicantData[] = [];
  selectedItem: any = null;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getData().subscribe((data: ApplicantData[]) => {
      this.data = data;
    });
  }

  showAllInfo(item: any) {
    const fieldData = JSON.parse(item.prog_lan);
    const valueMap: { [key: number]: string } = {
      0: 'Bilmiyor',
      1: 'Çok Kötü',
      2: 'Kötü',
      3: 'Ortalama',
      4: 'İyi',
      5: 'Çok İyi'
    };
    const formattedFieldData = Object.entries(fieldData)
        .map(([key, value]) => {
          const newValue = valueMap[value as number] || value;
          return `${key}: ${newValue}`;
        });

    const internType = JSON.parse(item.intern_type);
    const formattedInternType = Object.entries(internType).map(([key, value]) => `${value}`);

    this.selectedItem = {
      uni: item.uni,
      degree: item.degree,
      year: item.year,
      linkedin: item.linkedin,
      github: item.github,
      start_date: this.cleanStartDate(item.start_date),
      prog_lan: formattedFieldData,
      intern_type: formattedInternType
    };
  }

  closePopup() {
    this.selectedItem = null;
  }

  cleanStartDate(startDate: string): string {
    return startDate.replace(/[\[\]{}"]/g, '').replace(/,/g, '<br>');
  }

  goToCv(cvname: string) {
    window.open(cvname, '_blank');
  }

  goToLinkedin(linkedin: string) {
    window.open(linkedin, '_blank');
  }

  goToGithub(github: string) {
    window.open(github, '_blank');
  }
}