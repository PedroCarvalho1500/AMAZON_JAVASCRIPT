class Car{
    #brand;
    #model;
    speed;
    isTrunkOpen;

    constructor(brand,model,isTrunkOpen){
        this.#brand = brand;
        this.#model = model;
        this.speed = 0;
        this.isTrunkOpen = isTrunkOpen;
    }

    displayInfo(){
        return `${this.#brand} ${this.#model}, Speed: ${this.speed}km/h isTrunk? ${this.isTrunkOpen}`
    }

    go(){
        this.speed = this.isTrunkOpen === true || this.speed === 200 ? 0 : this.speed + 5;
    }

    brake(){
        this.speed= this.speed >= 5 ? this.speed -5 : 0;
    }

    openTrunk(){
        this.isTrunkOpen = this.speed === 0 ? true : false;
    }

    closeTrunk(){
        this.isTrunkOpen = false;
    }

    getBrand() {
        return this.#brand;
    }
      
    setBrand(newBrand) {
        this.#brand = newBrand;
    }

    getModel() {
        return this.#model;
    }
      
    setModel(newModel) {
        this.#model = newModel;
    }

    getSpeed(){
        return this.speed;
    }
}


class RaceCar extends Car{
    acceleration;
    constructor(brand,model,acceleration){
        super(brand,model);
        this.acceleration = acceleration;
    }

    go(){
        this.speed = this.speed === 300 ? 0 : this.speed + this.acceleration;
    }

    openTrunk(){
        return ``;
    }

    closeTrunk(){
        return ``;
    }

    displayInfo(){
        return `${this.getModel()} ${this.getBrand()}, Speed: ${this.speed}km/h`
    }
}

const car1 = new Car("Toyota","Corolla",false)
//const car1 = new Car({brand:'Toyota',model:'Corolla',isTrunkOpen: false});
const car2 = new Car('Tesla', 'Model 3',false);
const raceCar1 = new RaceCar('McLaren','F1',20);
//console.log(`MODEL ${raceCar1.getModel()}`);

//const raceCar3 = new RaceCar()

console.log(car1.displayInfo());
car1.openTrunk();
console.log(car1.displayInfo());
car1.go();
console.log(car1.displayInfo());
car1.brake();
car1.closeTrunk();
car1.go();
console.log(car1.displayInfo());
console.log(raceCar1.displayInfo());
console.log(raceCar1.acceleration);
for(let i=0;i<10;i++){
    raceCar1.go();
}
console.log(raceCar1.displayInfo());