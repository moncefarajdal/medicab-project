import {Component, OnInit} from '@angular/core';
import {PatientService} from "../../../controller/service/Patient.service";
import {RdvService} from "../../../controller/service/Rdv.service";
import {PaiementService} from "../../../controller/service/Paiement.service";
import {PatientVo} from "../../../controller/model/Patient.model";
import {RdvVo} from "../../../controller/model/Rdv.model";
import {RoleService} from "../../../controller/service/role.service";
import {MessageService} from "primeng/api";
import {count} from "rxjs";
import {ConsultationVo} from "../../../controller/model/Consultation.model";
import {ConsultationService} from "../../../controller/service/Consultation.service";
import {PaiementVo} from "../../../controller/model/Paiement.model";
import {Big} from "big.js"

@Component({
    selector: 'app-assistant-dashboard',
    templateUrl: './assistant-dashboard.component.html',
    styleUrls: ['./assistant-dashboard.component.scss']
})
export class AssistantDashboardComponent implements OnInit {

    _patients: PatientVo;
    cols: any[] = [];
    _count: number = 0;
    _revenu: number = 0;
    _i: number = 0;

    _malePatients: number;

    constructor(private patientService: PatientService, private rdvService: RdvService,
                private paiementService: PaiementService, private roleService: RoleService,
                private messageService: MessageService, private consultationService: ConsultationService) {
    }

    ngOnInit(): void {
        this.loadPatients();
        this.loadRdvs();
        this.initCol();
        this.loadConsultations();
        this.loadPaiements();
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

    public async loadPatients() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Patient', 'list');
        isPermistted ? this.patientService.findAll().subscribe(patients => this.patients = patients, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
        this.patients.forEach(e => console.log(e.dateCreation.getMonth()));
    }

    public async loadRdvs() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Rdv', 'list');
        isPermistted ? this.rdvService.findAll().subscribe(rdvs => this.rdvs = rdvs, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }

    public async loadConsultations() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Consultation', 'list');
        isPermistted ? this.consultationService.findAll().subscribe(consultations => this.consultations = consultations, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }

    public async loadPaiements() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Paiement', 'list');
        isPermistted ? this.paiementService.findAll().subscribe(paiements => this.paiements = paiements, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }

    public revenue() {
        this.paiements.forEach(p => {
            // this._revenu += Big(p.montant).toPrecision(2);
            this._revenu = this._revenu + p.montant;
        })
        return this._revenu;
    }

    // getters and setters

    get patients(): Array<PatientVo> {
        return this.patientService.patients;
    }

    set patients(value: Array<PatientVo>) {
        this.patientService.patients = value;
    }

    get rdvs(): Array<RdvVo> {
        return this.rdvService.rdvs;
    }

    set rdvs(value: Array<RdvVo>) {
        this.rdvService.rdvs = value;
    }

    get consultations(): Array<ConsultationVo> {
        return this.consultationService.consultations;
    }

    set consultations(value: Array<ConsultationVo>) {
        this.consultationService.consultations = value;
    }

    get paiements(): Array<PaiementVo> {
        return this.paiementService.paiements;
    }

    set paiements(value: Array<PaiementVo>) {
        this.paiementService.paiements = value;
    }

    get revenu(): number {
        return this._revenu;
    }

    set revenu(value: number) {
        this._revenu = value;
    }

}
