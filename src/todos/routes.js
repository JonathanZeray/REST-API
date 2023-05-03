const { Router } = require('express');
const controller = require('./controller');


const router = Router();

router.get('/', controller.getTodos);
router.get('/:id', controller.getTodoById);
router.post('/', controller.addTodo);
router.put('/:id', controller.updateTodo);
router.delete('/:id', controller.removeTodo);


module.exports = router;