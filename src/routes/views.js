import { Router } from "express";

const viewsRouter = Router()

const readProducts = () => {
    const data = fs.readFileSync(path) 
    return JSON.parse(data) 
}

viewsRouter.get('/',(req,res)=>{
    const product = {
        price:89,
        description:'johxosisocs',
        code:9866,
        title:'ojihuhu',
    }
    res.render('home',{
        product,
        css: 'home.css'
    })
})

export default viewsRouter;