
import {Sales} from '../models/sales.model.js';


const Allsales = async (req, res) => {
    try {
        const sales = await Sales.find();
        res.json(sales);
    } catch (error) {
        res.status(404).send("Error: " + error);
    }
}
export {
    Allsales
}