import { Component, OnInit } from '@angular/core';
import { DataService } from '../../server/data.service';
import { HttpClientModule } from "@angular/common/http";
import { NgForOf } from "@angular/common";
import { PrimeTemplate } from "primeng/api";
import { TableModule } from "primeng/table";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-inbox',
  standalone: true,
  imports: [
    HttpClientModule,
    NgForOf,
    PrimeTemplate,
    TableModule,
    FormsModule
  ],
  providers: [DataService, HttpClientModule],
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {
  sentEmails: any[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.loadEmails();
  }

  loadEmails() {
    this.dataService.getSentEmails().subscribe((emails: any[]) => {
      this.sentEmails = emails;
    });
  }

  deleteSelectedEmails() {
    const selectedRecipients = this.sentEmails
      .filter(email => email.selected)
      .map(email => email.recipient);

    this.dataService.deleteEmails(selectedRecipients).subscribe(() => {
      this.loadEmails();
    });
  }
}
