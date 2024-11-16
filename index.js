const express = require('express');
const db = require('./db');
const app = express();
const cors = require('cors');

/* mysql://root:pGHkGMtjlbeYnUqAFJbMIOOdwAkqkpJY@junction.proxy.rlwy.net:13624/railway */

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('API de la tienda en línea');
});

// CRUD para Usuarios
app.get('/usuarios', (req, res) => {
    db.query('SELECT * FROM Usuarios', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

app.get('/usuarios/:id', (req, res) => {
    db.query('SELECT * FROM Usuarios WHERE idUsuario = ?', [req.params.id], (err, result) => {
        if (err) return res.status(500).send(err);
        if (result.length === 0) return res.status(404).send('Usuario no encontrado');
        res.json(result[0]);
    });
});

app.post('/usuarios', (req, res) => {
    const { nombreCompleto, tipo, correoElectronico, password, telefono, domicilio } = req.body;
    db.query('INSERT INTO Usuarios SET ?', { nombreCompleto, tipo, correoElectronico, password, telefono, domicilio }, (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).send(`Usuario creado con ID: ${result.insertId}`);
    });
});

app.put('/usuarios/:id', (req, res) => {
    const { nombreCompleto, tipo, correoElectronico, password, telefono, domicilio } = req.body;
    db.query('UPDATE Usuarios SET ? WHERE idUsuario = ?', [{ nombreCompleto, tipo, correoElectronico, password, telefono, domicilio }, req.params.id], (err) => {
        if (err) return res.status(500).send(err);
        res.send('Usuario actualizado');
    });
});

app.delete('/usuarios/:id', (req, res) => {
    db.query('DELETE FROM Usuarios WHERE idUsuario = ?', [req.params.id], (err) => {
        if (err) return res.status(500).send(err);
        res.send('Usuario eliminado');
    });
});

// Obtener todos los empleados
app.get('/empleados', (req, res) => {
    db.query('SELECT * FROM Empleados', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// Obtener un empleado por ID
app.get('/empleados/:id', (req, res) => {
    db.query('SELECT * FROM Empleados WHERE idEmpleados = ?', [req.params.id], (err, result) => {
        if (err) return res.status(500).send(err);
        if (result.length === 0) return res.status(404).send('Empleado no encontrado');
        res.json(result[0]);
    });
});

// Agregar un nuevo empleado
app.post('/empleados', (req, res) => {
    const { empresa, nombreCompleto, curp, fechaNacimiento, fechaIngresoEmpresa, especialidad, correoElectronicoE, telefonoE, domicilio } = req.body;
    db.query('INSERT INTO Empleados SET ?', { empresa, nombreCompleto, curp, fechaNacimiento, fechaIngresoEmpresa, especialidad, correoElectronicoE, telefonoE, domicilio }, (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).send(`Empleado creado con ID: ${result.insertId}`);
    });
});

// Actualizar un empleado por ID
app.put('/empleados/:id', (req, res) => {
    const { empresa, nombreCompleto, curp, fechaNacimiento, fechaIngresoEmpresa, especialidad, correoElectronicoE, telefonoE, domicilio } = req.body;
    db.query('UPDATE Empleados SET ? WHERE idEmpleados = ?', [{ empresa, nombreCompleto, curp, fechaNacimiento, fechaIngresoEmpresa, especialidad, correoElectronicoE, telefonoE, domicilio }, req.params.id], (err) => {
        if (err) return res.status(500).send(err);
        res.send('Empleado actualizado');
    });
});

// Eliminar un empleado por ID
app.delete('/empleados/:id', (req, res) => {
    db.query('DELETE FROM Empleados WHERE idEmpleados = ?', [req.params.id], (err) => {
        if (err) return res.status(500).send(err);
        res.send('Empleado eliminado');
    });
});

// Endpoint de Login
app.post('/login', (req, res) => {
    const { correoElectronico, password } = req.body;
    console.log("correo: "+correoElectronico+ "password: " +password);
    db.query('SELECT * FROM Usuarios WHERE correoElectronico = ? AND password = ?', [correoElectronico, password], (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) return res.status(401).send('Credenciales incorrectas');
        res.send('Login exitoso');
    });
});

const PORT = process.env.PORT || 3000;  
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
