import { Component, OnInit, Injector } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { DomSanitizer } from '@angular/platform-browser';
import { ComponentBase } from '@shared/component-base';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TeamServiceProxy, TeamDto } from '@shared/service-proxies/service-proxies';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-teams',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
  animations: [routerTransition()]
})
export class DemoComponent extends ComponentBase implements OnInit {

  closeResult: string;

  private input: TeamDto;

  private teams: TeamDto[];

  private modalReference: NgbModalRef;

  constructor(
    private teamsService: TeamServiceProxy,
    injector: Injector,
    sanitizer: DomSanitizer,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {
    super(injector);
  }

  ngOnInit() {
    this.loadTeams();
  }

  loadTeams(): void {
    this.teamsService.getAll()
      .finally(() => { })
      .subscribe((result: TeamDto[]) => {
        this.teams = result;
      });
  }

  open(content) {

    this.input = new TeamDto();

    this.modalReference = this.modalService.open(content);

    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  edit(team: TeamDto, content: any) {
    this.input = team;
    this.modalReference = this.modalService.open(content);

    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  delete(team: TeamDto) {

    this.teamsService.delete(team)
      .finally(() => { })
      .subscribe(() => {
        this.toastr.info(`Team '${team.name}' has been deleted.`, 'Team Deleted');
        this.loadTeams();
      });
  }

  save() {

    if (this.input.id > 0) {

      this.teamsService.update(this.input)
        .finally(() => { })
        .subscribe(() => {
          this.toastr.success(`Team '${this.input.name}' has been updated.`, 'Team Updated');
          this.modalReference.close();
          this.loadTeams();
        });

    } else {

      this.teamsService.add(this.input)
        .finally(() => { })
        .subscribe(() => {
          this.toastr.success(`Team '${this.input.name}' has been created.`, 'Team Created');
          this.modalReference.close();
          this.loadTeams();
        });

    }

  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
