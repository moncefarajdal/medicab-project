import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedecinRoutingModule } from './medecin-routing.module';
import { ConsultationMedecinComponent } from './consultation-medecin/consultation-medecin.component';
import { ConsultationMedecinListComponent } from './consultation-medecin/consultation-medecin-list/consultation-medecin-list.component';
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {TableModule} from "primeng/table";
import {InputNumberModule} from "primeng/inputnumber";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CalendarModule} from "primeng/calendar";
import {ToolbarModule} from "primeng/toolbar";
import {SplitButtonModule} from "primeng/splitbutton";
import {AssistantRoutingModule} from "../assistant/assistant-routing.module";
import {ButtonModule} from "primeng/button";
import {ToastModule} from "primeng/toast";
import {FileUploadModule} from "primeng/fileupload";
import {DialogModule} from "primeng/dialog";
import {RadioButtonModule} from "primeng/radiobutton";
import {RatingModule} from "primeng/rating";
import {PasswordModule} from "primeng/password";
import {CheckboxModule} from "primeng/checkbox";
import {InputTextModule} from "primeng/inputtext";
import {MessageModule} from "primeng/message";
import {MessagesModule} from "primeng/messages";
import {InputTextareaModule} from "primeng/inputtextarea";
import {MenuModule} from "primeng/menu";
import {ChartModule} from "primeng/chart";
import {TabViewModule} from "primeng/tabview";
import {InputSwitchModule} from "primeng/inputswitch";
import { LoginMedecinComponent } from './login-medecin/login-medecin.component';
import { OrdonnanceComponent } from './ordonnance/ordonnance.component';
import { OrdonnanceListComponent } from './ordonnance/ordonnance-list/ordonnance-list.component';
import { OrdonnanceCreateComponent } from './ordonnance/ordonnance-create/ordonnance-create.component';
import { OrdonnanceEditComponent } from './ordonnance/ordonnance-edit/ordonnance-edit.component';
import { OrdonnanceViewComponent } from './ordonnance/ordonnance-view/ordonnance-view.component';
import { PrescriptionComponent } from './prescription/prescription.component';
import { PrescriptionListComponent } from './prescription/prescription-list/prescription-list.component';
import { PrescriptionCreateComponent } from './prescription/prescription-create/prescription-create.component';
import { PrescriptionEditComponent } from './prescription/prescription-edit/prescription-edit.component';
import { PrescriptionViewComponent } from './prescription/prescription-view/prescription-view.component';
import { CategorieMedicamentComponent } from './categorie-medicament/categorie-medicament.component';
import { CategorieMedicamentListComponent } from './categorie-medicament/categorie-medicament-list/categorie-medicament-list.component';
import { CategorieMedicamentCreateComponent } from './categorie-medicament/categorie-medicament-create/categorie-medicament-create.component';
import { CategorieMedicamentEditComponent } from './categorie-medicament/categorie-medicament-edit/categorie-medicament-edit.component';
import { CategorieMedicamentViewComponent } from './categorie-medicament/categorie-medicament-view/categorie-medicament-view.component';
import { MedicamentComponent } from './medicament/medicament.component';
import { MedicamentListComponent } from './medicament/medicament-list/medicament-list.component';
import { MedicamentCreateComponent } from './medicament/medicament-create/medicament-create.component';
import { MedicamentEditComponent } from './medicament/medicament-edit/medicament-edit.component';
import { MedicamentViewComponent } from './medicament/medicament-view/medicament-view.component';
import { ConsultationMedecinCreateComponent } from './consultation-medecin/consultation-medecin-create/consultation-medecin-create.component';
import { ConsultationMedecinEditComponent } from './consultation-medecin/consultation-medecin-edit/consultation-medecin-edit.component';
import { ConsultationMedecinViewComponent } from './consultation-medecin/consultation-medecin-view/consultation-medecin-view.component';
import {AssistantModule} from "../assistant/assistant.module";
import { CertificatComponent } from './certificat/certificat.component';
import { CertificatListComponent } from './certificat/certificat-list/certificat-list.component';
import { CertificatCreateComponent } from './certificat/certificat-create/certificat-create.component';
import { CertificatEditComponent } from './certificat/certificat-edit/certificat-edit.component';
import { CertificatViewComponent } from './certificat/certificat-view/certificat-view.component';
import {NgxPrintModule} from 'ngx-print';
import { SupplementConsultationComponent } from './supplement-consultation/supplement-consultation.component';
import { SupplementConsultationCreateComponent } from './supplement-consultation/supplement-consultation-create/supplement-consultation-create.component';
import { SupplementConsultationEditComponent } from './supplement-consultation/supplement-consultation-edit/supplement-consultation-edit.component';
import { SupplementConsultationListComponent } from './supplement-consultation/supplement-consultation-list/supplement-consultation-list.component';
import { SupplementConsultationViewComponent } from './supplement-consultation/supplement-consultation-view/supplement-consultation-view.component';
import { SupplementComponent } from './supplement/supplement.component';
import { SupplementCreateComponent } from './supplement/supplement-create/supplement-create.component';
import { SupplementListComponent } from './supplement/supplement-list/supplement-list.component';
import { SupplementEditComponent } from './supplement/supplement-edit/supplement-edit.component';
import { SupplementViewComponent } from './supplement/supplement-view/supplement-view.component';
import { TypeConsultationMedecinComponent } from './type-consultation-medecin/type-consultation-medecin.component';
import { TypeConsultationMedecinCreateComponent } from './type-consultation-medecin/type-consultation-medecin-create/type-consultation-medecin-create.component';
import { TypeConsultationMedecinEditComponent } from './type-consultation-medecin/type-consultation-medecin-edit/type-consultation-medecin-edit.component';
import { TypeConsultationMedecinListComponent } from './type-consultation-medecin/type-consultation-medecin-list/type-consultation-medecin-list.component';
import { TypeConsultationMedecinViewComponent } from './type-consultation-medecin/type-consultation-medecin-view/type-consultation-medecin-view.component';
import { MedecinDashboardComponent } from './medecin-dashboard/medecin-dashboard.component';
import {NgApexchartsModule} from "ng-apexcharts";
import { DepenseComponent } from './depense/depense.component';
import { DepenseCreateComponent } from './depense/depense-create/depense-create.component';
import { DepenseEditComponent } from './depense/depense-edit/depense-edit.component';
import { DepenseListComponent } from './depense/depense-list/depense-list.component';
import { DepenseViewComponent } from './depense/depense-view/depense-view.component';
import { ChargeComponent } from './charge/charge.component';
import { ChargeCreateComponent } from './charge/charge-create/charge-create.component';
import { ChargeEditComponent } from './charge/charge-edit/charge-edit.component';
import { ChargeListComponent } from './charge/charge-list/charge-list.component';
import { ChargeViewComponent } from './charge/charge-view/charge-view.component';
import { TypeChargeComponent } from './type-charge/type-charge.component';
import { TypeChargeCreateComponent } from './type-charge/type-charge-create/type-charge-create.component';
import { TypeChargeEditComponent } from './type-charge/type-charge-edit/type-charge-edit.component';
import { TypeChargeListComponent } from './type-charge/type-charge-list/type-charge-list.component';
import { TypeChargeViewComponent } from './type-charge/type-charge-view/type-charge-view.component';
import { TarifChargeComponent } from './tarif-charge/tarif-charge.component';
import { TarifChargeCreateComponent } from './tarif-charge/tarif-charge-create/tarif-charge-create.component';


@NgModule({
  declarations: [
    ConsultationMedecinComponent,
    ConsultationMedecinListComponent,
    LoginMedecinComponent,
    OrdonnanceComponent,
    OrdonnanceListComponent,
    OrdonnanceCreateComponent,
    OrdonnanceEditComponent,
    OrdonnanceViewComponent,
    PrescriptionComponent,
    PrescriptionListComponent,
    PrescriptionCreateComponent,
    PrescriptionEditComponent,
    PrescriptionViewComponent,
    CategorieMedicamentComponent,
    CategorieMedicamentListComponent,
    CategorieMedicamentCreateComponent,
    CategorieMedicamentEditComponent,
    CategorieMedicamentViewComponent,
    MedicamentComponent,
    MedicamentListComponent,
    MedicamentCreateComponent,
    MedicamentEditComponent,
    MedicamentViewComponent,
    ConsultationMedecinCreateComponent,
    ConsultationMedecinEditComponent,
    ConsultationMedecinViewComponent,
    CertificatComponent,
    CertificatListComponent,
    CertificatCreateComponent,
    CertificatEditComponent,
    CertificatViewComponent,
    SupplementConsultationComponent,
    SupplementConsultationCreateComponent,
    SupplementConsultationEditComponent,
    SupplementConsultationListComponent,
    SupplementConsultationViewComponent,
    SupplementComponent,
    SupplementCreateComponent,
    SupplementListComponent,
    SupplementEditComponent,
    SupplementViewComponent,
    TypeConsultationMedecinComponent,
    TypeConsultationMedecinCreateComponent,
    TypeConsultationMedecinEditComponent,
    TypeConsultationMedecinListComponent,
    TypeConsultationMedecinViewComponent,
    MedecinDashboardComponent,
    DepenseComponent,
    DepenseCreateComponent,
    DepenseEditComponent,
    DepenseListComponent,
    DepenseViewComponent,
    ChargeComponent,
    ChargeCreateComponent,
    ChargeEditComponent,
    ChargeListComponent,
    ChargeViewComponent,
    TypeChargeComponent,
    TypeChargeCreateComponent,
    TypeChargeEditComponent,
    TypeChargeListComponent,
    TypeChargeViewComponent,
    TarifChargeComponent,
    TarifChargeCreateComponent
  ],
    imports: [
        NgApexchartsModule,
        NgxPrintModule,
        CommonModule,
        MedecinRoutingModule,
        ConfirmDialogModule,
        TableModule,
        InputNumberModule,
        DropdownModule,
        FormsModule,
        CalendarModule,
        ToolbarModule,
        SplitButtonModule,
        ButtonModule,
        ToastModule,
        ToolbarModule,
        SplitButtonModule,
        DropdownModule,
        CalendarModule,
        FileUploadModule,
        DialogModule,
        RadioButtonModule,
        RatingModule,
        PasswordModule,
        CheckboxModule,
        InputTextModule,
        ReactiveFormsModule,
        MessageModule,
        MessagesModule,
        InputTextareaModule,
        MenuModule,
        ChartModule,
        TabViewModule,
        InputSwitchModule,
        AssistantModule,
    ]
})
export class MedecinModule { }
