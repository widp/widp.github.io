---
layout: page
Title: Music viz
subtitle: sound and light
permalink: projects/musicviz/
desc: My music visualization playground
---

<div id='WebGLCanvas' ></div>

<h1>My unsettling 3d scanned head</h1>
Music from [bensound.com](http://www.bensound.com)

<script src="/assets/js/three.min.js"> </script>
<script src="/assets/js/OBJLoader.js"></script>
<script src="https://connect.soundcloud.com/sdk/sdk-3.1.2.js"></script>
<script>
//TODO put a gif or webm here and move the visualizer to a separate page.
			var container;
			var camera, scene, renderer;
			var mouseX = 0, mouseY = 0;
			var windowHalfX = window.innerWidth / 2;
			var windowHalfY = window.innerHeight / 2;
			var analyser;
			var progressBar = document.createElement('div');
			init();

			  SC.initialize({
    client_id: 'YOUR_CLIENT_ID',
    redirect_uri: 'http://example.com/callback'
  });
			animate();


			function init() {


				container = document.getElementById( 'WebGLCanvas' );
							
				camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 20000 );
				camera.position.z = 10;
				camera.position.x = 0;
				camera.position.y = 0;
				scene = new THREE.Scene();
				var audiolistener = new THREE.AudioListener();
				camera.add(audiolistener);
				var sound = new THREE.Audio(audiolistener);
				 analyser = new THREE.AudioAnalyser(sound,32);
				var audioloader = new THREE.AudioLoader();
				audioloader.load('/assets/audio/bensound-scifi.mp3',function(buffer){
					sound.setBuffer(buffer);
					sound.setLoop(false);
					sound.setVolume(0.5);
					sound.play();
				});
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

				var pointlight = new THREE.PointLight(0xA000ff,1,500);
				pointlight.name = "light";
				scene.add(pointlight);
				var manager = new THREE.LoadingManager();
				manager.onProgress = function ( item, loaded, total ) {
					console.log( item, loaded, total );
					  progressBar.style.width = (loaded / total * 100) + '%';
				};
				var texture = new THREE.Texture();
				var onProgress = function ( xhr ) {
					if ( xhr.lengthComputable ) {
						var percentComplete = xhr.loaded / xhr.total * 100;
						console.log( Math.round(percentComplete, 2) + '% downloaded' );
					}
				};
				var onError = function ( xhr ) {
				};
				// model
				var loader = new THREE.OBJLoader( manager );
				loader.load( '/assets/models/model.obj', function ( object ) {
					// object.traverse( function ( child ) {
					// 	while(1)
					// 	if ( child instanceof THREE.Mesh ) {
					// 		child.material.map = texture;
					// 	}
					// } );

					object.name = "head";
					scene.add( object );
				}, onProgress, onError );

				renderer = new THREE.WebGLRenderer();
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );

				container.appendChild( renderer.domElement );
				document.addEventListener( 'mousemove', onDocumentMouseMove, false );
				
				window.addEventListener( 'resize', onWindowResize, false );
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
				requestAnimationFrame( animate );
			render();
			}

			function render() {
				
				var freq = analyser.getAverageFrequency()/256;
				var freqData = analyser.getFrequencyData();
				console.log(freqData);
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
				console.log(head.rotation.y);
				camera.lookAt(0,0,0);
				renderer.render( scene, camera );
			}
			// function manipulate_vertices(){

			// 	var buffergeometry = scene.getObjectByName('head',true).children[0].geometry;
			// 	var position = buffergeometry.getAttribute('position');
			// 	for(var siz)
			// 		//get vertices from buffergeometry and change its positions

			// }
		</script>