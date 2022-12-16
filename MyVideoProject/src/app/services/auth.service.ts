import { Injectable } from '@angular/core';

import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

import { Observable, of} from 'rxjs';
import { map, delay, filter, switchMap } from 'rxjs/operators';

import IUser from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
private usersCollection: AngularFirestoreCollection<IUser>;
public isAuthenticated$: Observable<boolean>;
public isAuthenticatedWithDelay$: Observable<boolean>;
private redirect = false;

  constructor(
    private auth: AngularFireAuth, 
    private db: AngularFirestore,
    private router: Router,
    private route: ActivatedRoute
    ) {
    this.usersCollection = db.collection('users');
    this.isAuthenticated$ = auth.user.pipe(
      map(user => !!user)
    );
    this.isAuthenticatedWithDelay$ = this.isAuthenticated$.pipe(
      delay(1000)
    )
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map(e => this.route.firstChild),
      switchMap(route => route?.data ?? of({}))
    ).subscribe(data => {
      this.redirect = data.authOnly ?? false;
    });
  }

  public async createUser(userData: IUser) {
    if (!userData.password) {
      throw new Error('Password not provided!');
    }

    const userCredentials = await this.auth.createUserWithEmailAndPassword(
      userData.email as string,
      userData.password as string
    );

    if(!userCredentials.user) {
      throw new Error("User can't be found");
    };

    await this.usersCollection.doc(userCredentials.user.uid).set({
      name: userData.name,
      email: userData.email,
      age: userData.age,
      phoneNumber: userData.phoneNumber,
    });

    await userCredentials.user.updateProfile({
      displayName: userData.name
    });
  }

  public async logout($event?: Event) {
    if($event) {
      $event.preventDefault();
    }

    await this.auth.signOut();

   
    await this.router.navigate(['/']);

  }
}
