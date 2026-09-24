import { Component, computed, effect, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { map } from 'rxjs/operators';
import { UncodeAnimDirective } from '../../shared/uncode-anim.directive';
import { BLOG_POSTS } from './blogs-data';
import { SHARE_ICONS } from './share-icons';

/** Public site address used in share links. */
const SITE_URL = 'https://wateendigital.ae';

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

  /**
   * Share links for the current article. Always the public article address (not
   * localhost during development), so shared links work for everyone.
   */
  readonly shareLinks = computed(() => {
    const post = this.post();
    if (!post) return [];
    const url = encodeURIComponent(`${SITE_URL}/media/blog/${post.slug}/`);
    const title = encodeURIComponent(post.title);
    const image = encodeURIComponent(`${SITE_URL}/${post.image}`);
    const both = `${title}%20${url}`;
    return [
      { name: 'Facebook', icon: 'facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${url}` },
      { name: 'X', icon: 'x', href: `https://twitter.com/intent/tweet?url=${url}&text=${title}` },
      { name: 'Threads', icon: 'threads', href: `https://www.threads.net/intent/post?text=${both}` },
      {
        name: 'Pinterest',
        icon: 'pinterest',
        href: `https://pinterest.com/pin/create/button/?url=${url}&media=${image}&description=${title}`
      },
      { name: 'LinkedIn', icon: 'linkedin', href: `https://www.linkedin.com/sharing/share-offsite/?url=${url}` },
      { name: 'WhatsApp', icon: 'whatsapp', href: `https://api.whatsapp.com/send?text=${both}` },
      { name: 'Bluesky', icon: 'bluesky', href: `https://bsky.app/intent/compose?text=${both}` },
      { name: 'Xing', icon: 'xing', href: `https://www.xing.com/spi/shares/new?url=${url}` },
      // As on the live site: the paper plane shares by email (opens the visitor's mail app).
      { name: 'Email', icon: 'email', href: `mailto:?subject=${title}&body=${both}` }
    ].map((link) => ({ ...link, glyph: SHARE_ICONS[link.icon], external: !link.href.startsWith('mailto:') }));
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

  /** Article links to site pages ("/services/…") navigate in-app instead of reloading. */
  onArticleClick(event: MouseEvent): void {
    const link = (event.target as HTMLElement).closest('a');
    const href = link?.getAttribute('href');
    if (!href?.startsWith('/') || event.ctrlKey || event.metaKey || event.shiftKey || event.button !== 0) return;
    event.preventDefault();
    this.router.navigateByUrl(href);
  }
}
