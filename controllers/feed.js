
const{validationResult} =require('express-validator');
const Post =require('../models/post');
exports.getPosts=(req,res,next)=>{
    console.log("hi");
    Post
	.find()
	.then(post=>{
            res.status(200).json({message:'Fetching post successfully',posts:post})

         
         })
	.catch(err=>{
        console.log('No fetch');
                   if(!err.statusCode)
	      {
 		err.statusCode=500;
              }
		next(err);

               }
	         );

    // res.status(200).json({posts:
    //     [{
    //     _id:'1', 
    //     title:'First Post',
    //     content:'This is first post !',
    //     imageUrl:'images/node.png',
    //     creator:{
    //         name:'Project'
            
    //     },
    //     createdAt:new Date()
    
    // }]});


};

exports.createPost= (req,res,next)=>{

    const errors =validationResult(req);
    if(!errors.isEmpty())
     {

        const error =new Erorr('Validation failed ,entered data is incorrect');
        error.statusCode=422;
        throw error; 
        // return res.status(422).json({message:'Validation failed ,Entered data is Incorrect ',
        //                              errors:errors.array()  
        //                             });
     }


    const title =req.body.title;
    const  content =req.body.content;
    const post =new Post({title:title,
        imageUrl:'images/node.png',
         content :content,
         
         creator:{name:'Nodejs'}}

        
        );
        post
        .save()
        .then(result=>{
               
             console.log(result);
         res.status(201).json({
         message:'Post created successfully!',
         post:result
         })
        })
        .catch(err=>{
            if(!err.statusCode)
            {
           err.statusCode=500;
                }
          next(err);
           // console.log(err);
        });
    // res.status(201).json({
    //     message:'Post Created Succesfully',
    //     post:{id: new Date().toISOString(),
    //           title:title,
    //          content:content,
    //          creator:{
    //             name:'Project1'
                
    //         },
    //         createdAt:new Date()
            
    //         }
    // });

};

exports.getPost= (req,res,next)=>{
    const postId= req.params.postId;
    Post.findById(postId)
     .then(post=>{

            if(!post)
    {
           const error =new Error('Could not Find The Post');
            error.statusCode=404;
            throw error; 
            }
            res.status(200).json({message:'Post fetched.',post:post});
         
         })
    .catch(err=>{
             if(!err.statusCode)
    {
   err.statusCode=500;
        }
  next(err);

         });

    
   };