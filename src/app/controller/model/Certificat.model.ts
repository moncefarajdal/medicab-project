import {PatientVo} from './Patient.model';


export class CertificatVo {

    public id: number;

    public reference: string;
    public commentaire: string;
    public nbreJours: number;
    public dateDebut: Date;
    public dateFin: Date;
    public archive: null | boolean;
    public dateArchivage: Date;
    public dateCreation: Date;
    public nbreJoursMax: string;
    public nbreJoursMin: string;
    public dateDebutMax: string;
    public dateDebutMin: string;
    public dateFinMax: string;
    public dateFinMin: string;
    public dateArchivageMax: string;
    public dateArchivageMin: string;
    public dateCreationMax: string;
    public dateCreationMin: string;
    public patientVo: PatientVo;

}
