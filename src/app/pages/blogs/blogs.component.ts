import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UncodeAnimDirective } from '../../shared/uncode-anim.directive';
import { BLOG_POSTS, BlogPost } from './blogs-data';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [DatePipe, RouterLink, UncodeAnimDirective],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.scss'
})
export class BlogsComponent {
  readonly posts = BLOG_POSTS;

  imageStyle(post: BlogPost): string {
    return `url('${post.image}')`;
  }
}
