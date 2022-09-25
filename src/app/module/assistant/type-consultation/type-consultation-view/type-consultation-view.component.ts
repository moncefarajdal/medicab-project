import { Component, OnInit } from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {TypeConsultationVo} from "../../../../controller/model/TypeConsultation.model";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {RoleService} from "../../../../controller/service/role.service";
import {TypeConsultationService} from "../../../../controller/service/TypeConsultation.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-type-consultation-view',
  templateUrl: './type-consultation-view.component.html',
  styleUrls: ['./type-consultation-view.component.scss']
})
export class TypeConsultationViewComponent implements OnInit {

    constructor(private datePipe: DatePipe, private typeConsultationService: TypeConsultationService,
                private roleService: RoleService, private messageService: MessageService, private router: Router) {
    }

    ngOnInit(): void {
    }

    hideViewDialog() {
        this.viewTypeConsultationDialog = false;
    }

    // getters and setters

    get typeConsultations(): Array<TypeConsultationVo> {
        return this.typeConsultationService.typeConsultations;
    }

    set typeConsultations(value: Array<TypeConsultationVo>) {
        this.typeConsultationService.typeConsultations = value;
    }

    get selectedTypeConsultation(): TypeConsultationVo {
        return this.typeConsultationService.selectedTypeConsultation;
    }

    set selectedTypeConsultation(value: TypeConsultationVo) {
        this.typeConsultationService.selectedTypeConsultation = value;
    }

    get viewTypeConsultationDialog(): boolean {
        return this.typeConsultationService.viewTypeConsultationDialog;

    }

    set viewTypeConsultationDialog(value: boolean) {
        this.typeConsultationService.viewTypeConsultationDialog = value;
    }


    get dateFormat() {
        return environment.dateFormatView;
    }

    get dateFormatColumn() {
        return environment.dateFormatList;
    }

}
