import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {PatientVo} from "../../../../controller/model/Patient.model";
import {CertificatVo} from "../../../../controller/model/Certificat.model";
import {DatePipe} from "@angular/common";
import {CertificatService} from "../../../../controller/service/Certificat.service";
import {RoleService} from "../../../../controller/service/role.service";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {PatientService} from "../../../../controller/service/Patient.service";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-certificat-view',
  templateUrl: './certificat-view.component.html',
  styleUrls: ['./certificat-view.component.scss']
})
export class CertificatViewComponent implements OnInit {

    @ViewChild('invoice') invoiceElement!: ElementRef;

    constructor(private datePipe: DatePipe, private certificatService: CertificatService,
                private roleService: RoleService, private messageService: MessageService,
                private router: Router, private patientService: PatientService) {
    }

    ngOnInit(): void {
        this.selectedPatient = new PatientVo();
        this.patientService.findAll().subscribe((data) => this.patients = data);
    }

    public generatePDF(): void {

        html2canvas(this.invoiceElement.nativeElement, { scale: 3 }).then((canvas) => {
            const imageGeneratedFromTemplate = canvas.toDataURL('image/png');
            const fileWidth = 200;
            const generatedImageHeight = (canvas.height * fileWidth) / canvas.width;
            let PDF = new jsPDF('p', 'mm', 'a4',);
            PDF.addImage(imageGeneratedFromTemplate, 'PNG', 0, 5, fileWidth, generatedImageHeight,);
            PDF.html(this.invoiceElement.nativeElement.innerHTML)
            PDF.save('angular-invoice-pdf-demo.pdf');
        });
    }

    hideViewDialog() {
        this.viewCertificatDialog = false;
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

    get viewCertificatDialog(): boolean {
        return this.certificatService.viewCertificatDialog;
    }

    set viewCertificatDialog(value: boolean) {
        this.certificatService.viewCertificatDialog = value;
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

    get editPatientDialog(): boolean {
        return this.patientService.editPatientDialog;
    }

    set editPatientDialog(value: boolean) {
        this.patientService.editPatientDialog = value;
    }

    get dateFormat() {
        return environment.dateFormatView;
    }

    get dateFormatColumn() {
        return environment.dateFormatList;
    }

}
