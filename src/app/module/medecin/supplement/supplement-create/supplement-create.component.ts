import {Component, OnInit} from '@angular/core';
import {DatePipe} from "@angular/common";
import {SupplementService} from "../../../../controller/service/Supplement.service";
import {StringUtilService} from "../../../../controller/service/StringUtil.service";
import {RoleService} from "../../../../controller/service/role.service";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {SupplementVo} from "../../../../controller/model/Supplement.model";
import {environment} from "../../../../../environments/environment";

@Component({
    selector: 'app-supplement-create',
    templateUrl: './supplement-create.component.html',
    styleUrls: ['./supplement-create.component.scss']
})
export class SupplementCreateComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();
    _validSupplementReference = true;
    _validSupplementLibelle = true;

    constructor(private datePipe: DatePipe, private supplementService: SupplementService,
                private stringUtilService: StringUtilService, private roleService: RoleService,
                private messageService: MessageService, private router: Router) {
    }

    // methods

    ngOnInit(): void {
    }

    private setValidation(value: boolean) {
        this.validSupplementReference = value;
        this.validSupplementLibelle = value;
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
        this.supplementService.save().subscribe(supplement => {
            this.supplements.push({...supplement});
            this.createSupplementDialog = false;
            this.submitted = false;
            this.selectedSupplement = new SupplementVo();
        }, error => {
            console.log(error);
        });
    }

    // validation methods

    private validateForm(): void {
        this.errorMessages = new Array<string>();
        this.validateSupplementReference();
        this.validateSupplementLibelle();
    }

    private validateSupplementReference() {
        if (this.stringUtilService.isEmpty(this.selectedSupplement.reference)) {
            this.errorMessages.push('Reference non valide');
            this.validSupplementReference = false;
        } else {
            this.validSupplementReference = true;
        }
    }

    private validateSupplementLibelle() {
        if (this.stringUtilService.isEmpty(this.selectedSupplement.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validSupplementLibelle = false;
        } else {
            this.validSupplementLibelle = true;
        }
    }

    hideCreateDialog() {
        this.createSupplementDialog = false;
        this.setValidation(true);
    }

    // getters and setters

    get supplements(): Array<SupplementVo> {
        return this.supplementService.supplements;
    }

    set supplements(value: Array<SupplementVo>) {
        this.supplementService.supplements = value;
    }

    get selectedSupplement(): SupplementVo {
        return this.supplementService.selectedSupplement;
    }

    set selectedSupplement(value: SupplementVo) {
        this.supplementService.selectedSupplement = value;
    }

    get createSupplementDialog(): boolean {
        return this.supplementService.createSupplementDialog;

    }

    set createSupplementDialog(value: boolean) {
        this.supplementService.createSupplementDialog = value;
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

}
