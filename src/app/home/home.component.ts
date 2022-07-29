import { AfterViewInit,Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';
import { Stats } from '../_model/stats.model';
import { ChartConfiguration, ChartDataset, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Router } from '@angular/router';
import { ConcoursService } from '../_services/concours.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,AfterViewInit {
  private roles: string[] = [];
  isLoggedIn = false;
  stats:Stats=new Stats;
  percentage:number;
  isAdmin = false;
  isUser=false;
  concours:any[];
  postes:any[];
  usersNotConfirmed:any;
  
  constructor(private userService: UserService,
    private ConcoursService: ConcoursService,
    private authService:AuthService,
    private tokenStorageService: TokenStorageService,
    private router:Router) { }



  @ViewChild("myDiv") divView: ElementRef;
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public pieChartOptions: ChartConfiguration["options"] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
      },
    },
  };

  
  public labels: string[] = ["Utilisateurs confirmés", "Utilisateurs non confirmés"];
  public pieChartData: ChartDataset[] = [{ 
    data: [0, 0],
    backgroundColor:['#1E90FF','#E97451'],
    hoverBackgroundColor: ['#6495ED', '#FAC898'],
    hoverBorderColor : ['#6495ED', '#FAC898']
  }];
  public pieChartType: ChartType = "pie";

    ngAfterViewInit(): void {
      this.divView.nativeElement.scrollIntoView();
    }
  ngOnInit(): void {
    if (this.tokenStorageService.getToken()) {
      this.isLoggedIn = true;
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      if (this.roles.includes('ROLE_ADMIN') || this.roles.includes('ROLE_RH')) {
        this.isAdmin = true;
      }
    
      this.isUser=this.roles.includes('ROLE_USER');
    }
    this.getConcours();
    
    this.getStats();
  }
redirect() {
  this.router.navigate(['/login']);
}

getConcours() {
  this.ConcoursService.getConcoursActive().subscribe((data: any) => {
    this.concours=data;
    return data;
    });
}
refresh(): void {
  window.location.reload();
}

scroll(el: HTMLElement) {
  el.scrollIntoView({behavior: 'smooth'});
}

getStats() {
  this.authService.getStatistics().subscribe((data: any) => {
    this.stats=data;
    this.percentage=(data.usersConfirmed/data.users)*100;
    this.usersNotConfirmed=this.stats.users-this.stats.usersConfirmed;
    this.pieChartData[0].data = [this.stats.users, this.usersNotConfirmed];
    this.chart.update();
    });
}
}
