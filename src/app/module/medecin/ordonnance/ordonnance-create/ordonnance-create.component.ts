import { Component, OnInit } from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {ConsultationVo} from "../../../../controller/model/Consultation.model";
import {OrdonnanceVo} from "../../../../controller/model/Ordonnance.model";
import {DatePipe} from "@angular/common";
import {OrdonnanceService} from "../../../../controller/service/Ordonnance.service";
import {StringUtilService} from "../../../../controller/service/StringUtil.service";
import {RoleService} from "../../../../controller/service/role.service";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {ConsultationService} from "../../../../controller/service/Consultation.service";

@Component({
  selector: 'app-ordonnance-create',
  templateUrl: './ordonnance-create.component.html',
  styleUrls: ['./ordonnance-create.component.scss']
})
export class OrdonnanceCreateComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

    _validOrdonnanceReference = true;
    _validOrdonnanceDateOrdonnance = true;
    _validConsultationReference = true;
    _validConsultationDateConsultation = true;
    _validConsultationPatient = true;
    _validConsultationTarif = true;
    _validConsultationPaiements = true;
    _validConsultationOrdonnances = true;
    _validConsultationConstanteConsultations = true;
    _validConsultationPrescriptions = true;


    constructor(private datePipe: DatePipe, private ordonnanceService: OrdonnanceService,
                private stringUtilService: StringUtilService, private roleService: RoleService,
                private messageService: MessageService, private router: Router,
                private consultationService: ConsultationService) {
    }


    ngOnInit(): void {
        this.selectedConsultation = new ConsultationVo();
        this.consultationService.findAll().subscribe((data) => this.consultations = data);
    }


    private setValidation(value: boolean) {
        // this.validOrdonnanceReference = value;
        this.validOrdonnanceDateOrdonnance = value;
    }


    public save() {
        this.submitted = true;
        this.validateForm();
        if (this.errorMessages.length === 0) {
            this.saveWithShowOption(false);
        } else {
            this.messageService.add({severity: 'error', summary: 'Erreurs', detail: 'Merci de corrigé les erreurs sur le formulaire'});
        }
    }

    public saveWithShowOption(showList: boolean) {
        this.ordonnanceService.save().subscribe(ordonnance => {
            this.ordonnances.push({...ordonnance});
            this.createOrdonnanceDialog = false;
            this.submitted = false;
            this.selectedOrdonnance = new OrdonnanceVo();
        }, error => {
            console.log(error);
        });

    }

    private validateForm(): void {
        this.errorMessages = new Array<string>();
        // this.validateOrdonnanceReference();
        this.validateOrdonnanceDateOrdonnance();

    }

    private validateOrdonnanceReference() {
        if (this.stringUtilService.isEmpty(this.selectedOrdonnance.reference)) {
            this.errorMessages.push('Reference non valide');
            this.validOrdonnanceReference = false;
        } else {
            this.validOrdonnanceReference = true;
        }
    }

    private validateOrdonnanceDateOrdonnance() {
        if (this.stringUtilService.isEmpty(this.selectedOrdonnance.dateOrdonnance)) {
            this.errorMessages.push('Date ordonnance non valide');
            this.validOrdonnanceDateOrdonnance = false;
        } else {
            this.validOrdonnanceDateOrdonnance = true;
        }
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

    hideCreateDialog() {
        this.createOrdonnanceDialog = false;
        this.setValidation(true);
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

    get createOrdonnanceDialog(): boolean {
        return this.ordonnanceService.createOrdonnanceDialog;

    }

    set createOrdonnanceDialog(value: boolean) {
        this.ordonnanceService.createOrdonnanceDialog = value;
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
        return environment.dateFormatCreate;
    }

    get dateFormatColumn() {
        return environment.dateFormatList;
    }

    get submitted(): boolean {
        return this._submitted;
    }

    set submitted(value: boolean) {
        this._submitted = value;
    }


    get errorMessages(): string[] {
        return this._errorMessages;
    }

    set errorMessages(value: string[]) {
        this._errorMessages = value;
    }

    get validOrdonnanceReference(): boolean {
        return this._validOrdonnanceReference;
    }

    set validOrdonnanceReference(value: boolean) {
        this._validOrdonnanceReference = value;
    }

    get validOrdonnanceDateOrdonnance(): boolean {
        return this._validOrdonnanceDateOrdonnance;
    }

    set validOrdonnanceDateOrdonnance(value: boolean) {
        this._validOrdonnanceDateOrdonnance = value;
    }

    get validConsultationReference(): boolean {
        return this._validConsultationReference;
    }

    set validConsultationReference(value: boolean) {
        this._validConsultationReference = value;
    }

    get validConsultationDateConsultation(): boolean {
        return this._validConsultationDateConsultation;
    }

    set validConsultationDateConsultation(value: boolean) {
        this._validConsultationDateConsultation = value;
    }

    get validConsultationPatient(): boolean {
        return this._validConsultationPatient;
    }

    set validConsultationPatient(value: boolean) {
        this._validConsultationPatient = value;
    }

    get validConsultationTarif(): boolean {
        return this._validConsultationTarif;
    }

    set validConsultationTarif(value: boolean) {
        this._validConsultationTarif = value;
    }

    get validConsultationPaiements(): boolean {
        return this._validConsultationPaiements;
    }

    set validConsultationPaiements(value: boolean) {
        this._validConsultationPaiements = value;
    }

    get validConsultationOrdonnances(): boolean {
        return this._validConsultationOrdonnances;
    }

    set validConsultationOrdonnances(value: boolean) {
        this._validConsultationOrdonnances = value;
    }

    get validConsultationConstanteConsultations(): boolean {
        return this._validConsultationConstanteConsultations;
    }

    set validConsultationConstanteConsultations(value: boolean) {
        this._validConsultationConstanteConsultations = value;
    }

    get validConsultationPrescriptions(): boolean {
        return this._validConsultationPrescriptions;
    }

    set validConsultationPrescriptions(value: boolean) {
        this._validConsultationPrescriptions = value;
    }

}
