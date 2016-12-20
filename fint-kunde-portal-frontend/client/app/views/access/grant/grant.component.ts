import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IPerson, PersonService } from '../../../api/person.service';

@Component({
  selector: 'app-grant',
  templateUrl: './grant.component.html',
  styleUrls: ['./grant.component.scss']
})
export class GrantComponent implements OnInit {
  userForm: FormGroup;
  personData: IPerson;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private Persons: PersonService) {
    this.route.params.subscribe(params => {
      var persons = this.Persons.all();
      if (params['id']) {
        let index = persons.findIndex(person => person.id === +params['id']);
        if (index > -1) {
          this.personData = persons[index];
        }
      }
    });
    this.personData = this.personData || <IPerson>{};

    var EMAIL_REGEXP = "/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i";
    this.userForm = fb.group({
      id: [this.personData.id, [Validators.required/*, Validators.minLength(11), Validators.maxLength(11)*/]],
      firstName: [this.personData.firstName, [Validators.required/*, Validators.minLength(2)*/]],
      lastName: [this.personData.lastName, [Validators.required/*, Validators.minLength(2)*/]],
      email: [this.personData.email, [Validators.required]],
      phone: [this.personData.phone, [Validators.required/*, Validators.minLength(8)*/]]
    });
  }

  ngOnInit() {
  }

  save(model: IPerson) {
    this.Persons.save(model);
    this.router.navigate(['/access']);
  }

  onCancel() {
    this.router.navigate(['/access']);
  }
}
