const THREE = require("./node_modules/three/build/three.js");

var Awesome3D = function(target) {
    this.target = target || document.body;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, this.target.offsetWidth / this.target.offsetHeight, 0.1, 1000);
    this.camera.lookAt(this.scene.position);
    this.camera.position.z = 50;
    this.camera.position.x = 15;
    this.camera.position.y = 15;
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.shadowMap.enabled = true;
    this.renderer.setClearColor(0x000000);
    this.resize();
    this.target.appendChild(this.renderer.domElement);

    window.addEventListener("resize", (function(scope) {
        return function(evt) {
            scope.resize();
        }
    })(this));
}

Awesome3D.prototype.resize = function() {
    let width = this.target.offsetWidth;
    let height = this.target.offsetHeight;
    this.renderer.setSize(width * window.devicePixelRatio, height * window.devicePixelRatio);
    this.renderer.domElement.style.width = width + "px";
    this.renderer.domElement.style.height = height + "px";
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.render();
}

Awesome3D.prototype.random = function(n) {
    return Math.floor(Math.random() * n + 1);
}

Awesome3D.prototype.addCube = function() {
    let cube = new THREE.BoxBufferGeometry(this.random(2), this.random(2), this.random(2));
    let material = new THREE.MeshLambertMaterial({ color: [this.random(255), this.random(255), this.random(255)].join("") * 1 });
    let mesh = new THREE.Mesh(cube, material);
    mesh.position.set(this.random(30), this.random(30), this.random(30));
    mesh.rotation.set(this.random(360) * Math.PI / 180, this.random(360) * Math.PI / 180, this.random(360) * Math.PI / 180);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    this.scene.add(mesh);

    return this.scene;
}

Awesome3D.prototype.addDirectionalLight = function(color) {
    let light1 = new THREE.DirectionalLight(color);
    light1.position.set(30, 40, 50);
    light1.castShadow = true;
    this.scene.add(light1);

    let light2 = new THREE.DirectionalLight(color);
    light2.position.set(-20, 40, -30);
    light2.castShadow = true;
    this.scene.add(light2);

    var alight = new THREE.AmbientLight(0x404040); // soft white light
    this.scene.add(alight);

    return this.scene;
}

Awesome3D.prototype.render = function() {
    this.renderer.render(this.scene, this.camera);
}

document.addEventListener("DOMContentLoaded", function() {
    var a3d = new Awesome3D(document.body);
    a3d.addDirectionalLight(0xffffff);
    for (var i = 0; i < 1000; i++) {
        a3d.addCube();
    }
    a3d.render();
});