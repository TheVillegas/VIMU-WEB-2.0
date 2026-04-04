import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { SeoService } from './core/services/seo.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  standalone: false,
  styleUrl: './app.scss'
})
export class App implements OnInit {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private seo: SeoService
  ) {}

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let route = this.activatedRoute;
        while (route.firstChild) route = route.firstChild;
        return route.snapshot.data;
      }),
      filter(data => data['title'] && data['description'])
    ).subscribe(data => {
      this.seo.update({
        title: data['title'],
        description: data['description'],
        canonical: data['canonical']
      });
    });
  }
}
