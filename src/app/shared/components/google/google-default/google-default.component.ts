import { AfterViewInit, Component, Input, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { environment } from 'src/environments/environment';

import { Router } from '@angular/router';
import { Loader, LoaderOptions } from 'google-maps';
import { CommonUtils } from 'src/app/shared/utils/common.utils';
declare var self: any;
@Component({
    selector: 'app-google-default',
    templateUrl: './google-default.component.html',
    styleUrls: ['./google-default.component.css']
})


export class GoogleDefaultComponent implements OnInit, AfterViewInit {

    public isBrowser: boolean;
    public isServer: boolean;
    public APP_URL = environment.apiUrl;
    public APP_STORAGE=environment.apiStorage;

    @Input() stores: {
        stores_address: string,
        stores_celphone: string,
        stores_collect: string,
        stores_country_phone_code: string,
        stores_coverage: string,
        stores_delivery: string,
        stores_description: string,
        stores_email: string,
        stores_facebook: string,
        stores_id: number,
        stores_image: string,
        stores_image_url: string,
        stores_instagram: string,
        stores_latitud: number,
        stores_longitud: number,
        stores_name: string,
        stores_uri: string,
        stores_whatsapp: string,
        hours:any,
        payment_card:any,
        today:any
    }[];
    public map: google.maps.Map<HTMLElement>;
    public markers = [];
    public marker;
    public infowindows =[];
    constructor(private router: Router) { }

    ngOnInit(): void {
      //  console.log(this.stores)
      //CommonUtils.loadingWaitingHide()

    }

    ngOnChanges(changes: SimpleChanges) {
        const stores: SimpleChange = changes.stores;
        if (JSON.stringify(stores.previousValue) == JSON.stringify(stores.currentValue)) {

        } else {
           // console.log('prev value: ', stores.previousValue);
           // console.log('got name: ', stores.currentValue);
            this.stores = stores.currentValue;
            //this.markers=[];
            this.deleteMarkers();
            this.infowindows=[];
            this.markers=[];
            for (var i = 0; i < this.stores.length; i++) {
                /*if(this.markers[i]!=null){
                    this.markers[i].setMap(null);
                }
        */
                let marker = new google.maps.Marker({
                    position: new google.maps.LatLng((this.stores[i].stores_latitud), (this.stores[i].stores_longitud)),
                    map: this.map,
                    animation: google.maps.Animation.DROP,
                    icon: {
                        url: this.APP_URL + "assets/images/markers/marker-4.png",
                        // This marker is 20 pixels wide by 32 pixels high.
                        scaledSize: new google.maps.Size(42, 52), // size size: new google.maps.Size(20, 32),
                        // The origin for this image is (0, 0).
                        origin: new google.maps.Point(0, 0),
                        // The anchor for this image is the base of the flagpole at (0, 32).
                        anchor: new google.maps.Point(0, 52)
                    }
                });
                let self = this;
                marker.set("marker_id", i);
                var payments = [];
                for (let index = 0; index < self.stores[i]['payment_card'].length; index++) {//
                    if(index==self.stores[i]['payment_card'].length) break;
                    let e =  self.stores[i]['payment_card'][index];
                    if(typeof e['payment']!= 'undefined'){
                        for (let j = 0; j < e['payment'].length; j++){
                            if(j== e['payment'].length) break;
                            let element = e['payment'][j];
                            payments.push(element.description)//image_url
                        }
                    }
                }

                var hour = "";
                if (self.stores[i]['today']['response'] == 1) {
                    hour = '<p  class="mb-1  pr-2 pl-2  text-left text-primary font-weight-bold">Horario de atención: ' + self.stores[i]['today']['time_start'] + ' - ' + self.stores[i]['today']['time_end'] + '</p>'
                }

                var celphone = "";
                var email = "";
                if (self.stores[i].stores_celphone != "" && self.stores[i].stores_celphone != null) {
                    celphone = '<p  class="mb-1  pr-2 pl-2"><i class="mdi mdi-phone-outline"></i> <a class="text-title" href="tel:' + self.stores[i].stores_celphone + '">' + self.stores[i].stores_celphone + '</a></p>'
                }
                if (self.stores[i].stores_email != "" && self.stores[i].stores_email != null) {
                    email = '<p  class="mb-1  pr-2 pl-2"><i class="mdi mdi-email-outline"></i> <a class="text-title" href="mailto:' + self.stores[i].stores_email + '">' + self.stores[i].stores_email + '</a></p>'
                }

                var collect = "";
                var delivery = "";
                if (self.stores[i].stores_collect != "" && self.stores[i].stores_collect != null) {
                    if (self.stores[i].stores_collect == "NO") {
                        collect = ''
                    } else {
                        collect = '<span  class="mr-2 ">RECOJO EN TIENDA </span>'
                    }
                }
                if (self.stores[i].stores_delivery != "" && self.stores[i].stores_delivery != null) {
                    if (self.stores[i].stores_delivery == "NO") {
                        delivery = ''
                    } else {
                        delivery = '<span  class="mr-2">DELIVERY</span>'
                    }
                }

                var collectDelivery = "";
                if (delivery == "") {
                    collectDelivery = '<p class="mb-1  pr-2 pl-2 text-secondary font-weight-bold font-weight-700">' + collect + '</p>'
                } else if (collect == "") {
                    collectDelivery = '<p class="mb-1 pr-2 pl-2 text-secondary font-weight-bold font-weight-700">' + delivery + '</p>'
                } else {
                    collectDelivery = '<p class="mb-1 pr-2 pl-2 text-secondary font-weight-bold font-weight-700">' + delivery + '/ ' + collect + '</p>'
                }

                let paymentText ="";
                payments.forEach((pay)=>{
                    paymentText+='<span class="badge badge-pill mr-2 text-white badge-primary">' + pay + '</span>'
                    //paymentText+='<img style="max-width: 65px;width: 100%;" data-toggle="tooltip" class="cursor-pointer mr-2" data-placement="top" title="Pago en Efectivo" width="40px"  src="' + pay + '?v=' + Math.floor(Math.random() * 100) + '"/>';
                });
                let stores_uri = self.stores[i].stores_uri;
                var contentString = '<div id="content" style="text-align: left;font-family: Saira, sans-serif;">' +
                    '<div class="media  align-items-center d-flex" style=" flex-direction: row; width: 100%;height: 240px;">' +
                    '<div style="width: 240px;    text-align: center;">'+
                    '<img  style="cursor:pointer ;max-width: 240px;max-height: 245px;"  src="' + self.getImage(self.stores[i].stores_image_url) + '?v=' + Math.floor(Math.random() * 10000000000) + '" class=" img-content" alt="...">' +
                    '<p style="position: absolute; bottom: 0;margin: auto;left: 13%;" class="mb-1 pr-2 text-center pl-2"><button type="button" class="btn-primary border-input mb-2 btn" onclick="goStore(this)" data-uri="'+stores_uri+'">Ver Tienda <i  class="fas fa-store pl-2 pr-2"></i></button></p>' +
                    '</div>'+
                    '<div class="media-body" style="    max-height: 238px;">' +
                    '<h5 class="mb-0 mt-2 pr-2 pl-2  font-weight-bold " >' + self.stores[i].stores_name + '</h5>' +
                    '<div class="mb-2  pr-2 pl-2" style="    font-size: 0.9rem;">'+paymentText+'</div>'+
                    collectDelivery +
                    hour+
                    celphone +
                    email +
                    '<p class=" pr-2 pl-2"><i class="far fa-map"></i> <a class="text-title" target="_blank" href="https://www.google.com/maps/dir/?api=1&destination=' + (self.stores[i].stores_address).replace(/blue/g, "+") + '&travelmode=walking">' + self.stores[i].stores_address + ' <br><small>(Ver en google Maps)</small></a></p>' +

                    '</div>' +
                    '</div>' +
                    '</div>';

                this.infowindows.push(new google.maps.InfoWindow({
                    content: contentString,
                }));

                google.maps.event.addListener(marker, 'click', function () {
                    self.setAnimationMarkesOnAll();
                    self.setCloseInfoWindowsOnAll();
                    //do your stuff
                    if (marker.getAnimation() != null) {
                        marker.setAnimation(null);
                    }
                    else {
                        marker.setAnimation(google.maps.Animation.BOUNCE);
                    }

                    if (self.infowindows[marker.get('marker_id')]) {
                        self.infowindows[marker.get('marker_id')].close();
                    }


                    self.infowindows[marker.get('marker_id')].open(self.map, marker);

                    self.map.panTo({ lat: marker.getPosition().lat(), lng: marker.getPosition().lng() });
                });

                this.markers.push(marker);
                this.markers[i].setMap(this.map);
            }
        }
    }
    clearMarkers() {
        this.setMapOnAll(null);
    }
    setMapOnAll(map: google.maps.Map | null) {
        for (let i = 0; i < this.markers.length; i++) {
            this.markers[i].setMap(map);
        }
    }
    setCloseInfoWindowsOnAll(){
        for (let i = 0; i < this.infowindows.length; i++) {
            this.infowindows[i].close();
        }
    }
    setAnimationMarkesOnAll() {
        for (let i = 0; i < this.markers.length; i++) {
            if (this.markers[i].getAnimation() != null) {
                this.markers[i].setAnimation(null);
            }
        }
    }
    deleteMarkers() {
        this.clearMarkers();
        this.markers = [];
    }//https://developers.google.com/maps/documentation/javascript/examples/marker-remove
    clearOverlays() {
        if (this.markers) {
            for (var i in this.markers) {
                this.markers[i].setMap(null);
            }
        }
    }
    public getImage(image_url) {
        return this.APP_STORAGE+image_url;
    }

    ngAfterViewInit() {
        this.myMap();

    }

    async myMap() {
        //: HTMLInputElement
        self = this;

        const options: LoaderOptions = {
            libraries: ['places']
        };
        let loader: Loader = new Loader('AIzaSyA_cJTN6hLpMuE_fkAcgeAknRWSVk5Ipvo', options);

        const google = await loader.load();

        const myCenter = new google.maps.LatLng(-12.047956, -77.054081);
        const mapCanvas = document.getElementById('google-map');
        const mapOptions = {
            zoom: 12,
            center: myCenter,
            disableDefaultUI: true, // a way to quickly hide all controls
            mapTypeControl: false,
            scaleControl: true,
            zoomControl: false,
            streetViewControl: false,
            overviewMapControl: false,
            maxZoom: 19,
            minZoom: 10,
            zoomControlOptions: {
                style: google.maps.ZoomControlStyle.LARGE
            },
            options: {
                gestureHandling: 'greedy'
            }
        };

        this.map = new google.maps.Map(mapCanvas, mapOptions);

        const toprightControlDiv = document.createElement("div") as HTMLDivElement;
        this.TopRightControl(toprightControlDiv, this.map);

        this.map.controls[google.maps.ControlPosition.TOP_RIGHT].push(toprightControlDiv);


        const topleftControlDiv = document.createElement("div") as HTMLDivElement;
        this.TopLeftControl(topleftControlDiv, this.map);

        this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(topleftControlDiv);

        const centerControlDiv = document.createElement("div") as HTMLDivElement;
        this.TopCenterControl(centerControlDiv, this.map);

        this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);

        this.map.setOptions({
            styles: [{
                featureType: "administrative.country",
                elementType: "labels.text.fill",
                stylers: [{
                    color: "#717171"
                }]
            }, {
                featureType: "administrative.locality",
                elementType: "labels.text.fill",
                stylers: [{
                    color: "#717171"
                }, {
                    visibility: "on"
                }]
            }, {
                featureType: "administrative.locality",
                elementType: "labels.text.stroke",
                stylers: [{
                    visibility: "off"
                }]
            }, {
                featureType: "administrative.neighborhood",
                elementType: "labels.text.fill",
                stylers: [{
                    color: "#999999"
                }]
            }, {
                featureType: "administrative.province",
                elementType: "labels.text.fill",
                stylers: [{
                    color: "#717171"
                }]
            }, {
                featureType: "landscape.man_made",
                elementType: "labels.text",
                stylers: [{
                    visibility: "off"
                }]
            }, {
                featureType: "landscape.natural",
                elementType: "labels.text",
                stylers: [{
                    visibility: "off"
                }]
            }, {
                featureType: "poi",
                elementType: "labels.icon",
                stylers: [{
                    visibility: "off"
                }]
            }, {
                featureType: "poi.medical",
                elementType: "geometry.fill",
                stylers: [{
                    color: "#e4e8eb"
                }]
            }, {
                featureType: "poi.park",
                elementType: "labels.text",
                stylers: [{
                    visibility: "off"
                }]
            }, {
                featureType: "poi.place_of_worship",
                elementType: "geometry.fill",
                stylers: [{
                    color: "#e4e8eb"
                }]
            }, {
                featureType: "poi.school",
                elementType: "geometry.fill",
                stylers: [{
                    color: "#e4e8eb"
                }]
            }, {
                featureType: "poi.school",
                elementType: "labels",
                stylers: [{
                    visibility: "off"
                }]
            }, {
                featureType: "poi.sports_complex",
                elementType: "geometry.fill",
                stylers: [{
                    color: "#b8d99f"
                }]
            }, {
                featureType: "road",
                elementType: "labels.icon",
                stylers: [{
                    visibility: "off"
                }]
            }, {
                featureType: "road",
                elementType: "labels.text.fill",
                stylers: [{
                    color: "#999999"
                }]
            }, {
                featureType: "road.arterial",
                elementType: "labels.icon",
                stylers: [{
                    visibility: "off"
                }]
            }, {
                featureType: "road.highway",
                elementType: "geometry.fill",
                stylers: [{
                    color: "#dddddd"
                }]
            }, {
                featureType: "road.highway",
                elementType: "geometry.stroke",
                stylers: [{
                    color: "#d1d1d1"
                }]
            }, {
                featureType: "transit",
                elementType: "geometry.fill",
                stylers: [{
                    saturation: -100
                }]
            }, {
                featureType: "transit",
                elementType: "geometry.stroke",
                stylers: [{
                    saturation: -100
                }]
            }, {
                featureType: "transit.line",
                stylers: [{
                    weight: 1
                }]
            }, {
                featureType: "transit.line",
                elementType: "labels.icon",
                stylers: [{
                    visibility: "off"
                }]
            }, {
                featureType: "transit.line",
                elementType: "labels.text.fill",
                stylers: [{
                    color: "#717171"
                }]
            }, {
                featureType: "transit.station",
                elementType: "labels.icon",
                stylers: [{
                    saturation: -100
                }, {
                    lightness: 15
                }]
            }, {
                featureType: "transit.station",
                elementType: "labels.text.fill",
                stylers: [{
                    color: "#717171"
                }]
            }, {
                featureType: "transit.station.airport",
                elementType: "labels",
                stylers: [{
                    visibility: "off"
                }]
            }, {
                featureType: "transit.station.bus",
                elementType: "labels",
                stylers: [{
                    visibility: "off"
                }]
            }, {
                featureType: "transit.station.bus",
                elementType: "labels.icon",
                stylers: [{
                    visibility: "off"
                }]
            }, {
                featureType: "transit.station.rail",
                elementType: "labels.icon",
                stylers: [{
                    visibility: "off"
                }]
            }, {
                featureType: "transit.station.rail",
                elementType: "labels.text",
                stylers: [{
                    visibility: "off"
                }]
            }, {
                featureType: "water",
                elementType: "geometry.fill",
                stylers: [{
                    saturation: 55
                }, {
                    lightness: 5
                }]
            }]
        });

        this.map.addListener("click", (e) => {
            //placeMarkerAndPanTo(e.latLng, map);
            this.setAnimationMarkesOnAll();
            this.setCloseInfoWindowsOnAll();
        });
        this.map.addListener('drag', (event) => {
            this.setAnimationMarkesOnAll();
            this.setCloseInfoWindowsOnAll();
        });

    }

    TopCenterControl(controlDiv: HTMLDivElement, map: google.maps.Map) {
        // Set CSS for the control border


        const span = document.createElement("span");
        span.innerHTML = 'Buscar mientras me desplazo en el mapa';
        span.setAttribute('class', 'ml-2');

        const input = document.createElement("input");
        input.type = 'checkbox';
        input.name = 'displacement';//dezplazamiento

        const label = document.createElement("label");
        label.setAttribute('class', 'mb-0');

        label.appendChild(input);
        label.appendChild(span);

        const goDezSearchMapUI = document.createElement("div");
        goDezSearchMapUI.id = "goDezSearchMapUI";
        goDezSearchMapUI.setAttribute('class', 'shadow');

        goDezSearchMapUI.appendChild(label);

        // Set up the click event listener for 'Center Map': Set the center of
        // the map
        // to the current center of the control.
        input.addEventListener("change", () => {
          //  console.log('input');
        });

        controlDiv.appendChild(goDezSearchMapUI);

        //mdi mdi-window-close

    }

    TopLeftControl(controlDiv: HTMLDivElement, map: google.maps.Map) {

        // Set CSS for the control border

        const mdiClose = document.createElement("i");
        mdiClose.setAttribute('class', 'mdi mdi-window-close');

        const ButtonMdiClose = document.createElement("button");
        ButtonMdiClose.appendChild(mdiClose);

        const goCloseUI = document.createElement("div");
        goCloseUI.id = "goCloseUI";
        goCloseUI.setAttribute('class', 'shadow');

        goCloseUI.appendChild(ButtonMdiClose);

        // Set up the click event listener for 'Center Map': Set the center of
        // the map
        // to the current center of the control.
        ButtonMdiClose.addEventListener("click", () => {
            //console.log('close');
            if (document.getElementById('contentGoogle').style.display == 'block' || document.getElementById('contentGoogle').style.display == '') {
                document.getElementById('contentGoogle').style.display = 'none';
                document.getElementById('contentProducts').classList.remove('col-lg-6');
                document.getElementById('contentProducts').classList.add('col-lg-12', 'col-md-12', 'col-sm-12', 'col-12');

                document.getElementById('contentProductCardsVertical').classList.remove('d-none');
                document.getElementById('contentProductCardsHorizontal').classList.add('d-none');

                //document.getElementById('contentProducts').classList.add('col-lg-6');


            } else {
                document.getElementById('contentGoogle').style.display = 'block';
                document.getElementById('contentProducts').classList.remove('col-lg-12');
                document.getElementById('contentProducts').classList.remove('col-md-12');
                document.getElementById('contentProducts').classList.remove('col-sm-12');
                document.getElementById('contentProducts').classList.remove('col-12');
                document.getElementById('contentProducts').classList.add('col-lg-6');
                //

                document.getElementById('contentProductCardsHorizontal').classList.remove('d-none');
                document.getElementById('contentProductCardsVertical').classList.add('d-none');

            }
        });

        controlDiv.appendChild(goCloseUI);

        //mdi mdi-window-close

    }
    TopRightControl(controlDiv: HTMLDivElement, map: google.maps.Map) {

        // Set CSS for the control border

        const mdiMinus = document.createElement("i");
        mdiMinus.setAttribute('class', 'mdi mdi-minus');

        const mdiPlus = document.createElement("i");
        mdiPlus.setAttribute('class', 'mdi mdi-plus');

        const ButtonMdiMinus = document.createElement("button");
        ButtonMdiMinus.appendChild(mdiMinus);

        const ButtonMdiPlus = document.createElement("button");
        ButtonMdiPlus.appendChild(mdiPlus);

        const spanMiddle = document.createElement("span");

        const goZoomUI = document.createElement("div");
        goZoomUI.id = "goZoomUI";
        goZoomUI.setAttribute('class', 'shadow');

        goZoomUI.appendChild(ButtonMdiMinus);
        goZoomUI.appendChild(spanMiddle);
        goZoomUI.appendChild(ButtonMdiPlus);

        // Set up the click event listener for 'Center Map': Set the center of
        // the map
        // to the current center of the control.
        ButtonMdiMinus.addEventListener("click", () => {
           // console.log(map.getZoom());
            map.setZoom(map.getZoom() - 1)
        });
        // Set up the click event listener for 'Set Center': Set the center of
        // the control to the current center of the map.
        ButtonMdiPlus.addEventListener("click", () => {
           // console.log(map.getZoom());
            map.setZoom(map.getZoom() + 1)
        });
        controlDiv.appendChild(goZoomUI);

        //mdi mdi-window-close

    }




    BottomRightControl(controlDiv: HTMLDivElement, map: google.maps.Map) {
        const mdiGPS = document.createElement("i");
        mdiGPS.setAttribute('class', 'mdi mdi-crosshairs-gps');

        const ButtonMdiGPS = document.createElement("button");
        ButtonMdiGPS.appendChild(mdiGPS);

        const goGPSUI = document.createElement("div");
        goGPSUI.id = "goGPSUI";
        goGPSUI.setAttribute('class', 'shadow');

        goGPSUI.appendChild(ButtonMdiGPS);

        ButtonMdiGPS.addEventListener("click", () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(this.showPosition);
            } else {
                alert("Geolocation is not supported by this browser.");
            }
        });
        //

    }
    //    const myCenter = new google.maps.LatLng(-12.047956, -77.054081);

    showPosition(position) {
        //var latLng =new google.maps.LatLng(-34, 151);// { lat: position.coords.latitude, lng: position.coords.longitude }
        var latLng: any = { latLng: { lat: position.coords.latitude, lng: position.coords.longitude } };//

        var geocoder = new google.maps.Geocoder();
        geocoder.geocode(latLng,  (results, status)=> {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {

                    var countryMarker;
                    var geocodeResponse = results[0];
                    var shortName = true;
                    var type = 'country';
                    for (var i = 0; i < geocodeResponse.address_components.length; i++) {
                        for (var j = 0; j < geocodeResponse.address_components[i].types.length; j++) {
                            if (geocodeResponse.address_components[i].types[j] == type) {
                                if (shortName) {
                                    countryMarker = geocodeResponse.address_components[i].short_name;
                                } else {
                                    countryMarker = geocodeResponse.address_components[i].long_name;
                                }
                            }
                        }
                    }

                    if ('PE' != countryMarker) {
                        this.map.setCenter({ lat: -12.044399, lng: -77.043150 })
                    } else {
                        var myLatLng = { lat: position.coords.latitude, lng: position.coords.longitude }
                        this.map.setCenter(myLatLng)
                    }
                }
            }
        });
    }

    goStore(){
        //LOADING-WAINTING
        CommonUtils.loadingWaiting()
        let goToStoreUri=localStorage.getItem('goToStoreUri');
        this.router.navigate([`/${goToStoreUri}`]);
        localStorage.removeItem('goToStoreUri');
    }

}



   // document.querySelectorAll('.map-content #google-map')[0].setAttribute('style',`height: ${(window.innerHeight-135)}px`);//200 116

    //window.onresize = () => {
      //document.querySelectorAll('.map-content #google-map')[0].setAttribute('style',`height: ${(window.innerHeight-135)}px`);

    //};
/* const loader = new Loader({ apiKey: 'AIzaSyA_cJTN6hLpMuE_fkAcgeAknRWSVk5Ipvo',
      libraries: ['places']
    });*/
    // https://googlemaps.github.io/js-api-loader/examples/index.html
    // AIzaSyDseP7HF_56aFB57irUQeEi5438tD4PSlk
    // https://github.com/davidkudera/google-maps-loader
    // https://github.com/googlemaps/js-api-loader
    // https://www.npmjs.com/package/load-google-maps-api


/*  this.marker = new google.maps.Marker({
    map: this.map,
    draggable: true,
    anchorPoint: new google.maps.Point(0, -29)
  });

  google.maps.event.addListener(this.map, 'click', (ele) => {
    // codigo que crea el marcador
    // marker.setMap(map)
    //map.setCenter(marker.getPosition())
    // map.
    //mapsMouseEvent.latLng.toString()
    //position: mapsMouseEvent.latLng
  });*/




    // posicion



/*let FirsttimeOutGoogle: NodeJS.Timeout = setInterval(() => {
     if (this.map && google.maps) {
       console.log('Google maps loaded');
       clearInterval(FirsttimeOutGoogle);
       if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(showPosition);
       } else {
         alert('Geolocation is not supported by this browser.');
       }
     }
   }, 1000);
   */
/* const p = document.createElement("p");
 p.setAttribute('class','mt-0 mb-0');
 p.appendChild(label);*/

/*
this.addMarker({
  lat: parseInt(this.stores[i].stores_latitud),
  lng: parseInt(this.stores[i].stores_longitud)
}, this.map);
addMarker(location: google.maps.LatLngLiteral, map: google.maps.Map) {
  // Add the marker at the clicked location, and add the next-available label
  // from the array of alphabetical characters.
  new google.maps.Marker({
      position: location,
      //label: labels[labelIndex++ % labels.length],
      map: map,
      icon: {
          url: this.APP_URL+"assets/images/markers/marker-4.png",
          // This marker is 20 pixels wide by 32 pixels high.
          scaledSize: new google.maps.Size(42,52), // size size: new google.maps.Size(20, 32),
          // The origin for this image is (0, 0).
          origin: new google.maps.Point(0, 0),
          // The anchor for this image is the base of the flagpole at (0, 32).
          anchor: new google.maps.Point(0, 52)
      }
  });
}*/

/* this.markers[i].addListener("click", (self)=>{
     console.log(self);
     if (this.markers[i].getAnimation() !== null) {
         this.markers[i].setAnimation(null);
       } else {
         this.markers[i].setAnimation(google.maps.Animation.BOUNCE);
       }
 });*/
