import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "../../controller/guards/auth.guard";
import {ConsultationMedecinComponent} from "./consultation-medecin/consultation-medecin.component";
import {LoginMedecinComponent} from "./login-medecin/login-medecin.component";
import {OrdonnanceComponent} from "./ordonnance/ordonnance.component";
import {PrescriptionComponent} from "./prescription/prescription.component";
import {MedicamentComponent} from "./medicament/medicament.component";
import {CertificatComponent} from "./certificat/certificat.component";
import {MedecinDashboardComponent} from "./medecin-dashboard/medecin-dashboard.component";
import {DepenseComponent} from "./depense/depense.component";

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'login',
                children: [
                    {
                        path: '',
                        component: LoginMedecinComponent,
                        canActivate: [AuthGuard]
                    }
                ]
            },
            {
                path: 'consultation',
                children: [
                    {
                        path: '',
                        component: ConsultationMedecinComponent,
                        canActivate: [AuthGuard]
                    }
                ]
            },
            {
                path: 'dashboard',
                children: [
                    {
                        path: '',
                        component: MedecinDashboardComponent,
                        canActivate: [AuthGuard]
                    }
                ]
            },
            {
                path: 'ordonnance',
                children: [
                    {
                        path: '',
                        component: OrdonnanceComponent,
                        canActivate: [AuthGuard]
                    }
                ]
            },
            {
                path: 'prescription',
                children: [
                    {
                        path: '',
                        component: PrescriptionComponent,
                        canActivate: [AuthGuard]
                    }
                ]
            },
            {
                path: 'medicament',
                children: [
                    {
                        path: '',
                        component: MedicamentComponent,
                        canActivate: [AuthGuard]
                    }
                ]
            },
            {
                path: 'certificat',
                children: [
                    {
                        path: '',
                        component: CertificatComponent,
                        canActivate: [AuthGuard]
                    }
                ]
            },
            {
                path: 'depense',
                children: [
                    {
                        path: '',
                        component: DepenseComponent,
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
export class MedecinRoutingModule { }
