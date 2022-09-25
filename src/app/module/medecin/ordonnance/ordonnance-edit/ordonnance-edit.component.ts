import { Component, OnInit } from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {ConsultationVo} from "../../../../controller/model/Consultation.model";
import {OrdonnanceVo} from "../../../../controller/model/Ordonnance.model";
import {DateUtils} from "../../../../utils/DateUtils";
import {ConsultationService} from "../../../../controller/service/Consultation.service";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {RoleService} from "../../../../controller/service/role.service";
import {OrdonnanceService} from "../../../../controller/service/Ordonnance.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-ordonnance-edit',
  templateUrl: './ordonnance-edit.component.html',
  styleUrls: ['./ordonnance-edit.component.scss']
})
export class OrdonnanceEditComponent implements OnInit {

    constructor(private datePipe: DatePipe, private ordonnanceService: OrdonnanceService, private roleService: RoleService,
                private messageService: MessageService, private router: Router,
                private consultationService: ConsultationService) {
    }

    ngOnInit(): void {
        this.selectedConsultation = new ConsultationVo();
        this.consultationService.findAll().subscribe((data) => this.consultations = data);
    }

    public edit() {
        this.editWithShowOption(false);
    }

    public editWithShowOption(showList: boolean) {
        this.selectedOrdonnance.dateOrdonnance = DateUtils.toDate(this.selectedOrdonnance.dateOrdonnance);
        this.selectedOrdonnance.dateArchivage = DateUtils.toDate(this.selectedOrdonnance.dateArchivage);
        this.selectedOrdonnance.dateCreation = DateUtils.toDate(this.selectedOrdonnance.dateCreation);
        this.ordonnanceService.edit().subscribe(ordonnance => {
            const myIndex = this.ordonnances.findIndex(e => e.id === this.selectedOrdonnance.id);
            this.ordonnances[myIndex] = this.selectedOrdonnance;
            this.editOrdonnanceDialog = false;
            this.selectedOrdonnance = new OrdonnanceVo();
        }, error => {
            console.log(error);
        });

    }

    public async openCreateconsultation(consultation: string) {
        const isPermistted = await this.roleService.isPermitted('Consultation', 'add');
        if (isPermistted) {
            this.selectedConsultation = new ConsultationVo();
            this.createConsultationDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }

    hideEditDialog() {
        this.editOrdonnanceDialog = false;
    }

    // getters and setters

    get ordonnances(): Array<OrdonnanceVo> {
        return this.ordonnanceService.ordonnances;
    }

    set ordonnances(value: Array<OrdonnanceVo>) {
        this.ordonnanceService.ordonnances = value;
    }

    get selectedOrdonnance(): OrdonnanceVo {
        return this.ordonnanceService.selectedOrdonnance;
    }

    set selectedOrdonnance(value: OrdonnanceVo) {
        this.ordonnanceService.selectedOrdonnance = value;
    }

    get editOrdonnanceDialog(): boolean {
        return this.ordonnanceService.editOrdonnanceDialog;

    }

    set editOrdonnanceDialog(value: boolean) {
        this.ordonnanceService.editOrdonnanceDialog = value;
    }

    get selectedConsultation(): ConsultationVo {
        return this.consultationService.selectedConsultation;
    }

    set selectedConsultation(value: ConsultationVo) {
        this.consultationService.selectedConsultation = value;
    }

    get consultations(): Array<ConsultationVo> {
        return this.consultationService.consultations;
    }

    set consultations(value: Array<ConsultationVo>) {
        this.consultationService.consultations = value;
    }

    get createConsultationDialog(): boolean {
        return this.consultationService.createConsultationDialog;
    }

    set createConsultationDialog(value: boolean) {
        this.consultationService.createConsultationDialog = value;
    }

    get dateFormat() {
        return environment.dateFormatEdit;
    }

    get dateFormatColumn() {
        return environment.dateFormatList;
    }

}
