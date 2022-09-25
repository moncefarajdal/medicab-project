import {OrdonnanceVo} from './Ordonnance.model';
import {PaiementVo} from './Paiement.model';
import {PrescriptionVo} from './Prescription.model';
import {PatientVo} from './Patient.model';
import {TypeConsultationVo} from './TypeConsultation.model';
import {MutuelleVo} from './Mutuelle.model';
import {ConstanteConsultationVo} from './ConstanteConsultation.model';
import {SupplementConsultationVo} from "./SupplementConsultation.model";


export class ConsultationVo {

    public id: number;

    public reference: string;
    public dateConsultation: Date;
    // public tarif = 0;
    public tarif: number;
    public mutualise: null | boolean;
    public archive: null | boolean;
    public dateArchivage: Date;
    public dateCreation: Date;
    public dateConsultationMax: string;
    public dateConsultationMin: string;
    public tarifMax: string;
    public tarifMin: string;
    public dateArchivageMax: string;
    public dateArchivageMin: string;
    public dateCreationMax: string;
    public dateCreationMin: string;
    public typeConsultationVo: TypeConsultationVo;
    public patientVo: PatientVo;
    public mutuelleVo: MutuelleVo;
    public paiementsVo: Array<PaiementVo>;
    public ordonnancesVo: Array<OrdonnanceVo>;
    public constanteConsultationsVo: Array<ConstanteConsultationVo>;
    public prescriptionsVo: Array<PrescriptionVo>;
    public supplementConsultationsVo: Array<SupplementConsultationVo>

}
