import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { merge } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Logger, UntilDestroy, untilDestroyed } from '@shared';
import { I18nService } from '@app/i18n';

const log = new Logger('App');

@UntilDestroy()
@Component({
  selector: 'app-root',
  // templateUrl: './app.component.html',
  // styleUrls: ['./app.component.scss'],
  template: `
    <nz-layout>
      <nz-sider nzCollapsible [(nzCollapsed)]="isCollapsed" [nzTrigger]="null">
        <ul nz-menu nzTheme="dark" nzMode="inline">
          <li nz-menu-item id="trigger">
            <i
              class="trigger"
              nz-icon
              [nzType]="isCollapsed ? 'menu-unfold' : 'menu-fold'"
              (click)="isCollapsed = !isCollapsed"
            ></i>
          </li>
          <li nz-menu-item (click)="gotoHome()">
            <i nz-icon [nzType]="'home'"></i>
            <span>Home</span>
          </li>
          <li nz-submenu nzTitle="User" nzIcon="user">
            <ul>
              <li nz-menu-item (click)="gotoListUser()">List user</li>
              <li nz-menu-item (click)="gotoAddUser()">Add new User</li>
            </ul>
          </li>
          <li nz-submenu nzTitle="Team" nzIcon="team">
            <ul>
              <li nz-menu-item>Team 1</li>
              <li nz-menu-item>Team 2</li>
            </ul>
          </li>
          <li nz-menu-item>
            <i nz-icon nzType="file"></i>
            <span>File</span>
          </li>
        </ul>
      </nz-sider>
      <nz-layout>
        <nz-header>
          <div class="inlineMenu">
            <div class="logoMobi">
              <div class="logoMobifoneIt"></div>
            </div>
            <!-- <div class="logoMobi"></div> -->
            <ul nz-menu nzMode="horizontal" class="header-menu" id="ul-header">
              <li nz-menu-item><i nz-icon nzType="setting" nzTheme="outline"></i><span>Quản lí</span></li>
              <li nz-menu-item>
                <i nz-icon nzType="fund-projection-screen" nzTheme="outline"></i><span>Báo cáo</span>
              </li>
              <li nz-menu-item><i nz-icon nzType="file" nzTheme="outline"></i><span>Tài liệu</span></li>
            </ul>
            <div class="menuSearch">
              <nz-input-group [nzSuffix]="suffixIconSearch">
                <input type="text" nz-input placeholder="Tìm kiếm" />
              </nz-input-group>
              <ng-template #suffixIconSearch>
                <i nz-icon nzType="search"></i>
              </ng-template>
            </div>
            <button nz-button nzType="primary" nzShape="circle" class="buttonMenu">
              <i nz-icon nzType="plus" nzTheme="outline"></i>
            </button>
            <div class="menuBagde">
              <button nz-button nzType="default" nzShape="circle">
                <i nz-icon nzType="message" nzTheme="outline" class="itemBagde"></i>
              </button>
              <button nz-button nzType="default" nzShape="circle">
                <i nz-icon nzType="bell" nzTheme="outline" class="itemBagde"></i>
              </button>
              <button nz-button nzType="default" nzShape="circle">
                <i nz-icon nzType="poweroff" nzTheme="outline" class="itemBagde"></i>
              </button>
            </div>
          </div>
        </nz-header>
        <br />
        <nz-content>
          <!-- <nz-breadcrumb>
            <nz-breadcrumb-item>User</nz-breadcrumb-item>
            <nz-breadcrumb-item>Bill</nz-breadcrumb-item>
          </nz-breadcrumb> -->
          <div class="inner-content"><router-outlet></router-outlet></div>
        </nz-content>
        <nz-footer>Ant Design ©2020 Implement By Angular</nz-footer>
      </nz-layout>
    </nz-layout>
  `,
  styles: [
    `
      .trigger {
        /* font-size: 18px;
        padding: 0 24px; */
        cursor: pointer;
        transition: color 0.3s;
      }
      #trigger {
        margin-bottom: 50px;
      }
      .trigger:hover {
        color: #1890ff;
      }

      .logo {
        height: 32px;
        background: rgba(255, 255, 255, 0.2);
        margin: 16px;
      }

      nz-header {
        background: #fff;
        padding: 0;
      }

      nz-content {
        margin: 0 16px;
      }

      nz-breadcrumb {
        margin: 16px 0;
      }

      .inner-content {
        padding: 24px;
        background: #fff;
        min-height: 360px;
      }

      nz-footer {
        text-align: center;
      }
      i {
        width: '10%';
      }
      nz-header div ul {
        width: '30%' !important;
      }
      /* nz-header span ul li{
        line-height: 64px;
      } */
      nz-header div ul li i {
        vertical-align: middle;
        padding-bottom: 3px;
      }
      .inlineMenu {
        display: flex;
        align-items: center;
        vertical-align: middle;
      }
      .logoMobi {
        height: 32px;
        background: rgba(255, 255, 255, 0.2);
        width: 30%;
      }
      .logoMobifoneIt {
        position: static;
        margin-left: 20px;
        width: 182px;
        height: 31px;
        left: 20px;
        top: 14.5px;
        background-image: url(../MobileFoneIT_logo02.png);
      }
      .header-menu {
        height: 64px;
        display: flex;
        align-items: center;
      }
      .menuSearch {
        height: 64px;
        background: rgba(255, 255, 255, 0.2);
        width: 25%;
        /* vertical-align: middle; */
        display: flex;
        align-items: center;
        padding-left: 4%;
      }
      /* #ul-header {
        width:30% !important;
        justify-content: center;
      } */
      nz-input-group {
        border-radius: 10px !important;
      }
      .buttonMenu {
        margin-left: 2%;
        /* line-height: 15px; */
        display: flex;
        align-items: center;
      }
      .menuBagde {
        width: 25%;
        height: 64px;
        background: rgba(255, 255, 255, 0.2);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      nz-header div div button {
        margin-left: 10px;
        display: flex;
        align-items: center;
      }
    `,
  ],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private translateService: TranslateService,
    private i18nService: I18nService
  ) {}
  isCollapsed = false;
  ngOnInit() {
    // Setup logger
    if (environment.production) {
      Logger.enableProductionMode();
    }

    log.debug('init');

    // Setup translations
    this.i18nService.init(environment.defaultLanguage, environment.supportedLanguages);

    const onNavigationEnd = this.router.events.pipe(filter((event) => event instanceof NavigationEnd));

    // Change page title on navigation or language change, based on route data
    merge(this.translateService.onLangChange, onNavigationEnd)
      .pipe(
        map(() => {
          let route = this.activatedRoute;
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter((route) => route.outlet === 'primary'),
        switchMap((route) => route.data),
        untilDestroyed(this)
      )
      .subscribe((event) => {
        const title = event['title'];
        if (title) {
          this.titleService.setTitle(this.translateService.instant(title));
        }
      });
  }

  ngOnDestroy() {
    this.i18nService.destroy();
  }
  gotoListUser(): void {
    this.router.navigate(['list-user']);
  }
  gotoAddUser(): void {
    this.router.navigate(['add-user']);
  }
  gotoHome(): void {
    this.router.navigate(['home']);
  }
}
