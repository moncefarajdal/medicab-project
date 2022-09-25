import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PatientRoutingModule} from './patient-routing.module';
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
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
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
import { RegisterComponent } from './register/register.component';


@NgModule({
    declarations: [
    RegisterComponent
  ],
    imports: [
        CommonModule,
        PatientRoutingModule,
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
    ]
})
export class PatientModule {
}
