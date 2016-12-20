import { Title } from '@angular/platform-browser';
import { IPerson, PersonService } from '../../api/person.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-access',
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.scss']
})
export class AccessComponent implements OnInit {
  persons: IPerson[];

  constructor(private router: Router, private Person: PersonService, private titleService: Title) {
    this.titleService.setTitle('Fint | Access');
    this.persons = Person.allWithAccess();
  }

  ngOnInit() {
  }

  grant() {
    this.router.navigate(['/access/grant']);
  }

  revoke(person) {
    this.Person.revokeAccess(person);
    this.persons = this.Person.allWithAccess();
  }

  edit(person) {
    this.router.navigate(['/access/' + person.id]);
  }
}
