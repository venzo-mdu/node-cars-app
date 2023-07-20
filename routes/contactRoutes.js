const express = require("express")
const router = express.Router();
//const validateToken = require("../middleware/validateHandler");
//const errorHandler = require("../middleware/errorHandler")

const {getContacts,createContacts,getContact,updateContact,deleteContact} = require("../controllers/contactController");

//router.use(validateToken);

//router.route("/").get(getContacts);
router.route("/").get(getContacts).post(createContacts);
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);
// function test(req,res,next){
//     console.log(req,"this is func");
// }

module.exports = router;