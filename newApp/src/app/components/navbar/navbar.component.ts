import { Component, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { AuthService } from '../../services/auth.service';
import { ArchiveService } from '../../services/archive.service';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
	userObject = null;

	constructor(public auth: AuthService, public sharedData: SharedDataService, public archiveService: ArchiveService) {
		if (auth.user$) {
			this.auth.user$.subscribe(u => {
				this.userObject = u;
			})
		}
	}

	ngOnInit(): void {
	}

	dropDown() {
		let wrapper = document.getElementById("genreContainerWrapper");
		wrapper.style.lineHeight = "1.5";
		wrapper.style.height = "30px";
		wrapper.style.color = "#FFF";
		wrapper.style.overflow = "visible";
		wrapper.style.marginTop = "0px";
		wrapper.style.backgroundColor = "rgba(0, 113, 189, 0.85)";
		wrapper.style.borderTop = "3px solid #FFF";
	}
	dropUp() {
		let wrapper = document.getElementById("genreContainerWrapper");
		wrapper.style.lineHeight = "0";
		wrapper.style.height = "0px";
		wrapper.style.color = "transparent";
		wrapper.style.overflow = "hidden";
		wrapper.style.marginTop = "-2px;"
		wrapper.style.backgroundColor = "transparent";
		wrapper.style.borderTop = "none";
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

}
