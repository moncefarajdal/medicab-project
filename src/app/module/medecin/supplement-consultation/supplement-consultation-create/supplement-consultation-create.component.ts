import { Component, OnInit } from '@angular/core';
import {DatePipe} from "@angular/common";
import {SupplementConsultationService} from "../../../../controller/service/SupplementConsultation.service";
import {StringUtilService} from "../../../../controller/service/StringUtil.service";
import {RoleService} from "../../../../controller/service/role.service";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {ConsultationService} from "../../../../controller/service/Consultation.service";
import {SupplementService} from "../../../../controller/service/Supplement.service";
import {SupplementVo} from "../../../../controller/model/Supplement.model";
import {ConsultationVo} from "../../../../controller/model/Consultation.model";
import {SupplementConsultationVo} from "../../../../controller/model/SupplementConsultation.model";
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-supplement-consultation-create',
  templateUrl: './supplement-consultation-create.component.html',
  styleUrls: ['./supplement-consultation-create.component.scss']
})
export class SupplementConsultationCreateComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();
    _validSupplementReference = true;
    _validSupplementLibelle = true;
    _validConsultationReference = true;
    _validConsultationSupplementConsultations = true;

    constructor(private datePipe: DatePipe, private supplementConsultationService: SupplementConsultationService,
                private stringUtilService: StringUtilService, private roleService: RoleService,
                private messageService: MessageService, private router: Router,
                private consultationService: ConsultationService, private supplementService: SupplementService) {
    }


    ngOnInit(): void {
        this.selectedSupplement = new SupplementVo();
        this.supplementService.findAll().subscribe((data) => this.supplements = data);
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
        this.supplementConsultationService.save().subscribe(supplementConsultation => {
            this.supplementConsultations.push({...supplementConsultation});
            this.createSupplementConsultationDialog = false;
            this.submitted = false;
            this.selectedSupplementConsultation = new SupplementConsultationVo();
        }, error => {
            console.log(error);
        });
    }

    private validateForm(): void {
        this.errorMessages = new Array<string>();
    }

    public async openCreatesupplement(supplement: string) {
        const isPermistted = await this.roleService.isPermitted('Supplement', 'add');
        if (isPermistted) {
            this.selectedSupplement = new SupplementVo();
            this.createSupplementDialog = true;
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
        this.createSupplementConsultationDialog = false;
        this.setValidation(true);
    }

    // getters and setters

    get supplementConsultations(): Array<SupplementConsultationVo> {
        return this.supplementConsultationService.supplementConsultations;
    }

    set supplementConsultations(value: Array<SupplementConsultationVo>) {
        this.supplementConsultationService.supplementConsultations = value;
    }

    get selectedSupplementConsultation(): SupplementConsultationVo {
        return this.supplementConsultationService.selectedSupplementConsultation;
    }

    set selectedSupplementConsultation(value: SupplementConsultationVo) {
        this.supplementConsultationService.selectedSupplementConsultation = value;
    }

    get createSupplementConsultationDialog(): boolean {
        return this.supplementConsultationService.createSupplementConsultationDialog;
    }

    set createSupplementConsultationDialog(value: boolean) {
        this.supplementConsultationService.createSupplementConsultationDialog = value;
    }

    get selectedSupplement(): SupplementVo {
        return this.supplementService.selectedSupplement;
    }

    set selectedSupplement(value: SupplementVo) {
        this.supplementService.selectedSupplement = value;
    }

    get supplements(): Array<SupplementVo> {
        return this.supplementService.supplements;
    }

    set supplements(value: Array<SupplementVo>) {
        this.supplementService.supplements = value;
    }

    get createSupplementDialog(): boolean {
        return this.supplementService.createSupplementDialog;
    }

    set createSupplementDialog(value: boolean) {
        this.supplementService.createSupplementDialog = value;
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


    get validSupplementReference(): boolean {
        return this._validSupplementReference;
    }

    set validSupplementReference(value: boolean) {
        this._validSupplementReference = value;
    }

    get validSupplementLibelle(): boolean {
        return this._validSupplementLibelle;
    }

    set validSupplementLibelle(value: boolean) {
        this._validSupplementLibelle = value;
    }

    get validConsultationReference(): boolean {
        return this._validConsultationReference;
    }

    set validConsultationReference(value: boolean) {
        this._validConsultationReference = value;
    }

    get validConsultationSupplementConsultations(): boolean {
        return this._validConsultationSupplementConsultations;
    }

    set validConsultationSupplementConsultations(value: boolean) {
        this._validConsultationSupplementConsultations = value;
    }

}
