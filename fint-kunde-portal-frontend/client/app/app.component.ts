import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  routes = [];
  constructor(private router: Router, private titleService: Title) {
    this.titleService.setTitle('Fint');
  }

  ngOnInit() {
    this.router.config
      .forEach(route => {
        if (route.path !== '') {
          this.routes.push({
            path: route.path,
            label: route.data ? route.data['label'] : '',
            icon: route.data ? route.data['icon'] : ''
          });
        }
      });
  }
}
