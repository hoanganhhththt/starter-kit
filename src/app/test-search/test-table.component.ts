import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';

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
  checked = true;

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
      shope: [null],
      cancelFalse: [false],
      cancelKK: [true],
      cancelUAC: [true],
    });
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
}
