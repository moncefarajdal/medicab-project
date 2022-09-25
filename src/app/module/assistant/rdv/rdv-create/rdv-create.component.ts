import {Component, OnInit} from '@angular/core';
import {DatePipe} from "@angular/common";
import {RdvService} from "../../../../controller/service/Rdv.service";
import {StringUtilService} from "../../../../controller/service/StringUtil.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {RoleService} from "../../../../controller/service/role.service";
import {PatientService} from "../../../../controller/service/Patient.service";
import {environment} from "../../../../../environments/environment";
import {PatientVo} from "../../../../controller/model/Patient.model";
import {RdvVo} from "../../../../controller/model/Rdv.model";

@Component({
    selector: 'app-rdv-create',
    templateUrl: './rdv-create.component.html',
    styleUrls: ['./rdv-create.component.scss']
})
export class RdvCreateComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();
    _validRdvNumeroRdv = true;
    _validRdvDateRdv = true;
    _validRdvPatient = true;
    _validRdvPresence = true;
    _validPatientCin = true;
    _validPatientNom = true;
    _validPatientPrenom = true;
    _validPatientDateNaissance = true;
    _validPatientSexe = true;
    _validPatientAdresse = true;
    _validPatientTelephone = true;
    _validPatientNumeroCnss = true;

    sameDayRdv: RdvVo[];

    constructor(private datePipe: DatePipe, private rdvService: RdvService, private stringUtilService: StringUtilService,
                private roleService: RoleService, private messageService: MessageService, private router: Router,
                private patientService: PatientService, private datepipe: DatePipe,
                private confirmationService: ConfirmationService) {
    }

    ngOnInit(): void {
        this.selectedPatient = new PatientVo();
        this.patientService.findAll().subscribe((data) => this.patients = data);
    }

    private setValidation(value: boolean) {
        // this.validRdvNumeroRdv = value;
        this.validRdvDateRdv = value;
        this.validRdvPatient = value;
        // this.validRdvPresence = value;
    }

    public save() {
        this.submitted = true;
        this.validateForm();
        if (this.errorMessages.length === 0) {
            // console.log(this.selectedRdv.dateRdv = new Date(this.formatDate(this.selectedRdv.dateRdv)));
            this.selectedRdv.dateRdv = this.datepipe.transform(this.selectedRdv.dateRdv, 'yyyy-MM-dd HH:mm:ss');
            // this.validateRendezVous(this.selectedRdv);
            this.saveWithShowOption(false);
            // console.log(this.formatDate(this.selectedRdv.dateRdv));
            // console.log(this.selectedRdv.dateRdv);
            // console.log(this.datepipe.transform(this.selectedRdv.dateRdv, 'yyyy-MM-dd hh:mm:ss'));
        } else {
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs sur le formulaire'
            });
        }
    }

    public saveWithShowOption(showList: boolean) {
        this.rdvService.save().subscribe(rdv => {
            this.rdvs.push({...rdv});
            this.createRdvDialog = false;
            this.submitted = false;
            this.selectedRdv = new RdvVo();
        }, error => {
            console.log(error);
        });
    }

    // Validation methods
    private validateForm(): void {
        this.errorMessages = new Array<string>();
        // this.validateRdvNumeroRdv();
        this.validateRdvDateRdv();
        this.validateRdvPatient();
        // this.validateRdvPresence();

    }

    private validateRdvNumeroRdv() {
        if (this.stringUtilService.isEmpty(this.selectedRdv.numeroRdv)) {
            this.errorMessages.push('Numero rdv non valide');
            this.validRdvNumeroRdv = false;
        } else {
            this.validRdvNumeroRdv = true;
        }
    }

    private validateRdvDateRdv() {
        if (this.stringUtilService.isEmpty(this.selectedRdv.dateRdv)) {
            this.errorMessages.push('Date rdv non valide');
            this.validRdvDateRdv = false;
        } else {
            this.validRdvDateRdv = true;
        }
    }

    private validateRdvPatient() {
        if (this.stringUtilService.isEmpty(this.selectedRdv.patientVo)) {
            this.errorMessages.push('Patient non valide');
            this.validRdvPatient = false;
        } else {
            this.validRdvPatient = true;
        }
    }

    private validateRdvPresence() {
        if (this.stringUtilService.isEmpty(this.selectedRdv.presence)) {
            this.errorMessages.push('Presence non valide');
            this.validRdvPresence = false;
        } else {
            this.validRdvPresence = true;
        }
    }


    // Open Popup

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

    validateRendezVous(rdv: RdvVo) {
        this.rdvs.forEach(e => {
            if (e.dateRdv.substr(0, 10) == rdv.dateRdv.substr(0, 10)){
                this.sameDayRdv.push(e);
            }
        })
        console.log(this.sameDayRdv);
    }

    getSelectedDate() {
        let selectedDate = this.datepipe.transform(this.selectedRdv.dateRdv, 'yyyy-MM-dd HH:mm:ss');
        this.rdvs.forEach(e => {
            let date = this.datepipe.transform(e.dateRdv, 'yyyy-MM-dd HH:mm:ss');
            if (date.substr(0, 10) == selectedDate.substr(0, 10)) {
                let date1 = new Date(e.dateRdv);
                let date2 = new Date(selectedDate);
                let result = date2.getTime() - date1.getTime();
                console.log(result / 60000)
                if ((result / 60000) < 30) {
                    this.confirmationService.confirm({
                        message: 'Attention, Il y a deja un rendez-vous proche de cette date. Voulez-vous continuer ?',
                        header: 'Confirmation',
                        icon: 'pi pi-exclamation-triangle',
                        accept: () => {
                            // this.rdvService.save().subscribe(status => {
                            // }, error => console.log(error));
                        },
                        reject: () => {
                            this.hideCreateDialog();
                        }
                    });
                }
            }
        })
        // console.log(selectedDate);
    }

    // Methods

    hideCreateDialog() {
        this.createRdvDialog = false;
        this.setValidation(true);
    }

    // Getters and setters

    get rdvs(): Array<RdvVo> {
        return this.rdvService.rdvs;
    }

    set rdvs(value: Array<RdvVo>) {
        this.rdvService.rdvs = value;
    }

    get selectedRdv(): RdvVo {
        return this.rdvService.selectedRdv;
    }

    set selectedRdv(value: RdvVo) {
        this.rdvService.selectedRdv = value;
    }

    get createRdvDialog(): boolean {
        return this.rdvService.createRdvDialog;
    }

    set createRdvDialog(value: boolean) {
        this.rdvService.createRdvDialog = value;
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

    get validRdvNumeroRdv(): boolean {
        return this._validRdvNumeroRdv;
    }

    set validRdvNumeroRdv(value: boolean) {
        this._validRdvNumeroRdv = value;
    }

    get validRdvDateRdv(): boolean {
        return this._validRdvDateRdv;
    }

    set validRdvDateRdv(value: boolean) {
        this._validRdvDateRdv = value;
    }

    get validRdvPatient(): boolean {
        return this._validRdvPatient;
    }

    set validRdvPatient(value: boolean) {
        this._validRdvPatient = value;
    }

    get validRdvPresence(): boolean {
        return this._validRdvPresence;
    }

    set validRdvPresence(value: boolean) {
        this._validRdvPresence = value;
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
