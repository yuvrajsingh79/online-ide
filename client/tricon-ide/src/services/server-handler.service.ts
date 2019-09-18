import { environment } from '../environments/environment';
import { HttpService } from './http-service.service';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { LanguageTable } from 'src/modals/languages/languages';

@Injectable({
  providedIn: 'root'
})
export class ServerHandlerService {

  private baseUrl: string;

  constructor(private http: HttpService) {
    this.baseUrl = environment.BASE_URL;
  }

  public getAllSuppurtedLangs() {
    console.log('getAllSuppurtedLangs()');
    const queryUrl = this.baseUrl + 'api/lang/';
    return this.http.get<{ langs: LanguageTable }>(queryUrl)
      .pipe(map((body) => body.langs));
  }

  public postCodeToRun(code: string, language: { id: string, version: string, index: string }) {
    console.log('postCodeToRun()');
    const queryUrl = this.baseUrl + 'api/exec/code/';
    // const requestBody = { program: code, lang: language.id, version: language.version };
    const requestBody = { script: code, language: language.id, versionIndex: language.index };
    return this.http.post(queryUrl, requestBody);
  }
}
