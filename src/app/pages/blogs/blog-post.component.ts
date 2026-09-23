import { Component, computed, effect, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { map } from 'rxjs/operators';
import { UncodeAnimDirective } from '../../shared/uncode-anim.directive';
import { BLOG_POSTS } from './blogs-data';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [DatePipe, RouterLink, UncodeAnimDirective],
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blogs.component.scss', './blog-post.component.scss']
})
export class BlogPostComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly title = inject(Title);

  private readonly slug = toSignal(this.route.paramMap.pipe(map((p) => p.get('slug') ?? '')), {
    initialValue: ''
  });

  private readonly index = computed(() => BLOG_POSTS.findIndex((p) => p.slug === this.slug()));
  readonly post = computed(() => BLOG_POSTS[this.index()]);
  /** List is newest first: "newer" is the previous entry, "older" the next. */
  readonly newer = computed(() => BLOG_POSTS[this.index() - 1]);
  readonly older = computed(() => BLOG_POSTS[this.index() + 1]);

  readonly imageStyle = computed(() => {
    const post = this.post();
    return post ? `url('${post.image}'), url('${post.fallback}')` : '';
  });

  constructor() {
    effect(() => {
      const post = this.post();
      if (!post) {
        if (this.slug()) this.router.navigate(['/media/blog']);
        return;
      }
      this.title.setTitle(`${post.title} - Wateen Digital Solutions`);
    });
  }
}
