
import {Course} from '../models/courses.model.js';


const Allcourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (error) {
        res.status(404).send("Error: " + error);
    }
}
export {
    Allcourses
}