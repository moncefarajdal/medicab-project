import {Component, OnInit} from '@angular/core';
import {TypePaiementService} from "../../../../controller/service/TypePaiement.service";
import {TypePaiementVo} from "../../../../controller/model/TypePaiement.model";
import {environment} from "../../../../../environments/environment";
import {ConfirmationService, MessageService} from "primeng/api";
import {RoleService} from "../../../../controller/service/role.service";
import {Router} from "@angular/router";
import {AuthService} from "../../../../controller/service/Auth.service";

@Component({
    selector: 'app-type-paiement-list',
    templateUrl: './type-paiement-list.component.html',
    styleUrls: ['./type-paiement-list.component.scss']
})
export class TypePaiementListComponent implements OnInit {

    constructor(private typePaiementServie: TypePaiementService, private messageService: MessageService,
                private confirmationService: ConfirmationService, private roleService: RoleService,
                private router: Router, private authService: AuthService,) {
    }

    ngOnInit(): void {
        this.loadTypePaiements();
    }

    public async loadTypePaiements() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('TypePaiement', 'list');
        isPermistted ? this.typePaiementServie.findAll().subscribe(typePaiements => this.typePaiements = typePaiements, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }

    public async viewTypePaiement(typePaiement: TypePaiementVo) {
        const isPermistted = await this.roleService.isPermitted('TypePaiement', 'view');
        if (isPermistted) {
            this.typePaiementServie.findByIdWithAssociatedList(typePaiement).subscribe(res => {
                this.selectedTypePaiement = res;
                this.viewTypePaiementDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
    }

    public async openCreateTypeConsultation(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if (isPermistted) {
            this.selectedTypePaiement = new TypePaiementVo();
            this.createTypePaiementDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
    }

    // getters and setters

    get typePaiements(): Array<TypePaiementVo> {
        return this.typePaiementServie.typePaiements;
    }

    set typePaiements(value: Array<TypePaiementVo>) {
        this.typePaiementServie.typePaiements = value;
    }

    get typePaiementSelections(): Array<TypePaiementVo> {
        return this.typePaiementServie.typePaiementSelections;
    }

    set typeConsultationSelections(value: Array<TypePaiementVo>) {
        this.typePaiementServie.typePaiementSelections = value;
    }

    get selectedTypePaiement(): TypePaiementVo {
        return this.typePaiementServie.selectedTypePaiement;
    }

    set selectedTypePaiement(value: TypePaiementVo) {
        this.typePaiementServie.selectedTypePaiement = value;
    }

    get createTypePaiementDialog(): boolean {
        return this.typePaiementServie.createTypePaiementDialog;
    }

    set createTypePaiementDialog(value: boolean) {
        this.typePaiementServie.createTypePaiementDialog = value;
    }

    get editTypePaiementDialog(): boolean {
        return this.typePaiementServie.editTypePaiementDialog;
    }

    set editTypePaiementDialog(value: boolean) {
        this.typePaiementServie.editTypePaiementDialog = value;
    }

    get viewTypePaiementDialog(): boolean {
        return this.typePaiementServie.viewTypePaiementDialog;
    }

    set viewTypePaiementDialog(value: boolean) {
        this.typePaiementServie.viewTypePaiementDialog = value;
    }

    get searchTypePaiement(): TypePaiementVo {
        return this.typePaiementServie.searchTypePaiement;
    }

    set searchTypePaiement(value: TypePaiementVo) {
        this.typePaiementServie.searchTypePaiement = value;
    }

    get dateFormat() {
        return environment.dateFormatList;
    }
}
