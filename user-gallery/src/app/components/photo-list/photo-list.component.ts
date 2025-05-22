import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-photo-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './photo-list.component.html',
  styleUrl: './photo-list.component.scss'
})

export class PhotoListComponent implements OnInit {
  photos: any[] = [];
  albumId!: number;
  loading = true;
  error: string | null = null;

  constructor(private route: ActivatedRoute, private api: ApiService) {}

  ngOnInit(): void {
    this.albumId = Number(this.route.snapshot.paramMap.get('id'));
    this.api.getPhotos(this.albumId).subscribe({
      next: (data) => {
        this.photos = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to Load Photos';
        this.loading = false;
      }
    })
  }
}