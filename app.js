const mongoose = require('mongoose');

// https://mongoosejs.com/
// https://account.mongodb.com/account/login
// https://mongoosejs.com/docs/index.html
mongoose.connect('mongodb://localhost:27017/demo', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Conectado a MongoDB...'))
    .catch(err => console.log('No se pudo conectar con MongoDb..', err))

const cursoSchema = new mongoose.Schema({ 
    nombre    : String,
    autor     : String,
    etiquetas : [String],
    fecha     : {type: Date, default: Date.now},
    publicado : Boolean
});

const Curso = mongoose.model('Curso', cursoSchema);

async function crearCurso(){ 
    // Creacion del modelo
    const curso = new Curso({ 
        nombre : 'sql server', 
        autor : 'Anthony',
        etiquetas : ['Desarrollo', 'Front end'],
        publicado: true
    });

    // await es una espera
    const resultado = await curso.save();
    console.log(resultado);
}
// crearCurso();

// --------------------------------------------------------------------------------------------
// find nos sirve para realizar consultas
async function listarCurso(){
    // api/Cursos?numeroPage=4&sizePage=10
    const numeroPage = 2; 
    const sizePage = 10;

    // -----------------------------------------------------------------------------------
    // OPERADORES DE COMPARACION
    // eq (equal, igual)
    // ne (not equal, no igual)
    // gt (greater than, mayor o igual que)
    // gte (greater than or equal to, mayor o igual que)
    // lt (less than, menor que)
    // lte (less than or equal to, menor o igual que)
    // in 
    // nin (not in)
    // ----------------------------------------------------------------------------------
    // OPERADORES LOGICOS
    // or
    // and
    const cursos = await Curso
    // OPERADORES DE COMPARACION
        // {mayor a 10 menor a 30}
        // .find({precio : {$gte: 10, lte: 30}})
        // Se le dice unicamente los precios que desea [10, 15, 25]
        // .find({precio: {$in: [10, 15, 25]}})

    // OPERADORES LOGICOS 
        // .find()
        // .or([{autor : 'Emanuel'}, {publicado : true}])
        // .and([{autor : 'Emanuel'}, {publicado : true}])

    // Expresiones regulares
        // Cuando empiece en
        // .find({ autor:/^Ju/})
        // Cuando termine en
        // .find({autor: /uan$/}) 
        // Cuando un campo tiene contenido especifico 
        // .find({ autor: /.*Ju*/})
        

        // {adentro se le puede dar procesos para mostrar dicha informacion}
        // .find({autor: 'Emanuel'})
        .find()
        .skip((numeroPage - 1) * sizePage)
        // Limite de datos
        .limit(sizePage)
        // 1 muestra el dato de forma ascendente y -1 de forma descendente.
        .sort({autor: 1})
        // unicamente muestra los datos que se coloquen
        .select({autor : 1, nombre: 1, etiquetas:1});
    console.log(cursos); 
}
// listarCurso(); 
// --------------------------------------------------------------------------------------------------------

async function actualizarCurso(id){ 
    const curso = await Curso.findById(id);
    if(!curso){ 
        console.log('El curso no existe'); 
        return; 
    }
    curso.publicado = false; 
    curso.autor = 'Emanuel Estrada'; 

    // Otra forma de poder realizar utilizando set
    // curso.set({ 
    //     publicado : false,
    //     autor : 'Emanuel Estrada'
    // })
    const resultado = await curso.save(); 
    console.log(resultado);
}

// actualizarCurso('5f39da72b416ba1ca8c83138');

// Otro metodo para poder actualizar
// https://docs.mongodb.com/manual/introduction/ pagina de mongo db su documentacion
// https://docs.mongodb.com/manual/reference/operator/update/
async function actualizarCurso2(id){ 
    const curso = await Curso.findById(id);
    const resultado = await Curso.update({_id : id}, {
        $set: { 
            autor: 'Emanuel',
            publicado: true
        }
    });
    console.log(resultado);
}
// actualizarCurso2('5f39da72b416ba1ca8c83138');

// Otro  elemento Update 
async function actualizarCurso3(id){ 
    const resultado = await Curso.findByIdAndUpdate(id,{ 
        $set: { 
            autor: 'Juan Solis',
            publicado: false
        }
    },/*Con este {new: true} se muestran los datos actualizados 
    sin el se muestran los datos antes de actualizar*/ {new: true});
    console.log(resultado);
}
// actualizarCurso3('5f39dd375d2a3f2a2ce58748');

// Eliminacion de un documento 
async function eliminarDocumento(id){
    const result = await Curso.deleteOne({_id: id});
    console.log('Documento eliminado', result); 
}
// eliminarDocumento('5f39f0b8d38a5f05ecd60d75');

// Eliminacion de un documento de otra forma
// Este muestra la informacion del documento eliminado

async function eliminarDocumento(id){
    const result = await Curso.findByIdAndDelete(id);
    console.log('Documento eliminado', result); 
}
eliminarDocumento('5f39f0b37781e636280d67f8');