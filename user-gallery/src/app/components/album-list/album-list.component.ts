import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-album-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './album-list.component.html',
  styleUrl: './album-list.component.scss'
})
export class AlbumListComponent implements OnInit {
  albums: any[] = [];
  userId!: number;
  loading = true;
  error: string | null = null;

  constructor(private route: ActivatedRoute, private api: ApiService) {}

  ngOnInit(): void {

    this.userId = Number(this.route.snapshot.paramMap.get('id'));

    this.api.getAlbums(this.userId).subscribe({
      next: async (albums) => {
        const albumsWithThumbnails = await Promise.all(
          albums.map(async (album: any) => {
            const photos: any[] = await this.api.getPhotos(album.id).toPromise();
            return {
              ...album,
              // thumbnailUrl: photos[0]?.thumbnailUrl || null
              // placeholder.com is down on 05/23/25 so we are generating random image instead.
              thumbnailUrl: `https://picsum.photos/seed/${album.id}/150/150`
            };
          })
        );
        this.albums = albumsWithThumbnails;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load albums';
        this.loading = false;
      }
    });
  }
}