import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { IClient } from 'app/api/IClient';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  clients: IClient[];
  get hasClients(): boolean { return this.clients && this.clients.length > 0; }

  constructor(private router: Router) { }

  ngOnInit() {
  }

  addClient() {
    this.router.navigate(['/clients/add']);
  }
}
