import {Component, OnInit} from '@angular/core';
import {Visitor} from './visitor';
import {VisitorService} from './visitor.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-heroes',
  templateUrl: './visitor.component.html',
  styleUrls: [ './visitor.component.css' ]
})
export class VisitorsComponent implements OnInit {
  title = 'Tour of Heroes';
  visitors: Visitor[];
  selectedVisitor: Visitor;

  constructor(
    private visitorService: VisitorService,
    private router: Router
  ) { }

  getRooms(): void {
    this.visitorService.getVisitors().then(visitors => this.visitors = visitors);
  }

  onSelect(visitors: Visitor): void {
    this.selectedVisitor = visitors;
  }

  ngOnInit(): void {
    this.getRooms();
  }

/*  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }*/
}
