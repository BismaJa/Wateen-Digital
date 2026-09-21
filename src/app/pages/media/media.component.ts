import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-media',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './media.component.html',
  styleUrl: './media.component.scss'
})
export class MediaComponent {
  readonly cards = [
    {
      title: 'Blogs',
      image: 'assets/images/media/Blog.jpg',
      cta: 'VIEW BLOGS',
      link: '/media/blog'
    },
    {
      title: 'DVCS',
      image: 'assets/images/media/DVCS.jpg',
      cta: 'VIEW DVCS',
      link: '/dvcs'
    },
    {
      title: 'Announcements',
      image: 'assets/images/media/Announcements-Media.jpg',
      cta: 'VIEW ANNOUNCEMENTS',
      link: '/announcements'
    }
  ];
}
