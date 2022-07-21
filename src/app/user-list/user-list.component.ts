import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';
import {MatDialog} from '@angular/material/dialog';
import { UserListDialogContent } from './user-list-dialog-content';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';


 @Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit,AfterViewInit {
  makeAdminForm: FormGroup;
  displayedColumns: string[] = ['#','nom','prenom','username', 'email', 'sexe', 'confirmed','actions'];
  dataSource: MatTableDataSource<any>;
  users:any[];
  isSuperAdmin = false;
  isLoggedIn = false;
  private roles: string[] = [];
  step=1;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('formDirective1') private formDirective1: NgForm;

  constructor(private userService: UserService,
    private tokenStorageService: TokenStorageService,
    private router:Router,
    public dialog:MatDialog,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    ) {

    this.dataSource = new MatTableDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      if (this.roles.includes('ROLE_ADMIN')) {
        this.isSuperAdmin=true;
      }
    }

    this.makeAdminForm = this.formBuilder.group({
      selectUser: [null, Validators.required],
    });

    this.getUsers();
  }

  setStep(index: number) {
    this.step = index;
  }

  openSuccessSnackBar(message: string) {
    this._snackBar.open(message, '', {
       duration: 5000,
       horizontalPosition:'center',
       verticalPosition:'bottom',
       panelClass:["snackbar-success-style"]
    });
  }

  submitMakeAdmin() {
    if (!this.makeAdminForm.valid) {
      return;
    }
    this.userService.makeAdmin(this.makeAdminForm.value.selectUser).subscribe(
    data => {
      this.openSuccessSnackBar(data.message);
      this.getUsers();
    });
    this.formDirective1.resetForm();
    this.makeAdminForm.reset();
    this.step=1;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(userid) {
    const dialogRef = this.dialog.open(UserListDialogContent);
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteUser(userid);
      }
    });
  }

  getUsers() {
  this.userService.getUserList().subscribe((data: any) => {
    this.users=data;
    this.dataSource.data = data;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    return data;
    });
  }

  redirect() {
  this.router.navigate(['/homeAdmin']);
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(data => {
      this.getUsers();
    })
  }

}

