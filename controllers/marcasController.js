const db = require('../models/db');

//GET --> MARCAS

exports.listarMarcas = async (req, res) => {
    const sql = 'SELECT nombre_marca FROM marcas';
    try {
        const [marcas,fields] = await db.query(sql);
        res.status(200).json(marcas);
    }catch(err){
        res.status(500).send({message: "Error en el servidor"},
        {error: err});
    }
};

exports.listarMarcasId = async (req, res) => {
    const id = req.params.id;
    const sql = 'SELECT * FROM marcas WHERE id_marca= ?';
    try {
        const [rows,fields] = await db.query(sql,[id]);
        
        if(rows.length === 0){
            res.status(404).send({message:'Marca no encontrada'});
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

exports.agregarMarca = async (req,res) =>{
    const {nombre_marca} = req.body;
    const sql = "INSERT INTO marcas (nombre_marca) VALUE (?)";
    try {
        const resultado = await db.query(sql, [nombre_marca]);
        res.status(200).send({id: resultado.idInsertado,...req.body});
    } catch(err){
        res
        .status(500)
        .send({message:"Error en la marca"}, {error: err});
    }
} 

exports.actualizarMarca = async (req, res) => {
    const id = req.params.id;
    const {nombre_marca} = req.body;
    const sql = "UPDATE marcas SET nombre_marca = ? WHERE id_marca = ?";
    try {
        await db.query(sql, [nombre_marca, id]);
        res.status(200).send({mensaje: "Marca actualizada"});
    } catch (err){
        res
           .status(500)
           .status({mensaje: "Error en la marca"}, {error: err});
    }
}

exports.eliminarMarca = async (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM marcas WHERE id_marca = ?';
    try {
        await db.query(sql, [id]);
        res.status(200).send({mensaje: "Marca eliminada"});
    } catch (err){
        res
           .status(500)
           .status({mensaje: "Error al eliminar"}, {error: err});
    }
}