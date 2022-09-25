import {Component, OnInit} from '@angular/core';
import {MutuelleVo} from "../../../controller/model/Mutuelle.model";
import {SexeVo} from "../../../controller/model/Sexe.model";
import {ConfirmationService, MenuItem, MessageService} from "primeng/api";
import {environment} from "../../../../environments/environment";
import {PatientVo} from "../../../controller/model/Patient.model";
import {PatientService} from "../../../controller/service/Patient.service";
import {DatePipe} from "@angular/common";
import {RoleService} from "../../../controller/service/role.service";
import {Router} from "@angular/router";
import {AuthService} from "../../../controller/service/Auth.service";
import {ExportService} from "../../../controller/service/Export.service";
import {SexeService} from "../../../controller/service/Sexe.service";
import {MutuelleService} from "../../../controller/service/Mutuelle.service";
import {ConsultationVo} from "../../../controller/model/Consultation.model";

@Component({
    selector: 'app-patient',
    templateUrl: './patient.component.html',
    styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {

    // declarations
    findByCriteriaShow: boolean = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Patient';
    yesOrNoMutualise: any[] = [];
    yesOrNoArchive: any[] = [];
    sexes: Array<SexeVo>;
    mutuelles: Array<MutuelleVo>;

    selectedPatients: PatientVo[];
    deletePatientsDialog: boolean = false;

    constructor(private datePipe: DatePipe, private patientService: PatientService, private messageService: MessageService,
                private confirmationService: ConfirmationService, private roleService: RoleService, private router: Router,
                private authService: AuthService, private exportService: ExportService, private sexeService: SexeService,
                private mutuelleService: MutuelleService
    ) {
    }

    ngOnInit(): void {
        this.loadPatients();
        this.initExport();
        this.initCol();
        this.loadSexe();
        this.loadMutuelle();
        this.yesOrNoMutualise = [{label: 'Mutualise', value: null}, {label: 'Oui', value: 1}, {label: 'Non', value: 0}];
        this.yesOrNoArchive = [{label: 'Archive', value: null}, {label: 'Oui', value: 1}, {label: 'Non', value: 0}];
    }

    // methods
    public async loadPatients() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Patient', 'list');
        isPermistted ? this.patientService.findAll().subscribe(patients => this.patients = patients, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }

    public async deleteSelectedPatients() {
        const isPermistted = await this.roleService.isPermitted('Patient', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous supprimer ces patients ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.selectedPatients.forEach( (e) => {
                            this.patientService.delete(e).subscribe(status => {
                                if (status > 0) {
                                    const position = this.patients.indexOf(e);
                                    position > -1 ? this.patients.splice(position, 1) : false;
                                }
                            }, error => console.log(error));
                        }
                    )
                }
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'Problème de permission'
            });
        }
    }

    public searchRequest() {
        this.patientService.findByCriteria(this.searchPatient).subscribe(patients => {

            this.patients = patients;
            // this.searchPatient = new PatientVo();
        }, error => console.log(error));
    }

    private initCol() {
        this.cols = [
            {field: 'cin', header: 'Cin'},
            {field: 'nom', header: 'Nom'},
            {field: 'prenom', header: 'Prenom'},
            {field: 'dateNaissance', header: 'Date naissance'},
            {field: 'sexe?.code', header: 'Sexe'},
            {field: 'adresse', header: 'Adresse'},
            {field: 'telephone', header: 'Telephone'},
            {field: 'numeroCnss', header: 'Numero cnss'},
            {field: 'mutualise', header: 'Mutualise'},
            {field: 'mutuelle?.code', header: 'Mutuelle'},
            {field: 'archive', header: 'Archive'},
            {field: 'dateArchivage', header: 'Date archivage'},
            {field: 'dateCreation', header: 'Date creation'},
        ];
    }

    public async editPatient(patient: PatientVo) {
        const isPermistted = await this.roleService.isPermitted('Patient', 'edit');
        if (isPermistted) {
            this.patientService.findByIdWithAssociatedList(patient).subscribe(res => {
                this.selectedPatient = res;
                this.selectedPatient.dateNaissance = new Date(patient.dateNaissance);
                this.selectedPatient.dateArchivage = new Date(patient.dateArchivage);
                this.selectedPatient.dateCreation = new Date(patient.dateCreation);
                this.editPatientDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }
    }


    public async viewPatient(patient: PatientVo) {
        const isPermistted = await this.roleService.isPermitted('Patient', 'view');
        if (isPermistted) {
            this.patientService.findByIdWithAssociatedList(patient).subscribe(res => {
                this.selectedPatient = res;
                this.selectedPatient.dateNaissance = new Date(patient.dateNaissance);
                this.selectedPatient.dateArchivage = new Date(patient.dateArchivage);
                this.selectedPatient.dateCreation = new Date(patient.dateCreation);
                this.viewPatientDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
    }

    public async openCreatePatient(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if (isPermistted) {
            this.selectedPatient = new PatientVo();
            this.createPatientDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
    }

    public async archiverPatient(patient: PatientVo) {
        const isPermistted = await this.roleService.isPermitted('Patient', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous archiver cet élément (Patient) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.patientService.archiver(patient).subscribe(status => {
                        const myIndex = this.patients.indexOf(patient);
                        this.patients[myIndex] = status;
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Succès',
                            detail: 'Patient archivé',
                            life: 3000
                        });
                    }, error => console.log(error));
                }
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'Problème de permission'
            });
        }
    }

    public async desarchiverPatient(patient: PatientVo) {
        const isPermistted = await this.roleService.isPermitted('Patient', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous désarchiver cet élément (Patient) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.patientService.desarchiver(patient).subscribe(status => {
                        const myIndex = this.patients.indexOf(patient);
                        this.patients[myIndex] = status;
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Succès',
                            detail: 'Patient désarchivé',
                            life: 3000
                        });
                    }, error => console.log(error));
                }
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'Problème de permission'
            });
        }
    }


    public async deletePatient(patient: PatientVo) {
        const isPermistted = await this.roleService.isPermitted('Patient', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous supprimer cet élément (Patient) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.patientService.delete(patient).subscribe(status => {
                        if (status > 0) {
                            const position = this.patients.indexOf(patient);
                            position > -1 ? this.patients.splice(position, 1) : false;
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Succès',
                                detail: 'Patient Supprimé',
                                life: 3000
                            });
                        }

                    }, error => console.log(error));
                }
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'Problème de permission'
            });
        }
    }

    public async loadSexe() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Patient', 'list');
        isPermistted ? this.sexeService.findAll().subscribe(sexes => this.sexes = sexes, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async loadMutuelle() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Patient', 'list');
        isPermistted ? this.mutuelleService.findAll().subscribe(mutuelles => this.mutuelles = mutuelles, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async duplicatePatient(patient: PatientVo) {

        this.patientService.findByIdWithAssociatedList(patient).subscribe(
            res => {
                this.initDuplicatePatient(res);
                this.selectedPatient = res;
                this.selectedPatient.id = null;
                this.createPatientDialog = true;

            });

    }

    initDuplicatePatient(res: PatientVo) {

    }

    initExport(): void {
        this.excelPdfButons = [
            {
                label: 'CSV', icon: 'pi pi-file', command: () => {
                    this.prepareColumnExport();
                    this.exportService.exportCSV(this.criteriaData, this.exportData, this.fileName);
                }
            },
            {
                label: 'XLS', icon: 'pi pi-file-excel', command: () => {
                    this.prepareColumnExport();
                    this.exportService.exportExcel(this.criteriaData, this.exportData, this.fileName);
                }
            },
            {
                label: 'PDF', icon: 'pi pi-file-pdf', command: () => {
                    this.prepareColumnExport();
                    this.exportService.exportPdf(this.criteriaData, this.exportData, this.fileName);
                }
            }
        ];
    }

    prepareColumnExport(): void {
        this.exportData = this.patients.map(e => {
            return {
                'Cin': e.cin,
                'Nom': e.nom,
                'Prenom': e.prenom,
                'Date naissance': this.datePipe.transform(e.dateNaissance, 'dd-MM-yyyy'),
                'Sexe': e.sexeVo?.code,
                'Adresse': e.adresse,
                'Telephone': e.telephone,
                'Numero cnss': e.numeroCnss,
                'Mutualise': e.mutualise ? 'Vrai' : 'Faux',
                'Mutuelle': e.mutuelleVo?.code,
                'Archive': e.archive ? 'Vrai' : 'Faux',
                'Date archivage': this.datePipe.transform(e.dateArchivage, 'dd-MM-yyyy'),
                'Date creation': this.datePipe.transform(e.dateCreation, 'dd-MM-yyyy'),
            };
        });

        this.criteriaData = [{
            'Cin': this.searchPatient.cin ? this.searchPatient.cin : environment.emptyForExport,
            'Nom': this.searchPatient.nom ? this.searchPatient.nom : environment.emptyForExport,
            'Prenom': this.searchPatient.prenom ? this.searchPatient.prenom : environment.emptyForExport,
            'Date naissance Min': this.searchPatient.dateNaissanceMin ? this.datePipe.transform(this.searchPatient.dateNaissanceMin, this.dateFormat) : environment.emptyForExport,
            'Date naissance Max': this.searchPatient.dateNaissanceMax ? this.datePipe.transform(this.searchPatient.dateNaissanceMax, this.dateFormat) : environment.emptyForExport,
            'Sexe': this.searchPatient.sexeVo?.code ? this.searchPatient.sexeVo?.code : environment.emptyForExport,
            'Adresse': this.searchPatient.adresse ? this.searchPatient.adresse : environment.emptyForExport,
            'Telephone': this.searchPatient.telephone ? this.searchPatient.telephone : environment.emptyForExport,
            'Numero cnss': this.searchPatient.numeroCnss ? this.searchPatient.numeroCnss : environment.emptyForExport,
            'Mutualise': this.searchPatient.mutualise ? (this.searchPatient.mutualise ? environment.trueValue : environment.falseValue) : environment.emptyForExport,
            'Mutuelle': this.searchPatient.mutuelleVo?.code ? this.searchPatient.mutuelleVo?.code : environment.emptyForExport,
            'Archive': this.searchPatient.archive ? (this.searchPatient.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport,
            'Date archivage Min': this.searchPatient.dateArchivageMin ? this.datePipe.transform(this.searchPatient.dateArchivageMin, this.dateFormat) : environment.emptyForExport,
            'Date archivage Max': this.searchPatient.dateArchivageMax ? this.datePipe.transform(this.searchPatient.dateArchivageMax, this.dateFormat) : environment.emptyForExport,
            'Date creation Min': this.searchPatient.dateCreationMin ? this.datePipe.transform(this.searchPatient.dateCreationMin, this.dateFormat) : environment.emptyForExport,
            'Date creation Max': this.searchPatient.dateCreationMax ? this.datePipe.transform(this.searchPatient.dateCreationMax, this.dateFormat) : environment.emptyForExport,
        }];

    }

    // getters and setters

    get patients(): Array<PatientVo> {
        return this.patientService.patients;
    }

    set patients(value: Array<PatientVo>) {
        this.patientService.patients = value;
    }

    get patientSelections(): Array<PatientVo> {
        return this.patientService.patientSelections;
    }

    set patientSelections(value: Array<PatientVo>) {
        this.patientService.patientSelections = value;
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

    get editPatientDialog(): boolean {
        return this.patientService.editPatientDialog;
    }

    set editPatientDialog(value: boolean) {
        this.patientService.editPatientDialog = value;
    }

    get viewPatientDialog(): boolean {
        return this.patientService.viewPatientDialog;
    }

    set viewPatientDialog(value: boolean) {
        this.patientService.viewPatientDialog = value;
    }

    get searchPatient(): PatientVo {
        return this.patientService.searchPatient;
    }

    set searchPatient(value: PatientVo) {
        this.patientService.searchPatient = value;
    }

    get dateFormat() {
        return environment.dateFormatList;
    }
}
