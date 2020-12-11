const controller = {};

controller.list = (req, res) => {
  req.getConnection((err, conn) =>{
    conn.query('SELECT * FROM alumnos', (err, alumnos) => {
        if (err){
            res.json(err);
        }
        res.render('alumnos', {
            data: alumnos
        });
    });
  
});
};

controller.edit = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) =>{
        conn.query('SELECT * FROM alumnos WHERE id = ?', [id], (err, alumnos) =>{
            res.render('customer_edit', {
                data: alumnos[0]
            });
        });
    });
}

controller.update = (req, res) => {
    const { id } = req.params;
    const newCustomer = req.body;
    req.getConnection((err, conn) =>{
        conn.query('UPDATE alumnos set ? WHERE id = ?', [newCustomer, id], (err, alumnos) =>{
            res.redirect('/');
        });
    });
}

controller.delete = (req, res) => {
    req.getConnection((err, conn) =>{
        const { id } = req.params;
        conn.query('DELETE FROM alumnos WHERE id = ?', [id], (err, rows) =>{
            res.redirect('/');
        });
    });
    
    
};

controller.save = (req, res) => {
    const data = req.body;
    req.getConnection((err, conn) =>{
        conn.query('INSERT INTO alumnos set ?', [data], (err, alumnos) =>{
            res.redirect('/');
        });
    });
    
};


module.exports = controller;