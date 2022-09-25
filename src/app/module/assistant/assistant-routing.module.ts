import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GenderComponent} from "./gender/gender.component";
import {RdvComponent} from "./rdv/rdv.component";
import {ConstanteComponent} from "./constante/constante.component";
import {PatientComponent} from "./patient/patient.component";
import {PaiementComponent} from "./paiement/paiement.component";
import {AssistantDashboardComponent} from "./assistant-dashboard/assistant-dashboard.component";
import {AuthGuard} from "../../controller/guards/auth.guard";
// import * as path from "path";
import {LoginComponent} from "./login/login.component";
import {TypeConsultationComponent} from "./type-consultation/type-consultation.component";
import {ConsultationComponent} from "./consultation/consultation.component";
import {ConstanteConsultationComponent} from "./constante-consultation/constante-consultation.component";
import {CalendarComponent} from "./calendar/calendar.component";
import {PatientCreateComponent} from "./patient/patient-create/patient-create.component";

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                children: [
                    {
                        path: '',
                        component: LoginComponent,
                        canActivate: [AuthGuard]
                    }
                ]
            },
            {
                path: 'gender',
                children: [
                    {
                        path: '',
                        component: GenderComponent,
                        canActivate: [AuthGuard]
                    }
                ],
            },
            {
                path: 'type-consultation',
                children: [
                    {
                        path: '',
                        component: TypeConsultationComponent,
                        canActivate: [AuthGuard]
                    }
                ],
            },
            {
                path: 'rendez-vous',
                children: [
                    {
                        path: '',
                        component: RdvComponent,
                        canActivate: [AuthGuard]
                    }
                ]
            },
            {
                path: 'consultation',
                children: [
                    {
                        path: '',
                        component: ConsultationComponent,
                        canActivate: [AuthGuard]
                    }
                ]
            },
            {
                path: 'constante',
                children: [
                    {
                        path: '',
                        component: ConstanteComponent,
                        canActivate: [AuthGuard]
                    }
                ]
            },
            {
                path: 'patient',
                children: [
                    {
                        path: '',
                        component: PatientComponent,
                        canActivate: [AuthGuard]
                    }
                ]
            },
            {
                path: 'patient',
                children: [
                    {
                        path: 'ajouter',
                        component: PatientCreateComponent,
                        canActivate: [AuthGuard]
                    }
                ]
            },
            {
                path: 'paiement',
                children: [
                    {
                        path: '',
                        component: PaiementComponent,
                        canActivate: [AuthGuard]
                    }
                ]
            },
            {
                path: 'dashboard',
                children: [
                    {
                        path: '',
                        component: AssistantDashboardComponent,
                        canActivate: [AuthGuard]
                    }
                ]
            },
            {
                path: 'constante-consultation',
                children: [
                    {
                        path: '',
                        component: ConstanteConsultationComponent,
                        canActivate: [AuthGuard]
                    }
                ]
            },
            {
                path: 'calendar',
                children: [
                    {
                        path: '',
                        component: CalendarComponent,
                        canActivate: [AuthGuard]
                    }
                ]
            },
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssistantRoutingModule { }
