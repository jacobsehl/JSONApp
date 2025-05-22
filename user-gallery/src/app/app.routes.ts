import { Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { AlbumListComponent } from './components/album-list/album-list.component';
import { PhotoListComponent } from './components/photo-list/photo-list.component';

export const routes: Routes = [
  { path: 'users', component: UserListComponent },
  { path: 'users/:id/albums', component: AlbumListComponent },
  { path: 'albums/:id/photos', component: PhotoListComponent },
];