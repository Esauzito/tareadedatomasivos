const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const categoriaRoutes = require('./routes/categoriaRoutes'); 
const marcasRoutes = require('./routes/marcasRoutes');
const estadosRoutes = require('./routes/estadosRoutes');
const rolesRoutes = require("./routes/rolesRoutes");
const usuariosRoutes = require("./routes/usuariosRoutes");
const ventasRoutes = require("./routes/ventasRoutes");
const productsRoutes = require("./routes/productsRoutes");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/categorias", categoriaRoutes);
app.use("/brands",marcasRoutes);
app.use("/estados", estadosRoutes);
app.use("/roles", rolesRoutes);
app.use("/usuarios", usuariosRoutes);
app.use("/ventas", ventasRoutes);
app.use("/productos", productsRoutes);

const PORT = 3001;
app.listen(PORT, () => {
    console.log('Server running:http://localhost:3001',{PORT});
})