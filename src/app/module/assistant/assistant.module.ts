import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AssistantRoutingModule} from './assistant-routing.module';
import {GenderComponent} from './gender/gender.component';
import {ButtonModule} from "primeng/button";
import {ToastModule} from "primeng/toast";
import {ToolbarModule} from "primeng/toolbar";
import {SplitButtonModule} from "primeng/splitbutton";
import {DropdownModule} from "primeng/dropdown";
import {CalendarModule} from "primeng/calendar";
import {TableModule} from "primeng/table";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {FileUploadModule} from "primeng/fileupload";
import {DialogModule} from "primeng/dialog";
import {RadioButtonModule} from "primeng/radiobutton";
import {InputNumberModule} from "primeng/inputnumber";
import {RatingModule} from "primeng/rating";
import { RdvComponent } from './rdv/rdv.component';
import { ConstanteComponent } from './constante/constante.component';
import { PatientComponent } from './patient/patient.component';
import { RdvCreateComponent } from './rdv/rdv-create/rdv-create.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { PatientCreateComponent } from './patient/patient-create/patient-create.component';
import { LoginComponent } from './login/login.component';
import {CheckboxModule} from "primeng/checkbox";
import {PasswordModule} from "primeng/password";
import {InputTextModule} from "primeng/inputtext";
import {MessageModule} from "primeng/message";
import {MessagesModule} from "primeng/messages";
import { ConstanteCreateComponent } from './constante/constante-create/constante-create.component';
import {InputTextareaModule} from "primeng/inputtextarea";
import { PaiementComponent } from './paiement/paiement.component';
import { PaiementCreateComponent } from './paiement/paiement-create/paiement-create.component';
import { AssistantDashboardComponent } from './assistant-dashboard/assistant-dashboard.component';
import {MenuModule} from "primeng/menu";
import {ChartModule} from "primeng/chart";
import { ConstanteViewComponent } from './constante/constante-view/constante-view.component';
import {TabViewModule} from "primeng/tabview";
import {InputSwitchModule} from "primeng/inputswitch";
import { ConstanteEditComponent } from './constante/constante-edit/constante-edit.component';
import { PatientEditComponent } from './patient/patient-edit/patient-edit.component';
import { PatientViewComponent } from './patient/patient-view/patient-view.component';
import { RdvEditComponent } from './rdv/rdv-edit/rdv-edit.component';
import { RdvViewComponent } from './rdv/rdv-view/rdv-view.component';
import { ConsultationComponent } from './consultation/consultation.component';
import { TypeConsultationComponent } from './type-consultation/type-consultation.component';
import { TypeConsultationCreateComponent } from './type-consultation/type-consultation-create/type-consultation-create.component';
import { TypeConsultationEditComponent } from './type-consultation/type-consultation-edit/type-consultation-edit.component';
import { TypeConsultationViewComponent } from './type-consultation/type-consultation-view/type-consultation-view.component';
import { ConsultationEditComponent } from './consultation/consultation-edit/consultation-edit.component';
import { ConsultationCreateComponent } from './consultation/consultation-create/consultation-create.component';
import { ConsultationViewComponent } from './consultation/consultation-view/consultation-view.component';
import { ConstanteConsultationComponent } from './constante-consultation/constante-consultation.component';
import { ConstanteConsultationCreateComponent } from './constante-consultation/constante-consultation-create/constante-consultation-create.component';
import { GenderCreateComponent } from './gender/gender-create/gender-create.component';
import { MutuelleComponent } from './mutuelle/mutuelle.component';
import { MutuelleCreateComponent } from './mutuelle/mutuelle-create/mutuelle-create.component';
import { MutuelleListComponent } from './mutuelle/mutuelle-list/mutuelle-list.component';
import { TypePaiementComponent } from './type-paiement/type-paiement.component';
import { TypePaiementListComponent } from './type-paiement/type-paiement-list/type-paiement-list.component';
import { TypePaiementCreateComponent } from './type-paiement/type-paiement-create/type-paiement-create.component';
import { SourceComponent } from './source/source.component';
import { SourceCreateComponent } from './source/source-create/source-create.component';
import {BreadcrumbModule} from "primeng/breadcrumb";
import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarComponent } from './calendar/calendar.component'; // a plugin!
import { DatePipe } from '@angular/common';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
    dayGridPlugin,
    interactionPlugin
]);

@NgModule({
    declarations: [
        GenderComponent,
        RdvComponent,
        ConstanteComponent,
        PatientComponent,
        RdvCreateComponent,
        PatientCreateComponent,
        LoginComponent,
        ConstanteCreateComponent,
        PaiementComponent,
        PaiementCreateComponent,
        AssistantDashboardComponent,
        ConstanteViewComponent,
        ConstanteEditComponent,
        PatientEditComponent,
        PatientViewComponent,
        RdvEditComponent,
        RdvViewComponent,
        ConsultationComponent,
        TypeConsultationComponent,
        TypeConsultationCreateComponent,
        TypeConsultationEditComponent,
        TypeConsultationViewComponent,
        ConsultationEditComponent,
        ConsultationCreateComponent,
        ConsultationViewComponent,
        ConstanteConsultationComponent,
        ConstanteConsultationCreateComponent,
        GenderCreateComponent,
        MutuelleComponent,
        MutuelleCreateComponent,
        MutuelleListComponent,
        TypePaiementComponent,
        TypePaiementListComponent,
        TypePaiementCreateComponent,
        SourceComponent,
        SourceCreateComponent,
        CalendarComponent
    ],
    imports: [
        CommonModule,
        FullCalendarModule,
        AssistantRoutingModule,
        ButtonModule,
        ToastModule,
        ToolbarModule,
        SplitButtonModule,
        DropdownModule,
        CalendarModule,
        TableModule,
        ConfirmDialogModule,
        FileUploadModule,
        DialogModule,
        RadioButtonModule,
        InputNumberModule,
        RatingModule,
        FormsModule,
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
        BreadcrumbModule,
    ],
    exports: [
        GenderComponent,
        ConstanteCreateComponent,
        ConsultationViewComponent,
        PatientCreateComponent,
        TypeConsultationCreateComponent,
    ],
    providers: [DatePipe],
})
export class AssistantModule {
}
