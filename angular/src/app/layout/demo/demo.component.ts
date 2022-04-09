import { Component, OnInit, Injector } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { DomSanitizer } from '@angular/platform-browser';
import { ComponentBase } from '@shared/component-base';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ItemServiceProxy, ItemDto } from '@shared/service-proxies/service-proxies';
import { ToastrService } from 'ngx-toastr';

@Component({
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
  animations: [routerTransition()]
})
export class DemoComponent extends ComponentBase implements OnInit {

  closeResult: string;

  private input: ItemDto;

  private items: ItemDto[];

  private modalReference: NgbModalRef;

  constructor(
    private itemService: ItemServiceProxy,
    injector: Injector,
    sanitizer: DomSanitizer,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {
    super(injector);
  }

  ngOnInit() {
    this.loadItems();
  }

  loadItems(): void {
    this.itemService.getAll()
      .finally(() => { })
      .subscribe((result: ItemDto[]) => {
        this.items = result;
      });
  }

  open(content) {

    this.input = new ItemDto();

    this.modalReference = this.modalService.open(content);

    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  edit(item: ItemDto, content: any) {
    this.input = item;
    this.modalReference = this.modalService.open(content);

    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  delete(item: ItemDto) {

    this.itemService.delete(item)
      .finally(() => { })
      .subscribe(() => {
        this.toastr.info(`Item '${item.name}' has been deleted.`, 'Item Deleted');
        this.loadItems();
      });
  }

  save() {

    if (this.input.id > 0) {

      this.itemService.update(this.input)
        .finally(() => { })
        .subscribe(() => {
          this.toastr.success(`Item '${this.input.name}' has been updated.`, 'Item Updated');
          this.modalReference.close();
          this.loadItems();
        });

    } else {

      this.itemService.add(this.input)
        .finally(() => { })
        .subscribe(() => {
          this.toastr.success(`Item '${this.input.name}' has been created.`, 'Item Created');
          this.modalReference.close();
          this.loadItems();
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
