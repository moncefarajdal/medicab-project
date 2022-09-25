import {Component, OnInit} from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {MutuelleVo} from "../../../../controller/model/Mutuelle.model";
import {SexeVo} from "../../../../controller/model/Sexe.model";
import {PatientVo} from "../../../../controller/model/Patient.model";
import {MutuelleService} from "../../../../controller/service/Mutuelle.service";
import {SexeService} from "../../../../controller/service/Sexe.service";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {RoleService} from "../../../../controller/service/role.service";
import {StringUtilService} from "../../../../controller/service/StringUtil.service";
import {PatientService} from "../../../../controller/service/Patient.service";
import {DatePipe} from "@angular/common";
import {SourceService} from "../../../../controller/service/Source.service";
import {SourceVo} from "../../../../controller/model/Source.model";

@Component({
    selector: 'app-patient-create',
    templateUrl: './patient-create.component.html',
    styleUrls: ['./patient-create.component.scss']
})
export class PatientCreateComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();
    _validPatientCin = true;
    _validPatientNom = true;
    _validPatientPrenom = true;
    _validPatientDateNaissance = true;
    _validPatientSexe = true;
    _validPatientSource = true;
    _validPatientAdresse = true;
    _validPatientTelephone = true;
    _validPatientNumeroCnss = true;
    _validSexeLibelle = true;
    _validSexeCode = true;
    _validSourceLibelle = true;
    _validSourceCode = true;
    _validMutuelleLibelle = true;
    _validMutuelleCode = true;


    constructor(private datePipe: DatePipe, private patientService: PatientService,
                private stringUtilService: StringUtilService, private roleService: RoleService,
                private messageService: MessageService, private router: Router, private sexeService: SexeService,
                private mutuelleService: MutuelleService, private sourceService: SourceService) {
    }

    ngOnInit(): void {
        this.selectedSexe = new SexeVo();
        this.sexeService.findAll().subscribe((data) => this.sexes = data);
        this.selectedSource = new SourceVo();
        this.sourceService.findAll().subscribe(data => this.sources = data);
        this.selectedMutuelle = new MutuelleVo();
        this.mutuelleService.findAll().subscribe((data) => this.mutuelles = data);
    }

    private setValidation(value: boolean) {
        this.validPatientCin = value;
        this.validPatientNom = value;
        this.validPatientPrenom = value;
        this.validPatientDateNaissance = value;
        this.validPatientSexe = value;
        this.validPatientSource = value;
        this.validPatientAdresse = value;
        this.validPatientTelephone = value;
        // this.validPatientNumeroCnss = value;
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
        this.patientService.save().subscribe(patient => {
            this.patients.push({...patient});
            this.createPatientDialog = false;
            this.submitted = false;
            this.selectedPatient = new PatientVo();


        }, error => {
            console.log(error);
        });

    }

//validation methods
    private validateForm(): void {
        this.errorMessages = new Array<string>();
        this.validatePatientCin();
        this.validatePatientNom();
        this.validatePatientPrenom();
        this.validatePatientDateNaissance();
        this.validatePatientSexe();
        this.validatePatientAdresse();
        this.validatePatientTelephone();
        // this.validatePatientNumeroCnss();
    }

    private validatePatientCin() {
        if (this.stringUtilService.isEmpty(this.selectedPatient.cin)) {
            this.errorMessages.push('Cin non valide');
            this.validPatientCin = false;
        } else {
            this.validPatientCin = true;
        }
    }

    private validatePatientNom() {
        if (this.stringUtilService.isEmpty(this.selectedPatient.nom)) {
            this.errorMessages.push('Nom non valide');
            this.validPatientNom = false;
        } else {
            this.validPatientNom = true;
        }
    }

    private validatePatientPrenom() {
        if (this.stringUtilService.isEmpty(this.selectedPatient.prenom)) {
            this.errorMessages.push('Prenom non valide');
            this.validPatientPrenom = false;
        } else {
            this.validPatientPrenom = true;
        }
    }

    private validatePatientDateNaissance() {
        if (this.stringUtilService.isEmpty(this.selectedPatient.dateNaissance)) {
            this.errorMessages.push('Date naissance non valide');
            this.validPatientDateNaissance = false;
        } else {
            this.validPatientDateNaissance = true;
        }
    }

    private validatePatientSexe() {
        if (this.stringUtilService.isEmpty(this.selectedPatient.sexeVo)) {
            this.errorMessages.push('Sexe non valide');
            this.validPatientSexe = false;
        } else {
            this.validPatientSexe = true;
        }
    }

    private validatePatientSource() {
        if (this.stringUtilService.isEmpty(this.selectedPatient.sourceVo)) {
            this.errorMessages.push('Source non valide');
            this.validPatientSource = false;
        } else {
            this.validPatientSource = true;
        }
    }

    private validatePatientAdresse() {
        if (this.stringUtilService.isEmpty(this.selectedPatient.adresse)) {
            this.errorMessages.push('Adresse non valide');
            this.validPatientAdresse = false;
        } else {
            this.validPatientAdresse = true;
        }
    }

    private validatePatientTelephone() {
        if (this.stringUtilService.isEmpty(this.selectedPatient.telephone)) {
            this.errorMessages.push('Telephone non valide');
            this.validPatientTelephone = false;
        } else {
            this.validPatientTelephone = true;
        }
    }

    private validatePatientNumeroCnss() {
        if (this.stringUtilService.isEmpty(this.selectedPatient.numeroCnss)) {
            this.errorMessages.push('Numero cnss non valide');
            this.validPatientNumeroCnss = false;
        } else {
            this.validPatientNumeroCnss = true;
        }
    }


    // open Popup
    public async openCreatesexe(sexe: string) {
        const isPermistted = await this.roleService.isPermitted('Sexe', 'add');
        if (isPermistted) {
            this.selectedSexe = new SexeVo();
            this.createSexeDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }

    public async openCreatesource(source: string) {
        const isPermistted = await this.roleService.isPermitted('Source', 'add');
        if (isPermistted) {
            this.selectedSource = new SourceVo();
            this.createSourceDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }

    public async openCreatemutuelle(mutuelle: string) {
        const isPermistted = await this.roleService.isPermitted('Mutuelle', 'add');
        if (isPermistted) {
            this.selectedMutuelle = new MutuelleVo();
            this.createMutuelleDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }

    // methods

    hideCreateDialog() {
        this.createPatientDialog = false;
        this.setValidation(true);
    }

    // getters and setters

    get patients(): Array<PatientVo> {
        return this.patientService.patients;
    }

    set patients(value: Array<PatientVo>) {
        this.patientService.patients = value;
    }

    get selectedPatient(): PatientVo {
        return this.patientService.selectedPatient;
    }

    set selectedPatient(value: PatientVo) {
        this.patientService.selectedPatient = value;
    }

    get createPatientDialog(): boolean {
        return this.patientService.createPatientDialog;

    }

    set createPatientDialog(value: boolean) {
        this.patientService.createPatientDialog = value;
    }

    get selectedSexe(): SexeVo {
        return this.sexeService.selectedSexe;
    }

    set selectedSexe(value: SexeVo) {
        this.sexeService.selectedSexe = value;
    }

    get sexes(): Array<SexeVo> {
        return this.sexeService.sexes;
    }

    set sexes(value: Array<SexeVo>) {
        this.sexeService.sexes = value;
    }

    get createSexeDialog(): boolean {
        return this.sexeService.createSexeDialog;
    }

    set createSexeDialog(value: boolean) {
        this.sexeService.createSexeDialog = value;
    }

    get selectedSource(): SourceVo {
        return this.sourceService.selectedSource;
    }

    set selectedSource(value: SourceVo) {
        this.sourceService.selectedSource = value;
    }

    get sources(): Array<SourceVo> {
        return this.sourceService.sources;
    }

    set sources(value: Array<SourceVo>) {
        this.sourceService.sources = value;
    }

    get createSourceDialog(): boolean {
        return this.sourceService.createSourceDialog;
    }

    set createSourceDialog(value: boolean) {
        this.sourceService.createSourceDialog = value;
    }

    get selectedMutuelle(): MutuelleVo {
        return this.mutuelleService.selectedMutuelle;
    }

    set selectedMutuelle(value: MutuelleVo) {
        this.mutuelleService.selectedMutuelle = value;
    }

    get mutuelles(): Array<MutuelleVo> {
        return this.mutuelleService.mutuelles;
    }

    set mutuelles(value: Array<MutuelleVo>) {
        this.mutuelleService.mutuelles = value;
    }

    get createMutuelleDialog(): boolean {
        return this.mutuelleService.createMutuelleDialog;
    }

    set createMutuelleDialog(value: boolean) {
        this.mutuelleService.createMutuelleDialog = value;
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

    get validPatientCin(): boolean {
        return this._validPatientCin;
    }

    set validPatientCin(value: boolean) {
        this._validPatientCin = value;
    }

    get validPatientNom(): boolean {
        return this._validPatientNom;
    }

    set validPatientNom(value: boolean) {
        this._validPatientNom = value;
    }

    get validPatientPrenom(): boolean {
        return this._validPatientPrenom;
    }

    set validPatientPrenom(value: boolean) {
        this._validPatientPrenom = value;
    }

    get validPatientDateNaissance(): boolean {
        return this._validPatientDateNaissance;
    }

    set validPatientDateNaissance(value: boolean) {
        this._validPatientDateNaissance = value;
    }

    get validPatientSexe(): boolean {
        return this._validPatientSexe;
    }

    set validPatientSexe(value: boolean) {
        this._validPatientSexe = value;
    }

    get validPatientSource(): boolean {
        return this._validPatientSource;
    }

    set validPatientSource(value: boolean) {
        this._validPatientSource = value;
    }

    get validPatientAdresse(): boolean {
        return this._validPatientAdresse;
    }

    set validPatientAdresse(value: boolean) {
        this._validPatientAdresse = value;
    }

    get validPatientTelephone(): boolean {
        return this._validPatientTelephone;
    }

    set validPatientTelephone(value: boolean) {
        this._validPatientTelephone = value;
    }

    get validPatientNumeroCnss(): boolean {
        return this._validPatientNumeroCnss;
    }

    set validPatientNumeroCnss(value: boolean) {
        this._validPatientNumeroCnss = value;
    }

    get validSexeLibelle(): boolean {
        return this._validSexeLibelle;
    }

    set validSexeLibelle(value: boolean) {
        this._validSexeLibelle = value;
    }

    get validSexeCode(): boolean {
        return this._validSexeCode;
    }

    set validSexeCode(value: boolean) {
        this._validSexeCode = value;
    }

    get validMutuelleLibelle(): boolean {
        return this._validMutuelleLibelle;
    }

    set validMutuelleLibelle(value: boolean) {
        this._validMutuelleLibelle = value;
    }

    get validMutuelleCode(): boolean {
        return this._validMutuelleCode;
    }

    set validMutuelleCode(value: boolean) {
        this._validMutuelleCode = value;
    }

}
