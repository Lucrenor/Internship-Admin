import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PrimeTemplate } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { Status } from '../../model/status';
import { DataService } from '../../server/data.service';
import { HttpClientModule } from '@angular/common/http';
import { NgForOf, NgIf, NgStyle } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfirmationDialogComponent } from '../../service/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-status',
  standalone: true,
  imports: [
    PrimeTemplate,
    TableModule,
    HttpClientModule,
    NgStyle,
    NgIf,
    FormsModule,
    NgForOf,
    ConfirmationDialogComponent
  ],
  providers: [DataService],
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {
  data: Status[] = [];
  approvedData: Status[] = [];
  pendingData: Status[] = [];
  declinedData: Status[] = [];
  @Output() statusUpdated = new EventEmitter<Status>();
  allUsers: any[] = [];
  sentEmails: Set<string> = new Set(); // Local state to track sent emails
  isButtonDisabled: boolean = false; // State to track button cooldown

  constructor(private dataService: DataService, private dialog: MatDialog) {}

  ngOnInit() {
    this.dataService.getStatusData().subscribe((data: Status[]) => {
      this.data = data;
      this.approvedData = this.data.filter(item => item.status === 'Onaylandı');
      this.pendingData = this.data.filter(item => item.status === 'Beklemede');
      this.declinedData = this.data.filter(item => item.status === 'Reddedildi');
    });

    this.dataService.getAllUsers().subscribe((users: any[]) => {
      this.allUsers = users;
    });

    this.loadSentEmails();
  }

  loadSentEmails() {
    this.dataService.getSentEmails().subscribe((emails: any[]) => {
      emails.forEach(email => {
        this.sentEmails.add(`${email.recipient}-${email.status}`);
      });
    });
  }

  sendEmails(status: string, name: string, department: string, date: string) {
    if (this.isButtonDisabled) {
      alert('Lütfen tekrar denemeden önce bekleyiniz.');
      return;
    }

    if (this.sentEmails.has(`${name}-${status}`)) {
      alert('Bu Adaya Mail Daha Önce Gönderildi. Lütfen Mail Kutunuzu Kontrol Ediniz');
      return;
    }

    this.isButtonDisabled = true;
    this.dataService.sendEmailsToInterns({ status, name, department, date }).subscribe({
      next: (response) => {
        console.log(response);
        this.sentEmails.add(`${name}-${status}`);
        this.isButtonDisabled = false;
      },
      error: (error) => {
        if (error.status === 409) {
          alert('Bu Adaya Mail Daha Önce Gönderildi. Lütfen Mail Kutunuzu Kontrol Ediniz');
        } else {
          console.error('An error occurred:', error);
        }
        this.isButtonDisabled = false;
      }
    });

    setTimeout(() => {
      this.isButtonDisabled = false;
    }, 2000);
  }

  approveApplicant(item: Status, newStatus: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { message: `Adayın durumunu ${newStatus} yapmak istediğinize emin misiniz?` }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        item.status = newStatus;
        this.dataService.changeStatus(item).subscribe(updatedItem => {
          item.status = updatedItem.status;
          this.statusUpdated.emit(item);
          this.updateStatusLists();
          this.sendEmails(newStatus, item.name, item.department, item.date);
        });
      }
    });
  }

  declineApplicant(item: Status, newStatus: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { message: `Adayın durumunu ${newStatus} yapmak istediğinize emin misiniz?` }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        item.status = newStatus;
        this.dataService.changeStatus(item).subscribe(updatedItem => {
          item.status = updatedItem.status;
          this.statusUpdated.emit(item);
          this.updateStatusLists();
          this.sendEmails(newStatus, item.name, item.department, item.date);
        });
      }
    });
  }

  private updateStatusLists() {
    this.approvedData = this.data.filter(item => item.status === 'Onaylandı');
    this.pendingData = this.data.filter(item => item.status === 'Beklemede');
    this.declinedData = this.data.filter(item => item.status === 'Reddedildi');
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'Onaylandı':
        return '#7aee2c';
      case 'Beklemede':
        return '#e7d825';
      case 'Reddedildi':
        return '#c6453b';
      default:
        return 'black';
    }
  }

  cleanStartDate(startDate: string | null): string {
    if (!startDate) {
      return '';
    }
    return startDate.replace(/[\[\]{}"]/g, '').replace(/,/g, '<br>');
  }
}
