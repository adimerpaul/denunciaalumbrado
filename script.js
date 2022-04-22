const funcionInit = () => {
	if (!"geolocation" in navigator) {
		return alert("Tu navegador no soporta el acceso a la ubicación. Intenta con otro");
	}
	//console.log("corriendo")
	const RUTA_API = "./loguear.php";

	let idWatcher = null;

//	const $latitud = document.getElementById("latitud"),
//		$longitud = document.getElementById("longitud"),
 //       $map = document.getElementById("map"),

	//	$btnIniciar = document.querySelector("#btnIniciar"),
	//	$btnDetener = document.querySelector("#btnDetener"),
//		$log = document.querySelector("#log");
	var marker
	const onUbicacionConcedida = ubicacion => {
		const coordenadas = ubicacion.coords;
	//	$latitud.value = `${coordenadas.latitude}`;
	//	$longitud.value = `${coordenadas.longitude}`;
        const lat= `${coordenadas.latitude}`;
		const lng= `${coordenadas.longitude}`;
      //  $map.href = `https://www.google.com/maps/@${coordenadas.latitude},${coordenadas.longitude},20z`;
		//loguear(`${ubicacion.timestamp}: ${coordenadas.latitude},${coordenadas.longitude}`);
		//enviarAServidor(ubicacion);
        myMap.panTo(new L.LatLng(lat, lng));
        marker = L.marker([lat,lng],{draggable:true}).addTo(myMap)
        marker.on('dragend', function (e) {
         document.getElementById('latitud').value = marker.getLatLng().lat;
         document.getElementById('longitud').value = marker.getLatLng().lng;
        })
	}




    const tilesProvider = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    var southWest = L.latLng(-18.014150, -67.168997),
    northEast = L.latLng(-17.893018, -67.047495),
    bounds = L.latLngBounds(southWest, northEast);

    let myMap = L.map('myMap',{
    maxBounds: bounds,   // Then add it here..
    maxZoom: 18,
    minZoom: 12
	}).setView([-17.968663, -67.111458],16)
    L.tileLayer(tilesProvider,{maxZoom: 18,}).addTo(myMap);


    function onMapClick(e) {
	    var lat = (e.latlng.lat);
	    var lng = (e.latlng.lng);
	    var newLatLng = new L.LatLng(lat, lng);
	    marker.setLatLng(newLatLng); 
    	document.getElementById('latitud').value = marker.getLatLng().lat;
        document.getElementById('longitud').value = marker.getLatLng().lng;
		/*popup
			.setLatLng(e.latlng)
			.setContent('You clicked the map at ' + e.latlng.toString())
			.openOn(myMap);*/
	}

	myMap.on('click', onMapClick);
    //let marker = L.marker([-17.970064,-67.114081]).addTo(myMap)


	/*const enviarAServidor = ubicacion => {
		// Debemos crear otro objeto porque el que nos mandan no se puede codificar
		const otraUbicacion = {
			coordenadas: {
				latitud: ubicacion.coords.latitude,
				longitud: ubicacion.coords.longitude,
			},
			timestamp: ubicacion.timestamp,
		};
		console.log("Enviando: ", otraUbicacion);
		fetch(RUTA_API, {
			method: "POST",
			body: JSON.stringify(otraUbicacion),
		}); // No esperamos el then porque no hacemos nada cuando se termine
	};*/

	/*const loguear = texto => {
		$log.innerText += "\n" + texto;
	};*/

	const onErrorDeUbicacion = err => {
		console.log("Error obteniendo ubicación: ", err);
	}

/*	const detenerWatcher = () => {
		if (idWatcher) {
			navigator.geolocation.clearWatch(idWatcher);
		}
	}*/

	const opcionesDeSolicitud = {
		enableHighAccuracy: true, // Alta precisión
		maximumAge: 0, // No queremos caché
		timeout: 5000 // Esperar solo 5 segundos
	};

    idWatcher = navigator.geolocation.getCurrentPosition(onUbicacionConcedida, onErrorDeUbicacion, opcionesDeSolicitud);
	//$btnIniciar.addEventListener("click", () => {
	//	detenerWatcher();
	//	idWatcher = navigator.geolocation.watchPosition(onUbicacionConcedida, onErrorDeUbicacion, opcionesDeSolicitud);
	//});

	//$btnDetener.addEventListener("click", detenerWatcher);

	/*$latitud.value = "Cargando...";
	$longitud.value = "Cargando...";*/
    
   

    let date = new Date();
    var fecha = document.getElementById("fecha");
    fecha.value = date.toISOString().split('T')[0];
    var hora = document.getElementById("hora");
    hora.value = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();





    const form = document.querySelector('form');
    const latitud = document.getElementById('latitud');
    const longitud = document.getElementById('longitud');
    form.addEventListener('submit', (e)=>{
        //to prevent reload
        e.preventDefault();
        //creates a multipart/form-data object
        let data = new FormData(form);
        console.log(data);
        if (latitud.value == null || longitud.value ==null){
        	alert("No selecciono la ubicacion")
        }else{
	        const instance = axios.create({
	            baseURL: 'https://electricab.gamo.cf/api'
	          });
	          instance({
	          method  : 'post',
	          url : '/denuncia',
	          data : data,
	        })
	        .then((res)=>{
	          console.log(res);
	          console.log('correcto')
	          alert("Su reclamo sera atendido muy pronto");
	        })
	        .catch((err) => {throw err});
        }
    });

};
document.addEventListener("DOMContentLoaded", funcionInit);