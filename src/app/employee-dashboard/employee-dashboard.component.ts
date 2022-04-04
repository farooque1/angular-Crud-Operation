import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup} from '@angular/forms'
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee-dash board.model';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})

export class EmployeeDashboardComponent implements OnInit {

  formvalue !:FormGroup;
  employeeModelObj : EmployeeModel = new EmployeeModel();
  employeeData !: any;
  showadd !: boolean;
  showupdate !: boolean;
  constructor(private formbuilder: FormBuilder , private api : ApiService) { }

  ngOnInit(): void {
    this.formvalue=this.formbuilder.group({
      firstname:[''],
      lastname :[''],
      email :['']
    })
    this.getAllEmployee();
  }
clickaddemployee(){
  this.formvalue.reset();
  this.showadd=true;
  this.showupdate=false;
}

postEmployeeDetails(){
  this.employeeModelObj.firstname=this.formvalue.value.firstname;
  this.employeeModelObj.lastname=this.formvalue.value.lastname;
  this.employeeModelObj.email=this.formvalue.value.email;
 
this.api.postEmployee(this.employeeModelObj)
.subscribe(res=>{
  alert("employee added successfully") 
  this.getAllEmployee();
},
err=>{
  alert("something went wrong");
})
}
getAllEmployee(){
  this.api.getEmployee()
  .subscribe(res=>{
    this.employeeData =res;
  })
}

deleteEmployee(row : any){
  if(confirm('Are you sure to delete the record ??')){
  this.api.deleteEmployee(row.id)
  .subscribe(res=>{
    this.getAllEmployee();
},
err=>{
  alert("something went wrong");
})
  }
}

onEdit(row: any){

  this.showadd=false;
  this.showupdate=true;

  this.employeeModelObj.id =row.id;
  this.formvalue.controls['firstname'].setValue(row.firstname);
  this.formvalue.controls['lastname'].setValue(row.lastname);
  this.formvalue.controls['email'].setValue(row.email);
}

updateEmployeeDetails(){
  this.employeeModelObj.firstname=this.formvalue.value.firstname;
  this.employeeModelObj.lastname=this.formvalue.value.lastname;
  this.employeeModelObj.email=this.formvalue.value.email;

  this.api.updateEmployee(this.employeeModelObj,this.employeeModelObj.id)
  .subscribe(res=>{
    alert("employee Data Update successfully")
    this.getAllEmployee();
  })
}

}
