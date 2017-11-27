import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Http, Headers } from '@angular/http';

@Injectable()
export class AuthGuardService implements CanActivate {
  headers: Headers;
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return false;
  }

  constructor(


  ) {  }

  auth(userName: string, password: string): void {

  }
}
