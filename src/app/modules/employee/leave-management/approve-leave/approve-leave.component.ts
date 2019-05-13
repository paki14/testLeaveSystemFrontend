import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";
import { LeaveRequest } from "src/app/models/leave-management/leave-request";
import { LeaveRequestService } from "src/app/services/leave-management/leave-request.service";
import { InteractionService } from "src/app/services/interaction.service";

@Component({
  selector: "app-approve-leave",
  templateUrl: "./approve-leave.component.html",
  styleUrls: ["./approve-leave.component.css"]
})
export class ApproveLeaveComponent implements OnInit {
  displayedColumns: string[] = [
    "name",
    "startdate",
    "enddate",
    "numberofdays",
    "type",
    "reason",
    // "attachment",
    "accept/reject"
  ];

  leave: LeaveRequest[];
  dataSource = new MatTableDataSource<any>(this.leave);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private leaveRequestService: LeaveRequestService,
    private interactionService: InteractionService
  ) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<any>(this.leave);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getAllLeaveRequest();
    // this.getSuccessMsg();
    this.getSuccessMessage() 
  }
  // getSuccessMsg() {
  //   throw new Error("Method not implemented.");
  // }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAllLeaveRequest() {
    this.leaveRequestService.getPendingLeaveRequest().subscribe(data => {
      this.leave = data;
      this.dataSource = new MatTableDataSource<any>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  sentLeaveId(leaveId) {
    this.interactionService.setLeaveId(leaveId);
  }

  sendUserId(user) {
    this.interactionService.sendUserId(user);
  }
  getSuccessMessage() {
    this.interactionService.msgDataSource$.subscribe(data => {
      console.log(data)
      if (data == "AcceptSuccess") {
        this.getAllLeaveRequest();
        this.responseMsg = "success";
        this.responseMsgTimeOut();
      }
      else if (data == "RejectSuccess") {
        this.getAllLeaveRequest();
        this.responseMsg = "success2";
        this.responseMsgTimeOut();
      }
    });
  }
  responseMsg: string;
  responseMsgTimeOut() {
    setTimeout(() => {
      this.responseMsg = null;
    }, 1000);
  }
}
