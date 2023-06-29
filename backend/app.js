const express = require("express");
const cors = require('cors');

const expence = require('./database');


const app =express();


app.use(cors());
app.use(express.json());


try{
  app.post('/saveProduct',async (req,res,next)=>{

    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const quantity = req.body.quantity;
    let data = await expence.create({name: name,description: description,price: price,quantity: quantity});
    res.send('success');
  });
}
catch(err){console.log(err)};


try{
  app.get('/getProducts',async (req,res)=>{
    const expences = await expence.findAll();
    res.json(expences);
  });
}
catch(err){console.log(err)};
// app.patch('/updateUser/:id',async (req,res)=>{
//   let Uid = req.params.id;

//   let updateUser = await user.findByPk(Uid);
//     updateUser.name = req.body.name;
//     updateUser.phone = req.body.phone;
//     updateUser.email = req.body.email;
//     await updateUser.save();
//     res.json(1);

// });

try{
app.delete('/deleteExpence/:id', async (req,res)=>{
  let Uid = req.params.id;
  await expence.destroy({ where: { id: Uid } });
  res.send('success');
});}

catch(err){console.log(err)};


expence
  .sync()
  .then(result => app.listen(3000))
  .catch(err => console.log(err));