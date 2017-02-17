import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';

import { FintDialogService } from 'fint-shared-components';

import { ContactService } from './contacts.service';
import { IContact } from 'app/api/IContact';

@Component({
  selector: 'app-access',
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.scss']
})
export class AccessComponent implements OnInit {
  total: number;
  page: number;
  pages: number;
  pageSize: number;
  contacts: IContact[];
  isLoading: boolean = false;

  constructor(
    private Contacts: ContactService,
    private FintDialog: FintDialogService,
    private titleService: Title
  ) {
    this.titleService.setTitle('Tilgang | Fint');
  }

  ngOnInit() {
    this.loadContacts();
  }

  loadContacts() {
    this.isLoading = true;
    this.Contacts.all().subscribe(
      result => {
        this.isLoading = false;
        this.page = result.page;
        this.total = result.total_items;
        this.pages = result.page_count;
        this.pageSize = result.page_size;
        if (result._embedded) {
          this.contacts = result._embedded.contactList;
        }
      },
      error => this.isLoading = false
    );
  }

  revoke(person) {
    this.FintDialog.confirmDelete().afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.Contacts.revokeAccess(person).subscribe(() => {
          this.loadContacts();
        });
      }
    });
  }
}
