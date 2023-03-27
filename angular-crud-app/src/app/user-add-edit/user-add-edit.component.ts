import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './user-add-edit.component.html',
  styleUrls: ['./user-add-edit.component.scss'],
})
export class UserAddEditComponent implements OnInit {

  userForm: FormGroup;
  snackBar: any;

  constructor(
    private _fb: FormBuilder,
    private _userService: UserService,
    private _dialogRef: MatDialogRef<UserAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService) {

    this.userForm = this._fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(250)]),
      email: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')]),
      phone: new FormControl('', [Validators.required, Validators.pattern('^[(]?[1-9]{2}[)]?[ ]?[2-9][0-9]{3,4}[-]?[0-9]{4}$')]),
    });
  }

  ngOnInit(): void {
    this.userForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.userForm.valid) {
      if (this.data) {
        this._userService
        .updateUser(this.data.id, this.userForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('User detail updated!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._userService.addUser(this.userForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('User added successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            let message = 'An error occurred while creating the user. Please try again later.';
          if (err.status === 400) {
            message = err.error.message;
          }
          this.snackBar.open(message, 'Close', {
            duration: 2000,
          });
          },
        });
      }
    }
  }
}
