import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { IClient } from 'app/api/IClient';
import { CommonComponentService } from 'app/views/components/common-component.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {
  clients: IClient[] = [];

  get clientsNotConfigured(): IClient[] {
    if (this.clients && this.clients.length) {
      // return this.clients.filter(comp => !comp.configured);
    }
    return this.clients;
  }
  get configuredClients(): IClient[] {
    if (this.clients && this.clients.length) {
      // return this.clients.filter(comp => comp.configured);
    }
    return [];
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private CommonComponent: CommonComponentService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
      }
    });
  }

  transferLeft() {
    this.clients.filter((c: any) => c.isSelected).forEach((c: any) => {
      c.configured = false;
      delete c.isSelected;
    });
  }

  transferRight() {
    this.clients.filter((c: any) => c.isSelected).forEach((c: any) => {
      c.configured = true;
      delete c.isSelected;
    });
  }

  save(model: IClient, isValid: boolean) {
  }
}
