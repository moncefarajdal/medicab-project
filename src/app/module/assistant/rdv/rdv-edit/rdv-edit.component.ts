import { Component, OnInit } from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {PatientVo} from "../../../../controller/model/Patient.model";
import {RdvVo} from "../../../../controller/model/Rdv.model";
import {DateUtils} from "../../../../utils/DateUtils";
import {PatientService} from "../../../../controller/service/Patient.service";
import {Router} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng/api";
import {RoleService} from "../../../../controller/service/role.service";
import {RdvService} from "../../../../controller/service/Rdv.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-rdv-edit',
  templateUrl: './rdv-edit.component.html',
  styleUrls: ['./rdv-edit.component.scss']
})
export class RdvEditComponent implements OnInit {

    constructor(private datePipe: DatePipe, private rdvService: RdvService, private roleService: RoleService,
                private messageService: MessageService, private router: Router, private patientService: PatientService,
                private confirmationService: ConfirmationService) {
    }

    ngOnInit(): void {
        this.selectedPatient = new PatientVo();
        this.patientService.findAll().subscribe((data) => this.patients = data);
    }

    public edit() {
        this.editWithShowOption(false);
    }

    public editWithShowOption(showList: boolean) {
        // this.selectedRdv.dateRdv = DateUtils.toDate(this.selectedRdv.dateRdv);
        this.selectedRdv.dateArchivage = DateUtils.toDate(this.selectedRdv.dateArchivage);
        this.selectedRdv.dateCreation = DateUtils.toDate(this.selectedRdv.dateCreation);
        this.rdvService.edit().subscribe(rdv => {
            const myIndex = this.rdvs.findIndex(e => e.id === this.selectedRdv.id);
            this.rdvs[myIndex] = this.selectedRdv;
            this.editRdvDialog = false;
            this.selectedRdv = new RdvVo();


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
        this.editRdvDialog = false;
    }

    getSelectedDate() {
        let selectedDate = this.datePipe.transform(this.selectedRdv.dateRdv, 'yyyy-MM-dd HH:mm:ss');
        this.rdvs.forEach(e => {
            let date = this.datePipe.transform(e.dateRdv, 'yyyy-MM-dd HH:mm:ss');
            if (date.substr(0, 10) == selectedDate.substr(0, 10)) {
                let date1 = new Date(e.dateRdv);
                let date2 = new Date(selectedDate);
                let result = date2.getTime() - date1.getTime();
                console.log(result / 60000)
                if ((result / 60000) < 30) {
                    this.confirmationService.confirm({
                        message: 'Attention, Il y a deja un rendez-vous proche de cette date. Voulez-vous continuer ?',
                        header: 'Confirmation',
                        icon: 'pi pi-exclamation-triangle',
                        accept: () => {
                            // this.rdvService.save().subscribe(status => {
                            // }, error => console.log(error));
                        },
                        reject: () => {
                            this.hideEditDialog();
                        }
                    });
                }
            }
        })
        // console.log(selectedDate);
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

    get editRdvDialog(): boolean {
        return this.rdvService.editRdvDialog;

    }

    set editRdvDialog(value: boolean) {
        this.rdvService.editRdvDialog = value;
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
