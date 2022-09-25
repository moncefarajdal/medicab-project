import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginMedecinComponent} from "../medecin/login-medecin/login-medecin.component";
import {AuthGuard} from "../../controller/guards/auth.guard";
import {ConsultationMedecinComponent} from "../medecin/consultation-medecin/consultation-medecin.component";
import {OrdonnanceComponent} from "../medecin/ordonnance/ordonnance.component";
import {PrescriptionComponent} from "../medecin/prescription/prescription.component";
import {MedicamentComponent} from "../medecin/medicament/medicament.component";
import {CertificatComponent} from "../medecin/certificat/certificat.component";
import {RegisterComponent} from "./register/register.component";

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
                path: 'register',
                children: [
                    {
                        path: '',
                        component: RegisterComponent,
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
export class PatientRoutingModule { }
