import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Contact} from "../models/Contact.model";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor(private http:HttpClient) { }

  public getAllContacts():Observable<Array<Contact>>{
    return this.http.get<Array<Contact>>(environment.backendHost+`/contact/list`);
  }
  public saveContact(contact:Contact):Observable<Contact>{
    return this.http.post<Contact>(environment.backendHost+`/contact`,contact);
  }

  public updateContact(contact:Contact):Observable<Contact>{
    return this.http.put<Contact>(environment.backendHost+`/contact/update`,contact);
  }

  public deleteContact(id: number) {
    return this.http.delete(environment.backendHost+`/contact/${id}`)
  }

}
