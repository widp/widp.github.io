 //TODO FIX race condition loading problem
 var container;
 var camera, scene, renderer;
 var mouseX = 0, mouseY = 0;
 var windowHalfX = window.innerWidth / 2;
 var windowHalfY = window.innerHeight / 2;
 var analyser;
 var requestId,playing=false;
 var button = document.getElementById("play");
 var isInit = false;
 var sound;
 isInit = init();
 
 function toggleanimation(){
    if(!playing && isInit) {
         playing = true;
         sound.play();
         animate();

         button.value = "pause";

     }
     else if(playing && isInit) {
         button.value = "play";
         sound.pause();
         playing = false;

     }
     else {
         console.log("still waiting");
     }
 }
 function foo() {
     container = document.getElementById( 'WebGLCanvas' );
     
    //camera setup
     camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 20000 );
     camera.position.z = 10;
     camera.position.x = 0;
     camera.position.y = 0;
     scene = new THREE.Scene();
     
     //audio setup
     var audiolistener = new THREE.AudioListener();
     camera.add(audiolistener);
     sound = new THREE.Audio(audiolistener);
     analyser = new THREE.AudioAnalyser(sound,32);
     var audioloader = new THREE.AudioLoader();
     audioloader.load('assets/audio/bensound-scifi.mp3',function(buffer){
         sound.setBuffer(buffer);
         sound.setLoop(false);
         sound.setVolume(0.5);
     }); //loading audio file
     geometry = new THREE.Geometry();

     for ( i = 0; i < 2000; i ++ ) {

         var vertex = new THREE.Vector3();
         vertex.x = Math.random() * 2000 - 1000;
         vertex.y = Math.random() * 2000 - 1000;
         vertex.z = Math.random() * 2000 - 1000;

         geometry.vertices.push( vertex );

     }

     parameters = [
         [ [1, 1, 0.5], 5 ],
         [ [0.95, 1, 0.5], 4 ],
         [ [0.90, 1, 0.5], 3 ],
         [ [0.85, 1, 0.5], 2 ],
         [ [0.80, 1, 0.5], 1 ]
     ];
     var materials= [];

     for ( i = 0; i < parameters.length; i ++ ) {

         color = parameters[i][0];
         size  = parameters[i][1];

         materials[i] = new THREE.PointsMaterial( { size: size } );

         particles = new THREE.Points( geometry, materials[i] );

         particles.rotation.x = Math.random() * 6;
         particles.rotation.y = Math.random() * 6;
         particles.rotation.z = Math.random() * 6;
         particles.name = "particles";
         scene.add( particles );
     }

     var sphere = new THREE.Mesh( new THREE.SphereGeometry( 5, 15, 15 ), new THREE.MeshBasicMaterial(0xff ));
     sphere.intensity = 10;
     sphere.position.set(0,0,0);
     sphere.material.transparent = true;
     sphere.material.opacity = 0.3;
     sphere.name = "sphere";
     scene.add(sphere);

     var pointlight = new THREE.PointLight(0xa000fe,1,500);
     pointlight.position.set(0,0,0);
     pointlight.name = "light";
     scene.add(pointlight);

     // copy-pasted : To be reviewed
     var manager = new THREE.LoadingManager();

     var progressbar = document.getElementById('progress-bar');
     manager.onProgress = function ( item, loaded, total ) {
         progressbar.value = loaded*100;
         progressbar.innerhtml = loaded * 100;
         if(loaded == 1)
         button.style.visibility = 'visible';
     };


     var onProgress = function ( xhr ) {
         if ( xhr.lengthComputable ) {
             var percentComplete = xhr.loaded / xhr.total * 100;
         }};

     var onError = function ( xhr ) {
         console.log('failed to load 3d model');
     };
     // load 3d model
     var loader = new THREE.OBJLoader( manager);
     loader.load( 'assets/models/model.obj', function ( object ) {
         object.name = "head";
         scene.add( object );
     }, onProgress, onError );

     // END Of MAJOR COPY PASTE BOTCH

     renderer = new THREE.WebGLRenderer();
     renderer.setPixelRatio( window.devicePixelRatio );
     renderer.setSize( window.innerWidth, window.innerHeight );

     container.appendChild( renderer.domElement );
     document.addEventListener( 'mousemove', onDocumentMouseMove, false );

     window.addEventListener( 'resize', onWindowResize, false );
     return true;
    }

async function init() {
    var result = await foo();
    return result;
 }
 function onWindowResize() {
     windowHalfX = window.innerWidth / 2;
     windowHalfY = window.innerHeight / 2;

     camera.aspect = window.innerWidth / window.innerHeight;
     camera.updateProjectionMatrix();
     renderer.setSize( window.innerWidth, window.innerHeight );
 }
 function onDocumentMouseMove( event ) {
     mouseX = ( event.clientX - windowHalfX ) / 2;
     mouseY = ( event.clientY - windowHalfY ) / 2;
 }
 //
 function animate() {
     if(!playing) return;
     requestId = requestAnimationFrame( animate );
     render();
 }

 function render() {

     var freq = analyser.getAverageFrequency()/256;
     var freqData = analyser.getFrequencyData();
     var head = scene.getObjectByName('head',true);

     head.rotation.z =freqData[6]/256;
     var light = scene.getObjectByName('light',true);
     light.intensity = freqData[3]/256*2;
     head.rotation.y -=0.01;

     var sphere = scene.getObjectByName('sphere',true);
     sphere.material.opacity = freqData[2]/256;
     sphere.material.color =new THREE.Color(freqData[1]/256, freqData[3]/256, freqData[5]/256);
     sphere.rotation.z=(freqData[2]/256);
     sphere.scale.x = freqData[5]/256;

     //sphere.geometry.

     var particles = scene.getObjectByName('particles',true);
     particles.rotation.z = freqData[1]*10;
     //particles.translateY(freq);
     particles.intensity = freq*10;
     camera.lookAt(0,0,0);
     renderer.render( scene, camera );
 }

 // function manipulate_vertices(){

 // 	var buffergeometry = scene.getObjectByName('head',true).children[0].geometry;
 // 	var position = buffergeometry.getAttribute('position');
 // 	for(var siz)
 // 		//get vertices from buffergeometry and change its positions

 // }
