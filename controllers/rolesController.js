const db = require('../models/db');

//GET --> MARCAS

exports.listarRoles = async (req, res) => {
    const sql = 'SELECT * FROM roles';
    try {
        const [roles,fields] = await db.query(sql);
        res.status(200).json(roles);
    }catch(err){
        res.status(500).send({message: "Error en el servidor"},
        {error: err});
    }
};

exports.listarRolesId = async (req, res) => {
    const id = req.params.id;
    const sql = 'SELECT * FROM roles WHERE id_rol= ?';
    try {
        const [rows,fields] = await db.query(sql,[id]);
        
        if(rows.length === 0){
            res.status(404).send({message:'Rol no encontrado'});
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

exports.agregarRol = async (req,res) =>{
    const {nombre_rol} = req.body;
    const sql = "INSERT INTO roles (nombre_rol) VALUE (?)";
    try {
        const resultado = await db.query(sql, [nombre_rol]);
        res.status(200).send({id: resultado.idInsertado,...req.body});
    } catch(err){
        res
        .status(500)
        .send({message:"Error en la marca"}, {error: err});
    }
} 

exports.actualizarRol = async (req, res) => {
    const id = req.params.id;
    const {nombre_rol} = req.body;
    const sql = "UPDATE roles SET nombre_rol = ? WHERE id_rol = ?";
    try {
        await db.query(sql, [nombre_rol, id]);
        res.status(200).send({mensaje: "Rol actualizado"});
    } catch (err){
        res
           .status(500)
           .status({mensaje: "Error en el rol"}, {error: err});
    }
}

exports.eliminarRol = async (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM roles WHERE id_rol = ?';
    try {
        await db.query(sql, [id]);
        res.status(200).send({mensaje: "Rol eliminado"});
    } catch (err){
        res
           .status(500)
           .status({mensaje: "Error al eliminar"}, {error: err});
    }
}