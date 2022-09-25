import {CategorieMedicamentVo} from './CategorieMedicament.model';


export class MedicamentVo {

    public id: number;

    public codeMedicament: string;
    public libelle: string;
    public archive: null | boolean;
    public dateArchivage: Date;
    public dateCreation: Date;
                public dateArchivageMax: string ;
                public dateArchivageMin: string ;
                public dateCreationMax: string ;
                public dateCreationMin: string ;
      public categorieMedicamentVo: CategorieMedicamentVo ;

}
