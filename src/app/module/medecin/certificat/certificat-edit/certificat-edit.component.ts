import {Component, OnInit} from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {PatientVo} from "../../../../controller/model/Patient.model";
import {CertificatVo} from "../../../../controller/model/Certificat.model";
import {DateUtils} from "../../../../utils/DateUtils";
import {DatePipe} from "@angular/common";
import {CertificatService} from "../../../../controller/service/Certificat.service";
import {RoleService} from "../../../../controller/service/role.service";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {PatientService} from "../../../../controller/service/Patient.service";

@Component({
    selector: 'app-certificat-edit',
    templateUrl: './certificat-edit.component.html',
    styleUrls: ['./certificat-edit.component.scss']
})
export class CertificatEditComponent implements OnInit {

    constructor(private datePipe: DatePipe, private certificatService: CertificatService,
                private roleService: RoleService, private messageService: MessageService,
                private router: Router, private patientService: PatientService) {
    }

    ngOnInit(): void {
        this.selectedPatient = new PatientVo();
        this.patientService.findAll().subscribe((data) => this.patients = data);
    }

    public edit() {
        this.editWithShowOption(false);
    }

    public editWithShowOption(showList: boolean) {
        this.selectedCertificat.dateDebut = DateUtils.toDate(this.selectedCertificat.dateDebut);
        this.selectedCertificat.dateFin = DateUtils.toDate(this.selectedCertificat.dateFin);
        this.selectedCertificat.dateArchivage = DateUtils.toDate(this.selectedCertificat.dateArchivage);
        this.selectedCertificat.dateCreation = DateUtils.toDate(this.selectedCertificat.dateCreation);
        this.certificatService.edit().subscribe(certificat => {
            const myIndex = this.certificats.findIndex(e => e.id === this.selectedCertificat.id);
            this.certificats[myIndex] = this.selectedCertificat;
            this.editCertificatDialog = false;
            this.selectedCertificat = new CertificatVo();

        }, error => {
            console.log(error);
        });
    }

    public async openCreatepatient(patient: string) {
        const isPermistted = await this.roleService.isPermitted('Patient', 'add');
        if (isPermistted) {
            this.selectedPatient = new PatientVo();
            this.createPatientDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }

    hideEditDialog() {
        this.editCertificatDialog = false;
    }

    // getters and setters

    get certificats(): Array<CertificatVo> {
        return this.certificatService.certificats;
    }

    set certificats(value: Array<CertificatVo>) {
        this.certificatService.certificats = value;
    }

    get selectedCertificat(): CertificatVo {
        return this.certificatService.selectedCertificat;
    }

    set selectedCertificat(value: CertificatVo) {
        this.certificatService.selectedCertificat = value;
    }

    get editCertificatDialog(): boolean {
        return this.certificatService.editCertificatDialog;
    }

    set editCertificatDialog(value: boolean) {
        this.certificatService.editCertificatDialog = value;
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

    get createPatientDialog(): boolean {
        return this.patientService.createPatientDialog;
    }

    set createPatientDialog(value: boolean) {
        this.patientService.createPatientDialog = value;
    }

    get dateFormat() {
        return environment.dateFormatEdit;
    }

    get dateFormatColumn() {
        return environment.dateFormatList;
    }

}
