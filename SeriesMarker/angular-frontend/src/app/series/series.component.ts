import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { faF, faFloppyDisk, faMinus, faPlus, faTrash, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { CookieService } from 'ngx-cookie-service';
import { SeriesService } from '../services/series.service';
const jwtHelper = new JwtHelperService();

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css']
})
export class SeriesComponent implements OnInit {

  faTrash = faTrashCan;
  faSave = faFloppyDisk;
  faPlus = faPlus;
  faMinus = faMinus;

  title?: string;
  year?: number;
  season: number = 0;
  episode: number = 0;
  series: any[] = [];
  creatorId?: string;
  serieInfo?: any;

  constructor(
    private seriesService: SeriesService,
    private cookie: CookieService
  ) { }

  ngOnInit(): void {
    var token = this.cookie.get("token");
    this.creatorId = jwtHelper.decodeToken(token)._id;
    
    if(!!this.creatorId){
      this.seriesService.getSeries(this.creatorId).subscribe( res => {
        this.series = res;
      });
    }
  }

  refresh(): void {
    if(!!this.creatorId){
      this.seriesService.getSeries(this.creatorId).subscribe( res => {
        this.series = res;
      });
    }
  }

  selectSerie(serie: any): void {
    var query = "";
    if(!!serie.title)
      query += "&t=" + serie.title;
    if(!!serie.year)
      query += "&y=" + serie.year;
    query += "&plot=full";
    this.seriesService.getSerieInfo(query).subscribe( res => {
      console.log(res);
      this.serieInfo = res;
    })
  }

  saveSerie(): void {
    if(!!this.title && !!this.creatorId && this.season >= 0 && this.episode >= 0){
      const serie = {"title": this.title, "year": this.year, "season": this.season, "episode": this.episode, "creatorId": this.creatorId};
      this.seriesService.saveSerie(serie).subscribe( res => {
        this.refresh();
      })
    }
  }

  incSeason(serie: any): void {
    serie.season++;
    this.seriesService.updateSerie(serie).subscribe( res => {
      // console.log(res);
    });
  }

  decSeason(serie: any): void {
    if(serie.season > 0){
      serie.season--;
      this.seriesService.updateSerie(serie).subscribe( res => {
        // console.log(res);
      });
    }
  }

  incEpisode(serie: any): void {
    serie.episode++;
    this.seriesService.updateSerie(serie).subscribe( res => {
      // console.log(res);
    });
  }

  decEpisode(serie: any): void {
    if(serie.episode > 0){
      serie.episode--;
      this.seriesService.updateSerie(serie).subscribe( res => {
        // console.log(res);
      });
    }
  }

  removeSerie(serie: any): void {
    this.seriesService.deleteSerie(serie._id).subscribe( res => {
      this.refresh();
    })
  }
}
