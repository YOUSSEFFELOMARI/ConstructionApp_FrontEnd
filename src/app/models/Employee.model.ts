import {Month} from "./Month.model";
import {ConstructionStie} from "./ConstructionStie.model";

export interface Employee{
  name: string;
  lastName:string;
  homeAddress:string;
  salary:string;
  phone:string;
  months: Month[];
  constructionSite:ConstructionStie;
}
