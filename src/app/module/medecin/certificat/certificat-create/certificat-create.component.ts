import {Component, OnInit} from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {PatientVo} from "../../../../controller/model/Patient.model";
import {CertificatVo} from "../../../../controller/model/Certificat.model";
import {DatePipe} from "@angular/common";
import {CertificatService} from "../../../../controller/service/Certificat.service";
import {StringUtilService} from "../../../../controller/service/StringUtil.service";
import {RoleService} from "../../../../controller/service/role.service";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {PatientService} from "../../../../controller/service/Patient.service";

@Component({
    selector: 'app-certificat-create',
    templateUrl: './certificat-create.component.html',
    styleUrls: ['./certificat-create.component.scss']
})
export class CertificatCreateComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

    _validCertificatReference = true;
    _validCertificatCommentaire = true;
    _validCertificatNbreJours = true;
    _validCertificatDateDebut = true;
    _validCertificatDateFin = true;
    _validCertificatPatient = true;

    _validPatientCin = true;
    _validPatientNom = true;
    _validPatientPrenom = true;
    _validPatientDateNaissance = true;
    _validPatientSexe = true;
    _validPatientAdresse = true;
    _validPatientTelephone = true;
    _validPatientNumeroCnss = true;


    constructor(private datePipe: DatePipe, private certificatService: CertificatService,
                private stringUtilService: StringUtilService, private roleService: RoleService,
                private messageService: MessageService, private router: Router, private patientService: PatientService) {
    }


    ngOnInit(): void {
        this.selectedPatient = new PatientVo();
        this.patientService.findAll().subscribe((data) => this.patients = data);
    }

    private setValidation(value: boolean) {
        // this.validCertificatReference = value;
        this.validCertificatCommentaire = value;
        this.validCertificatNbreJours = value;
        this.validCertificatDateDebut = value;
        this.validCertificatDateFin = value;
        this.validCertificatPatient = value;
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
        this.certificatService.save().subscribe(certificat => {
            this.certificats.push({...certificat});
            this.createCertificatDialog = false;
            this.submitted = false;
            this.selectedCertificat = new CertificatVo();

        }, error => {
            console.log(error);
        });
    }

    private validateForm(): void {
        this.errorMessages = new Array<string>();
        // this.validateCertificatReference();
        this.validateCertificatCommentaire();
        this.validateCertificatNbreJours();
        this.validateCertificatDateDebut();
        this.validateCertificatDateFin();
        this.validateCertificatPatient();
    }

    private validateCertificatReference() {
        if (this.stringUtilService.isEmpty(this.selectedCertificat.reference)) {
            this.errorMessages.push('Reference non valide');
            this.validCertificatReference = false;
        } else {
            this.validCertificatReference = true;
        }
    }

    private validateCertificatCommentaire() {
        if (this.stringUtilService.isEmpty(this.selectedCertificat.commentaire)) {
            this.errorMessages.push('Commentaire non valide');
            this.validCertificatCommentaire = false;
        } else {
            this.validCertificatCommentaire = true;
        }
    }

    private validateCertificatNbreJours() {
        if (this.stringUtilService.isEmpty(this.selectedCertificat.nbreJours)) {
            this.errorMessages.push('Nbre jours non valide');
            this.validCertificatNbreJours = false;
        } else {
            this.validCertificatNbreJours = true;
        }
    }

    private validateCertificatDateDebut() {
        if (this.stringUtilService.isEmpty(this.selectedCertificat.dateDebut)) {
            this.errorMessages.push('Date debut non valide');
            this.validCertificatDateDebut = false;
        } else {
            this.validCertificatDateDebut = true;
        }
    }

    private validateCertificatDateFin() {
        if (this.stringUtilService.isEmpty(this.selectedCertificat.dateFin)) {
            this.errorMessages.push('Date fin non valide');
            this.validCertificatDateFin = false;
        } else {
            this.validCertificatDateFin = true;
        }
    }

    private validateCertificatPatient() {
        if (this.stringUtilService.isEmpty(this.selectedCertificat.patientVo)) {
            this.errorMessages.push('Patient non valide');
            this.validCertificatPatient = false;
        } else {
            this.validCertificatPatient = true;
        }
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

    hideCreateDialog() {
        this.createCertificatDialog = false;
        this.setValidation(true);
    }

    // getters and setters

    get certificats(): Array<CertificatVo> {
        return this.certificatService.certificats;
    }

    set certificats(value: Array<CertificatVo>) {
        this.certificatService.certificats = value;
    }

    get selectedCertificat(): CertificatVo {
        return this.certificatService.selectedCertificat;
    }

    set selectedCertificat(value: CertificatVo) {
        this.certificatService.selectedCertificat = value;
    }

    get createCertificatDialog(): boolean {
        return this.certificatService.createCertificatDialog;

    }

    set createCertificatDialog(value: boolean) {
        this.certificatService.createCertificatDialog = value;
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

    get validCertificatReference(): boolean {
        return this._validCertificatReference;
    }

    set validCertificatReference(value: boolean) {
        this._validCertificatReference = value;
    }

    get validCertificatCommentaire(): boolean {
        return this._validCertificatCommentaire;
    }

    set validCertificatCommentaire(value: boolean) {
        this._validCertificatCommentaire = value;
    }

    get validCertificatNbreJours(): boolean {
        return this._validCertificatNbreJours;
    }

    set validCertificatNbreJours(value: boolean) {
        this._validCertificatNbreJours = value;
    }

    get validCertificatDateDebut(): boolean {
        return this._validCertificatDateDebut;
    }

    set validCertificatDateDebut(value: boolean) {
        this._validCertificatDateDebut = value;
    }

    get validCertificatDateFin(): boolean {
        return this._validCertificatDateFin;
    }

    set validCertificatDateFin(value: boolean) {
        this._validCertificatDateFin = value;
    }

    get validCertificatPatient(): boolean {
        return this._validCertificatPatient;
    }

    set validCertificatPatient(value: boolean) {
        this._validCertificatPatient = value;
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

}
