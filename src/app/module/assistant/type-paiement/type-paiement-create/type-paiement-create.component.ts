import {Component, OnInit} from '@angular/core';
import {TypePaiementService} from "../../../../controller/service/TypePaiement.service";
import {StringUtilService} from "../../../../controller/service/StringUtil.service";
import {RoleService} from "../../../../controller/service/role.service";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {TypePaiementVo} from "../../../../controller/model/TypePaiement.model";

@Component({
    selector: 'app-type-paiement-create',
    templateUrl: './type-paiement-create.component.html',
    styleUrls: ['./type-paiement-create.component.scss']
})
export class TypePaiementCreateComponent implements OnInit {

    private _submitted = false;
    private _errorMessages = new Array<string>();
    private _validTypePaiementLibelle = true;
    private _validTypePaiementCode = true;

    constructor(private typePaiementService: TypePaiementService, private stringUtilService: StringUtilService,
                private roleService: RoleService, private messageService: MessageService, private router: Router) {
    }

    ngOnInit(): void {
    }

    private setValidation(value: boolean) {
        this.validTypePaiementLibelle = value;
        this.validTypePaiementCode = value;
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
        this.typePaiementService.save().subscribe(typePaiement => {
            this.typePaiements.push({...typePaiement});
            this.createTypePaiementDialog = false;
            this.submitted = false;
            this.selectedTypePaiement = new TypePaiementVo();
        }, error => {
            console.log(error);
        });

    }

    private validateForm(): void {
        this.errorMessages = new Array<string>();
        this.validateTypePaiementLibelle();
        this.validateTypeConsultationCode();

    }

    private validateTypePaiementLibelle() {
        if (this.stringUtilService.isEmpty(this.selectedTypePaiement.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validTypePaiementLibelle = false;
        } else {
            this.validTypePaiementLibelle = true;
        }
    }

    private validateTypeConsultationCode() {
        if (this.stringUtilService.isEmpty(this.selectedTypePaiement.code)) {
            this.errorMessages.push('Code non valide');
            this.validTypePaiementCode = false;
        } else {
            this.validTypePaiementCode = true;
        }
    }

    hideCreateDialog() {
        this.createTypePaiementDialog = false;
        this.setValidation(true);
    }

    // getters and setters

    get typePaiements(): Array<TypePaiementVo> {
        return this.typePaiementService.typePaiements;
    }

    set typePaiements(value: Array<TypePaiementVo>) {
        this.typePaiementService.typePaiements = value;
    }

    get selectedTypePaiement(): TypePaiementVo {
        return this.typePaiementService.selectedTypePaiement;
    }

    set selectedTypePaiement(value: TypePaiementVo) {
        this.typePaiementService.selectedTypePaiement = value;
    }

    get createTypePaiementDialog(): boolean {
        return this.typePaiementService.createTypePaiementDialog;
    }

    set createTypePaiementDialog(value: boolean) {
        this.typePaiementService.createTypePaiementDialog = value;
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

    get validTypePaiementLibelle(): boolean {
        return this._validTypePaiementLibelle;
    }

    set validTypePaiementLibelle(value: boolean) {
        this._validTypePaiementLibelle = value;
    }

    get validTypePaiementCode(): boolean {
        return this._validTypePaiementCode;
    }

    set validTypePaiementCode(value: boolean) {
        this._validTypePaiementCode = value;
    }
}
