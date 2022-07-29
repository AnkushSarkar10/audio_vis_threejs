import * as THREE from "three";

const materialArray = [];
const fileName = "tropic";
const texture_ft = new THREE.TextureLoader().load(`/sky/${fileName}_ft.jpg`);
const texture_bk = new THREE.TextureLoader().load(`/sky/${fileName}_bk.jpg`);
const texture_up = new THREE.TextureLoader().load(`/sky/${fileName}_up.jpg`);
const texture_dn = new THREE.TextureLoader().load(`/sky/${fileName}_dn.jpg`);
const texture_rt = new THREE.TextureLoader().load(`/sky/${fileName}_rt.jpg`);
const texture_lf = new THREE.TextureLoader().load(`/sky/${fileName}_lf.jpg`);

materialArray.push(new THREE.MeshBasicMaterial({ map: texture_ft }));
materialArray.push(new THREE.MeshBasicMaterial({ map: texture_bk }));
materialArray.push(new THREE.MeshBasicMaterial({ map: texture_up }));
materialArray.push(new THREE.MeshBasicMaterial({ map: texture_dn }));
materialArray.push(new THREE.MeshBasicMaterial({ map: texture_rt }));
materialArray.push(new THREE.MeshBasicMaterial({ map: texture_lf }));

for (let i = 0; i < 6; i++) materialArray[i].side = THREE.BackSide;

const skyboxGeo = new THREE.BoxGeometry(10000, 10000, 10000);
export const sky = new THREE.Mesh(skyboxGeo, materialArray);

export default defineNuxtPlugin(() => {
    return {
    }
  })