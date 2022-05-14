import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';

export interface Data {
  id: number;
  status: string;
  name: string;
  typeNow: string;
  accountNumber: string;
  accountName: string;
  bank: number;
  errorDetail: string;
  description: string;
  isRequest: number;
  phoneNumber: string;
  disabled: boolean;
}
@Component({
  selector: 'app-test-search',
  templateUrl: './test-table.component.html',
  styleUrls: ['./test-table.component.css'],
})

// eslint-disable-next-line @angular-eslint/component-class-suffix
export class TestSearch implements OnInit {
  validateForm!: FormGroup;
  panels = [
    {
      active: true,
      name: 'Tìm kiếm',
      disabled: false,
    },
  ];
  // checked = true;
  checked = false;
  loading = false;
  indeterminate = false;
  listOfData: readonly Data[] = [];
  listOfCurrentPageData: readonly Data[] = [];
  setOfCheckedId = new Set<number>();
  isVisible = false;
  listOfDisplayData = [...this.listOfData];

  // submitForm(): void {
  //   console.log('submit', this.validateForm.value);
  // }

  constructor(private fb: FormBuilder, private msg: NzMessageService) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      listFile: [null, [Validators.required]],
      cancelType: [null, [Validators.required]],
      isdnFile: [null],
      successFile: [null],
      cancelTime: [null],
      shop: [null],
      cancelFalse: [false],
      cancelKK: [true],
      cancelUAC: [true],
    });
    this.listOfData = new Array(100).fill(0).map((_, index) => ({
      id: index,
      status: 'Hoạt động',
      name: `Edward King ${index}`,
      typeNow: 'Text',
      accountNumber: '184323256',
      accountName: 'Hoàng Anh',
      bank: 19424,
      phoneNumber: '0911469899',
      errorDetail: 'Lỗi số 1',
      description: 'Vì lỗi số 1',
      isRequest: index % 2,
      disabled: index % 2 === 1,
    }));
    this.listOfDisplayData = [...this.listOfData];
  }

  resetForm(): void {
    this.validateForm.reset();
  }
  handleChange(info: NzUploadChangeParam): void {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      this.msg.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      this.msg.error(`${info.file.name} file upload failed.`);
    }
  }
  onCurrentPageDataChange(listOfCurrentPageData: readonly Data[]): void {
    this.listOfCurrentPageData = listOfCurrentPageData;
    this.refreshCheckedStatus();
  }
  refreshCheckedStatus(): void {
    const listOfEnabledData = this.listOfCurrentPageData.filter(({ disabled }) => !disabled);
    this.checked = listOfEnabledData.every(({ id }) => this.setOfCheckedId.has(id));
    this.indeterminate = listOfEnabledData.some(({ id }) => this.setOfCheckedId.has(id)) && !this.checked;
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(checked: boolean): void {
    this.listOfCurrentPageData
      .filter(({ disabled }) => !disabled)
      .forEach(({ id }) => this.updateCheckedSet(id, checked));
    this.refreshCheckedStatus();
  }
  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }
  searchStatus(e: Event): void {
    console.log((e.target as HTMLInputElement).value);
    this.listOfDisplayData = this.listOfData.filter(
      (item: Data) => item.status.indexOf((e.target as HTMLInputElement).value) !== -1
    );
  }
}
