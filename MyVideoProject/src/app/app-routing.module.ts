import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { MyVideosComponent } from './myVideos/my-videos.component';
import { HomeComponent } from './home/home.component';
import { ClipComponent } from './clip/clip.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ClipService } from './services/clip.service';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'myvideos',
    component: MyVideosComponent
  },
  {
    path: 'clip/:id',
    component: ClipComponent,
    resolve: {
      clip: ClipService
    }
  },
  {
    path: '',
    loadChildren: async () => (await import('./video/video.module')).VideoModule

  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
