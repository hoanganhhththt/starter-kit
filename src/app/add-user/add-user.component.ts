import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ApiService } from '../core/api.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  user!: User;
  addForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService) {}

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      id: [''],
      // username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: ['', Validators.required],
    });
  }

  onSubmit() {
    console.log(this.addForm.value);

    this.apiService
      .createUser(this.addForm.value)
      // .pipe(first())
      .subscribe(
        (data) => {
          if (data) {
            alert('User Add successfully.');
            this.router.navigate(['list-user']);
          } else {
            alert('Add fail');
          }
        },
        (error) => {
          alert(error);
        }
      );
  }
}
