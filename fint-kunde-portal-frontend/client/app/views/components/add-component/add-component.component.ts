import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonComponentService } from '../common-component.service';
import { ICommonComponent } from 'app/api/ICommonComponent';

@Component({
  selector: 'app-add-component',
  templateUrl: './add-component.component.html',
  styleUrls: ['./add-component.component.scss']
})
export class AddComponentComponent implements OnInit {
  components: ICommonComponent[] = [];
  get componentsNotConfigured(): ICommonComponent[] {
    return this.components;
  }
  get configuredComponents(): ICommonComponent[] {
    return this.components;
  }

  constructor(private CommonComponent: CommonComponentService, private router: Router) {
    CommonComponent.all().subscribe(result => {
      this.components = result._embedded.componentList;
    });
  }

  ngOnInit() {
  }

  save() {
    this.router.navigate(['/components']);
  }

  transferLeft() {
    // TODO: set flag for configured on component
  }

  transferRight() {
    // TODO: Remove flag for configured on component
  }
}
