import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, ActivationEnd, ActivationStart, Router } from '@angular/router';

@Component({
    selector: 'app-pages',
    templateUrl: './pages.component.html',
    styleUrls: ['./pages.component.scss'],
})
export class PagesComponent implements OnInit {
    public pageName: string;
    constructor(
        private cf: ChangeDetectorRef,
        private router: Router
    ) { }

    ngOnInit() {
        this.router.events.subscribe((v) => {
            if (v instanceof ActivationEnd) {
                const isValidRouter: boolean = this.pageName !== v.snapshot.data.title && v.snapshot.data.title !== undefined;
                this.pageName =  isValidRouter ? v.snapshot.data.title : this.pageName;
                this.cf.markForCheck();
            }
        });
    }
}
