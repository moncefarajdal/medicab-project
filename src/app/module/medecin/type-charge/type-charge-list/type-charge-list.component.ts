import { Component, OnInit } from '@angular/core';
import {TypeChargeService} from "../../../../controller/service/TypeCharge.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {RoleService} from "../../../../controller/service/role.service";
import {Router} from "@angular/router";
import {AuthService} from "../../../../controller/service/Auth.service";
import {TypeChargeVo} from "../../../../controller/model/TypeCharge.model";
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-type-charge-list',
  templateUrl: './type-charge-list.component.html',
  styleUrls: ['./type-charge-list.component.scss']
})
export class TypeChargeListComponent implements OnInit {

    constructor(private typeChargeServie: TypeChargeService, private messageService: MessageService,
                private confirmationService: ConfirmationService, private roleService: RoleService,
                private router: Router, private authService: AuthService,) {
    }

    ngOnInit(): void {
        this.loadTypeCharges();
    }

    public async loadTypeCharges() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('TypeCharge', 'list');
        isPermistted ? this.typeChargeServie.findAll().subscribe(typeCharges => this.typeCharges = typeCharges, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }

    public async viewTypeCharge(typeCharge: TypeChargeVo) {
        const isPermistted = await this.roleService.isPermitted('TypeCharge', 'view');
        if (isPermistted) {
            this.typeChargeServie.findByIdWithAssociatedList(typeCharge).subscribe(res => {
                this.selectedTypeCharge = res;
                this.viewTypeChargeDialog = true;
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
            this.selectedTypeCharge = new TypeChargeVo();
            this.createTypeChargeDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
    }

    // getters and setters

    get typeCharges(): Array<TypeChargeVo> {
        return this.typeChargeServie.typeCharges;
    }

    set typeCharges(value: Array<TypeChargeVo>) {
        this.typeChargeServie.typeCharges = value;
    }

    get typeChargeSelections(): Array<TypeChargeVo> {
        return this.typeChargeServie.typeChargeSelections;
    }

    set typeConsultationSelections(value: Array<TypeChargeVo>) {
        this.typeChargeServie.typeChargeSelections = value;
    }

    get selectedTypeCharge(): TypeChargeVo {
        return this.typeChargeServie.selectedTypeCharge;
    }

    set selectedTypeCharge(value: TypeChargeVo) {
        this.typeChargeServie.selectedTypeCharge = value;
    }

    get createTypeChargeDialog(): boolean {
        return this.typeChargeServie.createTypeChargeDialog;
    }

    set createTypeChargeDialog(value: boolean) {
        this.typeChargeServie.createTypeChargeDialog = value;
    }

    get editTypeChargeDialog(): boolean {
        return this.typeChargeServie.editTypeChargeDialog;
    }

    set editTypeChargeDialog(value: boolean) {
        this.typeChargeServie.editTypeChargeDialog = value;
    }

    get viewTypeChargeDialog(): boolean {
        return this.typeChargeServie.viewTypeChargeDialog;
    }

    set viewTypeChargeDialog(value: boolean) {
        this.typeChargeServie.viewTypeChargeDialog = value;
    }

    get searchTypeCharge(): TypeChargeVo {
        return this.typeChargeServie.searchTypeCharge;
    }

    set searchTypeCharge(value: TypeChargeVo) {
        this.typeChargeServie.searchTypeCharge = value;
    }

    get dateFormat() {
        return environment.dateFormatList;
    }

}
