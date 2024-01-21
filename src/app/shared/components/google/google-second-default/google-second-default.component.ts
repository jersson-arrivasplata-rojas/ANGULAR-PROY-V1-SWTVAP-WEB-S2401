import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

import { Loader, LoaderOptions } from 'google-maps';
import { StoreInterface as Store } from 'src/app/shared/interfaces/store.interface';
import { NodeStoreService } from 'src/app/shared/services/node-store.service';
import { CommonUtils } from 'src/app/shared/utils/common.utils';
declare var self: any;
declare var $: any;

@Component({
    selector: 'app-google-second-default',
    templateUrl: './google-second-default.component.html',
    styleUrls: ['./google-second-default.component.css']
})
export class GoogleSecondDefaultComponent implements OnInit, AfterViewInit {

    public isBrowser: boolean;
    public isServer: boolean;
    public map: google.maps.Map<HTMLElement>;
    public markers = [];
    public marker;
    public infowindows = [];
    public autocomplete;
    @Input() public lat;//=-12.047956
    @Input() public lng;//=-77.054081
    public inputLatitud = '';
    public inputLongitud = '';
    public infowindow;
    @Input() public address;
    public startDragPosition;
    @Input() public address_referential;
    @Input() public address_type;
    @Input() public stores_uri;
    public APP_URL_API = environment.apiUrl;
    public APP_URL = environment.apiUrl;
    idGeneral = '#STORE-DASHBOARD-MAP';
    preloadDashboard:boolean=false;
    isLoading:boolean=false;

    store:Store=null;
    constructor( public nodeStoreService:NodeStoreService) {
        nodeStoreService.getStore().subscribe(data=>{
          this.store = data.store;
        });


    }

    ngOnInit(): void {
        CommonUtils.menuDashboardActive('ubicacion');
        this.preloadDashboard = false;
        CommonUtils.insertPreloadStoreRemoveHidden('PRELOAD-DASHBOARD-MAP', this.getImagePrincipal(), this.store.stores_name);

        //  console.log(this.stores)
        let own=this;
        let Referential:any =document.getElementById('pac-input-referencial');
        let AddressType:any =document.getElementById('address_type_google_second');


        document.getElementById('saveGoogleSecondDefault').addEventListener('click',function(){
            //pac-input-referencial
                var data: any = {
                latitud: own.lat,
                longitud: own.lng,
                address: own.address,
                address_referential: Referential.value,
                address_type:AddressType.value,
                store_id: own.store.stores_id
                };

                Swal.fire({
                    title: '¿Seguro de continuar?',
                    text: "¡Si continuas se reemplazará la dirección de su negocio!",
                    icon: 'warning',
                    //showDenyButton: false,
                    showCancelButton: true,
                    //confirmButtonText: `Save`,
                    confirmButtonColor: '#0CC27E',
                    cancelButtonColor: '#FF586B',
                    confirmButtonText: '¡Si, continuar!',
                    cancelButtonText: '¡No, cancelar!',
                    customClass: {
                      confirmButton: 'btn btn-first mr-5',
                      cancelButton: 'btn btn-danger-2'
                    },
                    buttonsStyling: false,
                  }).then(function (result) {

                    if (result.isConfirmed) {
                        own.isLoading=true;
                      $.ajax({
                        // la URL para la petición
                        url: own.APP_URL_API + 'dashboard/stores/update/addresses',//

                        data: data,

                        dataType: 'json',

                        type: 'POST',
                        headers: {
                            "Authorization": localStorage.getItem('accessToken')
                          },
                        // código a ejecutar si la petición es satisfactoria;
                        // la respuesta es pasada como argumento a la función
                        success: function (data) {

                            //$(self).parent('tr').remove()
                            $(own.idGeneral).find('.alerts').append(CommonUtils.insertAlert());
                            own.isLoading=false;
                        },

                        error: function (xhr, status) {
                            // alert('Disculpe, existió un problema');
                            $(own.idGeneral).find('.alerts').append(CommonUtils.noInsertAlert());

                        },
                        complete: function (xhr, status) {
                        }
                    });

                    } else if (result.isDenied) {

                    }
                });

        });
    }


    clearMarkers() {
        this.setMapOnAll(null);
    }
    setMapOnAll(map: google.maps.Map | null) {
        for (let i = 0; i < this.markers.length; i++) {
            this.markers[i].setMap(map);
        }
    }
    setCloseInfoWindowsOnAll() {
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
        let latv = parseFloat(this.lat);
        let lonv = parseFloat( this.lng);

        const myCenter = new google.maps.LatLng(latv, lonv);
        const mapCanvas = document.getElementById('google-map-second');
        const inputAutocomplete: any = document.getElementById('pac-input');
        const infowindowContent: any = document.getElementById('infowindow-content-second');

        const mapOptions = {
            zoom: 16,
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

        const topleftControlDiv = document.getElementById('FORM-INPUT-SECOND-GOOGLE') as HTMLDivElement;

        //const topleftControlDiv = document.createElement("div") as HTMLDivElement;
        //this.TopLeftControl(topleftControlDiv, this.map);

        this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(topleftControlDiv);

        const centerControlDiv = document.createElement("div") as HTMLDivElement;
        this.TopCenterControl(centerControlDiv, this.map);

        this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);

        const latitudLingitudDiv = document.getElementById('INPUTLATITUDLONGITUD-SECOND') as HTMLDivElement;
        this.map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(latitudLingitudDiv);

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

        this.autocomplete = new google.maps.places.Autocomplete(inputAutocomplete);
        this.autocomplete.setComponentRestrictions({ 'country': ['pe'] });
        this.autocomplete.setTypes(['geocode']);
        this.autocomplete.bindTo('bounds', this.map);

        this.map.addListener("click", (e) => {
            //placeMarkerAndPanTo(e.latLng, map);
            this.setAnimationMarkesOnAll();
            this.setCloseInfoWindowsOnAll();
        });
        this.map.addListener('drag', (event) => {
            this.setAnimationMarkesOnAll();
            this.setCloseInfoWindowsOnAll();
        });






        //marker inicio
        this.marker = new google.maps.Marker({
            map: this.map,
            draggable: true,
            anchorPoint: new google.maps.Point(0, -29)
        });


        this.infowindow = new google.maps.InfoWindow();


        var latlng = new google.maps.LatLng(latv, lonv);

        this.marker.setPosition(latlng);
        this.marker.setVisible(true);




        this.inputLatitud=this.lat.toString()
        this.inputLongitud=this.lng.toString()

        this.preloadDashboard = true;
        CommonUtils.removeNodoPreloadHidden('PRELOAD-DASHBOARD-MAP');

        setTimeout(function(){
            self.marker.setMap(self.map);
            document.getElementById('FORM-INPUT-SECOND-GOOGLE').classList.remove('sr-only');
        },5000);
        /*

        //infowindowContent.children['place-icon-second'].src = place.icon;
        //infowindowContent.children['place-name-second'].textContent = place.name;
        infowindowContent.children['place-address-second'].innerHtml = this.address;

        this.infowindow.setContent(infowindowContent);
        this.infowindow.open(this.map, this.marker);*/


        //marker fin
        //input autocomplete




       /* var setMarkerUpdate=()=>{
            if (place.geometry.viewport) {
                self.map.fitBounds(place.geometry.viewport);
            } else {
                self.map.setCenter(place.geometry.location);
                self.map.setZoom(16);  // Why 17? Because it looks good.
            }
            self.marker.setPosition(place.geometry.location);
            self.marker.setVisible(true);

            self.inputLatitud = place.geometry.location.lat()
            self.inputLongitud = place.geometry.location.lng()

            self.address = '';
            if (place.address_components) {
                self.address = [
                    (place.address_components[0] && place.address_components[0].short_name || ''),
                    (place.address_components[1] && place.address_components[1].short_name || ''),
                    (place.address_components[2] && place.address_components[2].short_name || '')
                ].join(' ');
            }


            infowindowContent.children['place-icon-second'].src = place.icon;
            infowindowContent.children['place-name-second'].textContent = place.name;
            infowindowContent.children['place-address-second'].textContent = self.address;

        }*/

        this.infowindow.open(self.map, self.marker);


        this.autocomplete.addListener('place_changed', function () {
            self.infowindow.close();
            self.marker.setVisible(false);
            var place = self.autocomplete.getPlace();

            /*var foundStreet=false;

            for (let i = 0; i < place.address_components.length; i++) {
                let c = place.address_components[i];
                for (let j = 0; j < c.types.length; j++) {
                if(c.types[j]=="street_number"){
                    foundStreet=true;
                    break;
                }
                }
                if(foundStreet){
                break;
                }
            }

            if(!foundStreet){
                inputAutocomplete.value="";
                alert("No es un registro valido!!!");
            }else{

            }*/
            if (!place.geometry) {
                // User entered the name of a Place that was not suggested and
                // pressed the Enter key, or the Place Details request failed.
                window.alert("No details available for input: '" + place.name + "'");
                return;
            }

            // If the place has a geometry, then present it on a map.
            if (place.geometry.viewport) {
                self.map.fitBounds(place.geometry.viewport);
            } else {
                self.map.setCenter(place.geometry.location);
                self.map.setZoom(16);  // Why 17? Because it looks good.
            }
            self.marker.setPosition(place.geometry.location);
            self.marker.setVisible(true);

            self.inputLatitud = place.geometry.location.lat()
            self.inputLongitud = place.geometry.location.lng()
            self.lat = place.geometry.location.lat()
            self.lng = place.geometry.location.lng()

            self.address = '';
            if (place.address_components) {
                self.address = [
                    (place.address_components[0] && place.address_components[0].short_name || ''),
                    (place.address_components[1] && place.address_components[1].short_name || ''),
                    (place.address_components[2] && place.address_components[2].short_name || '')
                ].join(' ');
            }


            infowindowContent.children['place-icon-second'].src = place.icon;
            infowindowContent.children['place-name-second'].textContent = place.name;
            infowindowContent.children['place-address-second'].textContent = self.address;
            self.infowindow.open(self.map, self.marker);
        });

        let own = this;
        this.map.addListener('click', function(mapsMouseEvent) {
            // Close the current InfoWindow.
           // marker.setPosition(mapsMouseEvent.latLng);
            var geocoder = new google.maps.Geocoder();
            let position = own.marker.getPosition();
            let latLngAny: any = { latLng: position };
            geocoder.geocode(latLngAny, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[0]) {
                        var countryMarker;
                        var geocodeResponse=results[0];
                        var shortName=true;
                        var type='country';
                        for(var i=0; i < geocodeResponse.address_components.length; i++) {
                            for (var j=0; j < geocodeResponse.address_components[i].types.length; j++) {
                                if (geocodeResponse.address_components[i].types[j] == type) {
                                    if (shortName) {
                                        countryMarker= geocodeResponse.address_components[i].short_name;
                                    }
                                    else {
                                        countryMarker= geocodeResponse.address_components[i].long_name;
                                    }
                                }
                            }
                        }

                        if ('PE' != countryMarker) {
                            own.marker.setPosition(own.startDragPosition);

                        }else{
                            var lat = (mapsMouseEvent.latLng.lat()).toString();
                            var lng = (mapsMouseEvent.latLng.lng()).toString();
                            own.infowindow.close();
                            own.address=results[0].formatted_address;
                            inputAutocomplete.value=results[0].formatted_address;

                            //own.inputAutocompleteAnother.value=results[0].formatted_address;
                           // console.log(results[0]);
                           // console.log(mapsMouseEvent.latLng)
                           // console.log("Latitude: " + lat);
                           // console.log("Longitude: " + lng);
                           own.marker.setPosition(mapsMouseEvent.latLng);

                           own.inputLatitud=lat
                           own.inputLongitud=lng
                           own.lat = lat
                           own.lng = lng

                           own.infowindow.setContent(results[0].formatted_address);
                           own.infowindow.open(own.map, own.marker);
                        }
                    }
                }
            });
        });
        //marker click
        google.maps.event.addListener(self.marker, 'click',  (e)=> {
            self.infowindow.close();
            self.infowindow.setContent(self.address);
            self.infowindow.open(self.map, this);
        });

        //market gradstart
        google.maps.event.addListener(self.marker, 'dragstart', function (event) {
            self.startDragPosition = self.marker.getPosition();
        });


        //marker dragend
        google.maps.event.addListener(self.marker, "dragend", function () {
            var geocoder = new google.maps.Geocoder();
            let position = self.marker.getPosition();
            let latLngAny: any = { latLng: position };
            geocoder.geocode(latLngAny, function (results, status) {
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
                                    }
                                    else {
                                        countryMarker = geocodeResponse.address_components[i].long_name;
                                    }
                                }
                            }
                        }

                        if ('PE' != countryMarker) {
                            self.marker.setPosition(self.startDragPosition);
                        } else {
                            var lat = (self.marker.getPosition().lat()).toString();
                            var lng = (self.marker.getPosition().lng()).toString();
                            self.infowindow.close();
                            self.address = results[0].formatted_address;
                            inputAutocomplete.value = results[0].formatted_address;

                            console.log(results[0]);
                            console.log("Latitude: " + lat);
                            console.log("Longitude: " + lng);
                            self.inputLatitud.value = lat
                            self.inputLongitud.value = lng

                            self.lat = lat
                            self.lng = lng

                            self.infowindow.setContent(results[0].formatted_address);
                            self.infowindow.open(self.map, self.marker);
                        }
                    }
                }
            });
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


    TopRightControl(controlDiv: HTMLDivElement, map: google.maps.Map) {

        // Set CSS for the control border

        const mdiMinus = document.createElement("i");
        mdiMinus.setAttribute('class', 'mdi mdi-minus');

        const mdiPlus = document.createElement("i");
        mdiPlus.setAttribute('class', 'mdi mdi-plus');

        const ButtonMdiMinus = document.createElement("button");
        ButtonMdiMinus.appendChild(mdiMinus);
        ButtonMdiMinus.setAttribute('class', 'btn btn-first');

        const ButtonMdiPlus = document.createElement("button");
        ButtonMdiPlus.appendChild(mdiPlus);
        ButtonMdiPlus.setAttribute('class', 'btn btn-first');

        const spanMiddle = document.createElement("span");

        const goZoomUI = document.createElement("div");
        goZoomUI.id = "goZoomUI";
        goZoomUI.setAttribute('class', 'shadow m-2 d-flex flex-column-reverse');

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

        controlDiv.id = "goControlDivRightUI";
        //mdi mdi-window-close


        const mdiLocation = document.createElement("i");
        mdiLocation.setAttribute('class', 'mdi mdi-crosshairs-gps');

        const ButtonMdiLocation = document.createElement("button");
        ButtonMdiLocation.appendChild(mdiLocation);
        ButtonMdiLocation.setAttribute('class', 'btn btn-danger-2');


        const goLocationUI = document.createElement("div");
        goLocationUI.id = "goLocationUI";
        goLocationUI.setAttribute('class', 'shadow m-2 ');

        goLocationUI.appendChild(ButtonMdiLocation);

        ButtonMdiLocation.addEventListener("click", () => {
            // console.log(map.getZoom());
            this.getLocation();
        });

        controlDiv.appendChild(goLocationUI);

    }

    getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position: any) => {
                if (position) {
                    console.log("Latitude: " + position.coords.latitude +
                        "Longitude: " + position.coords.longitude);
                    this.lat = position.coords.latitude;
                    this.lng = position.coords.longitude;
                    console.log(this.lat);
                    console.log(this.lat);
                }
            },
                (error: any) => console.log(error));
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }


    showPosition(position) {
        //var latLng =new google.maps.LatLng(-34, 151);// { lat: position.coords.latitude, lng: position.coords.longitude }
        var latLng: any = { latLng: { lat: position.coords.latitude, lng: position.coords.longitude } };//

        var geocoder = new google.maps.Geocoder();
        geocoder.geocode(latLng,  (results, status) => {
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
                        this.map.setCenter({ lat: this.lat, lng: this.lng })
                    } else {

                        var myLatLng = { lat: position.coords.latitude, lng: position.coords.longitude }
                        this.map.setCenter(myLatLng)
                    }
                }
            }
        });
    }

    public getImagePrincipal() {
        return (this.store?.stores_image == null || this.store?.stores_image == '') ? CommonUtils.getImageDefault100X100(this.APP_URL) : this.store?.stores_image_url;
    }
}

  /*TopLeftControl(controlDiv: HTMLDivElement, map: google.maps.Map) {

        // Set CSS for the control border

        const mdiClose = document.createElement("i");
        mdiClose.setAttribute('class', 'mdi mdi-window-close m-2');

        const ButtonMdiClose = document.createElement("button");
        ButtonMdiClose.appendChild(mdiClose);
        ButtonMdiClose.setAttribute('class', 'btn btn-danger');



        const goCloseUI = document.createElement("div");
        goCloseUI.id = "goCloseUI";
        goCloseUI.setAttribute('class', 'shadow m-2');

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

    }*/



    /*
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

      }*/
    //    const myCenter = new google.maps.LatLng(-12.047956, -77.054081);


/*

 ngOnChanges(changes: SimpleChanges) {
        const stores: SimpleChange = changes.stores;
        if (JSON.stringify(stores.previousValue) == JSON.stringify(stores.currentValue)) {

        } else {
            // console.log('prev value: ', stores.previousValue);
            // console.log('got name: ', stores.currentValue);
            this.stores = stores.currentValue;
            //this.markers=[];
            this.deleteMarkers();
            this.infowindows = [];
            this.markers = [];
            for (var i = 0; i < this.stores.length; i++) {

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
        if (index == self.stores[i]['payment_card'].length) break;
        let e = self.stores[i]['payment_card'][index];
        if (typeof e['payment'] != 'undefined') {
            for (let j = 0; j < e['payment'].length; j++) {
                if (j == e['payment'].length) break;
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

    let paymentText = "";
    payments.forEach((pay) => {
        paymentText += '<span class="badge badge-pill mr-2 badge-primary">' + pay + '</span>'
        //paymentText+='<img style="max-width: 65px;width: 100%;" data-toggle="tooltip" class="cursor-pointer mr-2" data-placement="top" title="Pago en Efectivo" width="40px"  src="' + pay + '?v=' + Math.floor(Math.random() * 100) + '"/>';
    });

    var contentString = '<div id="content" style="text-align: left;font-family: Saira, sans-serif;">' +
        '<div class="media  align-items-center d-flex" style=" flex-direction: row; width: 550px;height: 240px;">' +
        '<div style="width: 240px;    text-align: center;">' +
        '<img  style="cursor:pointer ;max-width: 240px;max-height: 245px;" onclick="submit(this)"  src="' + self.stores[i].stores_image_url + '?v=' + Math.floor(Math.random() * 10000000000) + '" class=" img-content" alt="...">' +
        '<p style="position: absolute; bottom: 0;margin: auto;left: 13%;" class="mb-1 pr-2 text-center pl-2"><button type="button" class="btn-primary border-input mb-2 btn">Comprar</button></p>' +
        '</div>' +
        '<div class="media-body" style="    max-height: 238px;">' +
        '<h5 class="mb-0 mt-2 pr-2 pl-2  font-weight-bold " onclick="submit(this)">' + self.stores[i].stores_name + '</h5>' +
        '<div class="mb-2  pr-2 pl-2" style="    font-size: 0.9rem;">' + paymentText + '</div>' +
        collectDelivery +
        hour +
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

*/


























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
