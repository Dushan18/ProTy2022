import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tareaTp';
}


// let nombre: string;
// nombre = "Ivan Molero";
// console.log("Nombre: ", nombre);

// let cantidad: number;
// cantidad = 15;
// console.log("cantidad: ", cantidad);

// let incremento: string;
// incremento = "35";
// console.log ("incremento: ", incremento);
// console.log("total: ", (cantidad + parseInt (incremento)));

// let estaActivo: boolean = true;
// console.log ("esta activo: ", estaActivo);
// console.log (nombre, cantidad, incremento, estaActivo);

// let Array: number[];
// Array=[1,2,3,4]
// console.log(Array)

// let pasatiempos: string[];
// pasatiempos = ["ajedrez", "videojuegos", "correr"];
// console.log(pasatiempos);

// pasatiempos.push("nadar");
// console.log(pasatiempos);

// pasatiempos.unshift("comer");
// console.log(pasatiempos);

// pasatiempos.pop();
// console.log(pasatiempos);

// pasatiempos.shift();
// console.log(pasatiempos);

// let var01: string | number;
// const vare2: string = "variable 2"; 

// var01 = "variable 1";
// console. log(var01);
// console.log(vare2);

// var01 = 5;
// console.log(var01);

// let pasatiempos: (string | number) [] = ['ajedrez', 'peliculas'];
// pasatiempos.push(5);
// console.table(pasatiempos);

// interface Estudiante {
//   nombre: string,
//   aPaterno: string,
//   pension: number,
//   estaMatriculado: boolean
// } 

// let alumno: Estudiante;
// alumno = {
//   nombre: "Juan",
//   aPaterno: "Lopez",
//   pension: 850,
//   estaMatriculado: false
// };
//-------------------------------------------------------------------------------------------------------------------------------------------------


//Proyecto
//Datos

interface Almacen{
  nombre_Almacen: string,
  codigo_Almacen: string,
  tiene_Productos: Producto[]
}

interface Producto{
  nombre_Producto: string,
  codigo_Producto: string,
  pertenece_ALmacen?: Almacen,
  cantidad_Producto: number
}

var almacen: Almacen[] = [];
almacen.push({
  nombre_Almacen: "Alcoholes",
  codigo_Almacen: "001A",
  tiene_Productos: [],
  
})

almacen.push({
  nombre_Almacen: "Lactios",
  codigo_Almacen: "001L",
  tiene_Productos: [],
  
})

var producto:Producto[] =[];
producto.push({
  nombre_Producto: "Cerveza",
  codigo_Producto: "001AC",
  cantidad_Producto: 0,
})

function MostrarP(params:Almacen[] | Producto[]) : void { 
  console.table(params)
}

MostrarP(almacen)
MostrarP(producto)




function CrearProducto(listaPro:Producto[], nombreP:string, codigoP:string) :void {
  var nuevoP:Producto={
    nombre_Producto: nombreP,
    codigo_Producto: codigoP,
    cantidad_Producto: 0,
  }
  listaPro.push(nuevoP);
  console.log("Creo nuevbo Producto: "+nombreP)
}
CrearProducto(producto, "vino", "001AV")
MostrarP(almacen)
MostrarP(producto)
 
function RetornarPosicionA(lista: Almacen[], nombre:string ): number{
  var posicion: number = 0;
  var retornar: number = -1
  while (posicion<= lista.length){
    if (lista[posicion].nombre_Almacen==nombre){
      retornar = posicion;
      break;
    }
    posicion++;
  }
  return retornar;
}

function RetornarProducto(lista: Producto[], nombre:string ): number{
  var posicion: number = 0;
  var retornar: number = -1
  while (posicion<= lista.length){
    if (lista[posicion].nombre_Producto==nombre){
      retornar = posicion;
      break;
    }
    posicion++;
  }
  return retornar;
}

function AgregarA(listaPro:Producto[], listaA: Almacen[], cantidadP: number, nombreP:string, nombreA:string){
  if (RetornarPosicionA(listaA, nombreA)>= 0){
    listaPro[RetornarProducto(listaPro, nombreP)].cantidad_Producto=cantidadP
    listaPro[RetornarProducto(listaPro, nombreP)].pertenece_ALmacen=listaA[RetornarPosicionA(listaA, nombreA)]
    listaA[RetornarPosicionA(listaA, nombreA)].tiene_Productos.push(listaPro[RetornarProducto(listaPro, nombreP)])
    console.log("Se agrego Producto: "+ nombreP, "almacen: "+ nombreA)
  }
  else{
    console.log("almacen no existe")
  }
}

AgregarA(producto,almacen,100,"vino","Alcoholes")
MostrarP(almacen)
MostrarP(producto)

function CrearA(listaPro:Almacen[], nombreA:string, codigoA:string) :void {
  var nuevoA:Almacen={
    nombre_Almacen: nombreA,
    codigo_Almacen: codigoA,
    tiene_Productos: []
  }
  listaPro.push(nuevoA);
  console.log("Creo nuevo Almacen: "+nombreA)
}
CrearA(almacen,"Carnes","001C")
AgregarA(producto,almacen,100,"Cerveza","Alcoholes")
MostrarP(almacen)
MostrarP(producto)

function MoverAlmacen(listaPro:Producto[], listaA:Almacen[], almacenActual:string, almacenNuevo:string, posActual: number, nombreP:string):void{
  if (RetornarPosicionA(listaA,almacenNuevo)>=0){
    listaA[RetornarPosicionA(listaA,almacenNuevo)].tiene_Productos.push(listaPro[RetornarProducto(listaPro, nombreP)])
    listaPro[RetornarProducto(listaPro, nombreP)].pertenece_ALmacen=listaA[RetornarPosicionA(listaA, almacenNuevo)]
    listaA[RetornarPosicionA(listaA,almacenActual)].tiene_Productos.splice(posActual,posActual)
    console.log("Se elimino")
  }
  else{
    console.log("No esxiste almacen")
  }
}
MoverAlmacen(producto,almacen,"Alcoholes","Carnes",1,"Cerveza")
MostrarP(almacen)
MostrarP(producto)

function ModificarCantidad(listaPro:Producto[], nombre_Producto:string, operacion:string, cantidad: number){
  if (operacion== "añadir"){
    listaPro[RetornarProducto(listaPro, nombre_Producto)].cantidad_Producto += cantidad 
    console.log("Se incremento la  cantidad")
  }
  else if (operacion=="disminuir"){
    
    if (cantidad>listaPro[RetornarProducto(listaPro,nombre_Producto)].cantidad_Producto){
      console.log("La cantidad no se puede restar")
    }
    listaPro[RetornarProducto(listaPro, nombre_Producto)].cantidad_Producto -= cantidad
    console.log("Se disminuyo la  cantidad")

  }
  else{
    console.log("No existe operacion")
  }
}