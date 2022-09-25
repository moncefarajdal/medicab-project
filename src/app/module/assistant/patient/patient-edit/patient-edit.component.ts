import { Component, OnInit } from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {MutuelleVo} from "../../../../controller/model/Mutuelle.model";
import {SexeVo} from "../../../../controller/model/Sexe.model";
import {PatientVo} from "../../../../controller/model/Patient.model";
import {DateUtils} from "../../../../utils/DateUtils";
import {DatePipe} from "@angular/common";
import {PatientService} from "../../../../controller/service/Patient.service";
import {RoleService} from "../../../../controller/service/role.service";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {SexeService} from "../../../../controller/service/Sexe.service";
import {MutuelleService} from "../../../../controller/service/Mutuelle.service";
import {SourceService} from "../../../../controller/service/Source.service";
import {SourceVo} from "../../../../controller/model/Source.model";

@Component({
  selector: 'app-patient-edit',
  templateUrl: './patient-edit.component.html',
  styleUrls: ['./patient-edit.component.scss']
})
export class PatientEditComponent implements OnInit {

    constructor(private datePipe: DatePipe, private patientService: PatientService, private roleService: RoleService,
                private messageService: MessageService, private router: Router, private sexeService: SexeService,
                private mutuelleService: MutuelleService, private sourceService: SourceService) {
    }

    ngOnInit(): void {
        this.selectedSexe = new SexeVo();
        this.sexeService.findAll().subscribe((data) => this.sexes = data);
        this.selectedMutuelle = new MutuelleVo();
        this.mutuelleService.findAll().subscribe((data) => this.mutuelles = data);
        this.selectedSource = new SourceVo();
        this.sourceService.findAll().subscribe(data => this.sources = data);
    }

    public edit() {
        this.editWithShowOption(false);
    }

    public editWithShowOption(showList: boolean) {
        this.selectedPatient.dateNaissance = DateUtils.toDate(this.selectedPatient.dateNaissance);
        this.selectedPatient.dateArchivage = DateUtils.toDate(this.selectedPatient.dateArchivage);
        this.selectedPatient.dateCreation = DateUtils.toDate(this.selectedPatient.dateCreation);
        this.patientService.edit().subscribe(patient => {
            const myIndex = this.patients.findIndex(e => e.id === this.selectedPatient.id);
            this.patients[myIndex] = this.selectedPatient;
            this.editPatientDialog = false;
            this.selectedPatient = new PatientVo();


        }, error => {
            console.log(error);
        });

    }

    public async openCreatesexe(sexe: string) {
        const isPermistted = await this.roleService.isPermitted('Sexe', 'add');
        if (isPermistted) {
            this.selectedSexe = new SexeVo();
            this.createSexeDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }

    public async openCreatemutuelle(mutuelle: string) {
        const isPermistted = await this.roleService.isPermitted('Mutuelle', 'add');
        if (isPermistted) {
            this.selectedMutuelle = new MutuelleVo();
            this.createMutuelleDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }

    // methods

    hideEditDialog() {
        this.editPatientDialog = false;
    }

    // getters and setters

    get selectedSource(): SourceVo {
        return this.sourceService.selectedSource;
    }

    set selectedSource(value: SourceVo) {
        this.sourceService.selectedSource = value;
    }

    get sources(): Array<SourceVo> {
        return this.sourceService.sources;
    }

    set sources(value: Array<SourceVo>) {
        this.sourceService.sources = value;
    }

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

    get editPatientDialog(): boolean {
        return this.patientService.editPatientDialog;

    }

    set editPatientDialog(value: boolean) {
        this.patientService.editPatientDialog = value;
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

    get createSexeDialog(): boolean {
        return this.sexeService.createSexeDialog;
    }

    set createSexeDialog(value: boolean) {
        this.sexeService.createSexeDialog = value;
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

    get createMutuelleDialog(): boolean {
        return this.mutuelleService.createMutuelleDialog;
    }

    set createMutuelleDialog(value: boolean) {
        this.mutuelleService.createMutuelleDialog = value;
    }

    get dateFormat() {
        return environment.dateFormatEdit;
    }

    get dateFormatColumn() {
        return environment.dateFormatList;
    }

}
