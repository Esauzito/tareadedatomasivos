const db = require('../models/db');

//GET --> MARCAS

exports.listarEstados = async (req, res) => {
    const sql = 'SELECT * FROM estados';
    try {
        const [estados,fields] = await db.query(sql);
        res.status(200).json(estados);
    }catch(err){
        res.status(500).send({message: "Error en el servidor"},
        {error: err});
    }
};

exports.listarEstadosId = async (req, res) => {
    const id = req.params.id;
    const sql = 'SELECT * FROM estados WHERE id_estado= ?';
    try {
        const [rows,fields] = await db.query(sql,[id]);
        
        if(rows.length === 0){
            res.status(404).send({message:'Estado no encontrado'});
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

exports.agregarEstado = async (req,res) =>{
    const {nombre_estado} = req.body;
    const sql = "INSERT INTO estados (nombre_estado) VALUE (?)";
    try {
        const resultado = await db.query(sql, [nombre_estado]);
        res.status(200).send({id: resultado.idInsertado,...req.body});
    } catch(err){
        res
        .status(500)
        .send({message:"Error en el estado"}, {error: err});
    }
} 

exports.actualizarEstado = async (req, res) => {
    const id = req.params.id;
    const {nombre_estado} = req.body;
    const sql = "UPDATE estado SET nombre_estado = ? WHERE id_estado = ?";
    try {
        await db.query(sql, [nombre_estado, id]);
        res.status(200).send({mensaje: "Estado actualizado"});
    } catch (err){
        res
           .status(500)
           .status({mensaje: "Error en el estado"}, {error: err});
    }
}

exports.eliminarEstado = async (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM estado WHERE id_estado = ?';
    try {
        await db.query(sql, [id]);
        res.status(200).send({mensaje: "Estado eliminado"});
    } catch (err){
        res
           .status(500)
           .status({mensaje: "Error al eliminar"}, {error: err});
    }
}