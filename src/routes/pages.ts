import express from 'express'
const router = express.Router()
router.get('/login', (req, res)=>{
    res.render('login', {title:"Document"})
})

router.get('/sign_up', (req,res)=>{
    res.render('sign_up',{title:"signup"})
})

router.get('/home', (req, res) =>{
    res.render('home', {title:"home"})
})

router.get("/dashboard", (req, res) => {
  res.render("dashboard", { title: "dashboard" });
});

export default router