import { Component, OnInit } from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {PatientVo} from "../../../../controller/model/Patient.model";
import {RdvVo} from "../../../../controller/model/Rdv.model";
import {PatientService} from "../../../../controller/service/Patient.service";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {RoleService} from "../../../../controller/service/role.service";
import {RdvService} from "../../../../controller/service/Rdv.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-rdv-view',
  templateUrl: './rdv-view.component.html',
  styleUrls: ['./rdv-view.component.scss']
})
export class RdvViewComponent implements OnInit {

    constructor(private datePipe: DatePipe, private rdvService: RdvService, private roleService: RoleService,
                private messageService: MessageService, private router: Router, private patientService: PatientService) {
    }

    ngOnInit(): void {
        this.selectedPatient = new PatientVo();
        this.patientService.findAll().subscribe((data) => this.patients = data);
    }

    hideViewDialog() {
        this.viewRdvDialog = false;
    }

    // getters and setters

    get rdvs(): Array<RdvVo> {
        return this.rdvService.rdvs;
    }

    set rdvs(value: Array<RdvVo>) {
        this.rdvService.rdvs = value;
    }

    get selectedRdv(): RdvVo {
        return this.rdvService.selectedRdv;
    }

    set selectedRdv(value: RdvVo) {
        this.rdvService.selectedRdv = value;
    }

    get viewRdvDialog(): boolean {
        return this.rdvService.viewRdvDialog;

    }

    set viewRdvDialog(value: boolean) {
        this.rdvService.viewRdvDialog = value;
    }

    get selectedPatient(): PatientVo {
        return this.patientService.selectedPatient;
    }

    set selectedPatient(value: PatientVo) {
        this.patientService.selectedPatient = value;
    }

    get patients(): Array<PatientVo> {
        return this.patientService.patients;
    }

    set patients(value: Array<PatientVo>) {
        this.patientService.patients = value;
    }

    get editPatientDialog(): boolean {
        return this.patientService.editPatientDialog;
    }

    set editPatientDialog(value: boolean) {
        this.patientService.editPatientDialog = value;
    }

    get dateFormat() {
        return environment.dateFormatView;
    }

    get dateFormatColumn() {
        return environment.dateFormatList;
    }

}
