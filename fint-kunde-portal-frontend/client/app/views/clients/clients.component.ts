import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CommonComponentService} from 'app/views/components/common-component.service';
import {FintDialogService} from 'fint-shared-components';


import {IClient} from 'app/api/IClient';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  clients: IClient[];
  isLoading: boolean = false;

  get hasClients(): boolean {
    return this.clients && this.clients.length > 0;
  }

  constructor(private router: Router,
              private Clients: CommonComponentService,
              private FintDialog: FintDialogService,) {
  }

  ngOnInit() {
    this.loadClients();
  }

  loadClients() {
    this.isLoading = true;
    this.Clients.allClients().subscribe(
      result => {
        this.isLoading = false;
        if (result) {
          this.clients = result;
        }
      },
      error => this.isLoading = false
    );
  }

  removeClient(client) {
    this.FintDialog.confirmDelete().afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.Clients.removeClient(client).subscribe(() => {
          this.loadClients();
        });
      }
    });
  }

  addClient() {
    this.router.navigate(['/clients/add']);
  }
}
