import { Router } from "express";
import { checkAuth } from "../utils/checkAuth.js";
import { createComment,getAllComments} from '../controllers/comments.js'

const router = new Router()

//Create Comments
// http://localhost:3002/api/coments/:id
router.post('/:id',checkAuth,createComment)

router.get('/get-all',checkAuth,getAllComments)


export default router