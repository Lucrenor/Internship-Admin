import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataService } from '../../server/data.service';
import { ApplicantData } from '../../model/applicant-data';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { NgForOf, NgIf } from '@angular/common';
import { Status } from '../../model/status';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../service/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [
    HttpClientModule,
    TableModule,
    NgIf,
    FormsModule,
    NgForOf
  ],
  providers: [DataService],
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {
  @Output() statusUpdated = new EventEmitter<Status>();
  data: ApplicantData[] = [];
  filteredData: ApplicantData[] = [];
  selectedItem: any = null;
  selectedDepartment: string = '';
  selectedStartDate: string = '';
  showSelectionPopup: boolean = false;
  currentItem: ApplicantData | null = null;
  currentStatus: string = '';
  allUsers: any[] = [];
  statusData: Status[] = [];

  constructor(private dataService: DataService, public dialog: MatDialog) {}

  ngOnInit() {
    this.dataService.getData().subscribe((data: ApplicantData[]) => {
      this.data = data;
      this.filterData();
    });

    this.dataService.getStatusData().subscribe((statusData: Status[]) => {
      this.statusData = statusData;
      this.filterData();
    });

    this.dataService.getAllUsers().subscribe((users: any[]) => {
      this.allUsers = users;
    });
  }

  filterData() {
    if (this.statusData.length === 0) {
      this.filteredData = this.data;
    } else if (this.data.length && this.statusData.length) {
      this.filteredData = this.data.filter(applicant =>
        !this.statusData.some(status =>
          status.name === applicant.name &&
          status.mail === applicant.mail &&
          status.tel_no === applicant.tel_no
        )
      );
    }
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

  openSelectionPopup(item: ApplicantData, status: string) {
    this.currentItem = item;
    this.currentStatus = status;
    this.selectedDepartment = '';
    this.selectedStartDate = '';
    this.showSelectionPopup = true;
  }

  declineApplicant(item: ApplicantData, status: string) {
    this.currentItem = item;
    this.currentStatus = status;
    this.selectedDepartment = 'Reddedildi';
    this.selectedStartDate = 'Reddedildi';

    this.openConfirmationDialogForDecline();
  }

  openConfirmationDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { message: 'Adayın durumunu değiştirmek istediğinize emin misiniz?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.finalizeUpdateStatus();
      }
    });
  }

  openConfirmationDialogForDecline(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { message: 'Adayı REDDETMEK istediğinize emin misiniz?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.finalizeDeclineApplicant();
      }
    });
  }

  updateStatus() {
    if (this.currentItem) {
      const userExists = this.allUsers.some(user => user.name === this.currentItem!.name);
      if (userExists) {
        alert('The decision has already been made.');
      } else {
        if (this.selectedDepartment && this.selectedStartDate) {
          this.openConfirmationDialog();
        } else {
          alert('Lütfen Departman ve Başlangıç Tarihi seçtiğinizden Emin Olunuz.');
        }
      }
    }
  }

  finalizeUpdateStatus() {
    if (this.currentItem) {
      const updatedStatus = new Status({
        name: this.currentItem!.name!,
        mail: this.currentItem!.mail!,
        tel_no: this.currentItem!.tel_no!,
        date: this.selectedStartDate,
        department: this.selectedDepartment,
        status: this.currentStatus
      });

      this.dataService.updateStatus(updatedStatus).subscribe(response => {
        console.log('Status updated successfully', response);
        this.statusUpdated.emit(updatedStatus);
        this.allUsers.push({ name: this.currentItem!.name });
        this.showSelectionPopup = false;
        window.location.reload();
      }, error => {
        console.error('Error updating status', error);
      });
    }
  }

  finalizeDeclineApplicant() {
    if (this.currentItem) {
      const updatedStatus = new Status({
        name: this.currentItem!.name!,
        mail: this.currentItem!.mail!,
        tel_no: this.currentItem!.tel_no!,
        date: this.selectedStartDate,
        department: this.selectedDepartment,
        status: this.currentStatus
      });

      this.dataService.updateStatus(updatedStatus).subscribe(response => {
        console.log('Status updated successfully', response);
        this.statusUpdated.emit(updatedStatus);
        this.allUsers.push({ name: this.currentItem!.name });
        this.showSelectionPopup = false;
        window.location.reload();
      }, error => {
        console.error('Error updating status', error);
      });
    }
  }

  getDepartments(item: ApplicantData): string[] {
    return JSON.parse(item.intern_type);
  }

  getStartDates(item: ApplicantData): string[] {
    return JSON.parse(item.start_date);
  }
}
