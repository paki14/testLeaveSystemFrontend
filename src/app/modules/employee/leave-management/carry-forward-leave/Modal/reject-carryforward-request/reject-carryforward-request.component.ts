import { Component, OnInit } from '@angular/core';
import { InteractionService } from '../../../../../../services/interaction.service';
import { TokenStorageService } from '../../../../../../services/login/token-storage.service';
import { CarryforwardLeaveRequestService } from '../../../../../../services/leave-management/carryforward-leave-request.service';
import { RejectCarryforwardData } from '../../../../../../models/leave-management/carryforward-leave-request';
import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-reject-carryforward-request',
  templateUrl: './reject-carryforward-request.component.html',
  styleUrls: ['./reject-carryforward-request.component.css']
})
export class RejectCarryforwardRequestComponent implements OnInit {

  rejectCarryforwardRequestData: RejectCarryforwardData = new RejectCarryforwardData();
  info: any;
  constructor(
    private carryforwardLeaveRequestService: CarryforwardLeaveRequestService,
    private token: TokenStorageService,
    private interactionService: InteractionService
  ) { }

  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
    this.getCarryforwardLeave();
  }

  getCarryforwardLeave() {
    this.interactionService.carryforwardRequestIdDataSource$.subscribe(data => {
      this.rejectCarryforwardRequestData.carryforwardRequestData = data;
    })
  }

  rejectCarryforwardRequestMethod() {
    console.log(this.rejectCarryforwardRequestData);
    this.carryforwardLeaveRequestService.rejectCarryforwardRequest(this.info.username, this.rejectCarryforwardRequestData).subscribe(data => {
      console.log(data);
    });
    this.getCarryforwardLeave();
    this.clear()
    this.rejectForm.get('reject_cf_reason').clearValidators();

  }
  clear(){
    this.rejectCarryforwardRequestData.reason=null;

  }
  // ..................validatation..........
  rejectForm = new FormGroup({
    reject_cf_reason: new FormControl('', Validators.compose([
      Validators.required,
      Validators.maxLength(150),
      Validators.minLength(3),
      Validators.pattern("^[a-zA-Z,.' ]*$")
    ]))
  })
  setValidate(){
    this.rejectForm.get('reject_cf_reason').setValidators([
      Validators.required,
      Validators.maxLength(150),
      Validators.minLength(3),
      Validators.pattern("^[a-zA-Z,.' ]*$")
    ])
    this.rejectForm.updateValueAndValidity();
    // *ngIf="((myForm.controls['contact_no'].touched)&& myForm.controls['contact_no'].hasError('pattern')))"
  }
}
