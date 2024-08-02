import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), provideFirebaseApp(() => initializeApp({"projectId":"dabubble-bela-schramm","appId":"1:598525654175:web:495a472052f2a357a61eaa","storageBucket":"dabubble-bela-schramm.appspot.com","apiKey":"AIzaSyBP1mW7yRMYVouwQqUTWbtdNKdGDkj1btA","authDomain":"dabubble-bela-schramm.firebaseapp.com","messagingSenderId":"598525654175"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideStorage(() => getStorage())]
};
