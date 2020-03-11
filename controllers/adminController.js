const express = require("express");
const router = express.Router();

router.get("/", (req, res)=>{
    res.render("admin/addOrEditStudent", {hello: "whatever"})
});





module.exports = router;