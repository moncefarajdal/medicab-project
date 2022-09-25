import { Component, OnInit } from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {MutuelleVo} from "../../../../controller/model/Mutuelle.model";
import {SexeVo} from "../../../../controller/model/Sexe.model";
import {PatientVo} from "../../../../controller/model/Patient.model";
import {MutuelleService} from "../../../../controller/service/Mutuelle.service";
import {SexeService} from "../../../../controller/service/Sexe.service";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {RoleService} from "../../../../controller/service/role.service";
import {PatientService} from "../../../../controller/service/Patient.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-patient-view',
  templateUrl: './patient-view.component.html',
  styleUrls: ['./patient-view.component.scss']
})
export class PatientViewComponent implements OnInit {

    constructor(private datePipe: DatePipe, private patientService: PatientService, private roleService: RoleService,
                private messageService: MessageService, private router: Router, private sexeService: SexeService,
                private mutuelleService: MutuelleService) {
    }

    ngOnInit(): void {
        this.selectedSexe = new SexeVo();
        this.sexeService.findAll().subscribe((data) => this.sexes = data);
        this.selectedMutuelle = new MutuelleVo();
        this.mutuelleService.findAll().subscribe((data) => this.mutuelles = data);
    }

    hideViewDialog() {
        this.viewPatientDialog = false;
    }

    // getters and setters

    get patients(): Array<PatientVo> {
        return this.patientService.patients;
    }

    set patients(value: Array<PatientVo>) {
        this.patientService.patients = value;
    }

    get selectedPatient(): PatientVo {
        return this.patientService.selectedPatient;
    }

    set selectedPatient(value: PatientVo) {
        this.patientService.selectedPatient = value;
    }

    get viewPatientDialog(): boolean {
        return this.patientService.viewPatientDialog;

    }

    set viewPatientDialog(value: boolean) {
        this.patientService.viewPatientDialog = value;
    }

    get selectedSexe(): SexeVo {
        return this.sexeService.selectedSexe;
    }

    set selectedSexe(value: SexeVo) {
        this.sexeService.selectedSexe = value;
    }

    get sexes(): Array<SexeVo> {
        return this.sexeService.sexes;
    }

    set sexes(value: Array<SexeVo>) {
        this.sexeService.sexes = value;
    }

    get editSexeDialog(): boolean {
        return this.sexeService.editSexeDialog;
    }

    set editSexeDialog(value: boolean) {
        this.sexeService.editSexeDialog = value;
    }

    get selectedMutuelle(): MutuelleVo {
        return this.mutuelleService.selectedMutuelle;
    }

    set selectedMutuelle(value: MutuelleVo) {
        this.mutuelleService.selectedMutuelle = value;
    }

    get mutuelles(): Array<MutuelleVo> {
        return this.mutuelleService.mutuelles;
    }

    set mutuelles(value: Array<MutuelleVo>) {
        this.mutuelleService.mutuelles = value;
    }

    get editMutuelleDialog(): boolean {
        return this.mutuelleService.editMutuelleDialog;
    }

    set editMutuelleDialog(value: boolean) {
        this.mutuelleService.editMutuelleDialog = value;
    }

    get dateFormat() {
        return environment.dateFormatView;
    }

    get dateFormatColumn() {
        return environment.dateFormatList;
    }

}
