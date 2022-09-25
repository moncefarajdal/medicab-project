import {ConstanteVo} from './Constante.model';
import {ConsultationVo} from './Consultation.model';


export class ConstanteConsultationVo {

    public id: number;

    public valeur: string;
    public archive: null | boolean;
    public dateArchivage: Date;
    public dateCreation: Date;
    public dateArchivageMax: string;
    public dateArchivageMin: string;
    public dateCreationMax: string;
    public dateCreationMin: string;
    public constanteVo: ConstanteVo;
    public consultationVo: ConsultationVo;

}
