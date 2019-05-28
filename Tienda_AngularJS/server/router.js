const mongoose = require('mongoose');
const modelos = require("./modelos.js");
const ObjectId = mongoose.Types.ObjectId;

const Usuario = modelos.Usuario;
const Producto = modelos.Producto;
const router = require('express').Router();

//--LOGIN--
router.post("/login", function(req, res){
  //req.body: {email, contrasena}
  //res.body: {exito, [null] msjError, [null] error}
  Usuario.find({email:req.body.email}, (err, resultado)=>{
    if(err){
      //ERROR
      res.send({exito:false, msjError:"El servidor de la Base de Datos (mongo) no está disponible", error:err});
    } else {
      //No hay error
      if(resultado.length == 0){
        //Usuario no existe
        res.send({exito:false, msjError:"No existe el usuario "+req.body.email+" en la Base de Datos"});
      } else {
        //Usuario existe. Verificamos contraseña.
        if(resultado[0].contrasena == req.body.contrasena){
          //Logueamos creando un par de variables en la sesión de express
          req.session.logueado = true;
          req.session.email = req.body.email;
          console.log("El usuario "+req.session.email+" se ha logueado");
          res.send({exito:true});
        } else {
          //Contraseña incorrecta
          res.send({exito:false, msjError:"La contraseña es incorrecta"});
        }
      }
    }
  });
});

//--LOGOUT--
router.post("/logout", function(req, res){
  //req.body: {}
  req.session.destroy();
  res.send({exito:true});
})

//--OBTENER SESIÓN ACTUAL---
router.post("/getSesion", function(req, res){
  //req.body: {}

  //Recuperamos el usuario (usamos "" si no hay sesión abierta) y lo enviamos
  let usuarioLogueado = req.session.logueado ? req.session.email : "";
  res.send({usuarioLogueado:usuarioLogueado, exito:true});
});

//--OBTENER LISTA DE PRODUCTOS--
router.post("/productos", function(req, res){
  //req.body: {}

  Producto.find({}, (error, resultado)=>{
    if(error){
      //ERROR
      res.send({exito:false, msjError:"El servidor de la Base de Datos (mongo) no está disponible", error:error});
    } else {
      if(resultado.length == 0){
        //No hay productos en la BD
        res.send({exito:false, msjError:"No se pudieron encontrar productos en la base de datos."});
      } else {
        //Devolvemos los productos encontrados en la BD
        res.send({exito:true, productos:resultado});
      }
    }
  });
});

//--OBTENER "DETALLE" DE UN PRODUCTO PARTICULAR--
router.post("/productos/detalle", function(req, res){
  //req.body: {idProducto}
  console.log(req.body.idProducto);
  Producto.find({_id:req.body.idProducto}, (error, resultado)=>{
    if(error){
      //ERROR
      res.send({exito:false, msjError:"El servidor de la Base de Datos (mongo) no está disponible", error:error});
    } else {
      if(resultado.length == 0){
        //No existe el producto con esa id
        res.send({exito:false, msjError:"No se pudo encontrar el producto especificado en la base de datos."});
      } else {
        //Devolvemos el producto
        res.send({exito:true, producto:resultado[0]});
      }
    }
  });
});

//--ACTUALIZAR EL CARRITO EN LA BD--
router.post("/carrito/actualizar", function(req, res){
  //req.body: {listaProdsCarrito}
  if(!req.session.logueado){
    //No hay usuario logueado
    res.send({exito:false, msjError:"nohaylogin"});
  } else {

    //Actualizamos la propiedad prodsCarrito del usuario en la BD
    let prodsCarritoNuevos = req.body.listaProdsCarrito;
    Usuario.updateOne({email:req.session.email},{prodsCarrito:prodsCarritoNuevos}, (error, resultado)=>{
      if(error){
        //ERROR al actualizar
        res.send({exito:false, msjError:"El servidor de la Base de Datos (mongo) no está disponible", error:error});
      } else {
        if(resultado.n == 0){
          //ERROR imposible
          res.send({exito:false, msjError:"No se encontró al usuario logueado en la base de datos...?"});
        } else if(resultado.ok == 0){
          //ERROR, Mongo no pudo ejecutar la acción
          res.send({exito:false, msjError:"No se pudo actualizar el usuario en la base de datos."});
        } else {
          //Carrito actualizado
          res.send({exito:true});
        }
      }
    });
  }
});

//--OBTENER LISTA DEL CARRITO DEL USUARIO EN SESIÓN (Persistencia entre sesiones)--
router.post("/carrito/getListaProds", function(req, res){
  //req.body: {}
  if(!req.session.logueado){
    //No hay usuario logueado
    res.send({exito:false, msjError:"nohaylogin"});
  } else {
    Usuario.find({email:req.session.email}, (error, resultado)=>{
      if(error){
        //ERROR
        res.send({exito:false, msjError:"El servidor de la Base de Datos (mongo) no está disponible", error:error});
      } else {
        //Devolvemos la lista del carrito
        res.send({exito:true, prodsCarrito:resultado[0].prodsCarrito});
      }
    });
  }
})

//--PAGAR PRODUCTOS Y RESTARLOS DEL STOCK--
router.post("/carrito/pagar", function(req, res){
  //req.body:{}
  if(!req.session.logueado){
    //No hay usuario logueado
    res.send({exito:false, msjError:"nohaylogin"});
  } else {
    //Buscamos el usuario en sesión en la BD
    Usuario.find({email:req.session.email}, (error, resultado)=>{
      if(error){
        //ERROR
        res.send({exito:false, msjError:"El servidor de la Base de Datos (mongo) no está disponible", error:error});
      } else {
        //Usuario encontrado. Tomamos la lista de su carrito de la BD
        let prodsCarritoBD = resultado[0].prodsCarrito;
        let errorProducto = false; //La convertiremos a true si el stock de algún producto no puede ser actualizado

        let queryFiltro = []; //Filtro al que agregaremos las id de todos los productos presentes el la lista del carrito

        for(let i=0; i<prodsCarritoBD.length; i++){
          queryFiltro.push(ObjectId(prodsCarritoBD[i].idProducto)); //Ver documentación de mongoose. ObjectId se usa como un filtro de id para encontrar un producto
        }

        //Buscamos todos los productos de la compra
        Producto.find({_id:{ $in:queryFiltro}}, (error, resultado)=>{
          if(error){
            //ERROR
            res.send({exito:false, msjError:"Error al buscar los productos en la Base de Datos", error:error});
          } else {
            if(resultado.length < prodsCarritoBD.length){ //Verificamos que encontramos tantos productos como había en el carrito
              //ERROR: Faltó encontrar algún producto
              res.send({exito:false, msjError:"Al menos uno de los productos requeridos ya no existe en la BD"});
            } else {
              //Ahora intentaremos restar los productos del stock
              let noAlcanzaStock = false;

              for(let i=0; i<resultado.length; i++){ //Recorremos la lista de productos obtenidos de la BD

                //---Emparejamos el producto obtenido de la BD con el item del carrito correspondiente---
                let prodCarritoCorrespondiente;
                for(let j=0; j<prodsCarritoBD.length; j++){
                  if(prodsCarritoBD[j].idProducto == resultado[i]._id){
                    prodCarritoCorrespondiente = prodsCarritoBD[j];
                    break;
                  }
                }
                //---------------------------------------------------------------------------------------

                //Verificamos que haya suficiente stock para el pedido realizado. Si no es así terminamos el bucle.
                if(resultado[i].stock < prodCarritoCorrespondiente.cantidad){
                  noAlcanzaStock = true;
                  break;
                }
              }

              if(noAlcanzaStock){
                //No hay suficiente stock
                res.send({exito:false, msjError:"No hay suficiente stock para uno de los productos."});
              } else {

                //Hay stock. Empezamos a actualizar los números en la BD
                //Haremos todas las queries indiviuales como una única Transaction de mongo/mongoose por si en alguna de ellas existe un error
                let sesion;
                mongoose.startSession().then((_sesion)=>{
                  sesion = _sesion;
                  sesion.startTransaction(); //Inciamos la transacción

                  let todoCorrecto = true;
                  let cantProductosActualizados = 0; //Vamos contando los productos a los que ya le restamos los items al stock

                  let unError = null; //Guardaremos aquí un único error de los que ocurran, si ocurren.
                  let mensajesError = ""; //Guardaremos aquí posibles mensajes de error

                  for(let i=0; i<prodsCarritoBD.length; i++){ //Para cada producto del carrito
                    //Actualizamos
                    Producto.updateOne(
                      {_id:prodsCarritoBD[i].idProducto},
                      {$inc:{stock:-prodsCarritoBD[i].cantidad},}, //"Incrementamos" el stock del producto por -cantidad (así se resta en mongoose)
                      (error, resultado)=>{
                        if(error){
                          //ERROR al actualizar este producto
                          unError = error;
                          mensajesError += " | Error al actualizar stock del producto cuya id es "+prodsCarritoBD[i].idProducto;
                          todoCorrecto = false;
                        } else {
                          if(!resultado.ok){
                            //ERROR, Mongo no puede realizar la actualización
                            mensajesError += " | No se pudo actualizar stock del producto cuya id es "+prodsCarritoBD[i].idProducto;
                            todoCorrecto = false;
                          }
                        }

                        cantProductosActualizados++;
                        if(cantProductosActualizados == prodsCarritoBD.length){ //Verificamos si éste es el último producto
                          if(todoCorrecto){
                            //Productos actualizados con éxito
                            //Vaciamos el carrito del usuario
                            Usuario.updateOne({email:req.session.email},{prodsCarrito:[]}, (error, resultado)=>{
                              if(error){
                                //ERROR al intentar vaciar el carrito
                                sesion.abortTransaction(); //Cancelamos la transacción, deshaciendo la compra
                                res.send({exito:false, msjError:mensajesError, error:error});
                              } else {
                                //Carrito vaciado
                                sesion.commitTransaction(); //Hacemos commit de todos los cambios en la BD que hicimos
                                res.send({exito:true});
                              }
                            })
                          } else {
                            //ERROR en al menos un updateOne de algún producto
                            sesion.abortTransaction(); //Cancelamos la transacción, deshaciendo los updateOne que hayamos hecho
                            res.send({exito:false, msjError:mensajesError, error:unError});
                          }
                        }
                      }
                    );
                  }
                });
              }
            }
          }
        })
      }
    });
  }
})

module.exports = router;
