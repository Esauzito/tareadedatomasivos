const db = require('../models/db');

//GET --> VENTAS

exports.listarVentas = async (req, res) => {
    const sql = 'SELECT ventas.*, productos.precio FROM ventas INNER JOIN productos ON ventas.id_producto = productos.id_producto';
    try {
        const [ventas,fields] = await db.query(sql);
        res.status(200).json(ventas);
    }catch(err){
        res.status(500).send({message: "Error en el servidor"},
        {error: err});
    }
};

exports.listarVentasId = async (req, res) => {
    const id = req.params.id;
    const sql = 'SELECT * FROM ventas WHERE id_venta= ?';
    try {
        const [rows,fields] = await db.query(sql,[id]);
        
        if(rows.length === 0){
            res.status(404).send({message:'Venta no encontrada'});
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

exports.agregarVenta = async (req,res) =>{
    const {id_usuario,id_producto,cantidad,fecha_venta} = req.body;
    const sql = "INSERT INTO ventas (id_usuario,id_producto,cantidad) VALUE (?,?,?)";
    try {
        const resultado = await db.query(sql, [id_usuario,id_producto,cantidad,fecha_venta]);
        res.status(200).send({id: resultado.idInsertado,...req.body});
    } catch(err){
        res
        .status(500)
        .send({message:"Error en la venta"}, {error: err});
    }
} 

exports.actualizarVenta = async (req, res) => {
    const id = req.params.id;
    const {id_usuario,id_producto,cantidad,fecha_venta} = req.body;
    const sql = "UPDATE ventas SET id_usuario = ?, id_producto = ?, cantidad = ? WHERE id_venta = ?";
    try {
        await db.query(sql, [id_usuario,id_producto,cantidad,fecha_venta, id]);
        res.status(200).send({mensaje: "Venta actualizada"});
    } catch (err){
        res
           .status(500)
           .send({mensaje: "Error en la venta"}, {error: err});
    }
}

exports.eliminarVenta = async (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM ventas WHERE id_venta = ?';
    try {
        await db.query(sql, [id]);
        res.status(200).send({mensaje: "Venta eliminada"});
    } catch (err){
        res
           .status(500)
           .status({mensaje: "Error al eliminar"}, {error: err});
    }
}