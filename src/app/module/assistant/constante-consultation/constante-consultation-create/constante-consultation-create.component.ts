import {Component, OnInit} from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {ConsultationVo} from "../../../../controller/model/Consultation.model";
import {ConstanteVo} from "../../../../controller/model/Constante.model";
import {ConstanteConsultationVo} from "../../../../controller/model/ConstanteConsultation.model";
import {DatePipe} from "@angular/common";
import {ConstanteConsultationService} from "../../../../controller/service/ConstanteConsultation.service";
import {StringUtilService} from "../../../../controller/service/StringUtil.service";
import {RoleService} from "../../../../controller/service/role.service";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {ConsultationService} from "../../../../controller/service/Consultation.service";
import {ConstanteService} from "../../../../controller/service/Constante.service";

@Component({
    selector: 'app-constante-consultation-create',
    templateUrl: './constante-consultation-create.component.html',
    styleUrls: ['./constante-consultation-create.component.scss']
})
export class ConstanteConsultationCreateComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();
    _validConstanteReference = true;
    _validConstanteLibelle = true;
    _validConsultationReference = true;
    _validConsultationDateConsultation = true;
    _validConsultationPatient = true;
    _validConsultationTarif = true;
    _validConsultationPaiements = true;
    _validConsultationOrdonnances = true;
    _validConsultationConstanteConsultations = true;
    _validConsultationPrescriptions = true;

    constructor(private datePipe: DatePipe, private constanteConsultationService: ConstanteConsultationService,
                private stringUtilService: StringUtilService, private roleService: RoleService,
                private messageService: MessageService, private router: Router,
                private consultationService: ConsultationService, private constanteService: ConstanteService) {
    }


    ngOnInit(): void {
        this.selectedConstante = new ConstanteVo();
        this.constanteService.findAll().subscribe((data) => this.constantes = data);
        this.selectedConsultation = new ConsultationVo();
        this.consultationService.findAll().subscribe((data) => this.consultations = data);
    }


    private setValidation(value: boolean) {
    }


    public save() {
        this.submitted = true;
        this.validateForm();
        if (this.errorMessages.length === 0) {
            this.saveWithShowOption(false);
        } else {
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs sur le formulaire'
            });
        }
    }

    public saveWithShowOption(showList: boolean) {
        this.constanteConsultationService.save().subscribe(constanteConsultation => {
            this.constanteConsultations.push({...constanteConsultation});
            this.createConstanteConsultationDialog = false;
            this.submitted = false;
            this.selectedConstanteConsultation = new ConstanteConsultationVo();
        }, error => {
            console.log(error);
        });
    }

    private validateForm(): void {
        this.errorMessages = new Array<string>();
    }

    public async openCreateconstante(constante: string) {
        const isPermistted = await this.roleService.isPermitted('Constante', 'add');
        if (isPermistted) {
            this.selectedConstante = new ConstanteVo();
            this.createConstanteDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
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
        this.createConstanteConsultationDialog = false;
        this.setValidation(true);
    }

    // getters and setters

    get constanteConsultations(): Array<ConstanteConsultationVo> {
        return this.constanteConsultationService.constanteConsultations;
    }

    set constanteConsultations(value: Array<ConstanteConsultationVo>) {
        this.constanteConsultationService.constanteConsultations = value;
    }

    get selectedConstanteConsultation(): ConstanteConsultationVo {
        return this.constanteConsultationService.selectedConstanteConsultation;
    }

    set selectedConstanteConsultation(value: ConstanteConsultationVo) {
        this.constanteConsultationService.selectedConstanteConsultation = value;
    }

    get createConstanteConsultationDialog(): boolean {
        return this.constanteConsultationService.createConstanteConsultationDialog;

    }

    set createConstanteConsultationDialog(value: boolean) {
        this.constanteConsultationService.createConstanteConsultationDialog = value;
    }

    get selectedConstante(): ConstanteVo {
        return this.constanteService.selectedConstante;
    }

    set selectedConstante(value: ConstanteVo) {
        this.constanteService.selectedConstante = value;
    }

    get constantes(): Array<ConstanteVo> {
        return this.constanteService.constantes;
    }

    set constantes(value: Array<ConstanteVo>) {
        this.constanteService.constantes = value;
    }

    get createConstanteDialog(): boolean {
        return this.constanteService.createConstanteDialog;
    }

    set createConstanteDialog(value: boolean) {
        this.constanteService.createConstanteDialog = value;
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


    get validConstanteReference(): boolean {
        return this._validConstanteReference;
    }

    set validConstanteReference(value: boolean) {
        this._validConstanteReference = value;
    }

    get validConstanteLibelle(): boolean {
        return this._validConstanteLibelle;
    }

    set validConstanteLibelle(value: boolean) {
        this._validConstanteLibelle = value;
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
