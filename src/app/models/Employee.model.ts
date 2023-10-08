import {Month} from "./Month.model";
import {ConstructionStieDto} from "./ConstructionStie.model";

export interface Employee{
  name: string;
  lastName:string;
  homeAddress:string;
  salary:string;
  phone:string;
  months: Month[];
  constructionSiteDto:ConstructionStieDto;
}
