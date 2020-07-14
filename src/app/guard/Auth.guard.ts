import { CoreService } from './../services/core.service';
import { Router, CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private coreService: CoreService, private router: Router) {}

    canActivate() {
        if (this.coreService.isUserIn()) {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}
