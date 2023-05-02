/*import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
createApp(App).mount('#app')*/

import * as THREE from 'three';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const params = {
    name: '../public/resources/IMG230.jpeg'
};
//const models = []; 
let camera, scene, renderer, group;

let isUserInteracting = false,
    onPointerDownMouseX = 0, onPointerDownMouseY = 0,
    lon = 0, onPointerDownLon = 0,
    lat = 0, onPointerDownLat = 0,
    phi = 0, theta = 0;

init();

function init() {

    //const selectButton = document.getElementById( 'fileNames' );
    //selectButton.addEventListener( 'click', onButtonClick );

    const container = document.getElementById( 'container' );

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1500 );
    camera.position.set( -20, 30, 20 );
    scene = new THREE.Scene();

    // 创建一个坐标轴
    const axesHelper = new THREE.AxesHelper(100);
    scene.add(axesHelper);


    const geometry = new THREE.SphereGeometry( 500, 60, 40 );
    // invert the geometry on the x-axis so that all of the faces point inward
    geometry.scale( - 1, 1, 1 );

    const texture = new THREE.TextureLoader().load( params.name );//( 'textures/2294472375_24a3b8ef46_o.jpg' );
    const material = new THREE.MeshBasicMaterial( { map: texture } );

    const mesh = new THREE.Mesh( geometry, material );

    scene.add( mesh );

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );

    container.style.touchAction = 'none';
    container.addEventListener( 'pointerdown', onPointerDown );
    const controls = new PointerLockControls( camera, renderer.domElement );
    scene.add( controls.getObject() );

    // 使用GLTFLoader加载模型
    const loader1 = new GLTFLoader();
    loader1.load('../public/resources/car1/scene.gltf', function(gltf) {
        const model1 = gltf.scene;
        model1.position.set(-20, 0, 0);
        //models.push(model1);
        scene.add(model1);
    }, undefined, function(error) {
        console.error(error);
    });
    /*
    // 使用GLTFLoader加载模型
    const loader2 = new GLTFLoader();
    loader2.load('resources/car2/scene.gltf', function(gltf) {
        const model2 = gltf.scene;
        model2.position.set(0, -20, 0);
        scene.add(model2);
    }, undefined, function(error) {
        console.error(error);
    });*/

    // 使用GLTFLoader加载模型
    const loader3 = new GLTFLoader();
    loader3.load('../public/resources/car3/scene.gltf', function(gltf) {
        const model3 = gltf.scene;
        model3.position.set(0, 0, -20);
        scene.add(model3);
    }, undefined, function(error) {
        console.error(error);
    });
    /*
    // 使用GLTFLoader加载模型
    const loader4 = new GLTFLoader();
    loader4.load('resources/car4/scene.gltf', function(gltf) {
        const model4 = gltf.scene;
        model4.position.set(20, 20, 0);
        scene.add(model4);
    }, undefined, function(error) {
        console.error(error);
    });*/

    // 使用GLTFLoader加载模型
    const loader5 = new GLTFLoader();
    loader5.load('../public/resources/car5/scene.gltf', function(gltf) {
        const model5 = gltf.scene;
        model5.position.set(20, 0, 0);
        scene.add(model5);
    }, undefined, function(error) {
        console.error(error);
    });

    // 创建网格坐标系
    const gridHelper = new THREE.GridHelper(10, 10); // 参数：大小、间距
    scene.add(gridHelper);

    // 创建一个3D网格坐标系
    /*
    const boxSize = 2;
    const boxGeometry = new THREE.BoxGeometry(boxSize, boxSize, boxSize);
    const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true });
    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    const boxHelper = new THREE.BoxHelper(boxMesh, 0xff0000);
    scene.add(boxHelper);*/
    // 创建小立方体的大小和数量
    const smallCubeSize = 2;
    const numCubes = 1;

    // 创建一个组合立方体的容器
    const cubeGroup = new THREE.Group();

    // 创建小立方体并添加到组合立方体中
    for (let i = 0; i < numCubes; i++) {
        for (let j = 0; j < numCubes; j++) {
            for (let k = 0; k < numCubes; k++) {
                const smallCubeGeometry1 = new THREE.BoxGeometry(smallCubeSize, smallCubeSize, smallCubeSize);
                const smallCubeMaterial1 = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true });
                const smallCubeMesh1 = new THREE.Mesh(smallCubeGeometry1, smallCubeMaterial1);
                smallCubeMesh1.position.set(
                    i * smallCubeSize + smallCubeSize/2,
                    j * smallCubeSize + smallCubeSize/2,
                    k * smallCubeSize + smallCubeSize/2
                );
                cubeGroup.add(smallCubeMesh1);
                const smallCubeGeometry2 = new THREE.BoxGeometry(smallCubeSize, smallCubeSize, smallCubeSize);
                const smallCubeMaterial2 = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true });
                const smallCubeMesh2 = new THREE.Mesh(smallCubeGeometry2, smallCubeMaterial2);
                smallCubeMesh2.position.set(
                    (i * smallCubeSize + smallCubeSize/2) * -1,
                    j * smallCubeSize + smallCubeSize/2,
                    k * smallCubeSize + smallCubeSize/2
                );
                cubeGroup.add(smallCubeMesh2);
                const smallCubeGeometry3 = new THREE.BoxGeometry(smallCubeSize, smallCubeSize, smallCubeSize);
                const smallCubeMaterial3 = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true });
                const smallCubeMesh3 = new THREE.Mesh(smallCubeGeometry3, smallCubeMaterial3);
                smallCubeMesh3.position.set(
                    i * smallCubeSize + smallCubeSize/2,
                    (j * smallCubeSize + smallCubeSize/2) * -1,
                    k * smallCubeSize + smallCubeSize/2
                );
                cubeGroup.add(smallCubeMesh3);
                const smallCubeGeometry4 = new THREE.BoxGeometry(smallCubeSize, smallCubeSize, smallCubeSize);
                const smallCubeMaterial4 = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true });
                const smallCubeMesh4 = new THREE.Mesh(smallCubeGeometry4, smallCubeMaterial4);
                smallCubeMesh4.position.set(
                    (i * smallCubeSize + smallCubeSize/2) * -1,
                    (j * smallCubeSize + smallCubeSize/2) * -1,
                    k * smallCubeSize + smallCubeSize/2
                );
                cubeGroup.add(smallCubeMesh4);
            }
        }
    }

    // 将组合立方体添加到场景中
    scene.add(cubeGroup);


    const light = new THREE.PointLight(0xffffff, 1);
    light.position.set(0, 0, 5);
    scene.add(light);

    document.addEventListener( 'wheel', onDocumentMouseWheel );

    //

    document.addEventListener( 'dragover', function ( event ) {

        event.preventDefault();
        event.dataTransfer.dropEffect = 'copy';

    } );

    document.addEventListener( 'dragenter', function () {

        document.body.style.opacity = 0.5;

    } );

    document.addEventListener( 'dragleave', function () {

        document.body.style.opacity = 1;

    } );

    document.addEventListener( 'drop', function ( event ) {

        event.preventDefault();

        const reader = new FileReader();
        reader.addEventListener( 'load', function ( event ) {

            material.map.image.src = event.target.result;
            material.map.needsUpdate = true;

        } );
        reader.readAsDataURL( event.dataTransfer.files[ 0 ] );

        document.body.style.opacity = 1;

    } );

    // 监听鼠标滚轮事件
    renderer.domElement.addEventListener( 'wheel', ( event ) => {

        // 根据鼠标滚轮 delta 值调整相机位置
        const delta = event.deltaY / 10;
        const direction = controls.getDirection( new THREE.Vector3() ).multiplyScalar( delta );
        camera.position.add( direction );

    } );

    //

    window.addEventListener( 'resize', onWindowResize );
    animate();

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

function onPointerDown( event ) {

    if ( event.isPrimary === false ) return;

    isUserInteracting = true;

    onPointerDownMouseX = event.clientX;
    onPointerDownMouseY = event.clientY;

    onPointerDownLon = lon;
    onPointerDownLat = lat;

    document.addEventListener( 'pointermove', onPointerMove );
    document.addEventListener( 'pointerup', onPointerUp );

}

function onPointerMove( event ) {

    if ( event.isPrimary === false ) return;

    lon = ( onPointerDownMouseX - event.clientX ) * 0.1 + onPointerDownLon;
    lat = ( event.clientY - onPointerDownMouseY ) * 0.1 + onPointerDownLat;

}

function onPointerUp() {

    if ( event.isPrimary === false ) return;

    isUserInteracting = false;

    document.removeEventListener( 'pointermove', onPointerMove );
    document.removeEventListener( 'pointerup', onPointerUp );

}

function onDocumentMouseWheel( event ) {

    const fov = camera.fov + event.deltaY * 0.05;

    camera.fov = THREE.MathUtils.clamp( fov, 10, 75 );

    camera.updateProjectionMatrix();

}

function animate() {
    /*
    var radius = 5; // 圆形路径半径
    var speed = 0.05; // 每帧旋转的角度
    var angle = 0; // 当前旋转角度
    // 计算当前位置
    var x = radius * Math.cos( angle );
    var z = radius * Math.sin( angle );

    // 将汽车位置设置为当前位置
    var model = models[0];
    model.position.set( x, 0, z );

    // 将汽车沿着 Y 轴方向旋转
    model.rotation.y = - angle;

    // 更新角度
    angle += speed;

    // 重新渲染场景
    renderer.render( scene, camera );
    */

    requestAnimationFrame( animate );
    update();

}

function update() {

    lat = Math.max( - 85, Math.min( 85, lat ) );
    phi = THREE.MathUtils.degToRad( 90 - lat );
    theta = THREE.MathUtils.degToRad( lon );

    const x = 500 * Math.sin( phi ) * Math.cos( theta );
    const y = 500 * Math.cos( phi );
    const z = 500 * Math.sin( phi ) * Math.sin( theta );

    camera.lookAt( x, y, z );

    renderer.render( scene, camera );

}
