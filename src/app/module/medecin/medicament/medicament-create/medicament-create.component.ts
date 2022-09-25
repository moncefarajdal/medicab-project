import { Component, OnInit } from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {CategorieMedicamentVo} from "../../../../controller/model/CategorieMedicament.model";
import {MedicamentVo} from "../../../../controller/model/Medicament.model";
import {DatePipe} from "@angular/common";
import {MedicamentService} from "../../../../controller/service/Medicament.service";
import {StringUtilService} from "../../../../controller/service/StringUtil.service";
import {RoleService} from "../../../../controller/service/role.service";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {CategorieMedicamentService} from "../../../../controller/service/CategorieMedicament.service";

@Component({
  selector: 'app-medicament-create',
  templateUrl: './medicament-create.component.html',
  styleUrls: ['./medicament-create.component.scss']
})
export class MedicamentCreateComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();
    _validMedicamentCodeMedicament = true;
    _validMedicamentLibelle = true;
    _validCategorieMedicamentReference = true;
    _validCategorieMedicamentLibelle = true;


    constructor(private datePipe: DatePipe, private medicamentService: MedicamentService,
                private stringUtilService: StringUtilService, private roleService: RoleService,
                private messageService: MessageService, private router: Router,
                private categorieMedicamentService: CategorieMedicamentService) {
    }

    ngOnInit(): void {
        this.selectedCategorieMedicament = new CategorieMedicamentVo();
        this.categorieMedicamentService.findAll().subscribe((data) => this.categorieMedicaments = data);
    }

    private setValidation(value: boolean) {
        // this.validMedicamentCodeMedicament = value;
        this.validMedicamentLibelle = value;
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
        this.medicamentService.save().subscribe(medicament => {
            this.medicaments.push({...medicament});
            this.createMedicamentDialog = false;
            this.submitted = false;
            this.selectedMedicament = new MedicamentVo();

        }, error => {
            console.log(error);
        });

    }

    private validateForm(): void {
        this.errorMessages = new Array<string>();
        // this.validateMedicamentCodeMedicament();
        this.validateMedicamentLibelle();

    }

    private validateMedicamentCodeMedicament() {
        if (this.stringUtilService.isEmpty(this.selectedMedicament.codeMedicament)) {
            this.errorMessages.push('Code medicament non valide');
            this.validMedicamentCodeMedicament = false;
        } else {
            this.validMedicamentCodeMedicament = true;
        }
    }

    private validateMedicamentLibelle() {
        if (this.stringUtilService.isEmpty(this.selectedMedicament.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validMedicamentLibelle = false;
        } else {
            this.validMedicamentLibelle = true;
        }
    }


    public async openCreatecategorieMedicament(categorieMedicament: string) {
        const isPermistted = await this.roleService.isPermitted('CategorieMedicament', 'add');
        if (isPermistted) {
            this.selectedCategorieMedicament = new CategorieMedicamentVo();
            this.createCategorieMedicamentDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }

    hideCreateDialog() {
        this.createMedicamentDialog = false;
        this.setValidation(true);
    }

    // getters and setters

    get medicaments(): Array<MedicamentVo> {
        return this.medicamentService.medicaments;
    }

    set medicaments(value: Array<MedicamentVo>) {
        this.medicamentService.medicaments = value;
    }

    get selectedMedicament(): MedicamentVo {
        return this.medicamentService.selectedMedicament;
    }

    set selectedMedicament(value: MedicamentVo) {
        this.medicamentService.selectedMedicament = value;
    }

    get createMedicamentDialog(): boolean {
        return this.medicamentService.createMedicamentDialog;
    }

    set createMedicamentDialog(value: boolean) {
        this.medicamentService.createMedicamentDialog = value;
    }

    get selectedCategorieMedicament(): CategorieMedicamentVo {
        return this.categorieMedicamentService.selectedCategorieMedicament;
    }

    set selectedCategorieMedicament(value: CategorieMedicamentVo) {
        this.categorieMedicamentService.selectedCategorieMedicament = value;
    }

    get categorieMedicaments(): Array<CategorieMedicamentVo> {
        return this.categorieMedicamentService.categorieMedicaments;
    }

    set categorieMedicaments(value: Array<CategorieMedicamentVo>) {
        this.categorieMedicamentService.categorieMedicaments = value;
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

    get validMedicamentCodeMedicament(): boolean {
        return this._validMedicamentCodeMedicament;
    }

    set validMedicamentCodeMedicament(value: boolean) {
        this._validMedicamentCodeMedicament = value;
    }

    get validMedicamentLibelle(): boolean {
        return this._validMedicamentLibelle;
    }

    set validMedicamentLibelle(value: boolean) {
        this._validMedicamentLibelle = value;
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
