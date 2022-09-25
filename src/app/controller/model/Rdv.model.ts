import {PatientVo} from './Patient.model';


export class RdvVo {

    public id: number;

    public numeroRdv: string;
    // public dateRdv: Date;
    public dateRdv: string;
    public presence: null | boolean;
    public archive: null | boolean;
    public dateArchivage: Date;
    public dateCreation: Date;
    public dateRdvMax: string;
    public dateRdvMin: string;
    public dateArchivageMax: string;
    public dateArchivageMin: string;
    public dateCreationMax: string;
    public dateCreationMin: string;
    public patientVo: PatientVo;

}
