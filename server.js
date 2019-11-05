var express = require('express') ;
var path = require('path') ;
var body_parser= require('body-parser') ;
var mongo=require('mongoose') ;
var db=mongo.connect("mongodb://localhost:27017/AngularCRUD",function(err,response){
    if(err){
        console.log(err);
    }
    else{
        console.log('connected to'|db,'|',response);
    }

    }
);
var app=express();
app.use(body_parser());
app.use(body_parser.json({limit:'5mb'}));
app.use(body_parser.urlencoded({extended:true})) ;

app.use(function(req,res,next){
    
  res.setHeader('Access-Control-Allow-Origin','http://localhost:4200') ;
  res.setHeader('Access-Control-Allow-Methods','GET,POST,OPTIONS,PUT,PATCH,DELETE') ;
  res.setHeader('Access-Control-Allow-Headers','X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials',true) ;
  next() ;
});
var Schema=mongo.Schema ;
var underTaskShema=new Schema({
    title:{type:String},
    state:{type:Boolean}},{versionKey:false}
);
var skilShema=new Schema({
    title:{type:String}},{versionKey:false}

);
var UserShema=new Schema({
    login:{type:String},
    password:{type:String},
    name:{type:String},
    age:{type:String},
    telnumber:{type:String},
    state:{type:String},
    isadmin:{type:Boolean},
    profession:{type:String},
    urlPhoto:{type:String},
    skills:[skilShema]


},
    
    {versionKey:false}
) ;
var TaskShema=new Schema({
   title:{type:String},
   description:{type:String},
   responsible:[UserShema],
   state:{type:String},
   progression:{type:String},
   prioritie:{type:String},
   underTask:[underTaskShema]

},{versionKey:false}) ;
                                                               
var model =mongo.model('users',UserShema,'users') ;
app.post("/api/SaveUser",function(req,res){
    var mod=new model(req.body);
    mod.save(function(err,data){
        if(err){
            res.send(err);
        }
        else{
            res.send({data:"Record has been updated.!"}) ;
            console.log(data) ;
        }

    });

}) ;
                                                     
app.post("/api/UpdateUser",function(req,res){
    model.findByIdAndUpdate(req.body._id,{login:req.body.login,password:req.body.password,name:req.body.name,age:req.body.age,telnumber:req.body.telnumber,state:req.body.state,isadmin:req.body.isadmin,profession:req.body.profession,skills:req.body.skills},function(err,data){
        if(err){
            res.send(err);
        }
         else {
            res.send({data:"Record has been updated"}) 

        }
    });
});
app.post("/api/deleteUser",function(req,res){
    model.deleteOne({ _id: req.body.userId},function(err){
        if(err){
            console.log(err) ;
            res.send(err) ;

        }
        else{
            res.send({data:"Record has been deleted"} ) ;
        }
    });
});
                                            
app.get("/api/getUser",function(req,res){
    model.find({},function(err,data){
      if(err){
          res.send(err) ;
      }
      else{
          console.log("users has been sended")
          res.send(data) ;
      }
    });
}) ;

 app.post("/api/Login",function(req,res){
     var login=req.body.login ;
     var password =req.body.password ;
         model.findOne(
             {
                login:login,
                password:password
            
            },
             function(err,user){
                 if(err){
                    console.log('Problem !!!!') ;   
                     return res.status(500).send() ;
                                    
                 }
                 if(!user){ 
                     console.log("user not fownd") ;
                     return res.status(404).send() ;
                    
                  }
                  console.log("user exist ok --");
                  console.log(user) ;
                  return res.status(200).send(user) ;
            }
     )});
     app.post("/api/getUserById",function(req,res){
         console.log(req.body.userId) ;
         model.findOne({_id:req.body.userId},function(err,responsible){
             if(err){
                 console.log('Problem in function getUserById')
             }
             else{
                 console.log("////////////////////////") ;
                 console.log(responsible) ;
                 return res.status(200).send(responsible) ;
             }

         })
     })
     app.post("/api/getTasksById",function(req,res){
        data=req.body.responsible;
        console.log(data) ;
             modelT.find({responsible:data},function(err,tasks){
                 if(err){
                     console.log('Problem in function getTaskById')
                 }
                 else{
                     console.log("////////////////////////") ;
                     console.log(tasks);
                     return res.status(200).send(tasks) ;
                 }
    
             })
    })

app.listen(8080,function(){
    console.log('Example app listening on port 8080!') ;
});
var modelT=mongo.model('tasks',TaskShema,'tasks') ;
app.post("/api/SaveTask",function(req,res){
       var modT =new modelT(req.body) ;
       modT.save(function(err,data){
           if(err){
               res.send(err) ;
           }
           else{
               res.send({data:"Task recorded with success"}) ;
           }
       }) ;
       
   });
   app.post("/api/UpdateTask",function(req,res){
    modelT.findByIdAndUpdate(req.body._id,{title:req.body.title,description:req.body.description,responsible:req.body.responsible,state:req.body.state,underTask:req.body.underTask,prioritie:req.body.prioritie},function(err,data){
        if(err){
            res.send(err) ;
        }
        else  {
            res.send({data:"Task has been updated"}) 

        }
    })
})

app.post("/api/deleteTask",function(req,res){
    console.log('//////////////////////////' ) ;
    console.log(req.body) ;
    console.log(req.body.taskId) ;
    modelT.deleteOne({_id:req.body.taskId},function(err){
        if(err){
            res.send(err) ;
        }
        else{
            res.send({data :"Task  has been deleted"})
        }
    })
})
app.get("/api/getTask",function(req,res){
    modelT.find({},function(err,data){
        if(err){
            res.send(err) ;
        }
        else{
            console.log("1.3") ;
            res.send(data) ;
            console.log(data) ;
        }
    })


})


