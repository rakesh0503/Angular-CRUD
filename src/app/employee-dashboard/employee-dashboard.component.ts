import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { EmployeeModel } from './employee-dashboard.model';
import {ApiService} from '../shared/api.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.scss']
})

export class EmployeeDashboardComponent implements OnInit {

  formValue !: FormGroup;
  employeeModelObj : EmployeeModel = new EmployeeModel();
  employeedata !: any;
  showAdd !:boolean;
  showUpdate !: boolean;
  submitted = false;
  constructor(private formbuilder:FormBuilder, 
    private api :ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      firstName : ['',Validators.required],
      lastName :['',Validators.required],
      email :['',[Validators.required, Validators.email]],
      mobile:['',[Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      salary:['',Validators.required]
    })
    this.getAllEmployee();
  }

  clickAddEmployee(){
    this.formValue.reset;
    this.showAdd = true;
    this.showUpdate = false;
  }

  postEmployeeDetails(){
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobile = this.formValue.value.mobile;
    this.employeeModelObj.salary = this.formValue.value.salary;
    
    this.api.postEmployee(this.employeeModelObj)
    .subscribe(res =>{
      console.log(res);
      alert("Employee added Successfully");
      let ref = document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee()
    },
    err=>{
      alert("somthing went wrong")
    } )
  }

  getAllEmployee(){
    this.api.getEmployee()
    .subscribe(res =>{
      this.employeedata = res;
    })
  }
  
  deleteEmployee(row : any){
    this.api.deleteEmployee(row.id)
    .subscribe(res=>{
      alert("Employee deleted");
      this.getAllEmployee();
    },
    err=>{
      alert("not deleted")
    }
    
    )
  }

  onEdit(row: any){
    this.showAdd = false;
    this.showUpdate = true;
    this.employeeModelObj.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['salary'].setValue(row.salary);
    
  }

  updateEmployeeDetails(){
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobile = this.formValue.value.mobile;
    this.employeeModelObj.salary = this.formValue.value.salary;

    this.api.updateEmployee(this.employeeModelObj, this.employeeModelObj.id)
    .subscribe(res=>{
      alert("updated successfuly")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset()
      this.getAllEmployee()
    },
      err=>{
        alert("not updated")
      }
    )
  }

  onSubmit(){
    this.submitted = true
    if (this.formValue.invalid){
      return
    } 
    alert("success")
  }

  clearForm(){
    this.formValue.reset()
  }
}
