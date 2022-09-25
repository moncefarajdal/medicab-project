import {ConsultationVo} from './Consultation.model';
import {TypePaiementVo} from "./TypePaiement.model";


export class PaiementVo {

    public id: number;

    public reference: string;
    public datePaiement: Date;
    public montant: number;
    public archive: null | boolean;
    public dateArchivage: Date;
    public dateCreation: Date;
    public datePaiementMax: string;
    public datePaiementMin: string;
    public montantMax: string;
    public montantMin: string;
    public dateArchivageMax: string;
    public dateArchivageMin: string;
    public dateCreationMax: string;
    public dateCreationMin: string;
    public consultationVo: ConsultationVo;
    public typePaiementVo: TypePaiementVo;

}
