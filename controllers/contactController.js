const asyncHandler = require("express-async-handler");
const Contacts = require("../models/contactModels");

/*//@desc get all
//@route api/contacts
//@access public
const helo = ((req,res)=>{
    res.send("hi there");
});*/

//@desc get all
//@route api/contacts
//@access public
const getContacts = asyncHandler(async(req,res)=>{
    //console.log("req is",req);
    const contact = await Contacts.find();
    //console.log("inside getcontact");
    res.status(200).json(contact);
});

//@desc create
//@route api/contacts
//@access public
const createContacts = asyncHandler(async(req,res)=>{
    console.log("request body is",req.body);
    const {name,email,phone} = req.body;
    if(!name ||!email ||!phone){
        res.status(400);
        throw new Error("All fields are mandatory !");
    }
    const contact = await Contacts.create({
        name,
        email,
        phone
    });
    res.status(200).json(contact);
});

//@desc get individual contacs
//@route api/contacts/1
//@access public
const getContact = asyncHandler(async(req,res)=>{
    const contact = await Contacts.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
});

//@desc update contacts
//@route api/contacts/1
//@access public
const updateContact = asyncHandler(async(req,res)=>{
    const contact = await Contacts.findById(req.params.id);
    //console.log(contact);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    //console.log("reqest bdy",req.body);
    
    const updatedContact = await Contacts.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    
    res.status(200).json(updatedContact);
});

//@desc delete contacs
//@route api/contacts/1
//@access public
const deleteContact = asyncHandler(async(req,res)=>{
    const contact = await Contacts.findById(req.params.id);
    console.log(contact)
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    await Contacts.deleteOne({_id:req.params.id});
    res.status(200).json(contact);

});

module.exports ={getContacts,getContact,updateContact,deleteContact,createContacts};
