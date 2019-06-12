import { Component, OnInit, Injector } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { DomSanitizer } from '@angular/platform-browser';
import { ComponentBase } from '@shared/component-base';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PersonServiceProxy, PersonDto } from '@shared/service-proxies/service-proxies';
import { ToastrService } from 'ngx-toastr';

@Component({
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
  animations: [routerTransition()]
})
export class DemoComponent extends ComponentBase implements OnInit {

  closeResult: string;

  private input: PersonDto;

  private persons: PersonDto[];

  private modalReference: NgbModalRef;

  constructor(
    private personService: PersonServiceProxy,
    injector: Injector,
    sanitizer: DomSanitizer,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {
    super(injector);
  }

  ngOnInit() {
    this.loadPersons();
  }

  loadPersons(): void {
    this.personService.getAll()
      .finally(() => { })
      .subscribe((result: PersonDto[]) => {
        this.persons = result;
      });
  }

  open(content) {

    this.input = new PersonDto();

    this.modalReference = this.modalService.open(content);

    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  edit(person: PersonDto, content: any) {
    this.input = person;
    this.modalReference = this.modalService.open(content);

    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  delete(person: PersonDto) {

    this.personService.delete(person)
      .finally(() => { })
      .subscribe(() => {
        this.toastr.info(`Person '${person.name}' has been deleted.`, 'Person Deleted');
        this.loadPersons();
      });
  }

  save() {

    if (this.input.id > 0) {

      this.personService.update(this.input)
        .finally(() => { })
        .subscribe(() => {
          this.toastr.success(`Person '${this.input.name}' has been updated.`, 'Person Updated');
          this.modalReference.close();
          this.loadPersons();
        });

    } else {

      this.personService.add(this.input)
        .finally(() => { })
        .subscribe(() => {
          this.toastr.success(`Person '${this.input.name}' has been created.`, 'Person Created');
          this.modalReference.close();
          this.loadPersons();
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
