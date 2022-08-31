const bcrypt = require('bcrypt-nodejs');
const fs = require('fs');
const blogs = require('../models/blogs');
const Blogs = require('../models').blogs;
const Contact = require('../models').contact;

module.exports.createBlogs = function (req) {
    let blogs = req.body ;
    const path = req.file.path
    var img_url =req.protocol+"://"+req.headers.host+"/"+path
    req.body.image = img_url ;
    console.log("image url ",req.file.path)

    return Blogs
        .create({
            title: blogs.title,
            description: blogs.description,
            image: img_url,
            category:blogs.category.toLowerCase()
        })
        .then((blogsResult) => {
            blogsResult = blogsResult && typeof blogsResult == 'object' ? blogsResult.toJSON() : blogsResult;
            const data = new Object();
            for (const prop in blogsResult) data[prop] = blogsResult[prop]
            return data;
        })
        .catch((error) => console.error(error));
};

module.exports.updateBlogs = function (req) {
    const path = req.file.path
    var img_url =req.protocol+"://"+req.headers.host+"/"+path
    req.body.image = img_url ;
    console.log("image url ",req.file.path)
    return Blogs
    .findOne({where: {id: req.body.id}})
    .then(blogResponse => {
        if(blogResponse){
            return Blogs.update(req.body , { where: { id: req.body.id } }).then(response => {
                return req.body
            }).catch(error => {
                console.log(error)
                return error ;
            });
        }else{
            return {"message":"Data Not found"}
        }

    })
    .catch((error) => console.error(error));
};

module.exports.getBlogs = function (category) {
    console.log("Data ",category )

    return Blogs
    .findAll({where: {category: category}})
    .then(blogResponse => {
        return {
            message:"success",
            data:blogResponse
        } ;
    }).catch((error) => {
        return {
            message:"something went wrong",
        }
    });
};


module.exports.createContact = function (blogs) {
    return Contact
        .create({
            name: blogs.name,
            contact_no: blogs.contact_no,
            email: blogs.email,
            category:blogs.category.toLowerCase()
        })
        .then((blogsResult) => {
            blogsResult = blogsResult && typeof blogsResult == 'object' ? blogsResult.toJSON() : blogsResult;
            const data = new Object();
            for (const prop in blogsResult) data[prop] = blogsResult[prop]
            return data;
        })
        .catch((error) => console.error(error));
};

module.exports.updateContact = function (req) {

    return Contact
    .findOne({where: {id: req.body.id}})
    .then(blogResponse => {
        if(blogResponse){
            return Contact.update(req.body , { where: { id: req.body.id } }).then(response => {
                return req.body
            }).catch(error => {
                console.log(error)
                return error ;
            });
        }else{
            return {"message":"Data Not found"}
        }

    })
    .catch((error) => console.error(error));
};

module.exports.getContact = function (category) {
    console.log("Data ",category )

    return Contact
    .findAll({where: {category: category}})
    .then(blogResponse => {
        return {
            message:"success",
            data:blogResponse
        } ;
    }).catch((error) => {
        return {
            message:"something went wrong",
        }
    });
};
