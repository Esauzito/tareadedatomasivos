const db = require('../models/db');

//GET --> MARCAS

exports.listarProductos = async (req, res) => {
    const sql = 'SELECT * FROM productos';
    try {
        const [productos,fields] = await db.query(sql);
        res.status(200).json(productos);
    }catch(err){
        res.status(500).send({message: "Error en el servidor"},
        {error: err});
    }
};

exports.listarProductosId = async (req, res) => {
    const id = req.params.id;
    const sql = 'SELECT * FROM productos WHERE id_producto= ?';
    try {
        const [rows,fields] = await db.query(sql,[id]);
        
        if(rows.length === 0){
            res.status(404).send({message:'Usuario no encontrado'});
            return;
        }
        res.status(200).json(rows[0]);
    }catch(err){
        res
        .status(500)
        .send({message: "Error en el servidor"},
        {error: err});
    }
};

exports.agregarProducto = async (req,res) =>{
    const {nombre_producto, precio, descripcion, imagen, id_categoria, id_marca, estado, id_rol} = req.body;
    const sql = "INSERT INTO productos (nombre_producto, precio, descripcion, imagen, id_categoria, id_marca, estado, id_rol) VALUE (?,?,?,?,?,?,?,?)";
    try {
        const resultado = await db.query(sql, [nombre_producto, precio, descripcion, imagen, id_categoria, id_marca, estado, id_rol]);
        res.status(200).send({id: resultado.idInsertado,...req.body});
    } catch(err){
        res
        .status(500)
        .send({message:"Error en el producto"}, {error: err});
    }
} 

exports.actualizarProducto = async (req, res) => {
    const id = req.params.id;
    const {nombre_producto, precio, descripcion, imagen, id_categoria, id_marca, estado, id_rol} = req.body;
    const sql = "UPDATE productos SET nombre_producto = ?, precio = ?, descripcion = ?, imagen = ?, id_categoria = ?, id_marca = ?, estado = ?, id_rol = ? WHERE id_producto = ?";
    try {
        await db.query(sql, [nombre_producto, precio, descripcion, imagen, id_categoria, id_marca, estado, id_rol,id]);
        res.status(200).send({mensaje: "Producto actualizado"});
    } catch (err){
        res
           .status(500)
           .send({mensaje: "Error en el producto"}, {error: err});
    }
}

exports.eliminarProducto = async (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM productos WHERE id_producto = ?';
    try {
        await db.query(sql, [id]);
        res.status(200).send({mensaje: "Producto eliminado"});
    } catch (err){
        res
           .status(500)
           .status({mensaje: "Error al eliminar producto"}, {error: err});
    }
}