import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, switchMap, tap } from 'rxjs';
import { Trainer } from '../models/trainer';

const {apiTrainers, apiKey} = environment;


@Injectable({
  providedIn: 'root'
})

export class LoginService {

  constructor(private readonly http: HttpClient) {}

    public login(username: string): Observable<Trainer>{
      return this.checkUsername(username)
        .pipe(
          switchMap((trainer: Trainer | undefined) => {
            if(trainer === undefined){
              return this.createUser(username);
            }
            return of(trainer);
          }),
          tap((trainer: Trainer) =>{
            console.log("Tap trainer: " + trainer)
          })

        )
    }

    //Get user by username
    private checkUsername(username: string): Observable<Trainer | undefined>{
      return this.http.get<Trainer[]>(`${apiTrainers}?username=${username}`)
      .pipe(
        map((response: Trainer[]) => response.pop())
      )
    }

    //Create new user
    private createUser(username: string): Observable<Trainer>{

      const trainer = {
        username,
        pokemon: []
      };

      const headers = new HttpHeaders({
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      });

      return this.http.post<Trainer>(apiTrainers, trainer, {
        headers
      })
    }
  }

