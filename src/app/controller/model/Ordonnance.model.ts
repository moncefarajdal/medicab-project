import {ConsultationVo} from './Consultation.model';


export class OrdonnanceVo {

    public id: number;

    public reference: string;
    public description: string;
    public dateOrdonnance: Date;
    public archive: null | boolean;
    public dateArchivage: Date;
    public dateCreation: Date;
                public dateOrdonnanceMax: string ;
                public dateOrdonnanceMin: string ;
                public dateArchivageMax: string ;
                public dateArchivageMin: string ;
                public dateCreationMax: string ;
                public dateCreationMin: string ;
      public consultationVo: ConsultationVo ;

}
