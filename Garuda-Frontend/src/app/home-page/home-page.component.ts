import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Map, AuthenticationType } from 'azure-maps-control';
import { DataCoordService } from '../Services/data-coord.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { webSocket } from 'rxjs/webSocket';
import { Router } from '@angular/router';
import * as atlas from 'azure-maps-control';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {


  @ViewChild('map', { static: true })
  public mapContainer: ElementRef;
 public selected = 'All';
 public selected1 = 'All';
 public ProductDetails: object = [];
 public dataLog5: object = [];
 color: any;
 color2: any;
 color3: any;
 color4: any;
  showDialog = false;
  coords: any;
  map: any;
  imgFlag = false;
  datasource: any;
  policyDataSource: any;
  polygonLayer: any;
  response: any;
  drone1: any;
  drone2: any;
  drone3: any;
  drone4: any;
  droneBat1: any;
  droneBat2: any;
  droneBat3: any;
  droneBat4: any;
  droneStatus1: any;
  droneStatus2: any;
  droneStatus3: any;
  droneStatus4: any;
  dataLog = [];
  droneLog = [];
  dataLog1 = [];
  droneLog1 = [];
  lat1: any;
  long1: any;
  lat2: any;
  long2: any;
  lat3: any;
  long3: any;
  lat4: any;
  long4: any;
  lat5: any;
  long5: any;
  lat6: any;
  long6: any;
  lat7: any;
  long7: any;
  lat8: any;
  long8: any;
  lat9: any;
  long9: any;
  lat10: any;
  long10: any;
  a: any;
  b: any;
  c: any;
  d: any;
  e: any;
  data = {
    temperature: -18,
    humidity: 80,
    shock: 0.1281,
    tilt: 20,
    speed: 50,
    tdlBattery: 60,
    mobileBattery: 40,
    monitored: false,
    selectedOrders: [],
    driver: null,
    truck: null,
    route: null,
    routePath: null,
    scheduleTime: null,
    startPoint: null,
    endPoint: null,
    dropPoint: null,
    status: 'Ready',
    tenantId: '4001',
    routeId: 'R01',
    tripId: 'TP-004',
    distance: 0,
    eta: 0
  }
  constructor(private router: Router, private dataService: DataCoordService, private toastr: ToastrManager,private elementRef: ElementRef) { }

  public ngOnInit(): void {
    this.color = 'black';
    this.imgFlag = false;
    this.onLogin();
    this.dataService.logList().subscribe(
      (data: any) => {
        console.log(data);
        this.dataLog.push(data);
        this.lat1 = data[0].latitude;
        this.long1 = data[0].longitude;
     



        this.onMap1();
      },
      err => {

        console.log(err);
      });




  }

   onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }
    

  myWebSocket = webSocket('wss://ms-iot-api.azurewebsites.net');

  onLogin() {
    console.log('hi');
    this.myWebSocket.subscribe(
      msg => {

        this.response = msg;
        console.log(this.response);
        this.drone1 = this.response.IotData.drone1;
        this.drone2 = this.response.IotData.drone2;
        this.drone3 = this.response.IotData.drone3;
        this.drone4 = this.response.IotData.drone4;
        this.droneStatus1 = this.response.IotData.drone1status;
        this.droneStatus2 = this.response.IotData.drone2status;
        this.droneStatus3 = this.response.IotData.drone3status;
        this.droneStatus4 = this.response.IotData.drone4status;
        this.droneBat1 = this.response.IotData.battery1;
        this.droneBat2 = this.response.IotData.battery2;
        this.droneBat3 = this.response.IotData.battery3;
        this.droneBat4 = this.response.IotData.battery4;
        console.log(this.droneStatus1);
        if(this.droneStatus1 === 'Active') {
          console.log('true');
          this.imgFlag = true;
        }
        else {
          console.log(false);
          this.imgFlag = false;
        }

        if(this.droneBat1<='100' && this.droneBat1>='75')
        {
          this.color = 'darkgreen';
        }
        else  if(this.droneBat1<='74' && this.droneBat1>='60')
        {
          this.color = 'greenyellow';
        }
else if (this.droneBat1<='59' && this.droneBat1>='25')
{
  this.color = 'orange';
}
else if (this.droneBat1<='24' && this.droneBat1>='10')
{
  this.color = 'orangered';
}
else {
  this.color = 'red';
}

if(this.droneBat2<='100' && this.droneBat2>='75')
{
  this.color2 = 'darkgreen';
}
else  if(this.droneBat2<='74' && this.droneBat2>='60')
{
  this.color2 = 'greenyellow';
}
else if (this.droneBat2<='59' && this.droneBat2>='25')
{
this.color2 = 'orange';
}
else if (this.droneBat2<='24' && this.droneBat2>='10')
{
this.color2 = 'orangered';
}
else {
this.color2 = 'red';
}


if(this.droneBat3<='100' && this.droneBat3>='75')
{
  this.color3 = 'darkgreen';
}
else  if(this.droneBat3<='74' && this.droneBat3>='60')
{
  this.color3 = 'greenyellow';
}
else if (this.droneBat3<='59' && this.droneBat3>='25')
{
this.color3 = 'orange';
}
else if (this.droneBat3<='24' && this.droneBat3>='10')
{
this.color3 = 'orangered';
}
else {
this.color3 = 'red';
}

if(this.droneBat4<='100' && this.droneBat4>='75')
{
  this.color4 = 'darkgreen';
}
else  if(this.droneBat4<='74' && this.droneBat4>='60')
{
  this.color4 = 'greenyellow';
}
else if (this.droneBat4<='59' && this.droneBat4>='25')
{
this.color4 = 'orange';
}
else if (this.droneBat4<='24' && this.droneBat4>='10')
{
this.color4 = 'orangered';
}
else {
this.color4 = 'red';
}

      },

      err => console.log(err),
      // Called if WebSocket API signals some kind of error    
      () => console.log('complete')
      // Called when connection is closed (for whatever reason)  

    );



 




  }


  onMap1() {
    console.log(this.dataLog)


//   let unique = this.dataLog.filter(this.onlyUnique);

// console.log(unique);

    this.map = new Map(this.mapContainer.nativeElement, {
      center: [this.long1, this.lat1],
      zoom: 7,
      authOptions: {
        authType: AuthenticationType.subscriptionKey,
        subscriptionKey: 'z4JhPl3K71zFE_c3oBSeRilUG_prQay8cy6_oQ4JvJg'
      }
    });
    this.map.events.add('ready', () => {
      console.log('hi1')
      //  Create a HTML marker and add it to the map.
      console.log(this.dataLog[0])
      let i;
      for (i = 0; i < this.dataLog[0].length; i++) {
        this.droneLog.push(this.dataLog[0][i].drone);
        console.log(this.dataLog[0][i]);
        console.log(this.dataLog[0][i].longitude);

        this.map.markers.add(new atlas.HtmlMarker({
          color: `${this.dataLog[0][i].status == "Danger" ? 'Red' : 'Green'}`,
          text: `${this.dataLog[0][i].status == "Danger" ? 'D' : 'S'}`,
          position: [this.dataLog[0][i].longitude, this.dataLog[0][i].latitude],
          pixelOffset: [5, -18]

        }));
        
      }

    });

  }

  connect() {
 
    this.showDialog = true;
console.log(this.droneLog);
   let unique = this.droneLog.filter(this.onlyUnique);
this.droneLog1.push(unique);
 console.log(this.droneLog1);
 

    this.dataService.logList().subscribe(
      (data: any) => {
        console.log(data);
        this.dataLog1 = data;


        this.dataLog5 = this.dataLog1;
        //this.onMap1();
      },
      err => {

        console.log(err);
      });
     
     // this.dataLog5 = this.dataLog1;

  }

  connect1(x, y) {
    console.log(x + y);

    const bodyData = {
      'drone': x,
      'timestamp': y
    };

    console.log(bodyData);
    this.dataService.log(bodyData).subscribe(
      (data: any) => {
        console.log(data);
        this.toastr.successToastr('Rescue In Progress...', 'Success!', {
          position: 'bottom-full-width', animate: 'slideFromRight'
        });

        this.showDialog = false;
        this.onMap1();
        this.router.navigateByUrl('home-page')
      },
      err => {
        this.toastr.errorToastr(err.message, 'Error!', {
          position: 'bottom-full-width', animate: 'slideFromBottom'
        });

      });
    setTimeout(() => {
      this.dataService.logList().subscribe(
        (data: any) => {
          console.log(data);
          // this.dataLog1 = data;



        },
        err => {

          console.log(err);
        });
    }, 2500);


  }

  closeDialog() {
    this.showDialog = false;
    this.dataService.logList().subscribe(
      (data: any) => {
        console.log(data);
      
      },
      err => {

        console.log(err);
      });
    this.onMap1();

  }

  doSomething(name: string) {
    // console.log(name);
    // console.log(this.dataLog1);
    console.log(name);
//this.dataLog1 = [];
console.log(this.dataLog1)

if(name === 'All') {
  this.dataLog5 = this.dataLog1;
  console.log(this.dataLog5)
  return this.dataLog5
}
    let obj = this.dataLog1.filter(m => m.status === name); 
    console.log(obj) ;
        this.dataLog5 = obj;
        console.log(this.dataLog5);  
        return this.dataLog5;
  }

  doSomething1(name: string) {
    // console.log(name);
    // console.log(this.dataLog1);
    console.log(name);

  }
 
}



