import { Component, OnInit } from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {CategorieMedicamentVo} from "../../../../controller/model/CategorieMedicament.model";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {RoleService} from "../../../../controller/service/role.service";
import {StringUtilService} from "../../../../controller/service/StringUtil.service";
import {CategorieMedicamentService} from "../../../../controller/service/CategorieMedicament.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-categorie-medicament-create',
  templateUrl: './categorie-medicament-create.component.html',
  styleUrls: ['./categorie-medicament-create.component.scss']
})
export class CategorieMedicamentCreateComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();
    _validCategorieMedicamentReference = true;
    _validCategorieMedicamentLibelle = true;

    constructor(private datePipe: DatePipe, private categorieMedicamentService: CategorieMedicamentService,
                private stringUtilService: StringUtilService, private roleService: RoleService,
                private messageService: MessageService, private router: Router) {
    }


    ngOnInit(): void {
    }

    private setValidation(value: boolean) {
        this.validCategorieMedicamentLibelle = value;
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
        this.categorieMedicamentService.save().subscribe(categorieMedicament => {
            this.categorieMedicaments.push({...categorieMedicament});
            this.createCategorieMedicamentDialog = false;
            this.submitted = false;
            this.selectedCategorieMedicament = new CategorieMedicamentVo();

        }, error => {
            console.log(error);
        });
    }

    private validateForm(): void {
        this.errorMessages = new Array<string>();
        this.validateCategorieMedicamentLibelle();

    }

    private validateCategorieMedicamentLibelle() {
        if (this.stringUtilService.isEmpty(this.selectedCategorieMedicament.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validCategorieMedicamentLibelle = false;
        } else {
            this.validCategorieMedicamentLibelle = true;
        }
    }


    hideCreateDialog() {
        this.createCategorieMedicamentDialog = false;
        this.setValidation(true);
    }

    // getters and setters

    get categorieMedicaments(): Array<CategorieMedicamentVo> {
        return this.categorieMedicamentService.categorieMedicaments;
    }

    set categorieMedicaments(value: Array<CategorieMedicamentVo>) {
        this.categorieMedicamentService.categorieMedicaments = value;
    }

    get selectedCategorieMedicament(): CategorieMedicamentVo {
        return this.categorieMedicamentService.selectedCategorieMedicament;
    }

    set selectedCategorieMedicament(value: CategorieMedicamentVo) {
        this.categorieMedicamentService.selectedCategorieMedicament = value;
    }

    get createCategorieMedicamentDialog(): boolean {
        return this.categorieMedicamentService.createCategorieMedicamentDialog;

    }

    set createCategorieMedicamentDialog(value: boolean) {
        this.categorieMedicamentService.createCategorieMedicamentDialog = value;
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

    get validCategorieMedicamentReference(): boolean {
        return this._validCategorieMedicamentReference;
    }

    set validCategorieMedicamentReference(value: boolean) {
        this._validCategorieMedicamentReference = value;
    }

    get validCategorieMedicamentLibelle(): boolean {
        return this._validCategorieMedicamentLibelle;
    }

    set validCategorieMedicamentLibelle(value: boolean) {
        this._validCategorieMedicamentLibelle = value;
    }

}
