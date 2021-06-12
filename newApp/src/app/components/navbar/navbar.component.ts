import { Component, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { AuthService } from '@services/auth.service';
import { ArchiveService } from '@services/archive.service';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
	userObject = null;
	navOpen;
	navOpening;
	mobileOpen;

	constructor(public auth: AuthService, public sharedData: SharedDataService, public archiveService: ArchiveService) {
		if (auth.user$) {
			this.auth.user$.subscribe(u => {
				this.userObject = u;
			})
		}
	}

	ngOnInit(): void {
		this.navOpen = false;
		this.navOpening = false;
		this.mobileOpen = false;
	}

	setFilter(category, subcategory) {
		this.archiveService.filters.categories = [category];
		if (subcategory != 'none') {
			this.archiveService.filters.subcategories = [subcategory];
		} else {
			this.archiveService.filters.subcategories = [];
		}
		this.archiveService.filters.words = "";
		this.archiveService.fillFilters();
		this.archiveService.applyFilters();
	}

	log() {
		console.log(this.mobileOpen)
	}
}
